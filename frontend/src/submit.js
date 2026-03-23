import { Github, Linkedin, Play } from 'lucide-react';
import { useStore } from './store';

export const SubmitButton = () => {
  const nodes            = useStore((s) => s.nodes);
  const edges            = useStore((s) => s.edges);
  const pipelineStatus   = useStore((s) => s.pipelineStatus);
  const setPipelineStatus = useStore((s) => s.setPipelineStatus);

  const onSubmit = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/pipelines/parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nodes, edges }),
      });

      if (!response.ok) throw new Error(`Server error: ${response.status}`);

      const { num_nodes, num_edges, is_dag } = await response.json();

      setPipelineStatus(is_dag ? 'dag' : 'cycle');

      alert(
        `Pipeline Analysis\n\n` +
        `Nodes :  ${num_nodes}\n` +
        `Edges :  ${num_edges}\n` +
        `Is DAG:  ${is_dag ? '✅  Yes — valid DAG' : '❌  No — contains a cycle'}`
      );
    } catch (err) {
      setPipelineStatus(null);
      alert(`Failed to submit pipeline:\n${err.message}`);
    }
  };

  const statusColor =
    pipelineStatus === 'dag'   ? 'text-green-400' :
    pipelineStatus === 'cycle' ? 'text-red-400'   :
    'text-slate-400';

  const statusLabel =
    pipelineStatus === 'dag'   ? '● Valid DAG' :
    pipelineStatus === 'cycle' ? '● Contains cycle' :
    null;

  return (
    <div className="flex min-h-14 shrink-0 flex-wrap items-center justify-between gap-3 border-t border-slate-800 bg-[#151922] px-3 py-2 sm:px-5">
      <div className="flex items-center gap-2">
        <a
          href="https://github.com/niteshsaini9568"
          target="_blank"
          rel="noreferrer"
          title="GitHub"
          className="group inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-600/70 bg-gradient-to-b from-slate-700 to-slate-900 text-slate-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_8px_16px_rgba(0,0,0,0.35)] transition hover:-translate-y-0.5 hover:border-blue-500"
        >
          <Github size={16} strokeWidth={2.6} className="transition group-hover:text-blue-300" />
        </a>
        <a
          href="https://www.linkedin.com/in/nitesh-saini-b936b1257"
          target="_blank"
          rel="noreferrer"
          title="LinkedIn"
          className="group inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-600/70 bg-gradient-to-b from-slate-700 to-slate-900 text-slate-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_8px_16px_rgba(0,0,0,0.35)] transition hover:-translate-y-0.5 hover:border-blue-500"
        >
          <Linkedin size={16} strokeWidth={2.6} className="transition group-hover:text-blue-300" />
        </a>
      </div>
      <div className="flex items-center gap-3">
      <span className="text-[14px] font-semibold text-slate-100">
        {nodes.length} node{nodes.length !== 1 ? 's' : ''}
        {' · '}
        {edges.length} edge{edges.length !== 1 ? 's' : ''}
      </span>
      {statusLabel && (
        <span className={`text-[13px] font-bold ${statusColor}`}>
          {statusLabel}
        </span>
      )}
      </div>
      <button
        type="button"
        onClick={onSubmit}
        className="inline-flex items-center gap-1.5 rounded-md bg-blue-600 px-4 py-2 text-[14px] font-bold text-white transition hover:bg-blue-500 active:bg-blue-700"
      >
        <Play size={14} strokeWidth={2.8} />
        Submit Pipeline
      </button>
    </div>
  );
};
