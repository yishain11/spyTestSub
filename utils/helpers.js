import { readFile } from "node:fs/promises"

export async function loadData(type = "people") {
    return await readFile(`./data/${type.toUpperCase()}.json`)
}