const express = require('express');
const abc = require('../logger/logger.js')
const router = express.Router();
const xyz = require('../util/helper.js')
const lmn = require('../validator/formatter.js')

router.get('/test-me', function (req, res) {
    abc.namaste()
    xyz.tarik()
    xyz.mahina()
    xyz.batchinfo()
    lmn.cutt()
    lmn.case1()
    lmn.case2()
    res.send('My second ever api!')
});


router.get('/test-you', function(req, res){
    res.send('This is the second routes implementation')
})

router.get('/give-me-students-data',function(req, res){

})
module.exports = router;
// adding this comment for no reason