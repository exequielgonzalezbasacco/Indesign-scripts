/*
3 - Repeticiones en líneas
El script que busca repeticiones de caracteres en lineas sucesivas, alternadas, y en varias lineas consecutivas

Ahora:
- Que marque todo asi veo bien los errores
- Incorporar nuevamente duración y errores
- Lo del guión no es muy relevante
- Error palabra con un solo caracter (y)
- Que si el ultimo caracter es nu signo puntuación como ., obvie



Tareas:
- Que ambas funciones llamen a una 3ra que le pasas el array de líneas de la footnote y de la página y tiene el algoritmo potente
- Faltaría corregir que no haga las repeticiones en la 1ra
- Arreglar interfase
- Arreglar lo de las palabras cortas... algo como que si la ultima palabra tiene length 2 que haga los ultimos caracteres y ya
- Mejora posible: que no sea sensible a los acentos (un acento no esta nunca en el último caracter... creo)
- Aplicar el underlineColor de las notas una única vez
- Que no te marque una primera linea en la segunda página de una nota al pie
- Lo de los errores podría ser un array... mucho más elegante
- Comentar!
*/

main();

function main() {
    //Make certain that user interaction (display of dialogs, etc.) is turned on.
    app.scriptPreferences.userInteractionLevel = UserInteractionLevels.interactWithAll;
    if (app.documents.length != 0) {
        if (app.selection.length > 0) {
            switch (app.selection[0].constructor.name) {
                case "TextFrame":
                case "Button":
                    myDisplayDialog();
                    break;
                default:
                    alert("Selecciona un marco de texto");
                    break;
            }
        } else {
            alert("Selecciona un marco de texto");
        }
    } else {
        alert("Abra un documento y seleccione un marco de texto");
    }
}

