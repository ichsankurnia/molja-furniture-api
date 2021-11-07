const { db, commonQueryGetOne, commonQueryGetAll, commonQueryDelete, commonQueryUpdate, commonQueryInsert } = require("./database")

const tableName = 'public.t_contact_us'

class ContactUsModel {

    static findOne = async () => {
        const sql = `select * from ${tableName} where id=1`
        console.log(sql)

        try {
            const result = await db.one(sql)

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

module.exports = ContactUsModel