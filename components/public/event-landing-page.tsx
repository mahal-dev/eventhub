"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Users, Clock, Share2, Heart } from "lucide-react"
import Image from "next/image"
import { RegistrationModal } from "./registration-modal"
import { CountdownTimer } from "./countdown-timer"

interface EventLandingPageProps {
  eventId: string
}

export function EventLandingPage({ eventId }: EventLandingPageProps) {
  const [showRegistration, setShowRegistration] = useState(false)
  const [isLiked, setIsLiked] = useState(false)

  // Mock event data - in real app, fetch based on eventId
  const event = {
    id: eventId,
    name: "Tech Conference 2024",
    description:
      "Join industry leaders, innovators, and tech enthusiasts for the biggest technology conference of the year. Discover the latest trends, network with professionals, and gain insights that will shape the future of technology.",
    longDescription:
      "This comprehensive conference features keynote speakers from major tech companies, hands-on workshops, networking sessions, and exhibitions from leading technology vendors. Whether you're a developer, entrepreneur, or tech enthusiast, this event offers valuable insights and connections.",
    date: "2024-03-15",
    time: "09:00 AM",
    endTime: "06:00 PM",
    location: "Convention Center, Downtown",
    address: "123 Convention Ave, Downtown City, DC 12345",
    attendees: 150,
    maxAttendees: 500,
    category: "Technology",
    organizer: "Tech Events Inc.",
    image: "/tech-conference-banner.png",
    ticketTypes: [
      { id: "1", name: "Early Bird", price: 75, originalPrice: 100, available: 50 },
      { id: "2", name: "General Admission", price: 100, available: 200 },
      {
        id: "3",
        name: "VIP Pass",
        price: 250,
        available: 25,
        features: ["Front row seating", "Meet & greet", "Lunch included"],
      },
    ],
    schedule: [
      { time: "09:00 AM", title: "Registration & Welcome Coffee", speaker: "" },
      { time: "10:00 AM", title: "Opening Keynote: The Future of AI", speaker: "Dr. Sarah Johnson" },
      { time: "11:30 AM", title: "Panel: Emerging Technologies", speaker: "Industry Leaders" },
      { time: "01:00 PM", title: "Lunch Break", speaker: "" },
      { time: "02:30 PM", title: "Workshop: Building Scalable Apps", speaker: "Mike Chen" },
      { time: "04:00 PM", title: "Networking Session", speaker: "" },
      { time: "05:00 PM", title: "Closing Remarks", speaker: "Event Organizers" },
    ],
    speakers: [
      {
        name: "Dr. Sarah Johnson",
        title: "Chief AI Officer, TechCorp",
        bio: "Leading AI researcher with 15+ years of experience",
        image: "/professional-woman-speaker.png",
      },
      {
        name: "Mike Chen",
        title: "Senior Developer, StartupXYZ",
        bio: "Full-stack developer and tech educator",
        image: "/professional-man-speaker.png",
      },
    ],
  }

  const eventDate = new Date(`${event.date}T${event.time}`)
  const isUpcoming = eventDate > new Date()

  return (
    <div className="space-y-6 lg:space-y-8">
      {/* Hero Section */}
      <div className="relative">
        <div className="relative h-64 sm:h-80 lg:h-96 rounded-lg overflow-hidden">
          <Image src={event.image || "/placeholder.svg"} alt={event.name} fill className="object-cover" />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 flex items-end">
            <div className="p-4 sm:p-6 lg:p-8 text-white w-full">
              <div className="flex flex-wrap items-center gap-2 mb-3 lg:mb-4">
                <Badge className="bg-primary text-primary-foreground">{event.category}</Badge>
                {isUpcoming && <Badge variant="secondary">Upcoming</Badge>}
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-work-sans font-bold mb-3 lg:mb-4">{event.name}</h1>
              <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3 sm:gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 flex-shrink-0" />
                  <span>
                    {event.date} at {event.time}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 flex-shrink-0" />
                  <span className="truncate">{event.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 flex-shrink-0" />
                  <span>
                    {event.attendees}/{event.maxAttendees} registered
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6 lg:space-y-8">
          {/* Countdown Timer */}
          {isUpcoming && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <Clock className="h-5 w-5" />
                  Event Starts In
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CountdownTimer targetDate={eventDate} />
              </CardContent>
            </Card>
          )}

          {/* Description */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">About This Event</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">{event.description}</p>
              <p className="text-muted-foreground leading-relaxed">{event.longDescription}</p>
            </CardContent>
          </Card>

          {/* Schedule */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">Event Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {event.schedule.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col sm:flex-row gap-3 sm:gap-4 pb-4 border-b border-border last:border-0"
                  >
                    <div className="text-sm font-medium text-primary min-w-20 flex-shrink-0">{item.time}</div>
                    <div className="flex-1">
                      <h4 className="font-medium">{item.title}</h4>
                      {item.speaker && <p className="text-sm text-muted-foreground mt-1">{item.speaker}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Speakers */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">Featured Speakers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-6">
                {event.speakers.map((speaker, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                      <Image
                        src={speaker.image || "/placeholder.svg"}
                        alt={speaker.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-semibold">{speaker.name}</h4>
                      <p className="text-sm text-primary">{speaker.title}</p>
                      <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{speaker.bio}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Location */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <MapPin className="h-5 w-5" />
                Location
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <h4 className="font-medium">{event.location}</h4>
                <p className="text-muted-foreground break-words">{event.address}</p>
                <div className="h-48 bg-muted rounded-lg flex items-center justify-center">
                  <p className="text-muted-foreground text-center px-4">Interactive map would be here</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Registration Card */}
          <Card className="lg:sticky lg:top-4">
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">Register Now</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {event.ticketTypes.map((ticket) => (
                  <div key={ticket.id} className="p-3 border border-border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div className="min-w-0 flex-1 mr-3">
                        <h4 className="font-medium">{ticket.name}</h4>
                        {ticket.features && (
                          <ul className="text-xs text-muted-foreground mt-1">
                            {ticket.features.map((feature, idx) => (
                              <li key={idx}>• {feature}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                      <div className="text-right flex-shrink-0">
                        {ticket.originalPrice && (
                          <p className="text-xs text-muted-foreground line-through">${ticket.originalPrice}</p>
                        )}
                        <p className="font-semibold">${ticket.price}</p>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">{ticket.available} tickets available</p>
                  </div>
                ))}
              </div>
              <Button className="w-full min-h-[44px]" onClick={() => setShowRegistration(true)}>
                Register for Event
              </Button>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-transparent min-h-[44px]"
                  onClick={() => setIsLiked(!isLiked)}
                >
                  <Heart className={`h-4 w-4 mr-2 ${isLiked ? "fill-current text-red-500" : ""}`} />
                  <span className="hidden sm:inline">{isLiked ? "Saved" : "Save"}</span>
                  <span className="sm:hidden">{isLiked ? "♥" : "♡"}</span>
                </Button>
                <Button variant="outline" size="sm" className="bg-transparent min-h-[44px]">
                  <Share2 className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Share</span>
                  <span className="sm:hidden">↗</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Event Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">Event Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between items-start">
                <span className="text-muted-foreground">Organizer</span>
                <span className="text-right break-words max-w-[60%]">{event.organizer}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Category</span>
                <span>{event.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Duration</span>
                <span className="text-right">
                  {event.time} - {event.endTime}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Registered</span>
                <span>
                  {event.attendees}/{event.maxAttendees}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <RegistrationModal open={showRegistration} onOpenChange={setShowRegistration} event={event} />
    </div>
  )
}
