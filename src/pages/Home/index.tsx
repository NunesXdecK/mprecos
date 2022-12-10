import React, { useState } from "react"
import { ScreenProp } from "../../routes"
import * as Clipboard from "expo-clipboard"
import { Feather } from "@expo/vector-icons"
import { Local } from "../../interfaces/interfaces"
import { USER_LOCAL_KEY } from "../../db/localUserDB"
import { useNavigation } from "@react-navigation/native"
import { getLocalData, LOCAL_KEY } from "../../db/localDB"
import { getProductData, PRODUCT_KEY } from "../../db/productDB"
import LocalInputSelect from "../../components/localInputSelect"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Text, StyleSheet, SafeAreaView, View, TouchableOpacity, Button, Alert } from "react-native"

export const handleCleanDB = async () => {
  try {
    await AsyncStorage.setItem(LOCAL_KEY, "[]")
    await AsyncStorage.setItem(PRODUCT_KEY, "[]")
    await AsyncStorage.setItem(USER_LOCAL_KEY, "[]")
  } catch (e) {
    // error reading value
  }
}

export default function Home() {
  const navigation = useNavigation<ScreenProp>()
  const [local, setLocal] = useState<Local | null>(null)
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.name}>MPreços</Text>
        <LocalInputSelect
          local={local}
          onSet={setLocal}
          afterSave={(arg0) => setLocal((old) => arg0)}
        />
      </View>
      {local !== null &&
        <>
          <View style={styles.actionBar}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("scan")}
            >
              <Feather name="camera" size={24} color="#FFF" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("products")}
            >
              <Feather name="search" size={24} color="#FFF" />
            </TouchableOpacity>
          </View>
          <View style={styles.container}>
            <Button
              title="Copiar banco"
              onPress={async () => {
                const products = await getProductData()
                const locals = await getLocalData()
                await Clipboard.setStringAsync(JSON.stringify([products, locals]))
                Alert.alert("copiado")
              }}
            />
            {/*
            <Button
              title="Limpar banco"
              onPress={async () => {
                setLocal(null)
                handleCleanDB()
              }}
            />
              */}
          </View>
        </>
      }
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 18,
    marginBottom: 24,
    marginHorizontal: 18,
  },
  actionBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
  },
  button: {
    backgroundColor: "#FFF",
    padding: 30,
  },
  name: {
    fontSize: 28,
    color: "#FFF",
    fontWeight: "bold",
  },
  title: {
    fontSize: 24,
  }
})