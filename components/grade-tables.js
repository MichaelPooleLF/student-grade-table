class GradeTable {
  constructor(tableElement, noGradesElement) {
    this.tableElement = tableElement;
    this.noGradesElement = noGradesElement;
  }

  updateGrades(grades) {
    var $tableBody = $("tbody");
    $tableBody.empty();

    if(!grades[0]) {
      this.noGradesElement.removeClass("d-none");
      return;
    } else {
      this.noGradesElement.addClass("d-none")
    }

    for (var i = 0; i < grades.length; i++) {
      $tableBody.append(this.renderGradeRow(grades[i], this.deleteGrade));
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
