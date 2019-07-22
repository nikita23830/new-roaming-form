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
  Abonent: [...STEP_CLIENT],
  Operator: [...STEP_OPERATOR]
}

const DEFAULT_OBJECT = {
  inn: '',
  kpp: '',
  name: '',
  lastname: '',
  firstname: '',
  patronymic: '',
}

export const DEFAULT_SENDER_CLIENT = {
  ...DEFAULT_OBJECT,
  id: '',
  email: '',
}

export const DEFAULT_RECEIVER_CLIENT = {
  ...DEFAULT_OBJECT,
  operator: '',
}

export const DEFAULT_SENDER_OPERATOR = {
  ...DEFAULT_OBJECT,
  id: '',
  number: '',
}

export const DEFAULT_RECEIVER_OPERATOR = {
  ...DEFAULT_OBJECT,
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

export const DEFAULT_OBJECT_VALIDATE = {
  senderAbonent: [...Object.keys(DEFAULT_SENDER_CLIENT)],
  senderOperator: [...Object.keys(DEFAULT_SENDER_OPERATOR)],
  receiverAbonent: [...Object.keys(DEFAULT_RECEIVER_CLIENT)],
  receiverOperator: [...Object.keys(DEFAULT_RECEIVER_OPERATOR)]
}

export const NAMED_FIELD = {
  inn: 'ИНН',
  kpp: 'КПП',
  name: 'Название организации',
  lastname: 'Фамилия',
  firstname: 'Имя',
  patronymic: 'Отчество',
  email: 'E-mail',
  id: 'Идентификатор',
  operator: 'Выберите оператора',
  number: 'Номер заявки',
}
