import * as React from 'react';

import { PurchaseReminderViewProps } from './PurchaseReminder.types';

export default function PurchaseReminderView(props: PurchaseReminderViewProps) {
  return (
    <div>
      <iframe
        style={{ flex: 1 }}
        src={props.url}
        onLoad={() => props.onLoad({ nativeEvent: { url: props.url } })}
      />
    </div>
  );
}
