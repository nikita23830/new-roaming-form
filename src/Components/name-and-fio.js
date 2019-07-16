import React from "react";
import { Grid } from "@material-ui/core";
import { Field } from "react-final-form";

import { StyledGrid } from '../StyledComponents/step/'

import { composeValidators, required } from '../Validate/newIndex'

export const NameAndFio = props => {
  const { typeUL, disable, insertkey, component } = props

  return (
    <>
      {typeUL && <StyledGrid item xs={12} sm={12}>
        <Field
          disabled={disable}
          required={!disable}
          fullWidth
          name={`${insertkey}.name`}
          label='Название организации'
          component={component}
          validate={composeValidators(required)}
        />
      </StyledGrid>}
      {!typeUL && <StyledGrid container spacing={1}>
        <Grid item xs={12} sm={4}>
          <Field
            disabled={disable}
            required={!disable}
            fullWidth
            name={`${insertkey}.lastname`}
            label='Имя'
            component={component}
            validate={composeValidators(required)}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Field
            disabled={disable}
            required={!disable}
            fullWidth
            name={`${insertkey}.firstname`}
            label='Фамилия'
            component={component}
            validate={composeValidators(required)}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Field
            disabled={disable}
            fullWidth
            name={`${insertkey}.patronymic`}
            label='Отчество'
            component={component}
            validate={composeValidators(required)}
          />
        </Grid>
      </StyledGrid>}
    </>
  )
}
