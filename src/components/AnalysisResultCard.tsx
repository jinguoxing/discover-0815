import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Table, BarChart3, Info, Download, ArrowUpDown } from 'lucide-react';
import { AnalysisResultData } from '../types';

interface Props {
  data: AnalysisResultData;
}

export const AnalysisResultCard: React.FC<Props> = ({ data }) => {
  const [sortAsc, setSortAsc] = useState(false);
  const [copied, setCopied] = useState(false);

  const displayRows = [...data.tableData].sort((a, b) =>
    sortAsc ? a.popNum - b.popNum : b.popNum - a.popNum
  );

  const handleCopyTable = () => {
    const markdown = displayRows
      .map((r, idx) => `${idx + 1}. ${r.town}: ${r.population} (${r.ratio})`)
      .join('\n');
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(`重点街镇老年人口统计:\n${markdown}`).catch(() => {});
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mt-3 bg-white border border-slate-200 rounded-lg p-4 shadow-xs max-w-2xl">
      {/* Top One-Sentence Summary Callout */}
      <div className="flex items-start gap-2.5 p-3 rounded bg-indigo-50/70 border border-indigo-100 mb-4 text-xs">
        <Info className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-slate-800 mr-1">总结结论:</span>
          <span className="text-slate-700 font-medium">{data.summary}</span>
        </div>
      </div>

      {/* Grid containing Table and Bar Chart */}
      <div className="space-y-4">
        {/* Table View */}
        <div>
          <div className="flex items-center justify-between mb-2 text-xs font-bold text-slate-700">
            <div className="flex items-center gap-1.5">
              <Table className="w-3.5 h-3.5 text-indigo-600" />
              <span>重点街镇老年人口统计</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setSortAsc(!sortAsc)}
                className="flex items-center gap-1 text-[11px] font-normal text-slate-500 hover:text-slate-800 cursor-pointer"
              >
                <ArrowUpDown className="w-3 h-3 text-slate-400" />
                <span>{sortAsc ? '从小到大' : '从大到小'}</span>
              </button>
              <button
                onClick={handleCopyTable}
                className="flex items-center gap-1 text-[11px] font-normal text-indigo-600 hover:text-indigo-800 cursor-pointer"
              >
                <Download className="w-3 h-3 text-indigo-500" />
                <span>{copied ? '已复制明细' : '导出表格'}</span>
              </button>
            </div>
          </div>

          <div className="overflow-hidden rounded border border-slate-200">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-2 px-3">街镇</th>
                  <th className="py-2 px-3 text-right">老年人口数量</th>
                  <th className="py-2 px-3 text-right">全区占比</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {displayRows.map((row, idx) => (
                  <tr
                    key={idx}
                    className={idx < 3 ? 'bg-indigo-50/20 font-semibold' : 'hover:bg-slate-50/80'}
                  >
                    <td className="py-2 px-3 text-slate-800 flex items-center gap-2">
                      <span
                        className={`w-4 h-4 rounded text-[10px] flex items-center justify-center font-bold ${
                          idx === 0
                            ? 'bg-indigo-600 text-white'
                            : idx === 1
                            ? 'bg-indigo-500 text-white'
                            : idx === 2
                            ? 'bg-indigo-400 text-white'
                            : 'bg-slate-200 text-slate-600'
                        }`}
                      >
                        {idx + 1}
                      </span>
                      {row.town}
                    </td>
                    <td className="py-2 px-3 text-right text-slate-900 font-bold">{row.population}</td>
                    <td className="py-2 px-3 text-right text-slate-500">{row.ratio}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recharts Enterprise Bar Chart */}
        <div className="pt-3 border-t border-slate-100">
          <div className="flex items-center justify-between mb-2 text-xs">
            <div className="flex items-center gap-1.5 font-bold text-slate-700">
              <BarChart3 className="w-3.5 h-3.5 text-indigo-600" />
              <span>{data.chartTitle}</span>
            </div>
            <span className="text-[11px] text-slate-400 font-mono">单位：万人</span>
          </div>

          <div className="h-44 w-full bg-slate-50/60 p-2 rounded border border-slate-100">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data.tableData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <XAxis
                  dataKey="town"
                  tick={{ fontSize: 11, fill: '#64748b' }}
                  axisLine={{ stroke: '#e2e8f0' }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 10, fill: '#94a3b8' }}
                  axisLine={false}
                  tickLine={false}
                  domain={[0, 7]}
                />
                <Tooltip
                  formatter={(val: any) => [`${val} 万人`, '老年人口']}
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderRadius: '6px',
                    border: 'none',
                    color: '#fff',
                    fontSize: '12px',
                    padding: '6px 10px',
                  }}
                  itemStyle={{ color: '#818cf8' }}
                />
                <Bar dataKey="popNum" radius={[4, 4, 0, 0]} barSize={26}>
                  {data.tableData.map((_entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        index === 0
                          ? '#4f46e5'
                          : index === 1
                          ? '#6366f1'
                          : index === 2
                          ? '#818cf8'
                          : '#a5b4fc'
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

