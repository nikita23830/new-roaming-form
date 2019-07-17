import styled from 'styled-components'
import { Typography, Button, ExpansionPanel, Avatar, Chip } from '@material-ui/core';

export const StyledDiv = styled.div`
 && {
   width: 600px;
   display: flex;
   flex-direction: column;
  }
`

export const StyledButton = styled(Button)`
 && {
   width: 350px;
   display: flex;
   flex-direction: row;
   align-items: center;
   margin-top: 5px;
   margin-bottom: 5px;
   justify-content: space-between;
  }
`

export const StyledTypography = styled(Typography)`
 && {
   color: #f00;
   font-weight: bold;
  }
`

export const StyleListExpansionPanel = styled(ExpansionPanel)`
 && {
   margin-top: 5px;
   margin-botom: 5px;
  }
`

export const Styledp = styled.p`
  && {
    width: 100px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
`

export const StyledAvatar = styled(Avatar)`
  && {
    background-color: #fff;
    border: 1px solid #6a1b9a;
  }
`

export const StyledChip = styled(Chip)`
  && {
    margin-left: 5px;
    margin-right: 5px;
  }
`
