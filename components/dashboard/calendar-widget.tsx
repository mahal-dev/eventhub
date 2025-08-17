"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin } from "lucide-react"

export function CalendarWidget() {
  const events = [
    {
      id: 1,
      title: "Tech Conference 2024",
      date: "2024-03-15",
      time: "09:00 AM",
      location: "Convention Center",
      status: "confirmed",
      attendees: 150,
    },
    {
      id: 2,
      title: "Product Launch Event",
      date: "2024-03-18",
      time: "02:00 PM",
      location: "Main Auditorium",
      status: "draft",
      attendees: 75,
    },
    {
      id: 3,
      title: "Networking Mixer",
      date: "2024-03-22",
      time: "06:00 PM",
      location: "Rooftop Venue",
      status: "confirmed",
      attendees: 200,
    },
    {
      id: 4,
      title: "Workshop: Digital Marketing",
      date: "2024-03-25",
      time: "10:00 AM",
      location: "Training Room A",
      status: "confirmed",
      attendees: 30,
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Upcoming Events
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {events.map((event) => (
            <div
              key={event.id}
              className="flex items-start space-x-4 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors"
            >
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{event.title}</h4>
                  <Badge variant={event.status === "confirmed" ? "default" : "secondary"}>{event.status}</Badge>
                </div>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-3 w-3" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-3 w-3" />
                    <span>{event.location}</span>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">{event.attendees} attendees registered</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
