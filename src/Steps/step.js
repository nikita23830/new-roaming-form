import React, { Component } from "react";
import { Grid, Button } from "@material-ui/core";
import { DeleteOutlined } from "@material-ui/icons";
import { Field } from "react-final-form";
import { FieldArray } from 'react-final-form-arrays'

import { MainCard, StyledTextField, StyledGrid, GridButton, StyledIconButton } from '../StyledComponents/step/'
import MainContext from '../App'
import { DEFAULT_OBJECT } from '../Constants'

class StepContents extends Component {

  render () {
    const { type, activeStep, finalformApi, valuesFinalForm, mutatorsFinalForm } = this.props
    const nameFieldArray = `${activeStep === 0 ? 'sender' : 'receiver'}${type}`

    console.log(nameFieldArray)
    return (
      <>
        <FieldArray name={nameFieldArray}>
          {({ fields }) => (
            <>
              {fields.map((key, index) => {
                console.log(fields)
                console.log(valuesFinalForm)
                let objDis = { disable: true, disableKpp: true, typeUl: true, number: false }
                // if (valuesFinalForm[nameFieldArray] && valuesFinalForm[nameFieldArray][index])
                //   { inn, id } = valuesFinalForm[nameFieldArray][index]
                // let objDis = { disable: true, disableKpp: true, typeUl: true, number: false }
                // if (inn && (inn.length === 10 || inn.length === 12))
                //   objDis = {
                //     disable: false,
                //     disableKpp: inn.length === 10 ? false : true,
                //     typeUl: inn.length === 12 ? false : true,
                //   }
                // if (id && id.length > 2) {
                //   let subId = id.substr(0, 3)
                //   if (subId === '2AK' || subId === '2BM' || subId === '2BE') objDis.number = true
                // }

                return (
                <>
                  <MainCard>

                  <StyledIconButton
                    onClick={() => { if (fields.length > 1) mutatorsFinalForm.remove(nameFieldArray, index) }}
                  >
                    <DeleteOutlined color='primary' />
                  </StyledIconButton>

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
                    {objDis.typeUl && <StyledGrid item xs={12} sm={12}>
                      <Field
                        disabled={objDis.disable}
                        required={!objDis.disable}
                        fullWidth
                        component={StyledTextField}
                        label="Название организации"
                        name={`${key}.name`}
                      />
                    </StyledGrid>}
                    {!objDis.typeUl && <StyledGrid container spacing={1}>
                      <Grid item xs={12} sm={4}>
                        <Field
                          disabled={objDis.disable}
                          required={!objDis.disable}
                          fullWidth
                          component={StyledTextField}
                          label="Имя"
                          name={`${key}.lastname`}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <Field
                          disabled={objDis.disable}
                          required={!objDis.disable}
                          fullWidth
                          component={StyledTextField}
                          label="Фамилия"
                          name={`${key}.firstname`}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <Field
                          disabled={objDis.disable}
                          fullWidth
                          component={StyledTextField}
                          label="Отчество"
                          name={`${key}.patronymic`}
                        />
                      </Grid>
                    </StyledGrid>}
                    <StyledGrid item xs={12} sm={12}>
                      <Field
                        disabled={objDis.disable}
                        required={!objDis.disable}
                        fullWidth
                        component={StyledTextField}
                        label="Идентификатор"
                        name={`${key}.id`}
                      />
                    </StyledGrid>
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
                    </MainCard>
                  </>
                )
              })}

              <GridButton container>
              {!(type === 'Client' && activeStep === 0) &&
                <Button
                  variant="outlined"
                  color="primary"
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
