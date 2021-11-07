const Joi = require("joi")
const { ApplicationError, ValidationError } = require("../helpers/error-handler")
const moment = require('moment-timezone')
const CatalogModel = require("../models/catalog-model")
const { getDomainName, deleteImages } = require("../helpers/helper")
const { findOneCategory } = require("../models/catalog-model")

class CatalogController {

    static addCatalog = async (req, res, next) => {
        try {
            let response = {code: 101, message: 'internal error, failed create new catalog', data: null}
            
            const schema = Joi.object({
                name: Joi.string().required(),
                description: Joi.string().optional().allow('').allow(null),
                category_id: Joi.number().required(),
                images: Joi.any().meta({swaggerType: 'file'}).optional().allow('').allow(null).description('image file'),
                dimention: Joi.string().optional().allow('').allow(null),
                button: Joi.string().optional().allow('').allow(null)
            })

            const {error} = schema.validate(req.body)
            
            if(!error){

                const findCatalog = await CatalogModel.findOne({name: req.body.name})
                if(findCatalog){
                    if(req.body.images?.length > 0){
                        await deleteImages(req.body.images)
                    }
                    response.message = 'failed, catalog already exist'
                    return res.send(response)
                }

                // Check Category
                const findCategory = await findOneCategory({id: req.body.category_id})
                if(!findCategory){
                    if(req.body.images?.length > 0){
                        await deleteImages(req.body.images)
                    }
                    response.message = "failed, category doesn't exist"
                    return res.send(response)
                }

                let arrURLImages = []
                if(req.body.images?.length > 0){
                    await Promise.all(req.body.images.map(async (image) => {
                        const urlImage = await getDomainName(req) + "/" + process.env.IMAGE_PATH + '/' + image
                        console.log(urlImage)
                        await arrURLImages.push(urlImage)
                    }))

                    req.body.images = arrURLImages.join('|')
                }

                const data = await CatalogModel.create(req.body)
                
                if(data){
                    const findDataInsert = await CatalogModel.findOne({name: req.body.name})
                    
                    response.code = 0
                    response.message = 'success create new catalog'
                    response.data = findDataInsert
                }

                return res.send(response)
            }else{
                if(req.body.images?.length > 0){
                    await deleteImages(req.body.images)
                }
                return next(new ValidationError(error.message))
            }
        } catch (error) {
            return next(new ApplicationError(error.message))
        }
    }

    static getAllCatalog = async (req, res, next) => {
        try {
            let response = {code: 102, message: 'internal error, failed get catalog', data: null}
            
            const data = await CatalogModel.findAll()
            if(data){
                response.code = 0
                response.message = 'success get catalog'
                response.data = data
            }

            return res.send(response)
        } catch (error) {
            return next(new ApplicationError(error.message))
        }
    }

    static getCatalog = async (req, res, next) => {
        try {
            let response = {code: 102, message: 'internal error, catalog not found', data: null}

            const schema = Joi.object({
                id: Joi.optional(),
                name: Joi.optional(),
            })

            const {error} = schema.validate(req.query)

            if(!error){
                const data = await CatalogModel.findOne(req.query)
                if(data){
                    response.code = 0
                    response.message = 'success get catalog'
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

    
    static editCatalog = async (req, res, next) => {
        try {
            let response = {code: 103, message: 'internal error, failed update catalog', data: null}

            const schema = Joi.object({
                name: Joi.string().optional(),
                description: Joi.string().optional().allow('').allow(null),
                category_id: Joi.number().optional(),
                images: Joi.any().meta({swaggerType: 'file'}).optional().allow('').allow(null).description('image file'),
                dimention: Joi.string().optional().allow('').allow(null),
                button: Joi.string().optional().allow('').allow(null)
            })

            const {error} = schema.validate(req.body)
            
            if(!error){
                
                const findCatalog = await CatalogModel.findOne(req.params)
                
                if(findCatalog){

                    // Check clientname already exist
                    if(req.body.name){
                        const findCatalogName = await CatalogModel.findOne({name: req.body.name})

                        if(findCatalogName){

                            if(findCatalog.id !== findCatalogName.id){
                                if(req.body.images?.length > 0){
                                    await deleteImages(req.body.images)
                                }
                                response.message = `failed, client '${req.body.name}' already exist`
                                return res.send(response)
                            }
                        }
                    }

                    // Check Category
                    if(req.body.category_id){
                        const findCategory = await findOneCategory({id: req.body.category_id})
                        if(!findCategory){
                            if(req.body.images?.length > 0){
                                await deleteImages(req.body.images)
                            }
                            response.message = "failed, category doesn't exist"
                            return res.send(response)
                        }
                    }

                    let arrURLImages = []
                    if(req.body.images?.length > 0){
                        await Promise.all(req.body.images.map(async (image) => {
                            const urlImage = await getDomainName(req) + "/" + process.env.IMAGE_PATH + '/' + image
                            console.log(urlImage)
                            await arrURLImages.push(urlImage)
                        }))
    
                        req.body.images = arrURLImages.join('|')
                    }else{
                        console.log("NO FILE UPLADED")
                        delete req.body.images
                    }

                    req.body.updated_on = moment().format('YYYY-MM-DD HH:mm:ss')
                    
                    const data = await CatalogModel.update(req.params, req.body)
                    if(data){
                        if(req.body.images?.length > 0){
                            await deleteImages(findCatalog?.images)
                        }

                        response.code = 0
                        response.message = "success update client"
                        response.data = data
                    }
                }else{
                    if(req.body.images?.length > 0){
                        await deleteImages(req.body.images)
                    }
                    response.message = "catalog not found"
                }

                return res.send(response)
            }else{
                if(req.body.images?.length > 0){
                    await deleteImages(req.body.images)
                }
                return next(new ValidationError(error.message))
            }

        } catch (error) {
            console.log(error)
            return next(new ApplicationError(error.message))
        }
    }

    static deleteCatalog = async (req, res, next) => {
        try {
            let response = {code: 104, message: 'internal error, failed delete catalog', data: null}
            
            const findCatalog = await CatalogModel.findOne(req.params)
            
            if(findCatalog){
                const data = await CatalogModel.delete(req.params)
                if(data){
                    if(findCatalog.images){
                        await deleteImages(findCatalog.images)
                    }
                    response.code = 0
                    response.message = 'success delete catalog'
                }
            }else{
                response.message = 'catalog not found'
            }

            return res.send(response)
        } catch (error) {
            console.log(error)
            return next(new ApplicationError(error.message))
        }
    }


    static getAllCategories = async (req, res, next) => {
        try {
            let response = {code: 102, message: 'internal error, failed get catalog', data: null}
            
            const data = await CatalogModel.findCategories()
            if(data){
                response.code = 0
                response.message = 'success get category'
                response.data = data
            }

            return res.send(response)
        } catch (error) {
            return next(new ApplicationError(error.message))
        }
    }
}

module.exports = CatalogController