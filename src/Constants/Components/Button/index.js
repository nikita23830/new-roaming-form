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

export const COMMON_OBJECT = {
  senderClient: {...DEFAULT_SENDER_CLIENT},
  senderOperator: {...DEFAULT_SENDER_OPERATOR},
  receiverClient: {...DEFAULT_RECEIVER_CLIENT},
  receiverOperator: {...DEFAULT_RECEIVER_OPERATOR}
}
