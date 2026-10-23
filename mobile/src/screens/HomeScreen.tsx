import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import type { ScreenProps } from '../navigation/types';
import Button from '../components/Button';
import StatusBanner from '../components/StatusBanner';
import { useOnline } from '../hooks/useOnline';
import { APP_NAME, APP_VERSION, GROUP_CODE } from '../config';
import { colors, spacing } from '../theme';

export default function HomeScreen({ navigation }: ScreenProps<'Home'>) {
  const online = useOnline();
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.title} accessibilityRole="header">{APP_NAME}</Text>
      <Text style={styles.body}>
        Explore Group G11 member task areas, repository evidence, and the current
        project implementation. Task assignment does not by itself prove completion.
      </Text>

      <View style={styles.meta}>
        <Text style={styles.metaText}>Team code: {GROUP_CODE}</Text>
        <Text style={styles.metaText}>Version: {APP_VERSION}</Text>
      </View>

      <StatusBanner
        kind={online ? 'info' : 'offline'}
        message={online
          ? 'Online: requests use the configured API; bundled lookup is available if it cannot be reached.'
          : 'Offline: bundled member task records and local matching are available.'}
      />

      <View style={styles.actions}>
        <Button label="Ask the team" onPress={() => navigation.navigate('Ask')} accessibilityHint="Type a question about a team member" />
        <Button label="Browse the team" variant="secondary" onPress={() => navigation.navigate('Directory')} />
        <Button label="About and evidence" variant="secondary" onPress={() => navigation.navigate('About')} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  content: { padding: spacing.lg, gap: spacing.md },
  title: { fontSize: 28, fontWeight: '800', color: colors.fieldDark },
  body: { fontSize: 16, lineHeight: 24, color: colors.ink },
  meta: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md },
  metaText: { fontSize: 14, color: colors.soil, fontWeight: '600' },
  actions: { gap: spacing.sm + 2, marginTop: spacing.sm },
});
