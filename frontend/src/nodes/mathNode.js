import { BaseNode } from './baseNode';

export const MathNode = ({ id }) => (
  <BaseNode
    id={id}
    title="Math"
    subtitle="Arithmetic on two inputs"
    icon="math"
    color="#3b82f6"
    handles={[
      { type: 'target', side: 'left', id: `${id}-a`, top: '42%' },
      { type: 'target', side: 'left', id: `${id}-b`, top: '70%' },
      { type: 'source', side: 'right', id: `${id}-result` },
    ]}
  >
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center gap-2 text-[12px] font-semibold text-slate-200"><span className="h-1.5 w-1.5 rounded-full" style={{ background: '#3b82f6' }} />a</div>
      <div className="flex items-center gap-2 text-[12px] font-semibold text-slate-200"><span className="h-1.5 w-1.5 rounded-full" style={{ background: '#3b82f6' }} />b</div>
    </div>
  </BaseNode>
);
