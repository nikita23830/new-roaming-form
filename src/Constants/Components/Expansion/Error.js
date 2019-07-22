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
