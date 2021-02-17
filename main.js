function shapeFactory() {
  this.createShape = function (type) {
    switch (type) {
      case "square":
        return new squareShape();
      case "rectangle":
        return new rectangleShape();
      case "circle":
        return new circleShape();
      case "ellipse":
        return new ellipseShape();
      default:
        return undefined;
    }
  };
}

function squareShape() {
  this.parameters = ["side"];
  this.getArea = function (a) {
    return a * a;
  };
}
function rectangleShape() {
  this.parameters = ["side A", "side B"];
  this.getArea = function (a, b) {
    return a * b;
  };
}
function circleShape() {
  this.parameters = ["diameter"];
  this.getArea = function (a) {
    return (Math.PI * a).toFixed(2);
  };
}
function ellipseShape() {
  this.parameters = ["diameter A", "diameter B"];
  this.getArea = function (a, b) {
    return (Math.PI * a * b).toFixed(2);
  };
}

var sfac = new shapeFactory();
var choice;
var s;
var cParams = [];

// setup click handlers
function gotoStep2() {
  var options = document.getElementsByName("shape");
  for (o of options) {
    if (o.checked) {
      choice = o.value;
    }
  }
  if (typeof choice == "undefined") {
    alert("Select a shape to proceed.");
  } else {
    s = sfac.createShape(choice);
    document.getElementById("step-1").style.display = "none";
    var elStep2 = document.getElementById("step-2");
    var elPara = document.createElement("p");
    elPara.innerHTML = `You have selected a ${choice}, please input the required variables.`;
    elStep2.appendChild(elPara);
    var elDivArgs = document.createElement("div");
    for (p of s.parameters) {
      var elInput = document.createElement("input");
      var elLabel = document.createElement("label");
      elInput.type = "text";
      elInput.name = "parameters";
      elLabel.innerHTML = p;
      elLabel.setAttribute("class", "arg__params");
      elDivArgs.appendChild(elLabel);
      elDivArgs.appendChild(elInput);
      elDivArgs.appendChild(document.createElement("br"));
    }
    elDivArgs.setAttribute("class", "args");
    elStep2.appendChild(elDivArgs);
    var elDivActions = document.createElement("div");
    var elBtn = document.createElement("button");
    elBtn.innerHTML = "Go to step 3.";
    elBtn.onclick = gotoStep3;
    var elLink = document.createElement("a");
    elLink.onclick = resetCalculator;
    elLink.innerHTML = "or Cancel";
    elDivActions.setAttribute("class", "actions");
    elDivActions.appendChild(elBtn);
    elDivActions.appendChild(elLink);
    elStep2.appendChild(elDivActions);
    document.getElementById("step-2").style.display = "block";
  }
}

function gotoStep3() {
  document.getElementById("step-2").style.display = "none";
  var elStep3 = document.getElementById("step-3");
  var ps = document.getElementsByName("parameters");
  for (p of ps) {
    cParams.push(p.value);
  }
  var elPara = document.createElement("p");
  var elH3 = document.createElement("div");

  if (cParams.length == 1) {
    elPara.innerHTML = `You have caculated area of a ${choice} with ${s.parameters[0]} of ${cParams[0]}. Below is your result.`;
    elH3.innerHTML = `The area is ${s.getArea(cParams[0])}.`;
  } else {
    elPara.innerHTML = `You have caculated area of a ${choice} with ${s.parameters[0]} of ${cParams[0]} and ${s.parameters[1]} of ${cParams[1]}. Below is your result.`;
    elH3.innerHTML = `The area is ${s.getArea(cParams[0], cParams[1])}.`;
  }

  elStep3.appendChild(elPara);
  elH3.setAttribute("class", "emph");
  elStep3.appendChild(elH3);
  var elBtn = document.createElement("button");
  elBtn.innerHTML = "Start over";
  elBtn.onclick = resetCalculator;
  elStep3.appendChild(elBtn);
  document.getElementById("step-3").style.display = "block";
}

function resetCalculator() {
  window.location.reload();
}
