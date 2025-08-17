import { EventLandingPage } from "@/components/public/event-landing-page"
import { PublicLayout } from "@/components/layout/public-layout"

interface EventPageProps {
  params: {
    id: string
  }
}

export default function EventPage({ params }: EventPageProps) {
  return (
    <PublicLayout>
      <EventLandingPage eventId={params.id} />
    </PublicLayout>
  )
}
