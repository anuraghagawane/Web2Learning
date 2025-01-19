"use strict";
const func = (name) => {
    console.log("Hi ", name);
};
function sum(num1, num2) {
    return num1 + num2;
}
function func2(func1) {
    setTimeout(func1, 1000);
}
func2(func);
//func("anurag");
//console.log(sum(1, 2));
