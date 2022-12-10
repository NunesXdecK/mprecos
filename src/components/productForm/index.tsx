import { useState } from "react"
import { storeProductData } from "../../db/productDB"
import ProductHistoryForm from "../productHistoryForm"
import { getUserLocalData } from "../../db/localUserDB"
import { defaultProduct, Product } from "../../interfaces/interfaces"
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native"
import { handleNewDateToUTC, handleUTCToDateFullShow } from "../../util/dateUtils"

interface ProductFormProps {
    isOpen?: boolean,
    product?: Product,
    onSet?: (arg0: Product) => void,
    afterSave?: (arg0: Product) => void,
    setIsOpen?: (arg0: boolean) => void,
}

export default function ProductForm(props: ProductFormProps) {
    const [box, setBox] = useState<string>("")
    const [unit, setUnit] = useState<string>("")
    const handleSetName = (value: string) => { handleOnSet({ ...props.product, name: value }) }
    const handleSetEan = (value: string) => {
        let final = 0
        if (parseInt(value)) {
            final = parseInt(value)
        }
        handleOnSet({ ...props.product, ean: final })
    }
    const handleSetValue = (value: string) => {
        handleOnSet({ ...props.product, valueString: value })
    }
    const handleOnSet = (value: Product) => {
        if (props.onSet) {
            props.onSet(value)
        }
    }
    const handleSetIsOpen = (value: boolean) => {
        if (props.setIsOpen) {
            props.setIsOpen(value)
        }
    }
    const handleAfterSave = (value: Product) => {
        if (props.afterSave) {
            props.afterSave(value)
        }
    }
    const getUnitValue = () => {
        let unitLocal = 0
        let valueLocal = 0
        if (parseFloat(unit)) {
            unitLocal = parseFloat(unit)
        }
        if (parseFloat(props.product?.valueString)) {
            valueLocal = parseFloat(props.product?.valueString)
        }
        return unitLocal * valueLocal
    }
    const getBoxValue = () => {
        let boxLocal = 0
        let valueLocal = 0
        if (parseFloat(box)) {
            boxLocal = parseFloat(box)
        }
        if (parseFloat(props.product?.valueString)) {
            valueLocal = parseFloat(props.product?.valueString)
        }
        return boxLocal / valueLocal
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Product</Text>
            <TextInput
                placeholder="EAN"
                style={styles.input}
                keyboardType="numeric"
                value={props.product?.ean?.toString()}
                onChangeText={text => handleSetEan(text)}
            />
            <TextInput
                placeholder="Nome"
                style={styles.input}
                value={props.product?.name}
                onChangeText={text => handleSetName(text)}
            />
            <TextInput
                placeholder="Valor"
                style={styles.input}
                keyboardType="numeric"
                value={props.product?.valueString}
                onChangeText={text => handleSetValue(text)}
            />
            <View style={styles.row}>
                <TextInput
                    value={unit}
                    keyboardType="numeric"
                    placeholder="Multiplicar"
                    style={styles.inputNumeric}
                    onChangeText={text => setUnit(text)}
                />
                <Text> x {props.product?.valueString} = {getUnitValue()}</Text>
            </View>
            <View style={styles.row}>
                <TextInput
                    value={box}
                    placeholder="Dividir"
                    keyboardType="numeric"
                    style={styles.inputNumeric}
                    onChangeText={text => setBox(text)}
                />
                <Text> / {props.product?.valueString} = {getBoxValue()}</Text>
            </View>
            <Button
                title="Salvar"
                onPress={async () => {
                    if (props.product?.name?.length === 0 || props.product?.ean?.toString().length === 0) {
                        Alert.alert("Algum dado está em branco.")
                        return
                    }
                    if (props.product) {
                        const date = handleNewDateToUTC()
                        const local = await getUserLocalData()
                        let final = 0
                        if (props.product?.valueString?.length > 0 && parseFloat(props.product.valueString)) {
                            final = parseFloat(props.product.valueString)
                        }
                        let product = {
                            ...props.product,
                            date: date,
                            local: local,
                            value: final,
                            dateString: handleUTCToDateFullShow(date.toString()),
                        }
                        if (product.valueString) {
                            delete product.valueString
                        }
                        await storeProductData(product)
                        handleAfterSave(product)
                        handleOnSet(defaultProduct)
                        handleSetIsOpen(false)
                    }
                }}
            />
            <ProductHistoryForm ean={props.product?.ean?.toString()} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 12,
    },
    row: {
        paddingVertical: 4,
        alignItems: "center",
        flexDirection: "row",
    },
    title: {
        fontSize: 26,
    },
    input: {
        borderRadius: 6,
        marginVertical: 4,
        paddingVertical: 16,
        paddingHorizontal: 20,
        backgroundColor: "#000",
    },
    inputNumeric: {
        flex: 1,
        borderRadius: 6,
        paddingVertical: 2,
        paddingHorizontal: 4,
    },
})