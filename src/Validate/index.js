export const required = value => (value ? undefined : "Обязательное поле");

export const mustBeLenght = (arrLenght) => value => (value && arrLenght.indexOf(value.length) === -1)
  ? `Значение поля должно содержать ${arrLenght[0]} ${arrLenght[1] ? `или ${arrLenght[1]} ` : ''}символов`
  : undefined

export const checkMail = value => (/[a-zA-Zа-яА-Я0-9._%+-]+@[a-zA-Zа-яА-Я0-9.-]+\.[a-zA-Zа-яА-Я]{2,}$/.test(value) ? undefined : 'Некорректный email')

export const checkGuid = value => { if (value.length > 3) return value.substr(0,3) !== '2AE' ? 'Идентификатор должен начинаться на 2AE' : undefined}

export const composeValidators = (...validators) => value =>
  validators.reduce((error, validator) => error || validator(value), undefined);
