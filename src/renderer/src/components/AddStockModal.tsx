import React, { useState } from 'react'
import styled from 'styled-components'

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: fadeIn 0.2s ease;
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`

const ModalContent = styled.div`
  background: ${props => props.theme.surface};
  border-radius: 24px;
  padding: 36px;
  width: 90%;
  max-width: 520px;
  border: 1px solid ${props => props.theme.border};
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
  animation: slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`

const ModalTitle = styled.h2`
  background: ${props => props.theme.gradientPrimary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-size: 28px;
  font-weight: 700;
  margin: 0;
  letter-spacing: -0.5px;
`

const CloseButton = styled.button`
  background: ${props => props.theme.backgroundSecondary};
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: ${props => props.theme.text};
  padding: 8px;
  border-radius: 8px;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${props => props.theme.dangerLight};
    color: ${props => props.theme.danger};
    transform: rotate(90deg);
  }
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

const Select = styled.select`
  padding: 14px 18px;
  border: 2px solid ${props => props.theme.border};
  border-radius: 12px;
  background: ${props => props.theme.backgroundSecondary};
  color: ${props => props.theme.text};
  font-size: 15px;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.primary};
    background: ${props => props.theme.surface};
    box-shadow: 0 0 0 4px ${props => props.theme.primaryLight}40;
  }
`

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`

const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: 14px 28px;
  border: none;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  letter-spacing: -0.2px;
  
  ${props => props.variant === 'primary' ? `
    background: ${props.theme.gradientPrimary};
    color: white;
    box-shadow: 0 4px 12px ${props.theme.shadow};
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px ${props.theme.shadowHover};
    }
    
    &:active {
      transform: translateY(0);
    }
  ` : `
    background: transparent;
    color: ${props.theme.text};
    border: 2px solid ${props.theme.border};
    
    &:hover {
      background: ${props.theme.backgroundSecondary};
      border-color: ${props.theme.primary};
    }
  `}
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none !important;
  }
`

const ErrorMessage = styled.div`
  color: ${props => props.theme.danger};
  font-size: 14px;
  padding: 12px 16px;
  background: ${props => props.theme.dangerLight};
  border-radius: 12px;
  border: 2px solid ${props => props.theme.danger};
  font-weight: 500;
`

interface AddStockModalProps {
  onClose: () => void
  onAdd: (stockData: any) => void
}

const AddStockModal: React.FC<AddStockModalProps> = ({ onClose, onAdd }) => {
  const [symbol, setSymbol] = useState('')
  const [shares, setShares] = useState('')
  const [costBasis, setCostBasis] = useState('')
  const [status, setStatus] = useState<'watchlist' | 'bought' | 'sold'>('watchlist')
  const [notes, setNotes] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // Validate input
      if (!symbol.trim()) {
        throw new Error('Stock symbol is required')
      }

      const stockData = {
        symbol: symbol.toUpperCase().trim(),
        shares: shares ? parseInt(shares) : 0,
        costBasis: costBasis ? parseFloat(costBasis) : 0,
        status,
        notes: notes.trim(),
        addedAt: new Date().toISOString()
      }

      await onAdd(stockData)
    } catch (err: any) {
      setError(err.message || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>Add Stock</ModalTitle>
          <CloseButton onClick={onClose}>×</CloseButton>
        </ModalHeader>

        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <Label>Stock Symbol *</Label>
            <Input
              type="text"
              value={symbol}
              onChange={(e) => setSymbol(e.target.value.toUpperCase())}
              placeholder="e.g., AAPL, GOOGL, MSFT"
              required
            />
          </InputGroup>

          <InputGroup>
            <Label>Status</Label>
            <Select value={status} onChange={(e) => setStatus(e.target.value as any)}>
              <option value="watchlist">Watchlist</option>
              <option value="bought">Bought</option>
              <option value="sold">Sold</option>
            </Select>
          </InputGroup>

          {status === 'bought' && (
            <>
              <InputGroup>
                <Label>Number of Shares</Label>
                <Input
                  type="number"
                  value={shares}
                  onChange={(e) => setShares(e.target.value)}
                  placeholder="e.g., 100"
                  min="0"
                />
              </InputGroup>

              <InputGroup>
                <Label>Cost Basis (per share)</Label>
                <Input
                  type="number"
                  value={costBasis}
                  onChange={(e) => setCostBasis(e.target.value)}
                  placeholder="e.g., 150.00"
                  min="0"
                  step="0.01"
                />
              </InputGroup>
            </>
          )}

          <InputGroup>
            <Label>Notes</Label>
            <Input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Optional notes about this stock"
            />
          </InputGroup>

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <ButtonGroup>
            <Button type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" disabled={loading}>
              {loading ? 'Adding...' : 'Add Stock'}
            </Button>
          </ButtonGroup>
        </Form>
      </ModalContent>
    </ModalOverlay>
  )
}

export default AddStockModal