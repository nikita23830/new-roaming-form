import styled from 'styled-components'
import { Typography, Button } from '@material-ui/core';

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
