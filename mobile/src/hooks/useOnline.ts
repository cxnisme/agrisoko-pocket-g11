import { useEffect, useState } from 'react';
import NetInfo from '@react-native-community/netinfo';

// UI-side connectivity flag. The offline engineer may replace/extend this.
export function useOnline(): boolean {
  const [online, setOnline] = useState(true);
  useEffect(() => {
    const unsub = NetInfo.addEventListener((s) => setOnline(s.isConnected !== false));
    return unsub;
  }, []);
  return online;
}
