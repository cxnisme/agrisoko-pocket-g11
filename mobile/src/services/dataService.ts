import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  API_BASE_URL, CONFIDENCE_THRESHOLD, GROUP_CODE, REQUEST_TIMEOUT_MS,
} from '../config';
import type { ApiErrorKind, AskOutcome, AskResponse, Member, MemberSummary, Source } from '../types';
import { ApiError } from '../types';

const LOCAL_MEMBERS: Member[] = [
  {
    id: 'cxnisme',
    fullName: 'cxnisme',
    aliases: ['christian', 'leader', 'integrator', 'release owner'],
    githubUsername: 'cxnisme',
    role: 'Group leader and final integrator',
    skills: ['integration', 'release coordination', 'Android delivery'],
    targetUser: 'Group G11',
    problem: 'The project needs a final integration and release owner.',
    contribution: 'Final integration and release ownership.',
    feature: 'project integration and release',
    outcomeMetric: null,
    evidenceLinks: [{ label: 'Repository', url: 'https://github.com/cxnisme/agrisoko-pocket-g11' }],
    testerFeedback: null,
    introductionDraft: 'I am the Group G11 leader and final integrator.',
  },
  {
    id: 'alain143',
    fullName: 'alain143',
    aliases: ['alain', 'mobile', 'ui', 'navigation', 'screen'],
    githubUsername: 'alain143',
    role: 'Mobile UI and navigation task owner',
    skills: ['React Native', 'TypeScript', 'Expo', 'navigation'],
    targetUser: 'Android app users',
    problem: 'The app needs a clear and accessible mobile experience.',
    contribution: 'Assigned mobile UI, screens, and navigation task; completion is subject to PR review.',
    feature: 'screens, components, and typed navigation',
    outcomeMetric: null,
    evidenceLinks: [{ label: 'Mobile task pull request', url: 'https://github.com/cxnisme/agrisoko-pocket-g11/pull/5' }],
    testerFeedback: null,
    introductionDraft: 'I am the mobile UI and navigation task owner for AgriSoko Pocket G11.',
  },
  {
    id: 'IHIMBAZWEAngelique',
    fullName: 'IHIMBAZWEAngelique',
    aliases: ['angelique', 'ai', 'matcher', 'data'],
    githubUsername: 'IHIMBAZWEAngelique',
    role: 'AI and data task owner',
    skills: ['Python', 'matching', 'data evaluation'],
    targetUser: 'Users asking about a team member',
    problem: 'The app needs transparent matching for member questions.',
    contribution: 'Assigned member matcher and evaluation task.',
    feature: 'member matching and evaluation',
    outcomeMetric: null,
    evidenceLinks: [{ label: 'AI task', url: 'https://github.com/cxnisme/agrisoko-pocket-g11/issues/2' }],
    testerFeedback: null,
    introductionDraft: 'I am the AI and data task owner for AgriSoko Pocket G11.',
  },
  {
    id: 'rudasingwatheogene1',
    fullName: 'rudasingwatheogene1',
    aliases: ['theogene', 'api', 'backend', 'validation', 'server'],
    githubUsername: 'rudasingwatheogene1',
    role: 'API backend task owner',
    skills: ['FastAPI', 'REST API', 'validation'],
    targetUser: 'The mobile application',
    problem: 'The app needs a stable and validated service API.',
    contribution: 'Assigned FastAPI endpoints and validation task.',
    feature: 'API endpoints and validation',
    outcomeMetric: null,
    evidenceLinks: [{ label: 'API task', url: 'https://github.com/cxnisme/agrisoko-pocket-g11/issues/3' }],
    testerFeedback: null,
    introductionDraft: 'I am the API backend task owner for AgriSoko Pocket G11.',
  },
  {
    id: 'ladumartinbullen-cmyk',
    fullName: 'ladumartinbullen-cmyk',
    aliases: ['martin', 'offline', 'cache', 'recovery', 'local'],
    githubUsername: 'ladumartinbullen-cmyk',
    role: 'Offline and quality task owner',
    skills: ['offline lookup', 'cache recovery', 'device testing'],
    targetUser: 'Users with limited network access',
    problem: 'The app should preserve useful directory and result data during network interruptions.',
    contribution: 'Offline and quality task is defined in issue #4; no member implementation PR has been verified.',
    feature: 'offline cache, local lookup, and recovery tests',
    outcomeMetric: null,
    evidenceLinks: [{ label: 'Offline and quality task', url: 'https://github.com/cxnisme/agrisoko-pocket-g11/issues/4' }],
    testerFeedback: null,
    introductionDraft: 'I am the offline and quality task owner for AgriSoko Pocket G11.',
  },
];

