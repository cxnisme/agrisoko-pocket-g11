import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { Source } from '../types';
import { colors, radius, spacing } from '../theme';

const LABELS: Record<Source, string> = {
  live: 'Live result',
  cached: 'Cached result',
  offline: 'Offline match',
};

export default function SourceBadge({ source }: { source: Source }) {
  return (
    <View
      style={[styles.badge, source === 'live' ? styles.live : styles.other]}
      accessible
      accessibilityLabel={`Result source: ${LABELS[source]}`}
    >
      <Text style={styles.text}>{LABELS[source]}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: { alignSelf: 'flex-start', paddingHorizontal: spacing.sm + 2, paddingVertical: spacing.xs, borderRadius: radius.sm },
  live: { backgroundColor: colors.okBg },
  other: { backgroundColor: colors.gold },
  text: { color: colors.ink, fontWeight: '700', fontSize: 13 },
});
