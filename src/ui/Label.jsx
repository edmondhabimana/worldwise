import styled from "styled-components"

export const Label = styled.label`
  color: white;
  font-weight: 500;

  display: flex;
  flex-direction: column;
  gap: 5px;

  @media (max-width: 381px) {
    font-size: 12px;
  }
`