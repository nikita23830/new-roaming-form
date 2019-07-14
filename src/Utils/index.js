import { ELITE_OPERATORS } from '../Constants'

export const limit = ({ inn, id='', number='' }) => {
  let useNumber = number === undefined ? true : false
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
  let result = { show: false, data: [{}] }
  let newIndex = 0

  values.map((item, index) => {
    if (item && item.inn && (item.inn.length === 10 || item.inn.length === 12)) {
      if (item.inn.length === 10) {
        result.show = item.name ? true : result.show
        if (result.data[newIndex])
        result.data[newIndex].name = item.name ? true : result.show
      }
    }
  })

  return result
}
