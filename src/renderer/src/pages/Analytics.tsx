import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

const AnalyticsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
`

const Title = styled.h1`
  color: ${props => props.theme.text};
  font-size: 28px;
  font-weight: 600;
  margin: 0;
`

const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const ChartCard = styled.div`
  background-color: ${props => props.theme.surface};
  padding: 20px;
  border-radius: 12px;
  border: 1px solid ${props => props.theme.border};
  box-shadow: 0 2px 8px ${props => props.theme.shadow};
`

const ChartTitle = styled.h2`
  color: ${props => props.theme.text};
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 20px;
`

const ChartContainer = styled.div`
  height: 300px;
  width: 100%;
`

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
`

const MetricCard = styled.div`
  background-color: ${props => props.theme.surface};
  padding: 20px;
  border-radius: 12px;
  border: 1px solid ${props => props.theme.border};
  box-shadow: 0 2px 8px ${props => props.theme.shadow};
  text-align: center;
`

const MetricValue = styled.div<{ positive?: boolean }>`
  color: ${props => {
    if (props.positive === undefined) return props.theme.text
    return props.positive ? props.theme.success : props.theme.danger
  }};
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 8px;
`

const MetricLabel = styled.div`
  color: ${props => props.theme.textSecondary};
  font-size: 14px;
`

const LoadingText = styled.div`
  text-align: center;
  color: ${props => props.theme.textSecondary};
  padding: 40px;
  font-size: 16px;
`

const Analytics: React.FC = () => {
  const [loading, setLoading] = useState(true)
  const [portfolioData, setPortfolioData] = useState<any>(null)

  useEffect(() => {
    // Simulate loading analytics data
    const mockData = {
      portfolioValue: [
        { date: '2024-01-01', value: 100000 },
        { date: '2024-01-02', value: 101200 },
        { date: '2024-01-03', value: 99800 },
        { date: '2024-01-04', value: 102500 },
        { date: '2024-01-05', value: 105000 },
        { date: '2024-01-06', value: 103800 },
        { date: '2024-01-07', value: 107200 },
      ],
      sectorAllocation: [
        { name: 'Technology', value: 35, color: '#0088FE' },
        { name: 'Healthcare', value: 20, color: '#00C49F' },
        { name: 'Finance', value: 15, color: '#FFBB28' },
        { name: 'Consumer', value: 12, color: '#FF8042' },
        { name: 'Energy', value: 10, color: '#8884D8' },
        { name: 'Other', value: 8, color: '#82CA9D' },
      ],
      metrics: {
        sharpeRatio: 1.45,
        beta: 0.95,
        volatility: 18.5,
        maxDrawdown: -8.2,
        var95: -2.1,
        correlation: 0.78
      }
    }

    const timer = setTimeout(() => {
      setPortfolioData(mockData)
      setLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <AnalyticsContainer>
        <Title>Portfolio Analytics</Title>
        <LoadingText>Loading analytics data...</LoadingText>
      </AnalyticsContainer>
    )
  }

  return (
    <AnalyticsContainer>
      <Title>Portfolio Analytics</Title>

      <MetricsGrid>
        <MetricCard>
          <MetricValue positive={portfolioData.metrics.sharpeRatio > 1}>
            {portfolioData.metrics.sharpeRatio}
          </MetricValue>
          <MetricLabel>Sharpe Ratio</MetricLabel>
        </MetricCard>
        
        <MetricCard>
          <MetricValue>{portfolioData.metrics.beta}</MetricValue>
          <MetricLabel>Beta</MetricLabel>
        </MetricCard>
        
        <MetricCard>
          <MetricValue>{portfolioData.metrics.volatility}%</MetricValue>
          <MetricLabel>Volatility</MetricLabel>
        </MetricCard>
        
        <MetricCard>
          <MetricValue positive={portfolioData.metrics.maxDrawdown > -5}>
            {portfolioData.metrics.maxDrawdown}%
          </MetricValue>
          <MetricLabel>Max Drawdown</MetricLabel>
        </MetricCard>
        
        <MetricCard>
          <MetricValue positive={portfolioData.metrics.var95 > -3}>
            {portfolioData.metrics.var95}%
          </MetricValue>
          <MetricLabel>VaR (95%)</MetricLabel>
        </MetricCard>
        
        <MetricCard>
          <MetricValue>{portfolioData.metrics.correlation}</MetricValue>
          <MetricLabel>Correlation</MetricLabel>
        </MetricCard>
      </MetricsGrid>

      <ChartsGrid>
        <ChartCard>
          <ChartTitle>Portfolio Value Over Time</ChartTitle>
          <ChartContainer>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={portfolioData.portfolioValue}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip 
                  formatter={(value: any) => [`$${value.toLocaleString()}`, 'Value']}
                  labelFormatter={(label) => `Date: ${label}`}
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#0088FE" 
                  strokeWidth={2}
                  dot={{ fill: '#0088FE', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </ChartCard>

        <ChartCard>
          <ChartTitle>Sector Allocation</ChartTitle>
          <ChartContainer>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={portfolioData.sectorAllocation}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {portfolioData.sectorAllocation.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </ChartCard>
      </ChartsGrid>
    </AnalyticsContainer>
  )
}

export default Analytics