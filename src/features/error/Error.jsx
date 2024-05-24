import { useRouteError, useNavigate } from "react-router-dom";
import styled from "styled-components";
import BackButton from "../../ui/BackButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong } from "@fortawesome/pro-regular-svg-icons";

const LeftArrowIcon = styled(FontAwesomeIcon)`
  margin-right: 5px;
`
const ErrorContainer = styled.div`
  background-color: #2d3438;
  height: 100vh;
  color: white;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`

export default function Error() {
  const navigate = useNavigate()
  const error = useRouteError()
  console.log(error);

  function handleNavigation() {
    navigate(-1)
  }

  return(
    <ErrorContainer>
      <h1>Something went wrong</h1>
      <p>{error.data || error.message}</p>
      <BackButton onClick={handleNavigation}>
        <LeftArrowIcon icon={faArrowLeftLong} />
        back
      </BackButton>
    </ErrorContainer>
  )
}