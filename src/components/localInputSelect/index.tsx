import { useEffect, useState } from "react"
import LocalModalForm from "../localModalForm"
import { getLocalData } from "../../db/localDB"
import { Local } from "../../interfaces/interfaces"
import { handleSortByDate } from "../../util/dateUtils"
import { getUserLocalData, storeUserLocalData } from "../../db/localUserDB"
import { FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native"

interface LocalInputSelectProps {
    local?: Local | null,
    onSet?: (arg0: Local) => void,
    afterSave?: (arg0: Local) => void,
}

export default function LocalInputSelect(props: LocalInputSelectProps) {
    const [list, setList] = useState<Local[]>([])
    const [modalVisible, setModalVisible] = useState(false)
    const [formModalVisible, setFormModalVisible] = useState(false)

    const handleOnSet = (value: Local) => {
        if (props.onSet) {
            props.onSet(value)
        }
    }
    const handleAfterSave = (value: Local) => {
        if (props.afterSave) {
            props.afterSave(value)
        }
    }

    useEffect(() => {
        getUserLocalData().then((res) => {
            handleOnSet(res)
            handleAfterSave(res)
        })
        getLocalData().then((res) => {
            setList(res)
        })
    }, [])

    return (
        <View>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Text>{props.local?.short ?? "Onde você está?"}</Text>
            </TouchableOpacity>
            <LocalModalForm
                isOpen={formModalVisible}
                setIsOpen={setFormModalVisible}
                afterSave={async (arg0) => {
                    let value = [...list, arg0].sort(handleSortByDate)
                    setList(value)
                    handleOnSet(arg0)
                    await storeUserLocalData(arg0)
                    setFormModalVisible(false)
                    setModalVisible(false)
                }}
            />
            <Modal
                animationType="slide"
                visible={modalVisible}
            >
                <View style={styles.container}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => setModalVisible(false)}>
                            <Text style={styles.x}>X</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.containerModal}>
                        <TouchableOpacity onPress={() => setFormModalVisible(true)}>
                            <Text style={styles.listItem}>Novo local +</Text>
                        </TouchableOpacity>
                        <FlatList
                            data={list}
                            keyExtractor={(item: Local, index: number) => index + "-" + item.name + ", " + item.short}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    onPress={async () => {
                                        await storeUserLocalData(item)
                                        handleOnSet(item)
                                        setModalVisible(false)
                                    }}
                                >
                                    <Text style={styles.listItem}>{item.name + ", " + item.short}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </View>
            </Modal>
        </View>
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
    header: {
        flexDirection: "row-reverse",
    },
    listItem: {
        padding: 8,
        fontSize: 18,
    },
    x: {
        padding: 8,
        fontSize: 26,
    },
})