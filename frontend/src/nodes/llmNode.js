import { BaseNode } from './baseNode';

export const LLMNode = ({ id }) => (
  <BaseNode
    id={id}
    title="LLM"
    subtitle="Large language model"
    icon="llm"
    color="#8b5cf6"
    handles={[
      { type: 'target', side: 'left', id: `${id}-system`, top: '40%' },
      { type: 'target', side: 'left', id: `${id}-prompt`, top: '68%' },
      { type: 'source', side: 'right', id: `${id}-response` },
    ]}
  >
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center gap-2 text-[12px] font-semibold text-slate-200">
        <span className="h-1.5 w-1.5 rounded-full" style={{ background: '#8b5cf6' }} />
        system
      </div>
      <div className="flex items-center gap-2 text-[12px] font-semibold text-slate-200">
        <span className="h-1.5 w-1.5 rounded-full" style={{ background: '#8b5cf6' }} />
        prompt
      </div>
      <div className="flex items-center gap-2 text-[12px] font-semibold text-slate-200">
        <span className="h-1.5 w-1.5 rounded-full" style={{ background: '#3b82f6' }} />
        response
      </div>
    </div>
  </BaseNode>
);
