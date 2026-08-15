import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Sparkles,
  Bot,
  User,
  Loader2,
  RotateCcw,
  Code2,
  Copy,
  Check,
  ThumbsUp,
  ThumbsDown,
  Paperclip,
  Mic,
  MicOff,
  ChevronRight,
  Database,
  ArrowRight,
} from 'lucide-react';
import { ChatMessage } from '../types';
import { UnderstandingCard } from './UnderstandingCard';
import { DataSolutionCard } from './DataSolutionCard';
import { ConfirmedContextCard } from './ConfirmedContextCard';
import { ResultCard } from './ResultCard';
import { AnalysisResultCard } from './AnalysisResultCard';
import { InsightCard } from './InsightCard';
import { ThoughtProcessAccordion } from './ThoughtProcessAccordion';
import { MetricCatalogCard } from './MetricCatalogCard';
import { GisAssetCard } from './GisAssetCard';
import { LineageQualityCard } from './LineageQualityCard';
import { SpatialGapCard } from './SpatialGapCard';
import { BudgetForecastCard } from './BudgetForecastCard';
import { ApiAssetCard } from './ApiAssetCard';
import { HealthCapacityCard } from './HealthCapacityCard';
import { EnterprisePolicyCard } from './EnterprisePolicyCard';
import { TrafficGovernanceCard } from './TrafficGovernanceCard';
import { MetadataMappingCard } from './MetadataMappingCard';
import { QUICK_PROMPTS } from '../data/mockData';

interface Props {
  messages: ChatMessage[];
  onSendMessage: (text: string) => void;
  onViewEvidenceKey: (key: string) => void;
  onUseSolution: () => void;
  onContinueAnalysis: () => void;
  onFollowUpFacility: () => void;
  isConfirmedSolution: boolean;
  isLoading: boolean;
  onResetDemo: () => void;
}

