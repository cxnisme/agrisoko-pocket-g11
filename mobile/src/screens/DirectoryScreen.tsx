import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import type { ScreenProps } from '../navigation/types';
import Button from '../components/Button';
import LoadingView from '../components/LoadingView';
import MemberCard from '../components/MemberCard';
import StatusBanner from '../components/StatusBanner';
import { getDirectory } from '../services/dataService';
import type { MemberSummary } from '../types';
import { colors, spacing } from '../theme';

export default function DirectoryScreen({ navigation }: ScreenProps<'Directory'>) {
  const [members, setMembers] = useState<MemberSummary[] | null>(null);
  const [failed, setFailed] = useState(false);

  const load = useCallback(async () => {
    setFailed(false);
    try { setMembers(await getDirectory()); } catch { setFailed(true); }
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
  if (!members) return <LoadingView message="Loading team..." />;

  return (
    <FlatList
      style={styles.screen}
      contentContainerStyle={styles.list}
      data={members}
      keyExtractor={(m) => m.id}
      ListHeaderComponent={<Text style={styles.hint}>Choose a member to open their profile.</Text>}
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
  center: { flex: 1, padding: spacing.lg, gap: spacing.md, justifyContent: 'center', backgroundColor: colors.bg },
});
