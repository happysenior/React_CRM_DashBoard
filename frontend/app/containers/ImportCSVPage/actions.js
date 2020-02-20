/*
 *
 * LoginPage actions
 *
 */

import { GO_SEND_BROADCAST } from './constants';

export function goSendBroadcastAction() {
  return {
    type: GO_SEND_BROADCAST,
  };
}
