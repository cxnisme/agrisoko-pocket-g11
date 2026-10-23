import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import EvidenceLink from '../components/EvidenceLink';
import StatusBanner from '../components/StatusBanner';
import { useOnline } from '../hooks/useOnline';
import { API_BASE_URL, APP_VERSION, CONFIDENCE_THRESHOLD, GITHUB_URL, GROUP_CODE } from '../config';
import { colors, radius, spacing } from '../theme';

function Row({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.row} accessible accessibilityLabel={`${label}: ${value}`}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

export default function AboutScreen() {
  const online = useOnline();
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <StatusBanner
        kind={online ? 'info' : 'offline'}
        message={online ? 'Device is online. API status shown by the service.' : 'Device is offline. Showing bundled data only.'}
      />
      <Row label="Data source" value="Approved member profiles (members.json), reviewed by each member" />
      <Row label="Model approach" value="TF-IDF with cosine similarity and an exact name or alias boost. No generative AI." />
      <Row label="Confidence threshold" value={String(CONFIDENCE_THRESHOLD)} />
      <Row label="API URL" value={API_BASE_URL} />
      <Row label="APK version" value={APP_VERSION} />
      <Row label="Group verification code" value={GROUP_CODE} />
      <Row label="Limitations" value="Answers only from approved records. Vague questions return no confident match." />
      <EvidenceLink label="GitHub repository" url={GITHUB_URL} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  content: { padding: spacing.lg, gap: spacing.sm + 2 },
  row: { backgroundColor: colors.surface, borderRadius: radius.md, padding: spacing.md, borderWidth: 1, borderColor: colors.line },
  label: { fontSize: 14, fontWeight: '700', color: colors.soil },
  value: { fontSize: 16, color: colors.ink, marginTop: 2 },
});
