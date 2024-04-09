         
// Que no tenga en cuenta la puntuación también
// Optimizar tiempos

app.selection[0].paragraphs[0].underline = false;

    var lineas = app.selection[0].paragraphs[0].lines;
    var primeraLinea = lineas[0];
    var segundaLinea = lineas[1];
    var primeraLineaPrimero = primeraLinea.characters.itemByRange(0, 0);
    var segundaLineaPrimero = segundaLinea.characters.itemByRange(0, 0);
    var primeraLineaInicio = primeraLinea.characters.itemByRange(0, 1);
    var segundaLineaInicio = segundaLinea.characters.itemByRange(0, 1);
    var primeraLineaFin = primeraLinea.characters.itemByRange(-2,-1);

    if (primeraLinea.words.lastItem().lines.length > 1){
        var primeraLineaFin = primeraLinea.characters.itemByRange(-2,-1);
        var primeraLineaUltimo = primeraLinea.characters.itemByRange(-1,-1);
    } else {
        var primeraLineaFin = primeraLinea.characters.itemByRange(-3,-2);
        var primeraLineaUltimo = primeraLinea.characters.itemByRange(-2,-2);
    }

    if (segundaLinea.words.lastItem().lines.length > 1){
        var segundaLineaFin = segundaLinea.characters.itemByRange(-2,-1);
        var segundaLineaUltimo = primeraLinea.characters.itemByRange(-1,-1);
    } else {
        var segundaLineaFin = segundaLinea.characters.itemByRange(-3,-2);
        var segundaLineaUltimo = primeraLinea.characters.itemByRange(-2,-2);
    }

    if (primeraLineaInicio.contents.toString() == segundaLineaInicio.contents.toString()){
        segundaLineaInicio.underline = true;
    }
    if (primeraLineaFin.contents.toString() == segundaLineaFin.contents.toString()){
        segundaLineaFin.underline = true;
    }

    var antepasadaInicio = primeraLineaInicio;
    var pasadaInicio = segundaLineaInicio;
    var antepasadaFin = primeraLineaFin;
    var pasadaFin = segundaLineaFin;
    var antepasadaPrimero = primeraLineaPrimero;
    var pasadaPrimero = segundaLineaPrimero;
    var antepasadaUltimo = primeraLineaUltimo;
    var pasadaUltimo = segundaLineaUltimo;

    for (i = 2; i < lineas.length; i++) {
        var lineaActual = lineas[i];
        var actualInicio = lineaActual.characters.itemByRange(0, 1);
        var actualFin = "";
        var actualPrimero = lineaActual.characters.itemByRange(0, 0);
        var actualUltimo = "";
        var palabraFinal = lineaActual.words.lastItem();

        if (palabraFinal.lines.length > 1) {
            actualUltimo = lineaActual.characters.itemByRange(-1,-1);
            actualFin = lineaActual.characters.itemByRange(-2,-1);
        } else {
            actualUltimo = lineaActual.characters.itemByRange(-2,-2);
            actualFin = lineaActual.characters.itemByRange(-3,-2);
        }

        //consecutivas
        if (actualInicio.contents.toString() == pasadaInicio.contents.toString()){
            actualInicio.underline = true;
        }
        if (actualFin.contents.toString() == pasadaFin.contents.toString()){
            actualFin.underline = true;
        }

        //alternadas
        if (actualInicio.contents.toString() == antepasadaInicio.contents.toString()){
            actualInicio.underline = true;
        }
        if (actualFin.contents.toString() == antepasadaFin.contents.toString()){
            actualFin.underline = true;
        }

        //sucesivas
        if (actualPrimero.contents.toString() == antepasadaPrimero.contents.toString()){
            if (actualPrimero.contents.toString() == pasadaPrimero.contents.toString()){
                actualPrimero.underline = true;
            }
        }
        if (actualUltimo.contents.toString() == antepasadaUltimo.contents.toString()){
            if (actualUltimo.contents.toString() == pasadaUltimo.contents.toString()){
                actualUltimo.underline = true;
            }
        }

        antepasadaInicio = pasadaInicio;
        antepasadaFin = pasadaFin;
        pasadaInicio = actualInicio;
        pasadaFin = actualFin;
        antepasadaPrimero = pasadaPrimero;
        antepasadaUltimo = pasadaUltimo;
        pasadaPrimero = actualPrimero;
        pasadaUltimo = actualUltimo;
    }



