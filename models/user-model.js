const { db, commonQueryGetOne, commonQueryGetAll, commonQueryDelete, commonQueryUpdate, commonQueryInsert } = require("./database")

require('dotenv').config()
const {DB_SCHEMA} = process.env

const tableName = `${DB_SCHEMA}.t_user`

class UserModel {

    /**
     * 
     * @param {Object} whereData    {id_seq: 1, phone_number_int: 6281234567890} 
     */
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
        const sql = `
        select 
            a.*, b.role_name 
        from 
            ${tableName} a
        left join
            ${DB_SCHEMA}.t_user_role b on a.role_id = b.id
        `
        console.log(sql)
        
        try {
            const result = await db.manyOrNone(sql)
            return result
        } catch (error) {
            console.log(error)
            return false
        }
    }

    /**
     * 
     * @param {Object} dataInsert {fullname_var:"admin", password_var: "admin123", email_var: "b@mail.com", ...}
     */
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


    /**
     * 
     * @param {Object} whereData {id_seq: 1, phone_number_int: 6281234567890} 
     * @param {Object} dataUpdate {fullname_var:"admin", password_var: "admin123", email_var: "a@mail.com", ...}
     * @returns 
     */
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

    /**
     * 
     * @param {Object} whereData {id_seq: 1, phone_number_int: 6281234567890} 
     */
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

module.exports = UserModel