import axios, { type AxiosPromise } from 'axios'

const baseApi = axios.create({
  baseURL: 'http://localhost:8080/api/Admin'
})

export const apiCreateBasket = async (
  value: AdminAPI.POST.CreateBasket.Params
): AdminAPI.POST.CreateBasket.Response => {
  return await baseApi.post(`/create`, null, { params: { value } })
}

export namespace AdminAPI {
  export namespace POST {
    export namespace CreateBasket {
      export type Params = number

      export type Response = AxiosPromise<boolean>
    }
  }
}
