import React, { useState } from 'react'
import styled from 'styled-components'
import { useAuth } from '../contexts/AuthContext'
import { useTheme } from '../contexts/ThemeContext'
import { useNotifications } from '../contexts/NotificationContext'

const SettingsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 800px;
  margin: 0 auto;
`

const Title = styled.h1`
  color: ${props => props.theme.text};
  font-size: 28px;
  font-weight: 600;
  margin: 0;
`

const SettingsSection = styled.div`
  background-color: ${props => props.theme.surface};
  border: 1px solid ${props => props.theme.border};
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px ${props => props.theme.shadow};
`

const SectionTitle = styled.h2`
  color: ${props => props.theme.text};
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 20px;
`

const SettingItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid ${props => props.theme.border};
  
  &:last-child {
    border-bottom: none;
  }
`

const SettingInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

const SettingLabel = styled.span`
  color: ${props => props.theme.text};
  font-weight: 500;
  font-size: 16px;
`

const SettingDescription = styled.span`
  color: ${props => props.theme.textSecondary};
  font-size: 14px;
`

const Toggle = styled.button<{ active: boolean }>`
  width: 50px;
  height: 24px;
  border-radius: 12px;
  border: none;
  background-color: ${props => props.active ? props.theme.primary : props.theme.border};
  position: relative;
  cursor: pointer;
  transition: background-color 0.2s ease;
  
  &::after {
    content: '';
    position: absolute;
    top: 2px;
    left: ${props => props.active ? '26px' : '2px'};
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: white;
    transition: left 0.2s ease;
  }
`

const Select = styled.select`
  padding: 8px 12px;
  border: 1px solid ${props => props.theme.border};
  border-radius: 6px;
  background-color: ${props => props.theme.background};
  color: ${props => props.theme.text};
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.primary};
  }
`

const Button = styled.button<{ variant?: 'primary' | 'danger' }>`
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;
  
  ${props => {
    if (props.variant === 'danger') {
      return `
        background-color: ${props.theme.danger};
        color: white;
        
        &:hover {
          opacity: 0.9;
        }
      `
    }
    return `
      background-color: ${props.theme.primary};
      color: white;
      
      &:hover {
        background-color: ${props.theme.primaryHover};
      }
    `
  }}
`

const Input = styled.input`
  padding: 8px 12px;
  border: 1px solid ${props => props.theme.border};
  border-radius: 6px;
  background-color: ${props => props.theme.background};
  color: ${props => props.theme.text};
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.primary};
  }
`

