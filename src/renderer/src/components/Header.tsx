import React from 'react'
import styled from 'styled-components'
import { useAuth } from '../contexts/AuthContext'
import { useNotifications } from '../contexts/NotificationContext'
import { useTheme } from '../contexts/ThemeContext'

const HeaderContainer = styled.header`
  background: ${props => props.theme.surface};
  backdrop-filter: blur(10px);
  border-bottom: 1px solid ${props => props.theme.border};
  padding: 0 24px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 1px 3px ${props => props.theme.shadow};
  position: sticky;
  top: 0;
  z-index: 100;
`

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`

const MenuButton = styled.button`
  background: none;
  border: none;
  font-size: 22px;
  cursor: pointer;
  color: ${props => props.theme.text};
  padding: 10px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${props => props.theme.backgroundSecondary};
    transform: scale(1.05);
  }
  
  &:active {
    transform: scale(0.95);
  }
`

const Logo = styled.h1`
  background: ${props => props.theme.gradientPrimary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-size: 26px;
  font-weight: 700;
  margin: 0;
  letter-spacing: -0.5px;
`

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`

const NotificationButton = styled.button<{ hasUnread: boolean }>`
  background: none;
  border: none;
  font-size: 22px;
  cursor: pointer;
  color: ${props => props.theme.text};
  padding: 10px;
  border-radius: 8px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${props => props.theme.backgroundSecondary};
    transform: scale(1.05);
  }
  
  &:active {
    transform: scale(0.95);
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 8px;
    right: 8px;
    width: 10px;
    height: 10px;
    background: ${props => props.hasUnread ? props.theme.gradientDanger : 'transparent'};
    border-radius: 50%;
    border: 2px solid ${props => props.theme.surface};
    box-shadow: 0 0 0 2px ${props => props.hasUnread ? props.theme.danger : 'transparent'};
    animation: ${props => props.hasUnread ? 'pulse 2s infinite' : 'none'};
  }
  
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.7; }
  }
`

const ThemeButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: ${props => props.theme.text};
  padding: 10px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${props => props.theme.backgroundSecondary};
    transform: scale(1.05) rotate(15deg);
  }
  
  &:active {
    transform: scale(0.95);
  }
`

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  color: ${props => props.theme.text};
  font-size: 14px;
  font-weight: 500;
  
  @media (max-width: 768px) {
    span {
      display: none;
    }
  }
`

const UserAvatar = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: ${props => props.theme.gradientPrimary};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 14px;
`

const LogoutButton = styled.button`
  background: ${props => props.theme.gradientDanger};
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px ${props => props.theme.shadow};
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 8px ${props => props.theme.shadowHover};
  }
  
  &:active {
    transform: translateY(0);
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
            <UserAvatar>
              {user.email?.charAt(0).toUpperCase() || 'U'}
            </UserAvatar>
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