import React from 'react'
import styled from 'styled-components'
import { Typography, Stepper, Step, StepButton, StepLabel } from '@material-ui/core'
import { ErrorOutline } from '@material-ui/icons'
import { STEP_CLIENT, STEP_OPERATOR } from "Constants";
import { DataConsumer } from 'Utils/context'

export const DefaultStepper = ({ activeStep, handleStep, steps, type }) => (
  <DataConsumer>
  {context => (
      <>
        <Typography component="h1" variant="h4" align="center">
          Заявление на подключение роуминга между контрагентами
        </Typography>
        <Stepper nonLinear activeStep={activeStep}>
          {steps.map((label, index) => {
            const labelProps = { error: false }
            const stepProps = {}
            if (context && context.formApi) {
              const { errors } = context.formApi.getState()
              const arrErrors = Object.keys(errors)
              const nameField = `${index === 0 ? 'sender' : (index === 1 ? 'receiver' : null)}${type}`
              labelProps.error = arrErrors.indexOf(nameField) !== -1 ? true : false
              labelProps.StepIconProps = arrErrors.indexOf(nameField) !== -1
                ? { icon: <ErrorOutline color='secondary' /> } : null
              stepProps.completed = (!labelProps.error && index < 2) ? true : false
            }

            return (
              <Step key={label} error={true} {...stepProps}>
                <StyledStepButton
                  onClick={handleStep(index)}
                  style={{ margin: "-10px", padding: "10px 8px" }}
                >
                  <StepLabel align="left" {...labelProps} >
                    {label}
                  </StepLabel >
                </StyledStepButton>
              </Step>
            )
          }
          )}
        </Stepper>
      </>
    )
  }
  </DataConsumer>
)

const StyledStepButton = styled(StepButton)` && {
  margin: -10px;
  padding: 10px 8px;
}`
