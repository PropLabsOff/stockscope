import React, { useState } from 'react'
import styled from 'styled-components'
import { useNotifications, Notification } from '../contexts/NotificationContext'

const NotificationsContainer = styled.div`
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

const ActionButton = styled.button`
  background-color: ${props => props.theme.primary};
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: ${props => props.theme.primaryHover};
  }
`

const FilterContainer = styled.div`
  display: flex;
  gap: 12px;
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

const NotificationsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const NotificationCard = styled.div<{ read: boolean }>`
  background-color: ${props => props.theme.surface};
  border: 1px solid ${props => props.theme.border};
  border-radius: 8px;
  padding: 16px;
  opacity: ${props => props.read ? 0.7 : 1};
  transition: all 0.2s ease;
  
  &:hover {
    box-shadow: 0 2px 8px ${props => props.theme.shadow};
  }
`

const NotificationHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
`

const NotificationTitle = styled.h3<{ type: string }>`
  color: ${props => {
    switch (props.type) {
      case 'success': return props.theme.success
      case 'error': return props.theme.danger
      case 'warning': return props.theme.warning
      default: return props.theme.text
    }
  }};
  font-size: 16px;
  font-weight: 600;
  margin: 0;
`

const NotificationTime = styled.span`
  color: ${props => props.theme.textSecondary};
  font-size: 12px;
`

const NotificationMessage = styled.p`
  color: ${props => props.theme.text};
  font-size: 14px;
  line-height: 1.5;
  margin-bottom: 12px;
`

const NotificationActions = styled.div`
  display: flex;
  gap: 8px;
`

const SmallButton = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
  
  ${props => props.variant === 'primary' ? `
    background-color: ${props.theme.primary};
    color: white;
    
    &:hover {
      background-color: ${props.theme.primaryHover};
    }
  ` : `
    background-color: transparent;
    color: ${props.theme.text};
    border: 1px solid ${props.theme.border};
    
    &:hover {
      background-color: ${props.theme.border};
    }
  `}
`

const PriorityBadge = styled.span<{ priority: string }>`
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  
  ${props => {
    switch (props.priority) {
      case 'high': return `
        background-color: ${props.theme.danger}20;
        color: ${props.theme.danger};
      `
      case 'medium': return `
        background-color: ${props.theme.warning}20;
        color: ${props.theme.warning};
      `
      default: return `
        background-color: ${props.theme.textSecondary}20;
        color: ${props.theme.textSecondary};
      `
    }
  }}
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
  margin: 0;
`

const Notifications: React.FC = () => {
  const { 
    notifications, 
    markAsRead, 
    markAllAsRead, 
    removeNotification, 
    clearAllNotifications 
  } = useNotifications()
  
  const [filter, setFilter] = useState<'all' | 'unread' | 'high'>('all')

  const filteredNotifications = notifications.filter(notification => {
    switch (filter) {
      case 'unread': return !notification.read
      case 'high': return notification.priority === 'high'
      default: return true
    }
  })

  const formatTime = (timestamp: Date) => {
    const now = new Date()
    const diff = now.getTime() - timestamp.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (days > 0) return `${days}d ago`
    if (hours > 0) return `${hours}h ago`
    if (minutes > 0) return `${minutes}m ago`
    return 'Just now'
  }

  const unreadCount = notifications.filter(n => !n.read).length
  const highPriorityCount = notifications.filter(n => n.priority === 'high').length

  return (
    <NotificationsContainer>
      <Header>
        <Title>Notifications</Title>
        <ActionButton onClick={markAllAsRead}>
          Mark All as Read
        </ActionButton>
      </Header>

      <FilterContainer>
        <FilterButton active={filter === 'all'} onClick={() => setFilter('all')}>
          All ({notifications.length})
        </FilterButton>
        <FilterButton active={filter === 'unread'} onClick={() => setFilter('unread')}>
          Unread ({unreadCount})
        </FilterButton>
        <FilterButton active={filter === 'high'} onClick={() => setFilter('high')}>
          High Priority ({highPriorityCount})
        </FilterButton>
      </FilterContainer>

      {filteredNotifications.length === 0 ? (
        <EmptyState>
          <EmptyIcon>🔔</EmptyIcon>
          <EmptyTitle>No notifications</EmptyTitle>
          <EmptyDescription>
            {filter === 'all' 
              ? "You're all caught up! No notifications to show."
              : `No ${filter} notifications found.`
            }
          </EmptyDescription>
        </EmptyState>
      ) : (
        <NotificationsList>
          {filteredNotifications.map((notification) => (
            <NotificationCard key={notification.id} read={notification.read}>
              <NotificationHeader>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <NotificationTitle type={notification.type}>
                    {notification.title}
                  </NotificationTitle>
                  <PriorityBadge priority={notification.priority}>
                    {notification.priority}
                  </PriorityBadge>
                </div>
                <NotificationTime>
                  {formatTime(notification.timestamp)}
                </NotificationTime>
              </NotificationHeader>
              
              <NotificationMessage>
                {notification.message}
              </NotificationMessage>
              
              <NotificationActions>
                {!notification.read && (
                  <SmallButton onClick={() => markAsRead(notification.id)}>
                    Mark as Read
                  </SmallButton>
                )}
                <SmallButton 
                  variant="secondary" 
                  onClick={() => removeNotification(notification.id)}
                >
                  Dismiss
                </SmallButton>
              </NotificationActions>
            </NotificationCard>
          ))}
        </NotificationsList>
      )}
    </NotificationsContainer>
  )
}

export default Notifications