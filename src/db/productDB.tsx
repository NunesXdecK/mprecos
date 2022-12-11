import data from "../data/data.json"
import { Local, Product } from "../interfaces/interfaces"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { handleFormatDateForShowB, handleGetDateFormatedToUTCFomB, handleSortByDate } from "../util/dateUtils"

export const PRODUCT_KEY = "product"

export const handleData = async (): Promise<Product[]> => {
    let value: Product[] = []
    const local: Local = { name: "Comercial Rodrigues", short: "CORO" }
    data.map((element, index) => {
        let ean = 0
        if (parseInt(element.barras)) {
            ean = parseInt(element.barras)
        }
        const localProduct: Product = {
            ean: ean,
            local: local,
            value: element.valor,
            name: element.produto,
            date: handleGetDateFormatedToUTCFomB(element.date),
            dateString: handleFormatDateForShowB(element.date),
        }
        value = [...value, localProduct]
    })
    return value
}

export const getProductAllData = async (): Promise<Product[]> => {
    let value: Product[] = await handleData()
    try {
        const jsonValue = await AsyncStorage.getItem(PRODUCT_KEY)
        const array: Product[] = jsonValue != null ? JSON.parse(jsonValue) : []
        value = [...value, ...array]
        value = value.sort(handleSortByDate)
    } catch (e) {
        // error reading value
    }
    return value
}

export const getProductData = async () => {
    let value = []
    try {
        const jsonValue = await AsyncStorage.getItem(PRODUCT_KEY)
        value = jsonValue != null ? JSON.parse(jsonValue) : []
        value = value.sort(handleSortByDate)
    } catch (e) {
        // error reading value
    }
    return value
}

export const getProductByEanData = async (ean: string) => {
    let value: Product[] = []
    try {
        if (ean.length > 0 && ean !== "0") {
            const allProducs = await getProductAllData()
            allProducs.map((element, index) => {
                if (ean.toLowerCase() === element.ean?.toString().toLowerCase()) {
                    value = [...value, element]
                }
            })
            value = value.sort(handleSortByDate)
        }
    } catch (e) {
        // error reading value
    }
    return value
}

export const storeProductData = async (value: Product) => {
    try {
        let before: any[] = []
        before = await getProductData()
        if (before?.length > 0) {
            before = [...before, value]
        } else {
            before = [value]
        }
        const jsonValue = JSON.stringify(before)
        await AsyncStorage.setItem(PRODUCT_KEY, jsonValue)
    } catch (e) {
        // saving error
        return false
    }
    return true
}