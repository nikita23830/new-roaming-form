import React from 'react'
import { MenuItem, Select, InputLabel, FormControl, FormHelperText } from '@material-ui/core'
import { Field } from "react-final-form";
import { DataConsumer } from 'Utils/context'
import { PARSE_FIELD, VALIDATE_FIELD } from 'Constants/Components/Fields'
import { OPERATORS } from "Constants";

export const DefaultSelect = ({ nameFieldArray, name, label, indexKey }) => (
  <DataConsumer>
    {context => {
      let file = false
      if (context && context.formApi) {
        const { values } = context.formApi.getState()
        file = values[`${nameFieldArray}file`] ? true : false
      }
      return (
        <Field
          name={`${indexKey}.${name}`}
          parse={PARSE_FIELD[name]}
          validate={VALIDATE_FIELD[name]}
        >
          {({ input, meta }) => {
            if (file) meta.error = undefined

            let booleanError = (meta.error && meta.touched) ? true : false
            let textError = (meta.error && meta.touched) ? meta.error : ''
            return (
              <>
                <FormControl fullWidth>
                  <InputLabel htmlFor="operator-select" error={booleanError}>{label}</InputLabel>
                  <Select
                    {...input}
                    inputProps={{
                      name: 'operator',
                      id: 'operator-select',
                    }}
                    fullWidth
                    disabled={file}
                    required={!file}
                    name={`${indexKey}.${name}`}
                    component={Select}
                    parse={PARSE_FIELD[name]}
                    validate={VALIDATE_FIELD[name]}
                    error={booleanError}
                  >
                    {OPERATORS.map(option => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText error={booleanError}>{textError}</FormHelperText>
                </FormControl>
              </>
            )
          }}
        </Field>
      )
    }}
  </DataConsumer>
)
