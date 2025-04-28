import { NativeModule, requireNativeModule } from 'expo';

import { PurchaseReminderModuleEvents } from './PurchaseReminder.types';

declare class PurchaseReminderModule extends NativeModule<PurchaseReminderModuleEvents> {
  PI: number;
  hello(): string;
  setValueAsync(value: string): Promise<void>;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<PurchaseReminderModule>('PurchaseReminder');
