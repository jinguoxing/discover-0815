import React from 'react';
import {
  Sparkles,
  Plus,
  Bookmark,
  Share2,
  CheckCircle2,
  Layers,
  Maximize2,
  Minimize2,
  Sliders,
} from 'lucide-react';
import { SkillStatus } from '../types';

interface Props {
  title: string;
  skillName: string;
  skillStatus: SkillStatus;
  viewMode?: 'find' | 'ask';
  onSwitchViewMode?: (mode: 'find' | 'ask') => void;
  onNewAnalysis: () => void;
  onSaveResult: () => void;
  onContinue: () => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
}

export const Header: React.FC<Props> = ({
  title,
  skillName,
  skillStatus,
  viewMode = 'find',
  onSwitchViewMode,
  onNewAnalysis,
  onSaveResult,
  onContinue,
  isFullscreen,
  onToggleFullscreen,
}) => {
  return (
    <header className="h-13 border-b border-slate-200 bg-white flex items-center justify-between px-4 shrink-0 z-20 select-none">
      {/* Left: Semovix Logo & Xino AI Partner */}
      <div className="flex items-center gap-3">
        <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center text-white text-[10px] font-bold italic shadow-xs">
          SX
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
          <span className="font-bold tracking-tight">Semovix</span>
          <span className="text-slate-300 font-normal">|</span>
          <span className="text-slate-600 font-medium">Xino 智能数据助手</span>
        </div>
      </div>

      {/* Middle: Workbench View Mode Toggle Tabs */}
      <div className="flex items-center gap-2">
        <div className="flex items-center p-0.5 bg-slate-100 rounded-lg border border-slate-200 text-xs font-medium">
          <button
            onClick={() => onSwitchViewMode?.('find')}
            className={`px-3 py-1 rounded-md transition-all flex items-center gap-1.5 cursor-pointer ${
              viewMode === 'find'
                ? 'bg-white text-blue-600 font-bold shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>AI 找数 (Find Data)</span>
          </button>
          <button
            onClick={() => onSwitchViewMode?.('ask')}
            className={`px-3 py-1 rounded-md transition-all flex items-center gap-1.5 cursor-pointer ${
              viewMode === 'ask'
                ? 'bg-white text-blue-600 font-bold shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI 问数 (Ask Data)</span>
          </button>
        </div>

        <div className="hidden lg:flex items-center bg-slate-50 px-2.5 py-1 rounded-full border border-slate-200 text-[11px] text-slate-600">
          <span>当前任务：{title}</span>
        </div>
      </div>

      {/* Right: Skill Status & Action Buttons */}
      <div className="flex items-center gap-2.5">
        {/* Skill Badge */}
        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 border border-emerald-100 rounded text-[11px] font-medium text-emerald-700">
          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
          <span className="uppercase tracking-tight">Advisor Skill: {skillStatus}</span>
        </div>

        {/* Action Buttons */}
        <button
          onClick={onNewAnalysis}
          className="bg-white border border-slate-200 px-3 py-1.5 rounded text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
        >
          新建任务
        </button>

        <button
          onClick={onContinue}
          className="bg-blue-600 text-white px-3.5 py-1.5 rounded text-xs font-medium hover:bg-blue-700 shadow-xs transition-colors cursor-pointer"
        >
          {viewMode === 'find' ? '进入问数' : '继续研判'}
        </button>

        {/* Framing toggle */}
        <button
          onClick={onToggleFullscreen}
          title={isFullscreen ? "退出 1920x1080 标准大屏" : "进入 1920x1080 标准大屏"}
          className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded transition-colors cursor-pointer"
        >
          {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
        </button>
      </div>
    </header>
  );
};
