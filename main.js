function UserObject(name, password, power, classcode, year, pfp)
{
    this.name = name;
    this.password = password;
    this.power = power;
    this.classcode = classcode;
    this.year = year;
    this.pfp = pfp;
    this.stats = { "wins": 0, "loss": 0, "score": 0 };
}

var loggedin = false;
var users = new Array();
var zaim = new UserObject("zaim", "miaz", 0, "12.10", 12, null);
const lowercase_test = new RegExp("[a-z]+");
const uppercase_test = new RegExp("[A-Z]+");
const number_test = new RegExp("[0-9]+");
const special_test = new RegExp("[! #$%&'()*+,-./:;<=>?@]+");

function main()
{
    users.push(zaim);
    EnterStats();
}

// ZAIM FUNCTIONS

function EnterStats()
{
    if (localStorage.getItem("loggedin") == "false")
    {
        loggedin = false;
    }
    else if (localStorage.getItem("loggedin") == "true")
    {
        loggedin = true;
    }
    else
    {
        loggedin = false;
    }
    if (lsGet() == 1){
        alert("There are currently no users, please create some");
        Register();
    }
}

function UserProfile(){
    // initalise variables
    var Users = [];
    var choice = 0;
    var user = "";
    var UserFound = false;
    var menu = "";
    var which = 0;
    var action = 0;
    var value = 0;
    var idx = 0;
    var currentVal = 0;
    var message = "";
    var i = 0;
    var j = 0;
    var k = 0;


    choice = parseInt(prompt("What would you like to do? \n1. Display Stats \n2. Edit Stats \n 3. Add Profile"));

    if (choice == 1) {
        
    }
    else if (choice == 2) {
        

        if (!UserFound){
            alert("User not found");
        }
    }
    else
        AddProfile();
}

function DisplayStats()
{
    var user = "";
    var j = 0;

    user = prompt("Whose stats would you like to view? (enter name)");
    var foundUser = GetUser(user);

    alert(`${foundUser.name}'s Stats:\nWins: ${foundUser.stats["wins"]}\nLoss: ${foundUser.stats["loss"]}\nScore: ${foundUser.stats["score"]}`);
}

function EditStats()
{
    var user = "";
    var menu = "";
    var which = 0;
    var action = 0;
    var value = 0;
    var idx = 0;
    var currentVal = 0;
    var message = "";
    var j = 0;
    var k = 0;

    user = prompt("Whose stats would you like to edit? (enter name)");
    var foundUser = GetUser(user);

    // build a menu of stats using a nested loop
    menu = "Select the stat to edit for " + foundUser.name + ":\n1. Wins (current: " + foundUser.stats["wins"] + ")\n2. Loss (current: " + foundUser.stats["loss"] + ")\n3. Score (current: " + foundUser.stats["score"] + ")\n4. Profile Picture (current: " + foundUser.pfp + ")";

    which = parseInt(prompt(menu), 10);
    if (isNaN(which) || which < 1 || which > foundUser.stats.length) {
        alert("Invalid stat selection.");
    } else if (which == 4){
        var pfp = parseInt(prompt("Please select which profile picture you want \n1. Mario \n2. Luigi \n3. Bowser \n4. Princess Peach"));
        while(pfp < 1 || pfp > 4)
        {
            alert("Invalid profile picture chosen. Try again");
            pfp = parseInt(prompt("Please select which profile picture you want \n1. Mario \n2. Luigi \n3. Bowser \n4. Princess Peach"));
        }
        foundUser.pfp = pfp;
        lsPush();
    } else {
        var statConvert = "";
        switch(which)
        {
        case 1:
            statConvert = "wins";
            break;
        case 2:
            statConvert = "loss";
            break;
        case 3:
            statConvert = "score";
            break;
        }

        console.log(statConvert);

        action = parseInt(prompt("What would you like to do?\n1. Set a new value\n2. Add to current value\n3. Subtract from current value"), 10);
        value = parseInt(prompt("Enter a number:"), 10);

        if (isNaN(value)) {
            alert("Invalid number entered.");
        } else {
            currentVal = parseInt(foundUser.stats[statConvert], 10) || 0;

            if (action === 1) {
                foundUser.stats[statConvert] = value;
            } else if (action === 2) {
                foundUser.stats[statConvert] = currentVal + value;
            } else if (action === 3) {
                foundUser.stats[statConvert] = currentVal - value;
            } else {
                alert("Invalid action.");
            }

            alert(`${foundUser.name}'s updated stats:\nWins: ${foundUser.stats["wins"]}\nLoss: ${foundUser.stats["loss"]}\nScore: ${foundUser.stats["score"]}\n`);
            lsPush();
        }
    }
}

