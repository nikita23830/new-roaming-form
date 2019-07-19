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

import { ButtonUpload } from 'Components/Button/ButtonUpload'
import { DefaultChip } from 'Components/Chip'

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
          <IconButton
            style={{ color: "#fff" }}
            onClick={() => {
              closeSnackbar(key);
            }}
          >
            <DeleteOutline />
          </IconButton>
        )
      });
      finalformApi.change(`${nameField}file`, files);
      finalformApi.change(nameField, [{ ...DEFAULT_OBJECT[nameField] }]);
    } else
      enqueueSnackbar(
        'Файл должен иметь расширение ".xls" или ".xlsx"',
        {
          variant: "error",
          persist: true,
          action: key => (
            <IconButton
              style={{ color: "#fff" }}
              onClick={() => {
                closeSnackbar(key);
              }}
            >
              <DeleteOutline />
            </IconButton>
          )
        }
      );
  };

  handleDeleteFile = ({ finalformApi, nameField }) => () => finalformApi.change(nameField, undefined);

  handleClose = () => this.setState({ openSnackbar: false });

  render() {
    const { openSnackbar, textSnackbar } = this.state;
    const { activeStep, type, handleModalOpen, finalformApi } = this.props;
    const nameField = `${activeStep === 0 ? "sender" : "receiver"}${type}file`;
    let checkFile = false;
    let nameFile = "";
    if (finalformApi) {
      const { values } = finalformApi.getState();
      if (values && values[nameField]) {
        checkFile = true;
        nameFile = values[nameField].name;
      }
    }

    return (
      <>
      <StyledTypeGrid container spacing={1}>
        <StyledGrid item sm={12} xs={10}>
          <Typography variant="h6">
            Вы можете загрузить список файлом
            <IconButton aria-label="Close" onClick={handleModalOpen}>
              <HelpOutline color="primary" />
            </IconButton>
          </Typography>

          {!checkFile && <ButtonUpload accept='.xls, .xlsx' uploadFile={this.uploadFile} text='Выбрать файл' />}
          {checkFile && <DefaultChip nameField={nameField} handleDeleteFile={this.handleDeleteFile} />}
        </StyledGrid>
      </StyledTypeGrid>
      </>
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
