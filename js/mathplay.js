const mathsteps = require('mathsteps');
const $ = require('jQuery');


$(document).ready(function(){
    $("#solvebutton").click(function(event){
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
    $("#simplifybutton").click(function(event){
      $("#equationsteps").empty();

      var equation = $("#equation").val();

      const simplifySteps = mathsteps.simplifyExpression(equation);

      simplifySteps.forEach(step => {
        $("#equationsteps").append("<strong>" + (simplifySteps.indexOf(step) + 1) + ")</strong><br>");
        $("#equationsteps").append("before change: " + step.oldNode + "<br>");
        $("#equationsteps").append("change: " + step.changeType + "<br>");
        $("#equationsteps").append("after change: " + step.newNode + "<br>");
        $("#equationsteps").append("# of substeps: " + step.substeps.length + "<br><br>");

        step.substeps.forEach(substep => {
          $("#equationsteps").append("after change: " + substep.oldNode + "<br>");
        });



      });

    });
});
