import { BaseNode } from './baseNode';

export const FilterNode = ({ id }) => (
  <BaseNode
    id={id}
    title="Filter"
    subtitle="Keep items matching a rule"
    icon="filter"
    color="#64748b"
    handles={[
      { type: 'target', side: 'left', id: `${id}-items` },
      { type: 'source', side: 'right', id: `${id}-filtered` },
    ]}
  >
    <div className="font-mono text-[12px] italic font-semibold text-slate-200">status === "active"</div>
  </BaseNode>
);
