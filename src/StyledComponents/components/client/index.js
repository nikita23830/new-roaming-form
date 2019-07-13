import styled from 'styled-components'
import { Card, Collapse, Grid, Typography, Paper, IconButton } from '@material-ui/core';
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
   margin-top: 20px;
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

export const StyledCollapse = styled(Collapse)`
  && {
    margin-top: 10px;
    width: 100%;
    height: 500px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`

export const ModalDiv = styled.div`
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 650px;
  position: absolute;
  width: 400px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  background-color: #fff;
  padding: 30px;
  border-radius: 25px;
  box-shadow: 0px 0px 30px 0px rgba(0, 0, 0, 1);
  outline: none;
`
export const TypographyError = styled(Typography)`
 && {
   color: #f00;
  }
`

export const StyledIconButton = styled(IconButton)`
 && {
   position: absolute;
   top: 0px;
   right: 0px;
  }
`
