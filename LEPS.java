import java.io.*;
import java.nio.file.*;
import java.util.*;
import java.util.stream.*;

/**
 * LEPS - Loan EMI & Prepayment Simulator
 * Commands:
 *   plan <amount> <rate> <months>
 *   add-prepayment <month> <amount>
 *   export
 *
 * Outputs:
 *   amortization.csv
 *   savings.txt
 */
public class LEPS {

    // ====== Exceptions ======
    public static class InvalidTenorException extends RuntimeException {
        public InvalidTenorException(String msg) { super(msg); }
    }

    public static class PrepaymentExceedsBalanceException extends RuntimeException {
        public PrepaymentExceedsBalanceException(String msg) { super(msg); }
    }

    // ====== Entities & Policies ======
    public static class Prepayment {
        public final int monthIndex; // 1-based month when prepayment is applied
        public final double amount;

        public Prepayment(int monthIndex, double amount) {
            if (monthIndex <= 0) throw new IllegalArgumentException("Prepayment month must be >= 1");
            if (amount <= 0) throw new IllegalArgumentException("Prepayment amount must be > 0");
            this.monthIndex = monthIndex;
            this.amount = amount;
        }
    }

    public interface RatePolicy {
        double monthlyRate(double annualRatePercent, int monthIndex);
    }

    public static class FixedRatePolicy implements RatePolicy {
        @Override
        public double monthlyRate(double annualRatePercent, int monthIndex) {
            double annualRate = annualRatePercent / 100.0;
            return annualRate / 12.0;
        }
    }

    // Add a simple floating policy example (not used by default)
    public static class FloatingRatePolicy implements RatePolicy {
        private final Map<Integer, Double> monthToAnnualRatePercent = new HashMap<>();
        private final double defaultAnnualPercent;
        public FloatingRatePolicy(double defaultAnnualPercent) {
            this.defaultAnnualPercent = defaultAnnualPercent;
        }
        public void setRateForMonth(int monthIndex, double annualPercent) {
            monthToAnnualRatePercent.put(monthIndex, annualPercent);
        }
        @Override
        public double monthlyRate(double annualRatePercent, int monthIndex) {
            double annual = monthToAnnualRatePercent.getOrDefault(monthIndex, defaultAnnualPercent) / 100.0;
            return annual / 12.0;
        }
    }

    public static class Installment {
        public final int month;
        public final double emi;
        public final double interestComponent;
        public final double principalComponent;
        public final double balanceAfter;

        public Installment(int month, double emi, double interestComponent, double principalComponent, double balanceAfter) {
            this.month = month;
            this.emi = emi;
            this.interestComponent = interestComponent;
            this.principalComponent = principalComponent;
            this.balanceAfter = balanceAfter;
        }
    }

    public static class AmortizationSchedule {
        private final List<Installment> installments;
        public AmortizationSchedule(List<Installment> installments) {
            this.installments = installments;
        }
        public List<Installment> getInstallments() { return installments; }
        public double totalInterest() {
            return installments.stream().mapToDouble(i -> i.interestComponent).sum();
        }
        public int length() {
            return installments.size();
        }
    }

    // ====== Template Method: Loan & concrete types ======
    public static abstract class Loan {
        protected final double principal;
        protected final double annualRatePercent;
        protected final int months; // original tenor
        protected final RatePolicy ratePolicy;

        protected Loan(double principal, double annualRatePercent, int months, RatePolicy ratePolicy) {
            if (months <= 0) throw new InvalidTenorException("Tenor (months) must be > 0");
            if (principal <= 0) throw new IllegalArgumentException("Principal must be > 0");
            if (annualRatePercent < 0) throw new IllegalArgumentException("Rate must be >= 0");
            this.principal = principal;
            this.annualRatePercent = annualRatePercent;
            this.months = months;
            this.ratePolicy = ratePolicy;
        }

        public abstract String type();

        // Template method for schedule generation (without prepayments)
        public AmortizationSchedule schedule() {
            return scheduleWithPrepayments(Collections.emptyList());
        }

