export const limit = ({ inn, id, number }) => {
  let useNumber = number === undefined ? true : false
  let result = { disable: true, disableKpp: true, typeUl: true, number: false }

  if (inn && (inn.length === 10 || inn.length === 12)) {
    result.disable = false
    result.disableKpp = inn.length === 10 ? false : true
    result.typeUl = inn.length === 10 ? true : false
  }
  if (id && id.length > 2 && useNumber) {
    let subValue = id.substr(0, 3)
    if (subValue === '2BM' || subValue === '2BE' || subValue === '2AL') result.number = true
  }

  return result
}
