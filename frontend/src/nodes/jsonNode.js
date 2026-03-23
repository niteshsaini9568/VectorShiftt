import { BaseNode } from './baseNode';

export const JSONNode = ({ id }) => (
  <BaseNode
    id={id}
    title="JSON"
    subtitle="Serialize object to string"
    icon="json"
    color="#3b82f6"
    handles={[
      { type: 'target', side: 'left', id: `${id}-object` },
      { type: 'source', side: 'right', id: `${id}-json` },
    ]}
  >
    <div className="font-mono text-[12px] italic font-semibold text-slate-200">{'{ ... } -> string'}</div>
  </BaseNode>
);
