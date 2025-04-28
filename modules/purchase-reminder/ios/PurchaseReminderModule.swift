import EventKit
import ExpoModulesCore

public class PurchaseReminderModule: Module {
  public func definition() -> ModuleDefinition {
    Name("PurchaseReminder")

    Constants([
      "PI": Double.pi
    ])

    Events("onChange")

    Function("hello") {
      return "Hello world!"
    }

    AsyncFunction("setValueAsync") { (value: String) in
      self.sendEvent("onChange", [
        "value": value
      ])
    }

    // Create a reminder
  AsyncFunction("createReminder") { (timestamp: Double) async throws -> String in
  let eventStore = EKEventStore()

  return try await withCheckedThrowingContinuation { continuation in
    eventStore.requestAccess(to: .event) { (granted, error) in
      if let error = error {
        continuation.resume(throwing: error)
        return
      }

      if granted {
        let event = EKEvent(eventStore: eventStore)
        event.title = "Purchase Reminder"

        let startDate = Date(timeIntervalSince1970: timestamp / 1000) // JS timestamp in ms ➔ Swift seconds
        event.startDate = startDate
        event.endDate = startDate.addingTimeInterval(60 * 60)
        event.calendar = eventStore.defaultCalendarForNewEvents

        do {
          try eventStore.save(event, span: .thisEvent)
          continuation.resume(returning: event.eventIdentifier)
        } catch {
          continuation.resume(throwing: error)
        }
      } else {
        continuation.resume(throwing: NSError(domain: "PurchaseReminder", code: 1, userInfo: [NSLocalizedDescriptionKey: "Acceso al calendario denegado"]))
      }
    }
  }
}




    View(PurchaseReminderView.self) {
      Prop("url") { (view: PurchaseReminderView, url: URL) in
        if view.webView.url != url {
          view.webView.load(URLRequest(url: url))
        }
      }

      Events("onLoad")
    }
  }
}
