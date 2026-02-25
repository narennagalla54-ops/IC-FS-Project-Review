import emailjs from "emailjs-com";

// Initialize EmailJS - Replace with your actual credentials from https://www.emailjs.com
// For Vite, use import.meta.env for environment variables
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || "service_constitution"; 
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_OTP || "template_otp"; 
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "your_emailjs_public_key";

// Sender email address
const SENDER_EMAIL = "2400030092@kluniversity.ac.in"; // Your email address

console.log("EmailJS Configuration Loaded:");
console.log("Service ID:", SERVICE_ID);
console.log("Template ID:", TEMPLATE_ID);
console.log("Public Key:", PUBLIC_KEY ? "✅ Configured" : "❌ Missing");
console.log("Sender Email:", SENDER_EMAIL);

// Initialize EmailJS (only once)
let isInitialized = false;

const initializeEmailJS = () => {
  if (!isInitialized) {
    try {
      emailjs.init(PUBLIC_KEY);
      console.log("✅ EmailJS initialized successfully");
      isInitialized = true;
    } catch (error) {
      console.error("❌ Failed to initialize EmailJS:", error);
    }
  }
};

// Generate a random 6-digit OTP
export const generateOTP = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Send OTP to email
export const sendOTPToEmail = async (
  recipientEmail: string,
  userName: string,
  otp: string
): Promise<boolean> => {
  try {
    console.log("🔄 Attempting to send OTP...");
    initializeEmailJS();

    const templateParams = {
      // Template variables (MUST match template exactly)
      name: userName,           // {{Mukesh}}
      email: recipientEmail,    // {{2400030092@kluniversity.in}}
      message: otp,             // {{message}} - The OTP code
      
      // Additional fields for compatibility
      to_email: recipientEmail,
      from_email: SENDER_EMAIL,
      from_name: "Constitution Connect",
      subject: "Your OTP Verification Code - Constitution Connect",
    };

    console.log("🔐 OTP Email Parameters");
    console.log("📧 Template ID:", TEMPLATE_ID);
    console.log("📧 Recipient:", recipientEmail);
    console.log("📧 Variables:");
    console.log("   ✓ name:", userName, "(displays: {{Mukesh}})");
    console.log("   ✓ email:", recipientEmail, "(displays: {{2400030092@kluniversity.in}})");
    console.log("   ✓ message:", otp, "(displays: {{message}})");

    const response = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      templateParams
    );

    console.log("📬 EmailJS Response:", response);

    if (response.status === 200) {
      console.log(`✅ OTP sent successfully from ${SENDER_EMAIL} to ${recipientEmail}`);
      return true;
    }
    console.warn("⚠️ Unexpected response status:", response.status);
    return false;
  } catch (error: any) {
    console.error("❌ Failed to send OTP:", error);
    console.error("Error Details:", {
      message: error.message,
      status: error.status,
      text: error.text,
    });
    return false;
  }
};

// Send welcome email after successful signup
export const sendWelcomeEmail = async (
  recipientEmail: string,
  userName: string,
  userRole: string
): Promise<boolean> => {
  try {
    initializeEmailJS();

    const templateParams = {
      to_email: recipientEmail,
      from_email: SENDER_EMAIL,
      user_name: userName,
      user_role: userRole,
      from_name: "Constitution Connect",
      subject: "Welcome to Constitution Connect!",
    };

    const response = await emailjs.send(
      SERVICE_ID,
      "template_welcome", // Different template for welcome email
      templateParams
    );

    if (response.status === 200) {
      console.log(`Welcome email sent from ${SENDER_EMAIL} to ${recipientEmail}`);
      return true;
    }
    return false;
  } catch (error) {
    console.error("Failed to send welcome email:", error);
    return false;
  }
};

// Send feedback email to admin
export const sendFeedbackEmail = async (
  userName: string,
  userEmail: string,
  feedbackText: string,
  itemType: string
): Promise<boolean> => {
  try {
    initializeEmailJS();

    const templateParams = {
      to_email: SENDER_EMAIL, // Send feedback to admin email
      from_email: userEmail,
      user_name: userName,
      feedback_text: feedbackText,
      item_type: itemType,
      from_name: "Constitution Connect - User Feedback",
      subject: `New Feedback from ${userName}`,
    };

    const response = await emailjs.send(
      SERVICE_ID,
      "template_feedback",
      templateParams
    );

    if (response.status === 200) {
      console.log(`Feedback email sent from ${userEmail} to admin ${SENDER_EMAIL}`);
      return true;
    }
    return false;
  } catch (error) {
    console.error("Failed to send feedback email:", error);
    return false;
  }
};

// Send SMS via email gateway (for phone notifications)
export const sendOTPViaSMS = async (
  phoneNumber: string,
  userName: string,
  otp: string
): Promise<boolean> => {
  try {
    initializeEmailJS();

    // Convert phone number to SMS email format (e.g., for major carriers)
    // This is optional and depends on your email service provider
    const smsEmailGateway = `${phoneNumber}@sms.gateway.com`; // Adjust based on carrier

    const templateParams = {
      to_email: smsEmailGateway,
      from_email: SENDER_EMAIL,
      user_name: userName,
      otp_code: otp,
      from_name: "Constitution Connect",
    };

    const response = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      templateParams
    );

    if (response.status === 200) {
      console.log(`OTP sent successfully via SMS to ${phoneNumber}`);
      return true;
    }
    return false;
  } catch (error) {
    console.error("Failed to send OTP via SMS:", error);
    return false;
  }
};

export default {
  generateOTP,
  sendOTPToEmail,
  sendWelcomeEmail,
  sendFeedbackEmail,
  sendOTPViaSMS,
};
