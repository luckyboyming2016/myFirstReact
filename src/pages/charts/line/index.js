import React,{Component} from 'react'
import { Card } from 'antd'
import echartsTheme from './../echartTheme'
import echarts from 'echarts'
import ReactEchart from 'echarts-for-react'

class Line extends Component {
  componentWillMount(){
    echarts.registerTheme('testTheme', echartsTheme);
  }
  setOption = () => {
    let option = {
      title: {
        text: '用户骑行订单',
        textStyle: {
          color: '#1890ff'
        }
      },
      tooltip: {
        trigger: 'axis'
      },
      yAxis: {
        type: 'value'
      },
      xAxis: {
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      },
      series: [
        {
          type: 'line',
          name: '订单量',
          data: [200, 380, 430, 550, 300, 650, 980]
        }
     ]
    }
    return option
  }
  setOption2 = () => {
    let option = {
      title: {
        text: '用户骑行订单',
        textStyle: {
          color: '#1890ff'
        }
      },
      legend: {
        data: ['OFO', '摩拜', '哈罗']
      },
      xAxis: {
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      },
      yAxis: {
        type: 'value'
      },
      tooltip: {
        trigger: 'axis',
        // {a}（系列名称）series/name，{b}（数据项名称）series/data/name，{c}（数值）series/data/value, {d} series/data/value换算的（百分比） 
        formatter: '{a}<br>{b}:{c} ({d}%)'
      },
      series: [
        {
          type: 'line',
          name: 'OFO', 
          data: [200, 380, 430, 550,300,650,980]
        },
        {
          type: 'line',
          name: '摩拜',
          data: [300, 280, 530, 650, 240, 850, 1080]
        },
        {
          type: 'line',
          name: '哈罗',
          data: [100, 380, 630, 350, 900, 1250, 980]
        }
      ]
    }
    return option
  }
  setOption3 = () => {
    let option = {
      title: {
        text: '用户骑行订单',
        textStyle: {
          color: '#1890ff'
        }
      },
      tooltip: {
        trigger: 'axis'
      },
      yAxis: {
        type: 'value'
      },
      xAxis: {
        boundaryGap: false,
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      },
      series: [{
        type: 'line',
        name: '订单量',
        areaStyle: {}, //默认填充主题色
        data: [200, 380, 430, 550, 300, 650, 980]
      }]
    }
    return option
  }
  render(){
    return (
      <div>
        <Card title="折线图之一" className="cardWarp">
          <ReactEchart option={this.setOption()} theme="testTheme" style={{height:400}} />
        </Card>
        <Card title="折线图之二" className="cardWarp">
          <ReactEchart option={this.setOption2()} theme="testTheme" style={{height:400}} />
        </Card>
        <Card title="折线图之三">
          <ReactEchart option={this.setOption3()} theme="testTheme" style={{height:400}} />
        </Card>
      </div>
    );
  }
}

export default Line