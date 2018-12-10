import React from 'react';
import {
  ToastAndroid,
  TouchableOpacity,
  Clipboard,
  View,
  Text,
  StyleSheet
} from 'react-native';
import { Font } from 'expo';
import { Icon } from 'react-native-elements';
import { Loader, DetailModal } from './index';
export class Textter extends React.Component {
  state = {
    fontLoaded: false,
    modalVisible: false
  };
  constructor(props) {
    super(props);
    this._renderBox.bind(this);
    this._closesModal.bind(this);
  }
  async componentWillMount() {
    await Font.loadAsync({
      poiretOne: require('../assets/fonts/PoiretOne-Regular.ttf'),
    });
    this.setState({ fontLoaded: true });

  }

  _copyText(text) {
    Clipboard.setString(text);
    ToastAndroid.show('Kopyalandı!', ToastAndroid.SHORT);
  }
  _share() {
    this.setState({ modalVisible: true });
  }
  _closesModal() {
    this.setState({ modalVisible: false })

  }
  _renderBox() {
    return (
      <View>
        <View style={styles.container}>
          <View style={styles.textBox}>
            <Text
              onPress={() => this._share()}
              key={this.props.keyTexter}
              onLongPress={() => this._copyText(this.props.text)}
              style={styles.text}
            >{this.props.text}</Text>
          </View>
          <View style={styles.socialBox}>
            <View style={{ paddingBottom: 10 }}>
              <TouchableOpacity onPress={() => this._copyText(this.props.text)}>
                <Icon
                  name='content-copy'
                  color='#000'
                />
              </TouchableOpacity>

            </View>
            <TouchableOpacity
              onPress={() => this._share()}>
              <Icon
                name='share'
                color='#000'
              />
            </TouchableOpacity>
          </View>

        </View >
        {this.state.modalVisible ? this._renderModal() : <Text></Text>}
      </View>
    )
  };
  _renderModal() {
    return (<DetailModal key={this.props.keyTexter} closes={this._closesModal.bind(this)} status={this.state.modalVisible} text={this.props.text} />)
  }
  _load() {
    return (
      <View>
        <Loader />
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
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 80,
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    marginLeft: 10,
    marginRight: 10,
    borderBottomWidth: 5,
    borderBottomColor: '#fff',

  },
  textBox: {
    width: 300,
  },
  text: {
    fontFamily: 'poiretOne',
    fontSize: 23,
    color: "rgba(0, 0, 0, 0.5)",
    textAlignVertical: 'center',
    lineHeight: 30,
    padding: 10,
    fontWeight: '300'
  },
  socialBox: {
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    textAlignVertical: 'center'

  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 10
  }
})