        // Template: schedule with prepayments and recalculation post-prepayment
        public AmortizationSchedule scheduleWithPrepayments(List<Prepayment> prepayments) {
            // Sort prepayments by month
            List<Prepayment> sorted = new ArrayList<>(prepayments);
            sorted.sort(Comparator.comparingInt(p -> p.monthIndex));

            List<Installment> installments = new ArrayList<>();
            double balance = principal;
            int currentMonth = 1;
            int originalMonths = months;

            // Compute baseline EMI using current monthly rate at month 1
            // For fixed rate, this is constant; for floating, we recompute per segment.
            double emi = computeEMI(balance, ratePolicy.monthlyRate(annualRatePercent, currentMonth), originalMonths);

            int prepayIdx = 0;

            while (balance > 1e-8) {
                double r = ratePolicy.monthlyRate(annualRatePercent, currentMonth);
                double interest = balance * r;
                double principalComponent = Math.min(emi - interest, balance);

                double newBalance = balance - principalComponent;

                // Apply any prepayment scheduled for this exact month (after EMI, typical handling)
                while (prepayIdx < sorted.size() && sorted.get(prepayIdx).monthIndex == currentMonth) {
                    Prepayment p = sorted.get(prepayIdx);
                    if (p.amount > newBalance + 1e-8) {
                        throw new PrepaymentExceedsBalanceException("Prepayment exceeds remaining balance at month " + currentMonth);
                    }
                    newBalance -= p.amount;

                    // After prepayment, recalculate EMI based on remaining tenor and new balance
                    int remainingMonths = Math.max(1, originalMonths - currentMonth);
                    double newRate = ratePolicy.monthlyRate(annualRatePercent, currentMonth + 1);
                    emi = computeEMI(newBalance, newRate, remainingMonths);
                    prepayIdx++;
                }

                installments.add(new Installment(currentMonth, emi, interest, principalComponent, Math.max(newBalance, 0)));
                balance = newBalance;
                currentMonth++;

                // Stop if month counter goes too high (protect against floating/zero-rate degenerate cases)
                if (currentMonth > originalMonths + 600) { // safety cap
                    break;
                }

                // If balance is small enough, settle next month with final EMI adjustment
                if (balance <= 1e-8) {
                    break;
                }
            }

            // Trim trailing zero-balance overshoot if any
            while (!installments.isEmpty() && installments.get(installments.size() - 1).balanceAfter < 1e-8 &&
                    installments.size() > 1) {
                // Keep last needed line; typically fine as-is
                break;
            }

            return new AmortizationSchedule(installments);
        }

        // EMI formula: EMI = P * r * (1+r)^n / ((1+r)^n - 1)
        protected double computeEMI(double P, double r, int n) {
            if (P <= 0) return 0;
            if (r == 0) return P / n;
            double pow = Math.pow(1 + r, n);
            return P * r * pow / (pow - 1);
        }
    }

    public static class HomeLoan extends Loan {
        public HomeLoan(double principal, double annualRatePercent, int months, RatePolicy ratePolicy) {
            super(principal, annualRatePercent, months, ratePolicy);
        }
        @Override public String type() { return "HomeLoan"; }
    }

    // ====== Report Builder ======
    public static class ReportBuilder {
        private final Loan loan;
        private final AmortizationSchedule baseline; // no prepay
        private final AmortizationSchedule withPrepay;

        public ReportBuilder(Loan loan, AmortizationSchedule baseline, AmortizationSchedule withPrepay) {
            this.loan = loan;
            this.baseline = baseline;
            this.withPrepay = withPrepay;
        }

