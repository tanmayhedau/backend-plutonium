const express = require('express');
const myHelper = require('../util/helper')
const underscore = require('underscore')

const router = express.Router();

router.get('/test-me', function (req, res) {
    myHelper.printDate()
    myHelper.getCurrentMonth()
    myHelper.getCohortData()
    let firstElement = underscore.first(['Sabiha','Akash','Pritesh'])
    console.log('The first element received from underscope function is '+firstElement)
    res.send('My first ever api!')
});

router.get("/movies/:indexNumber", function(req, res){
    const movies = ["Rang de basanti", "The shining", "Lord of the rings", "Batman begins"]
    console.log(req.params.indexNumber)
    let movieIndex = req.params.indexNumber
    //check index value. less than 0 or greater than array (length - 1) are not valid
    if(movieIndex<0 || movieIndex>=movies.length) {
        //if the index is invalid send an error message
        return res.send('The index value is not correct, Please check the it')
    }

    //if the index was valid send the movie at that index in response
    let requiredMovie = movies[movieIndex]
    res.send(requiredMovie)
})

router.get("/shoes", function(req, res){
    let queryParams = req.query
    let brand = queryParams.brand
    res.send("dummy response")
})

// uses query params
router.get('/candidates', function(req, res){
    console.log('Query paramters for this request are '+JSON.stringify(req.query))
    let gender = req.query.gender
    let state = req.query.state
    let district = req.query.district
    console.log('State is '+state)
    console.log('Gender is '+gender)
    console.log('District is '+district)
    let candidates = ['Akash','Suman']
    res.send(candidates)
})

// use path param
router.get('/candidates/:canidatesName', function(req, res){
    console.log('The request objects is '+ JSON.stringify(req.params))
    console.log('Candidates name is '+req.params.canidatesName)
    res.send('Done')
})

router.get("/films", function(req, res){
    const films = [ {
        "id": 1,
        "name": "The Shining"
       }, {
        "id": 2,
        "name": "Incendies"
       }, {
        "id": 3,
        "name": "Rang de Basanti"
       }, {
        "id": 4,
        "name": "Finding Nemo"
       }]
       //send all the films
      res.send(films) 
})

router.get("/films/:filmId", function(req, res){
    const films = [ {
        "id": 1,
        "name": "The Shining"
       }, {
        "id": 2,
        "name": "Incendies"
       }, {
        "id": 3,
        "name": "Rang de Basanti"
       }, {
        "id": 4,
        "name": "Finding Nemo"
       }]

       let filmId = req.params.filmId

       //iterate all the films
       //search for a film whose id matches with the id recevied in request
       for(let i = 0; i < films.length; i++){
           let film = films[i]
           if(film.id == filmId) {
               //if there is a match return the response from here
               return res.send(film)
           }
       }

       //if there is no match give an error response
       res.send("The film id doesn't match any movie")
})

router.get("/sol1", function (req,res){
    let arr= [1,2,3,5,6,7]
    let sum = 0
    for ( let i=0; i<arr.length;i++){
        sum = arr[i]+sum; // sum+= arr[i]
    }
    console.log(sum) //24
    let n = arr[arr.length-1] //arr[5]
    let addvalue = n*(n+1)/2;
    let missingNum =addvalue - sum;
    console.log(({"[1,2,3,5,6,7]":missingNum})) //4
    res.send({"[1,2,3,5,6,7]":missingNum})
})

router.get("/sol2",function(req,res){
    let arr = [33, 34, 35, 37, 38]
    let sum = 0
    for( let i=0; i<arr.length;i++){
        sum += arr[i];
    }
    console.log(sum) //177
    let n =arr.length+1
    let addvalue = n*(arr[0]+arr[arr.length-1])/2
    let missingNum= addvalue - sum;
    console.log({"[33,34,35,37,38]":missingNum}) //36
    res.send({"[33,34,35,37,38]":missingNum})
})
router.post('/test-meok',function(req,res){
    // let id = req.body.user
    // let pwd = req.body.pass
    // console.log(id,pwd)
    console.log(req.body)
    res.send("my api is is is awesome")
})
router.post('/test-meok1',function(req,res){
    let arr =[12,"functionup"]
    let ele = req.body.element
    arr.push(ele)
    res.send({msg: arr,
    "status": true})
})

let players =
   [
       {
           "name": "manish",
           "dob": "1/1/1995",
           "gender": "male",
           "city": "jalandhar",
           "sports": [
               "swimming"
           ]
       },
       {
           "name": "gopal",
           "dob": "1/09/1995",
           "gender": "male",
           "city": "delhi",
           "sports": [
               "soccer"
           ],
       },
       {
           "name": "lokesh",
           "dob": "1/1/1990",
           "gender": "male",
           "city": "mumbai",
           "sports": [
               "soccer"
           ],
       },
   ]
   router.post('/players', function (req, res) {
    // let players =[{
    //     "name": "tanmay",
    //     "dob": "22/12/2000",
    //     "gender": "male",
    //     "city": "kalyan",
    //     "sports": [
    //         "swimming", "esports"
    //     ]
    // }]
    // let ele = req.body.element
    // players.push(ele)
    //LOGIC WILL COME HERE
    let ele = req.body;
    console.log(ele);
    let name1 = ele.name;
    let match = false;
    for (let i = 0; i < players.length; i++) {
        let name2 = players[i].name
        console.log(name2);
        if (name1 == name2) {
            match = true;
            break;
        }
    }
    if (match == false) {
        players.push(ele);
    
    res.send(  { data: players , status: true }  )
}
   })


module.exports = router;
// adding this comment for no reason