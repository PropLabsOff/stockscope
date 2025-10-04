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
  margin-left: ${props => props.sidebarOpen ? '250px' : '0'};
  transition: margin-left 0.3s ease;
  overflow: hidden;
`

const ContentArea = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  background-color: ${props => props.theme.background};
`

const lightTheme = {
  background: '#f5f5f5',
  surface: '#ffffff',
  text: '#333333',
  textSecondary: '#666666',
  primary: '#0066cc',
  primaryHover: '#0052a3',
  success: '#28a745',
  danger: '#dc3545',
  warning: '#ffc107',
  border: '#e0e0e0',
  shadow: 'rgba(0, 0, 0, 0.1)',
}

const darkTheme = {
  background: '#1a1a1a',
  surface: '#2d2d2d',
  text: '#e0e0e0',
  textSecondary: '#b0b0b0',
  primary: '#4a9eff',
  primaryHover: '#357abd',
  success: '#4caf50',
  danger: '#f44336',
  warning: '#ff9800',
  border: '#404040',
  shadow: 'rgba(0, 0, 0, 0.3)',
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