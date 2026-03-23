import { useMemo, useState } from 'react';
import { BaseNode } from './baseNode';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');

  const variables = useMemo(() => {
    const re = /\{\{\s*([A-Za-z_$][A-Za-z0-9_$]*)\s*\}\}/g;
    const found = new Set();
    let match;
    while ((match = re.exec(currText)) !== null) found.add(match[1]);
    return Array.from(found);
  }, [currText]);

  const handles = useMemo(() => {
    const left = variables.map((v, i) => ({
      type: 'target',
      side: 'left',
      id: `${id}-${v}`,
      top: `${((i + 1) * 100) / (variables.length + 1)}%`,
    }));
    return [...left, { type: 'source', side: 'right', id: `${id}-output` }];
  }, [id, variables]);

  const lines = Math.max(3, currText.split('\n').length);
  const minHeight = Math.max(160, 90 + lines * 20);
  const width = Math.max(280, Math.min(500, 200 + currText.length * 2.8));

  return (
    <BaseNode
      id={id}
      title="Text"
      subtitle='Use {{variable}} for dynamic handles'
      icon="text"
      color="#0ea5e9"
      handles={handles}
      width={width}
      minHeight={minHeight}
    >
      <label className="flex flex-col gap-1 text-[11px] font-semibold uppercase tracking-[0.05em] text-slate-200">
        Content
        <textarea
          value={currText}
          onChange={(e) => setCurrText(e.target.value)}
          rows={lines}
          className="w-full resize-none rounded-md border border-slate-700 bg-brand-900 px-2 py-1 text-[13px] font-medium text-white outline-none focus:border-brand-500"
          placeholder="Write text… use {{variableName}} for inputs"
        />
      </label>
      {variables.length > 0 && (
        <div className="mt-1 flex flex-wrap gap-1">
          {variables.map((v) => (
            <span
              key={v}
              className="rounded border border-blue-700 bg-blue-900/40 px-1.5 py-0.5 font-mono text-[11px] font-semibold text-blue-100"
            >
              {`{{${v}}}`}
            </span>
          ))}
        </div>
      )}
    </BaseNode>
  );
};
