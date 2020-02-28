/*
 *
 * LoginPage actions
 *
 */

import { GO_PROSPECT, BROADCAST } from './constants';

export function goProspectAction() {
  return {
    type: GO_PROSPECT,
  };
}

export function broadcastAction(message, method) {
  return {
    type: BROADCAST,
    payload: {
      message,
      method,
    },
  };
}
