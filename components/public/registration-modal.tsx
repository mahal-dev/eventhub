"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"

interface RegistrationModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  event: any
}

export function RegistrationModal({ open, onOpenChange, event }: RegistrationModalProps) {
  const { toast } = useToast()
  const [selectedTicket, setSelectedTicket] = useState("")
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate registration
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: "Registration successful!",
      description: "You've been registered for the event. Check your email for confirmation.",
    })

    setIsLoading(false)
    onOpenChange(false)

    // Reset form
    setFormData({ firstName: "", lastName: "", email: "", phone: "" })
    setSelectedTicket("")
  }

  const selectedTicketData = event.ticketTypes.find((t: any) => t.id === selectedTicket)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto mx-4">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl">Register for {event.name}</DialogTitle>
          <DialogDescription>Fill in your details to complete registration.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Ticket Selection */}
          <div className="space-y-3">
            <Label className="text-base font-medium">Select Ticket Type</Label>
            <RadioGroup value={selectedTicket} onValueChange={setSelectedTicket}>
              {event.ticketTypes.map((ticket: any) => (
                <div key={ticket.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                  <RadioGroupItem value={ticket.id} id={ticket.id} className="mt-1" />
                  <div className="flex-1 flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                    <div className="min-w-0 flex-1">
                      <Label htmlFor={ticket.id} className="font-medium cursor-pointer text-base">
                        {ticket.name}
                      </Label>
                      {ticket.features && (
                        <ul className="text-sm text-muted-foreground mt-1">
                          {ticket.features.map((feature: string, idx: number) => (
                            <li key={idx}>• {feature}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                    <div className="text-left sm:text-right flex-shrink-0">
                      {ticket.originalPrice && (
                        <p className="text-sm text-muted-foreground line-through">${ticket.originalPrice}</p>
                      )}
                      <p className="font-semibold text-lg">${ticket.price}</p>
                      <Badge variant="outline" className="text-xs mt-1">
                        {ticket.available} left
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Personal Information */}
          <div className="space-y-4">
            <Label className="text-base font-medium">Personal Information</Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-sm font-medium">
                  First Name
                </Label>
                <Input
                  id="firstName"
                  placeholder="John"
                  value={formData.firstName}
                  onChange={(e) => setFormData((prev) => ({ ...prev, firstName: e.target.value }))}
                  className="min-h-[44px]"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-sm font-medium">
                  Last Name
                </Label>
                <Input
                  id="lastName"
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={(e) => setFormData((prev) => ({ ...prev, lastName: e.target.value }))}
                  className="min-h-[44px]"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="john.doe@email.com"
                value={formData.email}
                onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                className="min-h-[44px]"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-medium">
                Phone Number
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+1 (555) 123-4567"
                value={formData.phone}
                onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                className="min-h-[44px]"
                required
              />
            </div>
          </div>

          {/* Order Summary */}
          {selectedTicketData && (
            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-medium mb-3 text-base">Order Summary</h4>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm">{selectedTicketData.name}</span>
                <span className="font-semibold text-base">${selectedTicketData.price}</span>
              </div>
              <div className="border-t border-border mt-3 pt-3 flex justify-between items-center font-semibold text-base">
                <span>Total</span>
                <span>${selectedTicketData.price}</span>
              </div>
            </div>
          )}

          <DialogFooter className="flex flex-col sm:flex-row gap-3 sm:gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="w-full sm:w-auto min-h-[44px]"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={!selectedTicket || isLoading} className="w-full sm:w-auto min-h-[44px]">
              {isLoading ? "Processing..." : `Register - $${selectedTicketData?.price || 0}`}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
