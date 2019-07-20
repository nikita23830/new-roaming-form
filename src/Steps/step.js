import React, { Component } from "react";
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
import { ButtonDeleteField } from 'Components/Button/ButtonDeleteField'
import ParseFile from 'Components/ParseFile'
import { DefaultStep } from 'Components/Step'
import { limit } from "../Utils";

const DEFAULT_OBJECT = {
  senderClient: { ...DEFAULT_SENDER_CLIENT },
  senderOperator: { ...DEFAULT_SENDER_OPERATOR },
  receiverClient: { ...DEFAULT_RECEIVER_CLIENT },
  receiverOperator: { ...DEFAULT_RECEIVER_OPERATOR }
};

class StepContents extends Component {
  uploadFile = file => {
    const { type, finalformApi, showSnackbar } = this.props;
    const files = file.target.files[0];

    if (files.type === "application/pdf") {
      finalformApi.change(`${type}file`, files);
    } else
      showSnackbar.enqueueSnackbar({
        message: 'Файл должен иметь расширение ".pdf"',
        options: { variant: "error" }
      });
  };

  handleDeleteFile = () => {
    const { type, finalformApi } = this.props;

    finalformApi.change(`${type}file`, undefined);
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

    const list =  valuesFinalForm[`${activeStep === 0 ? "sender" : "receiver"}${type}file`]

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

              {/* <GridButton container>
                {!(type === "Client" && activeStep === 0) && (
                  <Button
                    variant="outlined"
                    color="primary"
                    disabled={but.addDisable}
                    onClick={() => {
                      if (fields.length < 100)
                        mutatorsFinalForm.push(
                          nameFieldArray,
                          DEFAULT_OBJECT[nameFieldArray]
                        );
                    }}
                  >
                    {activeStep === 0
                      ? "Добавить клиента"
                      : "Добавить контрагента"}
                  </Button>
                )}
                {type === "Client" &&
                  activeStep === 1 &&
                  need_dop &&
                  !filename && (
                    <>
                      <Styledinput
                        accept=".pdf"
                        id="soglash-button-file"
                        type="file"
                        onChange={this.uploadFile}
                      />
                      <label htmlFor="soglash-button-file">
                        <Button
                          fullWidth
                          variant="outlined"
                          color="primary"
                          component="span"
                        >
                          Загрузить доп. соглашение
                        </Button>
                      </label>
                    </>
                  )}
                {type === "Client" && activeStep === 1 && need_dop && filename && (
                  <Chip
                    avatar={
                      <StyledAvatar>
                        <AttachFileRounded color="primary" />
                      </StyledAvatar>
                    }
                    label={<Styledp>{filename}</Styledp>}
                    onDelete={this.handleDeleteFile}
                    variant="outlined"
                    color="primary"
                  />
                )}
              </GridButton>*/}
            </>
          )}
        </FieldArray>
      </>
    );
  }
}

const parse = value => {
  const someFormat = formatStringByPattern(
    "XXXXXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX"
  );
  let newValue = someFormat(value.toUpperCase());
  return newValue;
};

export default StepContents;
