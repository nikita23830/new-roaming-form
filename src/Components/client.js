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
import { Complete } from 'Components/Step/Complete'
import { showSnackbar } from 'Utils/Snackbar'
import { axiosAPI } from 'Utils/axios'

class Client extends Component {
  state = {
    activeStep: 0,
    openModalFile: false,
    loader: false,
  };

  handleStep = index => () => this.setState({ activeStep: index });
  handleModalClose = () => this.setState({ openModalFile: false });
  handleModalOpen = () => this.setState({ openModalFile: true });
  handleBack = () => this.setState({ activeStep: this.state.activeStep - 1 });
  handleNext = () => this.setState({ activeStep: this.state.activeStep + 1 });

  resetForm = formApi => () => {
    const { enqueueSnackbar, closeSnackbar, name } = this.props
    formApi.reset();
    formApi.change(name, undefined)
    this.setState({ activeStep: 0 });
    showSnackbar({ enqueueSnackbar, text: 'Форма очищена', variant: 'success', closeSnackbar })
  }

  handleSend = finalformApi => async () => {
    const { errors, valid } = finalformApi.getState()
    const { enqueueSnackbar, closeSnackbar, name } = this.props
    const { activeStep } = this.state
    finalformApi.submit()
    if (!valid) {
      showSnackbar({ enqueueSnackbar, text: 'Допущены ошибки при заполнении', variant: 'warning', closeSnackbar })
      this.setState({ activeStep: errors[`sender${name}`] ? 0 : 1 });
    } else {
      this.setState({ loader: true })
      const { values } = finalformApi.getState()
      const { active, senderOperatorfile, receiverAbonentfile, receiverOperatorfile } = values
      let dataSend = {
        sender: active === 0 ? values.senderAbonent : values.senderOperator,
        receiver: active === 0 ? values.receiverAbonent : values.receiverOperator
      }
      var dataForm = new FormData();
      dataForm.set("data", JSON.stringify(dataSend));
      if (active === 0 && receiverAbonentfile) dataForm.append("receiver_list", receiverAbonentfile);
      if (values.Abonentfile) dataForm.append("agreement", values.Abonentfile);
      if (active === 1) {
        if (senderOperatorfile) dataForm.append("sender_list", senderOperatorfile);
        if (receiverOperatorfile) dataForm.append("receiver_list", receiverOperatorfile);
      }

      const { status, data } = await axiosAPI({ path: active === 0 ? 'abonent' : 'operator', dataAxios: dataForm })
      if (status !== 200) showSnackbar({ enqueueSnackbar,
        text: 'Сервер временно не доступен. Повторите позднее', variant: 'error', closeSnackbar })
      else {
        if (data.status !== 0) showSnackbar({ enqueueSnackbar,
          text: data.code ? data.code : data.text, variant: 'warning', closeSnackbar })
        else {
          showSnackbar({ enqueueSnackbar,
            text: 'Данные успешно отправлены', variant: 'success', closeSnackbar })
          this.setState({ activeStep: 3 })
          finalformApi.change(name, 3)
        }
      }
      this.setState({ loader: false })
    }
  };

  render() {
    const { activeStep, openModalFile, loader } = this.state;
    const {
      finalformApi,
      valuesFinalForm,
      mutatorsFinalForm,
      name,
      showSnackbar
    } = this.props;
    const STEP_GLOBAL =
      name === "Abonent" ? [...STEP_CLIENT] : [...STEP_OPERATOR];
    let valid = false;
    if (finalformApi) valid = finalformApi.getState().valid;
    // if (finalformApi) console.log(finalformApi.getState());
    return (
      <DataConsumer>
      {context => {
        let finalformApi = undefined
        let step = undefined
        if (context && context.formApi) {
          finalformApi = context.formApi
          const { values } = finalformApi.getState()
          step = values[name] ? values[name] : activeStep
        }
        return (
          <MainCard>
            {step < 3 && <DefaultStepper
              activeStep={activeStep}
              handleStep={this.handleStep}
              steps={STEP_GLOBAL}
              type={name}
            />}
            <Collapse in={step === 0}>
              {!(activeStep === 0 && name === "Abonent") &&
                <TypeUploadData activeStep={0} type={name} handleModalOpen={this.handleModalOpen} />}
              <StepContents type={name} activeStep={0} />
            </Collapse>
            <Collapse in={step === 1}>
              <TypeUploadData activeStep={1} type={name} handleModalOpen={this.handleModalOpen} />
              <StepContents type={name} activeStep={1} />
            </Collapse>
            <Collapse in={step === 2}>
              <Summary
                type={name}
                valuesFinalForm={valuesFinalForm}
                finalformApi={finalformApi}
                showSnackbar={showSnackbar}
                handleStep={this.handleStep}
              />
            </Collapse>
            <Collapse in={step === 3}>
              <Complete type={name} reset={this.resetForm} />
            </Collapse>

            {step < 3 && <ButtonNavigate
              activeStep={activeStep}
              handleBack={this.handleBack}
              handleNext={this.handleNext}
              handleSend={this.handleSend(finalformApi)}
              loader={loader}
            />}

            <DefaultModal openModalFile={openModalFile} handleModalClose={this.handleModalClose} />
          </MainCard>
        )
      }}
      </DataConsumer>
    );
  }
}

export default withSnackbar(Client);