function myDisplayDialog() {
    var myDialog = app.dialogs.add({
        name: "Buscador de repeticiones"
    });
    with(myDialog) {
        with(dialogColumns.add()) {
            var cuerpoGroup = enablingGroups.add({
                staticLabel: "Cuerpo",
                checkedState: true
            });
            with(cuerpoGroup) {
                with(dialogColumns.add()) {
                    staticTexts.add({
                        staticLabel: " "
                    });
                    staticTexts.add({
                        staticLabel: "Inicio - Consecutivas"
                    });
                    staticTexts.add({
                        staticLabel: "Inicio - Alternadas"
                    });
                    staticTexts.add({
                        staticLabel: "Final - Consecutivas"
                    });
                    staticTexts.add({
                        staticLabel: "Final - Alternadas"
                    });
                }
                with(dialogColumns.add()) {
                    staticTexts.add({
                        staticLabel: "Caracteres"
                    });
                    var principioConsecutivas = integerEditboxes.add({
                        editValue: 2
                    });
                    var principioAlternadas = integerEditboxes.add({
                        editValue: 3
                    });
                    var finalConsecutivas = integerEditboxes.add({
                        editValue: 2
                    });
                    var finalAlternadas = integerEditboxes.add({
                        editValue: 3
                    });
                }
            }
            var notasGroup = enablingGroups.add({
                staticLabel: "Notas al pie",
                checkedState: true
            });
            with(notasGroup) {
                with(dialogColumns.add()) {
                    staticTexts.add({
                        staticLabel: " "
                    });
                    staticTexts.add({
                        staticLabel: "Inicio - Consecutivas"
                    });
                    staticTexts.add({
                        staticLabel: "Inicio - Alternadas"
                    });
                    staticTexts.add({
                        staticLabel: "Final - Consecutivas"
                    });
                    staticTexts.add({
                        staticLabel: "Final - Alternadas"
                    });
                }
                with(dialogColumns.add()) {
                    staticTexts.add({
                        staticLabel: "Caracteres"
                    });
                    var principioNotasConsecutivas = integerEditboxes.add({
                        editValue: 2
                    });
                    var principioNotasAlternadas = integerEditboxes.add({
                        editValue: 3
                    });
                    var finalNotasConsecutivas = integerEditboxes.add({
                        editValue: 2
                    });
                    var finalNotasAlternadas = integerEditboxes.add({
                        editValue: 3
                    });
                }
            }
        }
    }

    var myReturn = myDialog.show();

    if (myReturn == true) {
        //Get the values from the dialog box.
        start = Date.now();
        var cuerpoGroup = cuerpoGroup.checkedState;
        var notasGroup = notasGroup.checkedState;

        var principioConsecutivas = principioConsecutivas.editValue;
        var principioAlternadas = principioAlternadas.editValue;
        var finalConsecutivas = finalConsecutivas.editValue;
        var finalAlternadas = finalAlternadas.editValue;

        var principioNotasConsecutivas = principioNotasConsecutivas.editValue;
        var principioNotasAlternadas = principioNotasAlternadas.editValue;
        var finalNotasConsecutivas = finalNotasConsecutivas.editValue;
        var finalNotasAlternadas = finalNotasAlternadas.editValue;

        myDialog.destroy();
        //"||" is logical OR in JavaScript.

        if ((cuerpoGroup != false) || (notasGroup != false)) {

            if (cuerpoGroup == true) {
                myFrames = app.selection[0].parentStory.textContainers;
            }

            if (notasGroup == true) {
                notasPie = app.selection[0].parentStory.footnotes;
            }

            myColor = app.activeDocument.colors.item("Repeticion");
            try {
                myColor = myColor.name;
            } catch (myError) {
                myColor = app.activeDocument.colors.add();
                myColor.properties = {
                    name: "Repeticion",
                    model: ColorModel.PROCESS,
                    space: ColorSpace.RGB,
                    colorValue: [255, 0, 0]
                };
            }

            app.selection[0].parentStory.underlineColor = myColor;
            app.selection[0].parentStory.underlineWeight = 2;


            if (cuerpoGroup == true) {
                cuerpo(principioConsecutivas, principioAlternadas, finalConsecutivas, finalAlternadas);
            }
            if (notasGroup == true) {
                notas(principioNotasConsecutivas, principioNotasAlternadas, finalNotasConsecutivas, finalNotasAlternadas);
            }
            if (cuerpoGroup == false) {
                errores(0, 0, 0, 0, 0, 0, errorNotasPrincipioConsecutivas, errorNotasPrincipioAlternadas, errorNotasPrincipioSucesivas, errorNotasFinalConsecutivas, errorNotasFinalAlternadas, errorNotasFinalSucesivas, errorNota);
            }
            if (notasGroup == false) {
                errores(errorPrincipioConsecutivas, errorPrincipioAlternadas, errorPrincipioSucesivas, errorFinalConsecutivas, errorFinalAlternadas, errorFinalSucesivas, 0, 0, 0, 0, 0, 0, []);
            }
        } else {
            alert("Elegi algo, maestro")
            myDialog.destroy();
        }
    }
}

