import React, { Component } from 'react'

class Child extends Component {
  constructor(props){
    super(props)
    this.state = {
      count: 0
    }
  }
  componentWillMount(){
    console.log('will mount');
    
  }
  componentDidMount(){
    console.log('did mount');
    
  }
  componentWillReceiveProps(newProps){
    console.log(newProps);
    console.log('will props ' + newProps.name);
    
  }
  shouldComponentUpdate(){
    console.log('should Update');
    
    return true 
  }
  
  componentWillUpdate(){
    console.log('will Update');
    
  }
  componentDidUpdate(){
    console.log('did update');
    
  }
  render(){
    return <div>
      <p>子组件生命周期测试</p>
      <p>{this.props.name}</p>
    </div>
  }
}

export default Child