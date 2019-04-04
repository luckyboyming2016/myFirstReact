import React,{Component} from 'react'
import {Card, Form, Input, Button } from 'antd'
import './index.less'
var FormItem= Form.Item
class FormLogin extends Component {
  render(){
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="uiButton">
        <Card title="登录行内表单" className="cardWarp">
          <Form layout="inline">
            <FormItem>
              <Input placeholder="请输入用户名"></Input>
            </FormItem>
            <FormItem>
              <Input type="password" placeholder="请输入密码"></Input>
            </FormItem>
            <FormItem>
              <Button type="primary">登录</Button>
            </FormItem>
          </Form> 
        </Card>
         <Card title="登录水平表单" className="cardWarp">
          <Form style={{width:300}}>
            <FormItem>
              {
                getFieldDecorator('userName', {
                  initialValue: 'Jack',
                  rules: []
                })(
                  <Input placeholder="请输入用户名"></Input>
                )
              }
              
            </FormItem>
            <FormItem>
              {
                getFieldDecorator('password', {
                  initialValue: '123456',
                  rules: []
                })(
                  <Input type="password" placeholder="请输入密码"></Input>
                )
              }
              
            </FormItem>
            <FormItem>
              <Button block type="primary">登录</Button>
            </FormItem>
          </Form> 
        </Card>
      </div>
    );
  }
}

export default Form.create()(FormLogin);