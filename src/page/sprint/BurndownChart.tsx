import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

interface BurndownChartProps {
  startDate: string // "2023-10-15"
  endDate: string   // "2023-10-29"
  totalIssues: number
  dailyRemaining: { date: string, remaining: number }[] // 실제 남은 이슈 데이터
}

export default function BurndownChart({ startDate, endDate, totalIssues, dailyRemaining }: BurndownChartProps) {
  // 이상적 진행선 데이터 생성
  const days = (new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24)
  const idealData = Array.from({ length: days + 1 }, (_, i) => ({
    date: new Date(new Date(startDate).getTime() + i * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
    ideal: Math.round(totalIssues - (totalIssues / days) * i),
  }))

  // 실제 데이터와 이상적 데이터 병합
  const chartData = idealData.map((d, i) => ({
    date: d.date,
    ideal: d.ideal,
    actual: dailyRemaining.find(r => r.date === d.date)?.remaining ?? null,
  }))

  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="ideal" stroke="#8884d8" strokeDasharray="5 5" name="Ideal" />
        <Line type="monotone" dataKey="actual" stroke="#ef4444" name="Actual" />
      </LineChart>
    </ResponsiveContainer>
  )
}
