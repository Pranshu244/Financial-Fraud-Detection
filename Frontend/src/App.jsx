import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import FlaggedAccounts from './components/FlaggedAccounts';
import AccountInspector from './components/AccountInspector';
import DatasetUpload from './components/DatasetUpload';
import LoginPage from './components/LoginPage';
import { getSummaryStats, runPipeline } from './api/client';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedTierFilter, setSelectedTierFilter] = useState('');
  const [inspectorAccountId, setInspectorAccountId] = useState('ACC00077');

  const [stats, setStats] = useState(null);
  const [statsLoading, setStatsLoading] = useState(false);
  const [statsError, setStatsError] = useState(null);

  const [isPipelineRunning, setIsPipelineRunning] = useState(false);
  const [notification, setNotification] = useState(null);

  const loadStats = async () => {
    setStatsLoading(true);
    setStatsError(null);
    try {
      const data = await getSummaryStats();
      setStats(data);
    } catch (err) {
      setStatsError(err.message || 'Could not connect to backend server at http://localhost:8000');
    } finally {
      setStatsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadStats();
    }
  }, [isAuthenticated]);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setActiveTab('dashboard');
  };

  const handleRerunPipeline = async () => {
    setIsPipelineRunning(true);
    setNotification(null);
    try {
      const res = await runPipeline();
      await loadStats();
      setNotification({
        type: 'success',
        message: `Pipeline re-computed live in ${res.seconds_taken}s (${res.accounts_scored} accounts scored).`,
      });
    } catch (err) {
      setNotification({
        type: 'error',
        message: `Pipeline execution failed: ${err.message}`,
      });
    } finally {
      setIsPipelineRunning(false);
    }
  };

  const handleNavigateFlaggedTier = (tier) => {
    setSelectedTierFilter(tier);
    setActiveTab('flagged');
  };

  const handleInspectAccount = (accountId) => {
    setInspectorAccountId(accountId);
    setActiveTab('inspector');
  };

  const handleUploadSuccess = async () => {
    await loadStats();
    setNotification({
      type: 'success',
      message: 'New dataset uploaded and pipeline re-computed successfully!',
    });
  };

  // If not logged in, render Banking Login Page
  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLoginSuccess} />;
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col font-sans">
      {/* Top Banking Portal Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onRerunPipeline={handleRerunPipeline}
        isPipelineRunning={isPipelineRunning}
        user={user}
        onLogout={handleLogout}
      />

      {/* Global Toast Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-4"
          >
            <div
              className={`p-4 rounded-xl border flex items-center justify-between shadow-md text-sm ${
                notification.type === 'success'
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                  : 'bg-rose-50 border-rose-300 text-rose-900'
              }`}
            >
              <div className="flex items-center gap-3 font-semibold">
                {notification.type === 'success' ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-rose-600" />
                )}
                <span>{notification.message}</span>
              </div>
              <button
                onClick={() => setNotification(null)}
                className="text-xs font-bold text-slate-600 hover:text-slate-900"
              >
                Dismiss
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Tab Content Container with Page Transitions */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
          >
            {activeTab === 'dashboard' && (
              <Dashboard
                stats={stats}
                loading={statsLoading}
                error={statsError}
                onNavigateFlagged={handleNavigateFlaggedTier}
                onRerunPipeline={handleRerunPipeline}
                isPipelineRunning={isPipelineRunning}
              />
            )}

            {activeTab === 'flagged' && (
              <FlaggedAccounts
                selectedTier={selectedTierFilter}
                onSelectAccount={handleInspectAccount}
              />
            )}

            {activeTab === 'inspector' && (
              <AccountInspector initialAccountId={inspectorAccountId} />
            )}

            {activeTab === 'upload' && (
              <DatasetUpload onUploadSuccess={handleUploadSuccess} />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500 font-medium">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-2">
          <span>VittRakshak Institutional Banking Fraud Analytics • Authenticated User: <strong className="text-slate-800">{user?.name || 'Analyst Officer'}</strong></span>
          <span>Backend Node: <code className="font-mono text-blue-900 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200">{import.meta.env.VITE_API_URL || 'http://localhost:8000'}</code></span>
        </div>
      </footer>
    </div>
  );
}
