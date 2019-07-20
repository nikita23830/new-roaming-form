import React, { Component } from "react";
import { withSnackbar } from "notistack";
import {
  Button,
  Typography,
  IconButton,
  Chip,
  Snackbar
} from "@material-ui/core";
import {
  AttachFileRounded,
  HelpOutline,
  Close,
  DeleteOutline
} from "@material-ui/icons";
import {
  StyledTypeGrid,
  StyledGrid,
  Styledinput,
  Styledp,
  StyledAvatar
} from "../StyledComponents/components/type-upload-data/";
import {
  DEFAULT_SENDER_CLIENT,
  DEFAULT_SENDER_OPERATOR,
  DEFAULT_RECEIVER_CLIENT,
  DEFAULT_RECEIVER_OPERATOR
} from "../Constants";

import { DefaultChip } from 'Components/Chip'
import { ButtonUpload, ButtonCloseSnackbar } from 'Components/Button'
import { DataConsumer } from 'Utils/context'


class TypeUploadData extends Component {
  state = {
    openSnackbar: false,
    textSnackbar: ""
  };

  uploadFile = finalformApi => file => {
    const { activeStep, type, enqueueSnackbar, closeSnackbar } = this.props;
    const nameField = `${activeStep === 0 ? "sender" : "receiver"}${type}`;
    const files = file.target.files[0];
    const normal_type = [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-excel"
    ];

    if (files.type === normal_type[0] || files.type === normal_type[1]) {
      enqueueSnackbar("Список успешно загружен", {
        variant: "success",
        persist: true,
        action: key => (
          <ButtonCloseSnackbar close={closeSnackbar} key={key} />
        )
      });
      finalformApi.change(`${nameField}file`, files);
      finalformApi.change(nameField, [{ ...DEFAULT_OBJECT[nameField] }]);
    } else
      enqueueSnackbar('Файл должен иметь расширение ".xls" или ".xlsx"', {
          variant: "error",
          persist: true,
          action: key => (
            <ButtonCloseSnackbar close={closeSnackbar} key={key} />
          )
        }
      );
  };

  handleDeleteFile = ({ finalformApi, nameField }) => () => finalformApi.change(nameField, undefined);

  handleClose = () => this.setState({ openSnackbar: false });

  render() {
    return (
      <DataConsumer>
      {context => {
        const { activeStep, type, handleModalOpen } = this.props;
        const nameField = `${activeStep === 0 ? "sender" : "receiver"}${type}file`;
        let checkFile = false
        if (context && context.formApi) {
          const { values } = context.formApi.getState()
          checkFile = values[nameField]
        }
        return (
          <StyledTypeGrid container spacing={1}>
            <StyledGrid item sm={12} xs={10}>
              <Typography variant="h6">
                Вы можете загрузить список файлом
                <IconButton aria-label="Close" onClick={handleModalOpen}>
                  <HelpOutline color="primary" />
                </IconButton>
              </Typography>
              {!checkFile && <ButtonUpload accept='.xls, .xlsx' uploadFile={this.uploadFile} text='Выбрать файл' />}
              {checkFile && <DefaultChip nameField={nameField} handleDeleteFile={this.handleDeleteFile} file={checkFile} />}
            </StyledGrid>
          </StyledTypeGrid>
        )
      }}
      </DataConsumer>
    );
  }
}

const DEFAULT_OBJECT = {
  senderClient: { ...DEFAULT_SENDER_CLIENT },
  senderOperator: { ...DEFAULT_SENDER_OPERATOR },
  receiverClient: { ...DEFAULT_RECEIVER_CLIENT },
  receiverOperator: { ...DEFAULT_RECEIVER_OPERATOR }
};

export default withSnackbar(TypeUploadData);
