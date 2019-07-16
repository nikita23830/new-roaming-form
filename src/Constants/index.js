export const STEP_OPERATOR = [
  'Данные вашего клиента',
  'Контрагенты в АО Калуга Астрал',
  'Проверка введенных данных'
]

export const STEP_CLIENT = [
  'Данные вашей организации',
  'Данные ваших контрагентов',
  'Проверка введенных данных'
]

export const STEP = {
  Client: [...STEP_CLIENT],
  Operator: [...STEP_OPERATOR]
}

export const DEFAULT_OBJECT_FIELD = {
  inn: '',
  kpp: '',
  name: '',
  lastname: '',
  firstname: '',
  patronymic: ''
}

export const DEFAULT_SENDER_CLIENT = {
  ...DEFAULT_OBJECT_FIELD,
  id: '',
  email: '',
}

export const DEFAULT_RECEIVER_CLIENT = {
  ...DEFAULT_OBJECT_FIELD,
  operator: '',
}

export const DEFAULT_SENDER_OPERATOR = {
  ...DEFAULT_OBJECT_FIELD,
  id: '',
  number: '',
}

export const DEFAULT_RECEIVER_OPERATOR = {
  ...DEFAULT_OBJECT_FIELD,
  id: '',
}

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

export const ELITE_OPERATORS = [
  '2BM',
  '2BE',
  '2AL'
]

export const EXPANSION = [
  'errors',
  'sender',
  'files',
  'receiver'
]
