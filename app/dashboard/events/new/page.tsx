import { EventForm } from "@/components/events/event-form"
import { DashboardLayout } from "@/components/layout/dashboard-layout"

export default function NewEventPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-work-sans font-bold text-foreground">Create New Event</h1>
          <p className="text-muted-foreground">Fill in the details to create your event.</p>
        </div>
        <EventForm />
      </div>
    </DashboardLayout>
  )
}
