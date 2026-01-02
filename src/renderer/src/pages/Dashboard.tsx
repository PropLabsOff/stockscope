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
  gap: 24px;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 4px;
`

const WelcomeSection = styled.div`
  background: ${props => props.theme.gradientPrimary};
  padding: 40px;
  border-radius: 20px;
  border: none;
  box-shadow: 0 8px 24px ${props => props.theme.shadow};
  color: white;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
    animation: rotate 20s linear infinite;
  }
  
  @keyframes rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`

const WelcomeContent = styled.div`
  position: relative;
  z-index: 1;
`

const WelcomeTitle = styled.h1`
  color: white;
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 12px;
  letter-spacing: -0.5px;
`

const WelcomeSubtitle = styled.p`
  color: rgba(255, 255, 255, 0.9);
  font-size: 18px;
  margin: 0;
  font-weight: 400;
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
  background: ${props => props.theme.surface};
  padding: 28px;
  border-radius: 16px;
  border: 1px solid ${props => props.theme.border};
  box-shadow: 0 4px 12px ${props => props.theme.shadow};
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: 0 8px 20px ${props => props.theme.shadowHover};
    transform: translateY(-2px);
  }
`

const SectionTitle = styled.h2`
  color: ${props => props.theme.text};
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 24px;
  letter-spacing: -0.3px;
  display: flex;
  align-items: center;
  gap: 12px;
  
  &::after {
    content: '';
    flex: 1;
    height: 2px;
    background: ${props => props.theme.gradientPrimary};
    opacity: 0.2;
  }
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
        <WelcomeContent>
          <WelcomeTitle>Welcome to StockScope</WelcomeTitle>
          <WelcomeSubtitle>Please sign in to access your portfolio</WelcomeSubtitle>
        </WelcomeContent>
      </WelcomeSection>
      </DashboardContainer>
    )
  }

  if (loading) {
    return (
      <DashboardContainer>
      <WelcomeSection>
        <WelcomeContent>
          <WelcomeTitle>Welcome back, {user.email}!</WelcomeTitle>
          <WelcomeSubtitle>Loading your portfolio data...</WelcomeSubtitle>
        </WelcomeContent>
      </WelcomeSection>
        <LoadingMessage>Fetching latest market data...</LoadingMessage>
      </DashboardContainer>
    )
  }

  return (
    <DashboardContainer>
      <WelcomeSection>
        <WelcomeContent>
          <WelcomeTitle>Welcome back, {user.email}!</WelcomeTitle>
          <WelcomeSubtitle>Here's your portfolio overview</WelcomeSubtitle>
        </WelcomeContent>
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