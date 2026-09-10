import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getFlaggedAccounts } from '../api/client';
import { TierBadge, RoleBadge } from './Dashboard';
import CountUpNumber from './CountUpNumber';
import { Search, Filter, AlertTriangle, ArrowUpRight, RefreshCw, Loader2 } from 'lucide-react';

export default function FlaggedAccounts({ selectedTier = '', onSelectAccount }) {
  const [tier, setTier] = useState(selectedTier);
  const [limit, setLimit] = useState(50);
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setTier(selectedTier);
  }, [selectedTier]);

  const loadAccounts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getFlaggedAccounts(tier, limit);
      setAccounts(data || []);
    } catch (err) {
      setError(err.message || 'Failed to fetch flagged accounts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAccounts();
  }, [tier, limit]);

  const filteredAccounts = accounts.filter((acc) =>
    (acc.account_id || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.02 },
    },
  };

  const rowVariants = {
    hidden: { opacity: 0, y: 6 },
    show: { opacity: 1, y: 0, transition: { duration: 0.25 } },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Header & Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-rose-600" />
            Flagged Risk Accounts Register
          </h2>
          <p className="text-xs text-slate-500 mt-0.5 font-medium">
            Accounts sorted by highest computed risk score (`final_risk`)
          </p>
        </div>

        {/* Tier Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-xl border border-slate-200">
          {[
            { id: '', label: 'All Tiers' },
            { id: 'freeze_review', label: 'Freeze Review' },
            { id: 'escalate_analyst', label: 'Escalate Analyst' },
            { id: 'auto_monitor', label: 'Auto Monitor' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setTier(tab.id)}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                tier === tab.id
                  ? 'bg-blue-900 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Search Bar & Limit Dropdown */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search account ID (e.g. ACC00077)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-slate-300 rounded-xl pl-9 pr-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-700 shadow-sm"
          />
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
            <Filter className="w-3.5 h-3.5" />
            <span>Limit:</span>
            <select
              value={limit}
              onChange={(e) => setLimit(Number(e.target.value))}
              className="bg-white border border-slate-300 text-slate-800 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-blue-700 shadow-sm"
            >
              <option value={25}>25 Accounts</option>
              <option value={50}>50 Accounts</option>
              <option value={100}>100 Accounts</option>
              <option value={500}>All Accounts</option>
            </select>
          </div>

          <button
            onClick={loadAccounts}
            title="Refresh List"
            className="p-2 bg-white border border-slate-300 rounded-xl text-slate-600 hover:text-blue-900 hover:border-slate-400 transition-colors shadow-sm active:scale-95"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Accounts Table */}
      {loading ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-12 flex justify-center items-center shadow-sm">
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="w-8 h-8 text-blue-900 animate-spin" />
            <p className="text-sm font-semibold text-slate-600">Loading flagged accounts from API...</p>
          </div>
        </div>
      ) : error ? (
        <div className="bg-rose-50 border border-rose-200 p-6 rounded-2xl text-rose-800 shadow-sm">
          <h3 className="font-bold text-lg">Error loading accounts</h3>
          <p className="text-sm mt-1">{error}</p>
        </div>
      ) : filteredAccounts.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center text-slate-500 shadow-sm">
          No accounts found matching the current filters.
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-800">
              <thead className="bg-slate-50 text-xs font-bold uppercase text-slate-600 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4">Account ID</th>
                  <th className="px-6 py-4">Predicted Role</th>
                  <th className="px-6 py-4">Action Tier</th>
                  <th className="px-6 py-4">Risk Score (`final_risk`)</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <motion.tbody
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="divide-y divide-slate-100"
              >
                {filteredAccounts.map((account) => {
                  const riskPercentage = ((account.final_risk || 0) * 100).toFixed(0);
                  return (
                    <motion.tr
                      key={account.account_id}
                      variants={rowVariants}
                      onClick={() => onSelectAccount(account.account_id)}
                      className="hover:bg-blue-50/60 transition-colors cursor-pointer group"
                    >
                      <td className="px-6 py-4 font-mono font-bold text-blue-950">
                        {account.account_id}
                      </td>

                      <td className="px-6 py-4">
                        <RoleBadge role={account.predicted_label} />
                      </td>

                      <td className="px-6 py-4">
                        <TierBadge tier={account.action_tier} />
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-24 bg-slate-100 h-2.5 rounded-full overflow-hidden border border-slate-200">
                            <motion.div
                              className={`h-full rounded-full ${
                                account.final_risk >= 0.8
                                  ? 'bg-rose-600'
                                  : account.final_risk >= 0.5
                                  ? 'bg-amber-500'
                                  : 'bg-emerald-500'
                              }`}
                              initial={{ width: 0 }}
                              animate={{ width: `${riskPercentage}%` }}
                              transition={{ duration: 0.6, ease: 'easeOut' }}
                            ></motion.div>
                          </div>
                          <span className="font-mono font-bold text-slate-900 text-xs">
                            <CountUpNumber value={account.final_risk || 0} decimals={2} />
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-right">
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-blue-900 group-hover:text-rose-600 transition-colors">
                          Inspect Account
                          <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </span>
                      </td>
                    </motion.tr>
                  );
                })}
              </motion.tbody>
            </table>
          </div>
          <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 font-medium flex justify-between items-center">
            <span>Showing {filteredAccounts.length} flagged accounts</span>
            <span>Click any account row to view behavioral evidence & graph topology</span>
          </div>
        </div>
      )}
    </motion.div>
  );
}
