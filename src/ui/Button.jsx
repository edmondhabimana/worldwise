import styled from "styled-components"

export const Button = styled.button`
  padding: 10px 20px;
  background-color: var(--green-color);
  border: none;
  border-radius: 8px;
  font-size: 15px;
  text-transform: uppercase;
  color: black;
  cursor: pointer;

  @media (max-width: 381px) {
    font-size: 12px;
  }

  @media (max-width: 330px) {
    font-size: 10px;
    padding: 6px 20px;
  }
`
