import React, { useState } from 'react'
import styled from 'styled-components'

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`

const ModalContent = styled.div`
  background-color: ${props => props.theme.surface};
  border-radius: 12px;
  padding: 30px;
  width: 90%;
  max-width: 500px;
  border: 1px solid ${props => props.theme.border};
  box-shadow: 0 8px 32px ${props => props.theme.shadow};
`

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`

const ModalTitle = styled.h2`
  color: ${props => props.theme.text};
  font-size: 24px;
  font-weight: 600;
  margin: 0;
`

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: ${props => props.theme.text};
  padding: 4px;
  
  &:hover {
    opacity: 0.7;
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

const Select = styled.select`
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

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`

const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;
  
  ${props => props.variant === 'primary' ? `
    background-color: ${props.theme.primary};
    color: white;
    
    &:hover {
      background-color: ${props.theme.primaryHover};
    }
  ` : `
    background-color: transparent;
    color: ${props.theme.text};
    border: 1px solid ${props.theme.border};
    
    &:hover {
      background-color: ${props.theme.border};
    }
  `}
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`

const ErrorMessage = styled.div`
  color: ${props => props.theme.danger};
  font-size: 14px;
  padding: 8px 12px;
  background-color: ${props => props.theme.danger}20;
  border-radius: 6px;
  border: 1px solid ${props => props.theme.danger};
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