import React from 'react'
import styled from 'styled-components'
import { Button } from '@material-ui/core'
import { DataConsumer } from 'Utils/context'

const ButtonUpload = ({ accept, uploadFile, text }) => (
  <DataConsumer>
  {context => {
    const buttonKey = Math.random().toString(36).substring(2);
    let finalformApi = undefined
    if (context && context.formApi) finalformApi = context.formApi
    return (
      <>
        <Styledinput
          accept={accept}
          id={buttonKey}
          type="file"
          onChange={uploadFile(finalformApi)}
        />
        <label htmlFor={buttonKey}>
          <Button
            fullWidth
            variant="outlined"
            color="primary"
            component="span"
          >
            {text}
          </Button>
        </label>
      </>
    )
  }}
  </DataConsumer>
)

const Styledinput = styled.input` && {
  display: none;
}`

export default ButtonUpload
