import { requireNativeView } from 'expo';
import * as React from 'react';

import { PurchaseReminderViewProps } from './PurchaseReminder.types';

const NativeView: React.ComponentType<PurchaseReminderViewProps> =
  requireNativeView('PurchaseReminder');

export default function PurchaseReminderView(props: PurchaseReminderViewProps) {
  return <NativeView {...props} />;
}
