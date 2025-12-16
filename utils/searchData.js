import { loadData } from "./helpers.js"

export async function searchData(keyword, target = "people", type = "name") {
    console.log(`searching for ${keyword} in file: ${target} at key ${type}`);
    const data = JSON.parse(await loadData(target))
    const res = []
    for (const dataObj of data) {
        if (typeof dataObj[type] === "string") {
            if (dataObj[type].toLowerCase() === keyword.toLowerCase()) {
                res.push(dataObj)
            }
        } else {
            if (dataObj[type] === keyword) {
                res.push(dataObj)
            }
        }
    }
    if (res.length === 0) {
        console.log(`no results found`);
        return []
    } else {
        console.log("search results are: ", res);
        return res
    }
}
