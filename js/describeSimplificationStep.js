const getEquationSubstepChanges = require('./getEquationSubstepChanges');
const getSimplificationChanges = require('./getSimplificationChanges');
const arrayToCommaList = require('./arrayToCommaList');

function describeSimplificationStep(step, largerStep) {
  if (largerStep) {
    var StepChanges = getEquationSubstepChanges(largerStep, step);
  }
  else  {
    var StepChanges = getSimplificationChanges(step);
  }

  if (step.changeType === "BREAK_UP_FRACTION" || step.changeType === "COLLECT_LIKE_TERMS" || step.changeType === "REMOVE_ADDING_ZERO" || step.changeType === "GROUP_COEFFICIENTS" ) {
    stepDescription = null;
  }

  else if (step.changeType === "DISTRIBUTE") {
    var firstParenArgs = StepChanges.changeValues[0].content.args;
    var secondParenArgs = StepChanges.changeValues[1].content.args;
    var distributePairs = [];

    firstParenArgs.forEach(firstArg => {
      secondParenArgs.forEach(secondArg => {
        distributePairs.push(firstArg + " * " + secondArg);
      });
    });

    stepDescription = "Add the products of " + arrayToCommaList(distributePairs);
  }

  else {
    if (StepChanges.changeFunction === "add") {
      stepDescription = "Add " + arrayToCommaList(StepChanges.changeValues);
    }
    else if (StepChanges.changeFunction === "subtract") {
      stepDescription = "Subtract " + StepChanges.changeValues[1] + " from " + StepChanges.changeValues[0];
    }
    else if (StepChanges.changeFunction === "multiply") {
      stepDescription = "Multiply " + arrayToCommaList(StepChanges.changeValues);
    }
    else if (StepChanges.changeFunction === "divide") {
      stepDescription = "Divide " + StepChanges.changeValues[0] + " by " + StepChanges.changeValues[1];
    }
  }
  return stepDescription;
}

module.exports = describeSimplificationStep;
