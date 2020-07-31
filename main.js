var $table = $("table");
var $header = $("header");
var pageHeader = new PageHeader($header);
var gradeTable = new GradeTable($table);
var app = new App(gradeTable, pageHeader);
app.start();
