"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowUpRight, ArrowDownLeft, Clock, CheckCircle, XCircle, Filter, Search } from "lucide-react"
import type { User } from "@/types"
import { mockTransactions } from "@/lib/mock-data"

interface TransactionsViewProps {
  user: User
}

export function TransactionsView({ user }: TransactionsViewProps) {
  const [filterStatus, setFilterStatus] = useState<"all" | "completed" | "pending" | "failed">("all")

  const userTransactions = mockTransactions.filter((tx) => tx.buyer === user.name || tx.seller === user.name)
  const filteredTransactions = userTransactions.filter((tx) => filterStatus === "all" || tx.status === filterStatus)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-[#69d259]" />
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-500" />
      case "failed":
        return <XCircle className="w-4 h-4 text-red-500" />
      default:
        return null
    }
  }

  const getTransactionIcon = (type: string, isBuyer: boolean) => {
    return isBuyer ? (
      <ArrowDownLeft className="w-5 h-5 text-red-500" />
    ) : (
      <ArrowUpRight className="w-5 h-5 text-[#69d259]" />
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-[#69d259] text-white"
      case "pending":
        return "bg-yellow-500 text-white"
      case "failed":
        return "bg-red-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 py-4 border-b border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold text-gray-900">Transactions</h1>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" className="rounded-full border-gray-200 bg-transparent">
              <Search className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" className="rounded-full border-gray-200 bg-transparent">
              <Filter className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex space-x-1 bg-gray-100 rounded-xl p-1">
          <Button
            variant={filterStatus === "all" ? "default" : "ghost"}
            size="sm"
            onClick={() => setFilterStatus("all")}
            className={`flex-1 rounded-lg text-sm ${
              filterStatus === "all" ? "bg-[#17412b] text-white" : "text-gray-600 hover:bg-gray-200"
            }`}
          >
            All
          </Button>
          <Button
            variant={filterStatus === "completed" ? "default" : "ghost"}
            size="sm"
            onClick={() => setFilterStatus("completed")}
            className={`flex-1 rounded-lg text-sm ${
              filterStatus === "completed" ? "bg-[#17412b] text-white" : "text-gray-600 hover:bg-gray-200"
            }`}
          >
            Completed
          </Button>
          <Button
            variant={filterStatus === "pending" ? "default" : "ghost"}
            size="sm"
            onClick={() => setFilterStatus("pending")}
            className={`flex-1 rounded-lg text-sm ${
              filterStatus === "pending" ? "bg-[#17412b] text-white" : "text-gray-600 hover:bg-gray-200"
            }`}
          >
            Pending
          </Button>
        </div>
      </div>

      {/* Transactions List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {filteredTransactions.map((transaction) => {
          const isBuyer = transaction.buyer === user.name
          return (
            <Card key={transaction.id} className="bg-white border border-gray-100 rounded-2xl shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                    {getTransactionIcon(transaction.type, isBuyer)}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-1">
                      <h3 className="font-semibold text-gray-900 capitalize">{transaction.type} Transaction</h3>
                      <Badge className={`${getStatusColor(transaction.status)} rounded-full px-2 py-1 text-xs`}>
                        {transaction.status}
                      </Badge>
                    </div>

                    <p className="text-sm text-gray-600 mb-1">Land ID: {transaction.landId}</p>

                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-500">
                        {isBuyer ? `From: ${transaction.seller}` : `To: ${transaction.buyer}`}
                      </p>
                      <div className="text-right">
                        <p className="font-bold text-gray-900">{(transaction.amount / 1000000).toFixed(1)}M RWF</p>
                        <div className="flex items-center space-x-1">
                          {getStatusIcon(transaction.status)}
                          <span className="text-xs text-gray-500 capitalize">{transaction.status}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}

        {filteredTransactions.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ArrowUpRight className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">No Transactions</h3>
            <p className="text-gray-600 text-sm">
              {filterStatus === "all"
                ? "You haven't made any transactions yet"
                : `No ${filterStatus} transactions found`}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
