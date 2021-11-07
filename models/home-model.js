const { db, commonQueryGetOne, commonQueryGetAll, commonQueryDelete, commonQueryUpdate, commonQueryInsert } = require("./database")

const tableArticle = 'public.t_article'
const tableClient = 'public.t_client'

class HomeModel {

    static findArtikel = async () => {
        const sql = `select * from ${tableArticle} where id=1`
        console.log(sql)

        try {
            const result = await db.one(sql)

            return result
        } catch (error) {
            console.log(error)
            return false
        }
    }

    static updateArtikel = async (dataUpdate) => {
        const whereData = {id: 1}
        const sql = commonQueryUpdate(tableArticle, whereData, dataUpdate)
        console.log(sql)

        try {
            const result = await db.result(sql)
            if(result.rowCount > 0){
                const data = this.findArtikel(whereData)
                return data
            }else{
                return false
            }
        } catch (error) {
            console.log(error)
            return false
        }
    }


    static findOneClient = async (whereData) => {
        const sql = commonQueryGetOne(tableClient, whereData, 'ORDER BY id DESC LIMIT 1')
        console.log(sql)

        try {
            const result = await db.one(sql)

            return result
        } catch (error) {
            console.log(error)
            return false
        }
    }

    static findAllClient = async () => {
        const sql = commonQueryGetAll(tableClient)
        console.log(sql)
        
        try {
            const result = await db.manyOrNone(sql)
            return result
        } catch (error) {
            console.log(error)
            return false
        }
    }

    static createClient = async (dataInsert) => {
        const sql = commonQueryInsert(tableClient, dataInsert)
        console.log(sql)

        try {
            await db.any(sql)
            return dataInsert
        } catch (error) {
            console.log(error)
            return false
        }
    }


    static updateClient = async (whereData, dataUpdate) => {
        const sql = commonQueryUpdate(tableClient, whereData, dataUpdate)
        console.log(sql)

        try {
            const result = await db.result(sql)
            if(result.rowCount > 0){
                const data = this.findOneClient(whereData)
                return data
            }else{
                return false
            }
        } catch (error) {
            console.log(error)
            return false
        }
    }


    static deleteClient = async (whereData) => {
        const sql = commonQueryDelete(tableClient, whereData)
        console.log(sql)

        try {
            const result = await db.result(sql)
            if(result.rowCount > 0){
                return result
            }else{
                return false
            }
        } catch (error) {
            console.error(error)
            return false
        }
    }
}

module.exports = HomeModel