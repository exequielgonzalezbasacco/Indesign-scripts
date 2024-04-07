// appliedMaster 

// Primero que se fije cuales son las páginas maestras, que me las nombre en un alert
// Aplicador de C
// Ver los estilos de párrafo - Cuando este título que aplique "C"

// Ver los márgenes
// Ver que este vacio entre los márgenes

var estiloCapitulo;
var master;

var doc = app.activeDocument;

if (app.documents.length > 0) init();

function init() {
var paginas = app.selection[0].parentStory.textContainers;
  var estilos = getParagraphStyles(doc);
  var masters = getMasters(doc);
  dialog(estilos, masters);
  if (master !== false) {
    alert(master);
    alert(estiloCapitulo);

    for (i = 0; i < paginas.length; i++) {

      // Chequeo de capítulo
      var paginaActual = paginas[i];
      var parrafos = paginaActual.paragraphs;

      if (paginaActual.contents == "") {
        // Chequeo de página en blanco
        paginaActual.parentPage.appliedMaster = NothingEnum.NOTHING;
      } else {
        // Chequeo de inicio de capítulo
        for (j = 0; j < parrafos.length; j++) {
          if (parrafos[j].appliedParagraphStyle == doc.paragraphStyles.itemByName(estiloCapitulo)) {
            paginaActual.parentPage.appliedMaster = doc.masterSpreads.itemByName(master);
          }
          continue;
        }
      }
    }
  }
}

function getParagraphStyles(doc) {

  var allStyles = doc.paragraphStyles.everyItem().name;
  var estilos = ["[None]"];

  for (var i = 0; i < allStyles.length; i++) {
    estilos.push(allStyles[i]);
  }

  return estilos;

}

function getMasters(doc) {
	
	var everyMaster = doc.masterSpreads.everyItem().name;
	var masters = ["[None]"];
	
	for (var i = 0; i < everyMaster.length; i++) {
		masters.push(everyMaster[i]);
	}
	
	return masters;
	
}



function dialog(estilos, masters) {

  var dlg = new Window("dialog", "Aplicar paginas maestras.jsx");
  dlg.orientation = "row";

  var dropdownEstilos = dlg.add("dropdownlist", undefined, estilos);
  dropdownEstilos.selection = 2;

  var dropdownMasters = dlg.add("dropdownlist", undefined, masters);
  dropdownMasters.selection = 2;

  var buttons = dlg.add("group")
  var btn_ok = buttons.add("button", undefined, "Aplicar páginas maestras");
  var btn_cancel = buttons.add("button", undefined, "Cancelar");

  btn_ok.onClick = function() {
    master = dropdownMasters.selection.toString();
    estiloCapitulo = dropdownEstilos.selection.toString();
    dlg.close();
  }
  btn_cancel.onClick = function() {
    master = false;
    dlg.close();
  }

  dlg.show();

}