        public String summaryText() {
            double baseInterest = baseline.totalInterest();
            double prepayInterest = withPrepay.totalInterest();
            double saved = Math.max(0, baseInterest - prepayInterest);
            int baseLen = baseline.length();
            int prepayLen = withPrepay.length();

            StringBuilder sb = new StringBuilder();
            sb.append("===== LOAN EMI & PREPAYMENT SIMULATOR (LEPS) =====\n");
            sb.append("Commands: plan <amount> <rate> <months> | add-prepayment <month> <amount> | export\n");
            sb.append(String.format("Planned loan: principal=%.2f rate=%.2f%% months=%d\n",
                    loan.principal, loan.annualRatePercent, loan.months));
            sb.append(String.format("Total interest (no prepay): %.2f\n", baseInterest));
            sb.append(String.format("Total interest (with prepay): %.2f\n", prepayInterest));
            sb.append(String.format("Interest saved: %.2f\n", saved));
            sb.append(String.format("Schedule length (no prepay): %d\n", baseLen));
            sb.append(String.format("Schedule length (with prepay): %d\n", prepayLen));
            return sb.toString();
        }

        public void writeAmortizationCSV(Path path) throws IOException {
            try (BufferedWriter bw = Files.newBufferedWriter(path)) {
                bw.write("month,emi,interest,principal,balance\n");
                for (Installment i : withPrepay.getInstallments()) {
                    bw.write(String.format(Locale.US, "%d,%.2f,%.2f,%.2f,%.2f\n",
                            i.month, i.emi, i.interestComponent, i.principalComponent, i.balanceAfter));
                }
            }
        }

        public void writeSavings(Path path) throws IOException {
            double baseInterest = baseline.totalInterest();
            double prepayInterest = withPrepay.totalInterest();
            double saved = Math.max(0, baseInterest - prepayInterest);
            int baseLen = baseline.length();
            int prepayLen = withPrepay.length();
            try (BufferedWriter bw = Files.newBufferedWriter(path)) {
                bw.write(String.format(Locale.US, "Total interest (no prepay): %.2f\n", baseInterest));
                bw.write(String.format(Locale.US, "Total interest (with prepay): %.2f\n", prepayInterest));
                bw.write(String.format(Locale.US, "Interest saved: %.2f\n", saved));
                bw.write(String.format(Locale.US, "Tenor reduction (months): %d\n", Math.max(0, baseLen - prepayLen)));
            }
        }
    }

    // ====== Config & IO helpers ======
    public static class LoanConfig {
        public String type = "home";
        public String ratePolicy = "fixed";
        public String compounding = "monthly"; // reserved for future
        public static LoanConfig load(Path cfgPath) {
            LoanConfig cfg = new LoanConfig();
            if (!Files.exists(cfgPath)) return cfg;
            try {
                for (String line : Files.readAllLines(cfgPath)) {
                    line = line.trim();
                    if (line.isEmpty() || line.startsWith("#")) continue;
                    String[] parts = line.split("=", 2);
                    if (parts.length != 2) continue;
                    String k = parts[0].trim().toLowerCase(Locale.ROOT);
                    String v = parts[1].trim().toLowerCase(Locale.ROOT);
                    switch (k) {
                        case "type": cfg.type = v; break;
                        case "ratepolicy": cfg.ratePolicy = v; break;
                        case "compounding": cfg.compounding = v; break;
                        default: // ignore
                    }
                }
            } catch (IOException e) {
                // ignore config errors, use defaults
            }
            return cfg;
        }
    }

    public static List<Prepayment> loadPrepayments(Path csvPath) {
        if (!Files.exists(csvPath)) return new ArrayList<>();
        try {
            return Files.readAllLines(csvPath).stream()
                    .map(String::trim)
                    .filter(s -> !s.isEmpty() && !s.startsWith("#"))
                    .map(line -> {
                        String[] parts = line.split(",");
                        if (parts.length != 2) throw new IllegalArgumentException("Invalid prepayments.csv line: " + line);
                        int m = Integer.parseInt(parts[0].trim());
                        double amt = Double.parseDouble(parts[1].trim());
                        return new Prepayment(m, amt);
                    }).collect(Collectors.toList());
        } catch (Exception e) {
            System.err.println("Failed to read prepayments.csv: " + e.getMessage());
            return new ArrayList<>();
        }
    }

