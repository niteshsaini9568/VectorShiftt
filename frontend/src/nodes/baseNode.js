import { Handle, Position } from 'reactflow';
import {
  LogIn, LogOut, BrainCircuit, Type, Globe, Calculator,
  Filter, Clock, Braces, X, CircleDot,
} from 'lucide-react';
import { useStore } from '../store';

const ICON_MAP = {
  input:  LogIn,
  output: LogOut,
  llm:    BrainCircuit,
  text:   Type,
  api:    Globe,
  math:   Calculator,
  filter: Filter,
  delay:  Clock,
  json:   Braces,
};

const handlePositionMap = {
  left:  Position.Left,
  right: Position.Right,
};

const ICON_COLOR = '#60a5fa';

export const BaseNode = ({
  id,
  title,
  subtitle,
  icon,
  children,
  handles = [],
  width = 260,
  minHeight,
}) => {
  const deleteNode       = useStore((s) => s.deleteNode);
  const pipelineStatus   = useStore((s) => s.pipelineStatus);
  const NodeIcon         = ICON_MAP[icon] || CircleDot;

  const borderColor =
    pipelineStatus === 'dag'   ? '#22c55e' :
    pipelineStatus === 'cycle' ? '#ef4444' :
    '#475569';

  const headerBg =
    pipelineStatus === 'dag'   ? 'rgba(34,197,94,0.08)'  :
    pipelineStatus === 'cycle' ? 'rgba(239,68,68,0.08)'  :
    'rgba(71,85,105,0.35)';

  return (
    <div
      className="overflow-visible rounded-lg bg-[#1a1f2e] shadow-[0_2px_12px_rgba(0,0,0,0.5)] transition-all duration-300"
      style={{
        width,
        minHeight,
        border: `1.5px solid ${borderColor}`,
      }}
    >
      {handles.map((handle) => (
        <Handle
          key={handle.id}
          type={handle.type}
          position={handlePositionMap[handle.side]}
          id={handle.id}
          style={{
            top: handle.top,
            borderColor: '#0f172a',
            background: borderColor,
            boxShadow: `0 0 0 1px ${borderColor}66`,
          }}
        />
      ))}

      <div
        className="flex items-center gap-2.5 rounded-t-lg border-b px-3 py-2.5 transition-all duration-300"
        style={{
          borderLeftWidth: '3px',
          borderLeftStyle: 'solid',
          borderLeftColor: borderColor,
          borderBottomColor: borderColor + '44',
          background: headerBg,
        }}
      >
        <div className="flex shrink-0 items-center" style={{ color: ICON_COLOR }}>
          <NodeIcon size={16} strokeWidth={2.8} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-[14px] font-bold leading-tight text-white">{title}</div>
          {subtitle && (
            <div className="truncate text-[12px] font-semibold text-slate-200">{subtitle}</div>
          )}
        </div>
        <button
          className="flex h-5 w-5 shrink-0 items-center justify-center rounded border border-transparent p-0 text-slate-500 transition hover:border-red-800 hover:bg-red-950/60 hover:text-red-400"
          onClick={() => deleteNode(id)}
          title="Delete node"
        >
          <X size={12} strokeWidth={2.5} />
        </button>
      </div>

      <div className="flex flex-col gap-2.5 p-3">{children}</div>
    </div>
  );
};
