import { api } from "@/utils/api"

async function getCategories() {
    const responce = api.topics
      .list({
        page: 1,
        perPage: 10,
      })
    return responce;
    
}

export default getCategories