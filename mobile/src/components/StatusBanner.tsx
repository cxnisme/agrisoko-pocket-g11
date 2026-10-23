import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing } from '../theme';

interface Props {
  kind: 'offline' | 'error' | 'info';
  message: string;
}

export default function StatusBanner({ kind, message }: Props) {
  const palette = {
    offline: { bg: colors.warnBg, fg: colors.warnText },
    error: { bg: colors.dangerBg, fg: colors.danger },
    info: { bg: colors.okBg, fg: colors.field },
  }[kind];
  return (
    <View
      accessible
      accessibilityRole="alert"
      accessibilityLabel={message}
      style={[styles.box, { backgroundColor: palette.bg }]}
    >
      <Text style={[styles.text, { color: palette.fg }]}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: { padding: spacing.md, borderRadius: radius.md },
  text: { fontSize: 15, fontWeight: '600' },
});
