import { colors } from '@/constants/colors'
import styled from 'styled-components'

export const StyledSelect = styled.select`
  position: absolute;
  right: 50px;
  top: 24px;

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
