import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import type { ScreenProps } from '../navigation/types';
import Button from '../components/Button';
import EvidenceLink from '../components/EvidenceLink';
import LoadingView from '../components/LoadingView';
import SourceBadge from '../components/SourceBadge';
import StatusBanner from '../components/StatusBanner';
import { getMember } from '../services/dataService';
import type { Member } from '../types';
import { colors, radius, spacing } from '../theme';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle} accessibilityRole="header">{title}</Text>
      {children}
    </View>
  );
}

export default function ProfileScreen({ route }: ScreenProps<'Profile'>) {
  const { memberId, source } = route.params;
  const [member, setMember] = useState<Member | null>(null);
  const [failed, setFailed] = useState(false);

  const load = useCallback(async () => {
    setFailed(false);
    try { setMember(await getMember(memberId)); } catch { setFailed(true); }
  }, [memberId]);

  useEffect(() => { load(); }, [load]);

  if (failed) {
    return (
      <View style={styles.center}>
        <StatusBanner kind="error" message="This profile could not be loaded." />
        <Button label="Retry" onPress={load} />
      </View>
    );
  }
  if (!member) return <LoadingView message="Loading profile..." />;

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      {source && <SourceBadge source={source} />}
      <Text style={styles.name} accessibilityRole="header">{member.fullName}</Text>
      <Text style={styles.role}>{member.role} · @{member.githubUsername}</Text>

      <Section title="Introduction"><Text style={styles.body}>{member.introductionDraft}</Text></Section>
      <Section title="Who it helps"><Text style={styles.body}>{member.targetUser}</Text></Section>
      <Section title="Problem addressed"><Text style={styles.body}>{member.problem}</Text></Section>
      <Section title="Contribution"><Text style={styles.body}>{member.contribution}</Text></Section>
      <Section title="Skills"><Text style={styles.body}>{member.skills.join(', ')}</Text></Section>
      <Section title="Measured evidence">
        <Text style={styles.body}>
          {member.outcomeMetric ?? 'No verified outcome recorded. Built and tested only.'}
        </Text>
      </Section>
      {!!member.testerFeedback && (
        <Section title="Tester feedback"><Text style={styles.body}>{member.testerFeedback}</Text></Section>
      )}
      <Section title="Repository and demo evidence">
        {member.evidenceLinks.length === 0
          ? <Text style={styles.body}>No evidence links recorded yet.</Text>
          : member.evidenceLinks.map((l) => <EvidenceLink key={l.url} label={l.label} url={l.url} />)}
      </Section>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  content: { padding: spacing.lg, gap: spacing.md },
  center: { flex: 1, padding: spacing.lg, gap: spacing.md, justifyContent: 'center', backgroundColor: colors.bg },
  name: { fontSize: 26, fontWeight: '800', color: colors.fieldDark },
  role: { fontSize: 15, color: colors.soil, fontWeight: '600' },
  section: { backgroundColor: colors.surface, borderRadius: radius.md, padding: spacing.md, borderWidth: 1, borderColor: colors.line, gap: spacing.sm },
  sectionTitle: { fontSize: 15, fontWeight: '700', color: colors.soil },
  body: { fontSize: 16, lineHeight: 24, color: colors.ink },
});
