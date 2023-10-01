import "react-native-gesture-handler";
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import React, { useState, useRef } from 'react';
import { View, TextInput, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Text, Button, FAB, Snackbar } from 'react-native-paper';
import { todoAdded, todoDelete } from '../Redux/tasksReducer';
import { Ionicons, Feather, AntDesign, EvilIcons } from '@expo/vector-icons';
import RoundCheckbox from 'rn-round-checkbox';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';


function TodoCard(props) {

    const [checked, setChecked] = useState(props.status);
    const [visible, setVisible] = React.useState(false);

    const onToggleSnackBar = () => setVisible(!visible);

    const onDismissSnackBar = () => setVisible(false);
    const dispatch = useDispatch();

    const DeleteTask = () => {
        Alert.alert('Task will be deleted in 10 seconds')
        setVisible(true);
        setTimeout(() => {
            dispatch(todoDelete(props.index));
            setVisible(false);
            console.log('Code executed after 10 seconds');
        }, 10000);
    };

    return (<View style={{
        flexDirection: 'row',
        alignItems: 'center'
    }}>
        <View style={{
            backgroundColor: "#fff0e5",
            height: 60,
            width: 60,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 10
        }}>
            <Image style={{
                height: 40,
                width: 40
            }} source={require('../assets/tent.png')} />
        </View>

        <View style={{
            marginLeft: 15
        }}>
            <Text variant='bodyLarge' style={{
                fontWeight: 'bold'
            }}>{props.title}</Text>
            <Text variant='labelMedium' style={{
                color: "#a7aeb6",
                marginTop: 5
            }}>{props.currentDate.getDate()}-{props.currentDate.getMonth()}-{props.currentDate.getFullYear()}</Text>
        </View>
        <Spacer />
        <RoundCheckbox
            size={24}
            style={{ justifyContent: 'center', alignItems: 'center' }}
            backgroundColor='#ff7f51'
            checked={checked}
            onValueChange={(newValue) => {
                console.log(newValue)
                setChecked(newValue);
                if (newValue === true) {
                    DeleteTask();
                }
            }}
        />
    </View>);
}


