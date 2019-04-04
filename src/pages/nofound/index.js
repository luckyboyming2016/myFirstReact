import React,{Component} from 'react'
import './index.less'

class Nofound extends Component {
  render(){
    return (
        <div className="noFoundWrap vertical">
          <div>
            <img alt='404' style={{maxWidth:404}} className="response_img" src="/assets/404.png" />
            <div className="noFound_word f20 text-center">页面没找到，请重新输入！</div>
          </div>
      </div>
    );
  }
}

export default Nofound