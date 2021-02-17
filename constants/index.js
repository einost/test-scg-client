const endpoint = 'http://localhost:8001'

export const Constants = {
  API: {
    REFRESH_TOKEN: `${endpoint}api/auth/refresh-token`,
    BUY_PRODUCT: `${endpoint}/api/vending-machine/payment`,
    LOGIN: `${endpoint}/api/admin/login`,
    GET_VENDING_MACHINE_LIST: `${endpoint}/api/vending-machine/get-list`
  }
}
