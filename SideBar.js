
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { Font } from 'expo';

export default class SideBar extends React.Component {
  state = {
    fontLoaded: false
  }
  constructor(props) {
    super(props);
    //this._renderMenu.bind(this);
  }
  async componentWillMount() {
    await Font.loadAsync({
      // pattya: require('../assets/fonts/Pattaya-Regular.ttf'),
      Montserrat: require('./assets/fonts/Montserrat-Medium.ttf'),
    });
    this.setState({ fontLoaded: true });

  }
  _renderMenu() {

    return (
      <ScrollView>
        {Object.values(this.props.menu).map((item, index) => (


          <TouchableOpacity onPress={() => {
            this.props.nav.navigation.navigate(item.router, { code: item.code });
          }}>
            <Text style={{ fontFamily: this.state.fontLoaded ? 'Montserrat' : '', marginLeft: 10, marginRight: 10, padding: 15, color: '#fff', fontSize: 18, borderBottomColor: '#40ffffff', borderBottomWidth: 0.5 }}>
              {item.title}
            </Text>
          </TouchableOpacity>

        ))}
      </ScrollView>
    );

  }
  _renderLoad() {
    <Text>Yükleniyor</Text>;
  }
  render() {
    return (
      <View style={{ backgroundColor: '#f54740' }}>
        {this._renderMenu()}
      </View>
    );
  }
}
