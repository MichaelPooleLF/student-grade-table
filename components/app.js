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
      sumGrades += parseInt(grades[i].grade);
    }
    var averageGrade = Math.round(sumGrades / numberGrades);

    this.pageHeader.updateAverage(averageGrade);
    this.gradeTable.updateGrades(grades);
    this.cachedGrades = grades;
  }

  start() {
    this.getGrades();
    this.gradeForm.onSubmit(this.createGrade, this.updateGrade);
    this.createGrade;
    this.gradeTable.onDeleteClick(this.deleteGrade);
    this.gradeTable.onUpdateClick(this.handleUpdateFormSuccess);
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

  handleCreateGradeSuccess(newGrade) {
    this.cachedGrades.push(newGrade);
    this.handleGetGradesSuccess(this.cachedGrades);
  }

  deleteGrade(id) {
    $.ajax({
      method: "DELETE",
      url: "https://sgt.lfzprototypes.com/api/grades/" + id,
      headers: {
        "X-Access-Token": "HsY3ia5l"
      },
      error: this.handleDeleteGradeError,
      success: this.handleDeleteGradeSuccess(id)
    })
  }

  handleDeleteGradeError(error) {
    console.log(error);
  }

  handleDeleteGradeSuccess(idToDelete) {
    this.gradeForm.formTitle.text("Add Grade");
    this.gradeForm.submitButton.text("Add");
    for (var i = 0; i < this.cachedGrades.length; i++) {
      if (this.cachedGrades[i].id === idToDelete) {
        this.cachedGrades.splice(i, 1);
      }
    }
    this.handleGetGradesSuccess(this.cachedGrades);
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

  handleUpdateGradeSuccess(data) {
    for (var i = 0; i < this.cachedGrades.length; i++) {
      if (this.cachedGrades[i].id === data.id) {
        this.cachedGrades[i].name = data.name;
        this.cachedGrades[i].course = data.course;
        this.cachedGrades[i].grade = data.grade;
      }
    }
    this.handleGetGradesSuccess(this.cachedGrades)
  }
}
