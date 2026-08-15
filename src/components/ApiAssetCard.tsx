import React, { useState } from 'react';
import { ApiAssetData } from '../types';
import { Network, Lock, Code2, Copy, Check, ShieldCheck, Play, Key } from 'lucide-react';

interface Props {
  data: ApiAssetData;
}

export const ApiAssetCard: React.FC<Props> = ({ data }) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'params' | 'response'>('params');

  const handleCopy = () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(data.endpoint).catch(() => {});
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-2xl bg-white rounded-xl border border-slate-200 shadow-sm p-4 space-y-3 font-sans text-xs my-2">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-100">
            <Network className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-800 text-xs sm:text-sm">{data.apiName}</span>
              <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">
                {data.protocol}
              </span>
            </div>
            <div className="text-[10px] text-slate-400 font-mono mt-0.5">
              代码: {data.apiCode} · 归口单位: {data.department}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1 text-[10px] font-mono bg-slate-900 text-emerald-400 px-2 py-1 rounded-md">
          <ShieldCheck className="w-3 h-3 text-emerald-400" />
          <span>{data.securitySeal}</span>
        </div>
      </div>

      {/* Endpoint Bar */}
      <div className="bg-slate-900 rounded-lg p-2.5 flex items-center justify-between font-mono text-[11px] text-slate-200 border border-slate-800">
        <div className="flex items-center gap-2 truncate pr-2">
          <span className="px-1.5 py-0.5 rounded bg-indigo-600 text-white font-bold text-[10px]">GET</span>
          <span className="truncate text-slate-300">{data.endpoint}</span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 text-[10px] text-indigo-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-2 py-1 rounded transition-colors cursor-pointer shrink-0"
        >
          {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
          <span>{copied ? '已复制' : '复制 API'}</span>
        </button>
      </div>

      {/* Rate Limit & Auth Badge */}
      <div className="grid grid-cols-2 gap-2 text-[11px]">
        <div className="bg-slate-50 p-2 rounded-lg border border-slate-100 flex items-center justify-between">
          <span className="text-slate-400">并发限流 SLA:</span>
          <span className="font-semibold text-slate-700">{data.rateLimit}</span>
        </div>
        <div className="bg-slate-50 p-2 rounded-lg border border-slate-100 flex items-center justify-between">
          <span className="text-slate-400 flex items-center gap-1">
            <Key className="w-3 h-3 text-amber-500" /> 认证验签方式:
          </span>
          <span className="font-mono text-indigo-700 font-semibold">Semovix OAuth2 Bearer</span>
        </div>
      </div>

      {/* Tabs */}
      <div>
        <div className="flex items-center gap-4 border-b border-slate-200 text-[11px] font-semibold text-slate-500 pb-1 mb-2">
          <button
            onClick={() => setActiveTab('params')}
            className={`pb-1 transition-colors cursor-pointer ${
              activeTab === 'params' ? 'text-indigo-600 border-b-2 border-indigo-600 font-bold' : 'hover:text-slate-800'
            }`}
          >
            请求参数说明 ({data.params.length})
          </button>
          <button
            onClick={() => setActiveTab('response')}
            className={`pb-1 transition-colors cursor-pointer ${
              activeTab === 'response' ? 'text-indigo-600 border-b-2 border-indigo-600 font-bold' : 'hover:text-slate-800'
            }`}
          >
            样例 Response 结构
          </button>
        </div>

        {activeTab === 'params' ? (
          <div className="overflow-x-auto">
            <table className="w-full text-[11px] text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500">
                  <th className="p-1.5 font-semibold">参数名</th>
                  <th className="p-1.5 font-semibold">类型</th>
                  <th className="p-1.5 font-semibold">必选</th>
                  <th className="p-1.5 font-semibold">说明</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono">
                {data.params.map((p, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/80">
                    <td className="p-1.5 font-bold text-slate-800">{p.name}</td>
                    <td className="p-1.5 text-indigo-600">{p.type}</td>
                    <td className="p-1.5 font-sans">
                      {p.required ? (
                        <span className="text-rose-600 font-bold">是</span>
                      ) : (
                        <span className="text-slate-400">否</span>
                      )}
                    </td>
                    <td className="p-1.5 font-sans text-slate-600">{p.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="bg-slate-900 rounded-lg p-2.5 text-slate-200 font-mono text-[10px] leading-relaxed border border-slate-800">
            <pre className="overflow-x-auto whitespace-pre-wrap">{data.sampleResponse}</pre>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-[10px] text-slate-400">
        <span>政务共享数据总线 Token 已自动签发</span>
        <button
          onClick={() => alert(`API 测试模式已激活！接口指令已准备，可使用 Endpoint: ${data.endpoint}`)}
          className="flex items-center gap-1 text-indigo-600 hover:text-indigo-800 font-semibold cursor-pointer"
        >
          <Play className="w-3 h-3 text-indigo-600" />
          在线调用沙箱测试
        </button>
      </div>
    </div>
  );
};
