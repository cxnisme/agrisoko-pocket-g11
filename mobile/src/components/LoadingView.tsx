import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { colors, spacing } from '../theme';

export default function LoadingView({ message = 'Loading...' }: { message?: string }) {
  return (
    <View style={styles.box} accessible accessibilityLabel={message} accessibilityLiveRegion="polite">
      <ActivityIndicator size="large" color={colors.field} />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: spacing.lg, gap: spacing.md },
  text: { color: colors.muted, fontSize: 16 },
});
