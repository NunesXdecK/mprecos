import { Text } from "react-native"
import React, { useEffect, useState } from "react"
import { getProductByEanData } from "../../db/productDB"
import { FlatList, StyleSheet, View } from "react-native"

interface ProductHistoryProps {
    ean?: string,
}

export default function ProductHistoryForm(props: ProductHistoryProps) {
    const [list, setList] = useState([])
    useEffect(() => {
        getProductByEanData(props.ean ?? "").then((res) => {
            if (res.length > 0) {
                setList(res)
            }
        })
    }, [])
    return (
        <FlatList
            data={list}
            keyExtractor={(item) => item.name + "-" + item.ean + "-" + item.date + "-" + item.date}
            renderItem={({ item }) => (
                <View style={styles.container}>
                    <Text style={styles.title}>{item.name}</Text>
                    <Text style={styles.info}>{
                        (item.ean?.toString().length > 0 ? "Codigo " + item.ean + " " : "") +
                        (item.value?.toString().length > 0 ? "com valor de " + item.value?.toFixed(2) + " " : "") +
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