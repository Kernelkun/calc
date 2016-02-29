/*
AddDigit | OnClick	Add a digit to the display
Dot	OnClick |	Put a decimal point on the display (if not there already)
DoExponent |	OnClick	Put an exponent ('e') on the display
PlusMinus |	OnClick	Change the sign to + if - and minus if plus
Clear, AllClear |	OnClick	Clear and All Clear (C and AC)
Del |   OnClick |   Delete last characterrcalc
Operate |	OnClick	Perform operations * / + and -
Calculate |	OnClick	Calculate (on pressing the = button)
FixCurrent |
*/

Memory  = "0";      // initialise memory variable
Current = "0";      //   and value of Display ("current" value)
Operation = ["+","-","/","*"];      // Records code for eg * / etc.
MAXLENGTH = 30;     // maximum number of digits before decimal!

console.error("Current: " + Current);
document.getElementById("Display").value = Current;
console.warn(document.getElementById("Display").value.toString())

function RemoveClasses() {
    var sz = document.getElementById("screen");
    sz.classList.remove("screen40", "screen30", "screen20", "screen10");
}

function RestoreSize() {
    var sz = document.getElementById("screen");
    RemoveClasses();
    sz.classList.add("screen40"); 
}

function PlusSize(Current) {
    var sz = document.getElementById("screen");
    
    if (Current.length > 10) {
        RemoveClasses();
        sz.classList.add("screen30");
    }
    if (Current.length > 15) {
        RemoveClasses();
        sz.classList.add("screen20");
    }
    if (Current.length > 22) {
        RemoveClasses();
        sz.classList.add("screen10");
    }
}

function MinusSize(Current) {
    var sz = document.getElementById("screen");
    
    if (Current.length <= 22) {
        RemoveClasses();
        sz.classList.add("screen20");
    }
    if (Current.length <= 15) {
        RemoveClasses();
        sz.classList.add("screen30");
    }
    if (Current.length <= 10) {
        RemoveClasses();
        sz.classList.add("screen40");
    }
    
}

function AddDigit(dig) {
    if (Current.length > MAXLENGTH || Current == "Too long, dude!"){
        RestoreSize();
        Current = "Too long, dude!";
    } else {
        if (dig === 0 && dig.indexOf(".") == -1) {
            Current = dig;
        } else {
            if (Current === "0") {
                Current = dig;
            } else {
                Current = Current + dig;
            }
        }
    }
    PlusSize(Current);
    document.getElementById("Display").value = Current;
    console.error("Current: " + Current);
}

function Dot() {
    if (Current.indexOf(".") == -1) {
        Current = Current + ".";
    }
    document.getElementById("Display").value = Current;
}

function PlusMinus() {
    if (Current > 0) {
        Current = "-" + Current;
    } else {
        while(Current.charAt(0) === "-")
            Current = Current.substr(1);
    }
    document.getElementById("Display").value = Current;
}

function Clear() {
    RestoreSize();
    Current = "0";
    document.getElementById("Display").value = Current;
    console.info("Memory: " +Memory);
    console.error("Current: " + Current);
}

function AllClear() {
    RestoreSize();
    Memory = "0";
    Current = "0";
    document.getElementById("Display").value = Current;
    console.info("Memory: " +Memory);
    console.error("Current: " + Current);
}

function Del() {
    if (Current.length === 1) {
        Current = "0";
    } else {
        Current = Current.substr(0, Current.length-1);
    }
    MinusSize(Current);
    document.getElementById("Display").value = Current;
}

function Operate(op) {
    if (Memory == "0"){
        Memory = Current + Operation[op];
    } else {
        Memory = Memory + Current + Operation[op];
        Current = "0";
    }
    Current = "0";
    console.info("Memory: " +Memory);
    console.error("Current: " + Current);
    document.getElementById("Display").value = Current;
}

function Calculate() {
    Memory = Memory + Current;
    Current = eval(Memory).toString();
    Memory = "0";
    
    console.info("Memory: " +Memory);
    console.error("Current: " + Current);
    document.getElementById("Display").value = Current;
}