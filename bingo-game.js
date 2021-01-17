$(document).ready(function() {
    var bank = [
        "Bunny does makeup",
        "Frames start dropping",
        "\"I'm a vegan\"",
        "Bunny denies chat of MUBBELZ",
        "\"Marxism is a critique of capitalism\"",
        "Chloe gets horny",
        "Spent the Rent dono bomb",
        "Roomie hands bunny something",
        "Raid of over 100 people appears",
        "Bunny does an impression",
        "Bunny slaps at a fly",
        "\"SHUT UUUUUP!!!\"",
        "Bunny vapes some weed",
        "Star Trek is discussed",
        "Chatter says $5 a MONTH",
        "\"What's the male version of Karen?\"",
        "Watch any part of a Richard Wolff video",
        "Bunny yells at mods",
        "Breezy plugs her paypal",
        "Bunny coos about faces in chat",
        "\"Dareth\"",
        "Bunny yells at groovers",
        "Alcohol on stream",
        "Bunny can't think of a word"
    ];

    var freeSpace = "LATE";           


    let generatedBoardContent = "<tr>";
    for(let i = 1; i < 26; i++) {
        if(i == 13) {
            generatedBoardContent += "<td class=\"square-clicked bingo-free-space\">" + freeSpace + "</td>";
        } else {
            generatedBoardContent += "<td class=\"bingo-square\">" + getBoardItem() + "</td>";

            if(i % 5 == 0) {
                generatedBoardContent += "</tr>";
            }
        }
    }

    $("#board").append(generatedBoardContent);

    $(".bingo-square").click(function() {
        if($(this).hasClass('square-clicked')) {
            $(this).removeClass('square-clicked');
        } else {
            $(this).addClass('square-clicked');
        }
    });

    function getBoardItem() {
        var item = bank[Math.floor(Math.random() * bank.length)];
        
        bank = bank.filter(function(value) {
            if(item !== value) {
                return value;
            }
        });

        return item;
    }

});