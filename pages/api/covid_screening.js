const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

export default async function handler(req, res) {
    const allData = await prisma.covid_screening.findMany({
        where: {
            latitude: {
                gt: parseFloat(req.query.west),
                lt: parseFloat(req.query.east)
            },
            longitude: {
                gt: parseFloat(req.query.south),
                lt: parseFloat(req.query.north)
            }
        }
    })

    await prisma.$disconnect()

    console.log(allData)
    res.json(allData)
}