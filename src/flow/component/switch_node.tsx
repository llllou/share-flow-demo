import React, { Component, PureComponent } from 'react'
import {List,Icon} from "antd"
export default class SwitchNode extends PureComponent<{onRemove:Function},any> {
  constructor(props:{onRemove:Function}){
    super(props)
  }
  render() {
    return (
      <div className="flow-block">
        <div className="switch-node">
          <Icon type="close-circle" className="node-close" onClick={e=>this.props.onRemove()}></Icon>
          <List>
            <List.Item>所有数据可进入该分支</List.Item>  
            <List.Item>筛选数据</List.Item>  
          </List>  
        </div>
        <div className="flow-line"></div>
      </div>
    )
  }
}
