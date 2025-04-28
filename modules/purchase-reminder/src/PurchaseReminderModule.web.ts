import { registerWebModule, NativeModule } from 'expo';

import { ChangeEventPayload } from './PurchaseReminder.types';

type PurchaseReminderModuleEvents = {
  onChange: (params: ChangeEventPayload) => void;
}

class PurchaseReminderModule extends NativeModule<PurchaseReminderModuleEvents> {
  PI = Math.PI;
  async setValueAsync(value: string): Promise<void> {
    this.emit('onChange', { value });
  }
  hello() {
    return 'Hello world! 👋';
  }
};

export default registerWebModule(PurchaseReminderModule);
