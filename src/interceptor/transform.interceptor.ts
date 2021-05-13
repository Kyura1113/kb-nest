import {CallHandler, ExecutionContext, Injectable, NestInterceptor} from '@nestjs/common';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators'
import {Logger} from "../utils/log4js";

@Injectable()
export class TransformInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const req = context.getArgByIndex(1).req
        return next.handle()
            .pipe(
                map(data => {
                    const logFormat = `
                      --------------------------------------------------------------------
                      Method: ${req.method} \n 
                      Request original url: ${req.originalUrl} \n
                      IP: ${req.ip} \n
                      User: ${JSON.stringify(req.user)} \n
                      Response data:\n ${JSON.stringify(req.query)} \n
                      --------------------------------------------------------------------
                      `
                    Logger.info(logFormat)
                    return data
                    //Logger.access(logFormat)
                })
            );
    }
}
