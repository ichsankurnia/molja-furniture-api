const { db, commonQueryGetOne, commonQueryGetAll, commonQueryDelete, commonQueryUpdate, commonQueryInsert } = require("./database")

require('dotenv').config()
const {DB_SCHEMA} = process.env

const tableName = `${DB_SCHEMA}.t_category_catalog`

class CategoryModel {

    static findOne = async (whereData) => {
        const sql = commonQueryGetOne(tableName, whereData, 'ORDER BY id DESC LIMIT 1')
        console.log(sql)

        try {
            const result = await db.one(sql)

            return result
        } catch (error) {
            console.log(error)
            return false
        }
    }

    static findAll = async () => {
        const sql = commonQueryGetAll(tableName)
        console.log(sql)
        
        try {
            const result = await db.manyOrNone(sql)
            return result
        } catch (error) {
            console.log(error)
            return false
        }
    }

    static create = async (dataInsert) => {
        const sql = commonQueryInsert(tableName, dataInsert)
        console.log(sql)

        try {
            await db.any(sql)
            return dataInsert
        } catch (error) {
            console.log(error)
            return false
        }
    }

    static update = async (whereData, dataUpdate) => {
        const sql = commonQueryUpdate(tableName, whereData, dataUpdate)
        console.log(sql)

        try {
            const result = await db.result(sql)
            if(result.rowCount > 0){
                const data = this.findOne(whereData)
                return data
            }else{
                return false
            }
        } catch (error) {
            console.log(error)
            return false
        }
    }

    static delete = async (whereData) => {
        const sql = commonQueryDelete(tableName, whereData)
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

module.exports = CategoryModel