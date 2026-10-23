/**
 * DATA SERVICE: the single place screens get data from.
 * Screens never call fetch directly. The API engineer and the offline engineer
 * own the real implementation (live fetch, AsyncStorage cache, offline lookup).
 * While USE_MOCK is true this returns PLACEHOLDER data so the UI can be built
 * and tested. Replace the placeholder members with approved members.json data.
 */
import {
  API_BASE_URL, CONFIDENCE_THRESHOLD, GROUP_CODE, REQUEST_TIMEOUT_MS, USE_MOCK,
} from '../config';
import { ApiError, AskOutcome, AskResponse, Member, MemberSummary } from '../types';

const MOCK_MEMBERS: Member[] = [
  {
    id: '1', fullName: 'Placeholder Member One', registrationNumber: 'TODO',
    aliases: ['one'], githubUsername: 'todo-user-1', role: 'Mobile UI and navigation engineer',
    skills: ['React Native', 'TypeScript'], targetUser: 'Cooperative members',
    problem: 'TODO', contribution: 'TODO: describe what this member built',
    feature: 'screens and navigation', outcomeMetric: null,
    evidenceLinks: [{ label: 'Repository', url: 'https://github.com' }],
    testerFeedback: null, introductionDraft: 'My name is Placeholder Member One. TODO.',
    // replace with real data
  },
  {
    id: '2', fullName: 'Placeholder Member Two', registrationNumber: 'TODO',
    aliases: ['two'], githubUsername: 'todo-user-2', role: 'AI and data engineer',
    skills: ['scikit-learn', 'TF-IDF'], targetUser: 'Cooperative members',
    problem: 'TODO', contribution: 'TODO', feature: 'matching engine',
    outcomeMetric: null, evidenceLinks: [], testerFeedback: null,
    introductionDraft: 'My name is Placeholder Member Two. TODO.',
  },
];

const toSummary = (m: Member): MemberSummary => ({
  id: m.id, fullName: m.fullName, role: m.role, feature: m.feature,
});

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function fetchJson<T>(path: string, init?: RequestInit): Promise<T> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    const res = await fetch(`${API_BASE_URL}${path}`, { ...init, signal: controller.signal });
    if (!res.ok) throw new ApiError('server', `Server returned ${res.status}`);
    return (await res.json()) as T;
  } catch (e) {
    if (e instanceof ApiError) throw e;
    if ((e as Error).name === 'AbortError') throw new ApiError('timeout', 'The request timed out');
    throw new ApiError('offline', 'Could not reach the server');
  } finally {
    clearTimeout(timer);
  }
}

export async function getDirectory(): Promise<MemberSummary[]> {
  if (USE_MOCK) { await sleep(300); return MOCK_MEMBERS.map(toSummary); }
  return fetchJson<MemberSummary[]>('/members');
}

export async function getMember(id: string): Promise<Member> {
  if (USE_MOCK) {
    await sleep(300);
    const m = MOCK_MEMBERS.find((x) => x.id === id);
    if (!m) throw new ApiError('server', 'Member not found');
    return m;
  }
  return fetchJson<Member>(`/members/${id}`);
}

export async function askTeam(query: string): Promise<AskOutcome> {
  if (USE_MOCK) {
    await sleep(600);
    const q = query.toLowerCase();
    const words = q.split(/\W+/).filter(Boolean);
    let best: Member | null = null;
    let bestScore = 0;
    for (const m of MOCK_MEMBERS) {
      const hay = [m.fullName, ...m.aliases, m.role, m.feature, ...m.skills].join(' ').toLowerCase();
      const hits = words.filter((w) => w.length > 2 && hay.includes(w)).length;
      const score = words.length ? Math.min(1, hits / Math.min(words.length, 3)) : 0;
      if (score > bestScore) { best = m; bestScore = score; }
    }
    const matched = !!best && bestScore >= CONFIDENCE_THRESHOLD;
    const response: AskResponse = {
      query, matched, member: matched && best ? toSummary(best) : null,
      confidence: bestScore,
      reason: matched ? 'Mock: query words found in the member document.' : 'No confident match found.',
      introduction: matched && best ? best.introductionDraft : '',
      evidenceLinks: matched && best ? best.evidenceLinks : [],
      suggestions: MOCK_MEMBERS.map((m) => m.fullName),
      modelVersion: 'mock-0', groupCode: GROUP_CODE,
    };
    return { response, source: 'live' };
  }
  const response = await fetchJson<AskResponse>('/ask', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
  });
  return { response, source: 'live' };
}
