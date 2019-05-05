import React, {Component} from 'react'
import axios from './../../jsonp'
import Until from './../../config/until';
import { Form, Input, Select, Table, Card, Button, Modal, message, Tree, Transfer} from 'antd'
import menuConfig from './../../config/menuConfig'
const FormItem = Form.Item
const Option = Select.Option
const { TreeNode } = Tree
class Premission extends Component {
  state = {
    dialogCreate: false,
    diaolgAuthor: false,
    dialogUser: false
  }
  componentWillMount(){
    this.requestList()
  }
  requestList=()=>{
    axios.ajax({
      url: '/role/list',
      params:{}
    }).then(res=>{
      if(res.code === 0){
        this.setState({
          tableData: res.result.item_list
        })
      }
    })
  }
  createRole=()=>{
    this.setState({
      dialogCreate: true
    })
  }
  submitDialog=()=>{
    let val = this.getCreateVal.props.form.getFieldsValue()
    console.log(val)
    this.getCreateVal.props.form.resetFields()
    
    this.setState({
      dialogCreate: false
    })
  }

  onRowClickData = (selectedRows, id) => {
    let selectedKey = [id]
    this.setState({
      selectedRowKeys: selectedKey,
      selectItem: selectedRows
    })
    this.timer = setTimeout(() => {
      this.getNextPage(this.state.selectedRowKeys);
    }, 500);
  }
  getNextPage=(rowId)=>{
    console.log('结果',rowId);
  }
  componentWillUnmount() {
    clearTimeout(this.timer)
  }
  //设置权限
  setAuthor=()=>{
   // let key = this.state.selectedRowKeys
    let rowItem = this.state.selectItem
    if(!rowItem){
      message.info('请选择一行数据')
      return
    }
    let menuInfo = rowItem.menus || []
    console.log(rowItem, menuInfo);
    this.setState({
      diaolgAuthor: true,
      itemAuthorInfor: rowItem,
      menuInfo: menuInfo
    })

  }
  handlerAuthorSubmit=()=>{
    let data = this.authorValue.props.form.getFieldsValue()
    data.id = this.state.itemAuthorInfor.key
    data.menuInfo = this.state.menuInfo
    axios.ajax({
      url: '/role/list',
      params: {
        data: {...data}
      }
    }).then(res=>{
      if(res.code === 0){
        this.authorValue.props.form.resetFields()
        this.setState({
          diaolgAuthor: false,
          
        })
        this.requestList()
      }
    })
  }
  //用户授权
  userAuthor=()=>{
    let rowItem = this.state.selectItem
    if (!rowItem) {
      message.info('请选择一行数据')
      return
    }
    this.renderPostData(rowItem)
    this.setState({
      dialogUser: true,
      itemAuthorInfor: rowItem
    })
  }
  renderPostData=(res) => {
    console.log(res.key)
    axios.ajax({
      url: '/user/authorization',
      params: {
        id: res.key
      }
    }).then((res)=>{
      if(res.code === 0){
        this.renderUserData(res.result)
      }
    })
  }
  renderUserData=(data)=>{
    console.log(data);
    let targetData = []
    const sourceData = []
    data.forEach(item=>{
      if (item.status === 1) {
        targetData.push(item.user_id) //目标区域只需要key值，是数据源刷选出来的
      }
      sourceData.push({
        key: item.user_id,
        title: item.user_name,
      })
    })
    this.setState({
      sourceData: sourceData, //数据源需要完整的数据
      targetData: targetData  //目标数据是数据源中刷选出来的
    })
    
  }
  handlerUserAuthor=()=>{
    let data = {
      id: this.state.itemAuthorInfor.key,
      user_id: this.state.targetData
    }
    console.log(data);
    
    axios.ajax({
      url: '/role/list',
      params: {
        ...data
      }
    }).then(res=>{
      if(res.code === 0){
        this.setState({
          dialogUser: false
        })
      }
    })
  }
  render(){
    const column = [
      {
        title: '角色id',
        key: 'key',
        dataIndex: 'key'
      }, {
        title: '角色名称',
        key: 'role_name',
        dataIndex: 'role_name',
        render: (role_name) => {
          return {
            1: '管理员',
            2: '财务专员',
            3: '运营人员',
            4: '总经理',
            5: '董事长',
            6: '普通职员',
          }[role_name]
        }
      }, {
        title: '授权人',
        key: 'authorize_user_name',
        dataIndex: 'authorize_user_name'
      }, {
        title: '状态',
        key: 'status',
        dataIndex: 'status',
        render: (status) => {
          return status === 1 ? '启用': '禁用'
        }
      }, {
        title: '授权时间',
        key: 'authorize_time',
        dataIndex: 'authorize_time',
        render: (authorize_time) => {
          return Until.formate(authorize_time)
        }
      }, {
        title: '创建时间',
        key: 'create_time',
        dataIndex: 'create_time',
        render: (create_time) => {
          return Until.formate(create_time)
        }
      }
    ]
    const { selectedRowKeys } = this.state
    const rowSelection = {
      type: 'radio',
      selectedRowKeys,
      onChange: ((selectedRowKeys, selectedRows) => {
        this.setState({
          selectedRowKeys,
          selectedRows
        })
        this.timer = setTimeout(() => {
          this.getNextPage(this.state.selectedRowKeys);
        }, 500);
      })
    }
    return (
      <div>
        <Card className="btnUser">
          <Button type="primary" onClick={this.createRole}>创建角色</Button>
          <Button type="primary" onClick={this.setAuthor}>设置权限</Button>
          <Button type="primary" onClick={this.userAuthor}>用户授权</Button>
        </Card>
        <div style={{marginTop:-1}}>
          <Table bordered
            dataSource={this.state.tableData}
            rowSelection = { rowSelection }
            onRow = {
              (record) => {
                return {
                  onClick: () => {
                    this.onRowClickData(record, record.key)
                  } // 点击行
                }
              }
            }
            columns={column}  
           ></Table>
        </div>
        <Modal
          title="创建角色"
          visible={this.state.dialogCreate}
          onOk={this.submitDialog}
          okText="确定"
          cancelText="取消"
          onCancel={()=>{
            this.getCreateVal.props.form.resetFields()
            this.setState({
              dialogCreate: false
            })
          }}
        > 
          <RoleCreate wrappedComponentRef={(val)=>{this.getCreateVal=val}} />
        </Modal>
        <Modal
          title="设置权限"
          visible={this.state.diaolgAuthor}
          onCancel={()=>{
            this.authorValue.props.form.resetFields()
            this.setState({
              diaolgAuthor: false
            })
          }}
          onOk={this.handlerAuthorSubmit}  
        >
          <AuthorDialog 
            wrappedComponentRef={(val)=>{this.authorValue=val}} 
            menuInfo={this.state.menuInfo} //初始化有哪些权限
            patchMenuInfo={(checkedKeys)=>{
              this.setState({
                menuInfo: checkedKeys
              })
            }}
            authorInfor={this.state.itemAuthorInfor}
          />
        </Modal>
        <Modal
          title="用户授权"
          width={600}
          visible={this.state.dialogUser}
          onCancel={()=>{
          //  this.authorValue.props.form.resetFields()
            this.setState({
              dialogUser: false
            })
          }}
          onOk={this.handlerUserAuthor}  
        >
          <UserDialog 
            wrappedComponentRef={(val)=>{this.userAuthorValue=val}}
            sourceData={this.state.sourceData} //数据源
            targetData={this.state.targetData} //目标值
            patchUserInfo={(checkedKeys)=>{
              this.setState({
                targetData: checkedKeys
              })
            }}
            authorInfor={this.state.itemAuthorInfor}
          />
        </Modal>
      </div>
    );
  }
}

