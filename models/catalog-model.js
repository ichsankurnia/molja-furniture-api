const { commonQueryGetOne, db, commonQueryInsert, commonQueryUpdate, commonQueryDelete, commonQueryGetAll } = require("./database")

const tableName = 'public.t_catalog'

class CatalogModel {

    static findOne = async (whereData) => {
        const sql = commonQueryGetOne(tableName, whereData, '')
        console.log(sql)

        try {
            const result = await db.one(sql)
            if(result){
                if(result.images === null || result.images === '' || result.images === undefined){
                    result.images = []
                    return result
                }else{
                    result.images = result.images.split('|')                
                    return result
                }
            }
            return result
        } catch (error) {
            console.log(error)
            return false
        }
    }

    static findAll = async () => {
        const sql = `
        select 
            a.id, a.name, a.description, a.category_id, b.category_name, a.images, a.dimention, a.button
        from 
            ${tableName} a
        left join
            public.t_category_catalog b on a.category_id = b.id
        `

        try {
            const result = await db.manyOrNone(sql)
            console.log(result)
            if(result.length > 0){
                const arrRes = []
                result.forEach(item => {
                    if(item.images === null || item.images === '' || item.images === undefined){
                        item.images = []
                    }else{
                        const arrPhoto = item.images.split('|')                
                        item.images = arrPhoto
                    }
                    arrRes.push(item)
                })
                return arrRes
            }
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
            const result = await db.any(sql)
            return result
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
                const data = await this.findOne(whereData)
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


    static findCategories = async () => {
        const sql = commonQueryGetAll('public.t_category_catalog')

        try {
            const result = await db.many(sql)
            return result
        } catch (error) {
            console.log(error)
            return false
        }
    }

    static findOneCategory = async (whereData) => {
        const sql = commonQueryGetOne('public.t_category_catalog', whereData, '')

        try {
            const result = await db.one(sql)
            return result
        } catch (error) {
            console.log(error)
            return false
        }
    }
}

module.exports = CatalogModel