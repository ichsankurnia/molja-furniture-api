const Joi = require("joi")
const { ApplicationError, ValidationError } = require("../helpers/error-handler")
const moment = require('moment-timezone')
const HomeModel = require("../models/home-model")
const { getDomainName, deleteSingleImage } = require("../helpers/helper")
require('dotenv').config()

class HomeController {

    static getOneArticle = async (req, res, next) => {
        try {
            let response = {code: 102, message: 'internal error, failed get article', data: null}

            const data = await HomeModel.findArtikel()
            if(data){
                response.code = 0
                response.message = 'success get article'
                response.data = data
            }
            
            return res.send(response)
        } catch (error) {
            console.log(error)
            return next(new ApplicationError(error.message))
        }
    }

    static editArticle = async (req, res, next) => {
        try {
            let response = {code: 103, message: 'internal error, failed update article', data: null}

            const schema = Joi.object({
                title: Joi.string().optional().allow('').allow(null),
                body: Joi.string().optional().allow('').allow(null)
            })

            const {error} = schema.validate(req.body)
            
            if(!error){
                
                const findArticle = await HomeModel.findArtikel()
                
                if(findArticle){

                    req.body.updated_on = moment().format('YYYY-MM-DD HH:mm:ss')
                    
                    const data = await HomeModel.updateArtikel(req.body)
                    if(data){
                        response.code = 0
                        response.message = "success update article"
                        response.data = data
                    }
                }else{
                    response.message = "article not found"
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

    
    static addClient = async (req, res, next) => {
        try {
            let response = {code: 101, message: 'internal error, failed create new client', data: null}
            
            const schema = Joi.object({
                client_name: Joi.string().required(),
                client_desc: Joi.string().optional().allow('').allow(null),
                image: Joi.any().meta({swaggerType: 'file'}).optional().allow('').allow(null).description('image file')
            })

            const {error} = schema.validate(req.body)
            
            if(!error){

                const findClient = await HomeModel.findOneClient({client_name: req.body.client_name})
                if(findClient){
                    response.message = 'failed, client already exist'
                    return res.send(response)
                }

                if(req.file){
                    const urlImage = await getDomainName(req) + "/" + process.env.IMAGE_PATH + '/' + req.body.image
                    req.body.image = urlImage
                }

                const data = await HomeModel.createClient(req.body)
                
                if(data){
                    const findDataInsert = await HomeModel.findOneClient({client_name: req.body.client_name})
                    
                    response.code = 0
                    response.message = 'success create new client'
                    response.data = findDataInsert
                }

                return res.send(response)
            }else{
                if(req.file){
                    await deleteSingleImage(req.body.image)
                }
                return next(new ValidationError(error.message))
            }
        } catch (error) {
            return next(new ApplicationError(error.message))
        }
    }

    static getAllClient = async (req, res, next) => {
        try {
            let response = {code: 102, message: 'internal error, failed get client', data: null}
            
            const data = await HomeModel.findAllClient()
            if(data){
                response.code = 0
                response.message = 'success get client'
                response.data = data
            }

            return res.send(response)
        } catch (error) {
            return next(new ApplicationError(error.message))
        }
    }

    static getOneClient = async (req, res, next) => {
        try {
            let response = {code: 102, message: 'internal error, client not found', data: null}

            const schema = Joi.object({
                id: Joi.optional(),
                client_name: Joi.optional(),
            })

            const {error} = schema.validate(req.query)

            if(!error){
                const data = await HomeModel.findOneClient(req.query)
                if(data){
                    response.code = 0
                    response.message = 'success get client'
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

    
    static editClient = async (req, res, next) => {
        try {
            let response = {code: 103, message: 'internal error, failed update client', data: null}

            const schema = Joi.object({
                client_name: Joi.string().optional(),
                client_desc: Joi.string().optional().allow('').allow(null),
                image: Joi.any().meta({swaggerType: 'file'}).optional().allow('').allow(null).description('image file')
            })

            const {error} = schema.validate(req.body)
            
            if(!error){
                
                const findClient = await HomeModel.findOneClient(req.params)
                
                if(findClient){

                    // Check clientname already exist
                    if(req.body.client_name){
                        const findClientName = await HomeModel.findOneClient({client_name: req.body.client_name})

                        if(findClientName){

                            if(findClient.id !== findClientName.id){
                                response.message = `failed, client '${req.body.client_name}' already exist`
                                return res.send(response)
                            }
                        }
                    }

                    if(req.file){
                        const urlImage = await getDomainName(req) + "/" + process.env.IMAGE_PATH + '/' + req.body.image
                        req.body.image = urlImage
                    }else{
                        console.log("NO FILE UPLADED")
                        delete req.body.image
                    }

                    req.body.updated_on = moment().format('YYYY-MM-DD HH:mm:ss')
                    
                    const data = await HomeModel.updateClient(req.params, req.body)
                    if(data){
                        if(req.file){
                            await deleteSingleImage(findClient.image)
                        }

                        response.code = 0
                        response.message = "success update client"
                        response.data = data
                    }
                }else{
                    if(req.file){
                        await deleteSingleImage(req.body.image)
                    }
                    response.message = "client not found"
                }

                return res.send(response)
            }else{
                if(req.file){
                    await deleteSingleImage(req.body.image)
                }
                return next(new ValidationError(error.message))
            }

        } catch (error) {
            console.log(error)
            return next(new ApplicationError(error.message))
        }
    }

    static deleteClient = async (req, res, next) => {
        try {
            let response = {code: 104, message: 'internal error, failed delete client', data: null}
            
            const findClient = await HomeModel.findOneClient(req.params)
            
            if(findClient){
                const data = await HomeModel.deleteClient(req.params)
                if(data){
                    if(findClient.image){
                        await deleteSingleImage(findClient.image)
                    }
                    response.code = 0
                    response.message = 'success delete client'
                }
            }else{
                response.message = 'client not found'
            }

            return res.send(response)
        } catch (error) {
            console.log(error)
            return next(new ApplicationError(error.message))
        }
    }
}

module.exports = HomeController