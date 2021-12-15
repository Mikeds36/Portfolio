const jsonData = require('/public/json/covid_screening.json')

const handler = async (req, res) => {
    const west = parseFloat(req.query.west)
    const east = parseFloat(req.query.east)
    const south = parseFloat(req.query.south)
    const north = parseFloat(req.query.north)

    try {
        const jsonArray = JSON.parse(JSON.stringify(jsonData))
        const results = jsonArray
            .filter(function (x) { return x.latitude < east && x.latitude > west && x.longitude < north && x.longitude > south })
        // console.log(results)
        return res.json(results)
    } catch (e) {
        res.status(500).json({message : e.message})
    }
}

export default handler;