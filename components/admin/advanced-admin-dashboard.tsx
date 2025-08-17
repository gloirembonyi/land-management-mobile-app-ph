"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Shield,
  Users,
  MapPin,
  Bell,
  Search,
  Settings,
  Home,
  BarChart3,
  ArrowUpRight,
  Activity,
  Building,
  Sprout,
  Factory,
  Sun,
  Moon,
  Menu,
  X,
} from "lucide-react"
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, LineChart, Line } from "recharts"
import type { User } from "@/types"

interface AdminDashboardProps {
  user: User
}

const performanceData = [
  { month: "1st Jan", value: 45000, sales: 12 },
  { month: "15th Jan", value: 52000, sales: 15 },
  { month: "1st Feb", value: 48000, sales: 11 },
  { month: "15th Feb", value: 61000, sales: 18 },
  { month: "1st Mar", value: 55000, sales: 16 },
  { month: "15th Mar", value: 67000, sales: 22 },
  { month: "1st Apr", value: 71000, sales: 25 },
  { month: "15th Apr", value: 69000, sales: 23 },
  { month: "1st May", value: 78000, sales: 28 },
  { month: "15th May", value: 82000, sales: 31 },
  { month: "1st Jun", value: 85000, sales: 33 },
  { month: "15th Jun", value: 92000, sales: 38 },
]

const landPortfolio = [
  {
    symbol: "KGLA",
    name: "Kigali Plots",
    price: 526000.21,
    change: 3.4,
    marketCap: 564000000,
    volume: 3798,
    trend: [20, 25, 22, 28, 32, 30, 35],
  },
  {
    symbol: "MSNZ",
    name: "Musanze Land",
    price: 332000.21,
    change: -3.4,
    marketCap: 564000000,
    volume: 3798,
    trend: [15, 18, 16, 14, 12, 13, 11],
  },
]

const recentActivities = [
  { name: "Spotify", symbol: "KGLA", price: 231000, change: 2.34 },
  { name: "Amazon", symbol: "MSNZ", price: 231000, change: 2.34 },
]

