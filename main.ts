import Parser from "./frontend/parser";
import promptSync from 'prompt-sync';
import {evaluate} from "./runtime/interpreter";
import {createGlobalEnv} from "./runtime/environment";
import {readFileSync} from "fs";

// repl();
run("./file.nv");

function run(filename: string){
    const parser = new Parser();
    const env = createGlobalEnv();

    if (!filename.endsWith(".nv")){
        console.error("File name must end with a '.nv' extension.");
        process.exit(1);
    }

    const input = readFileSync(filename,  "utf-8");
    const program = parser.produceAST(input);
    const results = evaluate(program, env);

    // console.log(results);
}

function repl() {
    const parser = new Parser();
    const env = createGlobalEnv();

    const prompt = promptSync();

    console.log("Repl v0.1");

    while (true) {

        const input = prompt("> ");

        if (!input || input.includes("exit")){
            process.exit(1);
        }

        const program = parser.produceAST(input);

        const result = evaluate(program, env);
        console.log(result)

    }
}
