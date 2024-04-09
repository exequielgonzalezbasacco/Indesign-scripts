/*

*/
function main(){
  var parrafosDocumento = app.selection[0].parentStory.paragraphs;
  for (i = 0; i < parrafosDocumento.length; i++){
    var numeroLineas = parrafosDocumento[i].lines.length;
    if (numeroLineas > 1) {
        lineasLadronas(parrafosDocumento[i], numeroLineas-1);
    }
  }
}

function lineasLadronas(parrafoActual, indice){
    if (parrafoActual.lines[indice].length < 20){
        parrafoActual.lines[indice].underline = true;
    }
}

main();