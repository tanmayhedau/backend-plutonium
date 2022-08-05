function trim(){
    let name = "    Tanmay Hedau    "
    let fullName = name.trim();
    console.log(fullName)
}
trim()

function lowercase(){
    let name1 = "TANMAY HEDAU"
    let fullName1 = name1.toLowerCase();
    console.log(fullName1)
}
lowercase()

function uppercase(){
    let name2 = "tanmay hedau"
    let fullName2 = name2.toUpperCase();
    console.log(fullName2)
}
uppercase()

module.exports.cutt = trim
module.exports.case1 = lowercase
module.exports.case2 = uppercase