import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import styled from 'styled-components'
import { useAuth } from '../contexts/AuthContext'
import { useNotifications } from '../contexts/NotificationContext'

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: ${props => props.theme.gradient};
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
    animation: rotate 30s linear infinite;
  }
  
  @keyframes rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`

const LoginCard = styled.div`
  background: ${props => props.theme.surface};
  backdrop-filter: blur(20px);
  padding: 48px;
  border-radius: 24px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  width: 100%;
  max-width: 440px;
  border: 1px solid ${props => props.theme.border};
  position: relative;
  z-index: 1;
`

const Title = styled.h1`
  text-align: center;
  background: ${props => props.theme.gradientPrimary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 8px;
  font-size: 36px;
  font-weight: 700;
  letter-spacing: -0.5px;
`

const Subtitle = styled.p`
  text-align: center;
  color: ${props => props.theme.textSecondary};
  margin-bottom: 40px;
  font-size: 15px;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const Label = styled.label`
  color: ${props => props.theme.text};
  font-weight: 500;
  font-size: 14px;
`

const Input = styled.input`
  padding: 14px 18px;
  border: 2px solid ${props => props.theme.border};
  border-radius: 12px;
  background: ${props => props.theme.backgroundSecondary};
  color: ${props => props.theme.text};
  font-size: 15px;
  transition: all 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.primary};
    background: ${props => props.theme.surface};
    box-shadow: 0 0 0 4px ${props => props.theme.primaryLight}40;
  }
  
  &::placeholder {
    color: ${props => props.theme.textTertiary};
  }
`

const Button = styled.button`
  padding: 14px 24px;
  background: ${props => props.theme.gradientPrimary};
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px ${props => props.theme.shadow};
  letter-spacing: -0.2px;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px ${props => props.theme.shadowHover};
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`

const SecondaryButton = styled.button`
  padding: 0;
  background: none;
  border: none;
  color: ${props => props.theme.primary};
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: underline;
  text-underline-offset: 4px;
  
  &:hover {
    color: ${props => props.theme.primaryHover};
    text-decoration-thickness: 2px;
  }
`

const ErrorMessage = styled.div`
  color: ${props => props.theme.danger};
  font-size: 14px;
  text-align: center;
  padding: 10px;
  background-color: ${props => props.theme.danger}20;
  border-radius: 8px;
  border: 1px solid ${props => props.theme.danger};
`

const ToggleMode = styled.div`
  text-align: center;
  margin-top: 24px;
  color: ${props => props.theme.textSecondary};
  font-size: 14px;
  line-height: 1.6;
`

const Login: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const { user, signIn, signUp } = useAuth()
  const { addNotification } = useNotifications()

  if (user) {
    return <Navigate to="/" replace />
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      if (isLogin) {
        await signIn(email, password)
        addNotification({
          title: 'Welcome back!',
          message: 'Successfully logged in to StockScope',
          type: 'success',
          priority: 'medium'
        })
      } else {
        await signUp(email, password)
        addNotification({
          title: 'Account created!',
          message: 'Welcome to StockScope',
          type: 'success',
          priority: 'medium'
        })
      }
    } catch (error: any) {
      setError(error.message || 'An error occurred')
      addNotification({
        title: 'Authentication Error',
        message: error.message || 'An error occurred',
        type: 'error',
        priority: 'high'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <LoginContainer>
      <LoginCard>
        <Title>StockScope</Title>
        <Subtitle>Your portfolio at a glance</Subtitle>
        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <Label>Email</Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </InputGroup>
          
          <InputGroup>
            <Label>Password</Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </InputGroup>
          
          {error && <ErrorMessage>{error}</ErrorMessage>}
          
          <Button type="submit" disabled={loading}>
            {loading ? 'Loading...' : (isLogin ? 'Sign In' : 'Sign Up')}
          </Button>
          
          <ToggleMode>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <SecondaryButton onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? 'Sign Up' : 'Sign In'}
            </SecondaryButton>
          </ToggleMode>
        </Form>
      </LoginCard>
    </LoginContainer>
  )
}

export default Login