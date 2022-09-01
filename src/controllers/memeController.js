const axios = require("axios")
//---------------------------------------------------------------------------------------------------------------------------

let createMeme = async function (req, res) {
    try {
        let template_id = req.query.template_id;
        let text0 = req.query.text0;
        let text1 = req.query.text1;
        let username = req.query.username;
        let password = req.query.password;

        let options = {
            method: 'post',
            url: `https://api.imgflip.com/caption_image?template_id=${template_id}&text0=${text0}&text1=${text1}&username=${username}&password=${password}`
        }
        let memer = await axios(options);
        res.status(200).send({ status: true , data: memer.data });
    }
    catch (err) {
        res.status(500).send({  status: false , Error: err.message})
    }

}
module.exports.createMeme = createMeme 