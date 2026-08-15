import React from 'react';
import {
  Plus,
  MessageSquare,
  Star,
  Clock,
  FolderKanban,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { Session } from '../types';

interface Props {
  sessions: Session[];
  activeSessionId: string;
  onSelectSession: (id: string) => void;
  onNewSession: () => void;
}

export const SessionList: React.FC<Props> = ({
  sessions,
  activeSessionId,
  onSelectSession,
  onNewSession,
}) => {
  return (
    <aside className="w-[220px] bg-[#F1F3F6] border-r border-slate-200 flex flex-col h-full shrink-0 select-none">
      {/* Sidebar Header & New Analysis Button */}
      <div className="p-4 border-b border-slate-200/80">
        <button
          onClick={onNewSession}
          className="w-full flex items-center justify-center gap-1.5 py-2 px-3 bg-white border border-slate-200 rounded-md text-xs font-medium text-slate-700 hover:bg-slate-50 hover:shadow-xs transition-all cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5 text-indigo-600" />
          <span>新建分析</span>
        </button>
      </div>

      {/* Main Session List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-5">
        <div>
          <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
            我的分析
          </h4>
          <div className="space-y-1">
            {sessions.map((s) => {
              const isActive = s.id === activeSessionId;
              return (
                <button
                  key={s.id}
                  onClick={() => onSelectSession(s.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded text-xs font-medium transition-all text-left group cursor-pointer ${
                    isActive
                      ? 'bg-indigo-50 border border-indigo-100 text-indigo-700 font-semibold shadow-2xs'
                      : 'text-slate-600 hover:bg-slate-200/60 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <MessageSquare
                      className={`w-3.5 h-3.5 shrink-0 ${
                        isActive ? 'text-indigo-600' : 'text-slate-400 group-hover:text-slate-600'
                      }`}
                    />
                    <span className="truncate">{s.title}</span>
                  </div>
                  <span
                    className={`text-[10px] shrink-0 font-normal px-1 rounded ${
                      isActive ? 'text-indigo-600' : 'text-slate-400'
                    }`}
                  >
                    {s.timeLabel}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
            常用分类
          </h4>
          <div className="space-y-1 text-xs text-slate-600 font-medium">
            <button className="w-full flex items-center justify-between px-3 py-1.5 rounded hover:bg-slate-200/60 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer">
              <div className="flex items-center gap-2">
                <Star className="w-3.5 h-3.5 text-amber-500" />
                <span>收藏分析</span>
              </div>
              <span className="text-[10px] text-slate-400 bg-white px-1.5 py-0.2 rounded border border-slate-200">2</span>
            </button>

            <button className="w-full flex items-center justify-between px-3 py-1.5 rounded hover:bg-slate-200/60 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer">
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>最近访问</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom User / Platform status */}
      <div className="p-3.5 border-t border-slate-200 bg-white/40">
        <div className="flex items-center justify-between text-[11px] text-slate-500">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-indigo-100 border border-indigo-200 flex items-center justify-center font-bold text-[10px] text-indigo-700">
              EX
            </div>
            <span className="font-medium text-slate-700">Enterprise User</span>
          </div>
          <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100">
            Online
          </span>
        </div>
      </div>
    </aside>
  );
};
