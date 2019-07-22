import React, { Component } from "react";
import {
  Typography,
  Button,
} from "@material-ui/core";
import { Field } from "react-final-form";

import { StyledCollapse, AuthCard, StyledTextField,  StyledCollapseClient } from '../StyledComponents/components/auth/'

import Client from './client'
import { axiosAPI } from 'Utils/axios'
import { withSnackbar } from "notistack";
import { showSnackbar } from 'Utils/Snackbar'
import { DataConsumer } from 'Utils/context'
class Auth extends Component {
  state = {
    openAuth: false,
    openStep: true,
    activeStep: 0,
  }

  auth = formApi => async () => {
    const { enqueueSnackbar, closeSnackbar } = this.props
    const { values } = formApi.getState()
    var dataForm = new FormData();
    dataForm.set('login', values.login );
    dataForm.set('password', values.password );
    const { status, data } = await axiosAPI({ path: 'auth', dataAxios: dataForm })
    if (status !== 200) showSnackbar({ enqueueSnackbar,
      text: 'Сервер временно не доступен. Повторите позднее', variant: 'error', closeSnackbar })
    else {
      if (data.status !== 0) showSnackbar({ enqueueSnackbar, text: data.text, variant: 'warning', closeSnackbar })
      else {
        showSnackbar({ enqueueSnackbar, text: 'Успешная авторизация', variant: 'success', closeSnackbar })
        this.setState({ openAuth: false, openStep: true })
      }
    }
  }

  async componentDidMount() {
    const { enqueueSnackbar, closeSnackbar } = this.props
    const { status, data } = await axiosAPI({ path: 'operator' })
    if (status !== 200) showSnackbar({ enqueueSnackbar,
      text: 'Сервер временно не доступен. Повторите позднее', variant: 'error', closeSnackbar })
    else {
      if (data.status === 401) this.setState({ openAuth: true, openStep: false })
    }
  }

  handleStep = index => () =>  this.setState({ activeStep: index })

  render () {
    const { openAuth, openStep, activeStep } = this.state
    const { finalformApi, valuesFinalForm, mutatorsFinalForm, showSnackbar } = this.props

    return (
      <DataConsumer>
      {context => {
      let formApi = undefined
      if (context && context.formApi) formApi = context.formApi
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
              onClick={this.auth(formApi)}
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
      }}
      </DataConsumer>
    )
  }
};

export default withSnackbar(Auth)
