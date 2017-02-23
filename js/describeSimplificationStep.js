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

  if (step.changeType === "BREAK_UP_FRACTION" || step.changeType === "COLLECT_LIKE_TERMS" || step.changeType === "REMOVE_ADDING_ZERO" ) {
    stepDescription = null;
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
