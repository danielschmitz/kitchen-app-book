import HttpService from './HttpService'

export interface Category {
    id: number
    name: string
  }

const URI = '/categories'

export const CategoryService = {
  getAll: async (): Category[] => (await HttpService.get(URI)).data,
}

