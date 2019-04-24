import React,{Component} from 'react'
import { Card } from 'antd'
import echartsTheme from './../themeLight'
import echarts from 'echarts'
import ReactEchart from 'echarts-for-react'

class Pie extends Component {
  componentWillMount(){
    echarts.registerTheme('testTheme', echartsTheme);
  }
  setOption = () => {
    let option = {
      title: {
        text: '用户骑行订单',
        x: 'center'
      },
      legend: {
        orient: 'vertical',
        right: 10,
        top: 20,
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      },
      tooltip: {
        trigger: 'item',
       // {a}（系列名称）series/name，{b}（数据项名称）series/data/name，{c}（数值）series/data/value, {d} series/data/value换算的（百分比） 
        formatter: '{a}<br>{b}:{c} ({d}%)'
      },
      series: [
        {
          type: 'pie',
          name: '订单量',
          center: ['50%','55%'],
          data: [
            { name:'周一',  value: 200 },
            { name:'周二',  value: 380 },
            { name:'周三',  value: 430 },
            { name:'周四',  value: 550 },
            { name:'周五',  value: 300 },
            { name:'周六',  value: 650 },
            { name:'周日',  value: 980 }
          ]
        }
     ]
    }
    return option
  }
  setOption2 = () => {
    let option = {
      title: {
        text: '用户骑行订单',
        x: 'center'
      },
      legend: {
        orient: 'vertical',
        right: 10,
        top: 20,
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      },
      tooltip: {
        trigger: 'item',
        // {a}（系列名称）series/name，{b}（数据项名称）series/data/name，{c}（数值）series/data/value, {d} series/data/value换算的（百分比） 
        formatter: '{a}<br>{b}:{c} ({d}%)'
      },
      series: [{
        type: 'pie',
        name: '订单量',
        radius: ['35%','50%'], 
        data: [{
            name: '周一',
            value: 200
          },
          {
            name: '周二',
            value: 380
          },
          {
            name: '周三',
            value: 430
          },
          {
            name: '周四',
            value: 550
          },
          {
            name: '周五',
            value: 300
          },
          {
            name: '周六',
            value: 650
          },
          {
            name: '周日',
            value: 980
          }
        ]
      }]
    }
    return option
  }
  setOption3 = () => {
    let option = {
      title: {
        text: '用户骑行订单',
        x: 'center'
      },
      legend: {
        orient: 'vertical',
        right: 10,
        top: 20,
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      },
      tooltip: {
        trigger: 'item',
        // {a}（系列名称）series/name，{b}（数据项名称）series/data/name，{c}（数值）series/data/value, {d} series/data/value换算的（百分比） 
        formatter: '{a}<br>{b}:{c} ({d}%)'
      },
      roseType: 'radius',
      series: [{
        type: 'pie',
        name: '订单量',
        center: ['50%', '55%'],
        data: [{
            name: '周一',
            value: 200
          },
          {
            name: '周二',
            value: 380
          },
          {
            name: '周三',
            value: 430
          },
          {
            name: '周四',
            value: 550
          },
          {
            name: '周五',
            value: 300
          },
          {
            name: '周六',
            value: 650
          },
          {
            name: '周日',
            value: 980
          }
        ].sort((a, b) => { //从小到大排序
          return a.value - b.value
        })
      }]
    }
    return option
  }
  render(){
    return (
      <div>
        <Card title="饼形图之一" className="cardWarp">
          <ReactEchart option={this.setOption()} theme="testTheme" style={{height:400}} />
        </Card>
        <Card title="饼形图之二" className="cardWarp">
          <ReactEchart option={this.setOption2()} theme="testTheme" style={{height:400}} />
        </Card>
        <Card title="饼形图之三">
          <ReactEchart option={this.setOption3()} theme="testTheme" style={{height:400}} />
        </Card>
      </div>
    );
  }
}

export default Pie