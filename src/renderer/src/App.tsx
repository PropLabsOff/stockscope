import React, { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components'
import { AuthProvider } from './contexts/AuthContext'
import { ThemeContext } from './contexts/ThemeContext'
import { NotificationProvider } from './contexts/NotificationContext'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import Portfolio from './pages/Portfolio'
import Analytics from './pages/Analytics'
import News from './pages/News'
import Notifications from './pages/Notifications'
import Settings from './pages/Settings'
import Login from './pages/Login'
import LoadingSpinner from './components/LoadingSpinner'

const GlobalStyle = createGlobalStyle<{ theme: any }>`
  body {
    background-color: ${props => props.theme.background};
    color: ${props => props.theme.text};
    transition: background-color 0.3s ease, color 0.3s ease;
  }
`

const AppContainer = styled.div<{ sidebarOpen: boolean }>`
  display: flex;
  height: 100vh;
  overflow: hidden;
`

const MainContent = styled.main<{ sidebarOpen: boolean }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: ${props => props.sidebarOpen ? '280px' : '0'};
  transition: margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  
  @media (max-width: 768px) {
    margin-left: 0;
  }
`

const ContentArea = styled.div`
  flex: 1;
  padding: 32px;
  overflow-y: auto;
  background: ${props => props.theme.background};
  
  @media (max-width: 768px) {
    padding: 20px;
  }
`

const lightTheme = {
  background: '#f8fafc',
  backgroundSecondary: '#f1f5f9',
  surface: '#ffffff',
  surfaceElevated: '#ffffff',
  text: '#0f172a',
  textSecondary: '#64748b',
  textTertiary: '#94a3b8',
  primary: '#3b82f6',
  primaryHover: '#2563eb',
  primaryLight: '#dbeafe',
  success: '#10b981',
  successLight: '#d1fae5',
  danger: '#ef4444',
  dangerLight: '#fee2e2',
  warning: '#f59e0b',
  warningLight: '#fef3c7',
  border: '#e2e8f0',
  borderLight: '#f1f5f9',
  shadow: 'rgba(0, 0, 0, 0.08)',
  shadowHover: 'rgba(0, 0, 0, 0.12)',
  gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  gradientPrimary: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
  gradientSuccess: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
  gradientDanger: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
}

const darkTheme = {
  background: '#0f172a',
  backgroundSecondary: '#1e293b',
  surface: '#1e293b',
  surfaceElevated: '#334155',
  text: '#f1f5f9',
  textSecondary: '#cbd5e1',
  textTertiary: '#94a3b8',
  primary: '#60a5fa',
  primaryHover: '#3b82f6',
  primaryLight: '#1e3a8a',
  success: '#34d399',
  successLight: '#065f46',
  danger: '#f87171',
  dangerLight: '#991b1b',
  warning: '#fbbf24',
  warningLight: '#92400e',
  border: '#334155',
  borderLight: '#475569',
  shadow: 'rgba(0, 0, 0, 0.4)',
  shadowHover: 'rgba(0, 0, 0, 0.6)',
  gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  gradientPrimary: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)',
  gradientSuccess: 'linear-gradient(135deg, #34d399 0%, #10b981 100%)',
  gradientDanger: 'linear-gradient(135deg, #f87171 0%, #ef4444 100%)',
}

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme === 'dark') {
      setIsDarkMode(true)
    }
    
    // Simulate initial loading
    setTimeout(() => {
      setIsLoading(false)
    }, 1500)
  }, [])

  const toggleTheme = () => {
    const newTheme = !isDarkMode
    setIsDarkMode(newTheme)
    localStorage.setItem('theme', newTheme ? 'dark' : 'light')
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  if (isLoading) {
    return <LoadingSpinner />
  }

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <GlobalStyle />
      <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
        <AuthProvider>
          <NotificationProvider>
            <AppContainer sidebarOpen={sidebarOpen}>
              <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />
              <MainContent sidebarOpen={sidebarOpen}>
                <Header onToggleSidebar={toggleSidebar} />
                <ContentArea>
                  <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/portfolio" element={<Portfolio />} />
                    <Route path="/analytics" element={<Analytics />} />
                    <Route path="/news" element={<News />} />
                    <Route path="/notifications" element={<Notifications />} />
                    <Route path="/settings" element={<Settings />} />
                  </Routes>
                </ContentArea>
              </MainContent>
            </AppContainer>
          </NotificationProvider>
        </AuthProvider>
      </ThemeContext.Provider>
    </ThemeProvider>
  )
}

export default App