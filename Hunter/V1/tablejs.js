function main()
{
var lb = document.getElementById("lb");
var row = document.createElement("tr");

var rank = document.createElement("td");
var name = document.createElement("td");
var yl = document.createElement("td");
var cc = document.createElement("td");
var wins = document.createElement("td");
var loss = document.createElement("td");
var wlr = document.createElement("td");
var it = document.createElement("td");
var subsix = document.createElement("td");

rank.innerHTML = 1;
name.innerHTML = "Hunter";
yl.innerHTML = 12;
cc.innerHTML = 12;
wins.innerHTML = 3;
loss.innerHTML = 1;
wlr.innerHTML = 2;
it.innerHTML = 15;
subsix.innerHTML = 1;

row.appendChild(rank);
row.appendChild(name);
row.appendChild(yl);
row.appendChild(cc);
row.appendChild(wins);
row.appendChild(loss);
row.appendChild(wlr);
row.appendChild(it);
row.appendChild(subsix);

lb.appendChild(row);

}