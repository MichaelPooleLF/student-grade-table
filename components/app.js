class App {
  constructor(gradeTable, pageHeader, gradeForm) {
    this.gradeTable = gradeTable;
    this.pageHeader = pageHeader;
    this.gradeForm = gradeForm;
    this.handleGetGradesError = this.handleGetGradesError.bind(this);
    this.handleGetGradesSuccess = this.handleGetGradesSuccess.bind(this);
    this.createGrade = this.createGrade.bind(this);
    this.handleCreateGradeError = this.handleCreateGradeError.bind(this);
    this.handleCreateGradeSuccess = this.handleCreateGradeSuccess.bind(this);
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
      success: this.handleGetGradesSuccess
    });
  }

  start() {
    this.getGrades();
    this.gradeForm.onSubmit(this.createGrade);
    this.createGrade
  }

  createGrade(name, course, grade) {
    $.ajax({
      method: "POST",
      url: "https://sgt.lfzprototypes.com/api/grades",
      data: {
        name: name,
        course: course,
        grade: grade,
      },
      headers: {
        "X-Access-Token": "HsY3ia5l"
      },
      error: this.handleCreateGradeError,
      success: this.handleCreateGradeSuccess
    })
  }

  handleCreateGradeError(error) {
    console.error(error);
  }

  handleCreateGradeSuccess() {
    this.getGrades();
  }
}
