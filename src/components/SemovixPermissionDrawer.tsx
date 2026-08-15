import React, { useState } from 'react';
import { ShieldCheck, X, CheckCircle, Lock, Calendar, AlertCircle } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  assetName?: string;
  onSubmitSuccess?: () => void;
}

export const SemovixPermissionDrawer: React.FC<Props> = ({
  isOpen,
  onClose,
  assetName = '人口基本信息',
  onSubmitSuccess,
}) => {
  const [purpose, setPurpose] = useState('闵行区老年人口与养老服务资源匹配分析');
  const [duration, setDuration] = useState<'7d' | '30d' | '90d'>('30d');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      if (onSubmitSuccess) {
        onSubmitSuccess();
      }
    }, 600);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/30 backdrop-blur-[2px] transition-opacity">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col border-l border-slate-200 animate-in slide-in-from-right duration-200">
        {/* Drawer Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-800">申请数据使用权限</h3>
              <p className="text-xs text-slate-500">Semovix 资产授权治理中心</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-200/50 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs text-slate-700">
          {submitted ? (
            <div className="py-10 text-center space-y-4">
              <div className="w-14 h-14 bg-emerald-50 border border-emerald-200 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-xs">
                <CheckCircle className="w-7 h-7" />
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-800">申请已提交</h4>
                <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                  授权申请单已成功推送至 Semovix 数据合规审批队列。审批结果将实时回传。
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-left space-y-2 mt-4 text-[11px]">
                <div className="flex justify-between text-slate-500">
                  <span>申请单号</span>
                  <span className="font-mono text-slate-700">REQ-2026-0815-9921</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>目标资源</span>
                  <span className="font-medium text-slate-800">{assetName}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>审批节点</span>
                  <span className="text-amber-600 font-medium">数据安全官 (DSO) 审阅中</span>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={handleReset}
                  className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-lg transition-colors cursor-pointer"
                >
                  关闭窗口
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Asset Badge */}
              <div className="bg-amber-50/70 border border-amber-200/80 rounded-lg p-3.5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-900">{assetName}</span>
                  <span className="px-2 py-0.5 bg-amber-100 text-amber-800 text-[10px] font-bold rounded">
                    REQUESTABLE
                  </span>
                </div>
                <p className="text-[11px] text-amber-700/90 leading-relaxed">
                  包含自然人人口明细及区域归属信息。依据企业数据安全分类分级标准，需补充申请用途。
                </p>
              </div>

              {/* Form Input: Purpose */}
              <div className="space-y-1.5">
                <label className="block font-semibold text-slate-700">
                  使用目的 <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={3}
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none resize-none"
                  placeholder="请详细说明业务分析场景与数据用途..."
                  required
                />
              </div>

              {/* Form Input: Duration */}
              <div className="space-y-1.5">
                <label className="block font-semibold text-slate-700 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  申请期限
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: '7d', label: '7 天' },
                    { id: '30d', label: '30 天' },
                    { id: '90d', label: '90 天' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setDuration(item.id as any)}
                      className={`py-2 text-center rounded-lg border font-medium text-xs transition-colors cursor-pointer ${
                        duration === item.id
                          ? 'border-blue-600 bg-blue-50 text-blue-700 font-semibold'
                          : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Governance Notice */}
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-start gap-2 text-[11px] text-slate-600">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <p>
                  提交后将自动触发离散脱敏策略。脱敏规则：隐藏身份证中段 8 位，姓名脱敏为姓氏+*。
                </p>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? '正在提交...' : '提交申请'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
