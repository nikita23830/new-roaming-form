import axios from 'axios'

export const axiosAPI = async props => {
  const { path, dataAxios } = props
  const { data, status } = await axios({
    method: 'post',
    url: `http://roaming.api.staging.keydisk.ru/${path}`,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'multipart/form-data',
     },
    data: dataAxios
  })
  let result = {
    status: status !== 200 ? status : data.status
  }

  return await result.status
}
