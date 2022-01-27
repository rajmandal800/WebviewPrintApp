/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Platform,
  View,
  Alert,
} from 'react-native';

import {WebView} from 'react-native-webview';
import createInvoke from 'react-native-webview-invoke/native';

class App extends React.Component {
  webview = React.createRef();
  invoke = createInvoke(() => this.webview);

  whatIsTheNameOfA = this.invoke.bind('whatIsTheNameOfA');
  tellAYouArea = this.invoke.bind('tellAYouArea');
  connectPrinter = this.invoke.bind('connectPrinter');
  printFromWeb = async () => {
    let response = await this.whatIsTheNameOfA();
  };

  handleConnectPrinter = async () => {
    let host = '192.168.178.22';
    let port = 9100;
    let response = await this.connectPrinter(host, port);
    console.log(response);
  };
  onMessage = event => {
    const {title, message} = JSON.parse(event.nativeEvent.data);
    Alert.alert(title, message, [], {cancelable: true});
  };
  render() {
    const params = 'platform=' + Platform.OS;
    const sourceUri =
      (Platform.OS === 'android' ? 'file:///android_asset/' : '') +
      'Web.bundle/loader.html';
    const injectedJS = `if (!window.location.search) {
      var link = document.getElementById('progress-bar');
      link.href = './site/index.html?${params}';
      link.click();
    }`;

    return (
      <View style={{flex: 1, marginTop: 80}}>
        <WebView
          injectedJavaScript={injectedJS}
          source={{uri: sourceUri}}
          javaScriptEnabled={true}
          originWhitelist={['*']}
          allowFileAccess={true}
          onMessage={this.onMessage}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
// originWhitelist={['file://']}
// source={{uri: 'https://epsonprint-5bdcc.web.app/'}}
// source={require('./ios/widget/index.html')}
// source={{
//   uri: 'https://cdn.jsdelivr.net/gh/rajmandal800/TestPrint@main/print.html',
// }}

{
  /* <WebView
            useWebKit
            ref={webview => (this.webview = webview)}
            // originWhitelist={['*']}
            originWhitelist={['file://']}
            onMessage={this.invoke.listener}
            source={{uri: './widget/index.html'}}
            style={{flex: 1, width: '100%', height: 500}}
            javaScriptEnabled={true}
            onError={error => {
              // console.log(error.type);
            }}
            allowFileAccess={true}
            scalesPageToFit
          /> */
}
{
  /* <Button
            title="Connect Printer"
            onPress={() => this.handleConnectPrinter()}></Button> */
}
