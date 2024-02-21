import HttpService from './HttpService'

export interface Category {
  id?: number
  name: string
}

const URI = '/categories'

export const CategoryService = {
  getAll: async (): Category[] => (await HttpService.get(URI)).data,
  get: async (id): Category => (await HttpService.get(URI + '/' + id)).data,
  create: async (category: Category): Category =>
    (await HttpService.post('/categories', category)).data,
  update: async (category: Category): Category =>
    (await HttpService.put('/categories/' + category.id, category)).data
}
