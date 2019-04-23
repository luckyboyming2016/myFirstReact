import React from 'react'
import { Select } from 'antd'
const Option = Select.Option
var Until = {
  formate(timeStamp) {
    if (!timeStamp) return ''
    let time = new Date(timeStamp)
    return time.getFullYear() + '-' + (time.getMonth() + 1).toString().padStart(2, '0') + '-' + time.getDate().toString().padStart(2, '0') + ' ' + time.getHours().toString().padStart(2, '0') + ':' + time.getMinutes().toString().padStart(2, '0') + ':' + time.getSeconds().toString().padStart(2, '0')
  },
  getOption(data){
   
    if(data.length<=0){
      return []
    }
    let option = [] //[<Option value="1" key="1">全部</Option>]
    data.map((item)=>option.push(<Option value={item.key} key={item.key}>{item.value}</Option>))
    return option
  }
}

export default Until