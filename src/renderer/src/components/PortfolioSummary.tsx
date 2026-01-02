import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

const SummaryContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const MetricCard = styled.div`
  background: ${props => props.theme.surface};
  padding: 24px;
  border-radius: 16px;
  border: 1px solid ${props => props.theme.border};
  box-shadow: 0 2px 8px ${props => props.theme.shadow};
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: 0 4px 16px ${props => props.theme.shadowHover};
    transform: translateY(-2px);
  }
`

const MetricLabel = styled.div`
  color: ${props => props.theme.textSecondary};
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
`

const MetricValue = styled.div<{ positive?: boolean }>`
  background: ${props => {
    if (props.positive === undefined) return props.theme.gradientPrimary
    return props.positive ? props.theme.gradientSuccess : props.theme.gradientDanger
  }};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-size: 32px;
  font-weight: 700;
  letter-spacing: -0.5px;
  margin-bottom: 4px;
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
  padding: 20px 16px;
  background: ${props => props.theme.backgroundSecondary};
  border-radius: 12px;
  border: 1px solid ${props => props.theme.borderLight};
  transition: all 0.2s ease;
  
  &:hover {
    background: ${props => props.theme.surface};
    transform: scale(1.05);
    box-shadow: 0 4px 12px ${props => props.theme.shadow};
  }
`

const StatValue = styled.div`
  background: ${props => props.theme.gradientPrimary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 700;
  font-size: 22px;
  letter-spacing: -0.3px;
`

const StatLabel = styled.div`
  color: ${props => props.theme.textSecondary};
  font-size: 12px;
  font-weight: 600;
  margin-top: 6px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
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