export default function Home() {

    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const data = useSelector((state) => state.todos);
    const dispatch = useDispatch();
    const len = data.length;
    const [text, setText] = useState("");
    const [task, setTask] = useState("");
    const [BSOpen, setBSOpen] = useState(false);
    const currentDate = new Date();

    const bottomSheetModalRef = useRef(null);

    const handlePresentPress = () => {
        bottomSheetModalRef.current?.present();
        setBSOpen(true);
    }
    const snapPoints = ["45%", "55%"]

    const AddTask = () => {
        const val = { id: len, task: task, status: false };
        dispatch(todoAdded(val));
        bottomSheetModalRef.current?.dismiss();
        setBSOpen(false);
    }

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <BottomSheetModalProvider>
                <View style={{ backgroundColor: '#4263ec', flex: 1, paddingTop: 28 }}>
                    {BSOpen && <View style={{
                        position: 'absolute', backgroundColor: 'black', top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        opacity: 0.6
                    }}></View>}
                    <View style={{ flexDirection: 'row', paddingHorizontal: 20 }}>
                        <Ionicons name="menu-outline" size={20} color="#fff" />
                        <Spacer />
                        <Feather name="bell" size={20} color="#fff" style={{ marginRight: 10 }} />
                        <AntDesign name="user" size={20} color="#fff" />
                    </View>

                    <Text variant='headlineSmall' style={{ color: '#fff', marginTop: 20, paddingHorizontal: 20 }} >Hello,</Text>
                    <Text variant='headlineLarge' style={{ color: '#fff', fontWeight: 'bold', paddingHorizontal: 20 }}>Peter Waha Park Kar</Text>

                    <View style={{ marginHorizontal: 20, marginTop: 20, flexDirection: 'row', backgroundColor: '#2b49c3', padding: 12, borderRadius: 25, alignItems: 'center' }}>
                        <TextInput
                            placeholder='Search'
                            style={{ flex: 1 }}
                            onChangeText={val => setText(val)}
                            placeholderTextColor="#7085d6"
                            cursorColor="#7085d6"
                        />
                        <EvilIcons name="search" size={24} color="#7085d6" />
                    </View>

                    <View style={{ marginTop: 35, paddingHorizontal: 20, paddingTop: 30, backgroundColor: '#fff', flex: 1, borderTopLeftRadius: 50 }}>
                        <Text variant='titleLarge' style={{ fontWeight: 'bold' }}>{daysOfWeek[currentDate.getDay()]}</Text>
                        <View style={{ marginBottom: 20, height: 5, backgroundColor: '#ff7f51', width: 35, borderRadius: 2.5, marginTop: 5 }}></View>

                        <ScrollView showsVerticalScrollIndicator={false}>
                            {data.map((item, index) => {
                                return (
                                    <TodoCard currentDate={currentDate} title={item.task} status={item.status} index={index} />)
                            })}
                        </ScrollView>

                        <BottomSheetModal backgroundStyle={{ backgroundColor: '#4263ec', borderRadius: 50 }} ref={bottomSheetModalRef} snapPoints={snapPoints} index={0} onDismiss={() => setBSOpen(false)}>
                            <View style={{ padding: 20 }}>
                                <Text variant='titleLarge' style={{ fontWeight: 'bold', color: '#fff' }}>Add Task</Text>
                                <View style={{ marginBottom: 20, height: 5, backgroundColor: '#ff7f51', width: 35, borderRadius: 2.5, marginTop: 5 }}></View>

                                <View>
                                    <Text variant="bodyLarge" style={{ color: '#fff', fontWeight: 'bold' }}>Task</Text>
                                    <View style={{ marginTop: 10, flexDirection: 'row', backgroundColor: '#2b49c3', padding: 12, borderRadius: 25, alignItems: 'center' }}>
                                        <TextInput
                                            placeholder='Enter task'
                                            style={{ flex: 1, color: '#fff' }}
                                            onChangeText={val => setTask(val)}
                                            cursorColor="#7085d6"
                                        />
                                    </View>
                                </View>

                                <View style={{ marginTop: 20 }}>
                                    <Text variant="bodyLarge" style={{ color: '#fff', fontWeight: 'bold', marginBottom: 10 }}>Select Catogory</Text>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <TouchableOpacity onPress={() => console.log("Pressed")}>
                                            <View style={{
                                                backgroundColor: "#fff0e5",
                                                height: 60,
                                                width: 60,
                                                borderRadius: 10,
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                marginBottom: 10
                                            }}>
                                                <Image style={{
                                                    height: 40,
                                                    width: 40
                                                }} source={require('../assets/coffee.png')} />
                                            </View>
                                        </TouchableOpacity>

                                        <TouchableOpacity onPress={() => console.log("Pressed")}>
                                            <View style={{
                                                backgroundColor: "#fff0e5",
                                                height: 60,
                                                width: 60,
                                                borderRadius: 10,
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                marginBottom: 10
                                            }}>
                                                <Image style={{
                                                    height: 40,
                                                    width: 40
                                                }} source={require('../assets/tent.png')} />
                                            </View>
                                        </TouchableOpacity>

                                        <TouchableOpacity onPress={() => console.log("Pressed")}>
                                            <View style={{
                                                backgroundColor: "#fff0e5",
                                                height: 60,
                                                width: 60,
                                                borderRadius: 10,
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                marginBottom: 10
                                            }}>
                                                <Image style={{
                                                    height: 40,
                                                    width: 40
                                                }} source={require('../assets/laptop.png')} />
                                            </View>
                                        </TouchableOpacity>

                                        <TouchableOpacity onPress={() => console.log("Pressed")}>
                                            <View style={{
                                                backgroundColor: "#fff0e5",
                                                height: 60,
                                                width: 60,
                                                borderRadius: 10,
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                marginBottom: 10
                                            }}>
                                                <Image style={{
                                                    height: 40,
                                                    width: 40
                                                }} source={require('../assets/notepad.png')} />
                                            </View>
                                        </TouchableOpacity>
                                    </View>

                                    <Button style={{ marginTop: 30, backgroundColor: "#ff7f51", width: '50%', height: 50, alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }} textColor="#fff" mode="contained"
                                        onPress={AddTask}>
                                        ADD TASK
                                    </Button>
                                </View>
                            </View>
                        </BottomSheetModal>

                        <FAB
                            icon="plus"
                            size='medium'
                            mode='elevated'
                            color='#fff'
                            style={{
                                position: 'absolute',
                                margin: 16,
                                right: 0,
                                bottom: 0,
                                backgroundColor: '#ff7f51'
                            }}
                            onPress={handlePresentPress}
                        />

                        {BSOpen && <View style={{
                            position: 'absolute', backgroundColor: 'black', top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            opacity: 0.6,
                            borderTopLeftRadius: 50
                        }}></View>}
                    </View>

                </View>
            </BottomSheetModalProvider>
        </GestureHandlerRootView>
    );
}

function Spacer() {
    return <View style={{ flex: 1 }}></View>;
}

