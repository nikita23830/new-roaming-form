import React from 'react'
import styled from 'styled-components'
import { IconButton } from '@material-ui/core'
import { DeleteOutline } from '@material-ui/icons'

export const ButtonCloseSnackbar = ({ close, key }) => (
  <StyledIconButton
    onClick={() => close(key)}
  >
    <DeleteOutline />
  </StyledIconButton>
)

const StyledIconButton = styled(IconButton)` && {
  color: #fff;
}`
