import { Plugins } from '@capacitor/core';

const { Network } = Plugins;

export const checkNetworkStatus = async () => {
  const status = await Network.getStatus();
  return status.connected;
};