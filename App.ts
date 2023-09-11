import { Server } from '@overnightjs/core'
import compression from 'compression';
import cors from 'cors'
import express, { NextFunction, Request, Response } from 'express'

export class App extends Server{
    constructor(){
        super()
        this.applyMiddleWares()
        this.boostrap()
    }

    public start(): void{
        const port = process.env['PORT'] || 3012
        this.app.listen(port, ()=>{
            console.log(`Server listening on port: ${port}`)
        })
    }

    private applyMiddleWares(){
        this.app.use(cors({
            origin : '*',
        }))
        this.app.use(compression())
        this.app.use(express.json())
        this.app.use(express.urlencoded({extended:true}))
    }

    private errorHandlingRouter(){
        this.app.use((
            _err: any,
            req:Request,
            res:Response,
            next:NextFunction,
        )=>{
            return res.status(404)
        })
        this.app.get('*', function(req,res) {
            return res.sendStatus(404)
        })
    }

    private async boostrap(){
        const { LeaderboardController } = await import('./src/controllers/LeaderboardController');

        super.addControllers([
            new LeaderboardController()
        ])
        this.errorHandlingRouter()
    }
   
}