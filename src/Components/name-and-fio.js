import React from "react";
import { Grid } from "@material-ui/core";
import { Field } from "react-final-form";

import { StyledGrid } from '../StyledComponents/step/'

export const NameAndFio = props => {
  const { typeUL, disable, key, component } = props

  return (
    <>
      {typeUL && <StyledGrid item xs={12} sm={12}>
        <Field
          disabled={disable}
          required={!disable}
          fullWidth
          name={`${key}.name`}
          label='Название организации'
          component={component}
        />
      </StyledGrid>}
      {!typeUL && <StyledGrid container spacing={1}>
        <Grid item xs={12} sm={4}>
          <Field
            disabled={disable}
            required={!disable}
            fullWidth
            name={`${key}.lastname`}
            label='Имя'
            component={component}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Field
            disabled={disable}
            required={!disable}
            fullWidth
            name={`${key}.firstname`}
            label='Фамилия'
            component={component}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Field
            disabled={disable}
            fullWidth
            name={`${key}.patronymic`}
            label='Отчество'
            component={component}
          />
        </Grid>
      </StyledGrid>}
    </>
  )
}
