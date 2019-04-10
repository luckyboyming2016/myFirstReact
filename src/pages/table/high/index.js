import React,{Component} from 'react'
import {Card,Table,message,Modal,Button, Badge } from 'antd'
import axios from './../../../jsonp/index'
import './index.less'

class TableHigh extends Component {
  state={
    dataSource3: []
  }
  componentDidMount(){
    this.setState({
      dataSource3: this.state.dataSource3
    })
    this.getPostData()
  }
  //获取动态接口数据
  getPostData=()=>{
    axios.ajax({
      url: '/table/hight/list',
      params: {
        pageSize: 1
      }
    }).then(res=>{
      console.log(res);
      if(res.code === 0){
        this.setState({
          dataSource3: res.result
        })
      }else{
        message.info(res.msg)
      }
    })
  }
  handerChange=(pagination, filters, sorter)=>{
    this.setState({
      sortOrder: sorter.order
    })
  }
  handerDelete=(record)=>{
     console.log('key  ', record.key);
     let id = record.key
     Modal.confirm({
       title: '提示',
       content: `你确定要删除吗? ${id}`,
       onOk:()=>{
         message.info('删除成功')
         console.log(id) 
       }
     })
  }
  render(){
    const columns = [
      {title:'排序', align:"center", width: 100, key: 'key', dataIndex: 'key'},
      {title:'姓名', align:"center", width: 200, key: 'username', dataIndex: 'username'},
      {title:'年龄', align:"center", width: 200, key: 'age', dataIndex: 'age'},
      {title:'性别', align:"center", width: 200, key: 'sex', dataIndex: 'sex', render: (sex) => {
        return sex === 1 ? '男' : '女'
      }},
      {title:'成绩', align:"center", width: 200, key: 'study', dataIndex: 'study'},
      {title:'班级', align:"center", width: 200, key: 'className', dataIndex: 'className'},
      {title:'爱好', align:"center", key: 'interest', dataIndex: 'interest', render: interest=>{
        let config = {
          '1': '闲鱼一条',
          '2': '爬山',
          '3': '游泳',
          '4': '唱歌',
          '5': '敲代码',
          '6': '篮球'
        }
        return config[interest]
      }},
    ]
    const dataSource = [
      {key:1,username:'张三1' ,age:30,sex:1,interest:1,study:120,className:'高一（2）班'},
      {key:2,username:'张李四' ,age:23,sex:2,interest:2,study:120,className:'高一（2）班'},
      {key:3,username:'张三2' ,age:30,sex:1,interest:3,study:120,className:'高一（2）班'},
      {key:4,username:'张三3' ,age:30,sex:1,interest:1,study:120,className:'高一（2）班'},
      {key:5,username:'张李四' ,age:23,sex:2,interest:2,study:120,className:'高一（2）班'},
      {key:6,username:'张三4' ,age:30,sex:1,interest:3,study:120,className:'高一（2）班'},
      {key:7,username:'张三5' ,age:30,sex:1,interest:1,study:120,className:'高一（2）班'},
      {key:8,username:'张李四' ,age:23,sex:2,interest:2,study:120,className:'高一（2）班'},
      {key:9,username:'张三6' ,age:30,sex:1,interest:3,study:120,className:'高一（2）班'}
    ]
    const columns2 = [
      {title:'排序', align:"center", fixed: 'left',width: 100, key: 'key', dataIndex: 'key'},
      {title:'姓名', align:"center", fixed: 'left',width: 100, key: 'username', dataIndex: 'username'},
      {title:'吃', align:"center",  width: 200, key: 'eat', dataIndex: 'eat'},
      {title:'喝', width: 200, key: 'drink', dataIndex: 'drink'},
      {title:'玩', width: 200, key: 'play', dataIndex: 'play'},
      {title:'看', width: 200, key: 'watch', dataIndex: 'watch'},
      {title:'乐', width: 200, key: 'like', dataIndex: 'like'},
      {title:'年龄', width: 200, key: 'age', dataIndex: 'age'},
      {title:'性别', width: 200, key: 'sex', dataIndex: 'sex', render: (sex) => {
        return sex === 1 ? '男' : '女'
      }},
      {title:'成绩', width: 200, key: 'study', dataIndex: 'study'},
      {title:'班级', width: 200, key: 'className', dataIndex: 'className'},
      {title:'爱好',align:"center",fixed: 'right', key: 'interest', dataIndex: 'interest', render: interest=>{
        let config = {
          '1': '闲鱼一条',
          '2': '爬山',
          '3': '游泳',
          '4': '唱歌',
          '5': '敲代码',
          '6': '篮球'
        }
        return config[interest]
      }},
    ]
    const dataSource2 = [
      {key:1,username:'张三', eat:'汉堡',drink:'可乐',price: 3.5,play:'滑翔',watch:'韩剧',like:'睡觉',age:30,sex:1,interest:1,study:120,className:'高一（2）班'},
      {key:2,username:'李四', eat:'鸡翅',drink:'啤酒',price: 25,play:'足球',watch:'日剧',like:'爬山',age:30,sex:9,interest:2,study:190,className:'高一（2）班'},
      {key:3,username:'王五', eat:'米饭',drink:'牛奶',price: 5,play:'篮球',watch:'哭闹片',like:'看片',age:30,sex:0,interest:3,study:220,className:'高一（2）班'},
      {key:4,username:'赵六', eat:'粥',drink:'果汁',price: 215,play:'走路',watch:'爱情动作片',like:'敲人头',age:30,sex:4,interest:5,study:20,className:'高一（2）班'},
      {key:5,username:'刘三', eat:'馒头',drink:'白开水',price: 35,play:'骑行',watch:'网剧',like:'搞事',age:30,sex:1,interest:4,study:120,className:'高一（2）班'},
    ]

    const columns3 = [
      {title:'排序', align:"center", width: 100, key: 'key', dataIndex: 'key'},
      {title:'姓名', align:"center", width: 200, key: 'username', dataIndex: 'username'},
      {title:'年龄', align:"center", width: 200, key: 'age', dataIndex: 'age', sorter:((a,b)=>{
        return a.age-b.age
      }), sortOrder: this.state.sortOrder},
      {title:'性别', align:"center", width: 200, key: 'sex', dataIndex: 'sex', render: (sex) => {
        return sex === 1 ? '男' : '女'
      }},
      {title:'成绩', align:"center", width: 200, key: 'study', dataIndex: 'study'},
      {title:'班级', align:"center", width: 200, key: 'className', dataIndex: 'className'},
      {title:'爱好', align:"center", key: 'interest', dataIndex: 'interest', render: interest=>{
        let config = {
          '1': '闲鱼一条',
          '2': '爬山',
          '3': '游泳',
          '4': '唱歌',
          '5': '敲代码',
          '6': '篮球'
        }
        return config[interest]
      }},
    ]

    const columns4 = [{
         title: '排序',
         align: "center",
         width: 100,
         key: 'key',
         dataIndex: 'key'
       },
       {
         title: '姓名',
         align: "center",
         width: 100,
         key: 'username',
         dataIndex: 'username'
       },
       {
         title: '年龄',
         align: "center",
         width: 100,
         key: 'age',
         dataIndex: 'age'
       },
       {
         title: '性别',
         align: "center",
         width: 100,
         key: 'sex',
         dataIndex: 'sex',
         render: (sex) => {
           return sex === 1 ? '男' : '女'
         }
       },
       {
         title: '成绩',
         align: "center",
         width: 100,
         key: 'study',
         dataIndex: 'study'
       },
       {
         title: '班级',
         align: "center",
         width: 200,
         key: 'className',
         dataIndex: 'className'
       },
       {
         title: '爱好',
         align: "center",
         key: 'interest',
         dataIndex: 'interest',
         render: interest=>{
           let config = {
             '1': <Badge status="success" text="闲鱼一条" />,
             '2': <Badge status="error" text="爬山" />,
             '3': <Badge status="default" text="游泳" />,
             '4': <Badge status="processing" text="唱歌" />,
             '5': <Badge status="warning" text="敲代码" />,
             '6': <Badge status="processing" text="篮球" />
           }
           return config[interest]
         }
       },
       {
         title: '操作',
         key: 'opeart',
         align: 'center',
         width: 200,
         render: record=>(
            <Button type="primary" onClick={()=>{this.handerDelete(record)}}>删除</Button>
         )
       }
     ]
    return (
      <div className="uiButton">
        <Card title="头部固定" className="cardWarp">
            <Table 
              dataSource={dataSource} 
              columns={columns} 
              bordered 
              pagination={false} 
              scroll={{ y: 240 }}
            />
        </Card>
        <Card title="左，右列固定" className="cardWarp">
            <Table 
              dataSource={dataSource2}
              columns={columns2}  
              scroll={{ x: 2020 }} 
            />
        </Card>
        <Card title="表格排序" className="cardWarp">
            <Table 
              dataSource={this.state.dataSource3}
              columns={columns3} 
              onChange={this.handerChange}
              bordered />
        </Card>
        <Card title="操作按钮" className="cardWarp">
            <Table 
              dataSource={this.state.dataSource3}
              columns={columns4} 
              bordered />
        </Card>
      </div>
    );
  }
}

export default TableHigh;