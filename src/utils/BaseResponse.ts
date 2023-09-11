class BaseResponse {
    errorCode: Number
    data: any
    message: string
    timestamp: number

    constructor(input: {
        errorCode? : number,
        data?:any ,
        message?: string
    }){
        this.errorCode = input.errorCode || 0
        this.data = input.data || null
        this.message = input.message || ''
        this.timestamp = new Date().getTime()
    }
}

export default BaseResponse