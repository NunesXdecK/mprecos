import React from "react"
import { Text } from "react-native"
import { Product } from "../../interfaces/interfaces"
import { FlatList, StyleSheet, View } from "react-native"

interface ProductHistoryProps {
    ean?: string,
    products?: Product[],
}

export default function ProductHistoryForm(props: ProductHistoryProps) {
    const list = props.products?.filter((product: Product) => {
        return props.ean?.toString().toLowerCase() === product?.ean?.toString().toLowerCase()
    }) ?? []
    return (
        <FlatList
            data={list}
            keyExtractor={(item) => item.name + "-" + item.ean + "-" + item.date + "-" + item.date}
            renderItem={({ item }) => (
                <View style={styles.container}>
                    <Text style={styles.title}>{item.name}</Text>
                    <Text style={styles.info}>{
                        (item.ean?.toString().length > 0 ? "Codigo " + item.ean + " " : "") +
                        (item.value?.toString().length > 0 ? "com valor de " + item.value + " " : "") +
                        (item.local?.name?.length > 0 ? "no " + item.local?.name + " " : "") +
                        (item.dateString?.length > 0 ? "em " + item.dateString : "")
                    }</Text>
                </View>
            )}
        />
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 8,
    },
    title: {
        fontSize: 18,
    },
    info: {
        fontSize: 10,
        paddingVertical: 4,
    },
})