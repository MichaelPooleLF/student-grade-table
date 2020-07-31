var $table = $("table");
var $header = $("header");
var $formElement = $("form");
var $p = $("p");
var gradeTable = new GradeTable($table, $p);
var pageHeader = new PageHeader($header);
var gradeForm = new GradeForm($formElement);
var app = new App(gradeTable, pageHeader, gradeForm);
app.start();
