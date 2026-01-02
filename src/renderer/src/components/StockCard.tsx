import React from 'react'
import styled from 'styled-components'

const Card = styled.div`
  background: ${props => props.theme.surface};
  border: 1px solid ${props => props.theme.border};
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 16px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${props => props.theme.gradientPrimary};
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }
  
  &:hover {
    box-shadow: 0 8px 24px ${props => props.theme.shadowHover};
    transform: translateY(-4px);
    border-color: ${props => props.theme.primary};
    
    &::before {
      transform: scaleX(1);
    }
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
  font-size: 18px;
  font-weight: 700;
  margin: 0;
  letter-spacing: -0.3px;
`

const Price = styled.div<{ positive: boolean }>`
  background: ${props => props.positive ? props.theme.gradientSuccess : props.theme.gradientDanger};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 700;
  font-size: 20px;
  letter-spacing: -0.3px;
`

const Details = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  color: ${props => props.theme.textSecondary};
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid ${props => props.theme.borderLight};
`

const Change = styled.span<{ positive: boolean }>`
  background: ${props => props.positive ? props.theme.successLight : props.theme.dangerLight};
  color: ${props => props.positive ? props.theme.success : props.theme.danger};
  padding: 4px 10px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 13px;
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