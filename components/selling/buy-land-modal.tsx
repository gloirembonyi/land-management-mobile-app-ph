"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { QrCode, Search, MapPin, Square, DollarSign, User, ShoppingCart } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface BuyLandModalProps {
  isOpen: boolean
  onClose: () => void
  userId: string
}

export function BuyLandModal({ isOpen, onClose, userId }: BuyLandModalProps) {
  const [saleCode, setSaleCode] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [saleData, setSaleData] = useState<any>(null)
  const [message, setMessage] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const { toast } = useToast()

  const handleSearchSale = async () => {
    if (!saleCode.trim()) return

    setIsSearching(true)
    try {
      const response = await fetch(`/api/land-sales/search?code=${saleCode}`)
      if (response.ok) {
        const sale = await response.json()
        setSaleData(sale)
        // Record QR scan interaction
        await fetch("/api/sale-interactions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sale_id: sale.id,
            buyer_id: userId,
            interaction_type: "qr_scan",
          }),
        })
      } else {
        toast({
          title: "Sale Not Found",
          description: "Invalid sale code or QR code. Please check and try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to search for sale. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSearching(false)
    }
  }

  const handleExpressInterest = async () => {
    if (!saleData) return

    setIsProcessing(true)
    try {
      // Record interest
      await fetch("/api/sale-interactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sale_id: saleData.id,
          buyer_id: userId,
          interaction_type: "interest",
          message: message,
        }),
      })

      // Update sale status to pending
      await fetch(`/api/land-sales/${saleData.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: "pending_payment",
          buyer_id: userId,
        }),
      })

      // Create admin notification
      await fetch("/api/admin-notifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "sale_approval",
          title: "New Land Sale Pending",
          message: `${saleData.seller_name} is selling ${saleData.land_title} to a buyer. Awaiting payment confirmation.`,
          related_sale_id: saleData.id,
        }),
      })

      toast({
        title: "Interest Recorded",
        description: "The seller has been notified. Please contact admin to complete the transaction.",
      })

      handleClose()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to record interest. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-RW", {
      style: "currency",
      currency: "RWF",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const handleClose = () => {
    setSaleCode("")
    setSaleData(null)
    setMessage("")
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="text-[#17412b]">Buy Land</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {!saleData ? (
            <>
              {/* Search Section */}
              <div className="space-y-4">
                <div className="text-center py-4">
                  <QrCode className="w-16 h-16 text-[#69d259] mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-[#17412b] mb-2">Find Land for Sale</h3>
                  <p className="text-sm text-gray-600">Enter the sale code or scan QR code from the seller</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sale-code" className="text-[#17412b]">
                    Sale Code / QR Code
                  </Label>
                  <Input
                    id="sale-code"
                    placeholder="Enter sale code (e.g., QR_KIGALI_PRIME_PLOT_SALE_2024)"
                    value={saleCode}
                    onChange={(e) => setSaleCode(e.target.value)}
                    className="border-[#c6ecc5] focus:border-[#69d259]"
                  />
                </div>

                <Button
                  onClick={handleSearchSale}
                  disabled={!saleCode.trim() || isSearching}
                  className="w-full bg-[#69d259] hover:bg-[#17412b]"
                >
                  <Search className="w-4 h-4 mr-2" />
                  {isSearching ? "Searching..." : "Search Land"}
                </Button>
              </div>
            </>
          ) : (
            <>
              {/* Land Details */}
              <Card className="border-[#69d259]">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#c6ecc5] to-[#69d259] rounded-lg flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-[#17412b]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-[#17412b] text-lg">{saleData.land_title}</h3>
                      <p className="text-sm text-gray-600">{saleData.location}</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">For Sale</Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <Square className="w-4 h-4 text-[#69d259]" />
                      <div>
                        <p className="text-xs text-gray-600">Area</p>
                        <p className="font-semibold">{saleData.area?.toLocaleString()} m²</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-[#69d259]" />
                      <div>
                        <p className="text-xs text-gray-600">Price</p>
                        <p className="font-semibold">{formatCurrency(saleData.asking_price)}</p>
                      </div>
                    </div>
                  </div>

                  <Separator className="my-3" />

                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-[#69d259]" />
                    <div>
                      <p className="text-xs text-gray-600">Seller</p>
                      <p className="font-semibold">{saleData.seller_name}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Message to Seller */}
              <div className="space-y-2">
                <Label htmlFor="message" className="text-[#17412b]">
                  Message to Seller (Optional)
                </Label>
                <Textarea
                  id="message"
                  placeholder="Add a message for the seller..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="border-[#c6ecc5] focus:border-[#69d259]"
                  rows={3}
                />
              </div>

              {/* Next Steps Info */}
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-4">
                  <h4 className="font-medium text-blue-900 mb-2">Next Steps:</h4>
                  <ol className="text-sm text-blue-700 space-y-1">
                    <li>1. Express interest in this land</li>
                    <li>2. Contact admin to arrange payment</li>
                    <li>3. Admin confirms payment with seller</li>
                    <li>4. Land ownership transfers to you</li>
                  </ol>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-4">
                <Button variant="outline" onClick={handleClose} className="flex-1 bg-transparent">
                  Cancel
                </Button>
                <Button
                  onClick={handleExpressInterest}
                  disabled={isProcessing}
                  className="flex-1 bg-[#69d259] hover:bg-[#17412b]"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  {isProcessing ? "Processing..." : "Buy This Land"}
                </Button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
