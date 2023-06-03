 //function return

 function addprices (item1, item2){
    let total = item1 + item2
    return total;
}
function tax (totalprice, taxpercentage){
    let tax = totalprice * taxpercentage
    return tax;
}
let total= 
addprices(20, 10) + 
tax (addprices (20, 10) , 0.5)

console.log(total);