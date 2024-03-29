"use strict";
var W = 15, H = 15, BOMB = 50, cell = [], opened = 0;

function init() {
    var main = document.getElementById("main");

    //tr要素とtd要素を作成して行と列を作ってる。
    for (var i = 0; i < H; i++) {
        cell[i] = [];
        var tr = document.createElement("tr");
        for (var j = 0; j < W; j++) {
            var td = document.createElement("td");
            td.addEventListener("click", click);
            td.className = "cell";
            td.y = i;
            td.x = j;
            //cellの行と列
            cell[i][j] = td;
            tr.appendChild(td);
        }
        main.appendChild(tr);
    }

    for (var i = 0; i < BOMB; i++) {
        while (true) {
            var x = Math.floor(Math.random() * W);
            var y = Math.floor(Math.random() * H);
            if (!cell[x][y].bomb) {
                cell[x][y].bomb = true;
                //cell[x][y].textContent = "*";
                break;
            }
        }
    }
}

//x,yの座標の周囲に幾つの爆弾があるか、その個数を表している。
function count(x, y) {
    var b = 0;
    for (var j = y - 1; j <= y + 1; j++) {
        for (var i = x - 1; i <= x + 1; i++) {
            if (cell[j] && cell[j][i]) {
                if (cell[j][i].bomb) b++;
            }
        }
    }
    return b;
}

function open(x, y) {
  /*x,yを中心の座標として捉えてその一周をopenする。
  行、列で繰り返していく。*/
    for (var j = y - 1; j <= y + 1; j++) {
        for (var i = x - 1; i <= x + 1; i++) {
            if (cell[j] && cell[j][i]) {
                var c = cell[j][i];
                if (c.opened || c.bomb) {
                  //continueで処理を繰り返す。
                    continue;
                }
                flip(c);
                var n = count(i, j);
                if (n == 0) {
                    open(i, j);
                } else {
                    c.textContent = n;
                }
            }
        }
    }
}

function flip(cell) {
  //cell と openを代入する事で両方のスタイルを適用する。
    cell.className = "cell open";
    cell.opened = true;
    //全てのますが開いた時を表している。
    if (++opened >= (W * H - BOMB)) {
        document.getElementById("title").textContent = "Good Job!";
    }
}

function click(e) {
    var src = e.currentTarget;
    if (src.bomb) {
        cell.forEach(function (tr) {
            tr.forEach(function (td) {
                if (td.bomb) {
                    td.textContent = "+";
                }
            })
        });
        document.getElementById("title").textContent = "Game Over";
    } else {
        open(src.x, src.y);
    }
}