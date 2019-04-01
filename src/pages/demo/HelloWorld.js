import React, { Component } from 'react';
import Child from './Child'
import './hello.less'

class HelloWord extends Component {
  constructor(props){
    super(props);
    this.state = {
      count: 0
    };
  }
  // state ={
  //   count: 0
  // }
  handlerClick=()=>{
    this.setState({
      count: this.state.count + 1
    })
  }

  clickIt(){
    this.setState({
      count: this.state.count + 2
    })
  }

  render(){
    return <div className="content">
      <p>React生命周期介绍</p>
      <button onClick={this.handlerClick}>点击一下</button>
      <button onClick={this.clickIt.bind(this)}>再次点击</button>
      <p>{this.state.count}</p>
      <Child name={this.state.count}></Child>
    </div>
  }
};

export default HelloWord
