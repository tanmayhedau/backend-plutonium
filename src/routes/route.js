const express = require('express');
const myHelper = require('../util/helper')
const underscore = require('underscore')

const router = express.Router();
//=====================================================================================================================================
router.get('/test-me', function (req, res) {
    myHelper.printDate()
    myHelper.getCurrentMonth()
    myHelper.getCohortData()
    let firstElement = underscore.first(['Sabiha','Akash','Pritesh'])
    console.log('The first element received from underscope function is '+firstElement)
    res.send('My first ever api!')
});
//====================================================================================================================================
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
//====================================================================================================================================
router.get("/shoes", function(req, res){
    let queryParams = req.query
    let brand = queryParams.brand
    res.send("dummy response")
})
//=====================================================================================================================================
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
//=======================================================================================================================================
// use path param
router.get('/candidates/:canidatesName', function(req, res){
    console.log('The request objects is '+ JSON.stringify(req.params))
    console.log('Candidates name is '+req.params.canidatesName)
    res.send('Done')
})
//=========================================================================================================================================
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
//=====================================================================================================================================
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
//=====================================================================================================================================
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
//======================================================================================================================================
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
//======================================================================================================================================
router.post('/test-meok',function(req,res){
    // let id = req.body.user
    // let pwd = req.body.pass
    // console.log(id,pwd)
    console.log(req.body)
    res.send("my api is is is awesome")
})
//=====================================================================================================================================
router.post('/test-meok1',function(req,res){
    let arr =[12,"functionup"]
    let ele = req.body.element
    arr.push(ele)
    res.send({msg: arr,
    "status": true})
})
//======================================================================================================================================
// let players =
//    [
//        {
//            "name": "manish",
//            "dob": "1/1/1995",
//            "gender": "male",
//            "city": "jalandhar",
//            "sports": [
//                "swimming"
//            ]
//        },
//        {
//            "name": "gopal",
//            "dob": "1/09/1995",
//            "gender": "male",
//            "city": "delhi",
//            "sports": [
//                "soccer"
//            ],
//        },
//        {
//            "name": "lokesh",
//            "dob": "1/1/1990",
//            "gender": "male",
//            "city": "mumbai",
//            "sports": [
//                "soccer"
//            ],
//        },
//    ]
   router.post('/players', function (req, res) {
    let newPlayer = req.body
    let newPlayerName = newPlayer.name
    let isNamerepeated = false
    for ( let i =0; i<players.length; i++){
        if(players[i].name == newPlayerName){
            isNamerepeated = true
            break;
        }
    }
    if (isNamerepeated){
        res.send("try using other name, as this already exist")
    
    }else{
        players.push(newPlayer)
        res.send(players)
    }
})
//========================================================================================================================================
// ouery vs params
//params ==> used to load different items/pages based on a variable value in url . params variable is not visible in the url.
router.get("/wiki/:countryName", function(req,res){
     let country = req.params.countryName
     console.log(country)
     res.send(country)
     // go and get the details about the country mentioned in the url
})
//=====================================================================================================================================
//ouery params ==>
// use case :- to make filters/ searches
// queryParams :- variable name is visible in the url itself
// a get request with 2 query params==>
//localhost:3000/get-query-1?myCoolVar=something&xyz=functionUp 
router.get("/get-query-1", function(req,res){
    let data = req.query
    let var1 = data.myCoolVar
    let var2 = data.xyz
    console.log(data)
    res.send({data : data , status : true})
})
//======================================================================================================================================
//take marks in req.query in a variable named "marks and "pass" if marks > 40 else send "fail"
router.get("/get-query-2", function(req,res){
    //ternary operator
    let marks = req.query
     marks>40 ? "pass" : "fail"
     console.log(marks)
     res.send()
})


// ========================================================================================================================================
router.get("/:name/p/:itemNumber", function (req,res){
    let item = req.params.name
    let itemNumber = req.params.itemNumber
    // go and get all the details about the item with name = item and id = itemNumber ...database
    console.log(item)
    res.send(item)
})
// ====================================================================================================================================
//filter out all the numbers that are greater than input (input is received from params)
let myArr = [23,45,67,33223,444,555,666,77]
router.post("/post-query-2", function(req,res){
    // our logic and code goes here
    // let input = req.query.input
    // let finalArr = myArr.filter(ele => ele >input)
    // console.log(finalArr)

    let finalArr = []
    let input = req.query.input
    for(let i =0;i<myArr.length;i++){
        if(myArr[i]>input){
            finalArr.push(myArr[i])
        }
    }
    res.send({data: finalArr, status : true})
})
// let players1 = [
//     {
//       "name" :"vikram",
//        "bookingNumber":"1",
//     },
//       {
//         "name":"manish",
//         "bookingNumber":"2",
//       },
//       {
//         "name":"rahul",
//         "bookingNumber":"3"
//       }
     
//   ]
  
//   router.get('/players1/:pname:id', function(req, res){
//         //  JSON.stringify(req.params)
//          let Playername = req.params.pname
//          let Playerid   = req.params.id
//          console.log(Playername)
//          console.log(Playerid)
//       for(let i=0; i<players.length; i++){
//            if(players1[i].name == Playername && players[i].bookingNumber == Playerid){
//             return res.send("this person is already exist")
//             break;
//            }
//       }
  
//   })
//=================================================================================================================
// you will be given an array of persons (i.e. an array of objects )..each person will have a {name: String, age: Number, votingstatus: true/false (boolean)}
// take input in query param as votingAge.. and for all the people above that age, change votingStatus as true also return an array consisting of only the person can vote

// write a post api to the above
// take this as sample for array of persons:

let persons = [
    {
      name : "PK",
      age : 10,
      votingstatus : false
    },
    {
        name : "Sk",
        age : 20,
        votingstatus : false
    },
    {
        name : "AA",
        age : 70,
        votingstatus : false
    },
    {
        name : "SC",
        age : 5,
        votingstatus : false
    },
    {
        name : "HQ",
        age : 40,
        votingstatus : false
    }
]
router.post("/persons", function (req,res){
    let votingAge = req.query.votingAge
    let result = []
    for(let i = 0; i<persons.length;i++){
        let id = persons[i]
        if(id.age > votingAge){
            id.votingstatus = true
            // result.push(id)
        }
    }
    result = persons.filter((id)=> id.age > votingAge)
    res.send({data : result , status : true})
})

router.post("/persons", function (req, res) {
    let personCanVote = [];
    let votingAge = req.query.inputAge;
    for (let i = 0; i < persons.length; i++) {
      let personAge = persons[i].age;
      if (personAge > votingAge) {
        persons[i].votingStatus  = true;
      }
    }
    personCanVote = persons.filter((person) => person.age > votingAge);
    res.send(personCanVote);
  });
  
module.exports = router;
// adding this comment for no reason