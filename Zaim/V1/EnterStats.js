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


// tests for either an empty or not empty object
var Users = new UserObject()
//var Users = new UserObject('felix', 'swag', 1, 12.09, 12)

console.log(UserObject)

if (Users.name === undefined){
    alert("There are currently no users, please create some");

} else {
    alert("Displaying leaderboard")
}
