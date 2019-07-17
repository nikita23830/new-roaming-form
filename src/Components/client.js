import React, { Component } from "react";
import {
  Typography,
  Button,
  Step,
  Stepper,
  StepButton,
  Collapse,
  Modal,
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
    const { activeStep, openModalFile, disabledSend } = this.state;
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
    if (finalformApi) console.log(finalformApi.getState());
    return (
      <MainCard>
        <Typography component="h1" variant="h4" align="center">
          Заявление на подключение роуминга между контрагентами
        </Typography>
        <Stepper nonLinear activeStep={activeStep}>
          {STEP_GLOBAL.map((label, index) => (
            <Step key={label}>
              <StepButton onClick={this.handleStep(index)}>{label}</StepButton>
            </Step>
          ))}
        </Stepper>

        <Collapse in={activeStep < 2}>
          {!(activeStep === 0 && name === "Client") && (
            <TypeUploadData
              activeStep={activeStep}
              type={name}
              handleModalOpen={this.handleModalOpen}
              finalformApi={finalformApi}
              showSnackbar={showSnackbar}
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

        <StyledGrid>
          <Button
            variant="outlined"
            color="primary"
            onClick={activeStep === 0 ? null : this.handleBack}
            disabled={activeStep === 0 ? true : false}
          >
            Назад
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={activeStep === 2 ? this.handleSend : this.handleNext}
            disabled={!valid}
          >
            {activeStep !== 2 ? "Вперед" : "Отправить"}
          </Button>
        </StyledGrid>

        <Modal open={openModalFile} onClose={this.handleModalClose}>
          <ModalDiv>
            <StyledIconButton
              aria-label="Close"
              onClick={this.handleModalClose}
            >
              <CancelOutlined color="primary" />
            </StyledIconButton>

            <Typography variant="subtitle1">
              Вы можете загрузить список контрагентов файлом с форматом .xls или
              xlsx, если он сопоставим с шаблоном:
            </Typography>
            <Button
              variant="outlined"
              color="primary"
              href="https://astral.ru/roaming/tempalates/abonent-receiver.xlsx"
            >
              <ArrowDownwardIcon />
              Загрузить шаблон
            </Button>
            <Typography variant="subtitle1">
              Обращаем Ваше внимание, что загрузка списка контрагентов файлом
              удалит введеные вручную данные контрагентов!
            </Typography>
          </ModalDiv>
        </Modal>
      </MainCard>
    );
  }
}

export default Client;
