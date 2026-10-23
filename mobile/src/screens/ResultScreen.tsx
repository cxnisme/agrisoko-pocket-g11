import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import type { ScreenProps } from '../navigation/types';
import Button from '../components/Button';
import EvidenceLink from '../components/EvidenceLink';
import LoadingView from '../components/LoadingView';
import SourceBadge from '../components/SourceBadge';
import StatusBanner from '../components/StatusBanner';
import { askTeam } from '../services/dataService';
import { ApiError, AskOutcome } from '../types';
import { colors, radius, spacing } from '../theme';

type State =
  | { kind: 'loading' }
  | { kind: 'done'; outcome: AskOutcome }
  | { kind: 'error'; message: string };

// Keeps the last useful result so a failed retry never wipes it.
let lastOutcome: { query: string; outcome: AskOutcome } | null = null;

const ERROR_TEXT: Record<string, string> = {
  timeout: 'The server took too long to answer. Check your connection and retry.',
  server: 'The service is unavailable right now. Please retry in a moment.',
  offline: 'You appear to be offline and the server cannot be reached.',
};

export default function ResultScreen({ route, navigation }: ScreenProps<'Result'>) {
  const { query } = route.params;
  const [state, setState] = useState<State>({ kind: 'loading' });

  const load = useCallback(async () => {
    setState({ kind: 'loading' });
    try {
      const outcome = await askTeam(query);
      lastOutcome = { query, outcome };
      setState({ kind: 'done', outcome });
    } catch (e) {
      const kind = e instanceof ApiError ? e.kind : 'server';
      setState({ kind: 'error', message: ERROR_TEXT[kind] });
    }
  }, [query]);

  useEffect(() => { load(); }, [load]);

  if (state.kind === 'loading') return <LoadingView message="Searching team profiles..." />;

  if (state.kind === 'error') {
    return (
      <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
        <StatusBanner kind="error" message={state.message} />
        <Button label="Retry" onPress={load} />
        <Button label="Browse the team instead" variant="secondary" onPress={() => navigation.navigate('Directory')} />
        {lastOutcome?.query === query && (
          <View style={styles.card}>
            <Text style={styles.small}>Last successful result</Text>
            <Text style={styles.name}>{lastOutcome.outcome.response.member?.fullName ?? 'No match'}</Text>
            <SourceBadge source="cached" />
          </View>
        )}
      </ScrollView>
    );
  }

  const { response, source } = state.outcome;

  if (!response.matched || !response.member) {
    return (
      <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
        <Text style={styles.heading} accessibilityRole="header">No confident match found</Text>
        <Text style={styles.body}>We could not link "{query}" to a team member. Try a name, a role or a feature.</Text>
        {response.suggestions.length > 0 && <Text style={styles.small}>Suggestions</Text>}
        {response.suggestions.map((s) => (
          <Button key={s} label={s} variant="secondary" onPress={() => navigation.navigate('Result', { query: s })} />
        ))}
        <Button label="Ask a different question" onPress={() => navigation.navigate('Ask')} />
        <Button label="Browse the team" variant="secondary" onPress={() => navigation.navigate('Directory')} />
      </ScrollView>
    );
  }

  const m = response.member;
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <SourceBadge source={source} />
      <Text style={styles.heading} accessibilityRole="header">{m.fullName}</Text>
      <Text style={styles.role}>{m.role}</Text>

      <View style={styles.card}>
        <Text style={styles.small}>Confidence</Text>
        <Text style={styles.confidence} accessibilityLabel={`Confidence ${Math.round(response.confidence * 100)} percent`}>
          {Math.round(response.confidence * 100)}%
        </Text>
        <Text style={styles.small}>Why this match</Text>
        <Text style={styles.body}>{response.reason}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.small}>Introduction</Text>
        <Text style={styles.body}>{response.introduction}</Text>
      </View>

      {response.evidenceLinks.length > 0 && <Text style={styles.small}>Evidence</Text>}
      {response.evidenceLinks.map((l) => <EvidenceLink key={l.url} label={l.label} url={l.url} />)}

      <Button label="View full profile" onPress={() => navigation.navigate('Profile', { memberId: m.id })} />
      <Button label="Ask another question" variant="secondary" onPress={() => navigation.navigate('Ask')} />
      <Text style={styles.foot}>Model {response.modelVersion} · Team {response.groupCode}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  content: { padding: spacing.lg, gap: spacing.sm + 2 },
  heading: { fontSize: 26, fontWeight: '800', color: colors.fieldDark },
  role: { fontSize: 16, color: colors.soil, fontWeight: '600' },
  card: { backgroundColor: colors.surface, borderRadius: radius.md, padding: spacing.md, borderWidth: 1, borderColor: colors.line, gap: spacing.xs },
  small: { fontSize: 14, fontWeight: '700', color: colors.soil },
  name: { fontSize: 18, fontWeight: '700', color: colors.ink },
  body: { fontSize: 16, lineHeight: 24, color: colors.ink },
  confidence: { fontSize: 32, fontWeight: '800', color: colors.field },
  foot: { fontSize: 12, color: colors.muted, textAlign: 'center', marginTop: spacing.sm },
});
