import React, { Component } from 'react'
import { Menu, Icon } from 'antd'
import './index.less'
import Menujson from '../../config/menuConfig'
import SubMenu from '_antd@3.15.2@antd/lib/menu/SubMenu';

class NavLeft extends Component {
  componentWillMount(){
    let menuName = this.rendMenu(Menujson)
    this.setState({
      menuName
    })
  }
  rendMenu=(data)=>{
    console.log(data)
    return data.map((item)=>{
      if(item.children){
        return (
          <SubMenu key={item.key} title={<span><Icon type={item.icon} />{item.title}</span>}>
            { this.rendMenu(item.children) }
          </SubMenu>
        )
      }
      return (
        <Menu.Item key={item.key}>
          <Icon type={item.icon} />{item.title}
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
        <Menu theme='dark'>
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


export default NavLeft