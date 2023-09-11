import Redis from 'ioredis';

export const redis = new Redis({
    host : process.env.Redis_Host,
    port: parseInt(process.env.Redis_Port)
})

redis.on('connect', ()=>{
    console.log("connect reduis success")
})

redis.on('error', (err)=>{
    console.log("connect reduis Erros",err)
})