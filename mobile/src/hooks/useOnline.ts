import { useEffect, useState } from 'react';
import NetInfo, { NetInfoState } from '@react-native-community/netinfo';

export function useOnline(): boolean {
  const [online, setOnline] = useState(true);
  useEffect(() => {
    const unsub = NetInfo.addEventListener((state: NetInfoState) => {
      setOnline(state.isConnected !== false);
    });
    return unsub;
  }, []);
  return online;
}
