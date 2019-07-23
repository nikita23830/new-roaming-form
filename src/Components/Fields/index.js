import React from 'react'
import styled from 'styled-components'
import { TextField } from 'final-form-material-ui'
import { Field } from "react-final-form";
import { PARSE_FIELD, VALIDATE_FIELD } from 'Constants/Components/Fields'
import { OPERATORS, ELITE_OPERATORS } from "Constants";
import { DataConsumer } from 'Utils/context'

export const DefaultField = ({ nameFieldArray, name, label, indexKey, indexRff }) => (
  <DataConsumer>
  {({ formApi }) => {
    let required = true
    if (formApi) {
      const values = formApi.getState().values[nameFieldArray][indexRff]
      if (name === 'patronymic') required = false;
      if (name === 'id' && nameFieldArray === 'receiverOperator') required = false;
      if (name === 'number' && values['id'] && values['id'].length > 3)
        if (ELITE_OPERATORS.indexOf(values['id'].substr(0, 3)) === -1)
            required = false;
    }
    return (
      <Field
        parse={PARSE_FIELD[name]}
        validate={name === 'id' ? VALIDATE_FIELD[nameFieldArray] : VALIDATE_FIELD[name]}
        name={`${indexKey}.${name}`}
        label={label}
        fullWidth
        required={required}
        component={StyledTextField}
      />
    )
  }}
  </DataConsumer>
)

const StyledTextField = styled(TextField)` && {
  min-height: 80px;
}`;