// HUNTER FUNCTIONS

function createStatCell(statName, user, onChangeCallback) {
    //Creates the cell for the table data.
    var cell = document.createElement("td");

    //creates the span to ensure pressing a button doesn't overwrite all data in the table.
    var countSpan = document.createElement("span");
    countSpan.innerText = user.stats[statName];
    // Keeps margins all lined up (Would have done in HTML but this frees up space.)
    countSpan.style.marginRight = "10px";

    // Creates a container to place the buttons next to each other.
    var btnContainer = document.createElement("span");
    btnContainer.style.display = "inline-flex";
    btnContainer.style.gap = "5px";

    // code for the decremental button to lower values
    var decrementBtn = document.createElement("button");
    decrementBtn.innerText = "-";
    decrementBtn.style.minWidth = "25px";
    // code detects/"listens" for when button is pressed, then lowers corresponding value by 1
    decrementBtn.addEventListener("click", function () {
        if (user.stats[statName] > 0) {
            user.stats[statName]--;
            countSpan.innerText = user.stats[statName];
            if (onChangeCallback) onChangeCallback();
        }
        lsPush();
    });

    // code for the incremental button to raise values.
    var incrementBtn = document.createElement("button");
    incrementBtn.innerText = "+";
    incrementBtn.style.minWidth = "25px";
    // code detects/"listens" for when button is pressed, then raises corresponding value by 1
    incrementBtn.addEventListener("click", function () {
        user.stats[statName]++;
        countSpan.innerText = user.stats[statName];
        if (onChangeCallback) onChangeCallback();
        lsPush();
    });

    btnContainer.appendChild(decrementBtn);
    btnContainer.appendChild(incrementBtn);

    cell.appendChild(countSpan);
    cell.appendChild(btnContainer);

    return cell;
}

function lbmain() {
    SortDatabase();

    var lb = document.getElementById("lb");
    // loops the function so it creates at most 12 rows with data.
    for (let i = 0; i < users.length; i++) {
    // Starts creating elements for all the data
        var row = document.createElement("tr");
        var rank = document.createElement("td");
        rank.innerHTML = i + 1;
        var pfp = document.createElement("img");
        var pfpsrc = users[i].pfp;
        pfp.setAttribute("src", `pfp/${pfpsrc}.png`);
        pfp.setAttribute("width", 50);
        pfp.setAttribute("height", 50);

        var name = document.createElement("td");
        name.innerHTML = users[i].name;

    // Create a button for the player names
        //var nameBtn = document.createElement("button");
        //nameBtn.innerText = users[i].name;

    // Adds a click listener to detect when the button is clicked
    /*
        nameBtn.addEventListener("click", function() {
    // alert of DummyData (Will be replaced with calling Zaim's profile code when done)
        alert(
            "Name: " + users[i].name + "\n" +
            "Year: " + users[i].year + "\n" +
            "Classroom: " + users[i].classcode + "\n" +
            "Wins: " + users[i].stats.wins + "\n" +
            "Losses: " + users[i].stats.loss + "\n" +
            "Items: " + users[i].stats.items + "\n" +
            "Subsix: " + users[i].stats.subsix + "\n" +
            "Score: " + users[i].stats.score
        );
    });
    */
    // Creates elements for the rest of the data
        var yearlevel = document.createElement("td");
            yearlevel.innerHTML = users[i].year;
        var cc = document.createElement("td");
            cc.innerHTML = users[i].classcode;
        var score = document.createElement("td");
            score.innerHTML = users[i].stats.score;

    // Now, here's where things get further complex.
    // Creates the win/loss ratio cell *first*, so it can be updated later
        var wlr = document.createElement("td");

        // Mini function to update the win/loss ratio cell
        function updateWinLossRatio() {
            let wins = users[i].stats["wins"];
            let losses = users[i].stats["loss"];
            // Calculates the win/loss ratio and displays it
            //let ratio = losses === 0 ? wins : (wins / losses).toFixed(2);
            //wlr.innerText = ratio;
        }

    // Create wins and loss cells, passing update callback to update the ratio live when a button is hit
        var wins = createStatCell("wins", users[i], updateWinLossRatio);
        var loss = createStatCell("loss", users[i], updateWinLossRatio);
        wlr.innerText = users[i].stats["loss"] === 0 ? users[i].stats["wins"] : (users[i].stats["wins"] / users[i].stats["loss"]).toFixed(2);

    // Calls the w/l ratio function once initially to set the first ratio
        updateWinLossRatio();

    // creates the rest of the stats
        //var items = createStatCell("items", users[i]);
        //var subsix = createStatCell("subsix", users[i]);

    // appends all data and puts the name data inside of the cell
        //name.appendChild(nameBtn);
        row.append(rank, pfp, name, yearlevel, cc, score, wins, loss, wlr);
        lb.appendChild(row);
    }
}

