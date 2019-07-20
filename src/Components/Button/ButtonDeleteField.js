import React from 'react'
import styled, { keyframes } from 'styled-components'
import { IconButton } from '@material-ui/core'
import { DeleteOutlined } from '@material-ui/icons'
import { DataConsumer } from 'Utils/context'

export const ButtonDeleteField = ({ nameFieldArray, index, length }) => (
  <DataConsumer>
  {context => {
    let mutators = undefined
    if (context && context.mutators) mutators = context.mutators
    return (
      <>
        {!(length === 1) && <StyledIconButton
          onClick={() => mutators.remove(nameFieldArray, index)}
        >
          <StyledDeleteOutlined color='primary' />
        </StyledIconButton>}
      </>
    )
  }}
  </DataConsumer>
)

export const keyFramesButton = keyframes`
0% {
  transform: rotate(0);
}
100% {
  transform: rotate(360deg);
}
`

const StyledIconButton = styled(IconButton)` && {
  position: absolute;
  top: 0px;
  right: 0px;
  z-index: 1;
}`;

const StyledDeleteOutlined = styled(DeleteOutlined)` &:hover
{
  animation: ${keyFramesButton} 0.6s ease-in-out both;
}`;
