import React, { Component } from "react";
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
import { ButtonNavigate } from 'Components/Button/ButtonNavigate'
import { DefaultModal } from 'Components/Modal'

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

  handleSend = () => {};

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
      <MainCard>

        <DefaultStepper activeStep={activeStep} handleStep={this.handleStep} steps={STEP_GLOBAL} />

        <Collapse in={activeStep < 2}>
          {!(activeStep === 0 && name === "Client") && (
            <TypeUploadData
              activeStep={activeStep}
              type={name}
              handleModalOpen={this.handleModalOpen}
            />
          )}

          <StepContents
            type={name}
            activeStep={activeStep}
            finalformApi={finalformApi}
            valuesFinalForm={valuesFinalForm}
            mutatorsFinalForm={mutatorsFinalForm}
            showSnackbar={showSnackbar}
          />
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
          handleSend={this.handleSend}
        />

        <DefaultModal openModalFile={openModalFile} handleModalClose={this.handleModalClose} />
      </MainCard>
    );
  }
}

export default Client;
