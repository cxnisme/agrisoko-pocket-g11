import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import type { MemberSummary } from '../types';
import { colors, radius, spacing } from '../theme';

interface Props { member: MemberSummary; onPress: (id: string) => void }

export default function MemberCard({ member, onPress }: Props) {
  return (
    <Pressable
      onPress={() => onPress(member.id)}
      accessibilityRole="button"
      accessibilityLabel={`${member.fullName}, ${member.role}`}
      accessibilityHint="Opens the member profile"
      style={({ pressed }) => [styles.card, pressed && { opacity: 0.8 }]}
    >
      <Text style={styles.name}>{member.fullName}</Text>
      <Text style={styles.role}>{member.role}</Text>
      {!!member.feature && <Text style={styles.feature}>Built: {member.feature}</Text>}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.surface, borderRadius: radius.md, padding: spacing.md, borderLeftWidth: 5, borderLeftColor: colors.gold, borderWidth: 1, borderColor: colors.line },
  name: { fontSize: 18, fontWeight: '700', color: colors.ink },
  role: { fontSize: 15, color: colors.soil, marginTop: 2 },
  feature: { fontSize: 14, color: colors.muted, marginTop: spacing.xs },
});
