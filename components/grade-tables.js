class GradeTable {
  constructor(tableElement) {
    this.tableElement = tableElement;
  }

  updateGrades(grades) {
    console.log(grades);
    var $tableBody = $("tbody");
    $tableBody.empty();
    for (var i = 0; i < grades.length; i++) {
      var $tableRow = $("<tr>");
      var $studentName = $("<td>", {text: grades[i].name});
      var $courseName = $("<td>", {text: grades[i].course});
      var $studentGrade = $("<td>", {text: grades[i].grade});

      $tableBody.append($tableRow.append($studentName, $courseName, $studentGrade));
    }
  }
}
