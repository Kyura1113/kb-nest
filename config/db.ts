const productConfig = {
    mysql: {
        port: 3306,
        host: '',
        user: '',
        password: '',
        database: '',
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
