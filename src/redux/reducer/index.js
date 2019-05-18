import { type } from "./../action"

const initialValue = {
  menuName: '首页'
}

export default (state=initialValue, action)=>{
  switch(action.type){
    case type.SWITCH_MENU:
      return {
        ...state,
        menuName: action.menuName
      }
      // break;
    default:
      break;
  }
} 