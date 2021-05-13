import {Injectable, NestMiddleware} from '@nestjs/common';
import {Request, Response} from 'express'
import {Logger} from "../utils/log4js";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    use(req: any, res: any, next: () => void) {
      next()
    }
}

//日志中间件
export function logger(req: Request, res: Response, next: () => any) {
    const code = res.statusCode
    next();
    const logFormat = `
          ====================================================================
          Method: ${req.method} \n 
          Request original url: ${req.originalUrl} \n
          IP: ${req.ip} \n
          Status code: ${code} \n
          Params: ${JSON.stringify(req.params)} \n
          Query: ${JSON.stringify(req.query)} \n
          Body: ${JSON.stringify(req.body)} \n
          ====================================================================
        `
    // 根据状态码，进行日志类型区分
    if (code >= 500) {
        Logger.error(logFormat)
    } else if (code >= 400) {
        Logger.warn(logFormat)
    } else {
        //Logger.access(logFormat)
        Logger.log(logFormat)
    }
}
