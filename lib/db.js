import mysql from 'serverless-mysql'

export const db = mysql({
    config: {
        host: process.env.MYSQL_HOST,
        database: process.env.MYSQL_DATABASE,
        user: process.env.MYSQL_USERNAME,
        password: process.env.MYSQL_PASSWORD,
        port: parseInt(process.env.MYSQL_PORT),
        socketPath: `/cloudsql/${process.env.CLOUD_SQL_CONNECTION_NAME}`
    },
})

export async function query (q, values) {
    try {
        return await db.query(q, values)
    } catch (e) {
        throw Error(e.message)
    } finally {
        await db.end()
    }
}