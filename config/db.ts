const productConfig = {
    mysql: {
        port: 3306,
        host: '114.116.240.89',
        user: 'root',
        password: 'qweqwe123',
        database: 'gtmdmeo',
        connectionLimit: 10
    },
}

const localConfig = {
    mysql: {
        port: 3306,
        host: 'localhost',
        user: 'root',
        password: '12345',
        database: 'nestjs',
        connectionLimit: 10
    },
}

const config = process.env.NODE_ENV ? productConfig : localConfig

export default config