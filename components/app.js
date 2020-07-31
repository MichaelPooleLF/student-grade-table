class App {
  constructor(gradeTable, pageHeader) {
    this.pageHeader = pageHeader;
    this.gradeTable = gradeTable;
    this.handleGetGradesError = this.handleGetGradesError.bind(this);
    this.handleGetGradesSuccess = this.handleGetGradesSuccess.bind(this);
  }

  handleGetGradesError(error) {
    console.error(error);
  }

  handleGetGradesSuccess(grades) {
    var sumGrades = 0;
    var numberGrades = grades.length;
    for (var i = 0; i < numberGrades; i++) {
      sumGrades += grades[i].grade;
    }
    var averageGrade = sumGrades / numberGrades;

    this.pageHeader.updateAverage(averageGrade);
    this.gradeTable.updateGrades(grades);
  }

  getGrades() {
    $.ajax({
      method: "GET",
      url: "https://sgt.lfzprototypes.com/api/grades",
      headers: {
        "X-Access-Token": "HsY3ia5l"
      },
      error: this.handleGetGradesError,
      success: this.handleGetGradesSuccess,
    });
  }

  start() {
    this.getGrades();
  }
}
