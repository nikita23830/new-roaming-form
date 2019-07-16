import { DEFAULT_OBJECT_VALIDATE } from '../Constants'

export const validate = values => {
  let errors = {};
  let error = "";
  Object.keys(values).forEach(function(key) {
    // sender + receiver
    if (key === 'senderClient' || key === 'receiverClient' || key === 'senderOperator' || key === 'receiverOperator') {
      // if object value from operators
      values[key].map((item, index) => { // цикл sender or receiver

        if ((typeof item) === 'object') {
          // easy check
          DEFAULT_OBJECT_VALIDATE[key].forEach(keyItem => {
            // need object
            let value = values[key][index][keyItem] // value
            let objvalues = values[key][index] // object
            let type = key // name global object example: sender, receiver

            if (distributor[keyItem]) {
              error = distributor[keyItem]({ value, objvalues, type }); //
              if (error) { // if error value
                if (!errors[key]) errors[key] = []
                if (!errors[key][index]) errors[key][index] = {}
                errors[key][index][keyItem] = error;
              }
            }
          })
        }

      })

    }

  }, values);
  return errors;
};

const validationInn = ({ value, objvalues, type }) => {
  let inn = "";
  if (isNaN(value)) inn = "Некорректный ИНН";
  if (!value) inn = "Обязательное поле";
  if (value) {
    if (value.length !== 10 && value.length !== 12)
      inn = 'Некорректный ИНН'
  }
  return inn;
};

const validationKpp = ({ value, objvalues, type }) => {
  let kpp = "";
  if (objvalues.inn && objvalues.inn.length === 10) {
    if (!value) kpp = "Обязательное поле"
    if (value && value.length < 9) kpp = "Некорректный КПП"
  }
  return kpp;
};

const validationGuid = ({ value, objvalues, type }) => {
  let id = "";
  if (objvalues.inn && (objvalues.inn.length === 10 || objvalues.inn.length === 12) && !value)
    id = type !== 'receiverOperator' ? "Обязательное поле" : '';
  if (value && value.length < 36) id = "Некорректный идентификатор";
  return id;
};

const validationName = ({ value, objvalues, type }) => {
  let name = "";
  if (objvalues.inn && objvalues.inn.length === 10 && !value)
    name = "Обязательное поле";
  return name;
};

const validationLastName = ({ value, objvalues, type }) => {
  let lastname = "";
  if (objvalues.inn && objvalues.inn.length === 12 && !value)
    lastname = "Обязательное поле";
  return lastname;
};

const validationFirstName = ({ value, objvalues, type }) => {
  let firstname = "";
  if (objvalues.inn && objvalues.inn.length === 12 && !value)
    firstname = "Обязательное поле";
  return firstname;
};

const validationEmail = ({ value, objvalues, type }) => {
  let email = "";
  if (objvalues.inn && (objvalues.inn.length === 10 || objvalues.inn.length === 12) && !value)
    email = "Обязательное поле"
  let reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Zа-яА-Я\-0-9]+\.)+[a-zA-Zа-яА-Я]{2,}))$/;
  if (value) email = reg.test(value.toLowerCase())
  return email;
};

const validationOperator = ({ value, objvalues, type }) => {
  let operator = "";
  if (objvalues.inn && (objvalues.inn.length === 10 || objvalues.inn.length === 12) && !value)
    operator = "Обязательное поле"
  return operator;
};

const validationNumber = ({ value, objvalues, type }) => {
  let number = "";
  if (objvalues.inn && (objvalues.inn.length === 10 || objvalues.inn.length === 12) && !value)
    number = "Обязательное поле"
  return number;
};



const distributor = {
  inn: validationInn,
  kpp: validationKpp,
  id: validationGuid,
  name: validationName,
  lastname: validationLastName,
  firstname: validationFirstName,
  email: validationEmail,
  operator: validationOperator,
  number: validationNumber,
};
