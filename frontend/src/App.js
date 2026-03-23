import { ExternalLink, Workflow } from 'lucide-react';
import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';

function App() {
  return (
    <div className="flex h-screen flex-col overflow-hidden bg-brand-900">
      <header className="z-10 flex min-h-14 shrink-0 flex-wrap items-center justify-between gap-2 border-b border-slate-800 bg-brand-800 px-3 py-2 sm:px-5">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-brand-500 text-white">
            <Workflow size={15} strokeWidth={2} />
          </div>
          <span className="text-[15px] font-bold tracking-tight text-white">VectorShift</span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <a
            href="https://www.niteshtechfolio.site/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 rounded-md border border-slate-700 bg-slate-800 px-2.5 py-1 text-[12px] font-semibold text-slate-100 transition hover:border-blue-500 hover:text-white"
          >
            About me
            <ExternalLink size={12} strokeWidth={2.6} />
          </a>
          <a
            href="https://github.com/niteshsaini9568"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 rounded-md border border-slate-700 bg-slate-800 px-2.5 py-1 text-[12px] font-semibold text-slate-100 transition hover:border-blue-500 hover:text-white"
          >
            How it works
            <ExternalLink size={12} strokeWidth={2.6} />
          </a>
          <span className="rounded-md border border-slate-700 bg-slate-800 px-2.5 py-1 text-[12px] font-semibold text-slate-100">
            Pipeline Builder
          </span>
        </div>
      </header>

      <div className="flex flex-1 flex-col overflow-hidden md:flex-row">
        <PipelineToolbar />
        <div className="mesh-grid-bg relative flex-1 overflow-hidden">
          <PipelineUI />
        </div>
      </div>

      <SubmitButton />
    </div>
  );
}

export default App;
