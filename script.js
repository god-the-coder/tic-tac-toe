function game_reset() {
    document.querySelectorAll(".box").forEach(box => {
        box.innerHTML = ""
    });
    document.querySelector(".status").innerHTML = "";
    let scoreboard_screen = document.querySelector(".scoreBoard");
    scoreboard_screen.classList.add("hidden");
}

function scoreboard_screen(winner_name) {
    let scoreboard_screen = document.querySelector(".scoreBoard");
    document.querySelector(".hh").innerHTML = `${winner_name}`;
    scoreboard_screen.classList.remove("hidden");

}


function checkWinning(playerMoves) {

    // All winning condition of tic tac toe

    const winning_condn = [
        ["0", "1", "2"], ["3", "4", "5"], ["6", "7", "8"], ["0", "3", "6"], ["1", "4", "7"], ["2", "5", "8"], ["0", "4", "8"], ["2", "4", "6"]
    ];

    // some fn used to determine that wether even a condtion satisfies the condtion
    // every fn used to determine that wether all the elements in a array satisfies the condtion

    return winning_condn.some(condn => {
        return condn.every(pos => playerMoves.includes(pos))
    })

}

function game() {

    //  isWin is determine to stay updated that is any playter won or not if won that by help of it we will stop the game and pop out scoreboard screen
    let isWin1;
    let isWin2;
    // player_stat is initialised to stay updated to that which player have tp play next
    let player_stat = 1;

    // player_moves is determine to store data for in which box does player clicked
    let player1_moves = [];
    let player2_moves = [];
    let status_bar = document.querySelector(".status")

    // if player_stat = 1 means its player1's turn

    // adding event listners to all box classes so then when someone clicks we get to know
    let boxes = document.querySelectorAll(".box");
    boxes.forEach(box => {
        box.addEventListener("click", () => {

            if (isWin1 || isWin2) {
                return;
            }

            if (box.innerHTML !== "") {
                return;
            }

            if (player_stat == 1) {

                let box_index = box.dataset.folder;
                player1_moves.push(box_index);

                box.innerHTML = "X";

                isWin1 = checkWinning(player1_moves);
                if (isWin1 == true) {
                    status_bar.innerHTML = "player1 won";
                    scoreboard_screen("Player1 Won");
                    return;
                }

                else {
                    document.querySelector(".status").innerHTML = "player2's turn";
                    player_stat = 2;
                }

                if ((player1_moves.length + player2_moves.length) == 9) {
                    document.querySelector(".status").innerHTML = "draw!";
                    return;
                }

            }

            else if (player_stat == 2) {

                box.innerHTML = "O";

                let box_index = box.dataset.folder;
                player2_moves.push(box_index);

                isWin2 = checkWinning(player2_moves);

                if (isWin2 == true) {
                    status_bar.innerHTML = "player2 won";
                    scoreboard_screen("Player2 Won");
                    return;
                }

                else {
                    document.querySelector(".status").innerHTML = "player1's turn "
                    player_stat = 1;
                }

            }

        })
    });

}

function main() {
    let btn_stat = 1;
    const start_btn = document.querySelector(".start-reset-btn");

    start_btn.addEventListener("click", () => {
        if (btn_stat === 1) {
            game();
            start_btn.innerHTML = "reset";
            document.querySelector(".status").innerHTML = "player1's turn";
            btn_stat = 0;
        } else if (btn_stat === 0) {
            start_btn.innerHTML = "start";
            game_reset();
            btn_stat = 1;
        }
    });
}


main();