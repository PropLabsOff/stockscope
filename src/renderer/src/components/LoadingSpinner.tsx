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
    animation: rotate 20s linear infinite;
  }
  
  @keyframes rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`

const Spinner = styled.div`
  width: 60px;
  height: 60px;
  border: 5px solid rgba(255, 255, 255, 0.2);
  border-top: 5px solid white;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  margin-bottom: 32px;
  position: relative;
  z-index: 1;
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
`

const LoadingText = styled.h2`
  background: linear-gradient(135deg, #ffffff 0%, rgba(255, 255, 255, 0.8) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 700;
  font-size: 32px;
  margin-bottom: 12px;
  letter-spacing: -0.5px;
  position: relative;
  z-index: 1;
`

const SubText = styled.p`
  color: rgba(255, 255, 255, 0.9);
  font-size: 15px;
  position: relative;
  z-index: 1;
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