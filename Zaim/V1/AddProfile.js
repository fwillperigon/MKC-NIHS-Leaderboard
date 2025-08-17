function UserObject(name, password, power, classcode, year, pfp)
{
    this.name = name;
    this.password = password;
    this.power = power;
    this.classcode = classcode;
    this.year = year;
    this.pfp = pfp;
    this.stats = [];
}



var TmpProfile = [];
var TmpName = "";
var TmpPassword = "";
var TmpClassroom = 0;
var TmpYear = 0;
var TmpPfp = "";


TmpName = prompt("Please enter the racer's name");
TmpPassword = prompt("Please enter the racer's password");
TmpClassroom = parseFloat(prompt("Please enter the racer's classroom"));
TmpYear = parseInt(prompt("Please enter the racer's year level"));
TmpPfp = parseInt(prompt("Please select which profile picture you want \n1. Mario \n2.Luigi \n3. Bowser \n4. Princess Peach"));

if (TmpPfp == 1)
    TmpPfp = "Mario"
else if (TmpPfp == 2)
    TmpPfp = "Luigi"
else if (TmpPfp == 3)
    TmpPfp = "Bowser"
else 
    TmpPfp = "Princess Peach"

console.log(TmpPfp)

TmpProfile = {
    "name": TmpName,
    "Password": TmpPassword,
    "Classroom": TmpClassroom,
    "Year": TmpYear,
    "Pfp": TmpPfp,
    "stats": [0,0,0]
}

console.log(TmpProfile)