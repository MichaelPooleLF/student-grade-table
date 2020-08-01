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
    this.deleteGrade = this.deleteGrade.bind(this);
    this.handleDeleteGradeError = this.handleDeleteGradeError.bind(this);
    this.handleDeleteGradeSuccess = this.handleDeleteGradeSuccess.bind(this);
    this.updateForm = this.updateForm.bind(this);
    this.handleUpdateFormError = this.handleUpdateFormError.bind(this);
    this.handleUpdateFormSuccess = this.handleUpdateFormSuccess.bind(this);
    this.updateGrade = this.updateGrade.bind(this);
    this.handleUpdateGradeError = this.handleUpdateGradeError.bind(this);
    this.handleUpdateGradeSuccess = this.handleUpdateGradeSuccess.bind(this);
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

  handleGetGradesError(error) {
    console.error(error);
  }

  handleGetGradesSuccess(grades) {
    var sumGrades = 0;
    var numberGrades = grades.length;
    for (var i = 0; i < numberGrades; i++) {
      sumGrades += grades[i].grade;
    }
    var averageGrade = Math.round(sumGrades / numberGrades);

    this.pageHeader.updateAverage(averageGrade);
    this.gradeTable.updateGrades(grades);
  }

  start() {
    this.getGrades();
    this.gradeForm.onSubmit(this.createGrade, this.updateGrade);
    this.createGrade;
    this.gradeTable.onDeleteClick(this.deleteGrade);
    this.gradeTable.onUpdateClick(this.updateForm);
  }

  createGrade(name, course, grade) {
    $.ajax({
      method: "POST",
      url: "https://sgt.lfzprototypes.com/api/grades",
      data: {
        name: name,
        course: course,
        grade: grade
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

  deleteGrade(id) {
    $.ajax({
      method: "DELETE",
      url: "https://sgt.lfzprototypes.com/api/grades/" + id,
      headers: {
        "X-Access-Token": "HsY3ia5l"
      },
      error: this.handleDeleteGradeError,
      success: this.handleDeleteGradeSuccess
    })
  }

  handleDeleteGradeError(error) {
    console.log(error);
  }

  handleDeleteGradeSuccess() {
    this.gradeForm.formTitle.text("Add Grade");
    this.gradeForm.submitButton.text("Add");
    this.getGrades();
  }

  updateForm(id, name, course, grade) {
    $.ajax({
      method: "GET",
      url: "https://sgt.lfzprototypes.com/api/grades",
      headers: {
        "X-Access-Token": "HsY3ia5l"
      },
      error: this.handleUpdateFormError,
      success: this.handleUpdateFormSuccess(id, name, course, grade)
    })
  }

  handleUpdateFormError(error) {
    console.log(error);
  }

  handleUpdateFormSuccess(id, name, course, grade) {
    this.gradeForm.formTitle.text("Update Grade");
    this.gradeForm.studentName.val(name);
    this.gradeForm.courseName.val(course);
    this.gradeForm.studentGrade.val(grade);
    this.gradeForm.submitButton.text("Update");
    this.gradeForm.updateId = id;
  }

  updateGrade(id, name, course, grade) {
    $.ajax({
      method: "PATCH",
      url: "https://sgt.lfzprototypes.com/api/grades/" + id,
      data: {
        name: name,
        course: course,
        grade: grade
      },
      headers: {
        "X-Access-Token": "HsY3ia5l"
      },
      error: this.handleUpdateGradeError,
      success: this.handleUpdateGradeSuccess
    })
  }

  handleUpdateGradeError(error) {
    console.log(error);
  }

  handleUpdateGradeSuccess() {
    this.getGrades();
  }
}