    // ====== CLI State ======
    private Loan currentLoan;
    private final List<Prepayment> cliPrepayments = new ArrayList<>();
    private AmortizationSchedule baseline;
    private AmortizationSchedule withPrepay;

    private void cmdPlan(double amount, double rate, int months) {
        LoanConfig cfg = LoanConfig.load(Paths.get("loan.cfg"));
        RatePolicy rp = cfg.ratePolicy.equals("fixed") ? new FixedRatePolicy() : new FloatingRatePolicy(rate);
        switch (cfg.type) {
            case "home":
            default:
                currentLoan = new HomeLoan(amount, rate, months, rp);
        }
        // Load file prepayments and merge with CLI ones
        List<Prepayment> allPrepays = new ArrayList<>(cliPrepayments);
        allPrepays.addAll(loadPrepayments(Paths.get("prepayments.csv")));
        // Compute schedules
        baseline = currentLoan.schedule();
        withPrepay = currentLoan.scheduleWithPrepayments(allPrepays);
        // Print summary
        ReportBuilder rb = new ReportBuilder(currentLoan, baseline, withPrepay);
        System.out.print(rb.summaryText());
    }

    private void cmdAddPrepayment(int month, double amount) {
        cliPrepayments.add(new Prepayment(month, amount));
        System.out.println(String.format(Locale.US, "Added prepayment: month=%d amount=%.2f", month, amount));
    }

    private void cmdExport() {
        if (currentLoan == null || withPrepay == null || baseline == null) {
            System.out.println("No plan yet. Use: plan <amount> <rate> <months>");
            return;
        }
        ReportBuilder rb = new ReportBuilder(currentLoan, baseline, withPrepay);
        try {
            rb.writeAmortizationCSV(Paths.get("amortization.csv"));
            rb.writeSavings(Paths.get("savings.txt"));
            System.out.println("Exported: amortization.csv, savings.txt");
        } catch (IOException e) {
            System.out.println("Export failed: " + e.getMessage());
        }
    }

    private void repl() throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        System.out.println("===== LOAN EMI & PREPAYMENT SIMULATOR (LEPS) =====");
        System.out.println("Commands: plan <amount> <rate> <months> | add-prepayment <month> <amount> | export");
        while (true) {
            System.out.print("> ");
            String line = br.readLine();
            if (line == null) break;
            line = line.trim();
            if (line.isEmpty()) continue;
            if (line.equalsIgnoreCase("exit") || line.equalsIgnoreCase("quit")) break;

            // Support piping like: plan ... | add-prepayment m a | export
            String[] segments = line.split("\\|");
            for (String seg : segments) {
                String s = seg.trim();
                if (s.isEmpty()) continue;
                String[] parts = s.split("\\s+");
                String cmd = parts[0].toLowerCase(Locale.ROOT);

                try {
                    switch (cmd) {
                        case "plan": {
                            if (parts.length != 4) {
                                System.out.println("Usage: plan <amount> <rate> <months>");
                                break;
                            }
                            double amount = Double.parseDouble(parts[1]);
                            double rate = Double.parseDouble(parts[2]);
                            int months = Integer.parseInt(parts[3]);
                            cmdPlan(amount, rate, months);
                            break;
                        }
                        case "add-prepayment": {
                            if (parts.length != 3) {
                                System.out.println("Usage: add-prepayment <month> <amount>");
                                break;
                            }
                            int month = Integer.parseInt(parts[1]);
                            double amt = Double.parseDouble(parts[2]);
                            cmdAddPrepayment(month, amt);
                            break;
                        }
                        case "export": {
                            cmdExport();                
                            break;
                        }
                        default:
                            System.out.println("Unknown command: " + cmd);
                    }
                } catch (InvalidTenorException | PrepaymentExceedsBalanceException | IllegalArgumentException e) {
                    System.out.println("Error: " + e.getMessage());
                } catch (Exception e) {
                    System.out.println("Unexpected error: " + e.getMessage());
                }
            }
        }
    }

    public static void main(String[] args) throws IOException {
        new LEPS().repl();
    }
}