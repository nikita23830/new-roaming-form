import { Grid, MenuItem } from "@material-ui/core"
import { TextField, Select } from 'final-form-material-ui'
import { Field } from "react-final-form";
import styled from 'styled-components';
import { PARSE_STEP, VALIDATE_STEP, OPERATORS } from '../Constants/FieldStep'

export const FieldStep = ({ label, name, itemKey, xs }) => {

  return (
    <StyledGrid item sm={12} xs={xs} >
      {(name !== 'operator') && <Field
        fullWidth
        component={StyledTextField}
        label={label}
        name={`${itemKey}.${name}`}
        parse={PARSE_STEP[name]}
        validate={VALIDATE_STEP[name]}
      />}
      {(name === 'operator') && <Field
        name={`${itemKey}.${name}`}
        label={name}
        component={Select}
        formControlProps={{ fullWidth: true }}
        validate={VALIDATE_STEP[name]}
      >
        {OPERATORS.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Field>}
    </StyledGrid>
  )
};

const StyledTextField = styled(TextField)`
 && {
   min-height: 70px;
  }
`;

export const StyledGrid = styled(Grid)`
 && {
   max-height: 80px;
  }
`
