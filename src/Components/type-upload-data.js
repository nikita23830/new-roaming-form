import React, { Component } from "react";
import { withSnackbar } from 'notistack';
import { Button, Grid, Typography, IconButton, Chip, Snackbar } from '@material-ui/core'
import { AttachFileRounded, HelpOutline, Close, DeleteOutline } from '@material-ui/icons'
import {
  StyledCollapse,
  AuthCard,
  StyledTextField,
  MainCard,
  StyledTypeGrid,
  StyledGrid,
  StyledTypography,
  Styledinput,
  Styledp,
  StyledAvatar
} from '../StyledComponents/components/type-upload-data/'
import {
  DEFAULT_SENDER_CLIENT,
  DEFAULT_SENDER_OPERATOR,
  DEFAULT_RECEIVER_CLIENT,
  DEFAULT_RECEIVER_OPERATOR
} from '../Constants'

class TypeUploadData extends Component {

  state = {
    openSnackbar: false,
    textSnackbar: ''
  }

  uploadFile = file => {
    const { activeStep, type, finalformApi } = this.props
    const nameField = `${activeStep === 0 ? 'sender' : 'receiver'}${type}`
    const files = file.target.files[0]
    const normal_type = [ 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel' ]

    if (files.type === normal_type[0] || files.type === normal_type[1]) {
      this.props.enqueueSnackbar('Список успешно загружен', {
        variant: 'success',
        persist: true,
        action: (key) => (
          <IconButton onClick={() => { this.props.closeSnackbar(key) }}>
            <DeleteOutline />
          </IconButton>
        )
      })
      finalformApi.change(`${nameField}file`, files)
      finalformApi.change(nameField, [{...DEFAULT_OBJECT[nameField]}])
    }
    else this.props.enqueueSnackbar('Файл должен иметь расширение ".xls" или ".xlsx"', {
      variant: 'error',
      persist: true,
      action: (key) => (
        <IconButton onClick={() => { this.props.closeSnackbar(key) }}>
          <DeleteOutline />
        </IconButton>
      )
    })
  }

  handleDeleteFile = () => {
    const { activeStep, type, finalformApi } = this.props
    const nameField = `${activeStep === 0 ? 'sender' : 'receiver'}${type}file`
    finalformApi.change(nameField, undefined)
  }

  handleClose = () => this.setState({ openSnackbar: false })

  render () {
    const { openSnackbar, textSnackbar } = this.state
    const { activeStep, type, handleModalOpen, finalformApi } = this.props
    const nameField = `${activeStep === 0 ? 'sender' : 'receiver'}${type}file`
    let checkFile = false
    let nameFile = ''
    if (finalformApi) {
      const { values } = finalformApi.getState()
      if ( values && values[nameField] ) {
        checkFile = true
        nameFile = values[nameField].name
      }
    }

    return (
      <>
        <StyledTypeGrid container spacing={1}>
          <StyledGrid item sm={12} xs={10}>
            <Typography variant="h6">

              Вы можете загрузить список файлом
              <IconButton aria-label="Close" onClick={handleModalOpen}>
                <HelpOutline color='primary' />
              </IconButton>

            </Typography>

            {!checkFile && <>
              <Styledinput
                accept=".xls, .xlsx"
                id="text-button-file"
                type="file"
                onChange={this.uploadFile}
              />
              <label htmlFor="text-button-file">
                <Button
                  fullWidth
                  variant='outlined'
                  color='primary'
                  component="span"
                >
                  Выбрать файл
                </Button>
              </label>
            </>}
            {checkFile && <Chip
              avatar={
                <StyledAvatar>
                  <AttachFileRounded color='primary' />
                </StyledAvatar>
              }
              label={
                <Styledp>
                  {nameFile}
                </Styledp>
              }
              onDelete={this.handleDeleteFile}
              variant='outlined'
              color='primary'
            />}



          </StyledGrid>
        </StyledTypeGrid>

        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={this.handleClose}
          variant='outlined'
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{textSnackbar}</span>}
          action={
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={this.handleClose}
            >
              <Close />
            </IconButton>
          }
        />
      </>
    )
  }
}


const DEFAULT_OBJECT = {
  senderClient: {...DEFAULT_SENDER_CLIENT},
  senderOperator: {...DEFAULT_SENDER_OPERATOR},
  receiverClient: {...DEFAULT_RECEIVER_CLIENT},
  receiverOperator: {...DEFAULT_RECEIVER_OPERATOR}
}

export default withSnackbar(TypeUploadData)