export interface DirectoryOutcome {
  members: MemberSummary[];
  source: Source;
}

export interface MemberOutcome {
  member: Member;
  source: Source;
}

const CACHE_PREFIX = 'agrisoko-pocket-g11:v1';

const toSummary = ({ id, fullName, role, feature }: Member): MemberSummary => ({
  id, fullName, role, feature,
});

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isMemberSummary(value: unknown): value is Record<string, unknown> & MemberSummary {
  return isRecord(value)
    && typeof value.id === 'string'
    && typeof value.fullName === 'string'
    && typeof value.role === 'string'
    && typeof value.feature === 'string';
}

function isMemberSummaryArray(value: unknown): value is MemberSummary[] {
  return Array.isArray(value) && value.every(isMemberSummary);
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((entry) => typeof entry === 'string');
}

function isEvidenceLinkArray(value: unknown): value is Member['evidenceLinks'] {
  return Array.isArray(value) && value.every((entry) => isRecord(entry)
    && typeof entry.label === 'string'
    && typeof entry.url === 'string');
}

function isMember(value: unknown): value is Member {
  return isMemberSummary(value)
    && isStringArray(value.aliases)
    && typeof value.githubUsername === 'string'
    && isStringArray(value.skills)
    && typeof value.targetUser === 'string'
    && typeof value.problem === 'string'
    && typeof value.contribution === 'string'
    && (typeof value.outcomeMetric === 'string' || value.outcomeMetric === null)
    && isEvidenceLinkArray(value.evidenceLinks)
    && (typeof value.testerFeedback === 'string' || value.testerFeedback === null)
    && typeof value.introductionDraft === 'string';
}

function isAskResponse(value: unknown): value is AskResponse {
  return isRecord(value)
    && typeof value.query === 'string'
    && typeof value.matched === 'boolean'
    && (value.member === null || isMemberSummary(value.member))
    && typeof value.confidence === 'number'
    && typeof value.reason === 'string'
    && typeof value.introduction === 'string'
    && isEvidenceLinkArray(value.evidenceLinks)
    && isStringArray(value.suggestions)
    && typeof value.modelVersion === 'string'
    && typeof value.groupCode === 'string';
}

async function readCache<T>(key: string, validate: (value: unknown) => value is T): Promise<T | null> {
  try {
    const serialized = await AsyncStorage.getItem(key);
    if (serialized === null) return null;
    const value: unknown = JSON.parse(serialized);
    if (!validate(value)) throw new Error(`Invalid saved data for ${key}`);
    return value;
  } catch (error) {
    console.warn('Could not read saved AgriSoko data.', error);
    return null;
  }
}

async function writeCache(key: string, value: unknown): Promise<void> {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn('Could not save AgriSoko data for offline use.', error);
  }
}

async function fetchJson<T>(
  path: string,
  validate: (value: unknown) => value is T,
  init?: RequestInit,
): Promise<T> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    const response = await fetch(`${API_BASE_URL}${path}`, { ...init, signal: controller.signal });
    if (!response.ok) throw new ApiError('server', `Server returned ${response.status}`);

    let payload: unknown;
    try {
      payload = await response.json();
    } catch {
      throw new ApiError('server', 'The server returned invalid JSON');
    }
    if (!validate(payload)) throw new ApiError('server', 'The server returned an invalid response');
    return payload;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    if (error instanceof Error && error.name === 'AbortError') {
      throw new ApiError('timeout', 'The request timed out');
    }
    if (error instanceof TypeError) throw new ApiError('offline', 'Could not reach the server');
    throw new ApiError('server', 'Could not process the server response');
  } finally {
    clearTimeout(timer);
  }
}

