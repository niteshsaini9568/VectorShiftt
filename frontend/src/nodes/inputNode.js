import { useMemo, useState } from 'react';
import { BaseNode } from './baseNode';

export const InputNode = ({ id, data }) => {
  const initialName = useMemo(
    () => data?.inputName || id.replace('customInput-', 'input_'),
    [data?.inputName, id]
  );
  const [currName, setCurrName] = useState(initialName);
  const [inputType, setInputType] = useState(data?.inputType || 'Text');

  return (
    <BaseNode
      id={id}
      title="Input"
      subtitle="Pipeline entry point"
      icon="input"
      color="#3b82f6"
      handles={[{ type: 'source', side: 'right', id: `${id}-value` }]}
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
          value={inputType}
          onChange={(e) => setInputType(e.target.value)}
        >
          <option value="Text">Text</option>
          <option value="File">File</option>
        </select>
      </label>
    </BaseNode>
  );
};
