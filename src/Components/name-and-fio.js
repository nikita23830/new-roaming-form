import React from "react";
import { Grid } from "@material-ui/core";
import { Field } from "react-final-form";
import { StyledGrid } from "../StyledComponents/step/";

export const NameAndFio = props => {
  const { typeUL, disable, insertkey, component } = props;

  return (
    <>
      {typeUL && (
        <StyledGrid container spacing={1}>
          <Grid item xs={12}>
            <Field
              disabled={disable}
              required={!disable}
              fullWidth
              name={`${insertkey}.name`}
              label="Название организации"
              component={component}
            />
          </Grid>
        </StyledGrid>
      )}
      {!typeUL && (
        <StyledGrid container spacing={1}>
          <Grid item xs={12} sm={4}>
            <Field
              disabled={disable}
              required={!disable}
              fullWidth
              name={`${insertkey}.lastname`}
              label="Имя"
              component={component}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Field
              disabled={disable}
              required={!disable}
              fullWidth
              name={`${insertkey}.firstname`}
              label="Фамилия"
              component={component}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Field
              disabled={disable}
              fullWidth
              name={`${insertkey}.patronymic`}
              label="Отчество"
              component={component}
            />
          </Grid>
        </StyledGrid>
      )}
    </>
  );
};
