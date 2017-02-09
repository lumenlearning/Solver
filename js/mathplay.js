const mathsteps = require('mathsteps');
const $ = require('jQuery');





$(document).ready(function(){
    $("#mathbutton").click(function(event){
      event.preventDefault();
      $("#equationsteps").empty();

      var equation = $("#equation").val();

      const steps = mathsteps.solveEquation(equation);

      steps.forEach(step => {
          $("#equationsteps").append("<strong>" + (steps.indexOf(step) + 1) + ")</strong><br>");
          $("#equationsteps").append("before change: " + step.oldEquation.print() + "<br>");
          $("#equationsteps").append("change: " + step.changeType + "<br>");
          $("#equationsteps").append("after change: " + step.newEquation.print() + "<br>");
          $("#equationsteps").append("# of substeps: " + step.substeps.length + "<br><br>");
      });
    });
});
