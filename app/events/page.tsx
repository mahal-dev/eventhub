import { PublicEventsList } from "@/components/public/public-events-list"
import { PublicLayout } from "@/components/layout/public-layout"

export default function PublicEventsPage() {
  return (
    <PublicLayout>
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-work-sans font-bold text-foreground">Upcoming Events</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover amazing events happening near you. Join thousands of attendees for unforgettable experiences.
          </p>
        </div>
        <PublicEventsList />
      </div>
    </PublicLayout>
  )
}
