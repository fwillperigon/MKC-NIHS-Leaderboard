ZaimObject = {
    "name": "zaim",
    "password": "zaimisveryCool$1",
    "classroom": 12,
    "year": 12,
    "pfp": "",
    "stats": [["wins", 13],["loss", 5],["items", 5], ["subsix", 8],["score", 320]]
}

function main()
{
var lb = document.getElementById("lb");
var row = document.createElement("tr");

var rank = document.createElement("td");
var name = document.createElement("td");
var yl = document.createElement("td");
var cc = document.createElement("td");
var score = document.createElement("td");
var wins = document.createElement("td");
var loss = document.createElement("td");
var wlr = document.createElement("td");
var it = document.createElement("td");
var subsix = document.createElement("td");

for (var rank = 0; rank <= 12; rank++)
{
rank.innerHTML = rank
name.innerHTML = ZaimObject.name
yl.innerHTML = ZaimObject.year
cc.innerHTML = ZaimObject.classroom
score.innerHTML = ZaimObject.score
wins.innerHTML = ZaimObject.wins
loss.innerHTML = ZaimObject.loss
wlr.innerHTML = "N/A"
it.innerHTML = ZaimObject.items
subsix.innerHTML = ZaimObject.subsix;
}

row.appendChild(rank);
row.appendChild(name);
row.appendChild(yl);
row.appendChild(cc);
row.appendChild(score);
row.appendChild(wins);
row.appendChild(loss);
row.appendChild(wlr);
row.appendChild(it);
row.appendChild(subsix);

lb.appendChild(row);

}