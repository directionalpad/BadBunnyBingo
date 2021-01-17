import Board from './board.js';
import cookie from './cookie.js';

// const board;

$(document).ready(function() {
    const board = new Board(cookie.get('boardState'));
    $("tbody").append(board.getBoardMarkup());

    $("#new-board").click(function() {
        cookie.remove('boardState');
        document.location.reload(true);
    });

    $(".bingo-square").click(function() {
        if($(this).hasClass('square-stamped')) {
            $(this).removeClass('square-stamped');
        } else {
            $(this).addClass('square-stamped');
        }

        board.updateSquareStates($("td").toArray());
    });
});

