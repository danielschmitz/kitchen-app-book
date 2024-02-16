
const apiUrl = "http://localhost:3000"

const CategoryService = {
    getAll: async () => await fetch(apiUrl+'/categories')
}

export default CategoryService