import React, { Component } from "react";
import { Card } from 'antd'
import './index.less'
import axios from '../../../jsonp/index'
import './../../../style/css/common.less'

class Detail extends Component {
  state={}
  componentDidMount(){
    let id = this.props.match.params.id
    console.log(id);
    this.getPostData(id)
  }
  getPostData=(id)=>{
    axios.ajax({
      url: '/order/detail',
      params: {
        page: id
      }
    }).then((res) => {
      if(res.code === 0){
        this.setState({
          orderInfor: res.result
        })
        this.renderMap()
      }

    })
  }

  renderMap=()=>{
    this.map = new window.BMap.Map("mapDetail",{enableMapClick: false});
    this.map.centerAndZoom('上海', 15)
    this.addMapControl()
  }

  addMapControl=()=>{
    let map = this.map
    map.addControl(new window.BMap.ScaleControl({
      anchor: window.BMAP_ANCHOR_TOP_LEFT
    }));
    map.addControl(new window.BMap.NavigationControl({
      anchor: window.BMAP_ANCHOR_TOP_RIGHT
    }));
  }
  render(){
    const infor = this.state.orderInfor || {}
    return (
      <Card>
        <div id="mapDetail" className="order_map">地图</div>
        <div className="detail_row">
          <div className="list-wrap">
            <h4 className="f20">基础信息</h4>
            <ul>
              <li><span>{infor.mode === 1 ? '服务区' : '停车点'}</span><span className="fl">用车模式</span></li>
              <li><span>{infor.order_sn}</span><span className="fl">订单编号</span></li>
              <li><span>{infor.bike_sn}</span><span className="fl">车辆编号</span></li>
              <li><span>{infor.user_name}</span><span className="fl">用户姓名</span></li>
              <li><span>{infor.mobile}</span><span className="fl">手机号码</span></li>
            </ul>
            <h4 className="f20" style={{lineHeight:'60px',borderTop:'1px solid #ddd'}}>行驶轨迹</h4>
            <ul>
              <li><span>{infor.start_location}</span><span className="fl">行程起点</span></li>
              <li><span>{infor.end_location}</span><span className="fl">行程终点</span></li>
              <li><span>{infor.distance/1000}公里</span><span className="fl">行驶里程</span></li>
            </ul>
          </div>
        </div> 
        
      </Card>
      
    );
  }
}

export default Detail