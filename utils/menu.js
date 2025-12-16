import { question } from "readline-sync"
import { getData } from "./getData.js";
import { searchData } from "./searchData.js";
import { findDengarous } from "./findDeng.js";
import { report } from "./report.js";

export async function handleMenu() {
    let action = question("please enter action: 1 - load people\n2- load transcriptons \n 3 - search people by name\n 4- search people by age\n 5 - find dangerouse people\n")
    while (!["1", "2", "3", "4", "5"].includes(action)) {
        action = question("wrong input.\nplease enter action: 1 - load people\n2- load transcriptons \n 3 - search people by name\n 4- search people by age\n 5 - find dangerouse people")
    }
    switch (action) {
        case "1":
            await getData("people")
            break;
        case "2":
            await getData("transcriptions")
            break;
        case "3":
            const nameKeyword = question("please insert value to search (name): ")
            searchData(nameKeyword, "people", "name")
            break;
        case "4":
            let ageKeyword = question("please insert value to search (age): ")
            while (isNaN(parseInt(ageKeyword))) {
                ageKeyword = question("must be a number. please insert value to search (age): ")
            }
            searchData(parseInt(ageKeyword), "people", "age")
            break;
        case "5":
            const dangerouse = await findDengarous()
            const resp = await report(dangerouse)
            console.log(`resp: ${resp}`);
            break;

    }
}