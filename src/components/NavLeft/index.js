import React, { Component } from 'react'
import { Menu, Icon } from 'antd'
import { NavLink } from 'react-router-dom'
import './index.less'
import Menujson from '../../config/menuConfig'
// import SubMenu from '_antd@3.15.2@antd/lib/menu/SubMenu';
// import { connect } from 'react-redux'
// import { switchMenu } from './../../redux/action'

const SubMenu = Menu.SubMenu
class NavLeft extends Component {
  state = {
    currentKey: ''
  }
  componentWillMount(){
    let menuName = this.rendMenu(Menujson)
    let currentKey = window.location.hash.replace(/#|\?.*$/, '')
    this.setState({
      menuName,
      currentKey
    })
  }
  handleClick=({item, key})=>{
    let { dispatch } = this.props
    console.log('item', item, 'dispatch', dispatch)
   // dispatch(switchMenu(item.item.props.title))
    this.setState({
      currentKey: key
    })
  }
  rendMenu=(data)=>{
    console.log(data)
    return data.map((item)=>{
      if(item.children){
        return (
          <SubMenu key={item.key} title={<span><Icon type={item.icon} /><span>{item.title}</span></span>}>
            { this.rendMenu(item.children) }
          </SubMenu>
        )
      }
      return (
        <Menu.Item key={item.key}>
          {/* <Icon type={item.icon} />{item.title} */}
          <NavLink to={item.key}><Icon type={item.icon} /><span>{item.title}</span></NavLink>
        </Menu.Item>
      )
    })
  }
  render() {
    return ( 
      <div className="menu-wrap">
        <div className="logo">
          <img alt="logo" className="response_img" src="/assets/logo.png" />
        </div>
        <Menu theme='dark' onClick={this.handleClick} defaultSelectedKeys={[this.state.currentKey]} style={{textAlign:'left'}}>
          { this.state.menuName }
        </Menu>
        {/* <Menu 
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['1']}
          mode='vertical'
          theme='dark'>
          <Menu.Item key="1">
            <Icon type="mail" />测试1
          </Menu.Item>
          <Menu.Item key="2">
            <Icon type="calendar" />测试2
          </Menu.Item>
          <SubMenu key="sub1" title={<span><Icon type="bar-chart" /><span>测试3</span></span>}>
            <Menu.Item key="3">测试4</Menu.Item>
            <Menu.Item key="4">测试5</Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>测试6</span></span>}>
            <Menu.Item key="5">测试7</Menu.Item>
            <Menu.Item key="6">测试8</Menu.Item>
          </SubMenu>
          <Menu.Item key="7">
            <Icon type="setting" />测试9
          </Menu.Item>
        </Menu> */}
      </div>
    )
  }
}
// export default connect()(NavLeft)
export default NavLeft