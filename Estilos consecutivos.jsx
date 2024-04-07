// Function to apply "Cita cuerpo continuacion" style to appropriate paragraphs
var doc = app.activeDocument;
var firstStyle;
var secondStyle;
var scriptBool;

function init() {
    if (scriptBool !== false) {

    // Iterate through the paragraphs
    for (var i = 1; i < doc.stories.length; i++) {
        var paragraphs = doc.stories[i].paragraphs;

        for (var j = 1; j < paragraphs.length; j++) {
            var currentParagraph = paragraphs[j];
            var prevParagraph = paragraphs[j - 1];

            if (currentParagraph.name == firstStyle) {
                if (prevParagraph.name == firstStyle) {
                    currentParagraph.appliedParagraphStyle = doc.paragraphStyles.itemByName(secondStyle);
                }
            }
        }
    }
}

function getFirstStyle(doc) {
  var styles = doc.paragraphStyles.everyItem().name;
  var stylesArray = ["[None]"];

  for (var i = 0; i < allStyles.length; i++) {
    stylesArray.push(styles[i]);
  }

  return stylesArray;
}

function dialog(estilos, masters) {

  var dlg = new Window("dialog", "Aplicar paginas maestras.jsx");
  dlg.orientation = "row";

  var dropdownFirstStyle = dlg.add("dropdownlist", undefined, stylesArray);
  dropdownFirstStyle.selection = 2;

  var dropdownSecondStyle = dlg.add("dropdownlist", undefined, stylesArray);
  dropdownSecondStyle.selection = 2;

  var buttons = dlg.add("group")
  var btn_ok = buttons.add("button", undefined, "Aplicar estilos consecutivos");
  var btn_cancel = buttons.add("button", undefined, "Cancelar");

  btn_ok.onClick = function() {
    scriptBool = true;
    firstStyle = dropdownFirstStyle.selection.toString();
    secondStyle = dropdownSecondStyle.selection.toString();
    dlg.close();
  }
  btn_cancel.onClick = function() {
    scriptBool = false;
    dlg.close();
  }

  dlg.show();
}

// Run the function
init();