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
  background-color: ${props => props.theme.background};
`

const LoginCard = styled.div`
  background-color: ${props => props.theme.surface};
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 8px 32px ${props => props.theme.shadow};
  width: 100%;
  max-width: 400px;
  border: 1px solid ${props => props.theme.border};
`

const Title = styled.h1`
  text-align: center;
  color: ${props => props.theme.text};
  margin-bottom: 30px;
  font-size: 28px;
  font-weight: 600;
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
  padding: 12px 16px;
  border: 1px solid ${props => props.theme.border};
  border-radius: 8px;
  background-color: ${props => props.theme.background};
  color: ${props => props.theme.text};
  font-size: 16px;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.primary};
    box-shadow: 0 0 0 3px ${props => props.theme.primary}20;
  }
`

const Button = styled.button`
  padding: 12px 24px;
  background-color: ${props => props.theme.primary};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: ${props => props.theme.primaryHover};
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`

const SecondaryButton = styled.button`
  padding: 12px 24px;
  background-color: transparent;
  color: ${props => props.theme.text};
  border: 1px solid ${props => props.theme.border};
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: ${props => props.theme.border};
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
  margin-top: 20px;
  color: ${props => props.theme.textSecondary};
  font-size: 14px;
`

const ToggleButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.primary};
  cursor: pointer;
  text-decoration: underline;
  font-size: 14px;
  
  &:hover {
    opacity: 0.8;
  }
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
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <br />
            <ToggleButton onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? 'Sign Up' : 'Sign In'}
            </ToggleButton>
          </ToggleMode>
        </Form>
      </LoginCard>
    </LoginContainer>
  )
}

export default Login