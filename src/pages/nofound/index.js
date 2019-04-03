import React,{Component} from 'react'
import './index.less'

class Nofound extends Component {
  render(){
    return (
      <div>
        <div>
          <img alt='404' style={{maxWidth:404}} className="response_img" src="/assets/404.png" />
        </div>
        <div className="noFound">页面没找到，请重新输入！</div>
      </div>
    );
  }
}

export default Nofound