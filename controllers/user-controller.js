const Joi = require("joi")
const { ApplicationError, ValidationError } = require("../helpers/error-handler")
const { encryptAes } = require("../helpers/security")
const UserModel = require("../models/user-model")
const moment = require('moment-timezone')

class UserController {

    static addUser = async (req, res, next) => {
        try {
            let response = {code: 101, message: 'Internal Error, failed create new user', data: null}
            
            const schema = Joi.object({
                username: Joi.string().required(),
                password: Joi.string().min(5).required(),
                fullname: Joi.string().optional().allow('').allow(null),
                email: Joi.string().email().optional().allow('').allow(null)
            })

            const {error} = schema.validate(req.body)
            
            if(!error){
                // Check user exist
                const userExist = await UserModel.findOne({username: req.body.username})
                if(userExist){
                    response.message = `Failed create user, username '${req.body.username}' already registered`
                    return res.send(response)
                }
                
                req.body.role_id = 1
                req.body.password = await encryptAes(req.body.password)

                const data = await UserModel.create(req.body)
                
                if(data){
                    const findDataInsert = await UserModel.findOne({username: req.body.username})
                    
                    response.code = 0
                    response.message = 'Success create new user'
                    response.data = findDataInsert
                }

                return res.send(response)
            }else{
                return next(new ValidationError(error.message))
            }
        } catch (error) {
            return next(new ApplicationError(error.message))
        }
    }

    static getAllUser = async (req, res, next) => {
        try {
            let response = {code: 102, message: 'Internal Error, failed get user', data: null}
            
            const data = await UserModel.findAll()
            if(data){
                response.code = 0
                response.message = 'Success get user'
                response.data = data
            }

            return res.send(response)
        } catch (error) {
            return next(new ApplicationError(error.message))
        }
    }

    static getOneUser = async (req, res, next) => {
        try {
            let response = {code: 102, message: 'Internal Error, user not found', data: null}

            const schema = Joi.object({
                id: Joi.optional(),
                username: Joi.optional(),
                email: Joi.optional()
            })

            const {error} = schema.validate(req.query)

            if(!error){
                const data = await UserModel.findOne(req.query)
                if(data){
                    response.code = 0
                    response.message = 'Success get user'
                    response.data = data
                }
                return res.send(response)
            }else{
                return next(new ValidationError(error.message))
            }
        } catch (error) {
            console.log(error)
            return next(new ApplicationError(error.message))
        }
    }

    
    static editUser = async (req, res, next) => {
        try {
            let response = {code: 103, message: 'Internal Error, failed update user', data: null}

            const schema = Joi.object({
                username: Joi.string().optional(),
                password: Joi.string().min(5).optional(),
                fullname: Joi.string().optional().allow('').allow(null),
                email: Joi.string().email().optional().allow('').allow(null)
            })

            const {error} = schema.validate(req.body)
            
            if(!error){
                
                const findUser = await UserModel.findOne(req.params)
                
                if(findUser){

                    // Check username already register by another user
                    if(req.body.username){
                        const findUsername = await UserModel.findOne({username: req.body.username})

                        if(findUsername){

                            if(findUser.id_seq !== findUsername.id_seq){
                                response.message = `Failed, username '${req.body.username}' already registered by another user`
                                return res.send(response)
                            }
                        }
                    }

                    if(req.body.password) req.body.password = await encryptAes(req.body.password)
                    req.body.updated_on = moment().format('YYYY-MM-DD HH:mm:ss')
                    
                    const data = await UserModel.update(req.params, req.body)
                    if(data){
                        response.code = 0
                        response.message = "Success update user"
                        response.data = data
                    }
                }else{
                    response.message = "User not found"
                }

                return res.send(response)
            }else{
                return next(new ValidationError(error.message))
            }

        } catch (error) {
            console.log(error)
            return next(new ApplicationError(error.message))
        }
    }

    static deleteUser = async (req, res, next) => {
        try {
            let response = {code: 104, message: 'Internal Error, failed delete user', data: null}
            
            const findUser = await UserModel.findOne(req.params)
            
            if(findUser){
                const data = await UserModel.delete(req.params)
                if(data){
                    response.code = 0
                    response.message = 'Success delete user'
                }
            }else{
                response.message = 'User not found'
            }

            return res.send(response)
        } catch (error) {
            console.log(error)
            return next(new ApplicationError(error.message))
        }
    }
}

module.exports = UserController