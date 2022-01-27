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
  TextInput,
  ActivityIndicator,
} from 'react-native';

import {WebView} from 'react-native-webview';
import createInvoke from 'react-native-webview-invoke/native';

class App extends React.Component {
  state = {
    ipAddress: '192.168.178.22',
    port: '8008',
    loading: false,
  };
  webview = React.createRef();
  invoke = createInvoke(() => this.webview);

  connectPrinter = this.invoke.bind('connect');
  addText = this.invoke.bind('addText');
  sendMessage = this.invoke.bind('sendMessage');
  addCut = this.invoke.bind('addCut');

  stopLoading = status => {
    this.setState({loading: false});
  };
  componentDidMount = () => {
    this.invoke.define('stopLoading', this.stopLoading);
  };

  handleConnectPrinter = async () => {
    this.setState({loading: true});
    let host = this.state.ipAddress;
    let port = this.state.port;
    if (!host) {
      return Alert.alert('Please enter IP Address of printer');
    }
    if (!port) {
      return Alert.alert('Please enter Port of printer');
    }
    let response = await this.connectPrinter(host, port);
  };
  onMessage = event => {
    const {title, message} = JSON.parse(event.nativeEvent.data);
    Alert.alert(title, message, [], {cancelable: true});
  };

  handleAddText = async () => {
    let response = await this.addText();
  };
  handleCut = async () => {
    let response = await this.addCut();
  };
  handlePrint = async () => {
    let response = await this.sendMessage();
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
      <View style={{flex: 1, marginTop: 50}}>
        {this.state.loading ? (
          <View style={{position: 'absolute', top: '50%', left: '50%'}}>
            <ActivityIndicator size="large" />
          </View>
        ) : null}
        <View>
          <WebView
            ref={webview => (this.webview = webview)}
            injectedJavaScript={injectedJS}
            source={{uri: sourceUri}}
            javaScriptEnabled={true}
            originWhitelist={['*']}
            allowFileAccess={true}
            onMessage={this.invoke.listener}
          />
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
          }}>
          <View>
            <TextInput
              value={this.state.ipAddress}
              onChangeText={text => this.setState({ipAddress: text})}
              placeholder="Enter IP Address"
            />
          </View>
          <View>
            <TextInput
              value={this.state.port}
              onChangeText={text => this.setState({port: text})}
              placeholder="Enter Port"
            />
          </View>
        </View>
        <View style={{marginTop: 10}}>
          <Button
            title={this.state.loading ? 'Connecting' : 'Connect'}
            onPress={() => this.handleConnectPrinter()}
            disabled={this.state.loading}
          />
          <Button title="Add Text" onPress={() => this.handleAddText()} />
          <Button title="Add Cut" onPress={() => this.handleCut()} />
          <Button title="Print" onPress={() => this.handlePrint()} />
        </View>
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
