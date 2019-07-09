var keyList = ["7", "8", "9", "/", "back", "4", "5", "6", "x", "C", "1", "2", "3", "-", "=", "0", ".", "+"];
var math = [];
var mathNums = [];
var mathOperators = [];
var mathOper = [];



drawGrid();

function drawGrid() {
  boxwidth = 60;
  boxheight = 60;
  var styleSheet = document.createElement('style')
  styleSheet.innerHTML = "div.main {margin: 0px;border: 4px solid black; \n" +
    "float: left;width: 341px; \n" +
    "height: 346px; background-color: darkgray;} \n" +
    "div.display {margin: 2px; \n" +
    "border: 2px solid black; float: left; \n" +
    "width: 331px; height: 66px; overflow: hidden; text-overflow:clip; \n" +
    "font-size: 50px; background-color: #B5C7AF; color: blue; border-radius: 15px \n" +
    "direction: rtl; text-align: right;} \n" +
    "div.keys {margin: 2px; \n" +
    "border: 2px solid black; text-align: center;\n" +
    "float: left; width: " + boxwidth + "px; height: " + boxheight + "px; font-size: 50px; border-radius: 15px;background-color: lightgray;} \n" +
    "div.clear { margin: 0px;border: 1px solid #ccc; clear: left; width: 150px; height: 150;}";
  document.head.appendChild(styleSheet);

  var myDiv = document.createElement("div");
  myDiv.classList.add("main");
  var myDiv2 = document.createElement("div");
  myDiv2.classList.add("display");
  myDiv2.id = "display1";
  myDiv.appendChild(myDiv2);
  var i;
  for (i = 0; i < (18); i++) {
    var myAtt = document.createElement("div");
    myAtt.classList.add("keys");
    myDiv.appendChild(myAtt);
  }
  document.body.appendChild(myDiv);
  var list = document.getElementsByClassName("main")[0];

  keyList.forEach(function(item, index) {
    list.getElementsByClassName("keys")[index].innerHTML = item;
  })
  list.getElementsByClassName("keys")[4].style.lineHeight = "60px";
  list.getElementsByClassName("keys")[4].style.fontSize = "30px";
  list.getElementsByClassName("keys")[14].style.height = "127px";
  list.getElementsByClassName("keys")[14].style.lineHeight = "121px";
  list.getElementsByClassName("keys")[14].style.float = "right";
  list.getElementsByClassName("keys")[15].style.width = "126px";

}


function getKeyVal(index) {
  return keyList[index];
}

var allKeysOnPage = document.querySelectorAll('.keys');
var logKeyIndex = function(keyIndex) {
  if (!math.length) {
    math[0] = getKeyVal(keyIndex);
  } else {
    math.push(getKeyVal(keyIndex));
  }
  document.getElementById("display1").innerHTML = math.join('');
}


allKeysOnPage.forEach(function(key, index) {
  key.addEventListener('click', function() {
    if (index == 4) {
      math.pop();
      document.getElementById("display1").innerHTML = math.join('');
    } else if (index == 9) {
      math = [];
      mathNums = [];

      document.getElementById("display1").innerHTML = math.join('');
    } else if (index == 16) {
      mathOper = math.join('').match(/[\d\.]+|\D+/g);
      if (mathOper != null) {
        var lastNum = mathOper[mathOper.length - 1]

        if (lastNum.includes(".")) {
          console.log("contains . ");
        } else if (lastNum.includes("x") || lastNum.includes("/") || lastNum.includes("+") || lastNum.includes("-")) {

          math.push(0);
          logKeyIndex(index);
        } else {
          logKeyIndex(index);
        }
      } else {
        math.push(0);
        logKeyIndex(index);
      }

    } else if (index == 14) {
      mathNums = math.join('').match(/[\d\.]+|\D+/g);
      do {
        checkMD();
      }
      while (mathNums.find(checkOper => checkOper === 'x') || mathNums.find(checkOper => checkOper === '/'));
      do {
        checkAS();
      }
      while (mathNums.find(checkOper => checkOper === '+') || mathNums.find(checkOper => checkOper === '-'));
      if (isNotIteger(mathNums[0]) && typeof mathNums[0] == 'number') {
        if (countDecimals(mathNums[0]) > 10) {
          document.getElementById("display1").innerHTML = mathNums[0].toFixed(8);
        }
      }

      math = mathNums;

    } else {
      logKeyIndex(index);
    }
  })
})
var checkMD = function() {
  const firstMultp = mathNums.findIndex(checkOper => checkOper === 'x');
  if (mathNums[firstMultp] == 'x') {

    replaceMathnums(firstMultp, multiply(mathNums[firstMultp - 1], mathNums[firstMultp + 1]));
  }
  var firstDiv = mathNums.findIndex(checkOper => checkOper === '/');
  if (mathNums[firstDiv] == '/') {
    replaceMathnums(firstDiv, divide(mathNums[firstDiv - 1], mathNums[firstDiv + 1]));
  }
}
var checkAS = function() {
  const firstAdd = mathNums.findIndex(checkOper => checkOper === '+');
  if (mathNums[firstAdd] == '+') {
    replaceMathnums(firstAdd, add(mathNums[firstAdd - 1], mathNums[firstAdd + 1]));

  }
  var firstSub = mathNums.findIndex(checkOper => checkOper === '-');
  if (mathNums[firstSub] == '-') {
    replaceMathnums(firstSub, subtract(mathNums[firstSub - 1], mathNums[firstSub + 1]));
  }
}
var replaceMathnums = function(index, answr) {
  mathNums[index - 1] = answr;
  mathNums.splice(index, 2);
  document.getElementById("display1").innerHTML = mathNums;

}
var add = function(num1, num2) {
  return (Number(num1) + Number(num2));
}
var subtract = function(num1, num2) {
  return (num1 - num2);
}
var divide = function(num1, num2) {
  if (num2 == '0') {
    console.log("error divide by zero");
    return ("Div by 0 Error");

  }
  return (num1 / num2);
}
var multiply = function(num1, num2) {
  return (num1 * num2);
}
var countDecimals = function(value) {
  if (Math.floor(value) !== value) {
    return value.toString().split(".")[1].length || 0;
  }
  return 0;
}
var isNotIteger = function(number) {
  if (Number.isInteger(number)) {
    return false;
  } else {
    return true;
  }
}
