import React, { Component } from "react";
import {
  Typography,
  Button,
  Step,
  Stepper,
  StepButton,
  Collapse,
  Modal,
  IconButton
} from "@material-ui/core";
import { CancelOutlined } from '@material-ui/icons'
import {
  StyledCollapse,
  AuthCard,
  StyledTextField,
  MainCard,
  StyledGrid,
  ModalDiv,
  TypographyError,
  StyledIconButton
} from '../StyledComponents/components/client/'

import { STEP_CLIENT, STEP_OPERATOR } from '../Constants'
import StepContents from '../Steps/step'
import TypeUploadData from './type-upload-data'
import Summary from './summary'

class Client extends Component {
  state = {
    activeStep: 0,
    openModalFile: false,
  }

  handleStep = index => () =>  this.setState({ activeStep: index })
  handleModalClose = () => this.setState({ openModalFile: false })
  handleModalOpen = () => this.setState({ openModalFile: true })

  render() {
    const { activeStep, openModalFile } = this.state
    const { finalformApi, valuesFinalForm, mutatorsFinalForm, name } = this.props
    const STEP_GLOBAL = name === 'Client' ? [...STEP_CLIENT] : [...STEP_OPERATOR]

    return (
      <MainCard>
        <Typography component="h1" variant="h4" align="center">
          Заявление на подключение роуминга между контрагентами
        </Typography>
        <Stepper nonLinear activeStep={activeStep}>
          {STEP_GLOBAL.map((label, index) => (
            <Step key={label}>
              <StepButton onClick={this.handleStep(index)}>
                {label}
              </StepButton>
            </Step>
          ))}
        </Stepper>

        <Collapse in={activeStep < 2}>
          {!(activeStep === 0 && name === 'Client') && <TypeUploadData
            activeStep={activeStep}
            type={name}
            handleModalOpen={this.handleModalOpen}
            finalformApi={finalformApi}
          />}

          <StepContents
            type={name}
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

        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={openModalFile}
        >
          <ModalDiv>

            <StyledIconButton aria-label="Close" onClick={this.handleModalClose}>
              <CancelOutlined color='primary' />
            </StyledIconButton>

            <Typography variant="h6" id="modal-title">
              Вы можете загрузить список контрагентов
            </Typography>
            <Typography variant="subtitle1" id="simple-modal-description">
              Вы можете загрузить файл в формате .xls и xlsx если он сапостовим с шаблоном
            </Typography>
            <Typography variant="subtitle1" id="simple-modal-description" align='center'>
              <a href="https://astral.ru/roaming/tempalates/abonent-receiver.xlsx">Загрузить шаблон</a>
            </Typography>
            <TypographyError variant="subtitle1" id="simple-modal-description">
              <em>Обращаем Ваше внимание, что загрузка из файла
              удалит все введеные данные контрагентов вручную</em>
            </TypographyError>
          </ModalDiv>
        </Modal>

      </MainCard>
    )
  }
}

export default Client
