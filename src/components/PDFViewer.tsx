import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, ZoomIn, ZoomOut, Download, ChevronLeft, ChevronRight } from "lucide-react";

interface PDFViewerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  pdfUrl: string;
}

const PDFViewer = ({ isOpen, onClose, title, pdfUrl }: PDFViewerProps) => {
  const [zoom, setZoom] = useState(100);

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 10, 200));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 10, 50));

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl h-[90vh] flex flex-col p-0">
        <DialogHeader className="border-b px-6 py-4 flex flex-row items-center justify-between">
          <DialogTitle className="flex-1">{title}</DialogTitle>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="ghost"
              onClick={handleZoomOut}
              disabled={zoom <= 50}
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium w-12 text-center">{zoom}%</span>
            <Button
              size="sm"
              variant="ghost"
              onClick={handleZoomIn}
              disabled={zoom >= 200}
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
            <a href={pdfUrl} target="_blank" rel="noopener noreferrer" download>
              <Button size="sm" variant="ghost" className="gap-2">
                <Download className="h-4 w-4" />
                <span className="hidden sm:inline">Download</span>
              </Button>
            </a>
            <Button size="sm" variant="ghost" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-auto bg-muted/50 flex items-center justify-center p-4">
          <iframe
            src={`${pdfUrl}#toolbar=0`}
            width="100%"
            height="100%"
            style={{
              border: "none",
              maxWidth: "100%",
              transform: `scale(${zoom / 100})`,
              transformOrigin: "top center",
            }}
            title={title}
          />
        </div>

        <div className="border-t px-6 py-3 flex justify-between items-center bg-muted/30">
          <p className="text-xs text-muted-foreground">
            Read-only PDF viewer • Use zoom controls to adjust view
          </p>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PDFViewer;
