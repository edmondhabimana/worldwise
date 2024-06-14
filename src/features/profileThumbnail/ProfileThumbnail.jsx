import { useState } from "react"
import styled from "styled-components"
import { uploadUserPicture } from "../../firebase/config"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSpinner } from "@fortawesome/pro-duotone-svg-icons"
import { faUpload, faX } from "@fortawesome/free-solid-svg-icons"


const ThumbnailContainer = styled.div`
  background-color: #2d3438;
  border-radius: 8px;
  padding: 30px 15px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
`
const CustomeForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`
const UploadFile = styled.input`
  color: white;
  &::file-selector-button {
    background-color: var(--green-color);
    border: none;
    padding: 8px;
    border-radius: 8px;
    margin-right: 20px;
    cursor: pointer;
  }
`
const UploadButton = styled.button`
  background-color: #42484c;
  border: none;
  padding: 8px;
  border-radius: 8px;
  color: white;
  cursor: pointer;

  display: flex;
  gap: 10px;
`
const X = styled(FontAwesomeIcon)`
  padding: 6px;
  color: white;
  display: block;
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 0;
`

export default function ProfileThumbnail({ showUploadPopup, setShowUploadPopup }) {
  const [thumbnail, setThumbnail] = useState(null)
  const [thumbnailError, setThumbnailError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    await uploadUserPicture(thumbnail)
    setIsLoading(false)
    setShowUploadPopup(false)
  }

  const handleFileChange = (e) => {
    setThumbnail(null)
    const selected = e.target.files[0]

    if (!selected) {
      setThumbnailError('Please select a file')
      return
    }
    if (!selected.type.includes('image')) {
      setThumbnailError('Selected file must be an image')
      return
    }
    if (selected.size > 100000) {
      setThumbnailError('Image file size must be less than 100kb')
      return
    }
    
    setThumbnailError(null)
    setThumbnail(selected)
    console.log('thumbnail updated')
  }


  return(
    <>
      {showUploadPopup &&
        <ThumbnailContainer>
          <X icon={faX} onClick={() => setShowUploadPopup(false)}/>
          <CustomeForm onSubmit={handleSubmit}>
            <UploadFile type="file" onChange={handleFileChange}/>
            {thumbnailError && <p>{thumbnailError}</p>}
            <UploadButton>
              { isLoading ?
              <FontAwesomeIcon icon={faSpinner} spinPulse /> :
              <>
                <FontAwesomeIcon icon={faUpload} />
                <span>Update picture</span>
              </>
              }
            </UploadButton>
          </CustomeForm>
        </ThumbnailContainer>
      }
    </>
  )
}