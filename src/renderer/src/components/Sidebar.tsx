import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

const SidebarContainer = styled.aside<{ isOpen: boolean }>`
  position: fixed;
  left: 0;
  top: 60px;
  width: 250px;
  height: calc(100vh - 60px);
  background-color: ${props => props.theme.surface};
  border-right: 1px solid ${props => props.theme.border};
  transform: ${props => props.isOpen ? 'translateX(0)' : 'translateX(-100%)'};
  transition: transform 0.3s ease;
  z-index: 1000;
  overflow-y: auto;
`

const NavList = styled.ul`
  list-style: none;
  padding: 20px 0;
  margin: 0;
`

const NavItem = styled.li`
  margin: 0;
`

const NavLinkStyled = styled(NavLink)`
  display: flex;
  align-items: center;
  padding: 12px 20px;
  color: ${props => props.theme.text};
  text-decoration: none;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: ${props => props.theme.border};
  }
  
  &.active {
    background-color: ${props => props.theme.primary};
    color: white;
  }
`

const NavIcon = styled.span`
  font-size: 18px;
  margin-right: 12px;
  width: 20px;
  text-align: center;
`

const NavText = styled.span`
  font-weight: 500;
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