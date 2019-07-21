import React from 'react'
import styled, { keyframes } from 'styled-components'
import { IconButton } from '@material-ui/core'
import { DeleteOutlined } from '@material-ui/icons'
import { DataConsumer } from 'Utils/context'

const ButtonDeleteField = ({ nameFieldArray, index, length }) => (
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
    -webkit-transform: scale(1) rotateZ(0);
            transform: scale(1) rotateZ(0);
  }
  50% {
    -webkit-transform: scale(2) rotateZ(180deg);
            transform: scale(2) rotateZ(180deg);
  }
  100% {
    -webkit-transform: scale(1) rotateZ(360deg);
            transform: scale(1) rotateZ(360deg);
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
  animation: ${keyFramesButton} 0.4s linear both;
}`;

export default ButtonDeleteField
