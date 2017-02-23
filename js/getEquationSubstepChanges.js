const mathsteps = require('mathsteps');
const _ = require('lodash');
const arrayToCommaList = require('./arrayToCommaList');

// Substep explainer
function getEquationSubstepChanges(step,substep) {

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

    else if (oldArg.type === "ParenthesisNode") {
        firstLevelSubNodes.push(oldArg);
    }
  });

  console.log("FIRST LEVEL CHANGE: " + firstLevelSubNodes);
  console.log("SECOND LEVEL CHANGE " + secondLevelSubNodes);

  firstLevelSubNodes.forEach(oldArg => {
    var isChangeArg = true;
    newSideNode.args.forEach(newArg => {

      if (oldArg.toString() === newArg.toString()) {
        isChangeArg = false;
      }
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

  var SubstepChanges = {changeValues: changeArguments, changeFunction: changeOperation};

  return SubstepChanges;
}

module.exports = getEquationSubstepChanges;
