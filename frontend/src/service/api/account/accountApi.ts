import axios from 'axios'
import { AccountRegisterUrl } from '../const/url'
import config from '../const/configAxios'
interface RegisterAccountRequest {
  username: string
  password: string
}

class AccountApi {
  async Register(data: RegisterAccountRequest, token: string) {
    const response = await axios.post(AccountRegisterUrl, data, config(token))
    if (response?.data?.success) {
      return response.data
    } else {
      return response
    }
  }
}

const accountApi = new AccountApi()

export default accountApi
