import React, { Component } from "react";
import {
  Typography,
  Button,
} from "@material-ui/core";
import { Field } from "react-final-form";

import { StyledCollapse, AuthCard, StyledTextField,  StyledCollapseClient } from '../StyledComponents/components/auth/'

import Client from './client'

class Auth extends Component {
  state = {
    openAuth: true,
    openStep: false,
    activeStep: 0,
  }

  async componentDidMount() {
    // const auth = await axiosAPI({ path: 'operator' })
    this.setState({ openAuth: false, openStep: true })
  }

  handleStep = index => () =>  this.setState({ activeStep: index })

  render () {
    const { openAuth, openStep, activeStep } = this.state
    const { finalformApi, valuesFinalForm, mutatorsFinalForm, showSnackbar } = this.props

    return (
      <>
        <StyledCollapse in={openAuth}>
          <AuthCard>
            <Typography variant="h6">Авторизация спецоператора</Typography>
            <Field
              autoComplete='login'
              component={StyledTextField}
              label='Логин'
              name='login'
              color='primary'
              required
            />
            <Field
              autoComplete='password'
              component={StyledTextField}
              label='Пароль'
              name='password'
              type="password"
              color='primary'
              required
            />
            <Button
              variant="outlined"
              color="primary"
              type='submit'
            >
              Войти
            </Button>
          </AuthCard>
        </StyledCollapse>
        <StyledCollapseClient in={openStep}>

          <Client
            name='Operator'
            finalformApi={finalformApi}
            valuesFinalForm={valuesFinalForm}
            mutatorsFinalForm={mutatorsFinalForm}
            showSnackbar={showSnackbar}
          />

        </StyledCollapseClient>
      </>
    )
  }
};

export default Auth
