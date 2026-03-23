import { DraggableNode } from './draggableNode';

const NODE_DEFS = [
  { type: 'customInput',  label: 'Input' },
  { type: 'customOutput', label: 'Output' },
  { type: 'llm',          label: 'LLM' },
  { type: 'text',         label: 'Text' },
  { type: 'api',          label: 'API' },
  { type: 'math',         label: 'Math' },
  { type: 'filter',       label: 'Filter' },
  { type: 'delay',        label: 'Delay' },
  { type: 'json',         label: 'JSON' },
];

export const PipelineToolbar = () => (
  <div className="w-full shrink-0 overflow-x-auto border-b border-slate-800 bg-brand-800 p-3 md:w-52 md:overflow-y-auto md:border-b-0 md:border-r">
    <div className="mb-3 px-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-300">
      Nodes
    </div>
    <div className="flex gap-1 md:flex-col">
      {NODE_DEFS.map((def) => (
        <DraggableNode
          key={def.type}
          type={def.type}
          label={def.label}
        />
      ))}
    </div>
  </div>
);
