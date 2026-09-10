import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { uploadDataset } from '../api/client';
import { UploadCloud, FileSpreadsheet, CheckCircle, AlertTriangle, RefreshCw, Info, Loader2 } from 'lucide-react';

export default function DatasetUpload({ onUploadSuccess }) {
  const [accountsFile, setAccountsFile] = useState(null);
  const [transactionsFile, setTransactionsFile] = useState(null);

  const [loading, setLoading] = useState(false);
  const [errorDetails, setErrorDetails] = useState(null);
  const [successResult, setSuccessResult] = useState(null);

  const handleAccountsChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setAccountsFile(e.target.files[0]);
    }
  };

  const handleTransactionsChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setTransactionsFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!accountsFile || !transactionsFile) {
      setErrorDetails(['Please select both accounts.csv and transactions.csv files before uploading.']);
      return;
    }

    setLoading(true);
    setErrorDetails(null);
    setSuccessResult(null);

    try {
      const res = await uploadDataset(accountsFile, transactionsFile);
      setSuccessResult(res);
      if (onUploadSuccess) {
        onUploadSuccess();
      }
    } catch (err) {
      if (Array.isArray(err.data?.detail)) {
        setErrorDetails(err.data.detail);
      } else if (typeof err.data?.detail === 'string') {
        setErrorDetails([err.data.detail]);
      } else {
        setErrorDetails([err.message || 'Dataset upload failed. Check CSV schemas.']);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-4xl mx-auto space-y-6"
    >
      {/* Page Header */}
      <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <UploadCloud className="w-5 h-5 text-blue-900" />
          Upload New Dataset (`POST /pipeline/upload`)
        </h2>
        <p className="text-xs text-slate-500 mt-1 font-medium">
          Replace active dataset with new CSV files. The backend will validate column schemas and re-run stage 1→4 live.
        </p>
      </div>

      {/* CSV Schema Guidance Box */}
      <div className="bg-blue-50/70 p-5 rounded-2xl border border-blue-200 text-xs text-slate-800 space-y-2">
        <div className="flex items-center gap-2 text-blue-950 font-bold">
          <Info className="w-4 h-4 text-blue-800" />
          <span>Required CSV Schema Specifications</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-slate-700">
          <div>
            <span className="font-semibold text-slate-900 block mb-1">accounts_file (`accounts.csv`):</span>
            <code className="font-mono bg-white p-2 rounded-lg block text-[11px] text-slate-800 border border-blue-200">
              account_id, account_type, opened_days_ago, baseline_monthly_txn_count, baseline_avg_amount, dormancy_flag
            </code>
          </div>
          <div>
            <span className="font-semibold text-slate-900 block mb-1">transactions_file (`transactions.csv`):</span>
            <code className="font-mono bg-white p-2 rounded-lg block text-[11px] text-slate-800 border border-blue-200">
              timestamp, source_account, destination_account, amount, channel
            </code>
          </div>
        </div>
      </div>

      {/* Upload Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Accounts File Dropzone */}
          <motion.div
            whileHover={{ y: -2 }}
            transition={{ duration: 0.15 }}
            className="bg-white border-2 border-dashed border-slate-300 hover:border-blue-700 transition-colors p-6 rounded-2xl flex flex-col items-center justify-center text-center shadow-sm"
          >
            <FileSpreadsheet className="w-10 h-10 text-blue-900 mb-3" />
            <span className="text-sm font-bold text-slate-900">1. Accounts CSV (`accounts_file`)</span>
            <p className="text-xs text-slate-500 mt-1 mb-4">Select accounts.csv file</p>
            <input
              type="file"
              accept=".csv"
              id="accounts_file_input"
              onChange={handleAccountsChange}
              className="hidden"
            />
            <label
              htmlFor="accounts_file_input"
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl cursor-pointer transition-colors border border-slate-300 active:scale-95"
            >
              {accountsFile ? accountsFile.name : 'Choose File'}
            </label>
            {accountsFile && (
              <span className="mt-2 text-[11px] text-emerald-700 font-mono font-bold">✓ {accountsFile.name}</span>
            )}
          </motion.div>

          {/* Transactions File Dropzone */}
          <motion.div
            whileHover={{ y: -2 }}
            transition={{ duration: 0.15 }}
            className="bg-white border-2 border-dashed border-slate-300 hover:border-blue-700 transition-colors p-6 rounded-2xl flex flex-col items-center justify-center text-center shadow-sm"
          >
            <FileSpreadsheet className="w-10 h-10 text-amber-600 mb-3" />
            <span className="text-sm font-bold text-slate-900">2. Transactions CSV (`transactions_file`)</span>
            <p className="text-xs text-slate-500 mt-1 mb-4">Select transactions.csv file</p>
            <input
              type="file"
              accept=".csv"
              id="transactions_file_input"
              onChange={handleTransactionsChange}
              className="hidden"
            />
            <label
              htmlFor="transactions_file_input"
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl cursor-pointer transition-colors border border-slate-300 active:scale-95"
            >
              {transactionsFile ? transactionsFile.name : 'Choose File'}
            </label>
            {transactionsFile && (
              <span className="mt-2 text-[11px] text-emerald-700 font-mono font-bold">✓ {transactionsFile.name}</span>
            )}
          </motion.div>
        </div>

        {/* 400 Validation Error Box */}
        <AnimatePresence>
          {errorDetails && errorDetails.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="p-5 bg-rose-50 border border-rose-200 rounded-2xl text-rose-900 space-y-2 shadow-sm"
            >
              <div className="flex items-center gap-2 font-bold text-rose-800">
                <AlertTriangle className="w-5 h-5 text-rose-600" />
                <span>Validation Error (400 Bad Request)</span>
              </div>
              <ul className="list-disc list-inside text-xs space-y-1 text-rose-800 font-mono font-semibold pl-1">
                {errorDetails.map((msg, idx) => (
                  <li key={idx}>{msg}</li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Success Output Box */}
        <AnimatePresence>
          {successResult && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="p-5 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-900 space-y-3 shadow-sm"
            >
              <div className="flex items-center gap-2 font-bold text-emerald-800">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
                <span>Dataset Uploaded & Recomputed Successfully!</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-white p-3 rounded-xl border border-emerald-200">
                <div>
                  <span className="text-slate-500 block">Accounts Loaded</span>
                  <span className="font-bold text-slate-900">{successResult.accounts_loaded}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Transactions Loaded</span>
                  <span className="font-bold text-slate-900">{successResult.transactions_loaded}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Processing Time</span>
                  <span className="font-bold text-amber-700">{successResult.seconds_taken}s</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Status</span>
                  <span className="font-bold text-emerald-700">Recomputed</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || !accountsFile || !transactionsFile}
          className={`w-full py-3.5 px-4 rounded-xl font-bold text-white transition-all shadow-md flex items-center justify-center gap-2 active:scale-98 ${
            loading || !accountsFile || !transactionsFile
              ? 'bg-slate-300 text-slate-500 cursor-not-allowed shadow-none'
              : 'bg-blue-900 hover:bg-blue-800'
          }`}
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin text-white" />
              <span>Uploading Files & Re-running Pipeline (~5s)...</span>
            </>
          ) : (
            <>
              <UploadCloud className="w-5 h-5" />
              <span>Upload Dataset & Re-run Analysis</span>
            </>
          )}
        </button>
      </form>
    </motion.div>
  );
}
