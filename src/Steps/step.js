import React, { Component } from "react";
import { Grid, Button, MenuItem } from "@material-ui/core";
import { DeleteOutlined } from "@material-ui/icons";
import { Field } from "react-final-form";
import { FieldArray } from 'react-final-form-arrays'
import { Select } from 'final-form-material-ui'

import { MainCard, StyledTextField, StyledGrid, GridButton, StyledIconButton } from '../StyledComponents/step/'
import { NameAndFio } from '../Components/name-and-fio'
import { DEFAULT_OBJECT, OPERATORS } from '../Constants'

import {limit} from '../Utils'

class StepContents extends Component {

  render () {
    const { type, activeStep, finalformApi, valuesFinalForm, mutatorsFinalForm } = this.props
    const nameFieldArray = `${activeStep === 0 ? 'sender' : 'receiver'}${type}`

    let but = {}
    return (
      <>
        <FieldArray name={nameFieldArray}>
          {({ fields }) => (
            <>
              {fields.map((key, index) => {

                let objDis = limit(valuesFinalForm[nameFieldArray][index])
                but = {
                  addDisable: fields.length > 99 ? true : false,
                  deleteColor: fields.length === 1 ? 'default' : 'primary',
                  deleteDisable: fields.length === 1 ? true : false
                }

                return (
                <>
                  <MainCard>
                    <StyledGrid container spacing={1}>
                      <Grid item xs={12} sm={6}>
                          <Field
                            fullWidth
                            component={StyledTextField}
                            label="ИНН"
                            name={`${key}.inn`}
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
                          />
                        </Grid>
                      </StyledGrid>

                      <NameAndFio
                        disable={objDis.disable}
                        typeUL={objDis.typeUl}
                        key={key}
                        component={StyledTextField}
                      />

                      {!(type === 'Client' && activeStep === 1) && <StyledGrid item xs={12} sm={12}>
                        <Field
                          disabled={objDis.disable}
                          required={!objDis.disable}
                          fullWidth
                          component={StyledTextField}
                          label="Идентификатор"
                          name={`${key}.id`}
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
                  onClick={() => { if (fields.length < 100) mutatorsFinalForm.push(nameFieldArray, { ...DEFAULT_OBJECT }) }}
                >
                  {activeStep === 0
                    ? 'Добавить клиента'
                    : 'Добавить контрагента'
                  }
                </Button>
              }
              {(type === 'Client' && activeStep === 1) &&
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => { if (fields.length < 100) mutatorsFinalForm.push(nameFieldArray, { ...DEFAULT_OBJECT }) }}
                >
                  Загрузить доп. соглашение
                </Button>
              }
              </GridButton>
            </>
          )}
        </FieldArray>
      </>
    )
  }
};


export default StepContents
