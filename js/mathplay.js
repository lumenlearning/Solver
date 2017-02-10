const mathsteps = require('mathsteps');
const $ = require('jQuery');


$(document).ready(function(){
  // Solve Equation
    $("#solvebutton").click(function(event){
      $("#equationsteps").empty();

      var equation = $("#equation").val();

      const steps = mathsteps.solveEquation(equation);

      steps.forEach(step => {
        $("#equationsteps").append("<strong>" + (steps.indexOf(step) + 1) + ")</strong><br>");
        $("#equationsteps").append("before change: " + step.oldEquation.print() + "<br>");
        $("#equationsteps").append("change: " + step.changeType + "<br>");
        $("#equationsteps").append("after change: " + step.newEquation.print() + "<br>");
        $("#equationsteps").append("# of substeps: " + step.substeps.length + "<br><br>");
        $("#equationsteps").append("<div class='substeps'></div>");

        step.substeps.forEach(substep => {

          $(".substeps").append("Start with: " + substep.oldEquation.print() + "<br>");
          $(".substeps").append("Then: " + substep.changeType + "<br>");
          $(".substeps").append("End with: " + substep.newEquation.print() + "<br><br>");
        });
      });
      $("#substepbutton").show();
      $("#substepbutton").click(function(event) {
        $(".substeps").toggle();
      });

      var finalStep = steps[steps.length-1];
      $('#equationsteps').append("<strong>Solution: </strong>" + finalStep.newEquation.print());
    });

    // Simplify Expression
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
        $("#equationsteps").append("<div class='substeps'></div>");

        step.substeps.forEach(substep => {

          $(".substeps").append("Start with: " + substep.oldNode + "<br>");
          $(".substeps").append("Then: " + substep.changeType + "<br>");
          $(".substeps").append("End with: " + substep.newNode + "<br><br>");
        });
      });
      $("#substepbutton").show();
      $("#substepbutton").click(function(event) {
        $(".substeps").toggle();
      });

      var finalStep = simplifySteps[simplifySteps.length-1];
      $('#equationsteps').append("<strong>Simplified Expression: </strong>" + finalStep.newNode);
    });
  });
