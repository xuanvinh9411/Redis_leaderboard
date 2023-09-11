import { redis } from './redis';
import Logger from 'jet-logger';

export class LeaderBoardService {
    private readonly PREFIX = 'demo:';
    private readonly REDIS_KEY = this.PREFIX + 'leaderboard';
    private readonly REDIS_DATA_KEY = this.REDIS_KEY + 'leaderboard_data';

    async getLeaderboard(limit: number) {
        try {
            let result = []
            const userRankingSet = await redis.zrevrange(this.REDIS_KEY, 0, limit, 'WITHSCORES')
            Logger.info(userRankingSet);
            const topUserScore = userRankingSet.filter((val, idx) => {
                if (idx % 2 === 1) return val
                return false
            })
            const topUserId = userRankingSet.filter((val, idx) => {
                if (idx % 2 === 0) return val
                return false
            })
            const listUserName = await redis.hmget(this.REDIS_DATA_KEY, ...topUserId)
            for (let index = 0; index < topUserScore.length; index++) {
                const elm = listUserName[index];
                result.push({
                    id: topUserId[index],
                    ranking: index,
                    username: listUserName[index],
                    point: topUserScore[index]
                })
            }

        } catch (error) {
            Logger.err(error.meassage)
            return []
        }
    }

    async getUserRanking(userId: number) {
        const rankingInRedis = await redis.zrevrank(this.REDIS_KEY, `${userId}`)
        return rankingInRedis + 1
    }

    async updateUserPoint(userId: number, point : number, username: string) {
        await redis.zadd(this.REDIS_KEY, point ,userId)
        await redis.hsetnx(this.REDIS_DATA_KEY,`${userId}`,username)
    }
}