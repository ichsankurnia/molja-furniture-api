const { db, commonQueryGetOne, commonQueryGetAll, commonQueryDelete, commonQueryUpdate, commonQueryInsert } = require("./database")

require('dotenv').config()
const {DB_SCHEMA} = process.env

const tableName = `${DB_SCHEMA}.t_about_us`

class AboutUsModel {

    static findOne = async () => {
        const sql = `select * from ${tableName} where id=1`
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

    static update = async (dataUpdate) => {
        const whereData = {id: 1}
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

}

module.exports = AboutUsModel