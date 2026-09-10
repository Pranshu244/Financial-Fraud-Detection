const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

/**
 * Generic helper to execute fetch requests and handle JSON / HTTP errors
 */
async function fetchJson(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  try {
    const response = await fetch(url, options);
    
    // Parse response data if content exists
    let data = null;
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      const text = await response.text();
      data = text ? { detail: text } : null;
    }

    if (!response.ok) {
      const error = new Error(data?.detail || response.statusText || 'API Request Failed');
      error.status = response.status;
      error.data = data;
      throw error;
    }

    return data;
  } catch (err) {
    if (!err.status) {
      err.status = 500;
    }
    throw err;
  }
}

/**
 * GET /stats/summary
 * Dashboard totals and summary data
 */
export async function getSummaryStats() {
  return await fetchJson('/stats/summary');
}

/**
 * GET /flagged?tier=&limit=
 * Flagged accounts table with optional tier filter
 */
export async function getFlaggedAccounts(tier = '', limit = 100) {
  const params = new URLSearchParams();
  if (tier) params.append('tier', tier);
  if (limit) params.append('limit', limit);
  const query = params.toString() ? `?${params.toString()}` : '';
  return await fetchJson(`/flagged${query}`);
}

/**
 * GET /accounts/{account_id}/risk
 * Account risk score, fraud prob, deviation score, and action tier
 */
export async function getAccountRisk(accountId) {
  return await fetchJson(`/accounts/${encodeURIComponent(accountId)}/risk`);
}

/**
 * GET /accounts/{account_id}/evidence
 * Account explanation text and signal flags
 */
export async function getAccountEvidence(accountId) {
  return await fetchJson(`/accounts/${encodeURIComponent(accountId)}/evidence`);
}

/**
 * GET /accounts/{account_id}/graph?hops=1
 * Subgraph around account with nodes and edges
 */
export async function getAccountGraph(accountId, hops = 1) {
  return await fetchJson(`/accounts/${encodeURIComponent(accountId)}/graph?hops=${hops}`);
}

/**
 * POST /pipeline/run
 * Re-runs Stage 1 -> 4 live in memory and returns updated summary
 */
export async function runPipeline() {
  return await fetchJson('/pipeline/run', {
    method: 'POST',
  });
}

/**
 * POST /pipeline/upload
 * Replaces dataset with accounts.csv and transactions.csv via multipart/form-data
 */
export async function uploadDataset(accountsFile, transactionsFile) {
  const formData = new FormData();
  formData.append('accounts_file', accountsFile);
  formData.append('transactions_file', transactionsFile);

  return await fetchJson('/pipeline/upload', {
    method: 'POST',
    body: formData,
  });
}
