import React from 'react';
import {
  ScrollView,
  View,
  Dimensions,
  Modal,
  TouchableHighlight,
  FlatList,
  TouchableOpacity,
  NetInfo
} from 'react-native';
import { Header, Icon, Text } from 'react-native-elements';

import { Notifications, Permissions, AdMobBanner, Contacts } from 'expo';
import { WordText, Loader, Textter } from './components/index';
import * as firebase from 'firebase';

import SideBar from './SideBar';

import {
  createDrawerNavigator,
  SafeAreaView
} from 'react-navigation';
import Carousel from 'react-native-snap-carousel';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  'window'
);

class HomeScreen extends React.Component {
  state = {
    isLoadingComplete: false,
    modalVisible: false,
  };
  constructor(props, context) {
    super(props);
    if (this.props.data) {
    }
    this._Home.bind(this);
  }

  async componentDidMount() { }

  async componentWillMount() {


    const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    if (status !== 'granted') {
      await Permissions.askAsync(Permissions.NOTIFICATIONS);
    }
    const localnotification = {
      title: 'Günün Sözü',
      body:
        'Sütten ağzı yanan, sütün soğumasını bekler. Olayı büyütmeye gerek yok, yoğurtla da hiçbir alakası yok. ',
      android: {
        sound: false,
      },
    };

    let sendAfterFiveSeconds = Date.now();
    sendAfterFiveSeconds += this.addTime('minute', 2);

    const schedulingOptions = { time: sendAfterFiveSeconds };
    // Notifications.scheduleLocalNotificationAsync(
    //   localnotification,
    //   schedulingOptions
    // );
    this.setState({ isLoadingComplete: true });
  }

  addTime(type, time) {
    switch (type) {
      case 'minute':
        time = 1000 * 60 * time;
        break;
      case 'hour':
        time = 1000 * 60 * 60 * time;
        break;
      case 'day':
        time = 100 * 60 * 60 * 24 * time;
        break;
    }
    return time;
  }

