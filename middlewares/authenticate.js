require('dotenv').config()
const jwt = require('jsonwebtoken')
const Joi = require('joi');
const moment = require('moment-timezone')

const { ApplicationError } = require('../helpers/error-handler');
const { ValidationError } = require('../helpers/error-handler');
const { encryptAes } = require('../helpers/security');

const UserModel = require('../models/user-model');


const login = async (req, res, next) => {
    try {
        let response = {code: 99, message: 'Failed Authenticate', data: null}
        
        const schema = Joi.object({
            username: Joi.string().required(),
            password: Joi.string().required()
        })
        
        const {error} = schema.validate(req.body)

        if(!error){

            const findUser = await UserModel.findOne({username: req.body.username})
            
            if(findUser){
            
                const pwd = await encryptAes(req.body.password)
                const findPass = await UserModel.findOne({username: req.body.username, password: pwd})

                if(findPass){

                    // Update Last Login User
                    await UserModel.update({username: req.body.username, password: pwd}, {last_login_on: moment().format('YYYY-MM-DD HH:mm:ss')})
                    
                    // Give Token after success verification
                    const token = jwt.sign(findPass, process.env.JWT_KEY, { expiresIn: '1d' });
                    findPass.token = token

                    response.code = 0
                    response.message = 'Success Authenticate'
                    response.data = findPass
                }else{
                    response.message = 'Wrong Password'
                }
            }else{
                response.message = 'Username not Registered'
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

module.exports = login