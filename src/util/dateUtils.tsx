import { Product } from "../interfaces/interfaces"

export const ONLY_NUMBERS_PATTERN_TWO = /\D/g

export const handleSortByDate = (a: Product, b: Product) => {
    return b.date - a.date
}

export const handleNewDateToUTCOld = () => {
    return Date.parse(new Date().toUTCString())
}

export const handleNewDateToUTC = () => {
    var date = new Date();
    var now_utc = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(),
        date.getUTCDate(), date.getUTCHours(),
        date.getUTCMinutes(), date.getUTCSeconds());
    return now_utc
}

export const handleRemoveDateMask = (text: string) => {
    if (text) {
        try {
            text = text?.replaceAll("/", "").replaceAll(":", "").replaceAll(" ", "")
            text = text?.replace(new RegExp(ONLY_NUMBERS_PATTERN_TWO), "")
        } catch (err) {
            console.error(err)
        }
    }
    return text
}

export const handleGetDateFormatedToUTCFomB = (date: string) => {
    let dateUTC = 0
    try {
        if (date?.length > 8) {
            //"12072022841"
            const dateArray = date.split(" ")[0]
            const timeArray = date.split(" ")[1]
            const month = parseInt(dateArray.split("/")[0])
            const day = parseInt(dateArray.split("/")[1])
            const year = parseInt(dateArray.split("/")[2])
            const hour = parseInt(timeArray.split(":")[0])
            const minute = parseInt(timeArray.split(":")[1])
            const utcString = new Date(Date.UTC(year, month - 1, day, hour, minute)).toUTCString()
            dateUTC = Date.parse(utcString)
        }
    } catch (err) {
    }
    return dateUTC
}

export const handleFormatDateForShowB = (date: string) => {
    let dateEnd = ""
    try {
        if (date.length > 0) {
            const dateArray = date.split(" ")[0]
            const timeArray = date.split(" ")[1]
            const month = dateArray.split("/")[0]
            const day = dateArray.split("/")[1]
            const year = dateArray.split("/")[2]
            const hour = timeArray.split(":")[0]
            const minute = timeArray.split(":")[1]
            dateEnd =
                (hour.length === 1 ? "0" + hour : hour)
                + ":" +
                (minute.length === 1 ? "0" + minute : minute)
                + " de " +
                (day.length === 1 ? "0" + day : day)
                + "/" +
                (month.length === 1 ? "0" + month : month)
                + "/" +
                (year)
        }
    } catch (err) {
    }
    return dateEnd
}

export const handleGetDateFormatedToUTC = (date: string) => {
    let dateUTC = 0
    const dateText = handleRemoveDateMask(date)
    if (dateText?.length === 8) {
        const day = dateText.substring(0, 2)
        const month = dateText.substring(2, 4)
        const year = dateText.substring(4, dateText.length)
        const utcString = new Date(month + " " + day + " " + year).toUTCString()
        dateUTC = Date.parse(utcString)
    }
    return dateUTC
}

export const handleUTCToDate = (utc: string) => {
    return new Date(utc)
}

export const handleUTCToDateShow = (utc: string) => {
    let dateShow = "n/a"
    {/*
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    date.toLocaleString("en-US", { timeZone: tz })
*/}
    if (utc && utc !== "0") {
        const date = new Date(parseInt(utc))
        const month = (date.getMonth() + 1).toString().length > 1 ? (date.getMonth() + 1) : "0" + (date.getMonth() + 1)
        const day = date.getUTCDate().toString().length === 1 ? "0" + date.getUTCDate() : date.getUTCDate()
        dateShow = day + "/" + month + "/" + date.getFullYear()
    }
    return dateShow
}

export const handleUTCToDateFullShow = (utc: string) => {
    let dateShow = "n/a"
    {/*
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    date.toLocaleString("en-US", { timeZone: tz })
*/}
    if (utc && utc !== "0") {
        const date = new Date(parseInt(utc))
        const month = (date.getMonth() + 1).toString().length > 1 ? (date.getMonth() + 1) : "0" + (date.getMonth() + 1)
        const day = date.getUTCDate().toString().length === 1 ? "0" + date.getUTCDate() : date.getUTCDate()
        const hour = date.getHours().toString().length === 1 ? "0" + date.getHours() : date.getHours()
        const minute = date.getMinutes().toString().length === 1 ? "0" + date.getMinutes() : date.getMinutes()
        dateShow = hour + ":" + minute + " de " + day + "/" + month + "/" + date.getFullYear()
    }
    return dateShow
}