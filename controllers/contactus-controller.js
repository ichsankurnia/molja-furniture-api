const Joi = require("joi")
const { ApplicationError, ValidationError } = require("../helpers/error-handler")
const moment = require('moment-timezone')
const ContactUsModel = require("../models/contactus-model")

class ContactUsController {

    static getContactUs = async (req, res, next) => {
        try {
            let response = {code: 102, message: 'internal error, failed get contact us', data: null}

            const data = await ContactUsModel.findOne()
            if(data){
                response.code = 0
                response.message = 'success get contact us'
                response.data = data
            }
            
            return res.send(response)
        } catch (error) {
            console.log(error)
            return next(new ApplicationError(error.message))
        }
    }

    static editContactUs = async (req, res, next) => {
        try {
            let response = {code: 103, message: 'internal error, failed update contact us', data: null}

            const schema = Joi.object({
                address: Joi.string().optional().allow('').allow(null),
                telp: Joi.string().optional().allow('').allow(null),
                whatsapp_number: Joi.string().optional().allow('').allow(null),
                email: Joi.string().optional().allow('').allow(null)
            })

            const {error} = schema.validate(req.body)
            
            if(!error){
                
                const findArticle = await ContactUsModel.findOne()
                
                if(findArticle){

                    req.body.updated_on = moment().format('YYYY-MM-DD HH:mm:ss')
                    
                    const data = await ContactUsModel.update(req.body)
                    if(data){
                        response.code = 0
                        response.message = "success update contact us"
                        response.data = data
                    }
                }else{
                    response.message = "contact us not found"
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

    
}

module.exports = ContactUsController