function cuerpo(principioConsecutivas, principioAlternadas, finalConsecutivas, finalAlternadas) {

    principioConsecutivas -= 1;
    principioAlternadas -= 1;
    finalConsecutivas -= 1;
    finalAlternadas -= 1;

    var errorPrincipioConsecutivas = 0;
    var errorPrincipioAlternadas = 0;
    var errorPrincipioSucesivas = 0;
    var errorFinalConsecutivas = 0;
    var errorFinalAlternadas = 0;
    var errorFinalSucesivas = 0;

    for (j = 0; j < myFrames.length; j++) {
        myLines = myFrames[j].lines;
        if (myLines.length < 2) {
            continue;
        }

        prev2Line = myLines[0];
        prevLine = myLines[1];

        prev2LineLargo = prev2Line.length - 1;
        prevLineLargo = prevLine.length - 1;

        try {
            prevLineChars = prevLine.characters.itemByRange(0, principioConsecutivas);
        } catch (myError) {
            prevLineChars = "";
        }
        try {
            prevLineAltChars = prevLine.characters.itemByRange(0, principioAlternadas);
        } catch (myError) {
            prevLineAltChars = "";
        }
        try {
            prev2LineAltChars = prev2Line.characters.itemByRange(0, principioAlternadas);
        } catch (myError) {
            prev2LineAltChars = "";
        }
        try {
            prevLineSucChars = prevLine.characters.firstItem();
        } catch (myError) {
            prevLineSucChars = "";
        }
        try {
            prev2LineSucChars = prev2Line.characters.firstItem();
        } catch (myError) {
            prev2LineSucChars = "";
        }
        try {
            prevLineUltChars = prevLine.characters.itemByRange(prevLineLargo - finalConsecutivas, prevLineLargo);
        } catch (myError) {
            prevLineUltChars = "";
        }
        try {
            prevLineAltUltChars = prevLine.characters.itemByRange(prevLineLargo - finalAlternadas, prevLineLargo);
        } catch (myError) {
            prevLineAltUltChars = "";
        }
        try {
            prev2LineAltUltChars = prev2Line.characters.itemByRange(prev2LineLargo - finalAlternadas, prev2LineLargo);
        } catch (myError) {
            prev2LineAltUltChars = "";
        }
        try {
            prevLineSucUltChars = prevLine.words.lastItem().characters.lastItem();
        } catch (myError) {
            prevLineSucUltChars = "";
        }
        try {
            prev2LineSucUltChars = prev2Line.words.lastItem().characters.lastItem();
        } catch (myError) {
            prev2LineSucUltChars = "";
        }

        for (i = 2; i < myLines.length; i++) {
            currLine = myLines[i];
            lastWord = currLine.words.lastItem();

            try {
                prevLineCharsUnder = prevLineChars.contents.toString();
            } catch (myError) {
                prevLineCharsUnder = "";
            }
            try {
                prevLineAltCharsUnder = prevLineAltChars.contents.toString();
            } catch (myError) {
                prevLineAltCharsUnder = "";
            }
            try {
                prev2LineAltCharsUnder = prev2LineAltChars.contents.toString();
            } catch (myError) {
                prev2LineAltCharsUnder = "";
            }
            try {
                prevLineSucCharsUnder = prevLineSucChars.contents.toString();
            } catch (myError) {
                prevLineSucCharsUnder = "";
            }
            try {
                prev2LineSucCharsUnder = prev2LineSucChars.contents.toString();
            } catch (myError) {
                prev2LineSucCharsUnder = "";
            }
            try {
                prevLineUltCharsUnder = prevLineUltChars.contents.toString();
            } catch (myError) {
                prevLineUltCharsUnder = "";
            }
            try {
                prevLineAltUltCharsUnder = prevLineAltUltChars.contents.toString();
            } catch (myError) {
                prevLineAltUltCharsUnder = "";
            }
            try {
                prev2LineAltUltCharsUnder = prev2LineAltUltChars.contents.toString();
            } catch (myError) {
                prev2LineAltUltCharsUnder = "";
            }
            try {
                prevLineSucUltCharsUnder = prevLineSucUltChars.contents.toString();
            } catch (myError) {
                prevLineSucUltCharsUnder = "";
            }
            try {
                prev2LineSucUltCharsUnder = prev2LineSucUltChars.contents.toString();
            } catch (myError) {
                prev2LineSucUltCharsUnder = "";
            }
            try {
                lineasUltimaPalabra = lastWord.lines.length;
            } catch (myError) {
                continue;
            }
            try {
                currLineChars = currLine.characters.itemByRange(0, principioConsecutivas);
                currLineCharsUnder = currLineChars.contents.toString();
            } catch (myError) {
                currLineCharsUnder = "";
            }
            try {
                currLineAltChars = currLine.characters.itemByRange(0, principioAlternadas);
                currLineAltCharsUnder = currLineAltChars.contents.toString();
            } catch (myError) {
                currLineAltCharsUnder = "";
            }
            try {
                currLineSucChars = currLine.characters.firstItem();
                currLineSucCharsUnder = currLineSucChars.contents.toString();
            } catch (myError) {
                currLineSucCharsUnder = "";
            }
            
            if (prev2LineSucCharsUnder == prevLineSucCharsUnder) {
                if (prevLineSucCharsUnder == currLineSucCharsUnder) {
                    if (prevLineSucCharsUnder != "") {
                        currLineSucChars.underline = true;
                        errorPrincipioSucesivas += 1;
                        //prevLine.insertionPoints[0].contents = "\u200C";
                        //currLine.insertionPoints[0].contents = "\u200C";
                    }
                }
            }

            if (prev2LineAltCharsUnder == currLineAltCharsUnder) {
                if (prev2LineAltCharsUnder != "") {
                    currLineAltChars.underline = true;
                    errorPrincipioAlternadas += 1;
                    //prev2Line.insertionPoints[0].contents = "\u200C";
                    //currLine.insertionPoints[0].contents = "\u200C";
                }
            }

            if (prevLineCharsUnder == currLineCharsUnder) {
                if (prevLineCharsUnder != "") {
                    currLineChars.underline = true;
                    errorPrincipioConsecutivas += 1;
                   // prevLine.insertionPoints[0].contents = "\u200C";
                    //currLine.insertionPoints[0].contents = "\u200C";
                }
            }
            // aca arranca lo de ultimas
            if (lastWord.lines.length > 1) {
                currLineLargo = currLine.length - 1;
                currLineUltChars = currLine.characters.itemByRange(currLineLargo - finalConsecutivas, currLineLargo);
                currLineUltCharsUnder = currLineUltChars.contents.toString();
                currLineAltUltChars = currLine.characters.itemByRange(currLineLargo - finalAlternadas, currLineLargo);
                currLineAltUltCharsUnder = currLineAltUltChars.contents.toString();
                currLineSucUltChars = currLine.characters.lastItem();
                currLineSucUltCharsUnder = currLineSucUltChars.contents.toString();
            } else {
                lastWordLargo = lastWord.length - 1;
                try {
                    if (lastWordLargo >= 1) {
                        currLineUltChars = lastWord.characters.itemByRange(lastWordLargo - finalConsecutivas, lastWordLargo);
                        currLineUltCharsUnder = currLineUltChars.contents.toString();
                    } else {
                        currLineUltChars = currLine.characters.itemByRange(currLineLargo - finalConsecutivas, currLineLargo);
                        currLineUltCharsUnder = currLineUltChars.contents.toString();
                    }
                } catch (myError) {
                    currLineLargo = currLine.length - 1;
                    currLineUltChars = currLine.characters.itemByRange(currLineLargo - finalConsecutivas, currLineLargo);
                    currLineUltCharsUnder = currLineUltChars.contents.toString();
                }
                try {
                    if (lastWordLargo >= 1) {
                        currLineAltUltChars = lastWord.characters.itemByRange(lastWordLargo - finalAlternadas, lastWordLargo);
                        currLineAltUltCharsUnder = currLineAltUltChars.contents.toString();
                    } else {
                        currLineAltUltChars = currLine.characters.itemByRange(currLineLargo - finalAlternadas, currLineLargo);
                        currLineAltUltCharsUnder = currLineAltUltChars.contents.toString();
                    }
                } catch (myError) {
                    currLineLargo = currLine.length - 1;
                    currLineAltUltChars = currLine.characters.itemByRange(currLineLargo - finalAlternadas, currLineLargo);
                    currLineAltUltCharsUnder = currLineAltUltChars.contents.toString();
                }
                try {
                    currLineSucUltChars = lastWord.characters.lastItem();
                    currLineSucUltCharsUnder = currLineSucUltChars.contents.toString();
                } catch (myError) {
                    currLineLargo = currLine.length - 1;
                    currLineSucUltChars = currLine.characters.lastItem();
                    currLineSucUltCharsUnder = currLineSucUltChars.contents.toString();
                }
            }
            if (prevLineSucUltCharsUnder == currLineSucUltCharsUnder) {
                if (prev2LineSucUltCharsUnder == currLineSucUltCharsUnder) {
                    if (prevLineSucUltCharsUnder != "") {
                        currLineSucUltChars.underline = true;
                        errorFinalSucesivas += 1;
                        //prevLine.insertionPoints[-1].contents = "\u200C";
                        //currLine.insertionPoints[-1].contents = "\u200C";
                    }
                }
            }
            if (prev2LineAltUltCharsUnder == currLineAltUltCharsUnder) {
                if (prev2LineAltUltCharsUnder != "") {
                    currLineAltUltChars.underline = true;
                    errorFinalAlternadas += 1;
                    //prev2Line.insertionPoints[-1].contents = "\u200C";
                    //currLine.insertionPoints[-1].contents = "\u200C";
                }
            }
            if (prevLineUltCharsUnder == currLineUltCharsUnder) {
                if (prevLineUltCharsUnder != "") {
                    currLineUltChars.underline = true;
                    errorFinalConsecutivas += 1;
                   // prevLine.insertionPoints[-1].contents = "\u200C";
                    //currLine.insertionPoints[-1].contents = "\u200C";
                }
            }
            // ACA HACE QUE LOS CARACTERES DE LA ULTIMA LÍNEA PASEN A SER LOS DE LA PENÚLTIMA, Y QUE LOS DE LA ACTUAL PASEN A SER LOS DE LA ÚLTIMA

            prevLineChars = currLineChars;
            prev2LineAltChars = prevLineAltChars;
            prevLineAltChars = currLineAltChars;
            prev2LineSucChars = prevLineSucChars;
            prevLineSucChars = currLineSucChars;
            prevLineUltChars = currLineUltChars;
            prev2LineAltUltChars = prevLineAltUltChars;
            prevLineAltUltChars = currLineAltUltChars;
            prev2LineSucUltChars = prevLineSucUltChars;
            prevLineSucUltChars = currLineSucUltChars;
        }
    }
}

