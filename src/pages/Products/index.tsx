import Loading from "../../components/loading"
import React, { useEffect, useState } from "react"
import { getProductAllData } from "../../db/productDB"
import { handleSortByDate } from "../../util/dateUtils"
import ProductModalForm from "../../components/projectModalForm"
import { defaultProduct, Product } from "../../interfaces/interfaces"
import { Text, TextInput, View, StyleSheet, FlatList, TouchableOpacity, Button } from "react-native"

const delay = (amount = 1000) => new Promise(resolve => setTimeout(resolve, amount))

export default function Products() {
  const [product, setProduct] = useState<Product>(defaultProduct)
  const [isLoading, setIsLoading] = useState<boolean>(true)
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
    if (isLoading && list.length === 0) {
      getProductAllData().then((res) => {
        setList(res)
        setIsLoading(false)
      })
    }
  }, [])

  return (
    <View style={styles.container}>
      <Loading isLoading={isLoading} />
      <ProductModalForm
        isOpen={isCad}
        products={list}
        product={product}
        onSet={setProduct}
        setIsOpen={setIsCad}
        afterSave={(arg0) => {
          setList([arg0, ...list])
          setIsCad(false)
        }}
      />
      {!isLoading &&
        <>
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
                  setProduct({ ...item, valueString: item.value?.toString() })
                  setIsCad(true)
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
        </>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
  },
  input: {
    borderRadius: 6,
    marginVertical: 10,
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: "#000",
  },
  listItem: {
    paddingVertical: 10,
  },
})