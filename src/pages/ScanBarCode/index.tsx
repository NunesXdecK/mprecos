import React, { useState, useEffect } from 'react'
import { BarCodeScanner } from 'expo-barcode-scanner'
import { Text, View, StyleSheet, ToastAndroid } from 'react-native'
import { getProductAllData, getProductByEanData } from '../../db/productDB'
import ProductModalForm from '../../components/projectModalForm'
import { defaultProduct, Product } from '../../interfaces/interfaces'
import Loading from '../../components/loading'
import { handleSortByDate } from '../../util/dateUtils'

interface BarCode {
  type?: any,
  data?: any,
}
const delay = (amount = 1000) => new Promise(resolve => setTimeout(resolve, amount))
export default function ScanBarCode() {
  const [list, setList] = useState<Product[]>([])
  const [product, setProduct] = useState<Product>(defaultProduct)
  const [hasPermission, setHasPermission] = useState<boolean | null>(null)
  const [scanned, setScanned] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync()
      setHasPermission(status === "granted")
    }
    getBarCodeScannerPermissions()

    if (isLoading && list.length === 0) {
      getProductAllData().then((res) => {
        setList(res)
        setIsLoading(false)
      })
    }
  }, [])

  const handleBarCodeScanned = async (barcode: BarCode) => {
    setIsLoading(true)
    ToastAndroid.show(barcode.data, ToastAndroid.SHORT)
    let listFinal: Product[] = []
    list.map((element, index) => {
      if (barcode.data?.toLowerCase() === element.ean?.toString().toLowerCase()) {
        listFinal = [...listFinal, element]
      }
    })
    listFinal = listFinal?.sort(handleSortByDate)
    const p: Product = {
      ...listFinal[0] ?? defaultProduct,
      ean: barcode.data,
      valueString: listFinal[0]?.value?.toString() ?? "0",
    }
    setProduct(p)
    setIsLoading(false)
    setScanned(true)
  }

  if (hasPermission === null) {
    return <Loading isLoading={true}><Text>Requesting for camera permission</Text></Loading>
  }
  if (hasPermission === false) {
    return <Loading isLoading={true}><Text>No access to camera</Text></Loading>
  }

  return (
    <View style={styles.container}>
      {!scanned && !isLoading &&
        <BarCodeScanner
          style={StyleSheet.absoluteFillObject}
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        />
      }
      <Loading isLoading={isLoading} />
      <ProductModalForm
        products={list}
        isOpen={scanned}
        product={product}
        onSet={setProduct}
        setIsOpen={setScanned}
        afterSave={(arg0) => {
          setScanned(false)
          setList([arg0, ...list])
          setProduct((old) => defaultProduct)
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dataContainer: {
    flex: 1,
    padding: 8,
  },
})