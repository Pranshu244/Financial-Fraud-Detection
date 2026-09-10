import React from 'react';
import { Shield, LayoutDashboard, AlertTriangle, Search, UploadCloud, RefreshCw, LogOut, UserCheck } from 'lucide-react';

export default function Header({ activeTab, setActiveTab, onRerunPipeline, isPipelineRunning, user, onLogout }) {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & System Title */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
            <div className="p-2 bg-blue-900 text-white rounded-lg shadow-sm">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
                VittRakshak
              </h1>
              <p className="text-xs text-slate-500 font-medium">GNN & Behavioral Analytics Engine</p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex space-x-1 sm:space-x-2">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center gap-2 px-3.5 py-2 text-sm font-semibold rounded-lg transition-all ${
                activeTab === 'dashboard'
                  ? 'bg-blue-900 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => setActiveTab('flagged')}
              className={`flex items-center gap-2 px-3.5 py-2 text-sm font-semibold rounded-lg transition-all ${
                activeTab === 'flagged'
                  ? 'bg-blue-900 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <AlertTriangle className="w-4 h-4" />
              <span>Flagged Accounts</span>
            </button>

            <button
              onClick={() => setActiveTab('inspector')}
              className={`flex items-center gap-2 px-3.5 py-2 text-sm font-semibold rounded-lg transition-all ${
                activeTab === 'inspector'
                  ? 'bg-blue-900 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Search className="w-4 h-4" />
              <span>Account Inspector</span>
            </button>

            <button
              onClick={() => setActiveTab('upload')}
              className={`flex items-center gap-2 px-3.5 py-2 text-sm font-semibold rounded-lg transition-all ${
                activeTab === 'upload'
                  ? 'bg-blue-900 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <UploadCloud className="w-4 h-4" />
              <span>Upload Dataset</span>
            </button>
          </nav>

          {/* User Profile & Actions */}
          <div className="flex items-center gap-3">
            {/* Quick Action Re-run Button */}
            <button
              onClick={onRerunPipeline}
              disabled={isPipelineRunning}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs font-bold rounded-lg text-white transition-all shadow-sm ${
                isPipelineRunning
                  ? 'bg-slate-400 cursor-not-allowed'
                  : 'bg-rose-600 hover:bg-rose-700 active:scale-95'
              }`}
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isPipelineRunning ? 'animate-spin' : ''}`} />
              <span>{isPipelineRunning ? 'Re-running...' : 'Re-run Analysis'}</span>
            </button>

            {/* Analyst Info & Logout */}
            <div className="flex items-center gap-2 pl-3 border-l border-slate-200">
              <div className="hidden md:flex flex-col text-right">
                <span className="text-xs font-bold text-slate-800 flex items-center justify-end gap-1">
                  <UserCheck className="w-3 h-3 text-emerald-600" />
                  {user?.name || 'Ritesh Kumar'}
                </span>
                <span className="text-[10px] text-slate-500 font-mono">{user?.userId || 'ANALYST_8841'}</span>
              </div>

              <button
                onClick={onLogout}
                title="Sign Out"
                className="p-2 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors border border-slate-200"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
