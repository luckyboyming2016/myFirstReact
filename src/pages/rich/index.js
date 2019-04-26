import React, {Component} from 'react'
import { Editor } from 'react-draft-wysiwyg'
import { EditorState, convertToRaw, ContentState, } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'
import {  Card, Button, Modal,message} from 'antd'
import './index.less'

class Rich extends Component {
  constructor(props) {
    super(props); //第一步，这是必须的
    //不能调用state
    this.state = {
      dialogLayout: false,
      editorState: EditorState.createEmpty(), //创建一个空的富文本
      getContentState: ''
    }
  }

  componentWillMount(){
  
  }
  clearContent=()=>{
    this.setState({
      editorState: ''
    })
  }
  onEditorStateChange = (editorState) => {
    console.log(editorState);
    this.setState({
      editorState
    })
  }
  onContentState=(contentState)=>{
    this.setState({
      getContentState: contentState
    })
  }
  componentWillReceiveProps(){
    let defaultVal= '我是富文本编辑器的回显原始值';
    // 匹配富文本编辑器格式，回显保存的内容
    const contentBlock = htmlToDraft(defaultVal);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      const editorState = EditorState.createWithContent(contentState);
      this.setState({
         editorState
      })
    }
  }
  getContent=()=>{
    //只有修改后的内容才有效
    if(!this.state.editorState) {
      message.info('富文本编辑器内暂时无内容，请修改后再获取新内容')
      return
    }
    this.setState({
      dialogLayout: true
    })
  }
  handleSubmit=()=>{
    let val = this.state.editorState
    if(!val){
       message.info('富文本编辑器内暂时无内容,无法提交')
      return
    }
    //val.getCurrentContent() 这是一个ContentState对像结构
    //convertToRaw() 方法 将一个ContentState对象，转换为一个原始的JS结构。
    //draftToHtml()方法 将原始js格式转换成html字符串；
    let news = draftToHtml(convertToRaw(val.getCurrentContent()))
    console.log(news)
  }
  render(){
    const { editorState } = this.state
    return (
      <div>
        <Card title="富文本编辑器">
          <Button type="primary" onClick={this.clearContent}>清空内容</Button>
          <Button type="primary" style={{marginLeft:20}} onClick={this.getContent}>获取修改后的html文本</Button>
        </Card>
        <Card style={{marginTop:-1}} className="cardWrap">
          <Editor
            editorState={editorState}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            onContentStateChange={this.onContentState}
            onEditorStateChange={this.onEditorStateChange}
          />
        </Card>
        <Card>
          <Button type="primary" onClick={this.handleSubmit}>提交</Button>
        </Card>
        <Modal title="富文本"
          visible={this.state.dialogLayout}
          onCancel={()=>{
            this.setState({
              dialogLayout: false
            })
          }}
          footer={null}
        >
          {
            draftToHtml(this.state.getContentState)
          }
        </Modal>
      </div>
    );
  }
}

export default Rich