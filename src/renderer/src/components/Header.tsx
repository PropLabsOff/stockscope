import React from 'react'
import styled from 'styled-components'
import { useAuth } from '../contexts/AuthContext'
import { useNotifications } from '../contexts/NotificationContext'
import { useTheme } from '../contexts/ThemeContext'

const HeaderContainer = styled.header`
  background-color: ${props => props.theme.surface};
  border-bottom: 1px solid ${props => props.theme.border};
  padding: 0 20px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 4px ${props => props.theme.shadow};
`

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`

const MenuButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: ${props => props.theme.text};
  padding: 8px;
  border-radius: 4px;
  
  &:hover {
    background-color: ${props => props.theme.border};
  }
`

const Logo = styled.h1`
  color: ${props => props.theme.primary};
  font-size: 24px;
  font-weight: 600;
  margin: 0;
`

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`

const NotificationButton = styled.button<{ hasUnread: boolean }>`
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: ${props => props.theme.text};
  padding: 8px;
  border-radius: 4px;
  position: relative;
  
  &:hover {
    background-color: ${props => props.theme.border};
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 5px;
    right: 5px;
    width: 8px;
    height: 8px;
    background-color: ${props => props.hasUnread ? props.theme.danger : 'transparent'};
    border-radius: 50%;
  }
`

const ThemeButton = styled.button`
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: ${props => props.theme.text};
  padding: 8px;
  border-radius: 4px;
  
  &:hover {
    background-color: ${props => props.theme.border};
  }
`

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: ${props => props.theme.text};
`

const LogoutButton = styled.button`
  background-color: ${props => props.theme.danger};
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  
  &:hover {
    opacity: 0.9;
  }
`

interface HeaderProps {
  onToggleSidebar: () => void
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
  const { user, logout } = useAuth()
  const { unreadCount } = useNotifications()
  const { isDarkMode, toggleTheme } = useTheme()

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return (
    <HeaderContainer>
      <LeftSection>
        <MenuButton onClick={onToggleSidebar}>
          ☰
        </MenuButton>
        <Logo>StockScope</Logo>
      </LeftSection>
      
      <RightSection>
        <NotificationButton hasUnread={unreadCount > 0}>
          🔔
        </NotificationButton>
        
        <ThemeButton onClick={toggleTheme}>
          {isDarkMode ? '☀️' : '🌙'}
        </ThemeButton>
        
        {user && (
          <UserInfo>
            <span>{user.email}</span>
            <LogoutButton onClick={handleLogout}>
              Logout
            </LogoutButton>
          </UserInfo>
        )}
      </RightSection>
    </HeaderContainer>
  )
}

export default Header