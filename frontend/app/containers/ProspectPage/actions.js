/*
 *
 * LoginPage actions
 *
 */

import { GO_SEND_BROADCAST, GO_IMPORT_CSV } from './constants';

export function goSendBroadcastAction() {
  return {
    type: GO_SEND_BROADCAST,
  };
}

export function goImportCSVAction() {
  return {
    type: GO_IMPORT_CSV,
  };
}
