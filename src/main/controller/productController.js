import db from "../database/db.js"

const create = async (event,product) => {
    try {
      await db.Product.create(product)
      return {error:false,msg:'Produto Criado com Sucesso'}
    } catch (error) {
      return {error:true,msg:'Erro ao criar o Produto'}
    }
}



export default {
    create,
}