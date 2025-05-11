"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SectionTitle, FadeIn } from "./motion-wrapper"
import { motion } from "framer-motion"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { ArrowUpRight, Users, Eye, Clock, MousePointerClick, Globe } from "lucide-react"

// Sample analytics data
const visitorData = [
  { name: "Jan", visitors: 450, pageViews: 1200 },
  { name: "Feb", visitors: 520, pageViews: 1400 },
  { name: "Mar", visitors: 600, pageViews: 1600 },
  { name: "Apr", visitors: 580, pageViews: 1500 },
  { name: "May", visitors: 700, pageViews: 1800 },
  { name: "Jun", visitors: 750, pageViews: 2000 },
  { name: "Jul", visitors: 790, pageViews: 2100 },
]

const pageViewsData = [
  { name: "Home", views: 2500 },
  { name: "Projects", views: 1800 },
  { name: "Blog", views: 1200 },
  { name: "About", views: 900 },
  { name: "Contact", views: 600 },
]

const locationData = [
  { name: "United States", value: 40 },
  { name: "India", value: 25 },
  { name: "United Kingdom", value: 15 },
  { name: "Germany", value: 10 },
  { name: "Others", value: 10 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"]

const referrerData = [
  { name: "Direct", value: 35 },
  { name: "Google", value: 30 },
  { name: "LinkedIn", value: 15 },
  { name: "GitHub", value: 12 },
  { name: "Twitter", value: 8 },
]

export default function AnalyticsDashboard() {
  const [period, setPeriod] = useState("7d")

  // Calculate summary metrics
  const totalVisitors = visitorData.reduce((sum, item) => sum + item.visitors, 0)
  const totalPageViews = visitorData.reduce((sum, item) => sum + item.pageViews, 0)
  const avgTimeOnSite = "2m 45s"
  const bounceRate = "32%"

  return (
    <section id="analytics" className="py-20">
      <div className="container mx-auto px-4">
        <SectionTitle>Portfolio Analytics</SectionTitle>

        <FadeIn delay={2}>
          <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto mb-12">
            Track the performance of my portfolio website with real-time analytics and insights.
          </p>
        </FadeIn>

        <Tabs defaultValue="overview" className="space-y-4">
          <div className="flex justify-between items-center">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="traffic">Traffic</TabsTrigger>
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="locations">Locations</TabsTrigger>
            </TabsList>

            <div className="flex items-center gap-2">
              <TabsList>
                <TabsTrigger value="7d" onClick={() => setPeriod("7d")}>
                  7d
                </TabsTrigger>
                <TabsTrigger value="30d" onClick={() => setPeriod("30d")}>
                  30d
                </TabsTrigger>
                <TabsTrigger value="90d" onClick={() => setPeriod("90d")}>
                  90d
                </TabsTrigger>
              </TabsList>
            </div>
          </div>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Visitors</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{totalVisitors.toLocaleString()}</div>
                    <p className="text-xs text-muted-foreground flex items-center">
                      <span className="text-green-500 flex items-center mr-1">
                        <ArrowUpRight className="h-3 w-3" />
                        12%
                      </span>
                      vs previous period
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Page Views</CardTitle>
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{totalPageViews.toLocaleString()}</div>
                    <p className="text-xs text-muted-foreground flex items-center">
                      <span className="text-green-500 flex items-center mr-1">
                        <ArrowUpRight className="h-3 w-3" />
                        18%
                      </span>
                      vs previous period
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Avg. Time on Site</CardTitle>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{avgTimeOnSite}</div>
                    <p className="text-xs text-muted-foreground flex items-center">
                      <span className="text-green-500 flex items-center mr-1">
                        <ArrowUpRight className="h-3 w-3" />
                        5%
                      </span>
                      vs previous period
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
              >
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Bounce Rate</CardTitle>
                    <MousePointerClick className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{bounceRate}</div>
                    <p className="text-xs text-muted-foreground flex items-center">
                      <span className="text-green-500 flex items-center mr-1">
                        <ArrowUpRight className="h-3 w-3 rotate-180" />
                        3%
                      </span>
                      vs previous period
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.5 }}
              >
                <Card className="col-span-1">
                  <CardHeader>
                    <CardTitle>Visitors & Page Views</CardTitle>
                    <CardDescription>Trend over the last {period}</CardDescription>
                  </CardHeader>
                  <CardContent className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={visitorData}
                        margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="visitors"
                          stroke="#8884d8"
                          activeDot={{ r: 8 }}
                          strokeWidth={2}
                        />
                        <Line type="monotone" dataKey="pageViews" stroke="#82ca9d" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.6 }}
              >
                <Card className="col-span-1">
                  <CardHeader>
                    <CardTitle>Page Views by Section</CardTitle>
                    <CardDescription>Most popular sections of the portfolio</CardDescription>
                  </CardHeader>
                  <CardContent className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={pageViewsData}
                        margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="views" fill="#8884d8" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </TabsContent>

          <TabsContent value="traffic" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Traffic Sources</CardTitle>
                  <CardDescription>Where visitors are coming from</CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={referrerData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {referrerData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Traffic by Device</CardTitle>
                  <CardDescription>Devices used to access the portfolio</CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { name: "Mobile", value: 45 },
                        { name: "Desktop", value: 40 },
                        { name: "Tablet", value: 15 },
                      ]}
                      layout="vertical"
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="value" fill="#82ca9d" name="Percentage" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="content" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Content Engagement</CardTitle>
                <CardDescription>Most engaging content on the portfolio</CardDescription>
              </CardHeader>
              <CardContent className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { name: "HealthTrack Pro", views: 1200, engagement: 85 },
                      { name: "EcoShop", views: 950, engagement: 78 },
                      { name: "DevConnect", views: 850, engagement: 72 },
                      { name: "SmartHome Hub", views: 700, engagement: 65 },
                      { name: "TravelBuddy", views: 650, engagement: 60 },
                      { name: "CodeReview AI", views: 600, engagement: 58 },
                      { name: "FinTrack", views: 550, engagement: 55 },
                    ]}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                    <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                    <Tooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="views" fill="#8884d8" name="Views" />
                    <Bar yAxisId="right" dataKey="engagement" fill="#82ca9d" name="Engagement Score" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="locations" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Visitor Locations</CardTitle>
                  <CardDescription>Geographic distribution of visitors</CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={locationData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {locationData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Top Cities</CardTitle>
                  <CardDescription>Cities with the most visitors</CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">Global Reach</span>
                    </div>
                    <span className="text-sm text-muted-foreground">25 countries, 120+ cities</span>
                  </div>
                  <ResponsiveContainer width="100%" height="80%">
                    <BarChart
                      data={[
                        { name: "Bangalore", value: 15 },
                        { name: "San Francisco", value: 12 },
                        { name: "New York", value: 10 },
                        { name: "London", value: 8 },
                        { name: "Berlin", value: 6 },
                        { name: "Toronto", value: 5 },
                        { name: "Sydney", value: 4 },
                      ]}
                      layout="vertical"
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" />
                      <Tooltip />
                      <Bar dataKey="value" fill="#0088FE" name="Percentage" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
