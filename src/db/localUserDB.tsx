import AsyncStorage from "@react-native-async-storage/async-storage"
import { Local } from "../interfaces/interfaces"

export const USER_LOCAL_KEY = "userlocal"

export const getUserLocalData = async () => {
    let local = null
    try {
        const jsonValue = await AsyncStorage.getItem(USER_LOCAL_KEY)
        const json = jsonValue != null ? JSON.parse(jsonValue) : null
        if (json?.short?.length > 0) {
            local = json
        }
    } catch (e) {
        // error reading value
    }
    return local
}

export const storeUserLocalData = async (value: Local) => {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem(USER_LOCAL_KEY, jsonValue)
    } catch (e) {
        // saving error
        return false
    }
    return true
}