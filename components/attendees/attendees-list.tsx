"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, Mail, Download, MoreHorizontal, CheckCircle, XCircle, Users } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { BulkMessageDialog } from "./bulk-message-dialog"

interface Attendee {
  id: string
  name: string
  email: string
  ticketType: string
  eventName: string
  registrationDate: string
  checkInStatus: "checked-in" | "not-checked-in"
  checkInTime?: string
}

export function AttendeesList() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedEvent, setSelectedEvent] = useState("all")
  const [selectedAttendees, setSelectedAttendees] = useState<string[]>([])
  const [showBulkMessage, setShowBulkMessage] = useState(false)
  const [attendees, setAttendees] = useState<Attendee[]>([
    {
      id: "1",
      name: "Sarah Johnson",
      email: "sarah.johnson@email.com",
      ticketType: "VIP",
      eventName: "Tech Conference 2024",
      registrationDate: "2024-02-15",
      checkInStatus: "checked-in",
      checkInTime: "2024-03-15 09:15 AM",
    },
    {
      id: "2",
      name: "Mike Chen",
      email: "mike.chen@email.com",
      ticketType: "General Admission",
      eventName: "Tech Conference 2024",
      registrationDate: "2024-02-20",
      checkInStatus: "not-checked-in",
    },
    {
      id: "3",
      name: "Emily Davis",
      email: "emily.davis@email.com",
      ticketType: "Student",
      eventName: "Product Launch Event",
      registrationDate: "2024-02-25",
      checkInStatus: "checked-in",
      checkInTime: "2024-03-18 02:30 PM",
    },
    {
      id: "4",
      name: "John Smith",
      email: "john.smith@email.com",
      ticketType: "General Admission",
      eventName: "Networking Mixer",
      registrationDate: "2024-03-01",
      checkInStatus: "not-checked-in",
    },
    {
      id: "5",
      name: "Lisa Wang",
      email: "lisa.wang@email.com",
      ticketType: "VIP",
      eventName: "Tech Conference 2024",
      registrationDate: "2024-02-10",
      checkInStatus: "checked-in",
      checkInTime: "2024-03-15 08:45 AM",
    },
  ])

  const events = ["Tech Conference 2024", "Product Launch Event", "Networking Mixer", "Workshop: Digital Marketing"]

  const filteredAttendees = attendees.filter((attendee) => {
    const matchesSearch =
      attendee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      attendee.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesEvent = selectedEvent === "all" || attendee.eventName === selectedEvent
    return matchesSearch && matchesEvent
  })

  const handleCheckIn = (attendeeId: string) => {
    setAttendees((prev) =>
      prev.map((attendee) =>
        attendee.id === attendeeId
          ? {
              ...attendee,
              checkInStatus: "checked-in" as const,
              checkInTime: new Date().toLocaleString(),
            }
          : attendee,
      ),
    )
    toast({
      title: "Check-in successful",
      description: "Attendee has been checked in.",
    })
  }

  const handleCheckOut = (attendeeId: string) => {
    setAttendees((prev) =>
      prev.map((attendee) =>
        attendee.id === attendeeId
          ? {
              ...attendee,
              checkInStatus: "not-checked-in" as const,
              checkInTime: undefined,
            }
          : attendee,
      ),
    )
    toast({
      title: "Check-out successful",
      description: "Attendee has been checked out.",
    })
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedAttendees(filteredAttendees.map((attendee) => attendee.id))
    } else {
      setSelectedAttendees([])
    }
  }

  const handleSelectAttendee = (attendeeId: string, checked: boolean) => {
    if (checked) {
      setSelectedAttendees((prev) => [...prev, attendeeId])
    } else {
      setSelectedAttendees((prev) => prev.filter((id) => id !== attendeeId))
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "checked-in":
        return (
          <Badge className="bg-primary text-primary-foreground">
            <CheckCircle className="w-3 h-3 mr-1" />
            Checked In
          </Badge>
        )
      case "not-checked-in":
        return (
          <Badge variant="secondary">
            <XCircle className="w-3 h-3 mr-1" />
            Not Checked In
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getTicketTypeBadge = (ticketType: string) => {
    switch (ticketType) {
      case "VIP":
        return <Badge className="bg-accent text-accent-foreground">VIP</Badge>
      case "Student":
        return <Badge variant="outline">Student</Badge>
      default:
        return <Badge variant="secondary">{ticketType}</Badge>
    }
  }

  const exportAttendees = () => {
    toast({
      title: "Export started",
      description: "Attendee list is being exported to CSV.",
    })
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4">
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              All Attendees ({filteredAttendees.length})
            </CardTitle>
            <div className="flex flex-col gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search attendees..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full"
                />
              </div>
              <Select value={selectedEvent} onValueChange={setSelectedEvent}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Filter by event" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Events</SelectItem>
                  {events.map((event) => (
                    <SelectItem key={event} value={event}>
                      {event}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Bulk Actions */}
          {selectedAttendees.length > 0 && (
            <div className="mb-4 p-3 bg-muted rounded-lg">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <span className="text-sm font-medium">{selectedAttendees.length} attendees selected</span>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowBulkMessage(true)}
                    className="w-full sm:w-auto"
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={exportAttendees}
                    className="w-full sm:w-auto bg-transparent"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
            </div>
          )}

          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">
                    <Checkbox
                      checked={filteredAttendees.length > 0 && selectedAttendees.length === filteredAttendees.length}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead className="min-w-[120px]">Name</TableHead>
                  <TableHead className="min-w-[180px]">Email</TableHead>
                  <TableHead className="min-w-[150px]">Event</TableHead>
                  <TableHead className="min-w-[100px]">Ticket Type</TableHead>
                  <TableHead className="min-w-[120px]">Status</TableHead>
                  <TableHead className="min-w-[140px]">Check-in Time</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAttendees.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8">
                      <div className="flex flex-col items-center gap-2">
                        <Users className="h-8 w-8 text-muted-foreground" />
                        <p className="text-muted-foreground">No attendees found</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredAttendees.map((attendee) => (
                    <TableRow key={attendee.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedAttendees.includes(attendee.id)}
                          onCheckedChange={(checked) => handleSelectAttendee(attendee.id, checked as boolean)}
                        />
                      </TableCell>
                      <TableCell className="font-medium">{attendee.name}</TableCell>
                      <TableCell className="break-all">{attendee.email}</TableCell>
                      <TableCell>{attendee.eventName}</TableCell>
                      <TableCell>{getTicketTypeBadge(attendee.ticketType)}</TableCell>
                      <TableCell>{getStatusBadge(attendee.checkInStatus)}</TableCell>
                      <TableCell className="whitespace-nowrap">{attendee.checkInTime || "-"}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0 min-h-[44px] min-w-[44px]">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            {attendee.checkInStatus === "not-checked-in" ? (
                              <DropdownMenuItem onClick={() => handleCheckIn(attendee.id)} className="min-h-[44px]">
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Check In
                              </DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem onClick={() => handleCheckOut(attendee.id)} className="min-h-[44px]">
                                <XCircle className="mr-2 h-4 w-4" />
                                Check Out
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem className="min-h-[44px]">
                              <Mail className="mr-2 h-4 w-4" />
                              Send Message
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <BulkMessageDialog
        open={showBulkMessage}
        onOpenChange={setShowBulkMessage}
        selectedCount={selectedAttendees.length}
        onSend={() => {
          toast({
            title: "Messages sent",
            description: `Message sent to ${selectedAttendees.length} attendees.`,
          })
          setShowBulkMessage(false)
          setSelectedAttendees([])
        }}
      />
    </>
  )
}
