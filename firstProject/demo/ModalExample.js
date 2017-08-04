import React, {Component} from 'react'
import {Modal, Text, TouchableHighlight, View,Picker,ProgressViewIOS,SegmentedControlIOS,Slider,Switch} from 'react-native'
export default class ModalExample extends Component{
  static navigationOptions = {
    title: 'Welcome',
  }
	constructor(props) {
		super(props);
		this.state = {modalVisible: false,language:'java',switch:true}
	}
	setModalVisible(visible){
		this.setState({modalVisible:visible})
	}
	render(){
		return (
			<View >

			  <Modal
			  	animationType={"slide"}
			  	transparent={false}
			  	visible={this.state.modalVisible}
			  	onRequestClose={()=>{alert("Modal has been closed")}}
			  >	
			  	<View style={{marginTop: 22}}>
			  	  <View>	
			  	  	<Text>Hello World</Text>
			  	  	<TouchableHighlight onPress={()=>{this.setModalVisible(!this.state.modalVisible)}}>
			  	  	<Text>Hide Modal</Text>
			  	  	</TouchableHighlight>
			  	  </View>
			  	</View>
			  </Modal>
			  <TouchableHighlight onPress={() => {
			  	this.setModalVisible(true)
			  }}>
			  	<Text>Show Modal</Text>
			  </TouchableHighlight>
				<Picker
				  selectedValue={this.state.language}
				  onValueChange={(lang) => this.setState({language: lang})}>
				  <Picker.Item label="Java" value="java" />
				  <Picker.Item label="JavaScript" value="js" />
				</Picker>
				 <ProgressViewIOS />			
				 <SegmentedControlIOS values={['One', 'Two']} />
				 <Slider/>
				 <Switch value={this.state.switch} onValueChange={(a)=>{this.setState({switch: a})}}/>
				</View>)
	}
}