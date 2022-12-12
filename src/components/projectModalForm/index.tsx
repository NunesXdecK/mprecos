import ProductForm from "../productForm"
import { Product } from "../../interfaces/interfaces"
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native"

interface ProductModalFormProps {
    isOpen?: boolean,
    product?: Product,
    products?: Product[],
    onSet?: (arg0: Product) => void,
    afterSave?: (arg0: Product) => void,
    setIsOpen?: (arg0: boolean) => void,
}

export default function ProductModalForm(props: ProductModalFormProps) {
    const handleSetIsOpen = (value: boolean) => {
        if (props.setIsOpen) {
            props.setIsOpen(value)
        }
    }
    const handleSetProduct = (value: Product) => {
        if (props.onSet) {
            props.onSet(value)
        }
    }
    const handleAfterSave = (product: Product) => {
        if (props.afterSave) {
            props.afterSave(product)
        }
    }

    return (
        <Modal
            animationType="slide"
            visible={props.isOpen}
        >
            {props.isOpen &&
                <View style={styles.container}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => handleSetIsOpen(false)}>
                            <Text style={styles.x}>X</Text>
                        </TouchableOpacity>
                    </View>
                    <ProductForm
                        product={props.product}
                        onSet={handleSetProduct}
                        products={props.products}
                        afterSave={(arg0) => {
                            handleAfterSave(arg0)
                            handleSetIsOpen(false)
                        }}
                    />
                </View>
            }
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 8,
    },
    containerModal: {
        padding: 12,
    },
    title: {
        fontSize: 26,
    },
    header: {
        flexDirection: "row-reverse",
    },
    x: {
        padding: 8,
        fontSize: 26,
    },
    input: {
        borderRadius: 6,
        marginVertical: 4,
        paddingVertical: 16,
        paddingHorizontal: 20,
        backgroundColor: "#000",
    },
})