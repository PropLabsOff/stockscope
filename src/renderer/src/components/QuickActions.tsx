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
  padding: 20px;
  background-color: ${props => props.theme.background};
  border: 1px solid ${props => props.theme.border};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${props => props.theme.primary};
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px ${props => props.theme.shadow};
  }
`

const ActionIcon = styled.div`
  font-size: 32px;
  margin-bottom: 12px;
`

const ActionTitle = styled.div`
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 4px;
`

const ActionDescription = styled.div`
  font-size: 12px;
  opacity: 0.8;
  text-align: center;
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