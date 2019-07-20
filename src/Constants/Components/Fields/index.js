import formatStringByPattern from "format-string-by-pattern";
import { composeValidators, required, mustBeLenght, checkMail, checkGuid } from 'Validate'

const parse = value => {
  const someFormat = formatStringByPattern(
    "XXXXXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX"
  );
  let newValue = someFormat(value.toUpperCase());
  return newValue;
};

export const PARSE_FIELD = {
  id: parse,
  inn: formatStringByPattern("999999999999"),
  kpp: formatStringByPattern("999999999"),
  name: (value) => value,
  lastname: (value) => value,
  firstname: (value) => value,
  patronymic: (value) => value,
  email: (value) => value,
  number: formatStringByPattern("999999"),
  operator: (value) => value
}

export const VALIDATE_FIELD = {
  id: composeValidators(required, mustBeLenght([39]), checkGuid),
  inn: composeValidators(required, mustBeLenght([10, 12])),
  kpp: composeValidators(required, mustBeLenght([9])),
  name: composeValidators(required),
  lastname: composeValidators(required),
  firstname: composeValidators(required),
  patronymic: null,
  email: composeValidators(required, checkMail),
  number: composeValidators(required, mustBeLenght([6])),
  operator: composeValidators(required)
}
