import React, { Component } from 'react'
import { Select, Form, Input, Button, DatePicker } from 'antd';
import Util from './../../config/until'
import moment from 'moment'
const FormItem = Form.Item
class SearchForm extends Component {
  inforList=()=>{
    const formList = this.props.formList
    const {  getFieldDecorator   } = this.props.form
    const formItemList = []
    if(formList && formList.length>0){
      formList.forEach((item,index)=>{
        const field = item.field
        const width = item.width
        const initialValue = item.initialValue || ''
        const placeholder = item.placeholder
        const label = item.label
        const type = item.type
        if(type === 'INPUT'){
          const INPUT = <FormItem label={label} key={field}>
            {
              getFieldDecorator(field)(
                 <Input style={{ width: width }} type="text" placeholder={placeholder} />
              )
            }
          </FormItem>
          formItemList.push(INPUT)
        }else if(type==="SELECT"){
          const SELECT = <FormItem label={label} key={field}>
            {
              getFieldDecorator(field,{
                initialValue: initialValue
              })(
                <Select style={{ width: width }} placeholder={placeholder}>
                   { Util.getOption(item.list) }
                </Select>
              )
            }
          </FormItem>
          formItemList.push(SELECT)
        }else if(type === 'DATAPICKER_GROUP'){
          const dateStart = <FormItem label={label} key="begin_time">
            {
              getFieldDecorator('begin_time', {
                initialValue: moment()
              })(
                 <DatePicker showTime={true} format="YYYY-MM-DD HH:mm:ss" placeholder={placeholder} />
              )
            }
          </FormItem>
          const dateEnd = <FormItem label="" key="end_time">
            {
              getFieldDecorator('end_time', {
                initialValue: moment().add('day', 7)
              })(
                 <DatePicker showTime={true} format="YYYY-MM-DD HH:mm:ss" placeholder={placeholder} />
              )
            }
          </FormItem>
          formItemList.push(dateStart)
          formItemList.push(dateEnd)
        }else if(type === "DATAPICKER_SINGLE"){
          const single = <FormItem label={label} key={field}>
            {
              getFieldDecorator(field)(
                 <DatePicker showTime={true} format="YYYY-MM-DD HH:mm:ss" placeholder={placeholder} />
              )
            }
          </FormItem>
          formItemList.push(single) 
        }
      })
    }
    return formItemList
  }
  submitFormSearch=()=>{
    const val = this.props.form.getFieldsValue()
    this.props.getPostData(val)
  }
  resetFormSearch=()=>{
    this.props.form.resetFields()
  }
  render(){
    return (
      <Form layout="inline">
        { this.inforList() }
        <FormItem>
          <Button type="primary" onClick={this.submitFormSearch}>确定</Button>
          <Button onClick={this.resetFormSearch}>重置</Button>
        </FormItem>
      </Form>
    );
  }
}

export default Form.create({})(SearchForm)