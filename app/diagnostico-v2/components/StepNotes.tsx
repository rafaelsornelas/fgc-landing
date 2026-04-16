import { motion } from 'framer-motion';
import { ChevronDown, PenLine } from 'lucide-react';

type StepNotesProps = {
  noteKey: string;
  label: string;
  value: string;
  isOpen: boolean;
  placeholder: string;
  onToggle: (key: string) => void;
  onChange: (key: string, value: string) => void;
};

export function StepNotes({ noteKey, label, value, isOpen, placeholder, onToggle, onChange }: StepNotesProps) {
  return (
    <div className="pt-1">
      <button
        type="button"
        onClick={() => onToggle(noteKey)}
        className="flex items-center gap-2 text-sm text-slate-400 hover:text-amber-400 transition-colors w-full"
        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '6px 0' }}
      >
        <PenLine className="w-4 h-4" />
        <span>{label}</span>
        <ChevronDown
          className="w-4 h-4 ml-auto transition-transform duration-200"
          style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
        />
      </button>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
        >
          <textarea
            value={value}
            onChange={(event) => onChange(noteKey, event.target.value)}
            placeholder={placeholder}
            rows={4}
            className="w-full mt-2 text-white text-sm rounded-xl px-4 py-3 focus:outline-none resize-none"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: 'white', fontSize: '0.875rem' }}
          />
        </motion.div>
      )}
    </div>
  );
}
