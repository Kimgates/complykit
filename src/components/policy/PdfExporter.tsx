import { useState, useCallback } from 'react';
import { jsPDF } from 'jspdf';
import { Download, Loader2, CheckCircle } from 'lucide-react';
import type { Policy, PolicySection } from '@/data/policies';

interface PdfExporterProps {
  policy: Policy;
  variant?: 'primary' | 'ghost';
  className?: string;
}

export default function PdfExporter({ policy, variant = 'primary', className = '' }: PdfExporterProps) {
  const [status, setStatus] = useState<'idle' | 'generating' | 'done'>('idle');

  const renderSectionToPdf = (doc: jsPDF, section: PolicySection, yPos: number, pageWidth: number, margin: number): number => {
    const contentWidth = pageWidth - margin * 2;
    let y = yPos;

    const addWrappedText = (text: string, x: number, yPos: number, maxWidth: number, fontSize: number, lineHeight: number, align?: 'left' | 'center') => {
      doc.setFontSize(fontSize);
      const lines = doc.splitTextToSize(text, maxWidth);
      lines.forEach((line: string) => {
        if (yPos > 270) {
          doc.addPage();
          yPos = 20;
        }
        doc.text(line, x, yPos, { align: align || 'left' });
        yPos += lineHeight;
      });
      return yPos;
    };

    switch (section.type) {
      case 'heading':
        y += 6;
        doc.setFont('helvetica', 'bold');
        y = addWrappedText(section.content || '', margin, y, contentWidth, 14, 6);
        doc.setDrawColor(34, 197, 94);
        doc.setLineWidth(0.5);
        doc.line(margin, y, margin + 40, y);
        y += 4;
        doc.setFont('helvetica', 'normal');
        break;

      case 'subheading':
        y += 4;
        doc.setFont('helvetica', 'bold');
        y = addWrappedText(section.content || '', margin, y, contentWidth, 12, 5);
        doc.setFont('helvetica', 'normal');
        y += 2;
        break;

      case 'paragraph':
        y += 2;
        doc.setTextColor(51, 65, 85);
        y = addWrappedText(section.content || '', margin, y, contentWidth, 10, 5);
        doc.setTextColor(0, 0, 0);
        y += 2;
        break;

      case 'bullet-list':
        y += 2;
        section.items?.forEach((item) => {
          if (y > 270) {
            doc.addPage();
            y = 20;
          }
          doc.setFontSize(10);
          doc.text('\u2022', margin, y);
          doc.setTextColor(51, 65, 85);
          const lines = doc.splitTextToSize(item, contentWidth - 8);
          lines.forEach((line: string, idx: number) => {
            if (y > 270) {
              doc.addPage();
              y = 20;
            }
            doc.text(line, margin + 6, y);
            y += idx === lines.length - 1 ? 5 : 4.5;
          });
          doc.setTextColor(0, 0, 0);
        });
        y += 2;
        break;

      case 'numbered-list':
        y += 2;
        section.items?.forEach((item, idx) => {
          if (y > 270) {
            doc.addPage();
            y = 20;
          }
          doc.setFontSize(10);
          doc.setTextColor(22, 163, 74);
          doc.text(`${idx + 1}.`, margin, y);
          doc.setTextColor(51, 65, 85);
          const lines = doc.splitTextToSize(item, contentWidth - 12);
          lines.forEach((line: string, lIdx: number) => {
            if (y > 270) {
              doc.addPage();
              y = 20;
            }
            doc.text(line, margin + 10, y);
            y += lIdx === lines.length - 1 ? 5 : 4.5;
          });
          doc.setTextColor(0, 0, 0);
        });
        y += 2;
        break;

      case 'callout-info':
      case 'callout-tip':
        y += 3;
        {
          const calloutColor = section.type === 'callout-tip' ? [240, 253, 244] : [240, 253, 250];
          const borderColor = section.type === 'callout-tip' ? [34, 197, 94] : [20, 184, 166];
          doc.setFillColor(calloutColor[0], calloutColor[1], calloutColor[2]);
          const textHeight = doc.splitTextToSize(section.content || '', contentWidth - 8).length * 5 + 8;
          doc.roundedRect(margin, y - 4, contentWidth, textHeight, 2, 2, 'F');
          doc.setDrawColor(borderColor[0], borderColor[1], borderColor[2]);
          doc.setLineWidth(1);
          doc.line(margin, y - 4, margin, y - 4 + textHeight);
          doc.setTextColor(51, 65, 85);
          y = addWrappedText(section.content || '', margin + 6, y, contentWidth - 12, 10, 5);
          doc.setTextColor(0, 0, 0);
          y += 4;
        }
        break;

      case 'callout-warning':
      case 'callout-important':
        y += 3;
        {
          doc.setFillColor(255, 251, 235);
          const textHeight = doc.splitTextToSize(section.content || '', contentWidth - 8).length * 5 + 8;
          doc.roundedRect(margin, y - 4, contentWidth, textHeight, 2, 2, 'F');
          doc.setDrawColor(245, 158, 11);
          doc.setLineWidth(1);
          doc.line(margin, y - 4, margin, y - 4 + textHeight);
          doc.setTextColor(51, 65, 85);
          y = addWrappedText(section.content || '', margin + 6, y, contentWidth - 12, 10, 5);
          doc.setTextColor(0, 0, 0);
          y += 4;
        }
        break;

      case 'table':
        y += 3;
        if (section.headers && section.headers.length > 0) {
          const colWidth = contentWidth / section.headers.length;
          doc.setFillColor(241, 245, 249);
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(9);
          section.headers.forEach((header, idx) => {
            doc.rect(margin + idx * colWidth, y - 4, colWidth, 8, 'F');
            doc.text(header, margin + idx * colWidth + 3, y + 2);
          });
          y += 8;
          doc.setFont('helvetica', 'normal');

          section.rows?.forEach((row, rIdx) => {
            if (y > 270) {
              doc.addPage();
              y = 20;
            }
            if (rIdx % 2 === 1) {
              doc.setFillColor(248, 250, 252);
              doc.rect(margin, y - 4, contentWidth, 7, 'F');
            }
            row.cells.forEach((cell, cIdx) => {
              doc.setFontSize(9);
              doc.setTextColor(51, 65, 85);
              doc.text(cell, margin + cIdx * colWidth + 3, y);
              doc.setTextColor(0, 0, 0);
            });
            y += 7;
          });
        }
        y += 4;
        break;

      default:
        break;
    }

    return y;
  };

  const generatePdf = useCallback(() => {
    setStatus('generating');

    setTimeout(() => {
      try {
        const doc = new jsPDF({ unit: 'mm', format: 'a4' });
        const pageWidth = doc.internal.pageSize.getWidth();
        const margin = 20;
        const contentWidth = pageWidth - margin * 2;
        let y = 20;

        // Header with brand color accent
        doc.setFillColor(34, 197, 94);
        doc.rect(0, 0, pageWidth, 3, 'F');

        // Title
        doc.setFontSize(10);
        doc.setTextColor(100, 116, 139);
        doc.text('ComplyKit | NDIS Compliance Policy', margin, y);
        y += 8;

        // Provider name placeholder
        doc.setFontSize(10);
        doc.setTextColor(148, 163, 184);
        doc.setFont('helvetica', 'normal');
        doc.text('[Provider Name]', margin, y);
        y += 10;

        // Document title
        doc.setFontSize(20);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(15, 23, 42);
        const titleLines = doc.splitTextToSize(policy.title, contentWidth);
        titleLines.forEach((line: string) => {
          doc.text(line, margin, y);
          y += 8;
        });

        y += 4;

        // Meta info
        doc.setFontSize(9);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(148, 163, 184);
        doc.text(`Version ${policy.version}  \u2022  Generated by ComplyKit  \u2022  Last updated: ${new Date(policy.lastUpdated).toLocaleDateString('en-AU')}`, margin, y);
        y += 6;

        // Policy code badge
        doc.setFillColor(240, 253, 244);
        doc.setDrawColor(34, 197, 94);
        doc.setTextColor(22, 163, 74);
        doc.setFontSize(8);
        doc.setFont('courier', 'normal');
        const codeWidth = doc.getTextWidth(policy.code) + 8;
        doc.roundedRect(margin, y - 3, codeWidth, 6, 2, 2, 'FD');
        doc.text(policy.code, margin + 4, y + 1.5);
        doc.setFont('helvetica', 'normal');
        y += 10;

        // Approval block
        doc.setFillColor(240, 253, 244);
        doc.roundedRect(margin, y - 4, contentWidth, 14, 3, 3, 'F');
        doc.setFontSize(9);
        doc.setTextColor(71, 85, 105);
        doc.text(`Approved by: ${policy.approvedBy}  |  Date: ${policy.approvalDate}  |  Review due: ${policy.reviewDue}`, margin + 6, y + 3);
        y += 18;

        // Divider
        doc.setDrawColor(226, 232, 240);
        doc.setLineWidth(0.3);
        doc.line(margin, y - 4, pageWidth - margin, y - 4);
        y += 4;

        // Sections
        policy.sections.forEach((section) => {
          y = renderSectionToPdf(doc, section, y, pageWidth, margin);
        });

        // Footer on each page
        const pageCount = doc.getNumberOfPages();
        for (let i = 1; i <= pageCount; i++) {
          doc.setPage(i);
          doc.setFontSize(8);
          doc.setTextColor(148, 163, 184);
          doc.text(`Generated by ComplyKit | ${new Date().toLocaleDateString('en-AU')}`, margin, 292);
          doc.text(`Page ${i} of ${pageCount}`, pageWidth - margin, 292, { align: 'right' });
        }

        doc.save(`${policy.id}-policy.pdf`);
        setStatus('done');
        setTimeout(() => setStatus('idle'), 3000);
      } catch (err) {
        console.error('PDF generation failed:', err);
        setStatus('idle');
      }
    }, 800);
  }, [policy]);

  const buttonStyles =
    variant === 'primary'
      ? 'inline-flex items-center gap-2 px-5 py-2.5 bg-leaf-500 text-white text-sm font-semibold rounded-xl hover:bg-leaf-600 hover:shadow-button-primary transition-all duration-200 disabled:opacity-60'
      : 'inline-flex items-center gap-2 px-4 py-2 text-slate-600 text-sm font-medium hover:bg-slate-100 rounded-xl transition-all duration-200 disabled:opacity-60';

  return (
    <button
      onClick={generatePdf}
      disabled={status === 'generating'}
      className={`${buttonStyles} ${className}`}
    >
      {status === 'generating' && <Loader2 className="w-4 h-4 animate-spin" />}
      {status === 'done' && <CheckCircle className="w-4 h-4" />}
      {status === 'idle' && <Download className="w-4 h-4" />}
      {status === 'generating' ? 'Generating...' : status === 'done' ? 'Downloaded!' : 'Export PDF'}
    </button>
  );
}
