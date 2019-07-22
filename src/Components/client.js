import React, { Component } from "react";
import { withSnackbar } from "notistack";
import {
  Typography,
  Button,
  Step,
  Stepper,
  StepButton,
  Collapse,
  Modal
} from "@material-ui/core";
import { CancelOutlined } from "@material-ui/icons";
import {
  MainCard,
  StyledGrid,
  ModalDiv,
  StyledIconButton
} from "../StyledComponents/components/client/";

import { STEP_CLIENT, STEP_OPERATOR } from "../Constants";
import StepContents from "../Steps/step";
import TypeUploadData from "./type-upload-data";
import Summary from "../Steps/summary";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";

import { DefaultStepper } from 'Components/Stepper'
import { ButtonNavigate } from 'Components/Button'
import { DefaultModal } from 'Components/Modal'
import { DataConsumer } from 'Utils/context'
import { showSnackbar } from 'Utils/Snackbar'

class Client extends Component {
  state = {
    activeStep: 0,
    openModalFile: false
  };

  handleStep = index => () => this.setState({ activeStep: index });
  handleModalClose = () => this.setState({ openModalFile: false });
  handleModalOpen = () => this.setState({ openModalFile: true });
  handleBack = () => this.setState({ activeStep: this.state.activeStep - 1 });
  handleNext = () => this.setState({ activeStep: this.state.activeStep + 1 });

  handleSend = finalformApi => () => {
    const { errors, valid } = finalformApi.getState()
    const { enqueueSnackbar, closeSnackbar, name } = this.props
    const { activeStep } = this.state
    if (!valid) {
      showSnackbar({ enqueueSnackbar, text: 'Допущены ошибки при заполнении', variant: 'warning', closeSnackbar })
      this.setState({ activeStep: errors[`sender${name}`] ? 0 : 1 });
      finalformApi.submit()
    }

  };

  render() {
    const { activeStep, openModalFile } = this.state;
    const {
      finalformApi,
      valuesFinalForm,
      mutatorsFinalForm,
      name,
      showSnackbar
    } = this.props;
    const STEP_GLOBAL =
      name === "Client" ? [...STEP_CLIENT] : [...STEP_OPERATOR];
    let valid = false;
    if (finalformApi) valid = finalformApi.getState().valid;
    // if (finalformApi) console.log(finalformApi.getState());
    return (
      <DataConsumer>
      {context => {
        let finalformApi = undefined
        if (context && context.formApi) finalformApi = context.formApi
        return (
          <MainCard>
            <DefaultStepper activeStep={activeStep} handleStep={this.handleStep} steps={STEP_GLOBAL} type={name} />
            <Collapse in={activeStep === 0}>
              {!(activeStep === 0 && name === "Client") &&
                <TypeUploadData activeStep={0} type={name} handleModalOpen={this.handleModalOpen} />}
              <StepContents type={name} activeStep={0} />
            </Collapse>
            <Collapse in={activeStep === 1}>
              <TypeUploadData activeStep={1} type={name} handleModalOpen={this.handleModalOpen} />
              <StepContents type={name} activeStep={1} />
            </Collapse>
            <Collapse in={activeStep === 2}>
              <Summary
                type={name}
                valuesFinalForm={valuesFinalForm}
                finalformApi={finalformApi}
                showSnackbar={showSnackbar}
                handleStep={this.handleStep}
              />
            </Collapse>

            <ButtonNavigate
              activeStep={activeStep}
              handleBack={this.handleBack}
              handleNext={this.handleNext}
              handleSend={this.handleSend(finalformApi)}
            />

            <DefaultModal openModalFile={openModalFile} handleModalClose={this.handleModalClose} />
          </MainCard>
        )
      }}
      </DataConsumer>
    );
  }
}

export default withSnackbar(Client);