function errorKind(error: unknown): ApiErrorKind {
  return error instanceof ApiError ? error.kind : 'server';
}

export async function getDirectory(): Promise<DirectoryOutcome> {
  try {
    const members = await fetchJson('/members', isMemberSummaryArray);
    await writeCache(`${CACHE_PREFIX}:directory`, members);
    return { members, source: 'live' };
  } catch (error) {
    if (errorKind(error) !== 'offline') throw error;
    const cached = await readCache(
      `${CACHE_PREFIX}:directory`,
      (value): value is MemberSummary[] => Array.isArray(value) && value.every(isMemberSummary),
    );
    if (cached) return { members: cached, source: 'cached' };
    return { members: LOCAL_MEMBERS.map(toSummary), source: 'offline' };
  }
}

export async function getMember(id: string): Promise<MemberOutcome> {
  try {
    const member = await fetchJson(`/members/${encodeURIComponent(id)}`, isMember);
    await writeCache(`${CACHE_PREFIX}:member:${id}`, member);
    return { member, source: 'live' };
  } catch (error) {
    if (errorKind(error) !== 'offline') throw error;
    const cached = await readCache(
      `${CACHE_PREFIX}:member:${id}`,
      isMember,
    );
    if (cached) return { member: cached, source: 'cached' };
    const member = LOCAL_MEMBERS.find((entry) => entry.id === id);
    if (!member) throw new ApiError('server', 'Member not found');
    return { member, source: 'offline' };
  }
}

function localAsk(query: string): AskResponse {
  const stopWords = new Set(['a', 'an', 'and', 'built', 'did', 'does', 'for', 'how', 'i', 'is', 'me', 'of', 'the', 'to', 'who', 'what']);
  const terms = query.toLowerCase().split(/\W+/).filter((word) => word.length > 1 && !stopWords.has(word));
  const ranked = LOCAL_MEMBERS.map((member) => {
    const searchable = [
      member.fullName, ...member.aliases, member.role, member.feature,
      ...member.skills, member.contribution,
    ].join(' ').toLowerCase();
    const matched = terms.filter((term) => searchable.includes(term));
    return { member, score: terms.length ? matched.length / terms.length : 0, matched };
  }).sort((left, right) => right.score - left.score);

  const best = ranked[0];
  const next = ranked[1];
  const confident = best !== undefined
    && best.score >= CONFIDENCE_THRESHOLD
    && (!next || best.score - next.score >= 0.1);
  const member = confident ? best.member : null;

  return {
    query,
    matched: !!member,
    member: member ? toSummary(member) : null,
    confidence: best?.score ?? 0,
    reason: member
      ? `Matched profile terms: ${best.matched.join(', ')}.`
      : 'No confident match found in the bundled member records.',
    introduction: member?.introductionDraft ?? '',
    evidenceLinks: member?.evidenceLinks ?? [],
    suggestions: LOCAL_MEMBERS.map((entry) => entry.fullName),
    modelVersion: 'g11-local-v1',
    groupCode: GROUP_CODE,
  };
}

export async function askTeam(query: string): Promise<AskOutcome> {
  const cacheKey = `${CACHE_PREFIX}:ask:${encodeURIComponent(query.trim().toLowerCase())}`;
  try {
    const response = await fetchJson('/ask', isAskResponse, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    });
    await writeCache(cacheKey, response);
    return { response, source: 'live' };
  } catch (error) {
    if (errorKind(error) !== 'offline') throw error;
    const cached = await readCache(cacheKey, isAskResponse);
    if (cached) return { response: cached, source: 'cached' };
    return { response: localAsk(query), source: 'offline' };
  }
}
