import React, { Component } from "react";
import { Card } from 'antd'
import './index.less'
import axios from '../../../jsonp/index'
import './../../../style/css/common.less'

class Detail extends Component {
  state={}
  componentDidMount(){
    let id = this.props.match.params.id
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
        this.renderMap(res.result)
      }
    })
  }

  renderMap=(result)=>{
    this.map = new window.BMap.Map("mapDetail",{enableMapClick: false});
    //this.map.centerAndZoom('北京', 11)
    this.map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
    //添加地图控件
    this.addMapControl()
    //调用路线图绘制方法
    this.drawBikeRoute(result.position_list)
    //调用服务区绘制方法
    this.drawServiceRoute(result.area)
  }

  addMapControl=()=>{
    let map = this.map
    map.addControl(new window.BMap.ScaleControl({  
      anchor: window.BMAP_ANCHOR_TOP_LEFT //显示地图的比例关系 控件定位于地图的左上角
    }));
    map.addControl(new window.BMap.NavigationControl({
      anchor: window.BMAP_ANCHOR_TOP_RIGHT //平移缩放控件 定位于地图的右上角
    }));
  }
  drawBikeRoute = (result) => {
    console.log(result);
    let map = this.map
    let startPoint = ''
    let endPoint = ''
    if(result.length>0){
      let start = result[0]
      let end = result[result.length-1]
      startPoint = new window.BMap.Point(start.lon, start.lat)
      let startIcon = new window.BMap.Icon('/assets/start_point.png',new window.BMap.Size(36,42),{
        imageSize: new window.BMap.Size(36, 42),
        anchor: new window.BMap.Size(36,42)
      })
      let startMarker = new window.BMap.Marker(startPoint,{icon:startIcon});
      map.addOverlay(startMarker)

      endPoint = new window.BMap.Point(end.lon, end.lat)
      let endIcon = new window.BMap.Icon('/assets/end_point.png', new window.BMap.Size(36, 42), {
        imageSize: new window.BMap.Size(36, 42),
        anchor: new window.BMap.Size(36, 42)
      })
      let endMarker = new window.BMap.Marker(endPoint,{icon:endIcon});
      map.addOverlay(endMarker)
      
      //连接路线图
      let trackPoint = []
      for(var i=0;i<result.length;i++){
        let point = result[i]
        trackPoint.push(new window.BMap.Point(point.lon,point.lat))
      }
      console.log('trackPoint ',trackPoint);
      
      let polyLine = new window.BMap.Polyline(trackPoint, {
        strokeColor: "blue",
        strokeWeight:3,
        strokeOpacity: 1
      })
      map.addOverlay(polyLine)
      map.centerAndZoom(endPoint, 11)
    }
  }
  drawServiceRoute =(result)=>{
    let map = this.map
    //连接路线图
    let trackPoint = []
    for (var i = 0; i < result.length; i++) {
      let point = result[i]
      trackPoint.push(new window.BMap.Point(point.lon, point.lat))
    }
    // 绘制服务区
    let polygon = new window.BMap.Polygon(trackPoint, {
      strokeColor: "#ce0000",
      strokeWeight: 4,
      strokeOpacity: 1,
      fillColor: '#ff8605',
      fillOpacity: .5
    })
    map.addOverlay(polygon)
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