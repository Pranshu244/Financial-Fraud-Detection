import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getAccountRisk, getAccountEvidence, getAccountGraph } from '../api/client';
import { TierBadge, RoleBadge } from './Dashboard';
import CountUpNumber from './CountUpNumber';
import { Search, ShieldAlert, FileText, Share2, AlertOctagon, ArrowRight, Loader2 } from 'lucide-react';

export default function AccountInspector({ initialAccountId = 'ACC00077' }) {
  const [accountIdInput, setAccountIdInput] = useState(initialAccountId);
  const [selectedAccountId, setSelectedAccountId] = useState(initialAccountId);

  const [riskData, setRiskData] = useState(null);
  const [evidenceData, setEvidenceData] = useState(null);
  const [graphData, setGraphData] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (initialAccountId) {
      setAccountIdInput(initialAccountId);
      setSelectedAccountId(initialAccountId);
    }
  }, [initialAccountId]);

  const loadAccountDetails = async (idToFetch) => {
    if (!idToFetch) return;
    setLoading(true);
    setError(null);
    setRiskData(null);
    setEvidenceData(null);
    setGraphData(null);

    try {
      const [riskRes, evidenceRes, graphRes] = await Promise.all([
        getAccountRisk(idToFetch),
        getAccountEvidence(idToFetch),
        getAccountGraph(idToFetch, 1),
      ]);

      setRiskData(riskRes);
      setEvidenceData(evidenceRes);
      setGraphData(graphRes);
    } catch (err) {
      if (err.status === 404) {
        setError(`Account '${idToFetch}' was not found in the banking fraud detection database (404 Not Found).`);
      } else {
        setError(err.message || 'Failed to fetch account details');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAccountDetails(selectedAccountId);
  }, [selectedAccountId]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (accountIdInput.trim()) {
      setSelectedAccountId(accountIdInput.trim());
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Search Header */}
      <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Search className="w-5 h-5 text-blue-900" />
            Account Case Inspector & Subgraph Topology
          </h2>
          <p className="text-xs text-slate-500 mt-0.5 font-medium">
            Inspect account risk metrics, behavioral evidence, and transaction graph topology
          </p>
        </div>

        <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={accountIdInput}
              onChange={(e) => setAccountIdInput(e.target.value)}
              placeholder="Enter Account ID..."
              className="bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-4 py-2 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-700 font-mono"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-900 hover:bg-blue-800 text-white font-bold text-sm rounded-xl transition-colors shadow-sm active:scale-95"
          >
            Inspect Account
          </button>
        </form>
      </div>

      {/* Main Content Area */}
      {loading ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-16 flex justify-center items-center shadow-sm">
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="w-10 h-10 text-blue-900 animate-spin" />
            <p className="text-sm font-semibold text-slate-600">Fetching account risk metrics, evidence, & network graph...</p>
          </div>
        </div>
      ) : error ? (
        /* Graceful 404 & Error Banner */
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-rose-50 border border-rose-200 p-8 rounded-2xl text-rose-800 space-y-3 shadow-sm"
        >
          <div className="flex items-center gap-3">
            <AlertOctagon className="w-8 h-8 text-rose-600 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-bold text-rose-900">Account Not Found (404)</h3>
              <p className="text-sm text-rose-700 mt-1 font-medium">{error}</p>
            </div>
          </div>
          <div className="bg-white p-3 rounded-xl border border-rose-200 text-xs text-rose-800 font-medium">
            Tip: Try searching for a valid account ID such as <code className="font-mono bg-rose-100 px-1.5 py-0.5 rounded text-rose-900">ACC00077</code> or select an account directly from the Flagged Accounts tab.
          </div>
        </motion.div>
      ) : riskData && evidenceData ? (
        <div className="space-y-6">
          {/* Top Summary Header for Account */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm grid grid-cols-1 md:grid-cols-4 gap-6"
          >
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">Target Account ID</span>
              <span className="font-mono text-2xl font-bold text-blue-950">{riskData.account_id}</span>
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">Predicted Role</span>
              <div className="mt-1">
                <RoleBadge role={riskData.predicted_label} />
              </div>
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">Action Tier</span>
              <div className="mt-1">
                <TierBadge tier={riskData.action_tier} />
              </div>
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">Final Risk Score</span>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-2xl font-mono font-extrabold text-rose-600">
                  <CountUpNumber value={riskData.final_risk || 0} decimals={2} />
                </span>
                <span className="text-xs text-slate-500 font-medium">/ 1.00</span>
              </div>
            </div>
          </motion.div>

          {/* Risk Metrics & Evidence Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Risk Scores Card */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.05 }}
              className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm space-y-4"
            >
              <h3 className="text-md font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
                <ShieldAlert className="w-5 h-5 text-rose-600" />
                Risk Metrics (`/accounts/{selectedAccountId}/risk`)
              </h3>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-slate-600">Fraud Prob (`fraud_prob`)</span>
                    <span className="font-mono text-slate-900">
                      <CountUpNumber value={(riskData.fraud_prob || 0) * 100} decimals={1} suffix="%" />
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden border border-slate-200">
                    <motion.div
                      className="bg-purple-600 h-full rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${(riskData.fraud_prob || 0) * 100}%` }}
                      transition={{ duration: 0.7, ease: 'easeOut' }}
                    ></motion.div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-slate-600">Deviation (`deviation_score`)</span>
                    <span className="font-mono text-slate-900">
                      <CountUpNumber value={(riskData.deviation_score || 0) * 100} decimals={1} suffix="%" />
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden border border-slate-200">
                    <motion.div
                      className="bg-amber-500 h-full rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${(riskData.deviation_score || 0) * 100}%` }}
                      transition={{ duration: 0.7, ease: 'easeOut' }}
                    ></motion.div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-slate-600">Final Risk (`final_risk`)</span>
                    <span className="font-mono text-rose-700 font-bold">
                      <CountUpNumber value={(riskData.final_risk || 0) * 100} decimals={1} suffix="%" />
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden border border-slate-200">
                    <motion.div
                      className="bg-rose-600 h-full rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${(riskData.final_risk || 0) * 100}%` }}
                      transition={{ duration: 0.7, ease: 'easeOut' }}
                    ></motion.div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Evidence Card */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="lg:col-span-2 bg-white border border-slate-200 p-6 rounded-2xl shadow-sm space-y-4"
            >
              <h3 className="text-md font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
                <FileText className="w-5 h-5 text-amber-600" />
                Detection Evidence (`/accounts/{selectedAccountId}/evidence`)
              </h3>

              {/* Ready to display explanation sentence directly from backend */}
              <div className="bg-blue-50/60 p-4 rounded-xl border border-blue-200">
                <span className="text-xs uppercase font-bold text-blue-900 block mb-1">Automated Intelligence Summary</span>
                <p className="text-sm text-slate-800 leading-relaxed font-medium">
                  {evidenceData.explanation}
                </p>
              </div>

              {/* Signal Badges */}
              {evidenceData.signals && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1">
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <span className="text-xs text-slate-500 font-semibold block">Fanout Flag</span>
                    <span className={`text-sm font-bold ${evidenceData.signals.fanout_flag ? 'text-rose-700' : 'text-slate-600'}`}>
                      {evidenceData.signals.fanout_flag ? 'TRUE (Active Spreading)' : 'False'}
                    </span>
                  </div>

                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <span className="text-xs text-slate-500 font-semibold block">Layering Flag</span>
                    <span className={`text-sm font-bold ${evidenceData.signals.layering_flag ? 'text-rose-700' : 'text-slate-600'}`}>
                      {evidenceData.signals.layering_flag ? 'TRUE (Multi-hop Pass)' : 'False'}
                    </span>
                  </div>

                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <span className="text-xs text-slate-500 font-semibold block">Velocity Flag</span>
                    <span className={`text-sm font-bold ${evidenceData.signals.velocity_flag ? 'text-rose-700' : 'text-slate-600'}`}>
                      {evidenceData.signals.velocity_flag ? 'TRUE (High Frequency)' : 'False'}
                    </span>
                  </div>

                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <span className="text-xs text-slate-500 font-semibold block">Peak 24h Txn Count</span>
                    <span className="text-sm font-bold font-mono text-slate-900">
                      <CountUpNumber value={evidenceData.signals.peak_24h_transaction_count} suffix=" txns" />
                    </span>
                  </div>

                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 col-span-2 sm:col-span-2">
                    <span className="text-xs text-slate-500 font-semibold block">Amount vs Baseline Ratio</span>
                    <span className="text-sm font-bold font-mono text-amber-700">
                      <CountUpNumber value={evidenceData.signals.amount_vs_baseline_ratio} decimals={2} suffix="x baseline usual size" />
                    </span>
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* Network Graph Section */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.15 }}
            className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm space-y-4"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-md font-bold text-slate-900 flex items-center gap-2">
                <Share2 className="w-5 h-5 text-indigo-700" />
                Network Subgraph Topology (`/accounts/{selectedAccountId}/graph?hops=1`)
              </h3>
              <span className="text-xs text-slate-500 font-mono font-semibold">
                Nodes: {graphData?.nodes?.length || 0} | Edges: {graphData?.edges?.length || 0}
              </span>
            </div>

            {/* Subgraph Display Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Connected Nodes List */}
              <div className="space-y-3">
                <h4 className="text-xs uppercase font-bold text-slate-500">Connected Nodes</h4>
                <div className="space-y-2 max-h-80 overflow-y-auto pr-2">
                  {graphData?.nodes?.map((node) => (
                    <motion.div
                      key={node.account_id}
                      whileHover={{ y: -2 }}
                      transition={{ duration: 0.15 }}
                      onClick={() => {
                        setAccountIdInput(node.account_id);
                        setSelectedAccountId(node.account_id);
                      }}
                      className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-colors ${
                        node.account_id === selectedAccountId
                          ? 'bg-blue-50 border-blue-700 shadow-sm'
                          : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-sm font-bold text-slate-900">{node.account_id}</span>
                        {node.account_id === selectedAccountId && (
                          <span className="text-[10px] bg-blue-900 text-white font-bold px-1.5 py-0.5 rounded">CENTER</span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <RoleBadge role={node.predicted_label} />
                        <TierBadge tier={node.action_tier} />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Transaction Edges List */}
              <div className="space-y-3">
                <h4 className="text-xs uppercase font-bold text-slate-500">Direct Transaction Flow Edges</h4>
                <div className="space-y-2 max-h-80 overflow-y-auto pr-2">
                  {graphData?.edges?.length === 0 ? (
                    <p className="text-xs text-slate-500">No direct transactions found within 1 hop.</p>
                  ) : (
                    graphData?.edges?.map((edge, idx) => (
                      <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1.5">
                        <div className="flex items-center justify-between font-semibold">
                          <span className="font-mono text-rose-700">{edge.source}</span>
                          <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                          <span className="font-mono text-emerald-700">{edge.target}</span>
                        </div>
                        <div className="flex items-center justify-between text-slate-600 text-[11px] pt-1.5 border-t border-slate-200">
                          <span className="font-mono text-slate-900 font-extrabold">
                            ${Number(edge.amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                          </span>
                          <span className="font-medium">Channel: {edge.channel}</span>
                          <span className="font-mono text-slate-500">{edge.timestamp}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      ) : null}
    </motion.div>
  );
}
