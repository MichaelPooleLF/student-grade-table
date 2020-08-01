class GradeForm{
  constructor(formElement, studentName, courseName, studentGrade, formTitle, submitButton) {
    this.formElement = formElement;
    this.studentName = studentName;
    this.courseName = courseName;
    this.studentGrade = studentGrade;
    this.formTitle = formTitle;
    this.submitButton = submitButton;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.formElement.on("submit", this.handleSubmit); // use ".on" because this.formElement is a jQuery selector
  }

  onSubmit(createGrade, updateGrade) {
    this.createGrade = createGrade;
    this.updateGrade = updateGrade;
  }

  handleSubmit(event) {
    event.preventDefault();
    var formData = new FormData(event.target);
    var name = formData.get("name");
    var course = formData.get("course");
    var grade = formData.get("grade");
    if(this.formTitle.text() === "Add Grade") {
      this.createGrade(name, course, grade);
    } else {
      this.updateGrade(this.updateId, name, course, grade)
    }
    this.formTitle.text("Add Grade");
    this.submitButton.text("Add");
    event.target.reset();
  }
}
