import HttpService from './HttpService'

export interface Category {
  id?: number
  name: string
}

const URI = '/categories'

export const CategoryService = {
  getAll: async (): Promise<Category[]> => (await HttpService.get(URI)).data,
  get: async (id:any): Promise<Category> => (await HttpService.get(URI + '/' + id)).data,
  create: async (category: Category): Promise<Category> =>
    (await HttpService.post('/categories', category)).data,
  update: async (category: Category): Promise<Category> =>
    (await HttpService.put('/categories/' + category.id, category)).data,
  delete: async (id:any) => (await HttpService.delete(`${URI}/${id}`)),
}
