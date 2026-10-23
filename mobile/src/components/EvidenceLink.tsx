import React from 'react';
import { Alert, Linking, Pressable, StyleSheet, Text } from 'react-native';
import { colors, radius, spacing } from '../theme';

interface Props { label: string; url: string }

export default function EvidenceLink({ label, url }: Props) {
  const open = async () => {
    try {
      const ok = await Linking.canOpenURL(url);
      if (!ok) throw new Error('unsupported');
      await Linking.openURL(url);
    } catch {
      Alert.alert('Link unavailable', 'This link could not be opened. Check your connection and try again.');
    }
  };
  return (
    <Pressable
      onPress={open}
      accessibilityRole="link"
      accessibilityLabel={`${label}, opens in browser`}
      style={({ pressed }) => [styles.row, pressed && { opacity: 0.7 }]}
    >
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.url} numberOfLines={1}>{url}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: { minHeight: 48, padding: spacing.sm + 2, borderRadius: radius.sm, borderWidth: 1, borderColor: colors.line, backgroundColor: colors.surface },
  label: { color: colors.field, fontWeight: '700', fontSize: 15 },
  url: { color: colors.muted, fontSize: 13, marginTop: 2 },
});
