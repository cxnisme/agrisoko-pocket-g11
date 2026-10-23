import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import type { ScreenProps } from '../navigation/types';
import Button from '../components/Button';
import LoadingView from '../components/LoadingView';
import MemberCard from '../components/MemberCard';
import StatusBanner from '../components/StatusBanner';
import { DirectoryOutcome, getDirectory } from '../services/dataService';
import SourceBadge from '../components/SourceBadge';
import { colors, spacing } from '../theme';

export default function DirectoryScreen({ navigation }: ScreenProps<'Directory'>) {
  const [directory, setDirectory] = useState<DirectoryOutcome | null>(null);
  const [failed, setFailed] = useState(false);

  const load = useCallback(async () => {
    setFailed(false);
    try { setDirectory(await getDirectory()); } catch { setFailed(true); }
  }, []);

  useEffect(() => { load(); }, [load]);

  if (failed) {
    return (
      <View style={styles.center}>
        <StatusBanner kind="error" message="The team directory could not be loaded." />
        <Button label="Retry" onPress={load} />
      </View>
    );
  }
  if (!directory) return <LoadingView message="Loading team..." />;

  return (
    <FlatList
      style={styles.screen}
      contentContainerStyle={styles.list}
      data={directory.members}
      keyExtractor={(m) => m.id}
      ListHeaderComponent={(
        <View style={styles.header}>
          <Text style={styles.hint}>Choose a member to open their profile.</Text>
          <SourceBadge source={directory.source} />
        </View>
      )}
      ItemSeparatorComponent={() => <View style={{ height: spacing.sm + 2 }} />}
      renderItem={({ item }) => (
        <MemberCard member={item} onPress={(id) => navigation.navigate('Profile', { memberId: id })} />
      )}
    />
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  list: { padding: spacing.lg },
  hint: { fontSize: 15, color: colors.muted, marginBottom: spacing.md },
  header: { gap: spacing.sm, marginBottom: spacing.md },
  center: { flex: 1, padding: spacing.lg, gap: spacing.md, justifyContent: 'center', backgroundColor: colors.bg },
});
