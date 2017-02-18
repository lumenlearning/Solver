const mathsteps = require('mathsteps');
const $ = require('jQuery');
const _ = require('lodash');

function isInNewNode(myNode, newNode) {
    newNode.args.forEach(arg => {
        if (_.isEqual(arg, myNode)) {
            return true;
        }

    });
}


$(document).ready(function() {
    // Solve Equation
    $("#solvebutton").click(function(event) {
        $("#equationsteps").empty();

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
                // seperate loop logic from DOM logic here
                if (substep.changeType === 'ADD_POLYNOMIAL_TERMS') {
                    var polynomials = [];
                    var firstLevelChangeNodes = [];
                    var secondLevelChangeNodes = [];

                    if (substep.oldEquation.leftNode.args) {
                        var newNode = substep.newEquation.leftNode;
                        // begin looping through arguments of left node
                        substep.oldEquation.leftNode.args.forEach(oldArg => {
                        var changeLevelOne = false;
                            if (oldArg.args) {
                              // if (_.includes(oldArg.args,SymbolNode)) {
                              //   changeLevelOne === true;
                              // }

                              oldArg.args.forEach(oldArgNarrow => {
                                if (oldArgNarrow.type !== "OperatorNode") {
                                  changeLevelOne = true;
                                  // console.log("Inside oldArg.args loop: " + changeLevelOne);
                                }
                              });

                              // console.log("Outside oldArg.args loop: " + changeLevelOne);

                              if (changeLevelOne) {
                                firstLevelChangeNodes.push(oldArg);
                              }

                              else {
                                secondLevelChangeNodes.push(oldArg);
                              }
                            }

                            });

                            console.log("FIRST LEVEL CHANGE: " + firstLevelChangeNodes);
                            console.log("SECOND LEVEL CHANGE " + secondLevelChangeNodes);

                            firstLevelChangeNodes.forEach(oldArg => {
                              var isChangeArg = true;
                              newNode.args.forEach(newArg => {
                                console.log("newArg level 1: not equal? ")
                                console.log(!_.isEqual(oldArg, newArg));
                                if (_.isEqual(oldArg, newArg)) {
                                  isChangeArg = false;
                                }

                                if (newArg.args) {
                                  newArg.args.forEach(newArgNarrow => {
                                    console.log("newArgNarrow level 1: ")
                                    console.log(_.isEqual(oldArg, newArgNarrow));
                                    if (_.isEqual(oldArg, newArgNarrow)) {
                                        isChangeArg = false;
                                    }
                                  });
                                }

                              });
                              console.log("change arg? ");
                              console.log(isChangeArg);
                              if (isChangeArg) {
                                  polynomials.push(oldArg);
                              }
                            });

                            secondLevelChangeNodes.forEach(oldArg => {
                              var isChangeArg = false;
                              oldArg.args.forEach(oldArgNarrow => {
                                newNode.args.forEach(newArg => {
                                    if (newArg.args) {
                                        newArg.args.forEach(newArgNarrow => {
                                            if (!_.isEqual(oldArgNarrow, newArgNarrow) && !_.isEqual(oldArgNarrow, newArg)) {
                                                isChangeArg = true;
                                            }
                                        });
                                    }
                                });
                                if (isChangeArg) {
                                    polynomials.push(oldArgNarrow);
                                }
                              });
                            });
                          }



                    console.log("POLYNOMIALS");
                    console.log("polynomials: " + polynomials);
                }
                // else {
                //     var newNode = substep.newEquation.rightNode;
                //     substep.oldEquation.rightNode.args.forEach(arg => {
                //         if (isInNewNode(arg, newNode) === false) {
                //             polynomials.push(arg);
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
        $("#substepbutton").show();
        $("#substepbutton").click(function(event) {
            $(".substeps").toggle();
        });

        var finalStep = steps[steps.length - 1];
        $('#equationsteps').append("<p><strong>Solution: </strong><span id='solution'></span></p>");
        $('#solution').append(finalStep.newEquation.print());
        $('body').append("<script>var solutionSpan = document.getElementById('solution');MQ.StaticMath(solutionSpan);</script>");
    });

    // Simplify Expression
    $("#simplifybutton").click(function(event) {
        $("#equationsteps").empty();

        var equation = $("#equation").val();

        const simplifySteps = mathsteps.simplifyExpression(equation);

        simplifySteps.forEach(step => {
            var changeTypeSpaced = step.changeType.replace(/_/g, " ");

            $("#equationsteps").append("<strong>" + (simplifySteps.indexOf(step) + 1) + ")</strong><br>");
            $("#equationsteps").append("before change: " + step.oldNode + "<br>");
            $("#equationsteps").append("change: " + changeTypeSpaced.toLowerCase() + "<br>");
            $("#equationsteps").append("after change: " + step.newNode + "<br>");
            $("#equationsteps").append("# of substeps: " + step.substeps.length + "<br><br>");
            $("#equationsteps").append("<div class='substeps'></div>");

            step.substeps.forEach(substep => {
                var changeTypeSpacedSubstep = substep.changeType.replace(/_/g, " ");

                $(".substeps").append("Start with: " + substep.oldNode + "<br>");
                $(".substeps").append("Then: " + changeTypeSpacedSubstep.toLowerCase() + "<br>");
                $(".substeps").append("End with: " + substep.newNode + "<br><br>");
            });
        });
        $("#substepbutton").show();
        $("#substepbutton").click(function(event) {
            $(".substeps").toggle();
        });

        var finalStep = simplifySteps[simplifySteps.length - 1];
        $('#equationsteps').append("<p><strong>Simplified Expression: </strong><span id='solution'></span></p>");
        var stringifiedSolution = (finalStep.newNode).toString();

        $('#solution').append(stringifiedSolution);
        $('body').append("<script>var solutionSpan = document.getElementById('solution');MQ.StaticMath(solutionSpan);</script>");
    });
});
