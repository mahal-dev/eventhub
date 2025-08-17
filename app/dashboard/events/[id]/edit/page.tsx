import { EventForm } from "@/components/events/event-form"
import { DashboardLayout } from "@/components/layout/dashboard-layout"

interface EditEventPageProps {
  params: {
    id: string
  }
}

export default function EditEventPage({ params }: EditEventPageProps) {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-work-sans font-bold text-foreground">Edit Event</h1>
          <p className="text-muted-foreground">Update your event details.</p>
        </div>
        <EventForm eventId={params.id} />
      </div>
    </DashboardLayout>
  )
}
