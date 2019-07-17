export const required = value => (value ? undefined : "Обязательное поле");

export const mustBeLenght = (arrLenght) => value => arrLenght.indexOf(value.length) === -1 ? "Некорректно" : undefined

export const checkMail = value => (/[a-zA-Zа-яА-Я0-9._%+-]+@[a-zA-Zа-яА-Я0-9.-]+\.[a-zA-Zа-яА-Я]{2,}$/.test(value) ? undefined : 'Некорректный email')

export const composeValidators = (...validators) => value =>
  validators.reduce((error, validator) => error || validator(value), undefined);
