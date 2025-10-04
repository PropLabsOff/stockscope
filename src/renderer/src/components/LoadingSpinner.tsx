import React from 'react'
import styled, { keyframes } from 'styled-components'

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`

const SpinnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: ${props => props.theme.background};
`

const Spinner = styled.div`
  width: 50px;
  height: 50px;
  border: 4px solid ${props => props.theme.border};
  border-top: 4px solid ${props => props.theme.primary};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  margin-bottom: 20px;
`

const LoadingText = styled.h2`
  color: ${props => props.theme.text};
  font-weight: 300;
  margin-bottom: 10px;
`

const SubText = styled.p`
  color: ${props => props.theme.textSecondary};
  font-size: 14px;
`

const LoadingSpinner: React.FC = () => {
  return (
    <SpinnerContainer>
      <Spinner />
      <LoadingText>StockScope</LoadingText>
      <SubText>Loading your portfolio...</SubText>
    </SpinnerContainer>
  )
}

export default LoadingSpinner