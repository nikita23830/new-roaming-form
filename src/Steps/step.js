import React, { Component } from "react";
import { withSnackbar } from "notistack";
import {
  Grid,
  Button,
  MenuItem,
  Chip,
  InputAdornment
} from "@material-ui/core";
import { DeleteOutlined, AttachFileRounded } from "@material-ui/icons";
import { Field } from "react-final-form";
import { FieldArray } from "react-final-form-arrays";
import { Select } from "final-form-material-ui";
import formatStringByPattern from "format-string-by-pattern";

import {
  MainCard,
  StyledTextField,
  StyledGrid,
  GridButton,
  StyledIconButton,
  Styledinput,
  StyledAvatar,
  Styledp
} from "../StyledComponents/step/";
import { NameAndFio } from "../Components/name-and-fio";
import {
  OPERATORS,
  ELITE_OPERATORS,
  DEFAULT_SENDER_CLIENT,
  DEFAULT_SENDER_OPERATOR,
  DEFAULT_RECEIVER_CLIENT,
  DEFAULT_RECEIVER_OPERATOR,
  DEFAULT_OBJECT_VALIDATE,
  NAMED_FIELD
} from "../Constants";

import { DefaultField } from 'Components/Fields'
import { DefaultSelect } from 'Components/Select'
import ParseFile from 'Components/ParseFile'
import { DefaultStep } from 'Components/Step'
import { limit } from "../Utils";
import { ButtonBottomToolBox, ButtonDeleteField } from 'Components/Button'

const DEFAULT_OBJECT = {
  senderClient: { ...DEFAULT_SENDER_CLIENT },
  senderOperator: { ...DEFAULT_SENDER_OPERATOR },
  receiverClient: { ...DEFAULT_RECEIVER_CLIENT },
  receiverOperator: { ...DEFAULT_RECEIVER_OPERATOR }
};

class StepContents extends Component {
  uploadFile = finalformApi => file => {
    const { type, enqueueSnackbar } = this.props;
    const files = file.target.files[0];

    if (files.type === "application/pdf") {
      finalformApi.change(`${type}file`, files);
    } else
      enqueueSnackbar({
        message: 'Файл должен иметь расширение ".pdf"',
        options: { variant: "error" }
      });
  };

  handleDeleteFile = ({ finalformApi }) => () => {
    const { type } = this.props;
    if (finalformApi) finalformApi.change(`${type}file`, undefined);
  };

  render() {
    const {
      type,
      activeStep,
      finalformApi,
      valuesFinalForm,
      mutatorsFinalForm
    } = this.props;

    const nameFieldArray = `${activeStep === 0 ? "sender" : "receiver"}${type}`;

    const list = valuesFinalForm[`${activeStep === 0 ? "sender" : "receiver"}${type}file`]

    const checkFile = valuesFinalForm[`${type}file`]

    return (
      <>
        <FieldArray name={nameFieldArray}>
          {({ fields }) => (
            <>
              {fields.map((key, index) => {
                return (
                  <>
                    {!list && <DefaultStep
                      nameFieldArray={nameFieldArray}
                      fields={fields}
                      indexKey={key}
                      index={index}
                    />}
                    {list && <ParseFile file={list} />}
                  </>
                );
              })}

              <ButtonBottomToolBox
                activeStep={activeStep}
                nameFieldArray={nameFieldArray}
                length={fields.length}
                uploadFile={this.uploadFile}
                handleDeleteFile={this.handleDeleteFile}
                checkFile={checkFile}
              />
            </>
          )}
        </FieldArray>
      </>
    );
  }
}


export default withSnackbar(StepContents);
