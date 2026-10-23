import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

export type RootTabParamList = {
  Home: undefined;
  Ask: undefined;
  Result: { query: string };
  Directory: undefined;
  Profile: { memberId: string };
  About: undefined;
};

export type ScreenProps<T extends keyof RootTabParamList> =
  BottomTabScreenProps<RootTabParamList, T>;
