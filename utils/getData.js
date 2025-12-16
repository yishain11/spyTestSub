import { writeFile } from "node:fs/promises"

const url = "https://spiestestserver.onrender.com"

export async function getData(specificUrl) {
    try {
        const data = await fetch(`${url}/${specificUrl}`).then(res => res.text())
        writeFile(`./data/${specificUrl}.txt`, data).then(res => console.log(`ok`))
    } catch (error) {
        console.log(`error`, error);
    }
}
