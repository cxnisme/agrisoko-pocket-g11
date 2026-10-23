import AsyncStorage from '@react-native-async-storage/async-storage';
import { askTeam, getDirectory, getMember } from '../dataService';

jest.mock('@react-native-async-storage/async-storage', () => (
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
));

const memberSummary = {
  id: 'alain143',
  fullName: 'alain143',
  role: 'Mobile UI and navigation task owner',
  feature: 'screens, components, and typed navigation',
};

const member = {
  ...memberSummary,
  aliases: ['mobile', 'ui', 'navigation'],
  githubUsername: 'alain143',
  skills: ['React Native', 'TypeScript', 'Expo', 'navigation'],
  targetUser: 'Android app users',
  problem: 'The app needs a clear and accessible mobile experience.',
  contribution: 'Assigned mobile UI, screens, and navigation task; completion is subject to PR review.',
  outcomeMetric: null,
  evidenceLinks: [{ label: 'Pull request', url: 'https://github.com/cxnisme/agrisoko-pocket-g11/pull/5' }],
  testerFeedback: null,
  introductionDraft: 'I am the mobile UI and navigation task owner for AgriSoko Pocket G11.',
};

const askResponse = (query: string) => ({
  query,
  matched: true,
  member: memberSummary,
  confidence: 0.82,
  reason: 'Matched by the profile.',
  introduction: member.introductionDraft,
  evidenceLinks: member.evidenceLinks,
  suggestions: [member.fullName],
  modelVersion: 'g11-tfidf-cosine-v1',
  groupCode: 'G11',
});

function response(body: unknown, ok = true, status = 200): Response {
  return {
    ok,
    status,
    json: async () => body,
  } as Response;
}

const fetchMock = jest.spyOn(global, 'fetch');

beforeEach(async () => {
  await AsyncStorage.clear();
  fetchMock.mockReset();
});

afterAll(() => {
  fetchMock.mockRestore();
});

describe('offline data service', () => {
  it('serves a bundled directory when the API is unreachable', async () => {
    fetchMock.mockRejectedValue(new TypeError('Network request failed'));

    const result = await getDirectory();

    expect(result.source).toBe('offline');
    expect(result.members.map((entry) => entry.id)).toContain('alain143');
  });

  it('restores the last live directory from persistent cache', async () => {
    fetchMock.mockResolvedValueOnce(response([memberSummary]));
    expect((await getDirectory()).source).toBe('live');

    fetchMock.mockRejectedValueOnce(new TypeError('Network request failed'));
    const result = await getDirectory();

    expect(result).toEqual({ members: [memberSummary], source: 'cached' });
  });

  it('restores a cached profile after the API becomes unreachable', async () => {
    fetchMock.mockResolvedValueOnce(response(member));
    expect((await getMember('alain143')).source).toBe('live');

    fetchMock.mockRejectedValueOnce(new TypeError('Network request failed'));
    const result = await getMember('alain143');

    expect(result).toEqual({ member, source: 'cached' });
  });

  it('restores the same successful query from persistent cache', async () => {
    const query = 'Who built the mobile UI?';
    fetchMock.mockResolvedValueOnce(response(askResponse(query)));
    expect((await askTeam(query)).source).toBe('live');

    fetchMock.mockRejectedValueOnce(new TypeError('Network request failed'));
    const result = await askTeam(query);

    expect(result).toEqual({ response: askResponse(query), source: 'cached' });
  });

  it('uses local matching offline and rejects unrelated questions', async () => {
    fetchMock.mockRejectedValue(new TypeError('Network request failed'));

    const match = await askTeam('Who built the mobile UI and navigation?');
    const offlineOwner = await askTeam('Who owns offline cache and recovery testing?');
    const noMatch = await askTeam('Tell me about the moon landing');

    expect(match.source).toBe('offline');
    expect(match.response.member?.id).toBe('alain143');
    expect(offlineOwner.response.member?.id).toBe('ladumartinbullen-cmyk');
    expect(noMatch.response.matched).toBe(false);
  });

  it('does not disguise server errors as offline results', async () => {
    fetchMock.mockResolvedValue(response({ detail: 'Unavailable' }, false, 503));

    await expect(getDirectory()).rejects.toMatchObject({ kind: 'server' });
  });

  it('reports malformed server responses rather than treating them as offline', async () => {
    const invalidResponse = response(null);
    invalidResponse.json = async () => { throw new SyntaxError('Invalid JSON'); };
    fetchMock.mockResolvedValue(invalidResponse);

    await expect(getDirectory()).rejects.toMatchObject({ kind: 'server' });
  });
});
