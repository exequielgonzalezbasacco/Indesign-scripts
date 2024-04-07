// Script to apply footnote styles according to the number of digits in the respective footnote
var doc = app.activeDocument;
var oneDigitFirstStyleName;
var oneDigitNextStyleName;
var twoDigitFirstStyleName;
var twoDigitNextStyleName;
var threeDigitFirstStyleName;
var threeDigitNextStyleName;

function init() {

  getStyles(doc);
  var oneDigitFirstStyle = doc.paragraphStyles.itemByName(oneDigitFirstStyleName);
  var twoDigitFirstStyle = doc.paragraphStyles.itemByName(twoDigitFirstStyleName);
  var threeDigitFirstStyle = doc.paragraphStyles.itemByName(threeDigitFirstStyleName);
  var oneDigitNextStyle = doc.paragraphStyles.itemByName(oneDigitNextStyleName);
  var twoDigitNextStyle = doc.paragraphStyles.itemByName(twoDigitNextStyleName);
  var threeDigitNextStyle = doc.paragraphStyles.itemByName(threeDigitNextStyleName);


  if (scriptBool !== false) {

    // Iterate through the footnotes
    for (var i = 0; i < doc.stories.length; i++) {
      var footnotes = doc.stories[i].footnotes;
      for (var j = 0; j < footnotes.length; j++) {
        var currentFootnote = footnotes[j];
        var paragraphs = currentFootnote.paragraphs;

        if (j > 98){
          paragraphs.everyItem().appliedParagraphStyle = threeDigitNextStyle;
          paragraphs[0].appliedParagraphStyle = threeDigitFirstStyle;
        } else if (j > 8) {
          paragraphs.everyItem().appliedParagraphStyle = twoDigitNextStyle;
          paragraphs[0].appliedParagraphStyle = twoDigitFirstStyle;
        } else {
          paragraphs.everyItem().appliedParagraphStyle = oneDigitNextStyle;
          paragraphs[0].appliedParagraphStyle = oneDigitFirstStyle;
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

  var dlg = new Window("dialog", "Apply footnote styles");
  dlg.orientation = "column";
  dlg.alignChildren = "left";

  // Fill dropdown elements with the array of paragraph styles
  var onePanel = dlg.add ("panel", undefined, "One Digit")
  onePanel.orientation = "row"

  onePanel.add ("statictext", undefined, "First style:");
  var dropdownOneDigitFirstStyle = onePanel.add("dropdownlist", undefined, stylesArray);
  dropdownOneDigitFirstStyle.selection = 3;
  
  onePanel.add ("statictext", undefined, "Next styles:");
  var dropdownOneDigitNextStyle = onePanel.add("dropdownlist", undefined, stylesArray);
  dropdownOneDigitNextStyle.selection = 3;

  var twoPanel = dlg.add ("panel", undefined, "Second Digit")
  twoPanel.orientation = "row"

  twoPanel.add ("statictext", undefined, "First style:");
  var dropdownTwoDigitFirstStyle = twoPanel.add("dropdownlist", undefined, stylesArray);
  dropdownTwoDigitFirstStyle.selection = 3;
  
  twoPanel.add ("statictext", undefined, "Next styles:");
  var dropdownTwoDigitNextStyle = twoPanel.add("dropdownlist", undefined, stylesArray);
  dropdownTwoDigitNextStyle.selection = 3;

  var threePanel = dlg.add ("panel", undefined, "Three Digits")
  threePanel.orientation = "row"

  threePanel.add ("statictext", undefined, "First style:");
  var dropdownThreeDigitFirstStyle = threePanel.add("dropdownlist", undefined, stylesArray);
  dropdownThreeDigitFirstStyle.selection = 3;
  
  threePanel.add ("statictext", undefined, "Next styles:");
  var dropdownThreeDigitNextStyle = threePanel.add("dropdownlist", undefined, stylesArray);
  dropdownThreeDigitNextStyle.selection = 3;

  dlg.alignChildren = "right";
  var buttons = dlg.add("group")
  var btn_ok = buttons.add("button", undefined, "OK");
  var btn_cancel = buttons.add("button", undefined, "Cancel");

  btn_ok.onClick = function() {
    scriptBool = true;
    oneDigitFirstStyleName = dropdownOneDigitFirstStyle.selection.toString();
    oneDigitNextStyleName = dropdownOneDigitNextStyle.selection.toString();
    twoDigitFirstStyleName = dropdownTwoDigitFirstStyle.selection.toString();
    twoDigitNextStyleName = dropdownTwoDigitNextStyle.selection.toString();
    threeDigitFirstStyleName = dropdownThreeDigitFirstStyle.selection.toString();
    threeDigitNextStyleName = dropdownThreeDigitNextStyle.selection.toString();
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