import axios from 'axios'

export default {
  GOOGLE_CLIENT_ID:
    '1047374105238-ugolifknd61bmr20itcu8ghrg9o32og2.apps.googleusercontent.com',

  GOOGLE_API_KEY: 'AIzaSyCqFhKYDS8eyMpWykenvIWSG96pCAGqttU'
}

export const url =
  process.env.NODE_ENV !== 'development'
    ? 'https://readsbox.herokuapp.com/'
    : 'http://localhost:3000/'

export const instance = axios.create({
  baseURL: url,
  timeout: 1000
})
