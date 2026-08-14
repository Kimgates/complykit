import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  Bold,
  Italic,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Undo2,
  Redo2,
  Info,
  AlertTriangle,
  Lightbulb,
  CheckSquare,
  Table,
} from 'lucide-react';
import type { PolicySection } from '@/data/policies';

interface PolicyEditorProps {
  sections: PolicySection[];
  onChange: (sections: PolicySection[]) => void;
}

type FormatAction = 'bold' | 'italic' | 'h1' | 'h2' | 'h3' | 'ul' | 'ol' | 'callout-info' | 'callout-warning' | 'callout-tip' | 'callout-important' | 'table' | 'checkbox';

export default function PolicyEditor({ sections, onChange }: PolicyEditorProps) {
  const [activeFormats, setActiveFormats] = useState<Set<string>>(new Set());

  const toolbarItems: { action: FormatAction; icon: React.ElementType; label: string }[] = [
    { action: 'bold', icon: Bold, label: 'Bold' },
    { action: 'italic', icon: Italic, label: 'Italic' },
    { action: 'h1', icon: Heading1, label: 'Heading 1' },
    { action: 'h2', icon: Heading2, label: 'Heading 2' },
    { action: 'h3', icon: Heading3, label: 'Heading 3' },
    { action: 'ul', icon: List, label: 'Bullet List' },
    { action: 'ol', icon: ListOrdered, label: 'Numbered List' },
  ];

  const insertItems: { action: FormatAction; icon: React.ElementType; label: string }[] = [
    { action: 'callout-info', icon: Info, label: 'Info Callout' },
    { action: 'callout-warning', icon: AlertTriangle, label: 'Warning Callout' },
    { action: 'callout-tip', icon: Lightbulb, label: 'Tip Callout' },
    { action: 'callout-important', icon: CheckSquare, label: 'Important Callout' },
    { action: 'table', icon: Table, label: 'Table' },
  ];

  const handleFormat = useCallback((action: FormatAction) => {
    document.execCommand(action === 'h1' ? 'formatBlock' : action, false, action === 'h1' ? 'H1' : undefined);
    setActiveFormats((prev) => {
      const next = new Set(prev);
      if (next.has(action)) next.delete(action);
      else next.add(action);
      return next;
    });
  }, []);

  const updateSectionContent = useCallback((sectionId: string, newContent: string) => {
    const updated = sections.map((s) =>
      s.id === sectionId ? { ...s, content: newContent } : s
    );
    onChange(updated);
  }, [sections, onChange]);

  const updateSectionItems = useCallback((sectionId: string, itemIndex: number, newValue: string) => {
    const updated = sections.map((s) => {
      if (s.id !== sectionId || !s.items) return s;
      const newItems = [...s.items];
      newItems[itemIndex] = newValue;
      return { ...s, items: newItems };
    });
    onChange(updated);
  }, [sections, onChange]);

  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <motion.div
        className="flex items-center gap-1 px-4 py-2 bg-white border-b border-slate-200 overflow-x-auto"
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      >
        <div className="flex items-center gap-0.5 pr-2 border-r border-slate-200">
          {toolbarItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeFormats.has(item.action);
            return (
              <button
                key={item.action}
                onClick={() => handleFormat(item.action)}
                className={`p-2 rounded-lg transition-all duration-150 ${
                  isActive
                    ? 'bg-leaf-50 text-leaf-700'
                    : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700'
                }`}
                title={item.label}
                type="button"
              >
                <Icon className="w-4 h-4" />
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-0.5 pl-1">
          {insertItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.action}
                onClick={() => handleFormat(item.action)}
                className="p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700 rounded-lg transition-all duration-150"
                title={item.label}
                type="button"
              >
                <Icon className="w-4 h-4" />
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-0.5 pl-2 border-l border-slate-200 ml-auto">
          <button
            onClick={() => document.execCommand('undo', false)}
            className="p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700 rounded-lg transition-all duration-150"
            title="Undo"
            type="button"
          >
            <Undo2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => document.execCommand('redo', false)}
            className="p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700 rounded-lg transition-all duration-150"
            title="Redo"
            type="button"
          >
            <Redo2 className="w-4 h-4" />
          </button>
        </div>
      </motion.div>

      {/* Editable Content */}
      <div className="flex-1 overflow-y-auto p-8 lg:p-12">
        <div className="max-w-content mx-auto space-y-2">
          {sections.map((section) => (
            <EditableSection
              key={section.id}
              section={section}
              onContentChange={(content) => updateSectionContent(section.id, content)}
              onItemChange={(idx, val) => updateSectionItems(section.id, idx, val)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function EditableSection({
  section,
  onContentChange,
  onItemChange,
}: {
  section: PolicySection;
  onContentChange: (content: string) => void;
  onItemChange: (index: number, value: string) => void;
}) {
  const baseClasses = 'outline-none rounded px-2 py-1 transition-all duration-150 border-l-2 border-transparent hover:border-slate-200 focus:border-leaf-300 focus:bg-leaf-50/30';

  switch (section.type) {
    case 'heading':
      return (
        <div className="mt-8 mb-2">
          <div
            className={`${baseClasses} font-heading text-2xl font-semibold text-slate-900`}
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onContentChange(e.currentTarget.textContent || '')}
          >
            {section.content}
          </div>
        </div>
      );
    case 'subheading':
      return (
        <div className="mt-6 mb-2">
          <div
            className={`${baseClasses} font-heading text-lg font-semibold text-slate-800`}
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onContentChange(e.currentTarget.textContent || '')}
          >
            {section.content}
          </div>
        </div>
      );
    case 'paragraph':
      return (
        <div className="mb-3">
          <div
            className={`${baseClasses} text-base text-slate-700 leading-relaxed`}
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onContentChange(e.currentTarget.textContent || '')}
          >
            {section.content}
          </div>
        </div>
      );
    case 'bullet-list':
      return (
        <ul className="mb-3 space-y-1.5 ml-6">
          {section.items?.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-leaf-500 mt-2 flex-shrink-0" />
              <span
                className={`${baseClasses} flex-1 text-base text-slate-700`}
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => onItemChange(idx, e.currentTarget.textContent || '')}
              >
                {item}
              </span>
            </li>
          ))}
        </ul>
      );
    case 'numbered-list':
      return (
        <ol className="mb-3 space-y-1.5 ml-6">
          {section.items?.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="text-leaf-600 font-semibold text-sm mt-0.5 flex-shrink-0 w-5">{idx + 1}.</span>
              <span
                className={`${baseClasses} flex-1 text-base text-slate-700`}
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => onItemChange(idx, e.currentTarget.textContent || '')}
              >
                {item}
              </span>
            </li>
          ))}
        </ol>
      );
    case 'callout-info':
      return (
        <div className="my-5 p-4 bg-teal-50 border-l-[3px] border-teal-500 rounded-r-lg">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
            <div
              className={`${baseClasses} flex-1 text-base text-teal-800`}
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => onContentChange(e.currentTarget.textContent || '')}
            >
              {section.content}
            </div>
          </div>
        </div>
      );
    case 'callout-warning':
      return (
        <div className="my-5 p-4 bg-[#FFFBEB] border-l-[3px] border-status-amber rounded-r-lg">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-[#92400E] flex-shrink-0 mt-0.5" />
            <div
              className={`${baseClasses} flex-1 text-base text-[#92400E]`}
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => onContentChange(e.currentTarget.textContent || '')}
            >
              {section.content}
            </div>
          </div>
        </div>
      );
    case 'callout-tip':
      return (
        <div className="my-5 p-4 bg-leaf-50 border-l-[3px] border-leaf-500 rounded-r-lg">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-leaf-700 flex-shrink-0 mt-0.5" />
            <div
              className={`${baseClasses} flex-1 text-base text-leaf-800`}
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => onContentChange(e.currentTarget.textContent || '')}
            >
              {section.content}
            </div>
          </div>
        </div>
      );
    case 'callout-important':
      return (
        <div className="my-5 p-4 bg-[#FEF2F2] border-l-[3px] border-status-red rounded-r-lg">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-[#991B1B] flex-shrink-0 mt-0.5" />
            <div
              className={`${baseClasses} flex-1 text-base text-[#991B1B]`}
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => onContentChange(e.currentTarget.textContent || '')}
            >
              {section.content}
            </div>
          </div>
        </div>
      );
    case 'table':
      return (
        <div className="my-5 overflow-x-auto">
          <table className="w-full border border-slate-200 rounded-lg overflow-hidden">
            {section.headers && (
              <thead>
                <tr className="bg-slate-100">
                  {section.headers.map((h, idx) => (
                    <th key={idx} className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
            )}
            <tbody>
              {section.rows?.map((row, ridx) => (
                <tr key={ridx} className={ridx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                  {row.cells.map((cell, cidx) => (
                    <td key={cidx} className="px-4 py-3 text-sm text-slate-700 border-t border-slate-100">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    default:
      return null;
  }
}
