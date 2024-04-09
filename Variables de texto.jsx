// Se le puede agregar un check donde poner si hacen falta logos, y que cree una advertencia visible


var doc = app.activeDocument;
var ingresoTitulo;
var ingresoSubtitulo;
var ingresoISBN;
var ingresoDeposito;
var ingresoAutor;
var ingresoTraductor;
var ingresoCorrector;
var ingresoMaquetador;

init();

function init() {

  dialog();

    try {
      varTitulo = doc.textVariables.itemByName("Titulo");
    } catch (myError) {
      varTitulo = doc.textVariables.add({name:"Titulo", variableType:VariableTypes.CUSTOM_TEXT_TYPE, text:ingresoTitulo});
    }
    varTitulo.variableOptions.contents = ingresoTitulo;

    try {
      varSubtitulo = doc.textVariables.itemByName("Subtitulo");
    } catch (myError) {
      varSubtitulo = doc.textVariables.add({name:"Subtitulo", variableType:VariableTypes.CUSTOM_TEXT_TYPE, text:ingresoSubtitulo});
    }
    varSubtitulo.variableOptions.contents = ingresoSubtitulo;

    try {
      varISBN = doc.textVariables.itemByName("ISBN");
    } catch (myError) {
      varISBN = doc.textVariables.add({name:"ISBN", variableType:VariableTypes.CUSTOM_TEXT_TYPE, text:ingresoISBN});
    }
    varISBN.variableOptions.contents = ingresoISBN;

    try {
      varDeposito = doc.textVariables.itemByName("Deposito");
    } catch (myError) {
      varDeposito = doc.textVariables.add({name:"Deposito", variableType:VariableTypes.CUSTOM_TEXT_TYPE, text:ingresoDeposito});
    }
    varDeposito.variableOptions.contents = ingresoDeposito;

    try {
      varAutor = doc.textVariables.itemByName("Autor");
    } catch (myError) {
      varAutor = doc.textVariables.add({name:"Autor", variableType:VariableTypes.CUSTOM_TEXT_TYPE, text:ingresoAutor});
    }
    varAutor.variableOptions.contents = ingresoAutor;

    try {
      varTraductor = doc.textVariables.itemByName("Traductor");
    } catch (myError) {
      varTraductor = doc.textVariables.add({name:"Traductor", variableType:VariableTypes.CUSTOM_TEXT_TYPE, text:ingresoTraductor});
    }
    varTraductor.variableOptions.contents = ingresoTraductor;

    try {
      varCorrector = doc.textVariables.itemByName("Corrector");
    } catch (myError) {
      varCorrector = doc.textVariables.add({name:"Corrector", variableType:VariableTypes.CUSTOM_TEXT_TYPE, text:ingresoCorrector});
    }
    varCorrector.variableOptions.contents = ingresoCorrector;

    try {
      varMaquetador = doc.textVariables.itemByName("Maquetador");
    } catch (myError) {
      varMaquetador = doc.textVariables.add({name:"Maquetador", variableType:VariableTypes.CUSTOM_TEXT_TYPE, text:ingresoMaquetador});
    }
    varMaquetador.variableOptions.contents = ingresoMaquetador;




}

function dialog() {

  var dlg = new Window("dialog", "Aplicar paginas maestras.jsx");
  dlg.orientation = "column";

  var labelTitulo = dlg.add( "statictext", [0, 0, 200, 10], "Titulo:");
  var textTitulo = dlg.add( "edittext", [0, 0, 200, 20], doc.textVariables.itemByName("Titulo").variableOptions.contents);

  var labelSubtitulo = dlg.add( "statictext", undefined, "Subtitulo:");
  var textSubtitulo = dlg.add( "edittext", [0, 0, 200, 20], doc.textVariables.itemByName("Subtitulo").variableOptions.contents);

  var labelISBN = dlg.add( "statictext", undefined, "ISBN:");
  var textISBN = dlg.add( "edittext", [0, 0, 200, 20], doc.textVariables.itemByName("ISBN").variableOptions.contents);

  var labelDeposito = dlg.add( "statictext", undefined, "Deposito:");
  var textDeposito = dlg.add( "edittext", [0, 0, 200, 20], doc.textVariables.itemByName("Deposito").variableOptions.contents);

  var labelAutor = dlg.add( "statictext", undefined, "Autor:");
  var textAutor = dlg.add( "edittext", [0, 0, 200, 20], doc.textVariables.itemByName("Autor").variableOptions.contents);

  var labelTraductor = dlg.add( "statictext", undefined, "Traductor:");
  var textTraductor = dlg.add( "edittext", [0, 0, 200, 20], doc.textVariables.itemByName("Traductor").variableOptions.contents);

  var labelCorrector = dlg.add( "statictext", undefined, "Corrector:");
  var textCorrector = dlg.add( "edittext", [0, 0, 200, 20], doc.textVariables.itemByName("Corrector").variableOptions.contents);

  var labelMaquetador = dlg.add( "statictext", undefined, "Maquetador:");
  var textMaquetador = dlg.add( "edittext", [0, 0, 200, 20], doc.textVariables.itemByName("Maquetador").variableOptions.contents);

  var buttons = dlg.add("group")
  var btn_ok = buttons.add("button", undefined, "Ok");
  var btn_cancel = buttons.add("button", undefined, "Cancelar");

  btn_ok.onClick = function() {
    ingresoTitulo = textTitulo.text;
    ingresoSubtitulo = textSubtitulo.text;
    ingresoISBN = textISBN.text;
    ingresoDeposito = textDeposito.text;
    ingresoAutor = textAutor.text;
    ingresoTraductor = textTraductor.text;
    ingresoCorrector = textCorrector.text;
    ingresoMaquetador = textMaquetador.text;
    dlg.close();
  }
  btn_cancel.onClick = function() {
    dlg.close();
  }

  dlg.show();

}