export type Source = 'live' | 'cached' | 'offline';

export interface EvidenceLinkItem {
  label: string; // e.g. "Pull request", "Commit", "Demo video"
  url: string;
}

export interface MemberSummary {
  id: string;
  fullName: string;
  role: string;
  feature: string;
}

export interface Member extends MemberSummary {
  aliases: string[];
  githubUsername: string;
  skills: string[];
  targetUser: string;
  problem: string;
  contribution: string;
  outcomeMetric: string | null;
  evidenceLinks: EvidenceLinkItem[];
  testerFeedback: string | null;
  introductionDraft: string;
}

// Agree this shape with the API engineer (POST /ask)
export interface AskResponse {
  query: string;
  matched: boolean;
  member: MemberSummary | null;
  confidence: number; // 0..1
  reason: string;
  introduction: string;
  evidenceLinks: EvidenceLinkItem[];
  suggestions: string[]; // names / roles shown on no-match
  modelVersion: string;
  groupCode: string;
}

export interface AskOutcome {
  response: AskResponse;
  source: Source;
}

export type ApiErrorKind = 'timeout' | 'server' | 'offline';
export class ApiError extends Error {
  kind: ApiErrorKind;
  constructor(kind: ApiErrorKind, message: string) {
    super(message);
    this.kind = kind;
  }
}