export const ConversationWorkspace: React.FC<Props> = ({
  messages,
  onSendMessage,
  onViewEvidenceKey,
  onUseSolution,
  onContinueAnalysis,
  onFollowUpFacility,
  isConfirmedSolution,
  isLoading,
  onResetDemo,
}) => {
  const [inputText, setInputText] = useState('');
  const [copiedMsgId, setCopiedMsgId] = useState<string | null>(null);
  const [openSqlMsgId, setOpenSqlMsgId] = useState<string | null>(null);
  const [feedbackMap, setFeedbackMap] = useState<Record<string, 'up' | 'down'>>({});
  const [isRecording, setIsRecording] = useState(false);
  const [attachedFile, setAttachedFile] = useState<string | null>(null);
  const [thinkTimeMs, setThinkTimeMs] = useState(0);

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Live timer for AI thinking process simulation
  useEffect(() => {
    let timer: any;
    if (isLoading) {
      setThinkTimeMs(0);
      timer = setInterval(() => {
        setThinkTimeMs((prev) => prev + 100);
      }, 100);
    } else {
      setThinkTimeMs(0);
    }
    return () => clearInterval(timer);
  }, [isLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isLoading) return;
    const fullText = attachedFile ? `[已附带文件: ${attachedFile}] ${inputText.trim()}` : inputText.trim();
    onSendMessage(fullText);
    setInputText('');
    setAttachedFile(null);
  };

  const handleCopy = (id: string, text?: string) => {
    if (!text) return;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).catch(() => {});
    }
    setCopiedMsgId(id);
    setTimeout(() => setCopiedMsgId(null), 2000);
  };

  const handleToggleFeedback = (id: string, type: 'up' | 'down') => {
    setFeedbackMap((prev) => ({
      ...prev,
      [id]: prev[id] === type ? (undefined as any) : type,
    }));
  };

  const handleSimulateRecording = () => {
    if (isRecording) {
      setIsRecording(false);
    } else {
      setIsRecording(true);
      setTimeout(() => {
        setInputText('分析一下莘庄镇与七宝镇近3年的老年人口增长速度与设施对比。');
        setIsRecording(false);
      }, 2500);
    }
  };

  const handleAttachDemoFile = () => {
    setAttachedFile('shanghai_minhang_2026_elderly_stats.csv');
  };

  return (
    <main className="flex-1 bg-[#F8F9FB] flex flex-col h-full overflow-hidden shrink-0 border-r border-slate-200 relative min-w-0">
      {/* Workspace Subheader Info Bar */}
      <div className="px-6 py-2 bg-white border-b border-slate-200 flex items-center justify-between text-xs shrink-0 z-10">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 font-semibold text-slate-800">
            <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse"></span>
            Xino AI Data Advisor Workspace
          </div>
          <span className="text-slate-300">|</span>
          <span className="text-slate-500 font-medium">Enterprise Data Advisor Skill V1</span>
          <span className="text-[10px] bg-indigo-50 text-indigo-700 px-1.5 py-0.2 rounded border border-indigo-100 font-mono">
            Semovix-Engine-v2.4
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onResetDemo}
            className="flex items-center gap-1 text-[11px] font-medium text-slate-500 hover:text-indigo-600 transition-colors cursor-pointer"
            title="重置对话场景"
          >
            <RotateCcw className="w-3 h-3" />
            <span>重置对话</span>
          </button>
        </div>
      </div>

      {/* Main Conversation Feed Container */}
      <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          const isSqlOpen = openSqlMsgId === msg.id;

          return (
            <div
              key={msg.id}
              className={`group flex items-start gap-3 ${
                isUser ? 'flex-row-reverse' : 'flex-row'
              } animate-fadeIn`}
            >
              {/* Avatar Icon */}
              <div
                className={`w-7 h-7 rounded flex items-center justify-center shrink-0 text-xs font-bold shadow-xs ${
                  isUser
                    ? 'bg-slate-800 text-white'
                    : 'bg-indigo-600 text-white'
                }`}
              >
                {isUser ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
              </div>

              {/* Message Content Container */}
              <div
                className={`max-w-3xl flex flex-col ${
                  isUser ? 'items-end' : 'items-start'
                }`}
              >

                {/* AI Thought Process CoT Accordion (At top of response card) */}
                {!isUser && msg.thoughtSteps && (
                  <ThoughtProcessAccordion
                    steps={msg.thoughtSteps}
                    duration={msg.thoughtDuration}
                    cardType={msg.cardType}
                    sqlQuery={msg.sqlQuery}
                    verificationHash={msg.lineageQualityData?.hash}
                  />
                )}

                {/* Natural Text Bubble */}
                {msg.text && (
                  <div
                    className={`leading-relaxed mb-1.5 ${
                      isUser
                        ? 'bg-slate-800 text-white px-4 py-2.5 rounded-xl rounded-tr-none shadow-xs text-xs font-medium'
                        : 'text-slate-800 text-xs sm:text-[13px] font-normal py-1 px-0.5 whitespace-pre-wrap'
                    }`}
                  >
                    {msg.text}
                  </div>
                )}

                {/* Embedded Rich Component Cards */}
                {msg.cardType === 'understanding' && msg.understandingData && (
                  <UnderstandingCard data={msg.understandingData} />
                )}

                {msg.cardType === 'data_solution' && msg.solutionData && (
                  <DataSolutionCard
                    data={msg.solutionData}
                    onUseSolution={onUseSolution}
                    onViewEvidence={() => onViewEvidenceKey('sources')}
                    isConfirmed={isConfirmedSolution}
                  />
                )}

                {msg.cardType === 'confirmed_context' && msg.confirmedData && (
                  <ConfirmedContextCard data={msg.confirmedData} />
                )}

                {msg.cardType === 'result' && msg.resultData && (
                  <ResultCard
                    data={msg.resultData}
                    onContinue={onContinueAnalysis}
                    onViewEvidence={() => onViewEvidenceKey('metric')}
                  />
                )}

                {msg.cardType === 'analysis_result' && msg.analysisData && (
                  <AnalysisResultCard data={msg.analysisData} />
                )}

                {msg.cardType === 'insight' && msg.insightData && (
                  <InsightCard
                    data={msg.insightData}
                    onFollowUpFacility={onFollowUpFacility}
                  />
                )}

                {msg.cardType === 'metric_catalog' && msg.metricCatalogData && (
                  <MetricCatalogCard data={msg.metricCatalogData} />
                )}

                {msg.cardType === 'gis_asset' && msg.gisAssetData && (
                  <GisAssetCard data={msg.gisAssetData} />
                )}

                {msg.cardType === 'lineage_quality' && msg.lineageQualityData && (
                  <LineageQualityCard data={msg.lineageQualityData} />
                )}

                {msg.cardType === 'spatial_gap' && msg.spatialGapData && (
                  <SpatialGapCard data={msg.spatialGapData} />
                )}

                {msg.cardType === 'budget_forecast' && msg.budgetForecastData && (
                  <BudgetForecastCard data={msg.budgetForecastData} />
                )}

                {msg.cardType === 'api_asset' && msg.apiAssetData && (
                  <ApiAssetCard data={msg.apiAssetData} />
                )}

                {msg.cardType === 'health_capacity' && msg.healthCapacityData && (
                  <HealthCapacityCard data={msg.healthCapacityData} />
                )}

                {msg.cardType === 'enterprise_policy' && msg.enterprisePolicyData && (
                  <EnterprisePolicyCard data={msg.enterprisePolicyData} />
                )}

                {msg.cardType === 'traffic_governance' && msg.trafficGovernanceData && (
                  <TrafficGovernanceCard data={msg.trafficGovernanceData} />
                )}

                {msg.cardType === 'metadata_mapping' && msg.metadataMappingData && (
                  <MetadataMappingCard data={msg.metadataMappingData} />
                )}

                {/* AI Response Tools & SQL Toggle */}
                {!isUser && (
                  <div className="mt-2 flex flex-col gap-2 w-full max-w-2xl">
                    <div
                      className={`flex items-center justify-between text-[11px] text-slate-400 font-medium px-1 transition-opacity duration-200 ${
                        isSqlOpen || copiedMsgId === msg.id || feedbackMap[msg.id]
                          ? 'opacity-100'
                          : 'opacity-0 group-hover:opacity-100 focus-within:opacity-100'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {/* SQL/DSL Inspector Toggle */}
                        {msg.sqlQuery && (
                          <button
                            onClick={() => setOpenSqlMsgId(isSqlOpen ? null : msg.id)}
                            className="flex items-center gap-1 text-slate-500 hover:text-indigo-600 bg-slate-100 hover:bg-indigo-50 px-2 py-0.5 rounded transition-colors cursor-pointer"
                          >
                            <Code2 className="w-3 h-3" />
                            <span>{isSqlOpen ? '隐藏 SQL 语句' : '查看底层 SQL'}</span>
                          </button>
                        )}

                        <button
                          onClick={() => handleCopy(msg.id, msg.text)}
                          className="flex items-center gap-1 text-slate-400 hover:text-slate-600 cursor-pointer"
                          title="复制消息"
                        >
                          {copiedMsgId === msg.id ? (
                            <Check className="w-3 h-3 text-emerald-600" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                          <span>{copiedMsgId === msg.id ? '已复制' : '复制'}</span>
                        </button>
                      </div>

                      {/* Feedback buttons */}
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleToggleFeedback(msg.id, 'up')}
                          className={`p-1 rounded hover:bg-slate-100 transition-colors cursor-pointer ${
                            feedbackMap[msg.id] === 'up' ? 'text-indigo-600 font-bold' : 'text-slate-400'
                          }`}
                          title="对回答满意"
                        >
                          <ThumbsUp className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => handleToggleFeedback(msg.id, 'down')}
                          className={`p-1 rounded hover:bg-slate-100 transition-colors cursor-pointer ${
                            feedbackMap[msg.id] === 'down' ? 'text-rose-600 font-bold' : 'text-slate-400'
                          }`}
                          title="回答有误"
                        >
                          <ThumbsDown className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    {/* Expandable SQL Code Box */}
                    {isSqlOpen && msg.sqlQuery && (
                      <div className="bg-slate-900 rounded-lg p-3 text-slate-200 text-[11px] font-mono border border-slate-800 shadow-inner animate-fadeIn">
                        <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-slate-800 text-[10px] text-slate-400">
                          <span className="flex items-center gap-1">
                            <Database className="w-3 h-3 text-indigo-400" />
                            Semovix Governance SQL Inspector
                          </span>
                          <span className="text-emerald-400">Validated</span>
                        </div>
                        <pre className="overflow-x-auto whitespace-pre-wrap leading-relaxed">
                          {msg.sqlQuery}
                        </pre>
                      </div>
                    )}

                    {/* Follow-up Suggested Action Chips */}
                    {msg.followUpChips && msg.followUpChips.length > 0 && (
                      <div className="flex items-center gap-1.5 flex-wrap pt-1">
                        <span className="text-[10px] text-slate-400 font-medium">建议下一步:</span>
                        {msg.followUpChips.map((chip, idx) => (
                          <button
                            key={idx}
                            onClick={() => onSendMessage(chip)}
                            className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium text-indigo-700 bg-indigo-50/80 hover:bg-indigo-100 border border-indigo-100 rounded-full transition-colors cursor-pointer"
                          >
                            <span>{chip}</span>
                            <ChevronRight className="w-3 h-3 text-indigo-400" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* AI Multi-stage Thinking / Live CoT Loading State */}
        {isLoading && (
          <div className="flex items-start gap-3 max-w-2xl animate-fadeIn">
            <div className="w-7 h-7 rounded bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-xs">
              <Bot className="w-3.5 h-3.5" />
            </div>

            <div className="bg-white border border-slate-200 rounded-xl rounded-tl-none p-3.5 text-xs text-slate-700 space-y-3 shadow-sm w-full">
              {/* Header with live stopwatch & skill badge */}
              <div className="flex items-center justify-between font-semibold text-indigo-700 border-b border-slate-100 pb-2">
                <div className="flex items-center gap-2">
                  <Loader2 className="w-3.5 h-3.5 text-indigo-600 animate-spin" />
                  <span className="text-slate-800 font-bold">Xino AI 思考研判中...</span>
                  <span className="text-[11px] font-mono text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                    {(thinkTimeMs / 1000).toFixed(1)}s
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-[10px] text-indigo-600 font-mono">
                  <Sparkles className="w-3 h-3 text-indigo-500 animate-pulse" />
                  <span>Enterprise Skill Active</span>
                </div>
              </div>

              {/* Progressive Stage Progress Bar */}
              <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-indigo-500 to-indigo-600 h-1.5 rounded-full transition-all duration-200"
                  style={{
                    width: `${Math.min((thinkTimeMs / 2500) * 100, 96)}%`,
                  }}
                />
              </div>

              {/* Dynamic Step-by-Step CoT Execution Log */}
              <div className="space-y-2 text-[11px] pt-0.5">
                {[
                  { id: 1, text: '解析自然语言意图：提取分析主体【老年人口】与空间范围【闵行区】' },
                  { id: 2, text: '对齐 Semovix 指标字典【M_POP_ELDERLY_001】与视图【v_pop_demographics_theme】' },
                  { id: 3, text: '运行 DW SQL 聚合算法并校验 99.8% 语义质量凭证' },
                  { id: 4, text: '推演深度空间规划建议并生成交互卡片与追问路径' },
                ].map((st) => {
                  const currentStage = thinkTimeMs < 600 ? 1 : thinkTimeMs < 1200 ? 2 : thinkTimeMs < 1800 ? 3 : 4;
                  const isDone = st.id < currentStage;
                  const isCurrent = st.id === currentStage;

                  return (
                    <div key={st.id} className="flex items-center gap-2">
                      {isDone ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 font-bold" />
                      ) : isCurrent ? (
                        <Loader2 className="w-3.5 h-3.5 text-indigo-600 animate-spin shrink-0" />
                      ) : (
                        <div className="w-3.5 h-3.5 rounded-full border border-slate-300 shrink-0" />
                      )}

                      <span
                        className={
                          isDone
                            ? 'text-emerald-700 font-medium line-through/30'
                            : isCurrent
                            ? 'text-indigo-900 font-bold animate-pulse'
                            : 'text-slate-400'
                        }
                      >
                        {st.text}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Bottom Fixed AI Input Area */}
      <div className="p-4 bg-white border-t border-slate-200 shadow-xs shrink-0">
        {/* Attached file badge */}
        {attachedFile && (
          <div className="flex items-center justify-between bg-indigo-50 border border-indigo-100 text-indigo-800 text-xs px-3 py-1.5 rounded-md mb-2">
            <span className="flex items-center gap-1.5 font-medium truncate">
              <Paperclip className="w-3.5 h-3.5 text-indigo-600" />
              文件就绪: {attachedFile}
            </span>
            <button
              onClick={() => setAttachedFile(null)}
              className="text-slate-400 hover:text-slate-600 text-xs font-bold cursor-pointer"
            >
              ×
            </button>
          </div>
        )}

        {/* Quick Action Prompt Shortcuts */}
        <div className="flex items-center gap-2 mb-2.5 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-[11px] font-medium text-slate-400 shrink-0">快捷追问:</span>
          {QUICK_PROMPTS.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => onSendMessage(prompt)}
              className="px-2.5 py-1 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-200 border border-slate-200 rounded-full transition-all shrink-0 cursor-pointer"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* AI Input Form */}
        <form onSubmit={handleSubmit} className="relative flex items-center gap-2">
          {/* File Upload Button */}
          <button
            type="button"
            onClick={handleAttachDemoFile}
            title="上传数据集或附件"
            className="p-2 bg-slate-100 hover:bg-slate-200/80 border border-slate-200 rounded text-slate-600 transition-colors cursor-pointer shrink-0"
          >
            <Paperclip className="w-4 h-4" />
          </button>

          {/* Voice Dictation Button */}
          <button
            type="button"
            onClick={handleSimulateRecording}
            title={isRecording ? '录音中...' : '语音输入'}
            className={`p-2 border rounded transition-colors cursor-pointer shrink-0 ${
              isRecording
                ? 'bg-rose-50 border-rose-300 text-rose-600 animate-pulse'
                : 'bg-slate-100 hover:bg-slate-200/80 border-slate-200 text-slate-600'
            }`}
          >
            {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </button>

          <div className="relative flex-1">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={
                isRecording
                  ? '正在监听您的提问...'
                  : '继续追问：例如 “比较其他区域老龄化情况” 或 “养老设施 15 分钟覆盖率”...'
              }
              className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-3.5 pr-10 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600/20 transition-all"
            />

            <button
              type="submit"
              disabled={!inputText.trim() || isLoading}
              className={`absolute right-1.5 top-1.5 p-1.5 rounded transition-colors cursor-pointer ${
                inputText.trim() && !isLoading
                  ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-2xs'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>

        <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1.5 px-1">
          <span className="flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-indigo-500" />
            基于 Enterprise Data Advisor Skill 自动研判
          </span>
          <span>按 Enter 键发送对话</span>
        </div>
      </div>
    </main>
  );
};