// FELIX FUNCTIONS

function SortDatabase()
{
    lsGet();
    var sorted = false;

    while (!sorted)
    {
        sorted = true;
        for (var i = 0; i < users.length - 1; i++)
        {
            if (users[i].stats["score"] < users[i + 1].stats["score"])
            {
                var tempusr = users[i];
                users[i] = users[i + 1];
                users[i + 1] = tempusr;
                sorted = false;
            }
        }
    }

}

function Register()
{
    var name = prompt("What is your name");
    var classcode = prompt("What class are you in");
    var year = prompt("What year are you in");
    var pfp = parseInt(prompt("Please select which profile picture you want \n1. Mario \n2. Luigi \n3. Bowser \n4. Princess Peach"));

    while(pfp < 1 || pfp > 4)
    {
        alert("Invalid profile picture chosen. Try again");
        pfp = parseInt(prompt("Please select which profile picture you want \n1. Mario \n2. Luigi \n3. Bowser \n4. Princess Peach"));
    }

    var valid_password = false;
    var pass;

    while (!valid_password)
    {
        pass = prompt("Input a valid password. Must have\n- Lowercase letters\n- Uppercase letters\n- Numbers\n- Special Characters");
        var passcheck = CheckPassword(pass);
        switch (passcheck)
        {
            case 1:
                alert("Password too short! At least characters");
                break;
            case 2:
                alert("Password too long! Keep within 16 characters");
                break;
            case 3:
                alert("No lowercase letters");
                break;
            case 4:
                alert("No uppercase letters");
                break;
            case 5:
                alert("No numbers");
                break;
            case 6:
                alert("No special characters");
                break;
            default:
                alert("Valid password!");
                valid_password = true;
                break; 
        }
    }

    var encryptedpass = Encrypt(pass);
    
    registeredUser = new UserObject(name, encryptedpass, 0, classcode, year, pfp);
    console.log(registeredUser);
    AddUserObject(registeredUser, users);
}

