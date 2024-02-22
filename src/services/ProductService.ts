import HttpService from './HttpService'

export interface Product {
  id?: number
  name: string,
  supplier?:string,
  categoryId:number
}

const URI = '/products'

export const ProductService = {
  getAll: async (): Promise<Product[]> => (await HttpService.get(URI)).data,
  get: async (id:any): Promise<Product> => (await HttpService.get(URI + '/' + id)).data,
  create: async (product: Product): Promise<Product> =>
    (await HttpService.post(URI, product)).data,
  update: async (product: Product): Promise<Product> =>
    (await HttpService.put(URI + "/" + product.id, product)).data,
  delete: async (id:any) => (await HttpService.delete(`${URI}/${id}`)),
}
