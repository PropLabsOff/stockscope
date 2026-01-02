import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

const OverviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const IndexCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 20px;
  background: ${props => props.theme.surface};
  border: 1px solid ${props => props.theme.border};
  border-radius: 12px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 4px;
    background: ${props => props.theme.gradientPrimary};
    transform: scaleY(0);
    transition: transform 0.3s ease;
  }
  
  &:hover {
    box-shadow: 0 4px 12px ${props => props.theme.shadow};
    transform: translateX(4px);
    border-color: ${props => props.theme.primary};
    
    &::before {
      transform: scaleY(1);
    }
  }
`

const IndexInfo = styled.div`
  display: flex;
  flex-direction: column;
`

const IndexName = styled.span`
  font-weight: 700;
  color: ${props => props.theme.text};
  font-size: 15px;
  letter-spacing: -0.2px;
`

const IndexValue = styled.span`
  color: ${props => props.theme.textSecondary};
  font-size: 12px;
  font-weight: 500;
  margin-top: 2px;
`

const IndexPrice = styled.div<{ positive: boolean }>`
  background: ${props => props.positive ? props.theme.gradientSuccess : props.theme.gradientDanger};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 700;
  font-size: 18px;
  letter-spacing: -0.3px;
`

const IndexChange = styled.div<{ positive: boolean }>`
  background: ${props => props.positive ? props.theme.successLight : props.theme.dangerLight};
  color: ${props => props.positive ? props.theme.success : props.theme.danger};
  padding: 3px 8px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  margin-top: 4px;
  display: inline-block;
`

const LoadingText = styled.div`
  text-align: center;
  color: ${props => props.theme.textSecondary};
  padding: 20px;
`

interface MarketIndex {
  name: string
  symbol: string
  value: number
  change: number
  changePercent: number
}

const MarketOverview: React.FC = () => {
  const [indices, setIndices] = useState<MarketIndex[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate fetching market data
    const mockIndices: MarketIndex[] = [
      {
        name: 'S&P 500',
        symbol: 'SPX',
        value: 4567.18,
        change: 23.45,
        changePercent: 0.52
      },
      {
        name: 'Dow Jones',
        symbol: 'DJI',
        value: 35430.42,
        change: -89.12,
        changePercent: -0.25
      },
      {
        name: 'NASDAQ',
        symbol: 'IXIC',
        value: 14258.49,
        change: 156.78,
        changePercent: 1.11
      },
      {
        name: 'VIX',
        symbol: 'VIX',
        value: 18.45,
        change: -1.23,
        changePercent: -6.25
      }
    ]

    const timer = setTimeout(() => {
      setIndices(mockIndices)
      setLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <OverviewContainer>
        <LoadingText>Loading market data...</LoadingText>
      </OverviewContainer>
    )
  }

  return (
    <OverviewContainer>
      {indices.map((index) => (
        <IndexCard key={index.symbol}>
          <IndexInfo>
            <IndexName>{index.name}</IndexName>
            <IndexValue>{index.symbol}</IndexValue>
          </IndexInfo>
          <div style={{ textAlign: 'right' }}>
            <IndexPrice positive={index.change >= 0}>
              {index.value.toFixed(2)}
            </IndexPrice>
            <IndexChange positive={index.change >= 0}>
              {index.change >= 0 ? '+' : ''}{index.change.toFixed(2)} ({index.change >= 0 ? '+' : ''}{index.changePercent.toFixed(2)}%)
            </IndexChange>
          </div>
        </IndexCard>
      ))}
    </OverviewContainer>
  )
}

export default MarketOverview