export default Form.create()(Premission)

//创建角色
class RoleCreate extends Component {
  render(){
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: {
        span:5
      },
      wrapperCol: {
        span:10
      }
    }
    return (
      <div>
        <Form>
          <FormItem label="角色名称" {...formItemLayout}>
            {
              getFieldDecorator('role_name', {
                initialValue: ''
              })(
                <Input type="text" placeholder="请输入角色名称" />
              )
            }
          </FormItem>
          <FormItem label="状态" {...formItemLayout}>
            {
              getFieldDecorator('state',{
                initialValue: '1'
              })(
                <Select>
                  <Option value="1">启用</Option>
                  <Option value="0">禁用</Option>
                </Select>
              )
            }
          </FormItem>
        </Form>
      </div>
    );
  }
}

RoleCreate = Form.create({})(RoleCreate)

//设置权限
class AuthorDialog extends Component {
  getRoleName=(state)=>{
    return {
      1: '管理员',
      2: '财务专员',
      3: '运营人员',
      4: '总经理',
      5: '董事长',
      6: '普通职员',
    }[state]
  }
  onCheck=(checkedKeys)=>{
    this.props.patchMenuInfo(checkedKeys) //将选择的key传到父级上去
  }
  rendTreeNode=(data)=>{
    return data.map(item =>{
      if(item.children){
        return <TreeNode title={item.title} key={item.key}>
          {this.rendTreeNode(item.children)}
        </TreeNode>
      }else{
        return <TreeNode {...item} />
      }
    })
  }
  render(){
    const authorInfor = this.props.authorInfor //选择行的信息
    const menuInfo = this.props.menuInfo
    console.log('authorInfor ', authorInfor);
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: {
        span: 5
      },
      wrapperCol: {
        span: 10
      }
    }
    return (
      <div>
        <Form>
          <FormItem label="角色名称" {...formItemLayout}>
            {
              getFieldDecorator('role_name',{
                initialValue: this.getRoleName(authorInfor.role_name)
              })(
                <Input type="text" placeholder="请输入角色名称" disabled />
              )
            }
          </FormItem>
          <FormItem label="状态" {...formItemLayout}>
            {
              getFieldDecorator('status', {
                initialValue: authorInfor.status === 1 ? '启用' : '禁用'
              })(
                <Select>
                  <Option value="1">启用</Option>
                  <Option value="0">禁用</Option>
                </Select>
              )
            }
          </FormItem>
          <FormItem>
            <Tree
              checkable
              defaultExpandAll
              onCheck = {(checkedKeys)=>this.onCheck(checkedKeys) }
              checkedKeys={menuInfo}
            >
              <TreeNode title="平台测试权限" key="platform_anthor">
                {this.rendTreeNode(menuConfig)}
              </TreeNode>
            </Tree>
          </FormItem>
        </Form>
      </div>
    );
  }
}
AuthorDialog = Form.create({})(AuthorDialog)

