import Board from './board.js';
import cookie from './cookie.js';

// const board;

$(document).ready(function() {
    let theme = cookie.get('theme');
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches && theme === undefined) {
        $("body").addClass('dark-theme');
        cookie.set("theme", "dark-theme",{ expires: cookie.expiresMultiplier, secure: true });
    }
    
    const board = new Board(cookie.get('boardState'));

    $("tbody").append(board.getBoardMarkup());

    $(".new-board").click(function() {
        // Remove old board state cookie
        cookie.remove('boardState');
 
        // Generate new board and display
        board.generateNewBoard();
        $("tbody").empty().append(board.getBoardMarkup());

        // Show Bingo Card view if not present already
        $("#win-screen").addClass('hidden');
        $("table").removeClass('hidden');
    });

    $("tbody").on("click", ".bingo-square", function(event) {
        if(board.getWinnerViewMode()) {
            return;
        }

        if($(this).hasClass('square-stamped')) {
            $(this).removeClass('square-stamped');
        } else {
            $(this).addClass('square-stamped');
        }

        board.updateSquareStates($("td").toArray());

        if(board.isBoardInWinState()) {
            $("table").addClass('hidden');
            $("#win-screen").removeClass('hidden');
        }
    });

    $("#winner-view").click(function() {
        board.setWinnerViewMode(true);

        if(board.isBoardInWinState()) {
            $("#win-screen").addClass('hidden');
            $("table").removeClass('hidden');
        }
    });

    $(".theme-toggle").on('click', function() {
        theme = cookie.get('theme');

        if(theme !== undefined){
            console.log(theme);
            cookie.remove("theme");
            $("body").removeClass('dark-theme');
        } else {
            cookie.set("theme", "dark-theme",{ expires: cookie.expiresMultiplier, secure: true });
            $("body").addClass('dark-theme');
        }
        return false;
    });
});

