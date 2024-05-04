import styled from "styled-components"

const Title = styled.p`
  font-size: 40px;
  font-weight: 700;
  color: var(--title-white-color);

  @media (max-width: 992px) {
    font-size: 30px;
  }

  @media (max-width: 724px) {
    text-align: center;
  }

  @media (max-width: 395px) {
    font-size: 20px;
  }
`
export default Title