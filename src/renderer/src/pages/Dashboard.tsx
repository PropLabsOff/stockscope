import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useAuth } from '../contexts/AuthContext'
import { useNotifications } from '../contexts/NotificationContext'
import StockCard from '../components/StockCard'
import MarketOverview from '../components/MarketOverview'
import PortfolioSummary from '../components/PortfolioSummary'
import QuickActions from '../components/QuickActions'

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
`

const WelcomeSection = styled.div`
  background-color: ${props => props.theme.surface};
  padding: 30px;
  border-radius: 12px;
  border: 1px solid ${props => props.theme.border};
  box-shadow: 0 2px 8px ${props => props.theme.shadow};
`

const WelcomeTitle = styled.h1`
  color: ${props => props.theme.text};
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 10px;
`

const WelcomeSubtitle = styled.p`
  color: ${props => props.theme.textSecondary};
  font-size: 16px;
  margin: 0;
`

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const Section = styled.div`
  background-color: ${props => props.theme.surface};
  padding: 20px;
  border-radius: 12px;
  border: 1px solid ${props => props.theme.border};
  box-shadow: 0 2px 8px ${props => props.theme.shadow};
`

const SectionTitle = styled.h2`
  color: ${props => props.theme.text};
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 20px;
`

const LoadingMessage = styled.div`
  text-align: center;
  color: ${props => props.theme.textSecondary};
  padding: 40px;
  font-size: 16px;
`

const Dashboard: React.FC = () => {
  const { user, userData } = useAuth()
  const { addNotification } = useNotifications()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading market data
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (!user) {
    return (
      <DashboardContainer>
        <WelcomeSection>
          <WelcomeTitle>Welcome to StockScope</WelcomeTitle>
          <WelcomeSubtitle>Please sign in to access your portfolio</WelcomeSubtitle>
        </WelcomeSection>
      </DashboardContainer>
    )
  }

  if (loading) {
    return (
      <DashboardContainer>
        <WelcomeSection>
          <WelcomeTitle>Welcome back, {user.email}!</WelcomeTitle>
          <WelcomeSubtitle>Loading your portfolio data...</WelcomeSubtitle>
        </WelcomeSection>
        <LoadingMessage>Fetching latest market data...</LoadingMessage>
      </DashboardContainer>
    )
  }

  return (
    <DashboardContainer>
      <WelcomeSection>
        <WelcomeTitle>Welcome back, {user.email}!</WelcomeTitle>
        <WelcomeSubtitle>Here's your portfolio overview</WelcomeSubtitle>
      </WelcomeSection>

      <GridContainer>
        <Section>
          <SectionTitle>Portfolio Summary</SectionTitle>
          <PortfolioSummary />
        </Section>

        <Section>
          <SectionTitle>Market Overview</SectionTitle>
          <MarketOverview />
        </Section>
      </GridContainer>

      <Section>
        <SectionTitle>Quick Actions</SectionTitle>
        <QuickActions />
      </Section>

      <Section>
        <SectionTitle>Recent Activity</SectionTitle>
        <div style={{ color: '#666', textAlign: 'center', padding: '20px' }}>
          No recent activity to display
        </div>
      </Section>
    </DashboardContainer>
  )
}

export default Dashboard