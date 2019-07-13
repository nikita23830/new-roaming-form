import styled from 'styled-components'
import { Card, Collapse, Grid, Avatar } from '@material-ui/core';
import { TextField } from 'final-form-material-ui'
import { amber } from '@material-ui/core/colors';

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

export const StyledTypeGrid = styled(Grid)`
 && {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    width: 610px
    padding: 10px;
    height: 75px;
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

export const StyledGrid = styled(Grid)`
 && {
   display: flex;
   justify-content: space-between;
   flex-direction: row;
   align-items: center;
  }
`

export const Styledinput = styled.input`
  && {
    display: none;
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
