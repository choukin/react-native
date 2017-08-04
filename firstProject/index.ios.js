/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'

import {
  AppRegistry,
  ScrollView,
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  SectionList,
  TouchableHighlight,
  Button,
  AppState
} from 'react-native'
import {StackNavigator} from 'react-navigation'

import AnimatedScreen from './demo/AnimatedScreen'
import ActivityIndicator from './demo/ActivityIndicatorDemo'
import ModalExample from './demo/ModalExample'
import TabBarExample from './demo/TabBarDemo'
import WebViewExample from './demo/WebViewDemo'
import ScaledWebView from './demo/ScaledWebView'
import APIDemo from './demo/APIDemo'

/*
 * 问候组件 
**/
class Greeting extends Component {
  render() {
    return (
      <Text style={this.props.style}>Hello {this.props.name}!</Text>
      )
  }
}

class Blink extends Component {
  constructor(props) {
    super(props);
    this.state = {showText:true};
    setInterval(()=>{
      this.setState(previousState => {
        return {showText: !previousState.showText}
      })
    },1000)
  }

  render() {
    let display = this.state.showText ? this.props.text : ' '
    return (<Text style={this.props.style}>{display}</Text>)
  }

}

// export default class firstProject extends Component {
//   constructor(props) {
//     super(props);
  
//     this.state = {text: ''};
//   }
//   render() {
//     let pic = {
//       uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
//     }

//     return (
//       <View style={styles.container}>
//         <TextInput style={{height:40}}
//           placeholder="在这里输入来翻译"
//           onChangeText={(text)=>{this.setState({text})}}
//         />
//         <Text style={{padding:10, fontSize: 42}}>
//           {this.state.text.split(' ').map((word)=> { return word && 'pizza'}).join(' ')}
//         </Text>
//          <View style={{width:50,height:50,backgroundColor: 'skyblue'}}/>
//          <View style={{width:50,height:50,backgroundColor: 'powderblue'}}/>
//          <View style={{width:50,height:50,backgroundColor: 'steelblue'}}/>
//       </View>
//     );
//   }
// }

// export default class firstProject extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//         data:[
//             {key: 'Devin'},
//             {key: 'Jackson'},
//             {key: 'James'},
//             {key: 'Joel'},
//             {key: 'John'},
//             {key: 'Jillian'},
//             {key: 'Jimmy'},
//             {key: 'Julie1'}
//             ],
//         dectionsData:[
//             {title: 'D', data: ['Devin']},
//             {title: 'J', data: ['Jackson', 'James', 'Jillian', 'Jimmy', 'Joel', 'John', 'Julie']}
//            ]    
//           }
//   }
//   async getMoviesFromAsync() {
//     try{
//       let response = await fetch('https://facebook.github.io/react-native/movies.json')
//       let responseJSON = await response.json();
//       this.setState({data:responseJSON.movies})
//     }  catch(error){
//       console.error(error)
//     }
//   }
//   render() {
//      this.getMoviesFromAsync()
//     return (
//       // <View style={styles.container}>
//       // <SectionList
//       //  sections={this.state.dectionsData}
//       //  renderItem={({item})=> <Text style={styles.item}>{item}</Text>}
//       //  renderSectionHeader={({section})=> <Text style={styles.sectionHeader}>{section.title}</Text>}
//       // />
//       // <FlatList data={this.state.data}
//       //   renderItem={({item}) => <Text style={styles.item}>{item.title}{item.releaseYear}</Text>}
//       //   />
//       // </View>
//       )
//     }
//   } 
class MainScreen extends Component{
  constructor(props) {
    super(props);
  
    this.state = {backgroundColor:'red',currentAppState:AppState.currentState};
  }
  static navigationOptions = {
    title: 'Welcome',
  }
  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange)
  }
  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange)
  }
  _handleAppStateChange = (nextAppState)=>{
    console.log(nextAppState +'  '+ AppState.currentState)
    if(this.state.currentAppState.match(/inactive|background/) && nextAppState === 'active'){
      console.log('App has come to the foregroundQ')
    }
    this.setState({appState: nextAppState});
  }
  render(){
    console.log('render '+ AppState.currentState)
    const {navigate} = this.props.navigation
    return (
      <View>
      <Text>Current state is: {this.state.currentAppState}</Text>
      <Button
        title="go to"
        onPress={()=> navigate('Profile',{name:'jane'})}
      />
      <Button
        title="动画"
        onPress={()=> navigate('AnimatedScreen',{name:'jane'})}
      />
      <Button
        title="ActivityIndicator"
        onPress={()=> navigate('ActivityIndicator',{name:'ActivityIndicator'})}
      />
      <Button title="tab"
        onPress={()=>navigate('TabBarExample',{name:'TabBarExample'})}
      />
      <Button title="Modal" onPress={()=>navigate('ModalExample',{name:'ModalExample'})}/>
      <Button title="WebView" onPress={()=>navigate('WebViewExample',{name:'WebViewExample'})}/>
      <Button title="ScaledWebView" onPress={()=>navigate('ScaledWebView',{name:'ScaledWebView'})}/>
      <Button title="APIDemo" onPress={()=>navigate('APIDemo',{name:'APIDemo'})}/>
      <TouchableHighlight underlayColor="red">
      <Image source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
       style={{width: 400, height: 400}} />
       </TouchableHighlight>
      </View>
      )
  }

}
class ProfileScreen extends Component{
  static navigationOptions = {
    title: 'Welcome',
  }
  render(){
    const {navigate} = this.props.navigation
    return (
      <Button
        title="goto profile"
        onPress={()=> navigate('Profile',{name:'jane'})}
      />
      )
  }

}
const firstProject = StackNavigator({
  Main: {screen: MainScreen},
  Profile:{screen: ProfileScreen},
  AnimatedScreen:{screen:AnimatedScreen},
  ActivityIndicator:{screen:ActivityIndicator},
  ModalExample:{screen:ModalExample},
  TabBarExample:{screen:TabBarExample},
  WebViewExample:{screen:WebViewExample},
  ScaledWebView:{screen:ScaledWebView},
  APIDemo:{screen:APIDemo}
})
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  red:{
    color:'red'
  },
  bigblue:{
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30 
  },
  item:{
    padding:10,
    fontSize: 18,
    height: 44
  },
  sectionHeader:{
    paddingTop:2,
    paddingLeft:10,
    paddingRight:10,
    paddingBottom:2,
    fontSize: 14,
    fontWeight:'bold',
    backgroundColor: 'rgba(247,247,247,1.0)'
  }
});

AppRegistry.registerComponent('firstProject', () => firstProject);
