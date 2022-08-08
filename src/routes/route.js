const express = require('express');
const underScore = require('underscore')
const loDash = require('lodash')
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
    let weekend = ['sat', 'sun']
    let result = underScore.first(weekend)
    console.log('Underscore example result is', result)

    let year = ['jan', 'feb', 'march','april', 'may', 'jun', 'july', 'aug', 'sep', 'oct', 'nov', 'dec']
    console.log(loDash.chunk(year,3))

    let oddNum = [ 1,3,5,7,9,11,13,15,17,19]
    console.log(loDash.tail(oddNum))
    
    let arrays = [ 1,2,2,3,4]
    console.log(loDash.union(arrays))

    let object =  [["horror","The Shining"],["drama","Titanic"],["thriller","Shutter Island"],["fantasy","Pans Labyrinth"]]
    console.log(loDash.fromPairs(object))

    
    res.send('My second ever api!')
});


router.get('/test-you', function(req, res){
    res.send('This is the second routes implementation')
})

router.get('/give-me-students-data',function(req, res){

})
module.exports = router;
// adding this comment for no reason