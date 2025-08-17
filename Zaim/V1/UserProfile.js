UserObject = {
    "name": "zaim",
    "Password": "zaimisveryCool$1",
    "Classroom": 12.02,
    "Year": 12,
    "Pfp": "",
    "stats": [["wins", 13],["loss", 5],["items", 5], ["subsix", 8],["score", 320]]
}

var Users = [UserObject];

var choice = 0;

choice = parseInt(prompt("What would you like to do? \n1. Display Stats \n2. Edit Stats \n 3. Add Profile"));

if (choice == 1) {
  var user = prompt("Whose stats would you like to view? (enter name)");
  var UserFound = false;

  // outter loop searches for the user in object
  for (var i = 0; i < Users.length && !UserFound; i++) {
    if (Users[i].name.toLowerCase() === (user || "").toLowerCase()) {
      UserFound = true;

      // inner loop goes over stats
      var msg = Users[i].name + "'s stats:\n";
      for (var j = 0; j < Users[i].stats.length; j++) {
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
  var user = prompt("Whose stats would you like to edit? (enter name)");
  var UserFound = false;

  // outer loop find the user
  for (var i = 0; i < Users.length && !UserFound; i++) {
    if (Users[i].name.toLowerCase() === (user || "").toLowerCase()) {
      UserFound = true;

      // build a menu of stats using a nested loop
      var menu = "Select the stat to edit for " + Users[i].name + ":\n";
      for (var j = 0; j < Users[i].stats.length; j++) {
        menu += (j + 1) + ". " + Users[i].stats[j][0] + " (current: " + Users[i].stats[j][1] + ")\n";
      }

      var which = parseInt(prompt(menu), 10);
      if (isNaN(which) || which < 1 || which > Users[i].stats.length) {
        alert("Invalid stat selection.");
      } else {
        var action = parseInt(prompt("What would you like to do?\n1. Set a new value\n2. Add to current value\n3. Subtract from current value"), 10);
        var value = parseInt(prompt("Enter a number:"), 10);

        if (isNaN(value)) {
          alert("Invalid number entered.");
        } else {
          var idx = which - 1;
          var currentVal = parseInt(Users[i].stats[idx][1], 10) || 0;

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
          var msg = Users[i].name + "'s updated stats:\n";
          for (var k = 0; k < Users[i].stats.length; k++) {
            msg += Users[i].stats[k][0] + ": " + Users[i].stats[k][1] + "\n";
          }
          alert(msg);
        }
      }
    }
  }

  if (!UserFound) {
    alert("User not found");
  }
}   
else
    alert("Add Profile")