import React, {Component} from 'react'
import {ActivityIndicator, StyleSheet, View,DatePickerIOS,Text,TextInput} from 'react-native'
import TimerMixin from 'react-timer-mixin'

export default class ActivityIndicatorDemo extends Component{
	constructor(props) {
		super(props);
		this.state = {
			animating: true,
			date: new Date()
		}
	}

	setToggleTimeout() {
		this.timer = setTimeout(()=>{
			this.setState({animating: !this.state.animating})
			this.setToggleTimeout()
		}, 2000)
	}
	componentDidMount() {
		this.setToggleTimeout()
	}
	componentWillUnmount() {
		this.timer && clearTimeout(this.timer)
	}
	onDateChange (date) {
 		this.setState({date: date});
	}
	render(){
		return (
		<View>	
		  <ActivityIndicator
		  	animating={this.state.animating}
		  	style={[styles.centering,{height:80}]}
		  	size="large"
		  />	
		  <DatePickerIOS 
		  date={this.state.date} 
		  onDateChange={(date)=>this.onDateChange(date)}/>
		  </View>
		)
	}
}
ActivityIndicatorDemo.defaultProps = {
  name: new Date()
};
const styles = StyleSheet.create({
  centering: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  gray: {
    backgroundColor: '#cccccc',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 8,
  },
});
