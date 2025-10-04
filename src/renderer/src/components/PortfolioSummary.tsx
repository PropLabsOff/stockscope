import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

const SummaryContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const MetricCard = styled.div`
  background-color: ${props => props.theme.background};
  padding: 16px;
  border-radius: 8px;
  border: 1px solid ${props => props.theme.border};
`

const MetricLabel = styled.div`
  color: ${props => props.theme.textSecondary};
  font-size: 14px;
  margin-bottom: 4px;
`

const MetricValue = styled.div<{ positive?: boolean }>`
  color: ${props => {
    if (props.positive === undefined) return props.theme.text
    return props.positive ? props.theme.success : props.theme.danger
  }};
  font-size: 24px;
  font-weight: 600;
`

const MetricSubtext = styled.div`
  color: ${props => props.theme.textSecondary};
  font-size: 12px;
  margin-top: 4px;
`

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
`

const StatItem = styled.div`
  text-align: center;
  padding: 12px;
  background-color: ${props => props.theme.background};
  border-radius: 6px;
  border: 1px solid ${props => props.theme.border};
`

const StatValue = styled.div`
  color: ${props => props.theme.text};
  font-weight: 600;
  font-size: 18px;
`

const StatLabel = styled.div`
  color: ${props => props.theme.textSecondary};
  font-size: 12px;
  margin-top: 4px;
`

const LoadingText = styled.div`
  text-align: center;
  color: ${props => props.theme.textSecondary};
  padding: 20px;
`

interface PortfolioData {
  totalValue: number
  totalCost: number
  totalGain: number
  totalGainPercent: number
  dayChange: number
  dayChangePercent: number
  stockCount: number
  topPerformer: string
  worstPerformer: string
}

const PortfolioSummary: React.FC = () => {
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate fetching portfolio data
    const mockData: PortfolioData = {
      totalValue: 125430.50,
      totalCost: 118500.00,
      totalGain: 6930.50,
      totalGainPercent: 5.85,
      dayChange: 1250.75,
      dayChangePercent: 1.01,
      stockCount: 12,
      topPerformer: 'AAPL',
      worstPerformer: 'TSLA'
    }

    const timer = setTimeout(() => {
      setPortfolioData(mockData)
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <SummaryContainer>
        <LoadingText>Loading portfolio data...</LoadingText>
      </SummaryContainer>
    )
  }

  if (!portfolioData) {
    return (
      <SummaryContainer>
        <LoadingText>No portfolio data available</LoadingText>
      </SummaryContainer>
    )
  }

  return (
    <SummaryContainer>
      <MetricCard>
        <MetricLabel>Total Portfolio Value</MetricLabel>
        <MetricValue>${portfolioData.totalValue.toLocaleString()}</MetricValue>
        <MetricSubtext>
          {portfolioData.dayChange >= 0 ? '+' : ''}${portfolioData.dayChange.toFixed(2)} ({portfolioData.dayChange >= 0 ? '+' : ''}{portfolioData.dayChangePercent.toFixed(2)}%) today
        </MetricSubtext>
      </MetricCard>

      <MetricCard>
        <MetricLabel>Total Gain/Loss</MetricLabel>
        <MetricValue positive={portfolioData.totalGain >= 0}>
          {portfolioData.totalGain >= 0 ? '+' : ''}${portfolioData.totalGain.toFixed(2)}
        </MetricValue>
        <MetricSubtext>
          {portfolioData.totalGainPercent >= 0 ? '+' : ''}{portfolioData.totalGainPercent.toFixed(2)}% overall return
        </MetricSubtext>
      </MetricCard>

      <StatsGrid>
        <StatItem>
          <StatValue>{portfolioData.stockCount}</StatValue>
          <StatLabel>Stocks</StatLabel>
        </StatItem>
        <StatItem>
          <StatValue>{portfolioData.topPerformer}</StatValue>
          <StatLabel>Top Performer</StatLabel>
        </StatItem>
        <StatItem>
          <StatValue>{portfolioData.worstPerformer}</StatValue>
          <StatLabel>Worst Performer</StatLabel>
        </StatItem>
        <StatItem>
          <StatValue>${portfolioData.totalCost.toLocaleString()}</StatValue>
          <StatLabel>Total Cost</StatLabel>
        </StatItem>
      </StatsGrid>
    </SummaryContainer>
  )
}

export default PortfolioSummary