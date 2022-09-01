let axios = require("axios")


let getStates = async function (req, res) {

    try {
        let options = {
            method: 'get',
            url: 'https://cdn-api.co-vin.in/api/v2/admin/location/states'
        }
        let result = await axios(options);
        console.log(result)
        let data = result.data
        res.status(200).send({ msg: data, status: true })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}


let getDistricts = async function (req, res) {
    try {
        let id = req.params.stateId
        let options = {
            method: "get",
            url: `https://cdn-api.co-vin.in/api/v2/admin/location/districts/${id}`
        }
        let result = await axios(options);
        console.log(result)
        let data = result.data
        res.status(200).send({ msg: data, status: true })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}

let getByPin = async function (req, res) {
    try {
        let pin = req.query.pincode
        let date = req.query.date
        console.log(`query params are: ${pin} ${date}`)
        var options = {
            method: "get",
            url: `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pin}&date=${date}`
        }

        let result = await axios(options)
        console.log(result.data);
        res.status(200).send({ msg: result.data });
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message });
    }
}

let getOtp = async function (req, res) {
    try {
        let blahhh = req.body

        console.log(`body is : ${blahhh} `)
        var options = {
            method: "post",
            url: `https://cdn-api.co-vin.in/api/v2/auth/public/generateOTP`,
            data: blahhh
        }

        let result = await axios(options)
        console.log(result.data)
        res.status(200).send({ msg: result.data })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}

//===============================================================================================================================
let getDistrictsId = async function (req, res) {
    try {
        let district = req.query.district_id
        let date = req.query.date
        console.log(`query params are: ${district} ${date}`)
        let options = {
            method: "get",
            url: `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${district}&date=${date}`
        }
        
        let result = await axios(options)
        console.log(result.data);
        res.status(200).send({ msg: result.data });
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message });
    }
}

//==================================================================================================================================================
// let getWeather = async function (req,res) {
//         try {
//             let q = req.query.q
//             let appid = req.query.appid
//             console.log(`query params are: ${q} ${appid}`)
//             var options = {
//                 method: "get",
//                 url:`http://api.openweathermap.org/data/2.5/weather?q=${q}&appid=${appid}`
                
//             }
//             let result = await axios(options)
//            // console.log(result.data)
//             res.status(200).send({ msg: result.data.main.temp })
//         }
//         catch (err) {
//             console.log(err)
//             res.status(500).send({ msg: err.message })
//         }
//     }
    







module.exports.getStates = getStates
module.exports.getDistricts = getDistricts
module.exports.getByPin = getByPin
module.exports.getOtp = getOtp
module.exports.getDistrictsId = getDistrictsId
// module.exports.getWeather=getWeather