const mathsteps = require('mathsteps');
const $ = require('jQuery');
const _ = require('lodash');

// Substep explainer
function getSubstepChanges(step,substep) {
  if (step.changeType === "SIMPLIFY_LEFT_SIDE" || step.changeType === "SIMPLIFY_RIGHT_SIDE") {
      var changeArguments = [];
      var changeOperation = "";
      var firstLevelSubNodes = [];
      var secondLevelSubNodes = [];

      if (step.changeType === "SIMPLIFY_LEFT_SIDE") {
        var oldSideNode = substep.oldEquation.leftNode;
        var newSideNode = substep.newEquation.leftNode;
      }

      else if (step.changeType === "SIMPLIFY_RIGHT_SIDE") {
        var oldSideNode = substep.oldEquation.rightNode;
        var newSideNode = substep.newEquation.rightNode;
      }

          // begin looping through arguments of left node
      oldSideNode.args.forEach(oldArg => {
        if (oldArg.changeGroup === 1 ) {
          changeOperation = oldArg.fn;
        }

      var changeLevelOne = false;
        if (oldArg.args) {
          oldArg.args.forEach(oldArgNarrow => {
            if (oldArgNarrow.type === "ConstantNode" && oldArg.changeGroup === 1) {
              changeLevelOne = false;
            }
            else if (oldArgNarrow.type !== "OperatorNode") {
              changeLevelOne = true;
            }
          });

          if (changeLevelOne) {
            firstLevelSubNodes.push(oldArg);
          }
          else {
            secondLevelSubNodes.push(oldArg);
          }
        }

        else if (oldArg.type === "SymbolNode") {
          firstLevelSubNodes.push(oldArg);
        }

        else if (oldArg.type === "ConstantNode") {
          firstLevelSubNodes.push(oldArg);
        }
      });
      console.log(oldSideNode);
      // console.log("new node: " + newSideNode);
      // console.log("OLD ARGS");
      // console.log(oldSideNode.args);
      // console.log("NEW ARGS");
      // console.log(newSideNode.args);
      console.log("FIRST LEVEL CHANGE: " + firstLevelSubNodes);
      console.log("SECOND LEVEL CHANGE " + secondLevelSubNodes);

      firstLevelSubNodes.forEach(oldArg => {
        var isChangeArg = true;
        newSideNode.args.forEach(newArg => {
          // console.log("is equal?");
          // console.log("old arg: " + oldArg);
          // console.log("new arg: " + newArg);
          // console.log(_.isEqual(oldArg, newArg));
          // console.log(oldArg.toString() === newArg.toString());
          if (oldArg.toString() === newArg.toString()) {
            isChangeArg = false;
          }
          // if (newArg.args) {
          //   newArg.args.forEach(newArgNarrow => {
          //     if (oldArg.toString() === newArgNarrow.toString()) {
          //         isChangeArg = false;
          //     }
          //   });
          // }
        });
        if (isChangeArg) {
            changeArguments.push(oldArg);
        }
      });

      secondLevelSubNodes.forEach(oldArg => {
        var isChangeArg = true;
        oldArg.args.forEach(oldArgNarrow => {
          newSideNode.args.forEach(newArg => {
            if (newArg.args) {
              newArg.args.forEach(newArgNarrow => {
                  if ((oldArgNarrow.toString() === newArgNarrow.toString() || oldArgNarrow.toString() === newArg.toString()) && !_.includes(firstLevelSubNodes.toString(),oldArgNarrow.toString())) {
                      isChangeArg = false;
                  }
              });
            }
          });
          if (isChangeArg) {
              changeArguments.push(oldArgNarrow);
          }
        });
      });

      if (!changeOperation) {
        changeOperation = oldSideNode.fn;
      }

      console.log("changeArguments: " + changeArguments);
      console.log(changeOperation);

      var SubstepChanges = {changeValues: changeArguments, changeFunction: changeOperation}
  }
  return SubstepChanges;
}



