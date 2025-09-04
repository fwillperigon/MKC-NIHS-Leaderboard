UserObject = {
    "name": "zaim",
    "password": "zaimisveryCool$1",
    "classroom": 12,
    "year": 12,
    "pfp": "",
    "stats": { "wins": 13, "loss": 5, "items": 5, "subsix": 8, "score": 320 }
}

function createStatCell(statName, onChangeCallback) {
    //Creates the cell for the table data.
    var cell = document.createElement("td");

    //creates the span to ensure pressing a button doesn't overwrite all data in the table.
    var countSpan = document.createElement("span");
    countSpan.innerText = UserObject.stats[statName];
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
        if (UserObject.stats[statName] > 0) {
            UserObject.stats[statName]--;
            countSpan.innerText = UserObject.stats[statName];
            if (onChangeCallback) onChangeCallback();
        }
    });

    // code for the incremental button to raise values.
    var incrementBtn = document.createElement("button");
    incrementBtn.innerText = "+";
    incrementBtn.style.minWidth = "25px";
    // code detects/"listens" for when button is pressed, then raises corresponding value by 1
    incrementBtn.addEventListener("click", function () {
        UserObject.stats[statName]++;
        countSpan.innerText = UserObject.stats[statName];
        if (onChangeCallback) onChangeCallback();
    });

    btnContainer.appendChild(decrementBtn);
    btnContainer.appendChild(incrementBtn);

    cell.appendChild(countSpan);
    cell.appendChild(btnContainer);

    return cell;
}

function main() {
    var lb = document.getElementById("lb");
    // loops the function so it creates at most 12 rows with data.
    for (let i = 1; i <= 12; i++) {
        var row = document.createElement("tr");
        var rank = document.createElement("td");
            rank.innerHTML = i;
        var name = document.createElement("td");
            name.innerHTML = UserObject.name;
        var yearlevel = document.createElement("td");
            yearlevel.innerHTML = UserObject.year;
        var cc = document.createElement("td");
            cc.innerHTML = UserObject.classroom;
        var score = document.createElement("td");
            score.innerHTML = UserObject.stats.score;

        // Creates the win/loss ratio cell *first*, so it can be updated later
        var wlr = document.createElement("td");

        // Mini function to update the win/loss ratio cell
        function updateWinLossRatio() {
            let wins = UserObject.stats.wins;
            let losses = UserObject.stats.loss;
            // Calculates the win loss ratio and displays it
            let ratio = losses === 0 ? wins : (wins / losses).toFixed(2);
            wlr.innerText = ratio;
        }

        // Create wins and loss cells, passing update callback to update the ratio live when a button is hit
        var wins = createStatCell("wins", updateWinLossRatio);
        var loss = createStatCell("loss", updateWinLossRatio);

        // Call it once initially to set the first ratio
        updateWinLossRatio();

        // creates the rest of the stats
        var items = createStatCell("items");
        var subsix = createStatCell("subsix");

        // appends all data
        row.append(rank, name, yearlevel, cc, score, wins, loss, wlr, items, subsix);
        lb.appendChild(row);
    }
}