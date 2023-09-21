import { colors } from '@/constants/colors'
import styled from 'styled-components'

export const TransactionTable = styled.div`
  margin-top: 24px;
  min-width: 1400px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`

export const TransactionsContainer = styled.div`
  display: flex;
  flex-direction: column;
`

export const Transaction = styled.div`
  display: grid;
  width: 1400px;

  grid-template-columns: 0.2fr 1fr 1fr 1fr 1fr;

  div,
  span {
    display: flex;
    align-items: center;
  }
  cursor: pointer;
  align-self: center;
  padding: 18px;
  border: 1px solid ${colors.GRAY_400};
  border-radius: 20px;
  margin: 4px;
  gap: 12px;

  &:hover {
    background-color: ${colors.GRAY_400};
  }
`

export const MajorText = styled.span``

export const SubText = styled.span``

export const SelectUserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-top: 32px;
`

export const StyledInput = styled.input`
  padding: 10px 12px;
  border: 1px solid ${colors.GRAY_400};
  border-radius: 4px;
  outline: none;
  font-size: 16px;
  transition: all 0.3s;

  background-color: transparent;
  color: ${colors.GRAY_100};

  &:hover {
    border-color: rgba(0, 0, 0, 0.87);
  }

  &:focus {
    border-color: #3f51b5;
    box-shadow: 0 0 0 2px rgba(63, 81, 181, 0.2);
  }

  &::placeholder {
    color: ${colors.GRAY_100};
    opacity: 0.7;
  }
`

export const StyledSelect = styled.select`
  padding: 10px 8px 10px 12px;
  border: 1px solid rgba(0, 0, 0, 0.23);
  border-radius: 8px;
  font-size: 16px;
  background-color: ${colors.GRAY_100};
  color: ${colors.GRAY_400};

  transition: border-color 0.3s, box-shadow 0.3s;

  &:hover {
    border-color: rgba(0, 0, 0, 0.5);
  }

  &:focus {
    border-color: #3f51b5;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    outline: none;
  }
`

export const StyledOption = styled.option`
  padding: 10px 12px;
  color: ${colors.GRAY_400};
`

export const ButtonsContainer = styled.div`
  align-self: center;
  align-items: center;
  margin-top: 16px;
  display: flex;
  gap: 14px;
  margin-bottom: 24px;
  font-size: 24px;

  button {
    cursor: pointer;
    padding: 8px 16px;
    font-size: 0.875rem;
    min-width: 64px;
    box-sizing: border-box;
    transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
      box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
      border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
    font-weight: 500;
    line-height: 1.75;
    border-radius: 4px;
    letter-spacing: 0.02857em;
    text-transform: uppercase;
    color: rgba(0, 0, 0, 0.87);
    background-color: #e0e0e0;
    border: none;
    outline: none;
    &:hover {
      background-color: ${colors.GRAY_400};
    }
    &:active {
      background-color: rgba(0, 0, 0, 0.2);
      box-shadow: 0px 3px 5px 2px rgba(0, 0, 0, 0.2);
    }
    &:disabled {
      opacity: 0.8;
      color: rgba(0, 0, 0, 0.26);
      cursor: not-allowed;
    }
  }
`
