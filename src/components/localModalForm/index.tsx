import { useState } from "react"
import { storeLocalData } from "../../db/localDB"
import { defaultLocal, Local } from "../../interfaces/interfaces"
import { Alert, Button, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"

interface LocalModalFormProps {
    isOpen?: boolean,
    afterSave?: (arg0: Local) => void,
    setIsOpen?: (arg0: boolean) => void,
}


export default function LocalModalForm(props: LocalModalFormProps) {
    const [local, setLocal] = useState<Local>(defaultLocal)
    const handleSetName = (value: string) => { setLocal({ ...local, name: value }) }
    const handleSetShort = (value: string) => { setLocal({ ...local, short: value }) }
    const handleSetIsOpen = (value: boolean) => {
        if (props.setIsOpen) {
            props.setIsOpen(value)
        }
    }
    const handleAfterSave = (local: Local) => {
        if (props.afterSave) {
            props.afterSave(local)
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
                    <View style={styles.containerModal}>
                        <Text style={styles.title}>Local</Text>
                        <TextInput
                            value={local.name}
                            style={styles.input}
                            placeholder="Nome do local"
                            onChangeText={text => handleSetName(text)}
                        />
                        <TextInput
                            value={local.short}
                            style={styles.input}
                            placeholder="Abreviação do local"
                            onChangeText={text => handleSetShort(text)}
                        />
                        <Button
                            title="Salvar"
                            onPress={async () => {
                                if (local.name?.length === 0 || local.short?.length === 0) {
                                    Alert.alert("Algum dado está em branco.")
                                    return
                                }
                                await storeLocalData(local)
                                handleAfterSave(local)
                                handleSetIsOpen(false)
                                setLocal(defaultLocal)
                            }}
                        />
                    </View>
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