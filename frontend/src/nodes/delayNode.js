import { BaseNode } from './baseNode';

export const DelayNode = ({ id }) => (
  <BaseNode
    id={id}
    title="Delay"
    subtitle="Pause downstream execution"
    icon="delay"
    color="#475569"
    handles={[
      { type: 'target', side: 'left', id: `${id}-input` },
      { type: 'source', side: 'right', id: `${id}-output` },
    ]}
  >
    <div className="font-mono text-[12px] italic font-semibold text-slate-200">250 ms</div>
  </BaseNode>
);
