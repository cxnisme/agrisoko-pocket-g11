import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { Source } from '../types';

export type RootStackParamList = {
  Home: undefined;
  Ask: undefined;
  Result: { query: string };
  Directory: undefined;
  Profile: { memberId: string; source?: Source };
  About: undefined;
};

export type ScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;
