import React from 'react';
import {
    Share,
    TouchableOpacity,
    View,
    Text,
    StyleSheet,
    Modal,
    Dimensions,
    CameraRoll,
    Linking
} from 'react-native';
import { Font, takeSnapshotAsync, Permissions } from 'expo';
import { Icon, Button } from 'react-native-elements';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
    'window'
);

export class DetailModal extends React.Component {
    state = {
        fontLoaded: false,
        currentColor: '#f04243',
        colors: [
            '#f04243',
            '#1257a4',
            '#9f5590',
            '#5458de',
            '#93c54a',
            '#ed658b',
            '#3dbbc7',
        ]
    };

    constructor(props) {
        super(props);
        this._renderBox.bind(this);
        this._saveToCameraRollAsync.bind(this);
    }

    async componentWillMount() {
        await Font.loadAsync({
            poiretOne: require('../assets/fonts/PoiretOne-Regular.ttf'),
        });
        this.setState({ fontLoaded: true });
        const { status } = await Permissions.getAsync(Permissions.CAMERA_ROLL);
        if (status !== 'granted') {
            await Permissions.askAsync(Permissions.CAMERA_ROLL);
        }

    }

    _shareText(text) {
        Share.share({
            message: text,
        });
    }

    _saveToCameraRollAsync = async () => {

        let result = await takeSnapshotAsync(this._container, {
            format: 'jpg',
            result: 'file',
        });
        let saveResult = await CameraRoll.saveToCameraRoll(result, 'photo');
        Linking.openURL(saveResult);

    };

    _closed() {
        <View style={styles.closes}>
            <TouchableOpacity
                onPress={() => this.props.closes()}>
                <Icon
                    name='close'
                    color='#000'
                />
            </TouchableOpacity>
        </View>
    }
    _renderTextBox() {
        return (
            <View>
                <View ref={view => {
                    this._container = view;
                }} style={[styles.textBox, { backgroundColor: this.state.currentColor }]}>
                    <Text style={styles.text}> {this.props.text}</Text>

                </View>
                <View style={{ height: 60, marginTop: 10 }}>
                    <View
                        style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
                        {this.state.colors.map(r => (
                            <TouchableOpacity
                                onPress={() => {
                                    this.setState({ currentColor: r });
                                }}>
                                <View
                                    style={{
                                        backgroundColor: r,
                                        width: 35,
                                        height: 35,
                                        borderRadius: 100 / 2,
                                        marginTop: 10,
                                        marginLeft: 7
                                    }}
                                />
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
                <View style={{ marginLeft: 50, marginTop: 10, marginRight: 50, justifyContent: 'center', borderRadius: 5 }}      >
                    <Button
                        title='Resim Olarak Kaydet'
                        buttonStyle={{
                            backgroundColor: this.state.currentColor,
                            borderRadius: 30,
                            marginBottom: 10
                        }}
                        onPress={this._saveToCameraRollAsync}
                    />
                    <Button
                        title='Paylaş'
                        buttonStyle={{
                            backgroundColor: "#f54740",
                            borderRadius: 30
                        }}
                        onPress={() => this._shareText(this.props.text)}
                    />
                </View>
                <View style={{ marginTop: 10 }}>
                    <TouchableOpacity
                        onPress={() => this.props.closes()}>
                        <Icon
                            name='close'
                            color='#fff'
                            size={30}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    _renderBox() {
        return (
            <View>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.props.modalVisible}
                    onRequestClose={() => {
                        () => { this.props.closes(); }
                    }}>
                    <View style={{
                        backgroundColor: 'rgba(52, 52, 52, 0.9)',
                        height: viewportHeight
                    }}>
                        {this._closed()}
                        {this._renderTextBox()}
                    </View>
                </Modal>
            </View>
        )
    };

    _load() {
        return (
            <View>
            </View>
        )
    }
    render() {
        return (
            <View>
                {this.state.fontLoaded ? this._renderBox() : this._load()}
            </View>
        );
    }
}


const styles = StyleSheet.create({

    textBox: {
        width: viewportWidth - 30,
        height: 280,
        borderRadius: 5,
        marginTop: 100,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15,
        marginRight: 15
    },
    text: {
        fontFamily: 'poiretOne',
        fontSize: 25,
        color: "#fff",
        textAlignVertical: 'center',
        lineHeight: 30,
        padding: 10,
        fontWeight: '300',
        textAlign: 'center',
    },
    closes: {
        height: 40,
        width: 40,
        backgroundColor: '#fff',
        flex: 1,
        flexDirection: 'row',
        marginTop: 20

    }
})