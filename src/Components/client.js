import React, { Component } from "react";
import {
  Typography,
  Button,
  Step,
  Stepper,
  StepButton,
  Collapse
} from "@material-ui/core";
import { StyledCollapse, AuthCard, StyledTextField, MainCard, StyledGrid } from '../StyledComponents/components/client/'

import { STEP_CLIENT } from '../Constants'
import StepContents from '../Steps/step'
import TypeUploadData from './type-upload-data'
import Summary from './summary'

class Client extends Component {
  state = {
    activeStep: 0
  }

  handleStep = index => () =>  this.setState({ activeStep: index })

  render() {
    const { activeStep } = this.state
    const { finalformApi, valuesFinalForm, mutatorsFinalForm } = this.props
    return (
      <MainCard>
        <Typography component="h1" variant="h4" align="center">
          Заявление на подключение роуминга между контрагентами
        </Typography>
        <Stepper nonLinear activeStep={activeStep}>
          {STEP_CLIENT.map((label, index) => (
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
            type='Client'
          />

          <StepContents
            type='Client'
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
    )
  }
}

export default Client
