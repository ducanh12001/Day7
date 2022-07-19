/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (() => {

eval("const myNodelist = document.getElementsByTagName(\"li\");\r\nvar i;\r\nfor (i = 0; i < myNodelist.length; i++) {\r\n  var span = document.createElement(\"SPAN\");\r\n  var txt = document.createTextNode(\"\\u00D7\");\r\n  span.className = \"close\";\r\n  span.appendChild(txt);\r\n  myNodelist[i].appendChild(span);\r\n}\r\n\r\nconst close = document.getElementsByClassName(\"close\");\r\nvar i;\r\nfor (i = 0; i < close.length; i++) {\r\n  close[i].onclick = function () {\r\n    var div = this.parentElement;\r\n    div.style.display = \"none\";\r\n  }\r\n}\r\n\r\nlet MyTaskList = [];\r\nconst addForm = document.querySelector('#addForm');\r\nconst taskInput = document.querySelector('#task');\r\nconst list = document.querySelector('#list');\r\n\r\nlist.addEventListener('click', function (ev) {\r\n  if (ev.target.tagName === 'LI') {\r\n    ev.target.classList.toggle('checked');\r\n  }\r\n}, false);\r\n\r\n\r\naddForm.addEventListener('submit', function (ev) {\r\n  ev.preventDefault();\r\n  newElement()\r\n})\r\n\r\nfunction newElement() {\r\n  var li = document.createElement(\"li\");\r\n  var inputValue = document.getElementById(\"task\").value;\r\n  var t = document.createTextNode(inputValue);\r\n  li.appendChild(t);\r\n  if (inputValue === '') {\r\n    alert(\"Write something!\");\r\n  } else {\r\n    document.getElementById(\"list\").appendChild(li);\r\n  }\r\n  document.getElementById(\"task\").value = \"\";\r\n\r\n  var span = document.createElement(\"SPAN\");\r\n  var txt = document.createTextNode(\"\\u00D7\");\r\n  span.className = \"close\";\r\n  span.appendChild(txt);\r\n  li.appendChild(span);\r\n\r\n  for (i = 0; i < close.length; i++) {\r\n    close[i].onclick = function () {\r\n      var div = this.parentElement;\r\n      div.style.display = \"none\";\r\n    }\r\n  }\r\n}\n\n//# sourceURL=webpack://todolist/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.js"]();
/******/ 	
/******/ })()
;