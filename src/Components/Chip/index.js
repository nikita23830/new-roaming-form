import React from 'react'
import styled from 'styled-components'
import { Chip, Avatar } from '@material-ui/core'
import { AttachFileRounded } from '@material-ui/icons'
import { DataConsumer } from 'Utils/context'

export const DefaultChip = ({ nameField, handleDeleteFile, file }) => (
  <DataConsumer>
  {context => {
    let finalformApi = undefined
    if (context && context.formApi) finalformApi = context.formApi
    return (
      <Chip
        avatar={
          <StyledAvatar>
            <AttachFileRounded color="primary" />
          </StyledAvatar>
        }
        label={<Styledp>{file.name}</Styledp>}
        onDelete={handleDeleteFile({ finalformApi, nameField })}
        variant="outlined"
        color="primary"
      />
    )
  }}
  </DataConsumer>
)

const Styledp = styled.p` && {
  width: 100px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}`

const StyledAvatar = styled(Avatar)` && {
  background-color: #fff;
  border: 1px solid #6a1b9a;
}`
