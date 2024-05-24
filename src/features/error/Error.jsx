import { useRouteError, useNavigate } from "react-router-dom";
import styled from "styled-components";
import BackButton from "../../ui/BackButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong } from "@fortawesome/pro-regular-svg-icons";

const LeftArrowIcon = styled(FontAwesomeIcon)`
  margin-right: 5px;
`

export default function Error() {
  const navigate = useNavigate()
  const error = useRouteError()
  console.log(error);

  function handleNavigation() {
    navigate(-1)
  }

  return(
    <div>
      <h1>Something went wrong</h1>
      <p>{error.data || error.message}</p>
      <BackButton onClick={handleNavigation}>
        <LeftArrowIcon icon={faArrowLeftLong} />
        back
      </BackButton>
    </div>
  )
}