const mathsteps = require('mathsteps');
const arrayToCommaList = require('./arrayToCommaList');

// Step explainer
function getSimplificationChanges(step) {

  var changeArguments = [];
  var changeOperation = "";
  var firstLevelSubNodes = [];
  var secondLevelSubNodes = [];


    var oldNode = step.oldNode;
    var newNode = step.newNode;

  // begin looping through arguments of left node
  oldNode.args.forEach(oldArg => {
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
    newNode.args.forEach(newArg => {

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
      newNode.args.forEach(newArg => {
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
    changeOperation = oldNode.fn;
  }

  console.log("changeArguments: " + changeArguments);
  console.log(changeOperation);

  var StepChanges = {changeValues: changeArguments, changeFunction: changeOperation};

  return StepChanges;
}

module.exports = getSimplificationChanges;
