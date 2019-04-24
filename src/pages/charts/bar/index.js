import React,{Component} from 'react'
import { Card } from 'antd'
import echartsTheme from './../echartTheme'
import echarts from 'echarts'
// //按需加载
// import echarts from 'echarts/lib/echarts';
//导入柱形图
// import 'echarts/lib/chart/bar'
// import 'echarts/lib/component/tooltip'
// import 'echarts/lib/component/legend'
// import 'echarts/lib/component/title'
// import 'echarts/lib/component/markPoint'


import ReactEchart from 'echarts-for-react'

class Bar extends Component {
  componentWillMount(){
    console.log(echarts);
    echarts.registerTheme('testTheme', echartsTheme);
  }
  setOption=()=>{
    let option = {
      title: {
        text: '用户骑行订单'
      },
      tooltip: {
        trigger: 'axis'
      },
      xAxis: {
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          type: 'bar',
          name: '订单量',
          data: [1200,2300,1280,2800,3500,4500,2300]
        }
      ]
    }
    return option
  }
  setOption2 = () => {
    let option = {
      title: {
        text: '用户骑行订单'
      },
      legend: {
        data: ['OFO','摩拜','哈罗']
      },
      tooltip: {
        trigger: 'axis'
      },
      xAxis: {
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          type: 'bar',
          name: 'OFO',
          data: [1200, 2300, 1280, 2800, 3500, 4500, 2300]
        },
        {
          type: 'bar',
          name: '摩拜',
          data: [1400, 2600, 2880, 3500, 6000, 7500, 5900]
        },
        {
          type: 'bar',
          name: '哈罗',
          data: [2200, 3300, 4280, 5800, 6500, 8500, 9000]
        }
     ]
    }
    return option
  }
  render(){
    return (
      <div>
        <Card title="柱形图表之一" className="cardWarp">
          <ReactEchart option={this.setOption()} theme="testTheme" style={{height:400}} />
        </Card>
        <Card title="柱形图表之二">
          <ReactEchart option={this.setOption2()} theme="testTheme" style={{height:400}} />
        </Card>
      </div>
    );
  }
}

export default Bar