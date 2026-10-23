import axios from 'axios';

// Configure this to match your local workstation execution port
const API_BASE_URL = 'http://127.0.0.1:8000'; 
const REQUEST_TIMEOUT = 5000; // Mandatory project timeout constraint

export interface AskResponse {
  query: string;
  top_match: string | null;
  confidence: number;
  reason: string;
  introduction: string | null;
  evidence_links: string[];
  model_version: string;
}

export interface ModelInfo {
  vectorizer_type: string;
  threshold: number;
  dataset_fingerprint: string;
  limitations: string[];
  build_commit: string;
}

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: REQUEST_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const teamApi = {
  /**
   * GET /health
   * Validates backend connectivity and lecturer group parameters.
   */
  checkHealth: async (): Promise<{ status: string; group_code: string }> => {
    const response = await apiClient.get('/health');
    return response.data;
  },

  /**
   * GET /model-info
   * Fetches deterministic TF-IDF parameters and cryptographic verification hashes.
   */
  getModelInfo: async (): Promise<ModelInfo> => {
    const response = await apiClient.get('/model-info');
    return response.data;
  },

  /**
   * POST /ask
   * Sends natural language questions to resolve active team profiles.
   */
  askQuestion: async (queryText: string): Promise<AskResponse> => {
    const response = await apiClient.post('/ask', { query: queryText });
    return response.data;
  },
};
