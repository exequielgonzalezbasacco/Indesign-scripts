// Script to apply a selected paragraph style after another ocurrence of another paragraph style
var doc = app.activeDocument;
var firstStyle;
var secondStyle;
var scriptBool;

function init() {

  getStyles(doc);

  if (scriptBool !== false) {

    // Iterate through the paragraphs
    for (var i = 0; i < doc.stories.length; i++) {
      var paragraphs = doc.stories[i].paragraphs;
      for (var j = 0; j < paragraphs.length; j++) {
        var currentParagraph = paragraphs[j];
        var nextParagraph = paragraphs[j + 1];

        if (currentParagraph.appliedParagraphStyle.name == firstStyle) {
          nextParagraph.appliedParagraphStyle = doc.paragraphStyles.itemByName(secondStyle);
        }
      }
    }
  }
}

// Iterate through the paragraph styles in the document and load an array 
function getStyles(doc) {
  var docStyles = doc.paragraphStyles.everyItem().name;
  var stylesArray = ["[None]"];

  for (var i = 0; i < docStyles.length; i++) {
    stylesArray.push(docStyles[i]);
  }

  showDialog(stylesArray);
}

// Show a dialog to let the user select the two paragraph styles
function showDialog(stylesArray) {

  var dlg = new Window("dialog", "Apply style after another");
  dlg.orientation = "column";
  dlg.alignChildren = "left";
  dlg.add ("statictext", undefined, "First style:");

  // Fill both dropdown elements with the array of paragraph styles
  var dropdownFirstStyle = dlg.add("dropdownlist", undefined, stylesArray);
  dropdownFirstStyle.selection = 3;

  dlg.add ("statictext", undefined, "Apply style to next paragraph:");
  var dropdownSecondStyle = dlg.add("dropdownlist", undefined, stylesArray);
  dropdownSecondStyle.selection = 4;

  var buttons = dlg.add("group")
  var btn_ok = buttons.add("button", undefined, "OK");
  var btn_cancel = buttons.add("button", undefined, "Cancel");

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