"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar, MapPin, Users, Search } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export function PublicEventsList() {
  const [searchTerm, setSearchTerm] = useState("")

  const events = [
    {
      id: "1",
      name: "Tech Conference 2024",
      description: "Join industry leaders for the biggest tech conference of the year.",
      date: "2024-03-15",
      time: "09:00 AM",
      location: "Convention Center, Downtown",
      attendees: 150,
      price: "$75",
      category: "Technology",
      image: "/tech-conference.png",
    },
    {
      id: "2",
      name: "Product Launch Event",
      description: "Be the first to see our revolutionary new product in action.",
      date: "2024-03-18",
      time: "02:00 PM",
      location: "Main Auditorium",
      attendees: 75,
      price: "Free",
      category: "Business",
      image: "/product-launch-excitement.png",
    },
    {
      id: "3",
      name: "Networking Mixer",
      description: "Connect with professionals from various industries in a relaxed setting.",
      date: "2024-03-22",
      time: "06:00 PM",
      location: "Rooftop Venue",
      attendees: 200,
      price: "$25",
      category: "Networking",
      image: "/networking-event.png",
    },
    {
      id: "4",
      name: "Workshop: Digital Marketing",
      description: "Learn the latest digital marketing strategies from industry experts.",
      date: "2024-03-25",
      time: "10:00 AM",
      location: "Training Room A",
      attendees: 30,
      price: "$150",
      category: "Education",
      image: "/digital-marketing-workshop.png",
    },
  ]

  const filteredEvents = events.filter(
    (event) =>
      event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="relative max-w-md mx-auto">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search events..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event) => (
          <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative h-48">
              <Image src={event.image || "/placeholder.svg"} alt={event.name} fill className="object-cover" />
              <div className="absolute top-4 left-4">
                <Badge>{event.category}</Badge>
              </div>
              <div className="absolute top-4 right-4">
                <Badge variant="secondary" className="bg-background/90 text-foreground">
                  {event.price}
                </Badge>
              </div>
            </div>
            <CardHeader className="pb-3">
              <h3 className="font-work-sans font-semibold text-lg line-clamp-1">{event.name}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2">{event.description}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {event.date} at {event.time}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>{event.attendees} attending</span>
                </div>
              </div>
              <Button asChild className="w-full">
                <Link href={`/events/${event.id}`}>View Details</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No events found</h3>
          <p className="text-muted-foreground">Try adjusting your search terms.</p>
        </div>
      )}
    </div>
  )
}
