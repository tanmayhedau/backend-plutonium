function printDate(){
 const day = new Date ();
 const dd = day.getDate();
 const mm = day.getMonth() +1;
 const yyyy = day.getFullYear();
 console.log("Current Date is -->" , dd,"/",mm,"/",yyyy);
}
printDate()

function printMonth(){
const months = ["January","February","March","April","May","June",
               "July","August","September","October","November","December"];
let a = new Date()
let month = months[a.getMonth()];
console.log(month);
}
printMonth()

function getBatchInfo(){
console.log("plutonium, W3D5, the topic being taught today is Nodejs module system")
}
getBatchInfo()



module.exports.tarik = printDate
module.exports.mahina = printMonth
module.exports.batchinfo = getBatchInfo

