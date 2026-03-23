import { useMemo, useState } from 'react';
import { BaseNode } from './baseNode';

export const OutputNode = ({ id, data }) => {
  const initialName = useMemo(
    () => data?.outputName || id.replace('customOutput-', 'output_'),
    [data?.outputName, id]
  );
  const [currName, setCurrName] = useState(initialName);
  const [outputType, setOutputType] = useState(data?.outputType || 'Text');

  return (
    <BaseNode
      id={id}
      title="Output"
      subtitle="Pipeline exit point"
      icon="output"
      color="#6366f1"
      handles={[{ type: 'target', side: 'left', id: `${id}-value` }]}
    >
      <label className="flex flex-col gap-1 text-[11px] font-semibold uppercase tracking-[0.05em] text-slate-200">
        Name
        <input
          className="rounded-md border border-slate-700 bg-brand-900 px-2 py-1 text-[13px] font-medium text-white outline-none focus:border-brand-500"
          type="text"
          value={currName}
          onChange={(e) => setCurrName(e.target.value)}
        />
      </label>
      <label className="flex flex-col gap-1 text-[11px] font-semibold uppercase tracking-[0.05em] text-slate-200">
        Type
        <select
          className="rounded-md border border-slate-700 bg-brand-900 px-2 py-1 text-[13px] font-medium text-white outline-none focus:border-brand-500"
          value={outputType}
          onChange={(e) => setOutputType(e.target.value)}
        >
          <option value="Text">Text</option>
          <option value="Image">Image</option>
        </select>
      </label>
    </BaseNode>
  );
};
