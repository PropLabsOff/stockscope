import React from 'react'
import styled from 'styled-components'

const ActionsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
`

const ActionButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 20px;
  background: ${props => props.theme.surface};
  border: 1px solid ${props => props.theme.border};
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${props => props.theme.gradientPrimary};
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover {
    color: white;
    transform: translateY(-4px);
    box-shadow: 0 8px 24px ${props => props.theme.shadowHover};
    border-color: ${props => props.theme.primary};
    
    &::before {
      opacity: 1;
    }
    
    ${ActionIcon}, ${ActionTitle}, ${ActionDescription} {
      position: relative;
      z-index: 1;
    }
  }
  
  &:active {
    transform: translateY(-2px);
  }
`

const ActionIcon = styled.div`
  font-size: 36px;
  margin-bottom: 12px;
  transition: transform 0.3s ease;
  
  ${ActionButton}:hover & {
    transform: scale(1.1) rotate(5deg);
  }
`

const ActionTitle = styled.div`
  font-weight: 700;
  font-size: 16px;
  margin-bottom: 6px;
  letter-spacing: -0.2px;
  color: ${props => props.theme.text};
  transition: color 0.3s ease;
`

const ActionDescription = styled.div`
  font-size: 12px;
  opacity: 0.7;
  text-align: center;
  color: ${props => props.theme.textSecondary};
  transition: color 0.3s ease;
`

const QuickActions: React.FC = () => {
  const actions = [
    {
      icon: '➕',
      title: 'Add Stock',
      description: 'Add a new stock to your portfolio'
    },
    {
      icon: '📊',
      title: 'View Charts',
      description: 'Analyze stock performance'
    },
    {
      icon: '🔔',
      title: 'Set Alert',
      description: 'Create price alerts'
    },
    {
      icon: '📰',
      title: 'Market News',
      description: 'Read latest market news'
    },
    {
      icon: '📈',
      title: 'Analytics',
      description: 'View portfolio analytics'
    },
    {
      icon: '💾',
      title: 'Export Data',
      description: 'Export portfolio data'
    }
  ]

  const handleActionClick = (action: string) => {
    // This would typically navigate to the appropriate page or open a modal
    console.log(`Action clicked: ${action}`)
  }

  return (
    <ActionsContainer>
      {actions.map((action, index) => (
        <ActionButton
          key={index}
          onClick={() => handleActionClick(action.title)}
        >
          <ActionIcon>{action.icon}</ActionIcon>
          <ActionTitle>{action.title}</ActionTitle>
          <ActionDescription>{action.description}</ActionDescription>
        </ActionButton>
      ))}
    </ActionsContainer>
  )
}

export default QuickActions