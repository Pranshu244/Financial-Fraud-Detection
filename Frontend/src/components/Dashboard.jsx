import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, AlertOctagon, AlertTriangle, CheckCircle, Clock, Zap, ArrowRight, ShieldAlert, Building, Loader2 } from 'lucide-react';
import CountUpNumber from './CountUpNumber';
import HeroBanner from './HeroBanner';

export function TierBadge({ tier }) {
  switch (tier) {
    case 'freeze_review':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-300 shadow-sm">
          <AlertOctagon className="w-3 h-3 text-rose-600" />
          Freeze Review
        </span>
      );
    case 'escalate_analyst':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300 shadow-sm">
          <AlertTriangle className="w-3 h-3 text-amber-600" />
          Escalate Analyst
        </span>
      );
    case 'auto_monitor':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 shadow-sm">
          <CheckCircle className="w-3 h-3 text-emerald-600" />
          Auto Monitor
        </span>
      );
    default:
      return <span className="text-xs text-slate-500 font-medium">{tier || 'Unknown'}</span>;
  }
}

export function RoleBadge({ role }) {
  const formatted = (role || '').replace('_', ' ').toUpperCase();
  switch (role) {
    case 'structuring_source':
      return <span className="px-2.5 py-0.5 text-xs font-bold bg-rose-100 text-rose-800 border border-rose-300 rounded-md shadow-sm">{formatted}</span>;
    case 'mule':
      return <span className="px-2.5 py-0.5 text-xs font-bold bg-purple-100 text-purple-800 border border-purple-300 rounded-md shadow-sm">{formatted}</span>;
    case 'layering_node':
      return <span className="px-2.5 py-0.5 text-xs font-bold bg-indigo-100 text-indigo-800 border border-indigo-300 rounded-md shadow-sm">{formatted}</span>;
    case 'normal':
      return <span className="px-2.5 py-0.5 text-xs font-bold bg-slate-100 text-slate-700 border border-slate-300 rounded-md shadow-sm">{formatted}</span>;
    default:
      return <span className="px-2 py-0.5 text-xs font-medium bg-slate-100 text-slate-600 rounded">{formatted}</span>;
  }
}

