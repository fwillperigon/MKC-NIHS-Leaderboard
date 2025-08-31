function UserObject(name, password, power, classcode, year, pfp)
{
    this.name = name;
    this.password = password;
    this.power = power;
    this.classcode = classcode;
    this.year = year;
    this.pfp = pfp;
    this.stats = [10];
}

var users = [];
var zaim = new UserObject("zaim", "miaz", 0, "12.10", 12, null);
var felix = new UserObject("felix", "xelif", 0, "12.09", 12, null);
var hunter = new UserObject("hunter", "retnuh", 0, "12.01", 12, null);
var connor = new UserObject("connor", "ronnoc", 0, "12.01", 12, null);
var rob = new UserObject("rob", "bor", 0, "11.04", 11, null);

function main()
{
    lsGet();

    var testname = prompt("What is the name of the user you want to remove");
    var testpass = prompt("What is the password of the user you want to remove");

    EditUserStat(testname, 0, 45);
}

function lsPush()
{
    localStorage.setItem("users", JSON.stringify(users));
}

function lsGet()
{
    var getval = localStorage.getItem("users");
    if (getval == null)
    {
        localStorage.setItem("users", "{}");
        return 1;
    }
    else
    {
        users = JSON.parse(getval);
        return 0;
    }
}

function GetUser(name)
{
    lsGet();
    var size = users.length;
    var userFound = false;
    var userPosition = 0;

    for (var i = 0; i < size; i++)
    {
        if (users[i].name == name)
        {
            userFound = true;
            userPosition = i;
        }
    }

    if (userFound)
    {
        return users[userPosition];
    }
    else
    {
        alert(`Could not find user with name ${name}`)
    }
}

function GetUserPosition(name)
{
    lsGet();
    var size = users.length;
    var userFound = false;
    var userPosition = 0;

    for (var i = 0; i < size; i++)
    {
        if (users[i].name == name)
        {
            userFound = true;
            userPosition = i;
        }
    }

    if (userFound)
    {
        return userPosition;
    }
    else
    {
        alert(`Could not find user with name ${name}`)
    }
}

function AddUserObject(user)
{
    users.push(user);
    lsPush();
}

function RemoveUser(name, password)
{
    lsGet();
    var size = users.length;
    var userFound = false;
    var userPosition = 0;

    for (var i = 0; i < size; i++)
    {
        if (users[i].name == name)
        {
            if (users[i].password == password)
            {
                userFound = true;
                userPosition = i;
            }
        }
    }

    if (userFound)
    {
        var spliced = users.splice(userPosition, size-userPosition);
        spliced.shift();
        users = users.concat(spliced);
        alert(`User ${name} has been removed!`);
    }
    else
    {
        alert(`Could not find user with name ${name} and password ${password}`)
    }
    lsPush();
}

function EditUserStat(name, stat, value)
{
    lsGet();
    var requestedUser = GetUserPosition(name);
    users[requestedUser].stats[stat] = value;
    lsPush();
}