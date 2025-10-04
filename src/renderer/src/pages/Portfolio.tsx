import React, { useState } from 'react'
import styled from 'styled-components'
import { useAuth } from '../contexts/AuthContext'
import { useNotifications } from '../contexts/NotificationContext'
import StockCard from '../components/StockCard'
import AddStockModal from '../components/AddStockModal'

const PortfolioContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`

const Title = styled.h1`
  color: ${props => props.theme.text};
  font-size: 28px;
  font-weight: 600;
  margin: 0;
`

const AddButton = styled.button`
  background-color: ${props => props.theme.primary};
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: ${props => props.theme.primaryHover};
  }
`

const FiltersContainer = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 20px;
  flex-wrap: wrap;
`

const FilterButton = styled.button<{ active: boolean }>`
  padding: 8px 16px;
  border: 1px solid ${props => props.active ? props.theme.primary : props.theme.border};
  border-radius: 20px;
  background-color: ${props => props.active ? props.theme.primary : 'transparent'};
  color: ${props => props.active ? 'white' : props.theme.text};
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: ${props => props.theme.primary};
    background-color: ${props => props.active ? props.theme.primary : props.theme.primary}20;
  }
`

const StocksGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
`

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: ${props => props.theme.textSecondary};
`

const EmptyIcon = styled.div`
  font-size: 64px;
  margin-bottom: 20px;
`

const EmptyTitle = styled.h2`
  color: ${props => props.theme.text};
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 10px;
`

const EmptyDescription = styled.p`
  font-size: 16px;
  margin-bottom: 30px;
`

const Portfolio: React.FC = () => {
  const { userData, updateUserData } = useAuth()
  const { addNotification } = useNotifications()
  const [showAddModal, setShowAddModal] = useState(false)
  const [filter, setFilter] = useState<'all' | 'watchlist' | 'bought' | 'sold'>('all')

  // Mock portfolio data for demonstration
  const mockStocks = [
    {
      symbol: 'AAPL',
      price: 175.43,
      change: 2.15,
      changePercent: 1.24,
      volume: 45678900,
      status: 'bought' as const,
      shares: 50,
      costBasis: 150.00
    },
    {
      symbol: 'GOOGL',
      price: 142.67,
      change: -1.23,
      changePercent: -0.85,
      volume: 23456700,
      status: 'watchlist' as const,
      shares: 0,
      costBasis: 0
    },
    {
      symbol: 'MSFT',
      price: 378.85,
      change: 5.67,
      changePercent: 1.52,
      volume: 34567800,
      status: 'bought' as const,
      shares: 25,
      costBasis: 350.00
    },
    {
      symbol: 'TSLA',
      price: 248.50,
      change: -8.90,
      changePercent: -3.46,
      volume: 67890100,
      status: 'sold' as const,
      shares: 0,
      costBasis: 0
    }
  ]

  const filteredStocks = mockStocks.filter(stock => {
    if (filter === 'all') return true
    return stock.status === filter
  })

  const handleAddStock = async (stockData: any) => {
    try {
      // In a real app, this would add the stock to the user's portfolio
      addNotification({
        title: 'Stock Added',
        message: `${stockData.symbol} has been added to your portfolio`,
        type: 'success',
        priority: 'medium'
      })
      setShowAddModal(false)
    } catch (error) {
      addNotification({
        title: 'Error',
        message: 'Failed to add stock to portfolio',
        type: 'error',
        priority: 'high'
      })
    }
  }

  if (!userData) {
    return (
      <PortfolioContainer>
        <EmptyState>
          <EmptyIcon>📊</EmptyIcon>
          <EmptyTitle>Welcome to StockScope</EmptyTitle>
          <EmptyDescription>Sign in to view your portfolio</EmptyDescription>
        </EmptyState>
      </PortfolioContainer>
    )
  }

  return (
    <PortfolioContainer>
      <Header>
        <Title>My Portfolio</Title>
        <AddButton onClick={() => setShowAddModal(true)}>
          Add Stock
        </AddButton>
      </Header>

      <FiltersContainer>
        <FilterButton active={filter === 'all'} onClick={() => setFilter('all')}>
          All ({mockStocks.length})
        </FilterButton>
        <FilterButton active={filter === 'watchlist'} onClick={() => setFilter('watchlist')}>
          Watchlist ({mockStocks.filter(s => s.status === 'watchlist').length})
        </FilterButton>
        <FilterButton active={filter === 'bought'} onClick={() => setFilter('bought')}>
          Bought ({mockStocks.filter(s => s.status === 'bought').length})
        </FilterButton>
        <FilterButton active={filter === 'sold'} onClick={() => setFilter('sold')}>
          Sold ({mockStocks.filter(s => s.status === 'sold').length})
        </FilterButton>
      </FiltersContainer>

      {filteredStocks.length === 0 ? (
        <EmptyState>
          <EmptyIcon>📈</EmptyIcon>
          <EmptyTitle>No stocks found</EmptyTitle>
          <EmptyDescription>
            {filter === 'all' 
              ? "Your portfolio is empty. Add some stocks to get started!"
              : `No stocks with status "${filter}" found.`
            }
          </EmptyDescription>
          {filter === 'all' && (
            <AddButton onClick={() => setShowAddModal(true)}>
              Add Your First Stock
            </AddButton>
          )}
        </EmptyState>
      ) : (
        <StocksGrid>
          {filteredStocks.map((stock) => (
            <StockCard
              key={stock.symbol}
              symbol={stock.symbol}
              price={stock.price}
              change={stock.change}
              changePercent={stock.changePercent}
              volume={stock.volume}
            />
          ))}
        </StocksGrid>
      )}

      {showAddModal && (
        <AddStockModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddStock}
        />
      )}
    </PortfolioContainer>
  )
}

export default Portfolio