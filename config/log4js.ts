import * as path from 'path'

const logPath = path.resolve(__dirname, '../../logs')

const log4jsConfig = {
    appenders: {
        console: {
            type: 'console',
        },
        access: {
            type: 'dateFile',
            filename: `${logPath}/access/access.log`,
            alwaysIncludePattern: true,
            pattern: 'yyyyMMdd',
            daysToKeep: 30,
            numBackups: 3,
            category: 'http',
            keepFileExt: true,
        },
        app: {
            type: 'dateFile',
            filename: `${logPath}/app-out/app.log`,
            alwaysIncludePattern: true,
            layout: {
                type: 'pattern',
                pattern: '{"date":"%d","level":"%p","category":"%c","host":"%h","pid":"%z","data":\'%m\'}',
            },
            pattern: 'yyyyMMdd',
            daysToKeep: 30,
            numBackups: 3,
            keepFileExt: true,
        },
        errorFile: {
            type: 'dateFile',
            filename: `${logPath}/error/error.log`,
            alwaysIncludePattern: true,
            layout: {
                type: 'pattern',
                pattern: '{"date":"%d","level":"%p","category":"%c","host":"%h","pid":"%z","data":\'%m\'}',
            },
            pattern: 'yyyyMMdd',
            daysToKeep: 30,
            numBackups: 3,
            keepFileExt: true,
        },
        errors: {
            type: 'logLevelFilter',
            level: 'ERROR',
            appender: 'errorFile',
        },
    },

    categories: {
        default: {
            appenders: ['console', 'app', 'errors'],
            level: 'DEBUG',
        },
        info: {
            appenders: ['console', 'app', 'errors'],
            level: 'info'
        },
        access: {
            appenders: ['console', 'app', 'errors'],
            level: 'info'
        },
        http: {
            appenders: ['access'],
            level: 'DEBUG'
        },
    },
    pm2: true, // 使用 pm2 来管理项目时，打开
    pm2InstanceVar: 'INSTANCE_ID' // 会根据 pm2 分配的 id 进行区分，以免各进程在写日志时造成冲突
}

export default log4jsConfig