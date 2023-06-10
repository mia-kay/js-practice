//objects
let student = {
    name: "Mia",
    age: "18",
    gen: "25",
};
console.log (student);

//classes 
class user{
    constructor (name, age, phone, email, password){
        this.name = name;
        this.age = age;
        this.phone = phone;
        this.email = email;
        this.password= password;
    }

    //functions in classes (methods)
hello() {
    return "Hello there" + this.name;
}
}


// const user1 = new user (
//     "Mia",
//     "18",
//     0400300275,
//   "maame@123.com"
//   '123abcxyz'

// );
// console.log(user1);

// //inheritance 
// //parent

class Akrobeto {
    constructor (size){
        this.size = size
    }
}
class son extends Akrobeto {
    noseSize (){
        return 'he has a' + this.size + "nose."
    }
}

const Jose = new son ("big");
Jose.noseSize ();