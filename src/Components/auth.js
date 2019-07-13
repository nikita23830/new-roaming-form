import React, { Component } from "react";
import {
  Typography,
  Button,
  Step,
  Stepper,
  StepButton,
  Collapse
} from "@material-ui/core";
import { Field } from "react-final-form";

import { StyledCollapse, AuthCard, StyledTextField, MainCard, StyledGrid } from '../StyledComponents/components/auth/'
import { axiosAPI } from '../Utils/axios'
import { STEP_OPERATOR } from '../Constants'
import StepContents from '../Steps/step'
import TypeUploadData from './type-upload-data'
import Summary from './summary'

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
    const { finalformApi, valuesFinalForm, mutatorsFinalForm } = this.props

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
        <StyledCollapse in={openStep}>

          <MainCard>
            <Typography component="h1" variant="h4" align="center">
              Заявление на подключение роуминга между контрагентами
            </Typography>
            <Stepper nonLinear activeStep={activeStep}>
              {STEP_OPERATOR.map((label, index) => (
                <Step key={label}>
                  <StepButton onClick={this.handleStep(index)}>
                    {label}
                  </StepButton>
                </Step>
              ))}
            </Stepper>

            <Collapse in={activeStep < 2}>
              <TypeUploadData
                activeStep={activeStep}
                type='Operator'
              />

              <StepContents
                type='Operator'
                activeStep={activeStep}
                finalformApi={finalformApi}
                valuesFinalForm={valuesFinalForm}
                mutatorsFinalForm={mutatorsFinalForm}
              />

            </Collapse>
            <Collapse in={activeStep === 2}>
              <Summary />
            </Collapse>

            <StyledGrid>
              <Button
                variant="outlined"
                color="primary"
              >
                Назад
              </Button>
              <Button
                variant="outlined"
                color="primary"
              >
                Вперед
              </Button>
            </StyledGrid>
          </MainCard>

        </StyledCollapse>
      </>
    )
  }
};

export default Auth
