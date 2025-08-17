import { EventsList } from "@/components/events/events-list"
import { DashboardLayout } from "@/components/layout/dashboard-layout"

export default function EventsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-work-sans font-bold text-foreground">Events</h1>
          <p className="text-muted-foreground">Manage all your events in one place.</p>
        </div>
        <EventsList />
      </div>
    </DashboardLayout>
  )
}
