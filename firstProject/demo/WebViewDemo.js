import React from 'react'
import {
 StyleSheet,
 Text,
 TextInput,
 TouchableWithoutFeedback,
 TouchableOpacity,
 View,
 WebView
} from 'react-native'

const HEADER = '#3b5998';
const BGWASH = 'rgba(255,255,255,0.8)'
const DISABLED_WASH = 'rgba(255,255,255,0.25)'

const TEXT_INPUT_REF = 'urlInput'
const WEBVIEW_REF  =  'webview'

const DEFAULT_URL = 'https://m.9f.cn'

export default class WebViewExample extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			url: DEFAULT_URL,
			status: 'NO page Loaded',
			backButtonEnabled: false,
			forwardButtonEnabled: false,
			loading:true,
			scalesPageToFit: true
		}
	 
	}

	inputText = ''

	handleTextInputChange =(event)=> {
		let url = event.nativeEvent.text
		if(!/^[a-zA-Z]+:/.test(url)){
			url = 'http://'+ url
		}
		this.inputText = url
		console.log(this.inputText)
	}

	render(){

		this.inputText = this.state.url
		return (<View style={styles.container}>
			<View
			  style={styles.addressBarRow}	
			>
			<TouchableOpacity
				onPress={this.goBack}
				style={this.state.backButtonEnabled?styles.navButton:styles.disabledButton}
			>
			<Text>
			{'<'}
			</Text>	
			</TouchableOpacity>
			<TouchableOpacity
				onPress={this.goForward}
				style={this.state.forwardButtonEnabled ? styles.navButton:styles.disabledButton}
			>
			<Text>
			{'>'}	
			</Text>
			</TouchableOpacity>
			<TextInput
				ref={TEXT_INPUT_REF}
				autoCapitalize="none"
				defaultValue={this.state.url}
				onSubmitEditing={this.onSubmitEditing}
				onChange={this.handleTextInputChange}
				clearButtonMode="while-editing"
				style={styles.addressBarTextInput}

			/>
			<TouchableOpacity
				onPress={this.pressGoButton}
			>
				<Text>
				 GO!
				</Text>
			</TouchableOpacity>
			</View>
			<WebView
				ref={WEBVIEW_REF}
				automaticallyAdjustContentInsets={false}
				sytle={styles.webview}
				source={{uri:this.state.url}}
				javaScriptEnabled={true}
				decelerationRate="normal"
				onNavigationStateChange={this.onNavigationStateChange}
				onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest}
				startInLoadingState={true}
				scalesPageToFit= {this.state.scalesPageTOFit}
			/>
			<View style={styles.statusBar}>
				<Text style={styles.statusBarText}>{this.status}</Text>
			</View>
		</View>)
	}

	goBack = ()=>{
 		this.refs[WEBVIEW_REF].goBack()
	}
	goForward=()=>{
		this.refs[WEBVIEW_REF].goForward()
	}
	reload=()=>{
		this.refs[WEBVIEW_REF].reload()
	}
	onShouldStartLoadWithRequest (event){
		return true
	}
	onNavigationStateChange = (navState)=>{
		this.setState({
			backButtonEnabled:navState.canGoback,
			forwardButtonEnabled:navState.canGoForward,
			url:navState.url,
			status: navState.title,
			loading:navState.loading,
			scalesPageTofit: true
		})
	}

	onSubmitEditing=(event)=>{
		this.pressGoButton()
	}
	pressGoButton=()=>{
		let url = this.inputText.toLowerCase()
		if(url === this.state.url){
			this.reload();
		}else{
			this.setState({
				url:url})
		}
		console.log(url)
		this.refs[TEXT_INPUT_REF].blur();
	}
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: HEADER,
  },
  addressBarRow: {
    flexDirection: 'row',
    padding: 8,
  },
  webView: {
    backgroundColor: BGWASH,
    height: 350,
  },
  addressBarTextInput: {
    backgroundColor: BGWASH,
    borderColor: 'transparent',
    borderRadius: 3,
    borderWidth: 1,
    height: 24,
    paddingLeft: 10,
    paddingTop: 3,
    paddingBottom: 3,
    flex: 1,
    fontSize: 14,
  },
  navButton: {
    width: 20,
    padding: 3,
    marginRight: 3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: BGWASH,
    borderColor: 'transparent',
    borderRadius: 3,
  },
  disabledButton: {
    width: 20,
    padding: 3,
    marginRight: 3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: DISABLED_WASH,
    borderColor: 'transparent',
    borderRadius: 3,
  },
  goButton: {
    height: 24,
    padding: 3,
    marginLeft: 8,
    alignItems: 'center',
    backgroundColor: BGWASH,
    borderColor: 'transparent',
    borderRadius: 3,
    alignSelf: 'stretch',
  },
  statusBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 5,
    height: 22,
  },
  statusBarText: {
    color: 'white',
    fontSize: 13,
  },
  spinner: {
    width: 20,
    marginRight: 6,
  },
  buttons: {
    flexDirection: 'row',
    height: 30,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button: {
    flex: 0.5,
    width: 0,
    margin: 5,
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: 'gray',
  },
});

const HTML = `
<!DOCTYPE html>\n
<html>
  <head>
    <title>Hello Static World</title>
    <meta http-equiv="content-type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=320, user-scalable=no">
    <style type="text/css">
      body {
        margin: 0;
        padding: 0;
        font: 62.5% arial, sans-serif;
        background: #ccc;
      }
      h1 {
        padding: 45px;
        margin: 0;
        text-align: center;
        color: #33f;
      }
    </style>
  </head>
  <body>
    <h1>Hello Static World</h1>
  </body>
</html>
`;
