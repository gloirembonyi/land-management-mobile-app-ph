"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { QrCode, Copy, CheckCircle, Clock } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface LandParcel {
  id: string
  title: string
  location: string
  area: number
  value: number
}

interface SellLandModalProps {
  isOpen: boolean
  onClose: () => void
  land: LandParcel | null
  userId: string
}

export function SellLandModal({ isOpen, onClose, land, userId }: SellLandModalProps) {
  const [askingPrice, setAskingPrice] = useState("")
  const [isCreatingSale, setIsCreatingSale] = useState(false)
  const [saleCreated, setSaleCreated] = useState(false)
  const [saleData, setSaleData] = useState<any>(null)
  const { toast } = useToast()

  const handleCreateSale = async () => {
    if (!land || !askingPrice) return

    setIsCreatingSale(true)
    try {
      const response = await fetch("/api/land-sales", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          land_id: land.id,
          seller_id: userId,
          asking_price: Number.parseInt(askingPrice),
        }),
      })

      if (response.ok) {
        const sale = await response.json()
        setSaleData(sale)
        setSaleCreated(true)
        toast({
          title: "Sale Created Successfully",
          description: "Your land is now available for sale with QR code generated.",
        })
      } else {
        throw new Error("Failed to create sale")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create land sale. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsCreatingSale(false)
    }
  }

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied!",
      description: `${label} copied to clipboard`,
    })
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-RW", {
      style: "currency",
      currency: "RWF",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const handleClose = () => {
    setSaleCreated(false)
    setSaleData(null)
    setAskingPrice("")
    onClose()
  }

  if (!land) return null

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="text-[#17412b]">
            {saleCreated ? "Sale Created Successfully" : "Sell Land"}
          </DialogTitle>
        </DialogHeader>

        {!saleCreated ? (
          <div className="space-y-4">
            {/* Land Info */}
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold text-[#17412b] mb-2">{land.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{land.location}</p>
                <div className="flex justify-between text-sm">
                  <span>Area: {land.area.toLocaleString()} m²</span>
                  <span>Current Value: {formatCurrency(land.value)}</span>
                </div>
              </CardContent>
            </Card>

            {/* Asking Price */}
            <div className="space-y-2">
              <Label htmlFor="asking-price" className="text-[#17412b]">
                Asking Price (RWF)
              </Label>
              <Input
                id="asking-price"
                type="number"
                placeholder="Enter asking price"
                value={askingPrice}
                onChange={(e) => setAskingPrice(e.target.value)}
                className="border-[#c6ecc5] focus:border-[#69d259]"
              />
              <p className="text-xs text-gray-600">Suggested: {formatCurrency(land.value)} (current market value)</p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 pt-4">
              <Button variant="outline" onClick={handleClose} className="flex-1 bg-transparent">
                Cancel
              </Button>
              <Button
                onClick={handleCreateSale}
                disabled={!askingPrice || isCreatingSale}
                className="flex-1 bg-[#69d259] hover:bg-[#17412b]"
              >
                {isCreatingSale ? "Creating..." : "Create Sale"}
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Success Message */}
            <div className="text-center py-4">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-[#17412b] mb-2">Sale Created!</h3>
              <p className="text-sm text-gray-600">
                Your land is now available for sale. Share the QR code or sale code with potential buyers.
              </p>
            </div>

            {/* QR Code */}
            <Card className="border-[#69d259]">
              <CardContent className="p-4 text-center">
                <div className="w-32 h-32 bg-white border-2 border-[#69d259] rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <QrCode className="w-20 h-20 text-[#69d259]" />
                </div>
                <p className="text-sm font-medium text-[#17412b] mb-2">QR Code for Sale</p>
                <Badge className="bg-[#c6ecc5] text-[#17412b]">{saleData?.qr_code}</Badge>
              </CardContent>
            </Card>

            {/* Sale Details */}
            <Card>
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Asking Price</span>
                  <span className="font-semibold text-[#17412b]">{formatCurrency(saleData?.asking_price)}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Sale Code</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm">{saleData?.qr_code}</span>
                    <Button size="sm" variant="ghost" onClick={() => copyToClipboard(saleData?.qr_code, "Sale code")}>
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Blockchain Hash</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs">{saleData?.blockchain_hash?.slice(0, 10)}...</span>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(saleData?.blockchain_hash, "Blockchain hash")}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Status */}
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-blue-900">Sale Status: Active</p>
                    <p className="text-sm text-blue-700">Waiting for buyers to scan QR code or enter sale code</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button onClick={handleClose} className="w-full bg-[#69d259] hover:bg-[#17412b]">
              Done
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
