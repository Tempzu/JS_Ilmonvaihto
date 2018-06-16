(function() {
    'use strict';

    var Src = window.location.search;
    var IDS = Src.substr(12, 15);
    var ID = Number(IDS);
    var origID;
    var change;
    var span;

    function action(ID,change){
        console.log("acting");

        if (window.attachEvent)
        {window.attachEvent('onload', getFirstSpanWithClass('temporaltext', ID, change, checking));}
        else if (window.addEventListener)
        {window.addEventListener('load', getFirstSpanWithClass('temporaltext', ID, change, checking), false);}
        else
        {document.addEventListener('load', getFirstSpanWithClass('temporaltext', ID, change, checking), false);}

        //getFirstSpanWithClass('temporaltext', ID, change, checking);
        // window.addEventListener("load", function(){getFirstSpanWithClass('temporaltext')});
    }

    function getFirstSpanWithClass(cssClass, ID, change, callback) {
            console.log("spanning");
            var elements = document.getElementsByTagName('span');
            for (var i = 0; i < elements.length; i++) {
                if((' ' + elements[i].className + ' ').indexOf(' ' + cssClass + ' ') > -1) {
                    span = elements[i];
                }
            }
            callback(ID, change, span);
    }

    function checking (ID, change, span){
        console.log("checking");
        sleep(500);
            if (span){ //Ilmo löytyi
                console.log(span.innerHTML);
                return;
            }
            else if (origID - 10 == ID){ //Mentiin 10, ei löytynyt
                console.log("Went 10, no Ilmo found");
                return;
            }
            else{
                switching(ID, change, action);
            }
    }

    function switching(ID, change, callback){
        ID = ID + change; //Siirrytään 1 ID taaksepäin
        location.search = Src.substr(0, 12) + ID;
        console.log("switched");
        callback(ID, change);
    }

    function sleep(milliseconds) {
        var start = new Date().getTime();
        for (var i = 0; i < 1e7; i++) {
            if ((new Date().getTime() - start) > milliseconds){
                break;
            }
        }
    }

    //Edellinen -------------------------------------------
    var Prev       = document.createElement ('div');
    Prev.innerHTML = '<button id="Edellinen" type="button">' + 'Edellinen</button>';

    Prev.setAttribute ('id', 'PrevButton');
    document.body.appendChild (Prev);
    var content = document.getElementById('page-content');
    content.parentNode.insertBefore(Prev, content);

    document.getElementById ("Edellinen").addEventListener (
    "click", ButtonClickAction1, false
    );

    function ButtonClickAction1 (zEvent) {
        origID = ID;
        change = -1;

        ID = ID + change; //Siirrytään 1 ID taaksepäin
        location.search = Src.substr(0, 12) + ID;
        action(ID,change);

}


    //Seuraava -------------------------------------------
    var Next       = document.createElement ('div');
    Next.innerHTML = '<button id="Seuraava" type="button">' + 'Seuraava</button>';

    Next.setAttribute ('id', 'NextButton');
    document.body.appendChild (Next);
    content.parentNode.insertBefore(Next, content);

    document.getElementById ("Seuraava").addEventListener (
    "click", ButtonClickAction2, false
    );

    function ButtonClickAction2 (zEvent) {
        origID = ID;
        check = 1;

        while (check == 1){
        ID = ID + 1;
        location.search = Src.substr(0, 12) + ID;

        var span = getFirstSpanWithClass('temporaltext');

            if (span){ //Ilmo löytyi
                console.log(span.innerHTML);
                check = 2;
            }

            else if (origID + 10 == ID){ //Mentiin 10, ei löytynyt
                check = 2;
                console.log("Went 10, no Ilmo found");
            }
        }
        }
}

)();
