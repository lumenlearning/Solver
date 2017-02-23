const getEquationSubstepChanges = require('./getEquationSubstepChanges');
const arrayToCommaList = require('./arrayToCommaList');

function describeSimplificationSubstep(step,substep) {
  var SubstepChanges = getEquationSubstepChanges(step,substep);

  if (SubstepChanges.changeFunction === "add") {
    var addValues = SubstepChanges.changeValues;
    substepDescription = "Add " + arrayToCommaList(SubstepChanges.changeValues);
  }
  else if (SubstepChanges.changeFunction === "subtract") {
    substepDescription = "Subtract " + SubstepChanges.changeValues[1] + " from " + SubstepChanges.changeValues[0];
  }
  else if (SubstepChanges.changeFunction === "multiply") {
    substepDescription = "Multiply " + arrayToCommaList(SubstepChanges.changeValues);
  }
  else if (SubstepChanges.changeFunction === "divide") {
    substepDescription = "Divide " + SubstepChanges.changeValues[0] + " by " + SubstepChanges.changeValues[1];
  }
  return substepDescription;
}

module.exports = describeSimplificationSubstep;
