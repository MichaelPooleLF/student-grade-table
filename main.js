var $table = $("table");
var $header = $("header");
var $formElement = $("form");
var gradeTable = new GradeTable($table);
var pageHeader = new PageHeader($header);
var gradeForm = new GradeForm($formElement);
var app = new App(gradeTable, pageHeader, gradeForm);
app.start();
