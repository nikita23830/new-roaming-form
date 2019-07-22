import styled from 'styled-components'
import { Card, Collapse, Grid } from '@material-ui/core';
import { TextField } from 'final-form-material-ui'

export const AuthCard = styled(Card)`
 && {
   width: 300px;
   height: 300px;
   margin-top: 50px;
   display: flex;
   flex-direction: column;
   justify-content: space-between;
   padding: 30px;
  }
`

export const MainCard = styled(Card)`
 && {
   width: 600px;
   min-height: 300px;
   display: flex;
   flex-direction: column;
   padding: 20px;
  }
`

export const StyledTextField = styled(TextField)`
 && {
   min-height: 70px;
  }
`

export const StyledGrid = styled(Grid)`
 && {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    width: 600px
  }
`

export const StyledCollapseClient = styled(Collapse)`
  && {
    margin-top: -10px;
    width: 100%;
    height: 500px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`

export const StyledCollapse = styled(Collapse)`
  && {
    margin-top: 10px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`
