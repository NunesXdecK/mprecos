import React, { useState } from "react"
import { StyleSheet } from "react-native"
import { useRoute } from "@react-navigation/native"
import ProductForm from "../../components/productForm"
import { defaultProduct } from "../../interfaces/interfaces"

export interface ProductLocal {
  date: string,
  barras: string,
  produto: string,
  valor: number,
}

export const defaultProductLocal: ProductLocal = {
  date: "",
  barras: "",
  produto: "",
  valor: 0,
}

export default function Product() {
  const route = useRoute()
  const [p, setP] = useState(route?.params?.product ?? defaultProduct)
  return (
    <ProductForm
      product={p}
      onSet={setP}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
  data: {
    fontSize: 16,
  },
})