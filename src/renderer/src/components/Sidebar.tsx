import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

const SidebarContainer = styled.aside<{ isOpen: boolean }>`
  position: fixed;
  left: 0;
  top: 70px;
  width: 280px;
  height: calc(100vh - 70px);
  background: ${props => props.theme.surface};
  backdrop-filter: blur(10px);
  border-right: 1px solid ${props => props.theme.border};
  transform: ${props => props.isOpen ? 'translateX(0)' : 'translateX(-100%)'};
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1000;
  overflow-y: auto;
  box-shadow: 2px 0 8px ${props => props.theme.shadow};
`

const NavList = styled.ul`
  list-style: none;
  padding: 16px 12px;
  margin: 0;
`

const NavItem = styled.li`
  margin: 0;
`

const NavLinkStyled = styled(NavLink)`
  display: flex;
  align-items: center;
  padding: 14px 16px;
  color: ${props => props.theme.text};
  text-decoration: none;
  border-radius: 12px;
  margin-bottom: 4px;
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 4px;
    background: ${props => props.theme.gradientPrimary};
    transform: scaleY(0);
    transition: transform 0.2s ease;
  }
  
  &:hover {
    background-color: ${props => props.theme.backgroundSecondary};
    transform: translateX(4px);
  }
  
  &.active {
    background: ${props => props.theme.gradientPrimary};
    color: white;
    box-shadow: 0 4px 12px ${props => props.theme.shadow};
    
    &::before {
      transform: scaleY(1);
    }
    
    ${NavIcon} {
      transform: scale(1.1);
    }
  }
`

const NavIcon = styled.span`
  font-size: 20px;
  margin-right: 14px;
  width: 24px;
  text-align: center;
  transition: transform 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
`

const NavText = styled.span`
  font-weight: 600;
  font-size: 15px;
  letter-spacing: -0.2px;
`

interface SidebarProps {
  isOpen: boolean
  onToggle: () => void
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle }) => {
  const navItems = [
    { path: '/', icon: '📊', text: 'Dashboard' },
    { path: '/portfolio', icon: '💼', text: 'Portfolio' },
    { path: '/analytics', icon: '📈', text: 'Analytics' },
    { path: '/news', icon: '📰', text: 'News' },
    { path: '/notifications', icon: '🔔', text: 'Notifications' },
    { path: '/settings', icon: '⚙️', text: 'Settings' },
  ]

  return (
    <SidebarContainer isOpen={isOpen}>
      <NavList>
        {navItems.map((item) => (
          <NavItem key={item.path}>
            <NavLinkStyled to={item.path}>
              <NavIcon>{item.icon}</NavIcon>
              <NavText>{item.text}</NavText>
            </NavLinkStyled>
          </NavItem>
        ))}
      </NavList>
    </SidebarContainer>
  )
}

export default Sidebar