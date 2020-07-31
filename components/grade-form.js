class GradeForm{
  constructor(formElement) {
    this.formElement = formElement;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.formElement.on("submit", this.handleSubmit); // use ".on" because this.formElement is a jQuery selector
  }

  onSubmit(createGrade) {
    this.createGrade = createGrade;
  }

  handleSubmit(event) {
    event.preventDefault();
    var formData = new FormData(event.target);
    var name = formData.get("name");
    var course = formData.get("course");
    var grade = formData.get("grade");
    this.createGrade(name, course, grade);
    event.target.reset();
  }
}