const Settings: React.FC = () => {
  const { user, logout } = useAuth()
  const { isDarkMode, toggleTheme } = useTheme()
  const { addNotification } = useNotifications()
  
  const [settings, setSettings] = useState({
    notifications: true,
    autoRefresh: true,
    refreshInterval: '5',
    priceAlerts: true,
    earningsReminders: true,
    marketNews: true,
    darkMode: isDarkMode,
    language: 'en',
    currency: 'USD'
  })

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }))
    
    if (key === 'darkMode') {
      toggleTheme()
    }
  }

  const handleExportData = async () => {
    try {
      if (window.electronAPI) {
        const result = await window.electronAPI.exportData(
          { settings, timestamp: new Date().toISOString() },
          'stockscope-settings.json'
        )
        
        if (result.success) {
          addNotification({
            title: 'Export Successful',
            message: 'Settings exported successfully',
            type: 'success',
            priority: 'medium'
          })
        } else {
          throw new Error(result.error)
        }
      } else {
        // Fallback for web version
        const dataStr = JSON.stringify(settings, null, 2)
        const dataBlob = new Blob([dataStr], { type: 'application/json' })
        const url = URL.createObjectURL(dataBlob)
        const link = document.createElement('a')
        link.href = url
        link.download = 'stockscope-settings.json'
        link.click()
        URL.revokeObjectURL(url)
        
        addNotification({
          title: 'Export Successful',
          message: 'Settings downloaded successfully',
          type: 'success',
          priority: 'medium'
        })
      }
    } catch (error: any) {
      addNotification({
        title: 'Export Failed',
        message: error.message || 'Failed to export settings',
        type: 'error',
        priority: 'high'
      })
    }
  }

  const handleImportData = async () => {
    try {
      if (window.electronAPI) {
        const result = await window.electronAPI.importData()
        
        if (result.success) {
          setSettings(prev => ({ ...prev, ...result.data }))
          addNotification({
            title: 'Import Successful',
            message: 'Settings imported successfully',
            type: 'success',
            priority: 'medium'
          })
        } else {
          throw new Error(result.error)
        }
      } else {
        // Fallback for web version
        const input = document.createElement('input')
        input.type = 'file'
        input.accept = '.json'
        input.onchange = (e) => {
          const file = (e.target as HTMLInputElement).files?.[0]
          if (file) {
            const reader = new FileReader()
            reader.onload = (e) => {
              try {
                const data = JSON.parse(e.target?.result as string)
                setSettings(prev => ({ ...prev, ...data }))
                addNotification({
                  title: 'Import Successful',
                  message: 'Settings imported successfully',
                  type: 'success',
                  priority: 'medium'
                })
              } catch (error) {
                addNotification({
                  title: 'Import Failed',
                  message: 'Invalid file format',
                  type: 'error',
                  priority: 'high'
                })
              }
            }
            reader.readAsText(file)
          }
        }
        input.click()
      }
    } catch (error: any) {
      addNotification({
        title: 'Import Failed',
        message: error.message || 'Failed to import settings',
        type: 'error',
        priority: 'high'
      })
    }
  }

  const handleLogout = async () => {
    try {
      await logout()
      addNotification({
        title: 'Logged Out',
        message: 'You have been successfully logged out',
        type: 'info',
        priority: 'medium'
      })
    } catch (error) {
      addNotification({
        title: 'Logout Failed',
        message: 'Failed to log out',
        type: 'error',
        priority: 'high'
      })
    }
  }

  return (
    <SettingsContainer>
      <Title>Settings</Title>

      <SettingsSection>
        <SectionTitle>Appearance</SectionTitle>
        
        <SettingItem>
          <SettingInfo>
            <SettingLabel>Dark Mode</SettingLabel>
            <SettingDescription>Switch between light and dark themes</SettingDescription>
          </SettingInfo>
          <Toggle 
            active={settings.darkMode} 
            onClick={() => handleSettingChange('darkMode', !settings.darkMode)}
          />
        </SettingItem>

        <SettingItem>
          <SettingInfo>
            <SettingLabel>Language</SettingLabel>
            <SettingDescription>Choose your preferred language</SettingDescription>
          </SettingInfo>
          <Select 
            value={settings.language} 
            onChange={(e) => handleSettingChange('language', e.target.value)}
          >
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
            <option value="de">Deutsch</option>
          </Select>
        </SettingItem>

        <SettingItem>
          <SettingInfo>
            <SettingLabel>Currency</SettingLabel>
            <SettingDescription>Default currency for price display</SettingDescription>
          </SettingInfo>
          <Select 
            value={settings.currency} 
            onChange={(e) => handleSettingChange('currency', e.target.value)}
          >
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
            <option value="GBP">GBP (£)</option>
            <option value="JPY">JPY (¥)</option>
          </Select>
        </SettingItem>
      </SettingsSection>

      <SettingsSection>
        <SectionTitle>Notifications</SectionTitle>
        
        <SettingItem>
          <SettingInfo>
            <SettingLabel>Enable Notifications</SettingLabel>
            <SettingDescription>Receive desktop notifications</SettingDescription>
          </SettingInfo>
          <Toggle 
            active={settings.notifications} 
            onClick={() => handleSettingChange('notifications', !settings.notifications)}
          />
        </SettingItem>

        <SettingItem>
          <SettingInfo>
            <SettingLabel>Price Alerts</SettingLabel>
            <SettingDescription>Get notified when stocks reach target prices</SettingDescription>
          </SettingInfo>
          <Toggle 
            active={settings.priceAlerts} 
            onClick={() => handleSettingChange('priceAlerts', !settings.priceAlerts)}
          />
        </SettingItem>

        <SettingItem>
          <SettingInfo>
            <SettingLabel>Earnings Reminders</SettingLabel>
            <SettingDescription>Remind me about upcoming earnings dates</SettingDescription>
          </SettingInfo>
          <Toggle 
            active={settings.earningsReminders} 
            onClick={() => handleSettingChange('earningsReminders', !settings.earningsReminders)}
          />
        </SettingItem>

        <SettingItem>
          <SettingInfo>
            <SettingLabel>Market News</SettingLabel>
            <SettingDescription>Receive notifications for important market news</SettingDescription>
          </SettingInfo>
          <Toggle 
            active={settings.marketNews} 
            onClick={() => handleSettingChange('marketNews', !settings.marketNews)}
          />
        </SettingItem>
      </SettingsSection>

      <SettingsSection>
        <SectionTitle>Data & Updates</SectionTitle>
        
        <SettingItem>
          <SettingInfo>
            <SettingLabel>Auto Refresh</SettingLabel>
            <SettingDescription>Automatically update stock prices</SettingDescription>
          </SettingInfo>
          <Toggle 
            active={settings.autoRefresh} 
            onClick={() => handleSettingChange('autoRefresh', !settings.autoRefresh)}
          />
        </SettingItem>

        <SettingItem>
          <SettingInfo>
            <SettingLabel>Refresh Interval</SettingLabel>
            <SettingDescription>How often to update data (minutes)</SettingDescription>
          </SettingInfo>
          <Select 
            value={settings.refreshInterval} 
            onChange={(e) => handleSettingChange('refreshInterval', e.target.value)}
          >
            <option value="1">1 minute</option>
            <option value="5">5 minutes</option>
            <option value="15">15 minutes</option>
            <option value="30">30 minutes</option>
            <option value="60">1 hour</option>
          </Select>
        </SettingItem>
      </SettingsSection>

      <SettingsSection>
        <SectionTitle>Data Management</SectionTitle>
        
        <SettingItem>
          <SettingInfo>
            <SettingLabel>Export Settings</SettingLabel>
            <SettingDescription>Download your settings as a JSON file</SettingDescription>
          </SettingInfo>
          <Button onClick={handleExportData}>
            Export
          </Button>
        </SettingItem>

        <SettingItem>
          <SettingInfo>
            <SettingLabel>Import Settings</SettingLabel>
            <SettingDescription>Import settings from a JSON file</SettingDescription>
          </SettingInfo>
          <Button onClick={handleImportData}>
            Import
          </Button>
        </SettingItem>
      </SettingsSection>

      <SettingsSection>
        <SectionTitle>Account</SectionTitle>
        
        <SettingItem>
          <SettingInfo>
            <SettingLabel>Email</SettingLabel>
            <SettingDescription>{user?.email || 'Not signed in'}</SettingDescription>
          </SettingInfo>
        </SettingItem>

        <SettingItem>
          <SettingInfo>
            <SettingLabel>Sign Out</SettingLabel>
            <SettingDescription>Sign out of your account</SettingDescription>
          </SettingInfo>
          <Button variant="danger" onClick={handleLogout}>
            Sign Out
          </Button>
        </SettingItem>
      </SettingsSection>
    </SettingsContainer>
  )
}

export default Settings