import React, {Component} from 'react'
import {Animated, Easing} from 'react-native'
export default class FadeInView extends Component{
	constructor(props) {
		super(props);
		this.state = {
			fadeAnim: new Animated.Value(0), // 透明过度初始值设为0
		}
	}
	componentDidMount() {
		this.timer = setTimeout(()=>{
      Animated.timing( // 随时间变化而执行的动画类型
		  this.state.fadeAnim, // 动画中的变量值
		  {
		  	toValue: 1,  // 透明度最终变为1，即完全不透明
		  	easing: Easing.back,
    		duration: 2000,
		  }
		).start() // 开始执行动画
    },1000)
	}
	componentWillUnmount() {
		this.timer && clearTimeout(this.timer)
	}
	render(){
	  return (
	  	<Animated.View // 可动画的视图组件
	  	  style={{
	  	  	...this.props.style,
	  		opacity:this.state.fadeAnim // 将透明度指定为动画变量值
	   		}}	
	  	>
	  	{this.props.children}
	  	</Animated.View>
	  	)	
	}	
}