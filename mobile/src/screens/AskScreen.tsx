import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput } from 'react-native';
import type { ScreenProps } from '../navigation/types';
import Button from '../components/Button';
import { MAX_QUERY_LENGTH } from '../config';
import { colors, radius, spacing } from '../theme';

const EXAMPLES = ['Who built offline mode?', 'Tell me about the AI engineer', 'Who made the profile screen?'];

export default function AskScreen({ navigation }: ScreenProps<'Ask'>) {
  const [text, setText] = useState('');
  const [error, setError] = useState<string | null>(null);

  const submit = (value: string = text) => {
    const q = value.trim();
    if (!q) { setError('Type a question first, for example "Tell me about Aline".'); return; }
    if (q.length > MAX_QUERY_LENGTH) { setError(`Keep your question under ${MAX_QUERY_LENGTH} characters.`); return; }
    setError(null);
    navigation.navigate('Result', { query: q });
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView style={styles.screen} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Text style={styles.label} nativeID="askLabel">Your question</Text>
        <TextInput
          value={text}
          onChangeText={(t) => { setText(t); if (error) setError(null); }}
          placeholder="Who built offline mode?"
          placeholderTextColor={colors.muted}
          accessibilityLabel="Question about a team member"
          accessibilityHint="Ask by name, nickname, role, skill or feature"
          multiline
          style={[styles.input, !!error && { borderColor: colors.danger }]}
          returnKeyType="send"
          blurOnSubmit
          onSubmitEditing={() => submit()}
        />
        <Text style={styles.counter} accessibilityLabel={`${text.length} of ${MAX_QUERY_LENGTH} characters used`}>
          {text.length}/{MAX_QUERY_LENGTH}
        </Text>
        {!!error && <Text style={styles.error} accessibilityRole="alert">{error}</Text>}

        <Button label="Find member" onPress={() => submit()} />

        <Text style={styles.sub}>Try one of these</Text>
        {EXAMPLES.map((ex) => (
          <Button key={ex} label={ex} variant="secondary" onPress={() => submit(ex)} />
        ))}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  content: { padding: spacing.lg, gap: spacing.sm + 2 },
  label: { fontSize: 16, fontWeight: '700', color: colors.ink },
  input: { minHeight: 96, textAlignVertical: 'top', fontSize: 17, color: colors.ink, backgroundColor: colors.surface, borderWidth: 2, borderColor: colors.line, borderRadius: radius.md, padding: spacing.md },
  counter: { alignSelf: 'flex-end', fontSize: 13, color: colors.muted },
  error: { color: colors.danger, fontSize: 15, fontWeight: '600' },
  sub: { fontSize: 16, fontWeight: '700', color: colors.soil, marginTop: spacing.md },
});
