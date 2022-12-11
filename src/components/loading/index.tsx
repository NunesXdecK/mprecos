import { StyleSheet, Text, View } from "react-native"

interface LoadingProps {
    children?: any | any[],
    isLoading: boolean,
}

export default function Loading(props: LoadingProps) {
    if (!props.isLoading) {
        return (<></>)
    }
    return (
        <View style={styles.container}>
            {props.children ?? <Text>Carregando...</Text>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
    },
    dataContainer: {
        flex: 1,
        padding: 8,
    },
})