import {
    Controller,
    Post,
} from '@overnightjs/core';

import {
    NextFunction,
    Request,
    Response
} from 'express'
import BaseResponse from '../utils/BaseResponse'
import ErrorHandler from '../utils/ErrorHandler'
import { LeaderBoardService } from '../services/LeaderboardManager';

@Controller('api/leaderboard')
export class LeaderboardController {
    private leaderBoardService = new LeaderBoardService()
    @Post('get')
    public async get(req: Request, res: Response, next: NextFunction) {
        const task = async () => {
            const data = await this.leaderBoardService.getLeaderboard(10)
            return new BaseResponse({ data, message: 'Get Leaderboard Success !' })
        }
        await ErrorHandler.APIReqHandler(task, {req,res,next})
    }

    @Post('update')
    public async update(req: Request, res: Response, next: NextFunction) {
        const task = async () => {
            const {id,point,name} =  req.body
            this.leaderBoardService.updateUserPoint(id,point,name);
            return new BaseResponse({ message: 'update point Success !' })
        }
        await ErrorHandler.APIReqHandler(task, {req,res,next})
    }

    @Post('user-ranking')
    public async userRanking(req: Request, res: Response, next: NextFunction) {
        const task = async () => {
            const {id} =  req.body
            const  data = await this.leaderBoardService.getUserRanking(id);
            return new BaseResponse({ data, message: 'get point Success !' })
        }
        await ErrorHandler.APIReqHandler(task, {req,res,next})
    }

}