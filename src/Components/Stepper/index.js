import React from 'react'
import styled from 'styled-components'
import { Typography, Stepper, Step, StepButton } from '@material-ui/core'
import { STEP_CLIENT, STEP_OPERATOR } from "Constants";

export const DefaultStepper = ({ activeStep, handleStep, steps }) => (
  <>
    <Typography component="h1" variant="h4" align="center">
      Заявление на подключение роуминга между контрагентами
    </Typography>
    <Stepper nonLinear activeStep={activeStep}>
      {steps.map((label, index) => (
        <Step key={label}>
          <StyledStepButton
            onClick={handleStep(index)}
            style={{ margin: "-10px", padding: "10px 8px" }}
          >
            <Typography variant="subtitle2" align="left">
              {label}
            </Typography>
          </StyledStepButton>
        </Step>
      ))}
    </Stepper>
  </>
)

const StyledStepButton = styled(StepButton)` && {
  margin: -10px;
  padding: 10px 8px;
}`
