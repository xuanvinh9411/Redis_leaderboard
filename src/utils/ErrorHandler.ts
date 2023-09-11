import {  NextFunction, Request, Response } from 'express'
import BaseResponse from './BaseResponse'

class ErrorHandler {
    static async APIReqHandler(
        task : () => Promise<BaseResponse>,
        express:{
            req: Request,
            res: Response,
            next: NextFunction
        }
    ){
        try {
            const response = await task()
            return express.res.json(response)
        } catch (error) {
            return express.next(new BaseResponse({
                errorCode: error.code ? error.code : 500,
                data: null,
                message: error.message ? error.message  : ''
            }))
        }
    }
}

export default ErrorHandler