function Login()
{
    var name = prompt("Input name");
    var pass = prompt("Input password");

    var login_succeed = false;

    while(login_succeed == false)
    {
        if (Encrypt(pass) == GetUser(name).password)
        {
            login_succeed = true;
            localStorage.setItem("loggedin", "true");
            localStorage.setItem("account", name);
        }
        else
        {
            alert("Incorrect Password. Try Again");
            pass = prompt("Input password");
        }
    }
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
        //localStorage.setItem("users", "{}");
        users = new Array();
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

function RemoveUser()
{
    lsGet();
    var size = users.length;
    var userFound = false;
    var userPosition = 0;

    var name = prompt("What is the name of the user you want to remove?");
    var password = prompt("What is the password of the user you want to remove?");
    password = Encrypt(password);

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

function AddUserObject(user, userArr)
{
    console.log(userArr);
    userArr.push(user);
    lsPush();
}

function CheckPassword(pass)
{
    var lower = lowercase_test.test(pass);
    var upper = uppercase_test.test(pass);
    var number = number_test.test(pass);
    var special = special_test.test(pass);

    // Return Codes
    // 0: Success
    // 1: Password too short
    // 2: No lowercase letters
    // 3: No uppercase letters
    // 4: No numbers
    // 5: No special characters

    if (pass.length < 6)
        return 1;
    else if (pass.length > 16)
        return 2;

    if (!lower)
        return 3;
    else if (!upper)
        return 4;
    else if (!number)
        return 5;
    else if (!special)
        return 6;
    else
        return 0;
}

function Encrypt(pass)
{
    const key = "29OJLjvs1y3GstLy";

    var passarray = 
    [
        0, 0, 0, 0,
        0, 0, 0, 0,
        0, 0, 0, 0,
        0, 0, 0, 0
    ];

    for (var i = 0; i < pass.length; i++)
    {
        passarray[i] = pass.charCodeAt(i);
    }

    for (var j = 0; j < 10; j++)
    {
        for (var i = 0; i < 16; i++)
        {
            passarray[i] = sbox[passarray[i]];
        }
        shiftRows(passarray);
    }

    for (var i = 0; i < 16; i++)
    {
        passarray[i] = String.fromCharCode(passarray[i]);
    }

    var returnpass = passarray.join("");    
    return returnpass;
}

function Decrypt(pass)
{
    var passarray = 
    [
        0, 0, 0, 0,
        0, 0, 0, 0,
        0, 0, 0, 0,
        0, 0, 0, 0
    ];

    for (var i = 0; i < pass.length; i++)
    {
        passarray[i] = pass.charCodeAt(i);
    }

    for (var j = 0; j < 10; j++)
    {
        for (var i = 0; i < 16; i++)
        {
            passarray[i] = invsbox[passarray[i]];
        }
        antiShiftRows(passarray);
    }

    for (var i = 0; i < 16; i++)
    {
        if (String.fromCharCode(passarray[i]) != '\x00')
            passarray[i] = String.fromCharCode(passarray[i]);
        else
            passarray.pop();
    }

    var returnpass = passarray.join("");    
    return returnpass;
}

function shiftRows(arr)
{
    swapArr(arr, 4, 7);
    swapArr(arr, 4, 6);
    swapArr(arr, 4, 5);

    swapArr(arr, 8, 10);
    swapArr(arr, 9, 11);

    swapArr(arr, 15, 12);
    swapArr(arr, 15, 13);
    swapArr(arr, 15, 14);
}

function antiShiftRows(arr)
{
    swapArr(arr, 4, 5);
    swapArr(arr, 4, 6);
    swapArr(arr, 4, 7);

    swapArr(arr, 8, 10);
    swapArr(arr, 9, 11);

    swapArr(arr, 15, 14);
    swapArr(arr, 15, 13);
    swapArr(arr, 15, 12);
}

function swapArr(arr, a, b)
{
    temp = arr[a];
    arr[a] = arr[b]
    arr[b] = temp;
}

const sbox = 
[
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    121, 55, 93, 88, 66, 61, 53, 110, 112, 77, 126, 41, 82, 81, 62, 43, 
    69, 65, 104, 109, 70, 44, 100, 78, 40, 50, 36, 96, 114, 54, 103, 87, 
    115, 102, 111, 116, 52, 107, 117, 80, 37, 120, 39, 106, 101, 123, 68, 
    38, 85, 91, 71, 67, 95, 49, 119, 124, 99, 113, 72, 48, 56, 42, 76, 51, 
    90, 75, 98, 118, 92, 59, 105, 63, 74, 73, 97, 33, 64, 89, 122, 58, 60, 
    57, 34, 125, 108, 46, 84, 79, 86, 45, 83, 35, 94, 47
]

const invsbox = 
[
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
    108, 115, 124, 59, 73, 80, 75, 57, 44, 94, 48, 54, 122, 118, 126, 92, 
    86, 58, 96, 69, 39, 62, 34, 93, 114, 112, 102, 113, 38, 47, 104, 109, 
    50, 37, 84, 79, 49, 53, 83, 91, 106, 105, 98, 95, 42, 56, 120, 72, 46, 
    45, 123, 119, 81, 121, 64, 36, 110, 97, 82, 101, 35, 125, 85, 60, 107, 
    99, 89, 55, 77, 66, 63, 51, 103, 76, 70, 117, 52, 40, 67, 41, 90, 61, 65,
    68, 71, 100, 87, 74, 33, 111, 78, 88, 116, 43
]