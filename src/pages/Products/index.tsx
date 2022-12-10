import React, { useEffect, useState } from "react"
import { defaultProduct, Product } from "../../interfaces/interfaces"
import { getProductAllData } from "../../db/productDB"
import { handleSortByDate } from "../../util/dateUtils"
import ProductModalForm from "../../components/projectModalForm"
import { Text, TextInput, View, StyleSheet, FlatList, TouchableOpacity, Button } from "react-native"

export default function Products() {
  const [product, setProduct] = useState<Product>(defaultProduct)
  const [isCad, setIsCad] = useState<boolean>(false)
  const [search, setSearch] = useState("")
  const [list, setList] = useState<Product[]>([])
  let filteredList: Product[] = []
  if (list.length > 0) {
    filteredList = list.filter((item) => {
      return item.name?.toLowerCase().includes(search?.toLowerCase())
        || item.ean?.toString().toLowerCase().includes(search?.toLowerCase())
    })
    filteredList = filteredList.sort((a, b) => {
      return a?.name.localeCompare(b?.name)
    })
    filteredList = filteredList.sort(handleSortByDate)
  }

  useEffect(() => {
    if (list.length === 0) {
      getProductAllData().then((res) => {
        setList(res)
      })
    }
  }, [])

  return (
    <View style={styles.container}>
      <Button
        title="novo"
        onPress={() => {
          setProduct(defaultProduct)
          setIsCad(true)
        }}
      />
      <TextInput
        value={search}
        style={styles.input}
        placeholder="Pesquisa..."
        onChangeText={text => setSearch(text)}
      />
      <FlatList
        data={filteredList}
        keyExtractor={(item) => item.name + "-" + item.ean + "-" + item.date + "-" + item.date}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.listItem}
            onPress={() => {
              setIsCad(true)
              setProduct({ ...item, valueString: item.value?.toString() })
            }}
          >
            <Text>
              {
                (item.ean?.toString().length > 0 ? "EAN: " + item.ean : "") +
                (item.name?.length > 0 ? "\nNome: " + item.name : "") +
                (item.value?.toString().length > 0 ? "\nValor: " + item.value : "") +
                (item.dateString?.length > 0 ? "\nData: " + item.dateString : "") +
                (item.local?.name?.length > 0 ? "\nLocal: " + item.local?.name : "") +
                (item.local?.short?.length > 0 ? " - " + item.local?.short : "")
              }
            </Text>
          </TouchableOpacity>
        )}

      />
      <ProductModalForm
        isOpen={isCad}
        product={product}
        onSet={setProduct}
        setIsOpen={setIsCad}
        afterSave={(arg0) => {
          setList([arg0, ...list])
          setIsCad(false)
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
  title: {
    fontSize: 24,
  },
  input: {
    borderRadius: 6,
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: "#000",
  },
  listItem: {
    padding: 16,
  },
})