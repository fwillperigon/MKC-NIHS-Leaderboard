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

function main()
{
    lsGet();

    var testname = prompt("What is the name of the user you want to remove");
    var testpass = prompt("What is the password of the user you want to remove");

    EditUserStat(testname, 0, 45);
}

function lsPush()
{
    // push the users aray to localstorage as a JSON string
    localStorage.setItem("users", JSON.stringify(users));
}

function lsGet()
{
    var getval = localStorage.getItem("users");
    if (getval == null) // if there is no "users" item in localstorage
    {
        localStorage.setItem("users", "{}");    // create an empty entry under the "users" key
        return 1;   // siginfy that there are no users in the database
    }
    else
    {
        users = JSON.parse(getval); // convert the JSON string in locastorage into an array
        return 0;   // signify that there are users in the database
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
        if (users[i].name == name)  // if the currently selected user in users array has the name we are looking for
        {
            userFound = true;
            userPosition = i;
        }
    }

    if (userFound)
    {
        return users[userPosition]; // return the user object that was requested
    }
    else
    {
        alert(`Could not find user with name ${name}`); // alert the user that the requested user does not exist
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
        return userPosition;    // return the position in the database for the requested user
    }
    else
    {
        alert(`Could not find user with name ${name}`)
    }
}

function AddUserObject(user)
{
    users.push(user);   // push user object onto the user array
    lsPush();   // push update to localstorage
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
            if (users[i].password == password)  // check the entered password matches the password linked to the account
            {
                userFound = true;
                userPosition = i;
            }
        }
    }

    if (userFound)
    {
        var spliced = users.splice(userPosition, size-userPosition);    // cut users array at the position of the user to be removed
        spliced.shift();    // remove first element in the split array
        users = users.concat(spliced);  // reconnect the arrays
        alert(`User ${name} has been removed!`);
    }
    else
    {
        alert(`Could not find user with name ${name} and password ${password}`);
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