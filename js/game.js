import Board from './board.js';

$(document).ready(function() {
    let board = new Board();
    $("tbody").append(board.getBoardMarkup());

    $(".bingo-square").click(function() {
        if($(this).hasClass('square-stamped')) {
            $(this).removeClass('square-stamped');
        } else {
            $(this).addClass('square-stamped');
        }
    });
});