$(document).ready(function() {
    // Solve Equation
    $("#solvebutton").click(function(event) {
        $("#equationsteps").empty();
        $("#substepbutton").show();

        var equation = $("#equation").val();

        const steps = mathsteps.solveEquation(equation);

        steps.forEach(step => {
            var changeTypeSpaced = step.changeType.replace(/_/g, " ");

            // console.log(steps.indexOf(step) + 1 + "OLD")
            // console.log("Left: ")
            // console.log(step.oldEquation.leftNode.args);
            // console.log("Right: ")
            // console.log(step.oldEquation.rightNode.args);
            // console.log("Right: " + step.oldEquation.rightNode);
            // console.log("NEW");
            // console.log("Left: " + step.newEquation.leftNode.args);
            // console.log("Right: " + step.newEquation.rightNode.args);

            var leftArgsOld = step.oldEquation.leftNode.args;
            var rightArgsOld = step.oldEquation.rightNode.args;
            var leftArgsNew = step.newEquation.leftNode.args;
            var rightArgsNew = step.newEquation.rightNode.args;

            // if (leftArgsOld) {
            //     leftArgsOld.forEach(arg => {
            //         console.log("step " + (steps.indexOf(step) +1) + " old left: " + arg.type);
            //         console.log(arg);
            //     });
            //     console.log(step.oldEquation.leftNode.op);
            //     console.log(step.oldEquation.leftNode.changeGroup);
            // }
            // if (rightArgsOld) {
            //     rightArgsOld.forEach(arg => {
            //         console.log("step " + (steps.indexOf(step) +1) + " old right: " + arg.type);
            //         console.log(arg);
            //     });
            //     console.log(step.oldEquation.rightNode.op);
            //     console.log(step.oldEquation.rightNode.changeGroup);
            // }
            // if (leftArgsNew) {
            //     leftArgsNew.forEach(arg => {
            //         console.log("step " + (steps.indexOf(step) +1) + " new left: " + arg.type);
            //         console.log(arg);
            //     });
            //     console.log(step.newEquation.leftNode.op);
            //     console.log(step.newEquation.leftNode.changeGroup);
            // }
            // if (rightArgsNew) {
            //     rightArgsNew.forEach(arg => {
            //         console.log("step " + (steps.indexOf(step) +1) + " new right: " + arg.type);
            //         console.log(arg);
            //         });
            //     console.log(step.newEquation.rightNode.op);
            //     console.log(step.newEquation.rightNode.changeGroup);
            // }

            $("#equationsteps").append("<strong>" + (steps.indexOf(step) + 1) + ")</strong><br>");
            $("#equationsteps").append("before change: " + step.oldEquation.print() + "<br>");
            $("#equationsteps").append("change: " + changeTypeSpaced.toLowerCase() + "<br>");
            $("#equationsteps").append("after change: " + step.newEquation.print() + "<br>");
            $("#equationsteps").append("<div class='substeps'></div>");


            step.substeps.forEach(substep => {
              getSubstepChanges(step,substep);
                // else {
                //     var newSideNode = substep.newEquation.rightNode;
                //     substep.oldEquation.rightNode.args.forEach(arg => {
                //         if (isInNewNode(arg, newSideNode) === false) {
                //             changeArguments.push(arg);
                //         }
                //     });
                // }

                // console.log("SUBSTEP");
                // console.log("old left: ");
                // console.log(substep.oldEquation.leftNode);
                // console.log(substep.oldEquation.leftNode.args);
                // console.log("old right: " + substep.oldEquation.rightNode.changeGroup);
                // console.log("new left: ");
                // console.log(substep.newEquation.leftNode);
                // console.log(substep.newEquation.leftNode.args);
                // console.log("new right: " + substep.newEquation.rightNode.changeGroup);
                var changeTypeSpacedSubstep = substep.changeType.replace(/_/g, " ");

              $(".substeps").append("Start with: " + substep.oldEquation.print() + "<br>");
              $(".substeps").append("Then: " + changeTypeSpacedSubstep.toLowerCase() + "<br>");
              $(".substeps").append("End with: " + substep.newEquation.print() + "<br><br>");
            });
        });


        var finalStep = steps[steps.length - 1];
        $('#equationsteps').append("<p><strong>Solution: </strong><span id='solution'></span></p>");
        $('#solution').append(finalStep.newEquation.print());
        $('body').append("<script>var solutionSpan = document.getElementById('solution');MQ.StaticMath(solutionSpan);</script>");
    });

    // Simplify Expression
    $("#simplifybutton").click(function(event) {
        $("#equationsteps").empty();
        $("#substepbutton").show();

        var equation = $("#equation").val();

        const simplifySteps = mathsteps.simplifyExpression(equation);

        simplifySteps.forEach(step => {
            var changeTypeSpaced = step.changeType.replace(/_/g, " ");

            $("#equationsteps").append("<strong>" + (simplifySteps.indexOf(step) + 1) + ")</strong><br>");
            $("#equationsteps").append("before change: " + step.oldNode + "<br>");
            $("#equationsteps").append("change: " + changeTypeSpaced.toLowerCase() + "<br>");
            $("#equationsteps").append("after change: " + step.newSideNode + "<br>");
            $("#equationsteps").append("# of substeps: " + step.substeps.length + "<br><br>");
            $("#equationsteps").append("<div class='substeps'></div>");

            step.substeps.forEach(substep => {
                var changeTypeSpacedSubstep = substep.changeType.replace(/_/g, " ");

                $(".substeps").append("Start with: " + substep.oldNode + "<br>");
                $(".substeps").append("Then: " + changeTypeSpacedSubstep.toLowerCase() + "<br>");
                $(".substeps").append("End with: " + substep.newSideNode + "<br><br>");
            });
        });


        var finalStep = simplifySteps[simplifySteps.length - 1];
        $('#equationsteps').append("<p><strong>Simplified Expression: </strong><span id='solution'></span></p>");
        var stringifiedSolution = (finalStep.newSideNode).toString();

        $('#solution').append(stringifiedSolution);
        $('body').append("<script>var solutionSpan = document.getElementById('solution');MQ.StaticMath(solutionSpan);</script>");
    });


    $("#substepbutton").click(function(event) {
        $(".substeps").toggle();
    });
});
