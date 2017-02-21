const mathsteps = require('mathsteps');
const $ = require('jQuery');
const getEquationStepChanges = require('./getEquationStepChanges');
const getEquationSubstepChanges = require('./getEquationSubstepChanges');
const describeEquationStep = require('./describeEquationStep');

$(document).ready(function() {
    // Solve Equation
  $("#solvebutton").click(function(event) {
    $("#equationsteps").empty();
    $("#substepbutton").show();

    var equation = $("#equation").val();

    const steps = mathsteps.solveEquation(equation);

    steps.forEach(step => {
      var description = describeEquationStep(step);
      var changeTypeSpaced = step.changeType.replace(/_/g, " ");


      $("#equationsteps").append("<strong>" + (steps.indexOf(step) + 1) + ")</strong><br>");
      $("#equationsteps").append(description + "<br>");
      $("#equationsteps").append("before change: " + step.oldEquation.print() + "<br>");
      $("#equationsteps").append("change: " + changeTypeSpaced.toLowerCase() + "<br>");
      $("#equationsteps").append("after change: " + step.newEquation.print() + "<br>");
      $("#equationsteps").append("<div class='substeps'></div>");

      if (!(step.substeps === [])) {
        step.substeps.forEach(substep => {
          // getSubstepChanges(step,substep);
          var changeTypeSpacedSubstep = substep.changeType.replace(/_/g, " ");
          $(".substeps").append("Start with: " + substep.oldEquation.print() + "<br>");
          $(".substeps").append("Then: " + changeTypeSpacedSubstep.toLowerCase() + "<br>");
          $(".substeps").append("End with: " + substep.newEquation.print() + "<br><br>");
        });
      }
    });

    var finalStep = steps[steps.length - 1];
    $('#equationsteps').append("<p><strong>Solution: </strong><span id='solution'></span></p>");
    $('#solution').append(finalStep.newEquation.print());
    $('body').append("<script>var solutionSpan = document.getElementById('solution');MQ.StaticMath(solutionSpan);</script>");
  });

  // Simplify Expression
  // $("#simplifybutton").click(function(event) {
  //   $("#equationsteps").empty();
  //   $("#substepbutton").show();
  //
  //   var equation = $("#equation").val();
  //
  //   const simplifySteps = mathsteps.simplifyExpression(equation);
  //
  //   simplifySteps.forEach(step => {
  //     var changeTypeSpaced = step.changeType.replace(/_/g, " ");
  //
  //     $("#equationsteps").append("<strong>" + (simplifySteps.indexOf(step) + 1) + ")</strong><br>");
  //     $("#equationsteps").append("before change: " + step.oldNode + "<br>");
  //     $("#equationsteps").append("change: " + changeTypeSpaced.toLowerCase() + "<br>");
  //     $("#equationsteps").append("after change: " + step.newSideNode + "<br>");
  //     $("#equationsteps").append("# of substeps: " + step.substeps.length + "<br><br>");
  //     $("#equationsteps").append("<div class='substeps'></div>");
  //
  //     step.substeps.forEach(substep => {
  //       var changeTypeSpacedSubstep = substep.changeType.replace(/_/g, " ");
  //
  //       $(".substeps").append("Start with: " + substep.oldNode + "<br>");
  //       $(".substeps").append("Then: " + changeTypeSpacedSubstep.toLowerCase() + "<br>");
  //       $(".substeps").append("End with: " + substep.newSideNode + "<br><br>");
  //     });
  //   });
  //
  //   var finalStep = simplifySteps[simplifySteps.length - 1];
  //   $('#equationsteps').append("<p><strong>Simplified Expression: </strong><span id='solution'></span></p>");
  //   var stringifiedSolution = (finalStep.newSideNode).toString();
  //
  //   $('#solution').append(stringifiedSolution);
  //   $('body').append("<script>var solutionSpan = document.getElementById('solution');MQ.StaticMath(solutionSpan);</script>");
  // });

  $("#substepbutton").click(function(event) {
      $(".substeps").toggle();
  });
});
