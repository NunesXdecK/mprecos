import { Local } from "../interfaces/interfaces"
import AsyncStorage from "@react-native-async-storage/async-storage"

export const LOCAL_KEY = "local"

export const getLocalData = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem(LOCAL_KEY)
        return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
        // error reading value
    }
}

export const storeLocalData = async (value: Local) => {
    try {
        let before = []
        before = await getLocalData()
        if (before?.length > 0) {
            before = [...before, value]
        } else {
            before = [value]
        }
        const jsonValue = JSON.stringify(before)
        await AsyncStorage.setItem(LOCAL_KEY, jsonValue)
    } catch (e) {
        // saving error
        return false
    }
    return true
}