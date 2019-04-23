import React, {Component} from 'react'
import axios from './../../jsonp'
import BaseFormSearch from '../../components/BaseSearchForm'
import { Form, Card} from 'antd'

class City extends Component {
  state = {
    showOpenLayer: false
  }
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
      url: '/user/table/list',
      params: {
        param: {...data},
        page: this.params.page
      }
    }).then((res)=>{
      console.log(res);
      if(res.code === 0){
       // message.info('提交成功')
      }
    })
  }
  componentWillUnmount(){
    clearTimeout(this.timer)
  }
  render(){
    return (
      <div>
        <Card className="cardWarp">
          <BaseFormSearch formList={this.formList} getPostData={this.postFormData}/>
        </Card>
        <Card className="btnUser">
         fsafsa
        </Card>
      </div>
    );
  }
}

export default Form.create()(City)

