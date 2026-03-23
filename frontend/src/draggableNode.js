import {
  LogIn, LogOut, BrainCircuit, Type, Globe, Calculator,
  Filter, Clock, Braces, CircleDot,
} from 'lucide-react';

const ICON_MAP = {
  customInput:  LogIn,
  customOutput: LogOut,
  llm:          BrainCircuit,
  text:         Type,
  api:          Globe,
  math:         Calculator,
  filter:       Filter,
  delay:        Clock,
  json:         Braces,
};

export const DraggableNode = ({ type, label }) => {
  const NodeIcon = ICON_MAP[type] || CircleDot;
  const ICON_COLOR = '#60a5fa';

  const onDragStart = (event) => {
    event.dataTransfer.setData(
      'application/reactflow',
      JSON.stringify({ nodeType: type })
    );
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      className="flex h-10 min-w-[112px] cursor-grab select-none items-center gap-2 rounded-md border border-transparent px-2.5 text-[13px] font-semibold text-slate-100 transition hover:border-slate-700 hover:bg-slate-800 hover:text-white active:cursor-grabbing"
      onDragStart={onDragStart}
      onDragEnd={(e) => (e.target.style.cursor = 'grab')}
      draggable
    >
      <span className="flex items-center" style={{ color: ICON_COLOR }}>
        <NodeIcon size={15} strokeWidth={2.4} />
      </span>
      <span>{label}</span>
    </div>
  );
};
