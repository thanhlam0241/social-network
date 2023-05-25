import axios from 'axios'
import { FaceDetectUrl } from '../const/url'
class FaceApi {
  detectFace = async (data: FormData) => {
    try {
      console.log(data)
      const response = await axios.post(FaceDetectUrl, data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      console.log('Success')
      return response
    } catch (error) {
      console.log(error)
    }
  }
}

export default new FaceApi()
