import styled from "styled-components"

export const Form = styled.form`
position: relative;
  width: 400px;
  margin-top: 20px;
  position: relative;
  z-index: 1;
  background-color: #42484c;
  padding: 30px;
  border-radius: 5px;

  display: flex;
  flex-direction: column;
  gap: 15px;

  @media (max-width: 911px) {
    width: 300px;
  }

  @media (max-width: 380px) {
    width: 90%;
  }
`