import {ArrayVal, MK_NULL, MK_NUMBER, MK_STRING, NumberVal, RuntimeVal, StringVal} from "./values";
import Environment from "./environment";

export function printFunction(_args, _env: Environment): RuntimeVal {
    // console.log(..._args.map(arg => arg.value)); // Release
    console.log(..._args); // Debug
    return MK_NULL();
}

export function timeFunction(_args: RuntimeVal[], _env: Environment): RuntimeVal {
    return MK_STRING(Date());
}

export function powFunction(_args: RuntimeVal[], _env: Environment): RuntimeVal {
    if (_args.length != 2){
        console.error("pow() function only takes two args: (base, power)");
        process.exit(1);
    }

    const base: number = (_args[0] as NumberVal).value;
    const power: number = (_args[1] as NumberVal).value;

    const result = Math.pow(base, power);

    return MK_NUMBER(result);
}

export function floorFunc(_args: RuntimeVal[], _env: Environment): RuntimeVal {
    if (_args.length != 1){
        console.error("floor() function takes two args: (base, power)");
        process.exit(1);
    }

    const num: number = (_args[0] as NumberVal).value;
    const result = Math.floor(num);

    return MK_NUMBER(result);
}

export function randInt(_args: RuntimeVal[], _env: Environment): RuntimeVal {
    if (_args.length != 2){
        console.error("randInt() function takes two args: (min, max)");
        process.exit(1);
    }

    const minCeiled = Math.ceil((_args[0] as NumberVal).value);
    const maxFloored = Math.floor((_args[1] as NumberVal).value);

    return MK_NUMBER(Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled));
}

export function sumFunction(_args: RuntimeVal[], _env: Environment): RuntimeVal {
    let total: number = 0;

    if (_args[0].type == "array"){
        const numArray: RuntimeVal[] = (_args[0] as ArrayVal).values;

        for (const rVal of numArray){
            const nVal = rVal as NumberVal;
            total += nVal.value;
        }

        return MK_NUMBER(total);
    }

    for (const nval of _args){
        total += (nval as NumberVal).value;
    }

    return MK_NUMBER(total);
}

export function strConcatFunc(_args: RuntimeVal[], _env: Environment): RuntimeVal {
    let finalString = "";

    for (const rtval of _args){
        finalString += (rtval as StringVal).value;
    }

    return MK_STRING(finalString);
}

export function maxFunc(_args: RuntimeVal[], _env: Environment): RuntimeVal {
    if (_args[0].type == "array") {
        if (_args.length > 1) {
            console.error("Only 1 array supported in max function");
            process.exit(1);
        }

        const arrayToCompareMax: number[] = [];

        const valArray = _args[0] as ArrayVal;

        for (const num of valArray.values){
            arrayToCompareMax.push((num as NumberVal).value);
        }

        const maxValue = Math.max(...arrayToCompareMax);

        return MK_NUMBER(maxValue);
    } else if (_args[0].type == "number"){
      if (_args.length != 2){
        console.error("Max function has more than 2 args");
        process.exit(1);
      }

      if ((_args[0] as NumberVal).value > (_args[1] as NumberVal).value){
          return _args[0];
      }

      return _args[1];
    }
}

export function minFunc(_args: RuntimeVal[], _env: Environment): RuntimeVal {
    if (_args[0].type == "array") {
        if (_args.length > 1) {
            console.error("Only 1 array supported in min function");
            process.exit(1);
        }

        const arrayToCompareMin: number[] = [];

        const valArray = _args[0] as ArrayVal;

        for (const num of valArray.values){
            arrayToCompareMin.push((num as NumberVal).value);
        }

        const minValue = Math.min(...arrayToCompareMin);

        return MK_NUMBER(minValue);
    } else if (_args[0].type == "number"){
      if (_args.length != 2){
        console.error("Min function has more that 2 args");
        process.exit(1);
      }

      if ((_args[0] as NumberVal).value < (_args[1] as NumberVal).value){
          return _args[0];
      }

      return _args[1];
    }
}