function notas(principioNotasConsecutivas, principioNotasAlternadas, finalNotasConsecutivas, finalNotasAlternadas) {

    principioNotasConsecutivas -= 1;
    principioNotasAlternadas -= 1;
    finalNotasConsecutivas -= 1;
    finalNotasAlternadas -= 1;

    var errorNotasPrincipioConsecutivas = 0;
    var errorNotasPrincipioAlternadas = 0;
    var errorNotasPrincipioSucesivas = 0;
    var errorNotasFinalConsecutivas = 0;
    var errorNotasFinalAlternadas = 0;
    var errorNotasFinalSucesivas = 0;
    var errorNota = [];

    for (h = 0; h < notasPie.length; h++) {
        myNotaLines = notasPie[h].lines;
        if (myNotaLines.length < 2) {
            continue;
        }
        notasPie[h].texts[0].underlineColor = myColor;
        notasPie[h].texts[0].underlineWeight = 2;
        prev2Line = myNotaLines[0];
        prevLine = myNotaLines[1];

        prev2LineLargo = prev2Line.length - 1;
        prevLineLargo = prevLine.length - 1;

        try {
            prevLineChars = prevLine.characters.itemByRange(0, principioNotasConsecutivas);
        } catch (myError) {
            prevLineChars = {};
        }

        try {
            prevLineAltChars = prevLine.characters.itemByRange(0, principioNotasAlternadas);
        } catch (myError) {
            prevLineAltChars = {};
        }

        try {
            prev2LineAltChars = prev2Line.characters.itemByRange(0, principioNotasAlternadas);
        } catch (myError) {
            prev2LineAltChars = {};
        }

        try {
            prevLineSucChars = prevLine.characters.firstItem();
        } catch (myError) {
            prevLineSucChars = {};
        }

        try {
            prev2LineSucChars = prev2Line.characters.firstItem();
        } catch (myError) {
            prev2LineSucChars = {};
        }

        try {
            prevLineUltChars = prevLine.characters.itemByRange(prevLineLargo - finalNotasConsecutivas, prevLineLargo);
        } catch (myError) {
            prevLineUltChars = {};
        }

        try {
            prevLineAltUltChars = prevLine.characters.itemByRange(prevLineLargo - finalNotasAlternadas, prevLineLargo);
        } catch (myError) {
            prevLineAltUltChars = {};
        }

        try {
            prev2LineAltUltChars = prev2Line.characters.itemByRange(prev2LineLargo - finalNotasAlternadas, prev2LineLargo);
        } catch (myError) {
            prev2LineAltUltChars = {};
        }

        try {
            prevLineSucUltChars = prevLine.words.lastItem().characters.lastItem();
        } catch (myError) {
            prevLineSucUltChars = {};
        }

        try {
            prev2LineSucUltChars = prev2Line.words.lastItem().characters.lastItem();
        } catch (myError) {
            prev2LineSucUltChars = {};
        }

        for (i = 2; i < myNotaLines.length; i++) {
            currLine = myNotaLines[i];
            lastWord = currLine.words.lastItem();

            prevLineCharsUnder = prevLineChars.contents.toString();
            prevLineAltCharsUnder = prevLineAltChars.contents.toString();
            prev2LineAltCharsUnder = prev2LineAltChars.contents.toString();
            prevLineSucCharsUnder = prevLineSucChars.contents.toString();
            prev2LineSucCharsUnder = prev2LineSucChars.contents.toString();
            prevLineUltCharsUnder = prevLineUltChars.contents.toString();
            prevLineAltUltCharsUnder = prevLineAltUltChars.contents.toString();
            prev2LineAltUltCharsUnder = prev2LineAltUltChars.contents.toString();
            prevLineSucUltCharsUnder = prevLineSucUltChars.contents.toString();
            prev2LineSucUltCharsUnder = prev2LineSucUltChars.contents.toString();
        

            try {
                lineasUltimaPalabra = lastWord.lines.length;
            } catch (myError) {
                continue;
            }

            try {
                currLineChars = currLine.characters.itemByRange(0, principioNotasConsecutivas);
                currLineCharsUnder = currLineChars.contents.toString();
            } catch (myError) {
                currLineCharsUnder = "";
            }

            try {
                currLineAltChars = currLine.characters.itemByRange(0, principioNotasAlternadas);
                currLineAltCharsUnder = currLineAltChars.contents.toString();
            } catch (myError) {
                currLineAltCharsUnder = "";
            }

            try {
                currLineSucChars = currLine.characters.firstItem();
                currLineSucCharsUnder = currLineSucChars.contents.toString();
            } catch (myError) {
                currLineSucCharsUnder = "";
            }


            if (prev2LineSucCharsUnder == prevLineSucCharsUnder) {
                if (prevLineSucCharsUnder == currLineSucCharsUnder) {
                    currLineSucChars.underline = true;
                    errorNotasPrincipioSucesivas += 1;
                    errorNota.push(h + 1);
                    //prevLine.insertionPoints[0].contents = "\u200C";
                    //currLine.insertionPoints[0].contents = "\u200C";
                }
            }
            if (prev2LineAltCharsUnder == currLineAltCharsUnder) {
                currLineAltChars.underline = true;
                errorNotasPrincipioAlternadas += 1;
                errorNota.push(h + 1);
                //prevLine.insertionPoints[0].contents = "\u200C";
                //currLine.insertionPoints[0].contents = "\u200C";
            }

            if (prevLineCharsUnder == currLineCharsUnder) {
                currLineChars.underline = true;
                currLineChars.underlineTint = 100;
                errorNotasPrincipioConsecutivas += 1;
                errorNota.push(h + 1);
                //prevLine.insertionPoints[0].contents = "\u200C";
                //currLine.insertionPoints[0].contents = "\u200C";
            }

            // aca arranca lo de ultimas
            if (lastWord.lines.length > 1) {
                currLineLargo = currLine.length - 1;
                currLineUltChars = currLine.characters.itemByRange(currLineLargo - finalNotasConsecutivas, currLineLargo);
                currLineUltCharsUnder = currLineUltChars.contents.toString();
                currLineAltUltChars = currLine.characters.itemByRange(currLineLargo - finalNotasAlternadas, currLineLargo);
                currLineAltUltCharsUnder = currLineAltUltChars.contents.toString();
                currLineSucUltChars = currLine.characters.lastItem();
                currLineSucUltCharsUnder = currLineSucUltChars.contents.toString();
            } else {
                lastWordLargo = lastWord.length - 1;
                try {
                    currLineUltChars = lastWord.characters.itemByRange(lastWordLargo - finalNotasConsecutivas, lastWordLargo);
                    currLineUltCharsUnder = currLineUltChars.contents.toString();
                } catch (myError) {
                    currLineLargo = currLine.length - 1;
                    currLineUltChars = currLine.characters.itemByRange(currLineLargo - finalNotasConsecutivas, currLineLargo);
                    currLineUltCharsUnder = currLineUltChars.contents.toString();
                }
                try {
                    currLineAltUltChars = lastWord.characters.itemByRange(lastWordLargo - finalNotasAlternadas, lastWordLargo);
                    currLineAltUltCharsUnder = currLineAltUltChars.contents.toString();
                    if (lastWordLargo < 2) {
                        currLineAltUltChars = currLine.characters.itemByRange(currLineLargo - finalNotasAlternadas, currLineLargo);
                        currLineAltUltCharsUnder = currLineAltUltChars.contents.toString();
                    }
                } catch (myError) {
                    currLineLargo = currLine.length - 1;
                    currLineAltUltChars = currLine.characters.itemByRange(currLineLargo - finalNotasAlternadas, currLineLargo);
                    currLineAltUltCharsUnder = currLineAltUltChars.contents.toString();
                }
                try {
                    currLineSucUltChars = lastWord.characters.lastItem();
                    currLineSucUltCharsUnder = currLineSucUltChars.contents.toString();
                } catch (myError) {
                    currLineLargo = currLine.length - 1;
                    currLineSucUltChars = currLine.characters.lastItem();
                    currLineSucUltCharsUnder = currLineSucUltChars.contents.toString();
                }
            }
            if (prevLineSucUltCharsUnder == currLineSucUltCharsUnder) {
                if (prev2LineSucUltCharsUnder == currLineSucUltCharsUnder) {
                    currLineSucUltChars.underline = true;
                    errorNotasFinalSucesivas += 1;
                    errorNota.push(h + 1);
                    //prevLine.insertionPoints[-1].contents = "\u200C";
                    //currLine.insertionPoints[-1].contents = "\u200C";
                }
            }

            if (prev2LineAltUltCharsUnder == currLineAltUltCharsUnder) {
                currLineAltUltChars.underline = true;
                errorNotasFinalAlternadas += 1;
                errorNota.push(h + 1);
                //prev2Line.insertionPoints[-1].contents = "\u200C";
                //currLine.insertionPoints[-1].contents = "\u200C";
            }
            
            if (prevLineUltCharsUnder == currLineUltCharsUnder) {
                currLineUltChars.underline = true;
                errorNotasFinalConsecutivas += 1;
                errorNota.push(h + 1);
                //prevLine.insertionPoints[-1].contents = "\u200C";
                //currLine.insertionPoints[-1].contents = "\u200C";
            }


            // ACA HACE QUE LOS CARACTERES DE LA ULTIMA LÍNEA PASEN A SER LOS DE LA PENÚLTIMA, Y QUE LOS DE LA ACTUAL PASEN A SER LOS DE LA ÚLTIMA

            prevLineChars = currLineChars;
            prev2LineAltChars = prevLineAltChars;
            prevLineAltChars = currLineAltChars;
            prev2LineSucChars = prevLineSucChars;
            prevLineSucChars = currLineSucChars;
            prevLineUltChars = currLineUltChars;
            prev2LineAltUltChars = prevLineAltUltChars;
            prevLineAltUltChars = currLineAltUltChars;
            prev2LineSucUltChars = prevLineSucUltChars;
            prevLineSucUltChars = currLineSucUltChars;
        }
    }
}