export function AdvancedAdminDashboard({ user }: AdminDashboardProps) {
  const [activeTimeframe, setActiveTimeframe] = useState("6M")
  const [loading, setLoading] = useState(true)
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000)
  }, [])

  if (loading) {
    return (
      <div className={`min-h-screen ${isDarkMode ? "bg-slate-900" : "bg-gray-50"} flex items-center justify-center`}>
        <div className="animate-spin rounded-full h-32 w-32 border-4 border-emerald-200 border-t-emerald-500"></div>
      </div>
    )
  }

  const MiniSparkline = ({ data, isPositive }: { data: number[]; isPositive: boolean }) => (
    <ResponsiveContainer width={60} height={20}>
      <LineChart data={data.map((value, index) => ({ value, index }))}>
        <Line
          type="monotone"
          dataKey="value"
          stroke={isPositive ? "#10b981" : "#ef4444"}
          strokeWidth={1.5}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  )

  const themeClasses = {
    background: isDarkMode ? "bg-slate-900" : "bg-gray-50",
    cardBg: isDarkMode ? "bg-slate-800/50 border-slate-700/50" : "bg-white border-gray-200 shadow-sm",
    sidebarBg: isDarkMode ? "bg-black" : "bg-white border-r border-gray-200",
    headerBg: isDarkMode ? "bg-black border-slate-800" : "bg-white border-gray-200",
    text: isDarkMode ? "text-white" : "text-gray-900",
    textSecondary: isDarkMode ? "text-slate-400" : "text-gray-600",
    textMuted: isDarkMode ? "text-slate-500" : "text-gray-500",
    inputBg: isDarkMode ? "bg-slate-800 border-slate-700" : "bg-gray-50 border-gray-300",
    hoverBg: isDarkMode ? "hover:bg-slate-800" : "hover:bg-gray-50",
    activeBg: isDarkMode ? "bg-emerald-500" : "bg-emerald-500",
  }

  return (
    <div className={`min-h-screen ${themeClasses.background}`}>
      <div className={`min-h-screen ${themeClasses.text} relative`}>
        <div
          className={`fixed left-0 top-0 bottom-0 w-64 ${themeClasses.sidebarBg} z-50 transform transition-transform duration-300 ease-in-out ${
            isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0`}
        >
          <div className="p-5">
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center space-x-3">
                <div className="w-7 h-7 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <span className={`text-lg font-bold ${themeClasses.text}`}>LandVest</span>
              </div>
              <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setIsMobileSidebarOpen(false)}>
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className={`text-xs ${themeClasses.textMuted} uppercase tracking-wider mb-3`}>Main Menu</div>

            <nav className="space-y-1">
              <div className={`${themeClasses.activeBg} text-white px-3 py-2.5 rounded-xl flex items-center space-x-3`}>
                <Home className="w-4 h-4" />
                <span className="text-sm font-medium">Dashboard</span>
              </div>
              <div
                className={`${themeClasses.textSecondary} ${themeClasses.hoverBg} px-3 py-2.5 rounded-xl flex items-center space-x-3 cursor-pointer transition-colors`}
              >
                <BarChart3 className="w-4 h-4" />
                <span className="text-sm">Portfolio</span>
              </div>
              <div
                className={`${themeClasses.textSecondary} ${themeClasses.hoverBg} px-3 py-2.5 rounded-xl flex items-center space-x-3 cursor-pointer transition-colors`}
              >
                <Activity className="w-4 h-4" />
                <span className="text-sm">Analysis</span>
              </div>
              <div
                className={`${themeClasses.textSecondary} ${themeClasses.hoverBg} px-3 py-2.5 rounded-xl flex items-center space-x-3 cursor-pointer transition-colors`}
              >
                <MapPin className="w-4 h-4" />
                <span className="text-sm">Market</span>
              </div>
            </nav>

            <div className={`mt-10 pt-6 border-t ${isDarkMode ? "border-slate-800" : "border-gray-200"}`}>
              <div className={`text-xs ${themeClasses.textMuted} uppercase tracking-wider mb-3`}>Support</div>
              <div
                className={`${themeClasses.textSecondary} ${themeClasses.hoverBg} px-3 py-2.5 rounded-xl flex items-center space-x-3 cursor-pointer transition-colors`}
              >
                <Users className="w-4 h-4" />
                <span className="text-sm">Community</span>
              </div>
              <div
                className={`${themeClasses.textSecondary} ${themeClasses.hoverBg} px-3 py-2.5 rounded-xl flex items-center space-x-3 cursor-pointer transition-colors`}
              >
                <Settings className="w-4 h-4" />
                <span className="text-sm">Help & Support</span>
              </div>
            </div>
          </div>
        </div>

        {isMobileSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setIsMobileSidebarOpen(false)}
          />
        )}

        <div className="lg:ml-64">
          <div className={`${themeClasses.headerBg} border-b px-4 lg:px-6 py-3`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setIsMobileSidebarOpen(true)}>
                  <Menu className="w-4 h-4" />
                </Button>
                <div className="hidden md:flex items-center space-x-8">
                  <span className={`${themeClasses.textSecondary} text-sm hover:${themeClasses.text} cursor-pointer`}>
                    Market
                  </span>
                  <span className={`${themeClasses.textSecondary} text-sm hover:${themeClasses.text} cursor-pointer`}>
                    Wallets
                  </span>
                  <span className={`${themeClasses.textSecondary} text-sm hover:${themeClasses.text} cursor-pointer`}>
                    Tools
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-2 lg:space-x-4">
                <div className="relative hidden sm:block">
                  <Search
                    className={`w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 ${themeClasses.textSecondary}`}
                  />
                  <Input
                    placeholder="Ask lands ai anything"
                    className={`pl-10 w-48 lg:w-72 ${themeClasses.inputBg} ${themeClasses.text} placeholder-${themeClasses.textSecondary} h-9 rounded-lg`}
                  />
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className={`${themeClasses.textSecondary} hover:${themeClasses.text}`}
                >
                  {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </Button>
                <Bell className={`w-5 h-5 ${themeClasses.textSecondary} hover:${themeClasses.text} cursor-pointer`} />
                <Settings
                  className={`w-5 h-5 ${themeClasses.textSecondary} hover:${themeClasses.text} cursor-pointer hidden sm:block`}
                />
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-emerald-500 text-white text-sm">
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>

          <div className="p-3 lg:p-5 space-y-4 lg:space-y-5">
            <div>
              <h1 className={`text-xl lg:text-2xl font-bold ${themeClasses.text} mb-1`}>
                Welcome, {user.name.split(" ")[0]}
              </h1>
              <p className={`${themeClasses.textSecondary} text-sm`}>Here's your land portfolio overview</p>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 lg:gap-5">
              <div className="xl:col-span-8 space-y-4 lg:space-y-5">
                <Card className={`${themeClasses.cardBg} backdrop-blur-sm`}>
                  <CardContent className="p-4 lg:p-5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <p className={`${themeClasses.textSecondary} text-sm mb-2`}>Total Holding</p>
                        <div className="flex items-center space-x-2">
                          <button
                            className={`${isDarkMode ? "bg-slate-700" : "bg-gray-200"} ${themeClasses.text} px-3 py-1 rounded-full text-xs font-medium`}
                          >
                            6M
                          </button>
                          <button className={`${themeClasses.textSecondary} px-3 py-1 rounded-full text-xs`}>
                            ...
                          </button>
                        </div>
                      </div>
                      <div className="text-left sm:text-right">
                        <p className={`text-2xl lg:text-3xl font-bold ${themeClasses.text}`}>RWF 12,304.11</p>
                        <div className="flex items-center sm:justify-end text-emerald-500 text-sm mt-1">
                          <ArrowUpRight className="w-4 h-4 mr-1" />
                          <span>+234% (5,520)</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className={`text-lg font-semibold ${themeClasses.text}`}>My Portfolio</h3>
                    <div className="flex items-center space-x-2">
                      <button className={`${themeClasses.textSecondary} hover:${themeClasses.text} text-sm`}>
                        See all
                      </button>
                      <ArrowUpRight className={`w-4 h-4 ${themeClasses.textSecondary}`} />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 lg:gap-3">
                    {[
                      { symbol: "AAPL", units: 104, value: 1721.3, change: 0.76, icon: Building },
                      { symbol: "TSLA", units: 104, value: 1521.3, change: -0.57, icon: Building },
                      { symbol: "MSFT", units: 124, value: 1721.3, change: 0.76, icon: Building },
                      { symbol: "GOOGL", units: 19, value: 1721.3, change: -0.91, icon: Sprout },
                      { symbol: "NVDA", units: 104, value: 1721.3, change: 0.76, icon: Factory },
                    ].map((item, index) => (
                      <Card key={item.symbol} className={`${themeClasses.cardBg} backdrop-blur-sm`}>
                        <CardContent className="p-2 lg:p-3">
                          <div className="flex items-center justify-between mb-2">
                            <item.icon className={`w-3 h-3 lg:w-4 lg:h-4 ${themeClasses.textSecondary}`} />
                            <span className={`text-xs ${themeClasses.textSecondary}`}>Units {item.units}</span>
                          </div>
                          <div className="text-center">
                            <p className={`${themeClasses.text} font-semibold text-xs lg:text-sm`}>{item.symbol}</p>
                            <p className={`text-sm lg:text-lg font-bold ${themeClasses.text}`}>
                              RWF {item.value.toFixed(1)}
                            </p>
                            <p className={`text-xs ${item.change > 0 ? "text-emerald-500" : "text-red-500"}`}>
                              {item.change > 0 ? "+" : ""}
                              {item.change}% ({item.change > 0 ? "+" : ""}
                              {(item.change * 0.76).toFixed(1)})
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                <Card className={`${themeClasses.cardBg} backdrop-blur-sm`}>
                  <CardHeader className="pb-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <CardTitle className={`${themeClasses.text} text-lg`}>Portfolio Performance</CardTitle>
                      <div className="flex items-center space-x-1 overflow-x-auto">
                        {["1D", "1W", "1M", "6M", "1Y"].map((period) => (
                          <button
                            key={period}
                            onClick={() => setActiveTimeframe(period)}
                            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
                              activeTimeframe === period
                                ? "bg-emerald-500 text-white shadow-lg"
                                : `${themeClasses.textSecondary} hover:${themeClasses.text} ${themeClasses.hoverBg}`
                            }`}
                          >
                            {period}
                          </button>
                        ))}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={280}>
                      <AreaChart data={performanceData}>
                        <defs>
                          <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                            <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? "#374151" : "#e5e7eb"} />
                        <XAxis dataKey="month" stroke={isDarkMode ? "#9ca3af" : "#6b7280"} fontSize={11} />
                        <YAxis stroke={isDarkMode ? "#9ca3af" : "#6b7280"} fontSize={11} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: isDarkMode ? "#1f2937" : "#ffffff",
                            border: `1px solid ${isDarkMode ? "#374151" : "#e5e7eb"}`,
                            borderRadius: "8px",
                            color: isDarkMode ? "#ffffff" : "#000000",
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="value"
                          stroke="#10b981"
                          strokeWidth={2}
                          fillOpacity={1}
                          fill="url(#colorGradient)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card className={`${themeClasses.cardBg} backdrop-blur-sm`}>
                  <CardHeader className="pb-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <CardTitle className={`${themeClasses.text} text-lg`}>Portfolio Overview</CardTitle>
                      <div className="flex items-center space-x-1 overflow-x-auto">
                        <button className="bg-emerald-500 text-white px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap">
                          All
                        </button>
                        <button
                          className={`${themeClasses.textSecondary} hover:${themeClasses.text} px-3 py-1.5 rounded-full text-xs whitespace-nowrap`}
                        >
                          Gainers
                        </button>
                        <button
                          className={`${themeClasses.textSecondary} hover:${themeClasses.text} px-3 py-1.5 rounded-full text-xs whitespace-nowrap`}
                        >
                          Losers
                        </button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="overflow-x-auto">
                        <div className="min-w-full">
                          <div
                            className={`grid grid-cols-6 gap-4 text-xs ${themeClasses.textSecondary} pb-3 border-b ${isDarkMode ? "border-slate-700" : "border-gray-200"}`}
                          >
                            <span>Stock</span>
                            <span>Last Price ↑</span>
                            <span>Change ↑</span>
                            <span>Market Cap ↑</span>
                            <span>Volume ↑</span>
                            <span>Last 7 days ↑</span>
                          </div>
                          {landPortfolio.map((land) => (
                            <div
                              key={land.symbol}
                              className={`grid grid-cols-6 gap-4 items-center py-3 ${themeClasses.hoverBg} rounded-lg px-2 transition-colors`}
                            >
                              <div className="flex items-center space-x-3">
                                <div
                                  className={`w-6 h-6 ${isDarkMode ? "bg-slate-700" : "bg-gray-200"} rounded-full flex items-center justify-center`}
                                >
                                  <span className={`text-xs ${themeClasses.text} font-medium`}>{land.symbol[0]}</span>
                                </div>
                                <span className={`${themeClasses.text} text-sm font-medium`}>{land.symbol}</span>
                              </div>
                              <span className={`${themeClasses.text} font-medium`}>RWF {land.price.toFixed(2)}</span>
                              <span className={`font-medium ${land.change > 0 ? "text-emerald-500" : "text-red-500"}`}>
                                {land.change > 0 ? "+" : ""}
                                {land.change}%
                              </span>
                              <span className={themeClasses.textSecondary}>
                                RWF {(land.marketCap / 1000000).toFixed(0)}M
                              </span>
                              <span className={themeClasses.textSecondary}>RWF {land.volume.toLocaleString()}</span>
                              <div className="flex items-center">
                                <MiniSparkline data={land.trend} isPositive={land.change > 0} />
                                <span
                                  className={`ml-2 text-sm ${land.change > 0 ? "text-emerald-500" : "text-red-500"}`}
                                >
                                  ●
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="xl:col-span-4">
                <Card className={`${themeClasses.cardBg} backdrop-blur-sm`}>
                  <CardHeader className="pb-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <CardTitle className={`${themeClasses.text} text-lg`}>Watchlist</CardTitle>
                      <div className="flex items-center space-x-1 overflow-x-auto">
                        <button className="bg-emerald-500 text-white px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap">
                          Most Viewed
                        </button>
                        <button
                          className={`${themeClasses.textSecondary} hover:${themeClasses.text} px-3 py-1.5 rounded-full text-xs whitespace-nowrap`}
                        >
                          Gainers
                        </button>
                        <button
                          className={`${themeClasses.textSecondary} hover:${themeClasses.text} px-3 py-1.5 rounded-full text-xs whitespace-nowrap`}
                        >
                          Losers
                        </button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {recentActivities.map((activity) => (
                      <div
                        key={activity.symbol}
                        className={`flex items-center justify-between p-3 ${themeClasses.hoverBg} rounded-lg transition-colors`}
                      >
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-8 h-8 ${isDarkMode ? "bg-slate-700" : "bg-gray-200"} rounded-full flex items-center justify-center`}
                          >
                            <span className={`text-xs ${themeClasses.text} font-medium`}>{activity.symbol}</span>
                          </div>
                          <div>
                            <p className={`${themeClasses.text} text-sm font-medium`}>{activity.name}</p>
                            <p className={`${themeClasses.textSecondary} text-xs`}>{activity.symbol}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`${themeClasses.text} text-sm font-medium`}>
                            RWF {activity.price.toLocaleString()}
                          </p>
                          <p
                            className={`text-xs font-medium ${activity.change > 0 ? "text-emerald-500" : "text-red-500"}`}
                          >
                            {activity.change > 0 ? "+" : ""}
                            {activity.change}%
                          </p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
