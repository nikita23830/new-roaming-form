import React, { Component } from "react";
import { Grid, Button, MenuItem, Chip, InputAdornment } from "@material-ui/core";
import { DeleteOutlined, AttachFileRounded } from "@material-ui/icons";
import { Field } from "react-final-form";
import { FieldArray } from 'react-final-form-arrays'
import { Select } from 'final-form-material-ui'
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
} from '../StyledComponents/step/'
import { NameAndFio } from '../Components/name-and-fio'
import {
  OPERATORS,
  ELITE_OPERATORS,
  DEFAULT_SENDER_CLIENT,
  DEFAULT_SENDER_OPERATOR,
  DEFAULT_RECEIVER_CLIENT,
  DEFAULT_RECEIVER_OPERATOR
} from '../Constants'

import { limit } from '../Utils'

const DEFAULT_OBJECT = {
  senderClient: {...DEFAULT_SENDER_CLIENT},
  senderOperator: {...DEFAULT_SENDER_OPERATOR},
  receiverClient: {...DEFAULT_RECEIVER_CLIENT},
  receiverOperator: {...DEFAULT_RECEIVER_OPERATOR}
}

class StepContents extends Component {

  uploadFile = file => {
    const { type, finalformApi, showSnackbar } = this.props
    const files = file.target.files[0]

    if (files.type === 'application/pdf') {
      finalformApi.change(`${type}file`, files)
    }
    else showSnackbar.enqueueSnackbar({
      message: 'Файл должен иметь расширение ".pdf"', options: { variant: 'error', },
    })
  }

  handleDeleteFile = () => {
    const { type, finalformApi } = this.props

    finalformApi.change(`${type}file`, undefined)
  }

  render () {
    const { type, activeStep, finalformApi, valuesFinalForm, mutatorsFinalForm } = this.props
    const nameFieldArray = `${activeStep === 0 ? 'sender' : 'receiver'}${type}`

    let but = {}
    let need_dop = valuesFinalForm[`${type}file`] ? true : false
    let disabelInn = valuesFinalForm[`${nameFieldArray}file`] ? true : false
    let filename = valuesFinalForm[`${type}file`] ? valuesFinalForm[`${type}file`].name : false

    if (activeStep === 1 && type === 'Client' && !need_dop) {
      valuesFinalForm[nameFieldArray].forEach((item, index) => {
        let { operator } = valuesFinalForm[nameFieldArray][index]
        need_dop = ELITE_OPERATORS.indexOf(operator) !== -1 ? true : need_dop
      })
    }

    return (
      <>
        <FieldArray name={nameFieldArray}>
          {({ fields }) => (
            <>
              {fields.map((key, index) => {
                let objDis = valuesFinalForm[nameFieldArray][index]
                  ? limit(valuesFinalForm[nameFieldArray][index])
                  : { disable: true, disableKpp: true, typeUl: true, number: false }
                but = {
                  addDisable: fields.length > 99 ? true : false,
                  deleteColor: fields.length === 1 ? 'default' : 'primary',
                  deleteDisable: fields.length === 1 ? true : false
                }

                if (finalformApi) finalformApi.submit()
                return (
                <>
                  <MainCard>
                    <StyledGrid container spacing={1}>
                      <Grid item xs={12} sm={6}>
                          <Field
                            fullWidth
                            disabled={disabelInn}
                            required={!disabelInn}
                            component={StyledTextField}
                            label="ИНН"
                            name={`${key}.inn`}
                            parse={formatStringByPattern("999999999999")}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Field
                            disabled={objDis.disableKpp}
                            required={!objDis.disableKpp}
                            fullWidth
                            component={StyledTextField}
                            label="КПП"
                            name={`${key}.kpp`}
                            parse={formatStringByPattern("999999999")}
                          />
                        </Grid>
                      </StyledGrid>

                      <NameAndFio
                        disable={objDis.disable}
                        typeUL={objDis.typeUl}
                        insertkey={key}
                        component={StyledTextField}
                      />

                      {!(type === 'Client' && activeStep === 1) && <StyledGrid item xs={12} sm={12}>
                        <Field
                          disabled={objDis.disable}
                          required={(type === 'Operator' && activeStep === 1) ? false : !objDis.disable}
                          fullWidth
                          component={StyledTextField}
                          label="Идентификатор"
                          name={`${key}.id`}
                          parse={parse}
                        />
                      </StyledGrid>}
                      {objDis.number && <StyledGrid item xs={12} sm={12}>
                        <Field
                          disabled={objDis.disable}
                          required={!objDis.disable}
                          fullWidth
                          component={StyledTextField}
                          label="Номер заявки"
                          name={`${key}.number`}
                          parse={formatStringByPattern("999999")}
                        />
                      </StyledGrid>}
                      {(activeStep === 0 && type === 'Client') && <StyledGrid item xs={12} sm={12}>
                        <Field
                          disabled={objDis.disable}
                          required={!objDis.disable}
                          fullWidth
                          component={StyledTextField}
                          label="E-mail"
                          name={`${key}.email`}
                        />
                      </StyledGrid>}
                      {(type === 'Client' && activeStep === 1) && <StyledGrid item xs={12} sm={12}>
                        <Field
                          disabled={objDis.disable}
                          required={!objDis.disable}
                          name={`${key}.operator`}
                          label="Выберете оператора"
                          component={Select}
                          formControlProps={{ fullWidth: true }}
                        >
                          {OPERATORS.map(option => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </Field>
                      </StyledGrid>}

                      {!(type === 'Client' && activeStep === 0) && <StyledIconButton
                        disabled={but.deleteDisable}
                        onClick={() => { if (fields.length > 1) mutatorsFinalForm.remove(nameFieldArray, index) }}
                      >
                        <DeleteOutlined color={but.deleteColor} />
                      </StyledIconButton>}

                    </MainCard>
                  </>
                )
              })}

              <GridButton container>
              {!(type === 'Client' && activeStep === 0) &&
                <Button
                  variant="outlined"
                  color="primary"
                  disabled={but.addDisable}
                  onClick={() => { if (fields.length < 100) mutatorsFinalForm.push(nameFieldArray, DEFAULT_OBJECT[nameFieldArray]) }}
                >
                  {activeStep === 0
                    ? 'Добавить клиента'
                    : 'Добавить контрагента'
                  }
                </Button>
              }
              {(type === 'Client' && activeStep === 1 && need_dop && !filename) &&
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
                      variant='outlined'
                      color='primary'
                      component="span"
                    >
                      Загрузить доп. соглашение
                    </Button>
                  </label>
                </>
              }
              {(type === 'Client' && activeStep === 1 && need_dop && filename) &&
                <Chip
                  avatar={
                    <StyledAvatar>
                      <AttachFileRounded color='primary' />
                    </StyledAvatar>
                  }
                  label={
                    <Styledp>
                      {filename}
                    </Styledp>
                  }
                  onDelete={this.handleDeleteFile}
                  variant='outlined'
                  color='primary'
                />
              }
              </GridButton>
            </>
          )}
        </FieldArray>
      </>
    )
  }
};

const parse = value => {
  const someFormat = formatStringByPattern(
    "XXXXXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX"
  );
  let newValue = someFormat(value.toUpperCase());
  return newValue;
};

export default StepContents