  _renderItem({ item, index }) {
    return (
      <View >
        <Textter text={item.text} > </Textter>
      </View>
    );
  }
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  _renderModal() {
    return (
      <View style={{
      }}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.modalVisible}
        >
          <View style={{
            backgroundColor: 'rgba(52, 52, 52, 0.8)',
            height: viewportHeight
          }}>
            <View style={{
              marginTop: (viewportHeight - 300) / 2,
              backgroundColor: "#fff",
              marginLeft: 20,
              marginRight: 20,
              borderRadius: 20,
              height: 300,
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <Text h3>Hakkında</Text>
              <Text h4 style={{ paddingTop: 5 }}> Yazılım </Text>
              <Text h5> Taner Özel </Text>
              <Text h5> tanerozel47@gmail.com </Text>
              <Text h4 style={{ paddingTop: 5 }}> UI/UX </Text>
              <Text h5> Yusuf Çiftçi </Text>
              <Text h5> yusufciftci6@gmail.com </Text>

            </View>
            <TouchableHighlight
              style={{ borderRadius: 50, heigth: 50, margin: 10, }}
              onPress={() => {
                this.setModalVisible(!this.state.modalVisible);
              }}>
              <Icon
                name='close'
                color='#000'
                iconStyle={{ backgroundColor: '#fff', borderRadius: 50 }}
                size={40}
              />
            </TouchableHighlight>
          </View>
        </Modal>
      </View>
    );
  }

  _renderLoading() {
    return (
      <Loader />
    );
  }

  _renderItemText() {
    return (
      <FlatList
        data={this.props.data.data}
        renderItem={({ item, index }) => <Textter key={index + 'keytextedr'} keyTexter={index + 'keytexter'} text={item.text}></Textter>}
        keyExtractor={(item, index) => item + index}
      />
    )
  }
  _info() {
    return (
      <TouchableOpacity onPress={() => {
        this.setModalVisible(true);
      }}>
        <Icon
          name='info'
          color='#fff'
        /></TouchableOpacity>

    )
  }
  _openMenu() {
    return (
      <TouchableOpacity onPress={() => {
        console.log();
        this.props.navigation.openDrawer();
        // this.props.navigation.dispatch(DrawerActions.toggleDrawer())
      }}>
        <Icon
          name='menu'
          color='#fff'
        /></TouchableOpacity>

    )
  }

  _Home() {
    return (
      <View style={{ flex: 1, backgroundColor: '#ff' }}>
        <Header
          leftComponent={this._openMenu()}
          centerComponent={{ text: this.props.data ? this.props.data.title : 'Güzel Sözler', style: { color: '#fff' } }}
          rightComponent={this._info()}
          statusBarProps={{ barStyle: 'light-content' }}
          backgroundColor="#f54740"
        />

        <ScrollView style={{
          backgroundColor: '#fff'
        }}>
          {this._renderModal()}
          <View />
          <ScrollView>
            {this.props.data ? this._renderItemText() : this._renderLoading()}
          </ScrollView>
        </ScrollView>
        <View>
          <AdMobBanner
            bannerSize="fullBanner"
            adUnitID="ca-app-pub-0041375232450674/4679213555"
            didFailToReceiveAdWithError={this.bannerError}
          />
        </View>
      </View>
    );
  }
  render() {
    return (
      this.state.isLoadingComplete ? this._Home() : this._renderLoading()
    );
  }
}


let initialRouteName = Math.floor(Math.random() * 7);

export const RouterGen = (data) => {

  let MenuList = {}
  data.state._category.map((item, index) => {
    // console.log(item);
    item.data = data.state._words.filter(a => a.code == item.code);
    // console.log(item.data);
    MenuList[item.code] = {
      screen: props => <HomeScreen {...props} data={item} id={item.code} />,
      path: item.code + '/:code',
      title: item.title,
      router: item.code,
    };
  });

  let Router = createDrawerNavigator(MenuList, {
    contentComponent: props => (
      <ScrollView style={{ backgroundColor: '#f54740' }}>
        <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
          <SideBar nav={props} menu={MenuList} />
        </SafeAreaView>
      </ScrollView>
    ),
    drawerType: 'back',
    drawerWidth: viewportWidth,
    initialRouteName: MenuList[0],
  });

  return <Router />;
};

class AppRouter extends React.Component {
  state = {
    _loadStatus: false,
    _category: {},
    _words: {}

  }
  constructor(props) {
    super(props);
    //console.log(props);
  }
  async componentWillMount() {
    // const { status, expires, permissions } = await Permissions.getAsync(Permissions.CONTACTS);
    // if (status !== 'granted') {
    //   await Permissions.askAsync(Permissions.NOTIFICATIONS, Permissions.CONTACTS);
    // }
    // const contacts = await Contacts.getContactsAsync();
    // if (contacts) {
    //   console.log(contacts);
    // }

    let that = this;
    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: 'AIzaSyCd_OWbCTwxxvyYY8hdK9VTOZ26r6oPjnM',
        authDomain: 'guzel-sozler-d8dcb.firebaseapp.com',
        databaseURL: 'https://guzel-sozler-d8dcb.firebaseio.com',
        projectId: 'guzel-sozler-d8dcb',
        storageBucket: 'guzel-sozler-d8dcb.appspot.com',
        messagingSenderId: '982364125399',
      });
    }

    let category = firebase.database().ref('category');
    let words = firebase.database().ref('sozler');
    let wordsData = [];
    words.on('value', function (snapshot) {
      wordsData = Object.values(snapshot.val());
      // console.log(wordsData);
    });

    category.on(
      'value',
      function (snapshot) {
        let category = snapshot.val();

        that.setState({ _category: category })
        that.setState({ _words: wordsData });
        that.setState({ _loadStatus: true });

      },
      function (errorObject) {
        //('The read failed: ' + errorObject.code);
      }
    );

  }

  _LoadingApp = () => {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center'
      }}>
        <Loader />
      </View>
    );
  }

  render() {
    return (this.state._loadStatus ? <RouterGen state={this.state} props={this.props} /> : this._LoadingApp());
  }
}

const App = () => {
  return <AppRouter />;
};

export default App;
