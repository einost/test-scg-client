import * as Cookies from 'js-cookie'

export default function ({ $axios }) {
  $axios.onRequest((config) => {
    config.headers.Authorization = Cookies.get('testScgToken')
  })
}
