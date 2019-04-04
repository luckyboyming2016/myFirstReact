import React,{Component} from 'react'
import {Card, message, Icon, Tabs } from 'antd'
import './index.less'
const TabPane = Tabs.TabPane
class Tab extends Component {
  
  changeTab=(key)=>{
    message.info('你点击了 '+key);
  }
  
  constructor(props){
    super(props);
    this.newTabIndex = 0;
    const panel = [
      {title: 'tab1',key: '1', content: '你在干嘛呢，吃饭了'},
      {title: 'tab2',key: '2', content: '你在吗'},
      {title: 'tab3',key: '3', content: '还没学会呀，垃圾'}
    ]
    this.state = {
      activeKey: panel[0].key,
      panel,
    };
    // this.setState({
    //   panel
    // })
  }
  onChange = (activeKey) => {
    this.setState({
      activeKey
    });
  }
  onEdit = (targetKey, action) => {
    this[action](targetKey);
  }
  add = () => {
    const panes = this.state.panel;
    const activeKey = `newTab ${this.newTabIndex++}`;
    panes.push({
      title: activeKey,
      content: '新添加的' + activeKey,
      key: activeKey
    });
    this.setState({
      panel: panes,
      activeKey
    });
  }

  remove = (targetKey) => {
    let activeKey = this.state.activeKey;
    let lastIndex;
    this.state.panel.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const panel = this.state.panel.filter(pane => pane.key !== targetKey);
    if (panel.length && activeKey === targetKey) {
      if (lastIndex >= 0) {
        activeKey = panel[lastIndex].key;
      } else {
        activeKey = panel[0].key;
      }
    }
    this.setState({
      panel,
      activeKey
    });
  }

  render(){
    return (
      <div className="uiButton">
        <Card title="Tab标签" className="cardWarp">
          <Tabs defaultActiveKey="1" onChange={this.changeTab}>
            <TabPane tab="Tab 1" key="1">你在学react吗</TabPane>
            <TabPane tab="Tab 2" key="2">react你学到了什么知识</TabPane>
            <TabPane tab="Tab 3" key="3" disabled>你个混蛋，啥都不会</TabPane>
          </Tabs>
        </Card>
        <Card title="Tab带图标的标签" className="cardWarp">
          <Tabs defaultActiveKey="1" onChange={this.changeTab}>
            <TabPane tab={<span><Icon type="apple" />Tab1</span>} key="1">你在学react吗</TabPane>
            <TabPane tab={<span><Icon type="android" />Tab2</span>} key="2">react你学到了什么知识</TabPane>
            <TabPane tab={<span><Icon type="delete" />Tab3</span>} key="3">你个混蛋，啥都不会</TabPane>
          </Tabs>
        </Card>
        <Card title="动态创建的标签" className="cardWarp">
          <Tabs defaultActiveKey="1" onChange={this.onChange} activeKey={this.state.activeKey} type="editable-card" onEdit={this.onEdit}>
           { 
             this.state.panel.map((panel)=>{
              return <TabPane tab={panel.title} key={panel.key}>{panel.content}</TabPane>
             })
           }
           
          </Tabs>
        </Card>
      </div>
    );
  }
}

export default Tab