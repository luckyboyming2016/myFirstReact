import React, {Component} from 'react'
// import axios from './../../jsonp'
import { Editor } from 'react-draft-wysiwyg'
import { EditorState, convertFromRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import draftHtml from 'draftjs-to-html'
import {  Card, Button, Modal,message} from 'antd'
import './index.less'

class Rich extends Component {
  
  state = {
    dialogLayout: false,
    editorState: EditorState.createEmpty(), 
    contentState: ''
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
      contentState
    })
  }
  defaultVal = () => {
    this.setState({
      editorState: convertFromRaw('dsfsaf')
    })
  }
  getContent=()=>{
    if(!draftHtml(this.state.contentState)) {
      message.info('富文本编辑器内暂时无内容')
      return
    }
    this.setState({
      dialogLayout: true
    })
  }
  render(){
    const { editorState,contentState } = this.state
    return (
      <div>
        <Card title="富文本编辑器">
          <Button type="primary" onClick={this.clearContent}>清空内容</Button>
          <Button type="primary" style={{marginLeft:20}} onClick={this.getContent}>获取html文本</Button>
        </Card>
        <Card style={{marginTop:-1}}>
          <Editor
            editorState={editorState}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            defaultEditorState={this.defaultVal}
            onContentStateChange={this.onContentState}
            defaultContentState={this.defaultContent}
            onEditorStateChange={this.onEditorStateChange}
          />
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
            draftHtml(this.state.contentState)
          }
        </Modal>
      </div>
    );
  }
}

export default Rich