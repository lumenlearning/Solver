const mathsteps = require('mathsteps');
const _ = require('lodash');

function getEquationStepChanges(step) {
  changeArguments = [];
  changeOperation = "";
  // console.log("OLD LEFT");
  // console.log(step.oldEquation.leftNode);
  // console.log("OLD RIGHT");
  // console.log(step.oldEquation.rightNode);

  if (step.changeType === "DIVIDE_FROM_BOTH_SIDES") {
    // console.log(step.newEquation.leftNode.args[1].toString());
    // console.log(step.newEquation.rightNode.args[1].toString());
    if (step.newEquation.leftNode.args[1].toString() === step.newEquation.rightNode.args[1].toString() && step.newEquation.leftNode.fn === "divide" && step.newEquation.rightNode.fn === "divide") {
      changeArguments.push(step.newEquation.leftNode.args[1].toString());
    }
  }

  else if (step.changeType === "ADD_TO_BOTH_SIDES") {
    // console.log(step.newEquation.leftNode.args[1].toString());
    // console.log(step.newEquation.rightNode.args[1].toString());
    if (step.newEquation.leftNode.args[1].toString() === step.newEquation.rightNode.args[1].toString() && step.newEquation.leftNode.fn === "add" && step.newEquation.rightNode.fn === "add") {
      changeArguments.push(step.newEquation.leftNode.args[1].toString());
    }
  }

  else if (step.changeType === "SIMPLIFY_LEFT_SIDE") {
    var oldSideNode = step.oldEquation.leftNode;
    var newSideNode = step.newEquation.leftNode;
    changeOperation = oldSideNode.fn;

    oldSideNode.args.forEach(oldArg => {
      var isChangeArg = true;


      if (isChangeArg) {
          changeArguments.push(oldArg);
      }
    });
  }

  else if (step.changeType === "SIMPLIFY_RIGHT_SIDE") {
    var oldSideNode = step.oldEquation.rightNode;
    var newSideNode = step.newEquation.rightNode;
    changeOperation = oldSideNode.fn;

    oldSideNode.args.forEach(oldArg => {
      var isChangeArg = true;


      if (isChangeArg) {
          changeArguments.push(oldArg);
      }
    });
      // console.log("FUNCTION: " + oldSideNode.fn);
      // console.log("CHANGE OP: " + changeOperation);

    // oldSideNode.args.forEach(oldArg => {
    //   var isChangeArg = true;
    //   newSideNode.args.forEach(newArg => {
    //
    //     if (oldArg.toString() === newArg.toString()) {
    //       isChangeArg = false;
    //     }
    //   });
    //
    //   if (isChangeArg) {
    //       changeArguments.push(oldArg);
    //   }
    // });

  }
  var StepChanges = {changeValues: changeArguments, changeFunction: changeOperation};

  return StepChanges;
}

module.exports = getEquationStepChanges;
