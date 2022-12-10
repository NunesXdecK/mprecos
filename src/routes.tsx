import React from "react"
import Home from "./pages/Home"
import Product from "./pages/Product"
import Products from "./pages/Products"
import { StyleSheet } from "react-native"
import ScanBarCode from "./pages/ScanBarCode"
import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack"

type ProductParamList = {
    product: string,
}

type RootStackParamList = {
    home: undefined,
    scan: undefined,
    products: undefined,
    product: ProductParamList,
}

export type ScreenProp = NativeStackNavigationProp<RootStackParamList>;

const Stack = createNativeStackNavigator()

function Routes() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="home"
                component={Home}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="product"
                component={Product}
                options={{
                    title: "Produto",
                    headerTintColor: "#fff",
                    headerStyle: styles.header
                }}
            />
            <Stack.Screen
                name="products"
                component={Products}
                options={{
                    title: "Produtos",
                    headerTintColor: "#fff",
                    headerStyle: styles.header
                }}
            />
            <Stack.Screen
                name="scan"
                component={ScanBarCode}
                options={{
                    title: "Scan",
                    headerTintColor: "#fff",
                    headerStyle: styles.header
                }}
            />
        </Stack.Navigator>
    )
}

export default Routes

const styles = StyleSheet.create({
    header: {
        backgroundColor: "#232630",
    },
})