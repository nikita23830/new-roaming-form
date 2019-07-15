import { ELITE_OPERATORS } from '../Constants'

export const limit = ({ inn, id, number }) => {
  let useNumber = number === '' ? true : false
  let result = { disable: true, disableKpp: true, typeUl: true, number: false }

  if (inn && (inn.length === 10 || inn.length === 12)) {
    result.disable = false
    result.disableKpp = inn.length === 10 ? false : true
    result.typeUl = inn.length === 10 ? true : false
  }

  if (id && id.length > 2 && useNumber)
    result.number = ELITE_OPERATORS.indexOf(id.substr(0, 3)) !== -1 ? true : false

  return result
}

export const soglash = (data) => {
  let result = false

  data.forEach((item, index) => {
    let { operator } = data[index]
    result = ELITE_OPERATORS.indexOf(operator) !== -1 ? true : result
  })

  return result
}

export const mayShow = (values) => {
  let result = []
  let newIndex = 0

  values.map((item, index) => {
    if (item && item.inn && (item.inn.length === 10 || item.inn.length === 12)) {
      let show = false

      show = (item.inn.length === 10 && item.name) ? true : show
      show = (item.inn.length === 12 && item.lastname && item.firstname) ? true : show

      if (show) {
        if (!result[newIndex]) result[newIndex] = {}
        result[newIndex].name = item.inn.length === 10 ? item.name : `ИП ${item.lastname} ${item.firstname}`
        result[newIndex].name = (item.inn.length === 12 && item.patronymic) ? `${result[newIndex].name} ${item.patronymic}` : result[newIndex].name
        result[newIndex].kpp = item.inn.length === 10 ? item.kpp : false
        result[newIndex].operator = item.operator ? item.operator : false
        result[newIndex].id = item.id ? item.id : false
        result[newIndex].email = item.email ? item.email : false
        result[newIndex].number = item.number ? item.number : false
        result[newIndex].inn = item.inn
        newIndex++
      }
    }
  })

  return result
}
