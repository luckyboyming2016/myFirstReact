import React, {Component} from 'react'
import axios from './../../jsonp'
import BaseFormSearch from '../../components/BaseSearchForm'
import { Form, Card, Button} from 'antd'

class bikeMap extends Component {
  state = { }
  formList = [
    {
      type: 'SELECT',
      width:100,
      field: 'country',
      initialValue: '0',
      placeholder: '请选择城市',
      label: '城市',
      list: [
        {key: '0',value: '全部'},
        {key: '1',value: '北京'},
        {key: '2',value: '上海'}
      ]
    },
    {
      label: '订单时间',
      type: 'DATAPICKER_GROUP',
      placeholder: '请选择时间'
    },
    {
      type: 'SELECT',
      label: '订单状态',
      width:100,
      field: 'status',
      placeholder: '请选择订单状态',
      initialValue: '1',
      list: [
        {key: '1',value: '全部'},
        {key: '2',value: '进行中'},
        {key: '3',value: '已结束'}
      ]
    }
  ]
  params ={
    page: 1
  }
  componentDidMount(){
    this.postFormData()
  }
  postFormData = (data) => {
    console.log(data)
    axios.ajax({
      url: '/bikeMap/list',
      params: {
        param: {...data},
        page: this.params.page
      }
    }).then((res)=>{
      console.log(res);
      if(res.code === 0){
        this.renderMap(res.result)
      }
    })
  }
  renderMap(res){
    let totalCount = res.total_count
    let serviceList = res.route_list //起点，终点
    //获取起点终点
    this.map = new window.BMap.Map('container', { enableMapClick: false })
   
    //起点
    let gps1 = serviceList[0].split(',')
    let startPoint = new window.BMap.Point(gps1[0], gps1[1])
    //终点
    let gps2 = serviceList[serviceList.length-1].split(',')
    let endPoint = new window.BMap.Point(gps2[0], gps2[1])
    this.map.centerAndZoom(endPoint, 11) //以结束点为中心
    //起点图标
    let startIcon = new window.BMap.Icon('/assets/start_point.png', new window.BMap.Size(36, 42), {
      imageSize: new window.BMap.Size(36,42),
      anchor: new window.BMap.Size(18,42)
    })
    let startMarker = new window.BMap.Marker(startPoint, {
      icon: startIcon
    })
    this.map.addOverlay(startMarker)
    //终点图标
    let endIcon = new window.BMap.Icon('/assets/end_point.png', new window.BMap.Size(36, 42), {
      imageSize: new window.BMap.Size(36, 42),
      anchor: new window.BMap.Size(18, 42)
    })
    let endMarker = new window.BMap.Marker(endPoint, {
      icon: endIcon
    })
    this.map.addOverlay(endMarker)

    //绘制超点，终点连接线
    let routeList = []
    serviceList.forEach(item => {
      let aa = item.split(',')
      let point = new window.BMap.Point(aa[0],aa[1])
      routeList.push(point)
    })
    let polyline = new window.BMap.Polyline(routeList,
      { strokeColor: "blue", strokeWeight: 2, strokeOpacity: 1 }
    );
    this.map.addOverlay(polyline)
    
    //绘制服务区路线
    let service_list = res.service_list
    let serviceArr = []
    service_list.forEach(item=>{
      let servicePoint = new window.BMap.Point(item.lon,item.lat)
      serviceArr.push(servicePoint)
    })
    console.log(serviceArr);
    
    let polyService = new window.BMap.Polyline(serviceArr,{
      strokeColor: 'red', strokeWeight: 2, strokeOpacity:1
    })
    this.map.addOverlay(polyService)

    //绘制地图中的自行车
    let bike_list = res.bike_list
    let bikeIcon = new window.BMap.Icon('/assets/bike.jpg', new window.BMap.Size(36, 42), {
      imageSize: new window.BMap.Size(36, 42),
      anchor: new window.BMap.Size(18, 42)
    })
 
    bike_list.forEach(item => {
      let bikeItem = item.split(',')
      let bikePoint = new window.BMap.Point(bikeItem[0], bikeItem[1])
      let bikeMarker = new window.BMap.Marker(bikePoint, {
        icon: bikeIcon
      })
      this.map.addOverlay(bikeMarker)
    })
   
    var topRightControl = new window.BMap.NavigationControl({
      anchor: window.BMAP_ANCHOR_TOP_RIGHT
    });
    this.map.addControl(topRightControl); //平移缩放控件
    this.map.addControl(new window.BMap.MapTypeControl({ //地图类型
      anchor: window.BMAP_ANCHOR_TOP_LEFT
    }))

    this.map.addEventListener('click', function (e) {
      console.log(e);
      
      alert('你点击了地图')
    })

    this.setState({
      totalCount: totalCount,
      topRightControl: topRightControl
    })
  }
  delMapType=()=>{
    this.map.removeControl(this.state.topRightControl)
  }
  render(){
    return (
      <div>
        <Card className="cardWarp">
          <BaseFormSearch formList={this.formList} getPostData={this.postFormData}/>
        </Card>
        <Card>
          <div>共{this.state.totalCount}辆车<Button type="primary" size="small" style={{marginLeft:20}} onClick={this.delMapType}>删除平移缩放控件</Button></div> 
          <div id="container" style={{height:500,marginTop:20}}></div> 
        </Card>
      </div>
    );
  }
}

export default Form.create()(bikeMap)

