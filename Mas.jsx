var currentParagraph = app.selection[0].paragraphs[0];

if (currentParagraph.tracking < 16) {

  // Calcula el objetivo de línea
  var targetLineCount = currentParagraph.lines.length + 1;

  // Ajusta el tracking hasta que alcance el objetivo de línea
  while (currentParagraph.lines.length < targetLineCount) {
    currentParagraph.tracking += 1;
  }
} else {
  currentParagraph.tracking = 0;
}