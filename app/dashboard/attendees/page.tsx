import { AttendeesList } from "@/components/attendees/attendees-list"
import { DashboardLayout } from "@/components/layout/dashboard-layout"

export default function AttendeesPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-work-sans font-bold text-foreground">Attendees</h1>
          <p className="text-muted-foreground">Manage event attendees and check-ins.</p>
        </div>
        <AttendeesList />
      </div>
    </DashboardLayout>
  )
}
