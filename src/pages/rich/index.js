import React, {Component} from 'react'
// import axios from './../../jsonp'

import {  Card, Button} from 'antd'

class Rich extends Component {
  render(){
    return (
      <div>
        <Card title="富文本编辑器">
          <Button type="primary">清空内容</Button>
          <Button type="primary" style={{marginLeft:20}}>获取html文本</Button>
        </Card>
        <Card>

        </Card>
      </div>
    );
  }
}

export default Rich