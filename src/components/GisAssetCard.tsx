import React from 'react';
import { MapPin, Database, CheckCircle2, Layers, RefreshCw } from 'lucide-react';
import { GisAssetData } from '../types';

interface Props {
  data: GisAssetData;
}

export const GisAssetCard: React.FC<Props> = ({ data }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs text-xs space-y-3 max-w-2xl">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
            <MapPin className="w-3.5 h-3.5" />
          </div>
          <div>
            <h4 className="font-bold text-slate-800 text-sm flex items-center gap-2">
              {data.assetName}
              <span className="text-[10px] font-mono bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-normal">
                {data.assetCode}
              </span>
            </h4>
          </div>
        </div>

        <div className="flex items-center gap-1 text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-medium border border-emerald-100">
          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
          <span>要素完整率 {data.auditPassRate}</span>
        </div>
      </div>

      {/* Point count & Service radius banner */}
      <div className="grid grid-cols-3 gap-2 text-center bg-slate-50 p-2.5 rounded-lg border border-slate-100">
        <div>
          <div className="text-[10px] text-slate-400">已核对地理坐标点</div>
          <div className="text-sm font-bold text-slate-800 font-mono mt-0.5">{data.totalPoints} <span className="text-[10px] font-normal text-slate-500">处</span></div>
        </div>
        <div>
          <div className="text-[10px] text-slate-400">覆盖服务半径</div>
          <div className="text-sm font-bold text-indigo-700 font-mono mt-0.5">{data.coverageRadius}</div>
        </div>
        <div>
          <div className="text-[10px] text-slate-400">空间库同步频率</div>
          <div className="text-sm font-bold text-slate-700 font-mono mt-0.5">{data.syncFrequency}</div>
        </div>
      </div>

      {/* Layer tags */}
      <div className="space-y-1 text-[11px]">
        <div className="text-slate-400 font-medium flex items-center gap-1">
          <Layers className="w-3 h-3 text-slate-400" />
          <span>挂载设施图层明细：</span>
        </div>
        <div className="flex flex-wrap gap-1.5 pt-0.5">
          {data.layers.map((lyr, idx) => (
            <span
              key={idx}
              className="bg-indigo-50 text-indigo-700 border border-indigo-100 text-[10px] px-2 py-0.5 rounded font-medium"
            >
              {lyr}
            </span>
          ))}
        </div>
      </div>

      {/* Attribute Mapping list */}
      <div className="bg-slate-50/80 p-2.5 rounded-lg border border-slate-100 space-y-1 text-[11px]">
        <div className="font-bold text-slate-700 mb-1 flex items-center gap-1 text-[10px]">
          <Database className="w-3 h-3 text-slate-500" />
          关键空间属性标准映射表：
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[10px] text-slate-600">
          {data.attributes.map((attr, idx) => (
            <div key={idx} className="flex items-center justify-between border-b border-slate-100 pb-0.5">
              <span className="text-slate-400">{attr.label}:</span>
              <span className="font-mono font-medium text-slate-800">{attr.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
