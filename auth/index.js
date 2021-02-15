import * as Cookies from 'js-cookie'

export const Auth = {
  setToken: (testScgToken, testScgRefreshToken) => {
    Cookies.set('testScgToken', testScgToken)
    Cookies.set('testScgRefreshToken', testScgRefreshToken)
  },
  removeToken: () => {
    Cookies.remove('testScgToken')
    Cookies.remove('testScgRefreshToken')
  }
}
