import { rl } from "./main";
import fs from "fs";
import path from "path";

const commandsList = ["echo", "type", "exit"];

function processCommand(userInput: string): [string, ...string[]] {
    if (userInput.length === 0) return ["", ...[""]];

    const [command, ...args] = userInput.split(" ");
    return [command, ...args];
}

export function echo(args: string[]): void {
    if (args.length === 0) return;
    rl.write(`${args.join(" ")}` + `\n`);
}

export function type(args: string[]): boolean {
    if (commandsList.includes(args[0])) {
        rl.write(`${args[0]} is a shell builtin\n`);
        return true;
    }

    const pathEnv = process.env.PATH;
    const existingPaths = pathEnv!.split(":");

    for (const directory of existingPaths) {
        const filePath = path.join(directory, args[0]);

        if (fs.existsSync(filePath)) {
            rl.write(`${args[0]} is ${filePath} \n`);
            return true;
        }
    }

    return false;
}

export default processCommand;
