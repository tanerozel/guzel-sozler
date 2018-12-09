import React from 'react';
import {
  Share,
  ToastAndroid,
  TouchableOpacity,
  Clipboard,
  Alert,
  View,
  Text,
  Button,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Font } from 'expo';

export class WordText extends React.Component {
  state = {
    fontLoaded: false,
    colors: [
      '#f04243',
      '#1257a4',
      '#9f5590',
      '#5458de',
      '#93c54a',
      '#ed658b',
      '#3dbbc7',
    ],
  };
  constructor(props) {
    super(props);
    this._setContent = this._setContent.bind(this);
    this._sharWhat.bind(this);
    this._renderBox.bind(this);
    //this._changeColor = this._changeColor.bind(this);
  }
  async componentWillMount() {
    await Font.loadAsync({
      // pattya: require('../assets/fonts/Pattaya-Regular.ttf'),
      poiretOne: require('../assets/fonts/PoiretOne-Regular.ttf'),
    });
    this.setState({ fontLoaded: true });
    this.setState({
      currentColor: this.state.colors[Math.floor(Math.random() * 7)],
    });
  }

  _setContent() {
    // Alert.alert('Kopyalandı!')
    //Clipboard.setString(this.props.children);
    //console.log(this.props.children);
    ToastAndroid.show('Kopyalandı!', ToastAndroid.SHORT);
  }
  _sharWhat() {
    Share.share({
      message: this.props.text,
    });
  }
  _changeColor(color) {
    this.setState({ currentColor: '#000' });
  }
  _renderBox() {
    let { viewStyle, textStyle, sharing, square, text } = this.props;
    if (viewStyle === undefined || textStyle === undefined) {
      // console.log(this.props);
      square = {
        width: 30,
        height: 30,
        borderRadius: 100 / 2,
        backgroundColor: 'red',
      };
      viewStyle = {
        minHeight: 300,
        backgroundColor: this.state.currentColor,
        padding: 10,
        margin: 10,
        borderRadius: 12,
        paddingBottom: 15,
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOpacity: 5,
        fontFamily: 'poiretOne',
      };
      textStyle = {
        fontSize: 25,
        lineHeight: 30,
        paddingBottom: 10,
        color: '#fff',
        fontWeight: '300',
        fontFamily: 'poiretOne',
        textAlign: 'center',
      };
      sharing = {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
      };
    }
    return (
      <View>
        <View style={viewStyle}>
          {this.state.fontLoaded ? (
            <Text key={this.props.tka}
              onLongPress={this._setContent}
              selectable={true}
              style={textStyle}
            >{this.props.text}</Text>
          ) : null}
        </View>
        <View style={{ height: 50 }}>
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
                    width: 30,
                    height: 30,
                    borderRadius: 100 / 2,
                    margin: 5,
                    borderWidth: 0.5,
                    borderColor: '#000',
                  }}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={{ marginLeft: 50, marginRight: 50, justifyContent: 'center', borderRadius: 5 }}      >
          <Button
            style={{
              backgroundColor: this.currentColor,
              justifyContent: 'center',
              height: 30,
              fontSize: 18,

            }}
            title="Paylaş"
            color="#f54740"
            onPress={this._sharWhat}
          />

        </View>
      </View>

    )
  };

  _load() {
    return (
      <View>
        <Text> Yükleniyor</Text>
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
