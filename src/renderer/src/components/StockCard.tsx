import React from 'react'
import styled from 'styled-components'

const Card = styled.div`
  background-color: ${props => props.theme.surface};
  border: 1px solid ${props => props.theme.border};
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 12px;
  transition: box-shadow 0.2s ease;
  
  &:hover {
    box-shadow: 0 4px 12px ${props => props.theme.shadow};
  }
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`

const Symbol = styled.h3`
  color: ${props => props.theme.text};
  font-size: 16px;
  font-weight: 600;
  margin: 0;
`

const Price = styled.div<{ positive: boolean }>`
  color: ${props => props.positive ? props.theme.success : props.theme.danger};
  font-weight: 600;
  font-size: 16px;
`

const Details = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: ${props => props.theme.textSecondary};
`

const Change = styled.span<{ positive: boolean }>`
  color: ${props => props.positive ? props.theme.success : props.theme.danger};
`

interface StockCardProps {
  symbol: string
  price: number
  change: number
  changePercent: number
  volume?: number
}

const StockCard: React.FC<StockCardProps> = ({
  symbol,
  price,
  change,
  changePercent,
  volume
}) => {
  const isPositive = change >= 0

  return (
    <Card>
      <Header>
        <Symbol>{symbol}</Symbol>
        <Price positive={isPositive}>
          ${price.toFixed(2)}
        </Price>
      </Header>
      <Details>
        <Change positive={isPositive}>
          {isPositive ? '+' : ''}{change.toFixed(2)} ({isPositive ? '+' : ''}{changePercent.toFixed(2)}%)
        </Change>
        {volume && (
          <span>Vol: {volume.toLocaleString()}</span>
        )}
      </Details>
    </Card>
  )
}

export default StockCard