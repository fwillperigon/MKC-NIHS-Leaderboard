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

function EnterStats(){

    // tests for either an empty or not empty object
    var Users = UserObject_Global;
    //var Users = new UserObject('felix', 'swag', 1, 12.09, 12)

    console.log(UserObject_Global)

    if (Users.name === undefined){
        alert("There are currently no users, please create some");
        AddProfile()

    } else {
        alert("Displaying leaderboard")
    }

}


function AddProfile(){
    // initialise all the variables for the module
    var TmpProfile = [];
    var TmpName = "";
    var TmpPassword = "";
    var TmpClassroom = 0;
    var TmpYear = 0;
    var TmpPfp = "";

    // gather data which the user will have to enter
    TmpName = prompt("Please enter the racer's name");
    TmpPassword = prompt("Please enter the racer's password");
    TmpClassroom = parseFloat(prompt("Please enter the racer's classroom"));
    TmpYear = parseInt(prompt("Please enter the racer's year level"));
    TmpPfp = parseInt(prompt("Please select which profile picture you want \n1. Mario \n2.Luigi \n3. Bowser \n4. Princess Peach"));

    // determine their pfp (Profile picture)
    if (TmpPfp == 1)
        TmpPfp = "/Pfp/Mario.png"
    else if (TmpPfp == 2)
        TmpPfp = "/Pfp/Luigi.png"
    else if (TmpPfp == 3)
        TmpPfp = "/Pfp/Bowser.png"
    else
        TmpPfp = "/Pfp/Princess_Peach.png"

    console.log(TmpPfp)

    // create a temporary profile
    /*
    TmpProfile = {
        "name": TmpName,
        "Password": TmpPassword,
        "Classroom": TmpClassroom,
        "Year": TmpYear,
        "Pfp": TmpPfp,
        "stats": [["wins", 0],["loss", 0],["items", 0], ["subsix", 0],["score", 0]]
    }
    */

    var TmpProfile = new UserObject(TmpName, TmpPassword, 0, TmpClassroom, TmpYear, TmpPfp)

    // log the temporary profile
    console.log(TmpProfile)
}

function UserProfile(){
    // initalise variables
    var Users = [UserObject];
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
        user = prompt("Whose stats would you like to view? (enter name)");
        UserFound = false;

        // outter loop searches for the user in object
        for (i = 0; i < Users.length && !UserFound; i++) {
            if (Users[i].name.toLowerCase() === (user || "").toLowerCase()) {
                UserFound = true;

                // inner loop goes over stats
                var msg = Users[i].name + "'s stats:\n";
                for (j = 0; j < Users[i].stats.length; j++) {
                    msg += Users[i].stats[j][0] + ": " + Users[i].stats[j][1] + "\n";
                }
                alert(msg);
            }
        }
        if (!UserFound){
            alert("User not found")
        }
    }
    else if (choice == 2) {
        user = prompt("Whose stats would you like to edit? (enter name)");
        UserFound = false;

        // outer loop find the user
        for (i = 0; i < Users.length && !UserFound; i++) {
            if (Users[i].name.toLowerCase() === (user || "").toLowerCase()) {
                UserFound = true;

                // build a menu of stats using a nested loop
                menu = "Select the stat to edit for " + Users[i].name + ":\n";
                for (j = 0; j < Users[i].stats.length; j++) {
                    menu += (j + 1) + ". " + Users[i].stats[j][0] + " (current: " + Users[i].stats[j][1] + ")\n";
                }

                which = parseInt(prompt(menu), 10);
                if (isNaN(which) || which < 1 || which > Users[i].stats.length) {
                    alert("Invalid stat selection.");
                } else {
                    action = parseInt(prompt("What would you like to do?\n1. Set a new value\n2. Add to current value\n3. Subtract from current value"), 10);
                    value = parseInt(prompt("Enter a number:"), 10);

                    if (isNaN(value)) {
                        alert("Invalid number entered.");
                    } else {
                        idx = which - 1;
                        currentVal = parseInt(Users[i].stats[idx][1], 10) || 0;

                        if (action === 1) {
                            Users[i].stats[idx][1] = value;
                        } else if (action === 2) {
                            Users[i].stats[idx][1] = currentVal + value;
                        } else if (action === 3) {
                            Users[i].stats[idx][1] = currentVal - value;
                        } else {
                            alert("Invalid action.");
                        }

                        // show updated stats (nested loop)
                        message = Users[i].name + "'s updated stats:\n";
                        for (k = 0; k < Users[i].stats.length; k++) {
                            message += Users[i].stats[k][0] + ": " + Users[i].stats[k][1] + "\n";
                        }
                        alert(message);
                    }
                }
            }
        }

        if (!UserFound){
            alert("User not found");
        }
    }
    else
        AddProfile();
}
