import { loadData } from "./helpers.js"
import { searchData } from "./searchData.js"

const badWords = ["death", "knife", "bomb", "attack"]

export async function findDengarous() {
    const avgByAge = {}
    const dangerByAge = {}
    const transcriptions = JSON.parse(await loadData("transcriptions"))
    for (const element of transcriptions) {
        const age = element.age
        const dangerScore = calcDanger(element.content)
        if (dangerScore) {
            if (!(age in dangerByAge)) {
                dangerByAge[age] = []
            }
            dangerByAge[age].push(dangerScore)
        }
    }
    // calc avg
    for (const age in dangerByAge) {
        if (!Object.hasOwn(dangerByAge, age)) continue;
        if (!(age in avgByAge)) {
            avgByAge[age] = 0
        }
        const avg = (dangerByAge[age].reduce((acc, current) => { return acc + current })) / dangerByAge[age].length
        avgByAge[age] = avg
    }
    // get top 3
    let arr = Object.keys(avgByAge).map((key) => [key, avgByAge[key]]);;
    arr.sort((a, b) => {
        return b[1] - a[1]
    })
    const top3Dangerous = arr.slice(0, 3)
    // find peaple matching the age
    let peopleDangerous = []
    for (const danArr of top3Dangerous) {
        const ageToFind = parseInt(danArr[0])
        const peopleFound = await searchData(ageToFind, "people", "age")
        peopleDangerous = peopleDangerous.concat(peopleFound)
    }
    return peopleDangerous
}

export function calcDanger(content) {
    const splittedContent = content.split(" ")
    let dangerScore = 0
    for (const word of splittedContent) {
        if (badWords.includes(word.toLowerCase())) {
            dangerScore += 1
        }
    }
    return dangerScore
}