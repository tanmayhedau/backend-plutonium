const axios = require("axios")
//----------------------------------------------------------------------------------------------------------------------------


let weather = async function (req, res) {
    try {
        let cities = ["Bengaluru", "Mumbai", "Delhi", "Kolkata", "Chennai", "London", "Moscow"]
        let result = []
        for (let i of cities) {
            let options = {
                method: 'get',
                url: `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=8483e59d8860872343402229a619f6f7`
            }
            let sos = await axios(options);
            result.push({ city: i, temp: sos.data.main.temp });
        }
        res.status(200).send({ status:true , data: result.sort((a, b) => a.temp - b.temp)})
    }
    catch (err) {
        res.status(500).send({  status: false , Error: err.message })
    }
}

module.exports.weather = weather