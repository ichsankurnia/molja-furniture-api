const pgp = require('pg-promise')();
require('dotenv').config()

const {DB_HOST, DB_USER, DB_PASS, DB_NAME, DB_PORT} = process.env

const config = {
    host: DB_HOST || 'my.database-server.com',
    port: DB_PORT || 5432,
    user: DB_USER || 'database-user',
    password: DB_PASS || 'secretpassword!!',
    database: DB_NAME || 'database-name',
}


const db = pgp(config)

db.connect()
    .then(() => console.log(`DB Connected ${JSON.stringify(config)}`))
    .catch((err) => { console.log(config); console.log(`DB connection error ${err}`) })


const commonQueryGetAll = (tableName) => {
    return `
        SELECT * FROM ${tableName} 
        ORDER BY coalesce(updated_on, created_on) DESC, id DESC
    `
}


const commonQueryGetOne = (tableName, payload, optionalQuery) => {
    const query = `SELECT * FROM ${tableName} WHERE `

    let where = ``
    let x = 0

    Object.keys(payload).map(key => {
        x += 1
        if(x > 1) where += `AND `
        where += `${key} = ${ typeof payload[key] === 'number'? payload[key] : `'${payload[key]}'` } `
    })

    return query + where + optionalQuery
}

const commonQueryInsert = (tableName, payload) => {
    const query = `
        INSERT INTO ${tableName} 
    `
    let column = '( '
    let values = '('
    let x = 0
    let y = 0

    if(payload.length > 0){                                                                             // JIKA TIPE LIST, add multiple
        Object.keys(payload[0]).map(key => {
            x += 1
            if(x > 1){
                column += `, ${key}`
            }else{
                column += key
            }            
        })
        column += ') VALUES '

        let i = 0
        payload.forEach(data => {
            i += 1
            if(i > 1){
                values += ', ('
            }
            Object.values(data).map(value => {
                y += 1
                if(y > 1){
                    values += (typeof value === 'number')? `, ${value}` : `, '${value}'`
                }else{
                    values += (typeof value === 'number')? value : `'${value}'`
                }
            })

            values += ')'
            y = 0
        });
    }else{
        Object.keys(payload).map(key => {
            x += 1
            if(x > 1){
                column += `, ${key}`
            }else{
                column += key
            }
        })
        column += ') VALUES '
    
        Object.values(payload).map(value => {
            y += 1
            if(y > 1){
                values += (typeof value === 'number')? `, ${value}` : `, '${value}'`
            }else{
                values += (typeof value === 'number')? value : `'${value}'`
            }
        })
        values += ')'
    }
    
    return query + column + values
}

const commonQueryUpdate = (tableName, identity, payload) => {
    const query = `
        UPDATE ${tableName}
    `
    let set = ` SET `
    let where = ` WHERE `
    let x = 0
    let y = 0

    Object.keys(payload).map(key => {
        x += 1
        if(x > 1){
            set += (typeof payload[key] === 'number')? `, ${key} = ${payload[key]}` : `, ${key} = '${payload[key]}'`
        }else{
            set += (typeof payload[key] === 'number')? `${key} = ${payload[key]}` : `${key} = '${payload[key]}'`
        }
    })

    Object.keys(identity).map(key => {
        y += 1
        if(y > 1){
            where += (typeof identity[key] === 'number')? `and ${key} = ${identity[key]}` : `and ${key} = '${identity[key]}'`
        }else{
            where += (typeof identity[key] === 'number')? `${key} = ${identity[key]}` : `${key} = '${identity[key]}'`
        }
    })

    return query + set + where
}

const commonQueryDelete = (tableName, identity) => {
    const query = `
        DELETE FROM ${tableName}
    `
    let where = ` WHERE `
    let x = 0

    Object.keys(identity).map(key => {
        x += 1
        if(x > 1){
            where += (typeof identity[key] === 'number')? `, ${key} = ${identity[key]}` : `, ${key} = '${identity[key]}'`
        }else{
            where += (typeof identity[key] === 'number')? `${key} = ${identity[key]}` : `${key} = '${identity[key]}'`
        }
    })

    return query + where
}

const commonQueryDisable = (tableName, identity) => {
    const query = `
        UPDATE ${tableName} SET status_int = ${-5}
    `
    let where = ` WHERE `
    let x = 0

    Object.keys(identity).map(key => {
        x += 1
        if(x > 1){
            where += (typeof identity[key] === 'number')? `, ${key} = ${identity[key]}` : `, ${key} = '${identity[key]}'`
        }else{
            where += (typeof identity[key] === 'number')? `${key} = ${identity[key]}` : `${key} = '${identity[key]}'`
        }
    })

    return query + where
}


module.exports = {
    db,
    commonQueryGetAll,
    commonQueryGetOne,
    commonQueryInsert,
    commonQueryUpdate,
    commonQueryDelete,
    commonQueryDisable,
}