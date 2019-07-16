import formatStringByPattern from "format-string-by-pattern";
import { composeValidators, required, mustBeLenght, checkMail } from '../Validate/newIndex'

const PARSE_STEP = {
  inn: formatStringByPattern('999999999999'),
  kpp: formatStringByPattern('999999999'),
  id: parse,
  number: formatStringByPattern("999999"),
  email: null,
  operator: null,
  name: null,
  lastname: null,
  firstname: null,
  patronymic: null,
};

const VALIDATE_STEP = {
  inn: composeValidators(required, mustBeLenght([10, 12])),
  kpp: composeValidators(required, mustBeLenght([9])),
  id: composeValidators(required, mustBeLenght([39])),
  number: composeValidators(required, mustBeLenght([6])),
  email: composeValidators(required, checkMail),
  operator: composeValidators(required),
  name: composeValidators(required),
  lastname: composeValidators(required),
  firstname: composeValidators(required),
  patronymic: null,
};

export const OPERATORS = [
  {
    value: "2JD",
    label: "АО НИИАС – 2JD"
  },
  {
    value: "2BN",
    label: "Линк-Сервис – 2BN"
  },
  {
    value: "2BM",
    label: "СКБ Контур.Диадок – 2BM"
  },
  {
    value: "2AL",
    label: "Такском – 2AL"
  },
  {
    value: "2AK",
    label: "ТаксНет – 2AK"
  },
  {
    value: "2BE",
    label: "Тензор СБиС – 2BE"
  },
  {
    value: "2IG",
    label: "Synerdocs – 2IG"
  }
];

export const DEFAULT_FIELD = {
  senderClient: { ...DEFAULT_SENDER_CLIENT },
  senderOperator: { ...DEFAULT_SENDER_OPERATOR},
  receiverClient: { ...DEFAULT_RECEIVER_CLIENT},
  receiverOperator: { ...DEFAULT_RECEIVER_OPERATOR}
}

const parse = value => {
  const someFormat = formatStringByPattern(
    "XXXXXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX"
  );
  let newValue = someFormat(value.toUpperCase());
  return newValue;
};
