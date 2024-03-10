import type { Product } from "./ProductService"
import HttpService from './HttpService'


export  interface Stock {
  id?: number
  productId?: number
  quantity: number
  expires: string
  added: string
  price: number
  product?: Product
}

const URI = '/stock'

export const  StockService = {
  getAll: async (quantity=1): Promise<Stock[]> => (await HttpService.get(URI + '?_sort=-expires&_embed=product&quantity_gte='+quantity)).data,
  getById: async (id: any): Promise<Stock> => (await HttpService.get(`${URI}/${id}`)).data,
  delete: async (id: number): Promise<Stock> => (await HttpService.delete(`${URI}/${id}`)).data,
  create: async (Stock: Stock): Promise<Stock> =>
    (await HttpService.post(URI, Stock)).data,
  edit: async (Stock: Stock): Promise<Stock> =>
    (await HttpService.put(`${URI}/${Stock.id}`, Stock)).data
}
