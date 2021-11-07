const Joi = require("joi")
const { ApplicationError, ValidationError } = require("../helpers/error-handler")
const moment = require('moment-timezone')
const AboutUsModel = require("../models/aboutus-model")
const { getDomainName, deleteImages } = require("../helpers/helper")
require('dotenv').config()

class AboutUsController {

    static getAboutUs = async (req, res, next) => {
        try {
            let response = {code: 102, message: 'internal error, failed get about us', data: null}

            const data = await AboutUsModel.findOne()
            if(data){
                response.code = 0
                response.message = 'success get about us'
                response.data = data
            }
            
            return res.send(response)
        } catch (error) {
            console.log(error)
            return next(new ApplicationError(error.message))
        }
    }

    static editAboutUs = async (req, res, next) => {
        try {
            let response = {code: 103, message: 'internal error, failed update about us', data: null}

            const schema = Joi.object({
                company_name: Joi.string().optional().allow('').allow(null),
                company_desc: Joi.string().optional().allow('').allow(null),
                images: Joi.any().meta({swaggerType: 'file'}).optional().allow('').allow(null).description('image file')
            })

            const {error} = schema.validate(req.body)
            
            if(!error){
                
                const findArticle = await AboutUsModel.findOne()
                
                if(findArticle){

                    let arrURLImages = []
                    if(req.body.images.length > 0){
                        console.log("FILE UPLADED")

                        await Promise.all(req.body.images.map(async (image) => {
                            const urlImage = await getDomainName(req) + "/" + process.env.IMAGE_PATH + '/' + image
                            await arrURLImages.push(urlImage)
                        }))

                        req.body.images = arrURLImages.join('|')
                    }else{
                        console.log("NO FILE UPLADED")
                        delete req.body.images
                    }

                    req.body.updated_on = moment().format('YYYY-MM-DD HH:mm:ss')
                    
                    const data = await AboutUsModel.update(req.body)
                    if(data){

                        // Delete images old images
                        if(req.body.images && findArticle.images.length > 0){
                            await deleteImages(findArticle?.images)
                        }

                        response.code = 0
                        response.message = "success update about us"
                        response.data = data
                    }
                }else{
                    if(req.body.images.length > 0){
                        await deleteImages(req.body.images)
                    }
                    response.message = "about us not found"
                }

                return res.send(response)
            }else{
                if(req.body.images.length > 0){
                    await deleteImages(req.body.images)
                }
                return next(new ValidationError(error.message))
            }

        } catch (error) {
            console.log(error)
            return next(new ApplicationError(error.message))
        }
    }

    
}

module.exports = AboutUsController