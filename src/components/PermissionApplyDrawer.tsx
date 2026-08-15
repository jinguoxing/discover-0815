import React, { useState } from 'react';
import { ShieldAlert, Key, Lock, CheckCircle2, X, FileText, UserCheck, Sparkles, Building2 } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onApproveSuccess: () => void;
  assetName: string;
}

export const PermissionApplyDrawer: React.FC<Props> = ({
  isOpen,
  onClose,
  onApproveSuccess,
  assetName,
}) => {
  const [reason, setReason] = useState('用于闵行区老年人口规模与养老设施供需匹配分析研判');
  const [duration, setDuration] = useState('30天');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        onApproveSuccess();
        setIsSuccess(false);
        onClose();
      }, 1200);
    }, 800);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex justify-end transition-opacity animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col font-sans border-l border-slate-200">
        {/* Header */}
        <div className="p-4 border-b border-slate-200 bg-slate-50/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-amber-100 text-amber-800 rounded-lg">
              <Key className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-sm">政务数据访问权限快速申请</h3>
              <p className="text-[11px] text-slate-500">Semovix Security & Compliance Authorization Gateway</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 flex-1 overflow-y-auto space-y-4 text-xs text-slate-700">
          {/* Asset Badge Card */}
          <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-800 text-xs">{assetName}</span>
              <span className="px-2 py-0.5 bg-amber-200/80 text-amber-900 text-[10px] font-bold rounded">
                REQUESTABLE
              </span>
            </div>
            <p className="text-[11px] text-slate-600">
              归口部门：上海市民政局 × 大数据中心 | 粒度：自然人级明细视图
            </p>
          </div>

          {/* Compliance Banner */}
          <div className="p-3 bg-indigo-50/70 border border-indigo-100 rounded-xl flex items-start gap-2.5">
            <ShieldAlert className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
            <div className="text-[11px] text-indigo-900 leading-relaxed">
              <span className="font-bold">C2级数据脱敏校验保证：</span>
              申请通过后，敏感身份字段（身份证号、手机）将通过国密算法自动盲化脱敏，不透露自然人隐私。
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                申请使用场景 / 业务事由 <span className="text-rose-500">*</span>
              </label>
              <textarea
                rows={3}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-xs focus:outline-hidden focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-slate-800 resize-none"
                required
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                申请访问期限 <span className="text-rose-500">*</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['7天', '30天', '90天'].map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setDuration(item)}
                    className={`py-1.5 px-3 text-xs font-semibold rounded-lg border text-center transition-all cursor-pointer ${
                      duration === item
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-700 shadow-xs'
                        : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 space-y-2 text-[11px] text-slate-500">
              <div className="flex items-center justify-between">
                <span>申请人岗位 / 角色</span>
                <span className="font-medium text-slate-800 flex items-center gap-1">
                  <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                  民政养老规划业务专员 (政务网关认证)
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>智能审批通道</span>
                <span className="font-medium text-indigo-600 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  Semovix AI 语义防越权防泄露校验通过
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2 px-3 border border-slate-200 rounded-lg text-slate-600 font-semibold text-xs hover:bg-slate-50 transition-colors"
              >
                取消
              </button>
              <button
                type="submit"
                disabled={isSubmitting || isSuccess}
                className="flex-1 py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-xs cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>提交中...</span>
                ) : isSuccess ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-white" />
                    <span>已授权成功！</span>
                  </>
                ) : (
                  <>
                    <Key className="w-3.5 h-3.5" />
                    <span>快速一键授权</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
