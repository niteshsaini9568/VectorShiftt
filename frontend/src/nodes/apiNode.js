import { BaseNode } from './baseNode';

export const APINode = ({ id }) => (
  <BaseNode
    id={id}
    title="API"
    subtitle="Call an external HTTP endpoint"
    icon="api"
    color="#06b6d4"
    handles={[
      { type: 'target', side: 'left', id: `${id}-request` },
      { type: 'source', side: 'right', id: `${id}-response` },
    ]}
  >
    <div className="font-mono text-[12px] italic font-semibold text-slate-200">GET /v1/resource</div>
  </BaseNode>
);