export default function Dashboard({ stats, loading, error, onNavigateFlagged, onRerunPipeline, isPipelineRunning }) {
  const [activeStageIndex, setActiveStageIndex] = useState(0);

  // Sequential Stage Stepper Visualizer while pipeline API call is in flight
  useEffect(() => {
    if (!isPipelineRunning) {
      setActiveStageIndex(4); // All stages completed
      return;
    }

    setActiveStageIndex(1);
    const timer1 = setTimeout(() => setActiveStageIndex(2), 1200);
    const timer2 = setTimeout(() => setActiveStageIndex(3), 2600);
    const timer3 = setTimeout(() => setActiveStageIndex(4), 4000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [isPipelineRunning]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-10 h-10 text-blue-900 animate-spin" />
          <p className="text-sm font-semibold text-slate-600">Loading banking summary statistics...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 shadow-sm"
      >
        <div className="flex items-center gap-3">
          <AlertOctagon className="w-6 h-6 text-rose-600" />
          <h3 className="text-lg font-bold">Failed to load summary stats</h3>
        </div>
        <p className="mt-2 text-sm text-rose-700">{error}</p>
        <p className="mt-3 text-xs text-rose-600 font-medium">Ensure backend API is running at http://localhost:8000</p>
      </motion.div>
    );
  }

  const {
    total_accounts = 0,
    by_tier = {},
    by_predicted_role = {},
    last_run_at = 'N/A',
    last_run_seconds = 0,
  } = stats || {};

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      {/* VittRakshak Hero / Branding Banner */}
      <motion.div variants={itemVariants}>
        <HeroBanner />
      </motion.div>

      {/* Top Banner & Info */}
      <motion.div variants={itemVariants} className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Building className="w-6 h-6 text-blue-900" />
            Institutional Risk Overview & Detection Dashboard
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Real-time multi-account risk stratification powered by GNN & Behavioral Analytics Engine
          </p>
        </div>

        <div className="flex items-center gap-4 bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs text-slate-700">
          <div className="flex items-center gap-2 border-r border-slate-200 pr-4">
            <Clock className="w-4 h-4 text-blue-800" />
            <div>
              <span className="text-slate-500 block">Last Run Execution</span>
              <span className="font-bold text-slate-900">{last_run_at}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-600" />
            <div>
              <span className="text-slate-500 block">Duration</span>
              <span className="font-bold text-slate-900">{last_run_seconds}s</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Total Accounts */}
        <motion.div
          variants={itemVariants}
          whileHover={{ y: -2 }}
          transition={{ duration: 0.2 }}
          className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Scored Accounts</span>
            <div className="p-2 bg-blue-50 text-blue-800 rounded-lg">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-slate-900 mt-3">
            <CountUpNumber value={total_accounts} />
          </p>
          <p className="text-xs text-slate-500 mt-1 font-medium">Across active transaction baseline</p>
        </motion.div>

        {/* Freeze Review */}
        <motion.div
          variants={itemVariants}
          whileHover={{ y: -2 }}
          transition={{ duration: 0.2 }}
          onClick={() => onNavigateFlagged('freeze_review')}
          className="bg-white border border-rose-200 hover:border-rose-400 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-700">Freeze Review</span>
            <div className="p-2 bg-rose-100 text-rose-700 rounded-lg">
              <AlertOctagon className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-rose-700 mt-3">
            <CountUpNumber value={by_tier.freeze_review || 0} />
          </p>
          <div className="flex items-center justify-between text-xs font-semibold text-rose-600 mt-1">
            <span>Critical risk tier</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </motion.div>

        {/* Escalate Analyst */}
        <motion.div
          variants={itemVariants}
          whileHover={{ y: -2 }}
          transition={{ duration: 0.2 }}
          onClick={() => onNavigateFlagged('escalate_analyst')}
          className="bg-white border border-amber-200 hover:border-amber-400 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700">Escalate Analyst</span>
            <div className="p-2 bg-amber-100 text-amber-700 rounded-lg">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-amber-700 mt-3">
            <CountUpNumber value={by_tier.escalate_analyst || 0} />
          </p>
          <div className="flex items-center justify-between text-xs font-semibold text-amber-700 mt-1">
            <span>Suspicious activity</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </motion.div>

        {/* Auto Monitor */}
        <motion.div
          variants={itemVariants}
          whileHover={{ y: -2 }}
          transition={{ duration: 0.2 }}
          onClick={() => onNavigateFlagged('auto_monitor')}
          className="bg-white border border-emerald-200 hover:border-emerald-400 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">Auto Monitor</span>
            <div className="p-2 bg-emerald-100 text-emerald-700 rounded-lg">
              <CheckCircle className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-emerald-700 mt-3">
            <CountUpNumber value={by_tier.auto_monitor || 0} />
          </p>
          <div className="flex items-center justify-between text-xs font-semibold text-emerald-700 mt-1">
            <span>Normal baseline</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </motion.div>
      </div>

      {/* Role Breakdown & Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Predicted Roles Breakdown */}
        <motion.div variants={itemVariants} className="lg:col-span-2 bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-blue-900" />
              Predicted Fraud Role Distribution
            </h3>
            <span className="text-xs font-medium text-slate-500">GNN Multi-class Classification</span>
          </div>

          <div className="space-y-4">
            {[
              { role: 'normal', title: 'Normal Accounts', color: 'bg-emerald-600', count: by_predicted_role.normal || 0 },
              { role: 'mule', title: 'Money Mule Accounts', color: 'bg-purple-600', count: by_predicted_role.mule || 0 },
              { role: 'layering_node', title: 'Layering Intermediary Nodes', color: 'bg-indigo-600', count: by_predicted_role.layering_node || 0 },
              { role: 'structuring_source', title: 'Structuring Source Accounts', color: 'bg-rose-600', count: by_predicted_role.structuring_source || 0 },
            ].map(({ role, title, color, count }) => {
              const percentage = total_accounts > 0 ? ((count / total_accounts) * 100).toFixed(1) : 0;
              return (
                <div key={role} className="space-y-1.5 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <RoleBadge role={role} />
                      <span className="text-slate-800 font-semibold">{title}</span>
                    </div>
                    <span className="font-bold text-slate-900">
                      <CountUpNumber value={count} />{' '}
                      <span className="text-xs font-medium text-slate-500">({percentage}%)</span>
                    </span>
                  </div>

                  {/* Animated Progress Bar Width */}
                  <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                    <motion.div
                      className={`${color} h-full rounded-full`}
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    ></motion.div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Action Panel */}
        <motion.div variants={itemVariants} className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Detection Pipeline Controls</h3>
            <p className="text-xs text-slate-600 mb-4 leading-relaxed">
              Trigger a live re-computation of feature extraction, graph neural network scoring, and behavioral rules.
            </p>

            {/* Sequential Stage Execution Status */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3 mb-6 text-xs text-slate-700 font-medium">
              {[
                { stage: 1, name: 'Stage 1: Feature Aggregation' },
                { stage: 2, name: 'Stage 2: GNN Inference' },
                { stage: 3, name: 'Stage 3: Behavioral Rules' },
                { stage: 4, name: 'Stage 4: Risk Stratification' },
              ].map(({ stage, name }) => {
                const isCurrentExecuting = isPipelineRunning && activeStageIndex === stage;
                const isCompleted = !isPipelineRunning || activeStageIndex > stage;

                return (
                  <div key={stage} className={`flex justify-between border-b border-slate-200 pb-2 last:border-b-0 last:pb-0 transition-colors ${
                    isCurrentExecuting ? 'text-blue-900 font-bold' : ''
                  }`}>
                    <span className="text-slate-600 flex items-center gap-2">
                      {/* Active Pulse Dot */}
                      <span className={`w-2 h-2 rounded-full ${
                        isCurrentExecuting
                          ? 'bg-blue-600 animate-ping'
                          : isCompleted
                          ? 'bg-emerald-500'
                          : 'bg-slate-300'
                      }`}></span>
                      {name}
                    </span>

                    {isCurrentExecuting ? (
                      <span className="text-blue-700 font-bold flex items-center gap-1">
                        <Loader2 className="w-3 h-3 animate-spin" />
                        Running...
                      </span>
                    ) : isCompleted ? (
                      <span className="text-emerald-700 font-bold">Active</span>
                    ) : (
                      <span className="text-slate-400">Waiting</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <button
            onClick={onRerunPipeline}
            disabled={isPipelineRunning}
            className={`w-full py-3.5 px-4 rounded-xl font-bold text-white transition-all shadow-md flex items-center justify-center gap-2 active:scale-98 ${
              isPipelineRunning
                ? 'bg-slate-400 text-white cursor-not-allowed shadow-none'
                : 'bg-blue-900 hover:bg-blue-800'
            }`}
          >
            {isPipelineRunning ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-white" />
                <span>Running Analysis...</span>
              </>
            ) : (
              <>
                <Zap className="w-4 h-4" />
                <span>Re-run Full Analysis Pipeline</span>
              </>
            )}
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}
