import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { colors, radius, spacing } from '../theme';

interface Props {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  accessibilityHint?: string;
}

export default function Button({ label, onPress, variant = 'primary', disabled, accessibilityHint }: Props) {
  const primary = variant === 'primary';
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityHint={accessibilityHint}
      accessibilityState={{ disabled: !!disabled }}
      style={({ pressed }) => [
        styles.base,
        primary ? styles.primary : styles.secondary,
        pressed && { opacity: 0.8 },
        disabled && { opacity: 0.5 },
      ]}
    >
      <Text style={[styles.text, { color: primary ? '#FFFFFF' : colors.field }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 48, paddingHorizontal: spacing.md, paddingVertical: spacing.sm,
    borderRadius: radius.md, alignItems: 'center', justifyContent: 'center',
  },
  primary: { backgroundColor: colors.field },
  secondary: { backgroundColor: colors.surface, borderWidth: 2, borderColor: colors.field },
  text: { fontSize: 16, fontWeight: '700', textAlign: 'center' },
});
