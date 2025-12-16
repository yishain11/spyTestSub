const url = "https://spiestestserver.onrender.com"

export async function report(data) {
    return await fetch(`${url}/report?data=${JSON.stringify(data)}`).then(res => res.text())
}