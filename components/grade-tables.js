class GradeTable {
  constructor(tableElement, noGradesElement) {
    this.tableElement = tableElement;
    this.noGradesElement = noGradesElement;
  }

  updateGrades(grades) {
    if(!grades) {
      this.noGradesElement.toggleClass("d-none");
      return;
    }
    var $tableBody = $("tbody");
    $tableBody.empty();
    for (var i = 0; i < grades.length; i++) {
      // var $tableRow = $("<tr>");
      // var $studentName = $("<td>", {text: grades[i].name});
      // var $courseName = $("<td>", {text: grades[i].course});
      // var $studentGrade = $("<td>", {text: grades[i].grade});
      $tableBody.append(this.renderGradeRow(grades[i], this.deleteGrade));
      // $tableBody.append($tableRow.append($studentName, $courseName, $studentGrade));
    }
  }

  onDeleteClick(deleteGrade) {
    this.deleteGrade = deleteGrade;
  }

  renderGradeRow(data, deleteGrade) {
    var $tableRow = $("<tr>");
    var $studentName = $("<td>", { text: data.name });
    var $courseName = $("<td>", { text: data.course });
    var $studentGrade = $("<td>", { text: data.grade });
    var $deleteWrapper = $("<td>", { class:"text-center" });
    var $deleteButton = $("<button>", { text:"DELETE", class:"btn btn-danger ml-1" });
    $deleteButton.on("click", function(){deleteGrade(data.id);});

    $tableRow.append($studentName, $courseName, $studentGrade, $deleteWrapper.append($deleteButton));
    return $tableRow;
  }
}
