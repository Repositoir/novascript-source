/* SPDX-License-Identifier: Apache-2.0 */
/*
 * NovaScript - Native Functions
 *
 * Defines a set of builtin functions.
 *
 * Copyright (c) 2025 Aritra Biswas
 * All Rights Reserved.
 *
 * Author: Aritra Biswas <aritrabb@gmail.com>
 */

import {
    ArrayVal,
    BooleanVal,
    MK_ARRAY,
    MK_NULL,
    MK_NUMBER,
    MK_STRING,
    NumberVal,
    RuntimeVal,
    StringVal
} from "./values";
import Environment from "./environment";
import * as fs from "node:fs";
import express from "express";
// @ts-ignore
import process from "node:process";

export function printFunction(_args: RuntimeVal[], _env: Environment): RuntimeVal {
    // console.log(..._args); // For debug purposes
    let isPartOfArray: boolean = false
    function formatValue(value: RuntimeVal): string {
        switch (value.type) {
            case "number":
                return (value as NumberVal).value.toString();
            case "string":
                if (isPartOfArray) return `"${(value as StringVal).value}"`;
                else {
                    isPartOfArray = false;
                    return `${(value as StringVal).value}`;
                }
            case "boolean":
                return (value as BooleanVal).value.toString();
            case "null":
                return "null";
            case "array":
                isPartOfArray = true;
                const arr = (value as ArrayVal).values;
                const formattedItems = arr.map(formatValue);
                return `[${formattedItems.join(", ")}]`;
            default:
                throw new Error(`Unrecognized runtime value: ${value.type}`);
        }
    }

    const output = _args.map(formatValue).join(", ");
    console.log(output);

    return MK_STRING(output);
    // return MK_NULL();
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

export function splitFunction(_args: RuntimeVal[], _env: Environment): RuntimeVal {
    if (_args[0].type == "string" && _args[1].type == "string"){
        const mainStr = (_args[0] as StringVal).value;
        const splitChar = (_args[1] as StringVal).value;

        const splitArr = mainStr.split(splitChar);

        const runtimeStringVals = new Array<RuntimeVal>;

        for (const item of splitArr){
            runtimeStringVals.push(MK_STRING(item));
        }

        return MK_ARRAY(runtimeStringVals);
    } else {
        throw new Error("Both args of be strings");
    }
}

export function typeFunction(_args: RuntimeVal[], _env: Environment): RuntimeVal {
    if (_args.length > 1){
        throw new Error("Cannot identify type for more than 2 Runtime Values. type() takes only 1 arg");
    }

    return MK_STRING(_args[0].type);
}

export function lengthFunction(_args: RuntimeVal[], _env: Environment): RuntimeVal {
    if (_args.length != 1){
        throw new Error(`length() takes only 1 parameter, got ${_args.length}`);
    }

    switch (_args[0].type) {
        case "array":
            return MK_NUMBER((_args[0] as ArrayVal).values.length);
        case "string":
            return MK_NUMBER((_args[0] as StringVal).value.length);
    }
}

export function openFileFunction(_args: RuntimeVal[], _env: Environment): RuntimeVal {
    const fileContents = fs.readFileSync((_args[0] as StringVal).value, "utf-8");
    return MK_STRING(fileContents);
}

export function assertFunction(_args: RuntimeVal[], _env: Environment):RuntimeVal {
    if (_args.length > 2 || _args.length < 1){
        throw new Error(`Expected 1 argument but got ${_args.length}`);
    }

    const msg = _args.length > 1 ? (_args[1] as StringVal).value: "";
    console.assert((_args[0] as BooleanVal).value, msg);

    if (!(_args[0] as BooleanVal).value) {
        process.exit(1);
    }

    return MK_NULL();
}

export function sortFunction(_args: RuntimeVal[], _env: Environment):RuntimeVal {
    if (_args.length != 1){
        throw new Error("sort takes only 1 arg");
    }

    const numArr: number[] = new Array<number>();

    const runtimeArr = (_args[0] as ArrayVal).values;

    for (const rtval of runtimeArr){
        numArr.push((rtval as NumberVal).value);
    }

    const sortedArr = numArr.sort();
    const sortedRuntime = new Array<RuntimeVal>();

    for (const num of sortedArr){
        sortedRuntime.push(MK_NUMBER(num));
    }

    return MK_ARRAY(sortedRuntime);
}

export function runListener(_args: RuntimeVal[], _env: Environment): RuntimeVal {
    if (_args.length > 2) throw new Error("Listener expected 2 args got more");

    const app = express();

    const htmlCode = (_args[0] as StringVal).value;
    const portNum = (_args[1] as NumberVal).value;

    app.get('/', (req, res) =>
        res.send(htmlCode)
    );

    const port = process.env.PORT || portNum;

    app.listen(port, () => console.log(`Started server on http://localhost:${port}/`));

    return MK_NULL();
}