//用户授权
class UserDialog extends Component {
  getRoleName=(state)=>{
    return {
      1: '管理员',
      2: '财务专员',
      3: '运营人员',
      4: '总经理',
      5: '董事长',
      6: '普通职员',
    }[state]
  }
  handleSelectChange=(targetKeys)=>{
    this.props.patchUserInfo(targetKeys)
  }
  filterOption = (inputValue, option) => option.title.indexOf(inputValue) > -1
  render(){
    const authorInfor = this.props.authorInfor
    const sourceData = this.props.sourceData
    const targetData = this.props.targetData
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: {
        span:3
      },
      wrapperCol: {
        span:20
      }
    }
    return (
      <div>
        <Form>
          <FormItem label="角色名称" {...formItemLayout}>
            {
              getFieldDecorator('role_name', {
                initialValue: this.getRoleName(authorInfor.role_name)
              })(
                <Input type="text" placeholder="请输入角色名称" disabled />
              )
            }
          </FormItem>
          <FormItem label="选择用户" {...formItemLayout}>
            <Transfer
              listStyle = {{width: 200, height: 300}}
              dataSource={sourceData}
              targetKeys={targetData}
              titles={['待选用户', '已选用户']}
              showSearch
              filterOption={this.filterOption}
              // selectedKeys={selectedKeys}
              onChange={this.handleChange}
              onSelectChange={this.handleSelectChange}
              onScroll={this.handleScroll}
              render={item => item.title}
            />
          </FormItem>
        </Form>
      </div>
    );
  }
}

UserDialog = Form.create({})(UserDialog)