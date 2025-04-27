// Reexport the native module. On web, it will be resolved to PurchaseReminderModule.web.ts
// and on native platforms to PurchaseReminderModule.ts
export { default } from './src/PurchaseReminderModule';
export { default as PurchaseReminderView } from './src/PurchaseReminderView';
export * from  './src/PurchaseReminder.types';
