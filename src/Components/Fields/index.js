import React from 'react'
import styled from 'styled-components'
import { TextField } from 'final-form-material-ui'
import { Field } from "react-final-form";
import { PARSE_FIELD, VALIDATE_FIELD } from 'Constants/Components/Fields'
import { OPERATORS } from "Constants";

export const DefaultField = ({ nameFieldArray, name, label, indexKey }) => (
  <Field
    parse={PARSE_FIELD[name]}
    validate={name === 'id' ? VALIDATE_FIELD[nameFieldArray] : VALIDATE_FIELD[name]}
    name={`${indexKey}.${name}`}
    label={label}
    fullWidth
    required={(name === 'patronymic' || (nameFieldArray === 'receiverOperator'
      && name === 'id') || name === 'number') ? false : true}
    component={StyledTextField}
  />
)

const StyledTextField = styled(TextField)` && {
  min-height: 80px;
}`;
