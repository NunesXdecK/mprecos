import React, { useState, useEffect } from 'react'
import { BarCodeScanner } from 'expo-barcode-scanner'
import { Text, View, StyleSheet } from 'react-native'
import { getProductByEanData } from '../../db/productDB'
import ProductModalForm from '../../components/projectModalForm'
import { defaultProduct, Product } from '../../interfaces/interfaces'

interface BarCode {
  type?: any,
  data?: any,
}
const delay = (amount = 1000) => new Promise(resolve => setTimeout(resolve, amount))
export default function ScanBarCode() {
  const [product, setProduct] = useState<Product>(defaultProduct)
  const [hasPermission, setHasPermission] = useState<boolean | null>(null)
  const [scanned, setScanned] = useState(false)

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync()
      setHasPermission(status === "granted")
    }

    getBarCodeScannerPermissions()
  }, [])

  const handleBarCodeScanned = async (barcode: BarCode) => {
    const list = await getProductByEanData(barcode.data)
    const p: Product = {
      ...list[0] ?? defaultProduct,
      ean: barcode.data,
      valueString: list[0]?.value?.toString() ?? "0",
    }
    setProduct(p)
    setScanned(true)
  }

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>
  }

  return (
    <View style={styles.container}>
      {!scanned &&
        <BarCodeScanner
          style={StyleSheet.absoluteFillObject}
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        />
      }
      <ProductModalForm
        isOpen={scanned}
        product={product}
        onSet={setProduct}
        setIsOpen={setScanned}
        afterSave={(arg0) => {
          setScanned(false)
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