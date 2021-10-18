import {query} from '../../lib/db';

const handler = async (req, res) => {
    const west = parseFloat(req.query.west)
    const east = parseFloat(req.query.east)
    const south = parseFloat(req.query.south)
    const north = parseFloat(req.query.north)

    try {
        const results = await query(
            `
            SELECT *
                FROM covid_screening
                WHERE 
                    latitude < ? AND latitude > ? AND longitude < ? AND  longitude > ?
            `,
            [east, west, north, south]
        )
        console.log(results)
        return res.json(results)
    } catch (e) {
        res.status(500).json({message : e.message})
    }
}

export default handler;