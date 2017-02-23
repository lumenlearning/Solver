const mathsteps = require('mathsteps');
const $ = require('jQuery');
const describeEquationStep = require('./describeEquationStep');
const describeSimplificationStep = require('./describeSimplificationStep');

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
      $("#equationsteps").append("<strong>Before change: </strong>" + step.oldEquation.print() + "</span><br>");
      $("#equationsteps").append("<strong>Change: </strong>" + changeTypeSpaced.toLowerCase() + "<br>");
      if (description) {
        $("#equationsteps").append(description + "<br>");
      }
      $("#equationsteps").append("<strong>After change: </strong>" + step.newEquation.print() + "</span><br><br>");
      if (step.substeps.length >0) {
        $("#equationsteps").append("<div class='substeps' id='substeps" + steps.indexOf(step) + "'></div>");
      }

      if (step.substeps.length >0) {
        step.substeps.forEach(substep => {
          // getSubstepChanges(step,substep);
          var substepDescription = describeSimplificationStep(substep, step);
          var changeTypeSpacedSubstep = substep.changeType.replace(/_/g, " ");
          var divId = '#substeps' + steps.indexOf(step);
          $(divId).append("Start with: " + substep.oldEquation.print() + "</span><br>");
          $(divId).append("Then: " + changeTypeSpacedSubstep.toLowerCase() + "<br>");
          if (substepDescription) {
            $(divId).append("Change: " + substepDescription + "<br>");
          }
          $(divId).append("End with: " + substep.newEquation.print() + "</span><br><br>");
        });
      }
    });

    var finalStep = steps[steps.length - 1];
    $('#equationsteps').append("<p><strong>Solution: </strong><span id='solution'></span></p>");
    $('#solution').append(finalStep.newEquation.print());
    $('body').append("<script>var solutionSpan = document.getElementById('solution');MQ.StaticMath(solutionSpan);");
  });

  // Simplify Expression
  $("#simplifybutton").click(function(event) {
    $("#equationsteps").empty();
    $("#substepbutton").show();

    var equation = $("#equation").val();

    const simplifySteps = mathsteps.simplifyExpression(equation);

    simplifySteps.forEach(step => {
      var description = describeSimplificationStep(step);
      var changeTypeSpaced = step.changeType.replace(/_/g, " ");

      $("#equationsteps").append("<strong>" + (simplifySteps.indexOf(step) + 1) + ")</strong><br>");
      $("#equationsteps").append("<strong>Before change: </strong>" + step.oldNode + "</span><br>");
      $("#equationsteps").append("<strong>Change: </strong>" + changeTypeSpaced.toLowerCase() + "<br>");
      if (description) {
        $("#equationsteps").append(description + "<br>");
      }
      $("#equationsteps").append("<strong>After change: </strong>" + step.newNode + "</span><br><br>");
      // if (simplifySteps.substeps.length >0) {
      //   $("#equationsteps").append("<div class='substeps' id='substeps" + simplifySteps.indexOf(step) + "'></div>");
      // }
      //
      // if (simplifySteps.substeps.length >0) {
      //   simplifySteps.substeps.forEach(substep => {
      //     // getSubstepChanges(step,substep);
      //     // var substepDescription = describeSimplificationStep(step,substep);
      //     var changeTypeSpacedSubstep = substep.changeType.replace(/_/g, " ");
      //     var divId = '#substeps' + simplifySteps.indexOf(step);
      //     $(divId).append("Start with: " + substep.oldNode.print() + "</span><br>");
      //     $(divId).append("Then: " + changeTypeSpacedSubstep.toLowerCase() + "<br>");
      //     if (substepDescription) {
      //       $(divId).append("Change: " + substepDescription + "<br>");
      //     }
      //     $(divId).append("End with: " + substep.newNode.print() + "</span><br><br>");
      //   });
      // }
    });

    var finalStep = simplifySteps[simplifySteps.length - 1];
    $('#equationsteps').append("<p><strong>Simplified Expression: </strong><span id='solution'></span></p>");
    var stringifiedSolution = finalStep.newNode.toString();

    $('#solution').append(stringifiedSolution);
    $('body').append("<script>var solutionSpan = document.getElementById('solution');MQ.StaticMath(solutionSpan);</script>");
  });

  $("#substepbutton").click(function(event) {
      $(".substeps").toggle();
  });
});
