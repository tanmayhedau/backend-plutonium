const express = require('express');
const underScore = require('underscore')
const loDash = require('lodash')
const abc = require('../logger/logger.js')
const router = express.Router();
const xyz = require('../util/helper.js')
const lmn = require('../validator/formatter.js');


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

router.get ('/cohort-members', function(req, res){
    let members = ['sabiha', 'neha', 'akash']
    res.send(members)
})
router.get('/students', function(req, res){
  let students = ['tanmay', 'rahul', 'alesha']
  res.send(students)
})

router.get('/students-details/:names', function(req,res){
    console.log("this is the request "+ JSON.stringify(req.params))
    let reqParams = req.params
    let studentName = reqParams.names
    //let studentName = req.params.names
    console.log('Name of the students is ', studentName)
    //assumping deatils is firstname + firstname
    let studentDetails = studentName + " "+ studentName
    res.send('dummy response')

    // console.log(names)
    // let details = "rahul singh"
    // res.send("hey!")
})
router.get('/movies', function(req,res){
    let movies = ["Rang de basanti", "The shining", "Lord of the rings", "Batman begins"]
    res.send(movies)
    
    })
    
    router.get('/movies/:indexNumber', function(req,res){
        let moviesName = ["Rang de basanti", "The shining", "Lord of the rings", "Batman begins"]
        let abc = req.params.indexNumber
        if(abc<0 || abc>=moviesName.length){
            return res.send("movie index is invalid")
        }else{
        console.log(req.params)
        console.log(abc)
        res.send(moviesName[abc])
        }
        // console.log(moviesName[abc])
        // res.send(moviesName[abc])
    })
    
    router.get('/films',function(req,res){
        let arrFilms = [ {
            "id": 1,
            "names": "The Shining"
           }, {
            "id": 2,
            "name": "Incendies"
           }, {
            "id": 3,
            "names": "Rang de Basanti"
           }, {
            "id": 4,
            "name": "Finding Nemo"
           }]
        res.send(arrFilms)   
    })

    router.get('/films/:filmId', function(req,res){
        let filmsName = [ {
            "id": 1,
            "names": "The Shining"
           }, {
            "id": 2,
            "name": "Incendies"
           }, {
            "id": 3,
            "names": "Rang de Basanti"
           }, {
            "id": 4,
            "name": "Finding Nemo"
           }]
           let xyz = req.params.filmId
           if(xyz<0 || xyz>=filmsName.length){
            return res.send("No movie exists with this id")
           }else{
            console.log(req.params)
            console.log(xyz)
            res.send(filmsName[xyz])
           }
    })


router.get('/test-you', function(req, res){
    res.send('This is the second routes implementation')
})

router.get('/give-me-students-data',function(req, res){

})
module.exports = router;
// adding this comment for no reason