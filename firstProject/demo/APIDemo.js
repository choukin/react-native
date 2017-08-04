import React from 'react'
import ReactNative, {
	ActionSheetIOS,
	StyleSheet,
	Text,
	UIManager,
	View,
	Alert,
	AlertIOS,
	Clipboard,
	Dimensions,
	Share
} from 'react-native'

const BUTTONS = [
	'Options 0',
	'Options 1',
	'Options 2',
	'Options 3',
	'Delete',
	'Cancel'
]

const DESTRUCTIVE_INDEX = 4
const CANCEL_INDEX = 5

export default class APIDemo extends React.Component{
	constructor(props) {
		super(props);
		this.state={clicked:'none',tintclicked: 'none',shareclicked:'none',text:'',content:'',result:''}

		let  {height, width} = Dimensions.get('window');
		console.log('height:'+ height+ ' width: '+width)
// 		AlertIOS.prompt(
//   'Foo Title',
//   'My Alert Msg',
//   [
//     {text: 'Foo', onPress: () => console.log('Foo Pressed!')},
//     {text: 'Bar', onPress: () => console.log('Bar Pressed!')},
//   ]
// )
// 		Alert.alert(
//   'Alert Title',
//   'My Alert Msg',
//   [
//     {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
//     {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
//     {text: 'OK', onPress: () => console.log('OK Pressed')},
//   ],
//   { cancelable: false }
// )
	}
	render(){
		return (<View>
			<Text onPress={this.showActionSheet} style={styles.button}>
				Click to show the ActionSheet
			</Text>
			<Text>
				Clicked button: {this.state.clicked}
			</Text>
			<Text onPress={this.showActionSheetTint} style={styles.button}>
				Click to show the ActionSheet
			</Text>
			<Text>
				Clicked button: {this.state.tintclicked}
			</Text>
			<Text onPress={this.showActionShareSheetf} style={styles.button}>
				Click to show the showActionShareSheet
			</Text>
			<Text onPress={this.showShareActionSheet} style={styles.button}>
				Click to show the showActionShareSheet
			</Text>
			<Text>
			{this.state.text}
			</Text>			
			<Text onPress={this._setClipboardContent} style={{color:'blue'}}>
				Tap to put 'hello world' in the clipboard
			</Text>
			<Text style={{color:'red',marginTop:20}}>
				{this.state.content}
			</Text>
			<Text style={{color:'red',marginTop:20}} onPress={this._shareMessage}>
			click to share message 
			</Text>
			<Text style={{color:'red',marginTop:20}}>
				{this.state.result}
			</Text>
		</View>)
	}

		_shareMessage =()=>{
			Share.share({
				message:'Reactnative'
			}).then(this._showResult)
			.catch((error)=>{this.setState({result:'error'+ error.message})})
		}
		_showResult =(result)=>{
			if(result.action === Share.Share.sharedAction){
				if(result.activityType){
					this.setState({result:' shared with an activityType: '+ result.activityType})
				}else{
					this.setState({result:'shared'})
				}
			}else if(result.action === Share.Share.dismissedAction){
				this.setState({result:'dismissed'})
			}
		}
	_setClipboardContent = async ()=> {
		Clipboard.setString('hello world')
		try{
			let content = await Clipboard.getString()
			this.setState({content})	
		}catch(e){
			this.setState({content:e.message})
		}
	}

	showActionSheet = ()=>{
		let options = {
			options : BUTTONS,
			cancelButtonIndex: CANCEL_INDEX,
			destructiveButtonIndex: DESTRUCTIVE_INDEX,
			title:'我是标题',
			message:'我是信息'
		}
		const callback = (buttonIndex)=>{
			this.setState({clicked:BUTTONS[buttonIndex]})
		}
		ActionSheetIOS.showActionSheetWithOptions(options, callback)
	}

	showActionSheetTint= () =>{
		let options = {
					options : BUTTONS,
					cancelButtonIndex: CANCEL_INDEX,
					destructiveButtonIndex: DESTRUCTIVE_INDEX,
					title:'我是标题',
					message:'我是信息',
					tintColor: 'green'
				}
				const callback = (buttonIndex)=>{
					this.setState({tintclicked:BUTTONS[buttonIndex]})
				}
				ActionSheetIOS.showActionSheetWithOptions(options, callback)
			}

 showActionShareSheetf = ()=>{
 	let options = {
 		message: '信息',
 		url:'https://m.9f.cn',
 		subject:'主题',
 		excludedActivityTypes:['com.apple.UIKit.activity.PostToTwitter']
 	}
 	const failureCallback = (error)=>{alert(error)}
 	const successCallback = (success, method) =>{
 		let text ;
 		if(success){
 			text = `Shared via ${method}`
 		}else{
 			text = `You didn\'t share`
 		}
 		this.setState({text})

 	} 
    ActionSheetIOS.showShareActionSheetWithOptions(options, failureCallback, successCallback)
 }
 showShareActionSheet = ()=> {
 	 	const failureCallback = (error)=>{alert(error)}
 	const successCallback = (success, method) =>{
 		let text ;
 		if(success){
 			text = `Shared via ${method}`
 		}else{
 			text = `You didn\'t share`
 		}
 		this.setState({text})

 	} 

 	ReactNative.takeSnapshot('window').then((uri)=>{
 		let options = {
 			uri:uri,
 			excludedActivityTypes:[
 				'com.apple.UIKit.activity.PostToTwitter'
 			]
 		}
 		ActionSheetIOS.showShareActionSheetWithOptions(options, failureCallback, successCallback)
 	})
 }
}
const styles = StyleSheet.create({
	button: {
		marginBottom: 10,
		fontWeight: '500'
			}
})