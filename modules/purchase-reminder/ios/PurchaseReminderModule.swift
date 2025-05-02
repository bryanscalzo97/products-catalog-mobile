import EventKit // Import the EventKit framework from Apple to interact with the calendar
import ExpoModulesCore // Import the ExpoModulesCore framework from Expo to create the module

public class PurchaseReminderModule: Module {
  // Define the module
  public func definition() -> ModuleDefinition {
  // Name the module
  Name("PurchaseReminder")

  // Create a reminder
  AsyncFunction("createReminder") { (timestamp: Double) async throws -> String in
  // Create an event store
  let eventStore = EKEventStore()

  // Request access to the calendar
  return try await withCheckedThrowingContinuation { continuation in
    eventStore.requestAccess(to: .event) { (granted, error) in
      if let error = error {
        continuation.resume(throwing: error)
        return
      }

      // If access is granted, create the event 
      if granted {
        let event = EKEvent(eventStore: eventStore)
        event.title = "Purchase Reminder"

        let startDate = Date(timeIntervalSince1970: timestamp / 1000) // JS timestamp in ms ➔ Swift seconds
        event.startDate = startDate
        event.endDate = startDate.addingTimeInterval(60 * 60)
        event.calendar = eventStore.defaultCalendarForNewEvents

        // Set the alarm to 15 minutes before the event starts
        let alarm = EKAlarm(relativeOffset: -15 * 60) 
        event.addAlarm(alarm)

        // Save the event
        do {
          try eventStore.save(event, span: .thisEvent)
          continuation.resume(returning: event.eventIdentifier)
        } catch {
          continuation.resume(throwing: error)
          }
        } else {
          continuation.resume(throwing: NSError(domain: "PurchaseReminder", code: 1, userInfo: [NSLocalizedDescriptionKey: "Access to calendar denied"]))
        }
      }
  }
}

  }
}
