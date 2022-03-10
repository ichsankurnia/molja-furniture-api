const Joi = require("joi")
const { ApplicationError, ValidationError } = require("../helpers/error-handler")
const moment = require('moment-timezone')
const CategoryModel = require("../models/category-model")
const CatalogModel = require("../models/catalog-model")
const { deleteImages } = require("../helpers/helper")
require('dotenv').config()

class CategoryController {

    
    static addCategory = async (req, res, next) => {
        try {
            let response = {code: 101, message: 'Internal Error, failed create new category', data: null}
            
            const schema = Joi.object({
                category_name: Joi.string().required(),
                category_desc: Joi.string().optional().allow('').allow(null)
            })

            const {error} = schema.validate(req.body)
            
            if(!error){
                // Check category exist
                const categoryExist = await CategoryModel.findOne({category_name: req.body.category_name})
                if(categoryExist){
                    response.message = `Failed create category, category_name '${req.body.category_name}' already registered`
                    return res.send(response)
                }
                
                const data = await CategoryModel.create(req.body)
                
                if(data){
                    const findDataInsert = await CategoryModel.findOne({category_name: req.body.category_name})
                    
                    response.code = 0
                    response.message = 'Success create new category'
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

    static getAllCategory = async (req, res, next) => {
        try {
            let response = {code: 102, message: 'Internal Error, failed get category', data: null}
            
            const data = await CategoryModel.findAll()
            if(data){
                response.code = 0
                response.message = 'Success get category'
                response.data = data
            }

            return res.send(response)
        } catch (error) {
            return next(new ApplicationError(error.message))
        }
    }

    static getOneCategory = async (req, res, next) => {
        try {
            let response = {code: 102, message: 'Internal Error, category not found', data: null}

            const schema = Joi.object({
                id: Joi.optional(),
                category_name: Joi.optional()
            })

            const {error} = schema.validate(req.query)

            if(!error){
                const data = await CategoryModel.findOne(req.query)
                if(data){
                    response.code = 0
                    response.message = 'Success get category'
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

    
    static editCategory = async (req, res, next) => {
        try {
            let response = {code: 103, message: 'Internal Error, failed update category', data: null}

            const schema = Joi.object({
                category_name: Joi.string().optional().allow('').allow(null),
                category_desc: Joi.string().optional().allow('').allow(null),
            })

            const {error} = schema.validate(req.body)
            
            if(!error){
                
                const findcategory = await CategoryModel.findOne(req.params)
                
                if(findcategory){

                    req.body.updated_on = moment().format('YYYY-MM-DD HH:mm:ss')
                    
                    const data = await CategoryModel.update(req.params, req.body)
                    if(data){
                        response.code = 0
                        response.message = "Success update category"
                        response.data = data
                    }
                }else{
                    response.message = "Category not found"
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

    static deleteCategory = async (req, res, next) => {
        try {
            let response = {code: 104, message: 'Internal Error, failed delete category', data: null}

            const findcategory = await CategoryModel.findOne(req.params)
            
            if(findcategory){
                
                const products = await CatalogModel.findAll()
                
                products.forEach(async item => {
                    /* Check apakah category yg dihapus ada dalam product, jika ada hapus product nya juga, dam unlink imagenya */
                    // console.log(item.category_id)
                    if(item.category_id === req.params.id){
                        await CatalogModel.delete({id: item.id})
                        // console.log(item)
                        if(item.images?.length > 0){
                            // console.log(item.images)
                            await deleteImages(item.images)
                        }
                    }
                })

                const data = await CategoryModel.delete(req.params)
                if(data){
                    response.code = 0
                    response.message = 'Success delete category'
                }
            }else{
                response.message = 'Category not found'
            }

            return res.send(response)
        } catch (error) {
            console.log(error)
            return next(new ApplicationError(error.message))
        }
    }
}

module.exports = CategoryController