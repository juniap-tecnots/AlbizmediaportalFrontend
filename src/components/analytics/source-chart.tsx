"use client"

import { Bar, BarChart, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import {
  ChartTooltipContent,
  ChartContainer,
} from "@/components/ui/chart"

const chartData = [
  { source: "Direct", visitors: 4500, fill: "var(--color-direct)" },
  { source: "Google", visitors: 7800, fill: "var(--color-google)" },
  { source: "Facebook", visitors: 3200, fill: "var(--color-facebook)" },
  { source: "Referral", visitors: 1800, fill: "var(--color-referral)" },
  { source: "Other", visitors: 900, fill: "var(--color-other)" },
]

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  direct: {
    label: "Direct",
    color: "hsl(var(--chart-1))",
  },
  google: {
    label: "Google",
    color: "hsl(var(--chart-2))",
  },
  facebook: {
    label: "Facebook",
    color: "hsl(var(--chart-3))",
  },
  referral: {
    label: "Referral",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
}

export function SourceChart() {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
       <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData} layout="vertical" margin={{ left: -10, right: 20 }}>
          <XAxis type="number" hide />
          <YAxis
            dataKey="source"
            type="category"
            tickLine={false}
            axisLine={false}
            tickMargin={10}
            width={80}
          />
          <Tooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
          <Bar dataKey="visitors" radius={4} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