function errores(errorPrincipioConsecutivas, errorPrincipioAlternadas, errorPrincipioSucesivas, errorFinalConsecutivas, errorFinalAlternadas, errorFinalSucesivas, errorNotasPrincipioConsecutivas, errorNotasPrincipioAlternadas, errorNotasPrincipioSucesivas, errorNotasFinalConsecutivas, errorNotasFinalAlternadas, errorNotasFinalSucesivas, errorNota) {

    try {
        errorPrincipioConsecutivas
    } catch (myError) {
        errorPrincipioConsecutivas = 0
    }
    try {
        errorPrincipioAlternadas
    } catch (myError) {
        errorPrincipioAlternadas = 0
    }
    try {
        errorPrincipioSucesivas
    } catch (myError) {
        errorPrincipioSucesivas = 0
    }
    try {
        errorFinalConsecutivas
    } catch (myError) {
        errorFinalConsecutivas = 0
    }
    try {
        errorFinalAlternadas
    } catch (myError) {
        errorFinalAlternadas = 0
    }
    try {
        errorFinalSucesivas
    } catch (myError) {
        errorFinalSucesivas = 0
    }
    try {
        errorNotasPrincipioConsecutivas
    } catch (myError) {
        errorNotasPrincipioConsecutivas = 0
    }
    try {
        errorNotasPrincipioAlternadas
    } catch (myError) {
        errorNotasPrincipioAlternadas = 0
    }
    try {
        errorNotasPrincipioSucesivas
    } catch (myError) {
        errorNotasPrincipioSucesivas = 0
    }
    try {
        errorNotasFinalConsecutivas
    } catch (myError) {
        errorNotasFinalConsecutivas = 0
    }
    try {
        errorNotasFinalAlternadas
    } catch (myError) {
        errorNotasFinalAlternadas = 0
    }
    try {
        errorNotasFinalSucesivas
    } catch (myError) {
        errorNotasFinalSucesivas = 0
    }
    try {
        errorNota
    } catch (myError) {
        errorNota = [];
    }

    erroresTotales = errorPrincipioConsecutivas + errorPrincipioAlternadas + errorPrincipioSucesivas + errorFinalConsecutivas + errorFinalAlternadas + errorFinalSucesivas + errorNotasPrincipioConsecutivas + errorNotasPrincipioAlternadas + errorNotasPrincipioSucesivas + errorNotasFinalConsecutivas + errorNotasFinalAlternadas + errorNotasFinalSucesivas;
    erroresTotalesFuncion = (erroresTotales * 10) % 60;

    stringAlert = "Problemas totales: " + erroresTotales.toString() + "\r";
    stringAlert += "Tiempo estimado: " + Math.floor(erroresTotales / 60).toString() + " minutos " + erroresTotalesFuncion + " segundos.\r"

    if (errorPrincipioConsecutivas > 0) {
        stringAlert += "\rPrincipio Consecutivas: ";
        stringAlert += errorPrincipioConsecutivas.toString();
    }
    if (errorPrincipioAlternadas > 0) {
        stringAlert += "\rPrincipio Alternadas: ";
        stringAlert += errorPrincipioAlternadas.toString();
    }
    if (errorPrincipioSucesivas > 0) {
        stringAlert += "\rPrincipio Sucesivas: ";
        stringAlert += errorPrincipioSucesivas.toString();
    }
    if (errorFinalConsecutivas > 0) {
        stringAlert += "\rFinal Consecutivas: ";
        stringAlert += errorFinalConsecutivas.toString();
    }
    if (errorFinalAlternadas > 0) {
        stringAlert += "\rFinal Alternadas: ";
        stringAlert += errorFinalAlternadas.toString();
    }
    if (errorFinalSucesivas > 0) {
        stringAlert += "\rFinal Sucesivas: ";
        stringAlert += errorFinalSucesivas.toString();
    }
    if (errorNotasPrincipioConsecutivas > 0) {
        stringAlert += "\rNotas - Principio Consecutivas: ";
        stringAlert += errorNotasPrincipioConsecutivas.toString();
    }
    if (errorNotasPrincipioAlternadas > 0) {
        stringAlert += "\rNotas - Principio Alternadas: ";
        stringAlert += errorNotasPrincipioAlternadas.toString();
    }
    if (errorNotasPrincipioSucesivas > 0) {
        stringAlert += "\rNotas - Principio Sucesivas: ";
        stringAlert += errorNotasPrincipioSucesivas.toString();
    }
    if (errorNotasFinalConsecutivas > 0) {
        stringAlert += "\rNotas - Final Consecutivas: ";
        stringAlert += errorNotasFinalConsecutivas.toString();
    }
    if (errorNotasFinalAlternadas > 0) {
        stringAlert += "\rNotas - Final Alternadas: ";
        stringAlert += errorNotasFinalAlternadas.toString();
    }
    if (errorNotasFinalSucesivas > 0) {
        stringAlert += "\rNotas - Final Sucesivas: ";
        stringAlert += errorNotasFinalSucesivas.toString();
    }
    if (errorNota.length > 0) {
        stringAlert += "\rProblemas en notas: ";
        stringAlert += errorNota.toString();
    }

    end = Date.now();
    elapsed = end - start;
    stringAlert += "\r\rTiempo utilizado: " + Math.round(Math.round(elapsed / 1000) / 60) + " minutos, " + Math.round(elapsed / 1000) % 60 + " segundos."

    alert(stringAlert);
}