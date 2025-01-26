const sizes = ["GB", "TB", "PB", "EB", "ZB", "YB"];

export function formatBytes(gigabytes: number, decimals = 1) {
    let formatted = gigabytes
    let unitIndex = 0
    while (formatted > 1000) {
        formatted /= 1000
        unitIndex++
    } 

    let rounded = Math.round(formatted * Math.pow(10, decimals)) / Math.pow(10, decimals);
    return `${rounded} ${sizes[unitIndex]}`
}

export function numberCommas(x: number) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}