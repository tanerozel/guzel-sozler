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
    Linking,
    ImageBackground
} from 'react-native';
import { Font, takeSnapshotAsync, Permissions, ImagePicker } from 'expo';
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
        ],
        image: null,
        textColor: '#fff'
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
    _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
        });

        if (!result.cancelled) {
            this.setState({ image: result.uri });
        }
    };

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
    _renderColorBox() {
        return <Text style={styles.text}> {this.props.text}</Text>
    }
    _renderImageBox() {

        return (
            <ImageBackground
                source={{ uri: this.state.image }}
                style={{ flex: 1, justifyContent: 'center', width: '100%', height: '100%' }}>
                <Text style={[styles.text, { shadowOffset: 4, shadowOpacity: 1, shadowColor: '#000', fontSize: 30, color: this.state.textColor }]}> {this.props.text}</Text>
            </ImageBackground>
        );
    }

    _renderTextBox() {

        return (
            <View>
                <TouchableOpacity onPress={() => this._pickImage()} >
                    <View style={[styles.textBox, { backgroundColor: this.state.image == null ? this.state.currentColor : '' }]} ref={view => {
                        this._container = view;
                    }}>
                        {this.state.image == null ? this._renderColorBox() : this._renderImageBox()}
                    </View>
                </TouchableOpacity>
                <View style={{ height: 60, marginTop: 10 }}>
                    <View
                        onPress={() => this._pickImage()}
                        style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
                        {this.state.colors.map(r => (
                            <TouchableOpacity
                                onPress={() => {
                                    this.setState({ currentColor: r });
                                    if (this.state.image != null) {
                                        this.setState({ textColor: r });
                                    }

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

                    //onPress={() => this._shareText(this.props.text)}
                    // onPress={() => this._pickImage()}
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


let styles = StyleSheet.create({

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
        textAlignVertical: 'center',
        lineHeight: 30,
        padding: 10,
        fontWeight: '300',
        textAlign: 'center',
        color: '#fff'
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