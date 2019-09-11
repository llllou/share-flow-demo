import React, { Component } from 'react'
import { List, Input, Icon, message, Button } from 'antd';
import { Node } from '../../App';
interface BeginRule{
  data: any[],
  name: string
}
const {Item} = List
export default class BeginNode extends Component<BeginRule,any> {
  constructor(props:BeginRule){
    super(props)
    this.state = {
      type: "begin"
    }
  }
  render() {
    return (
      <div className="flow-block">
        <div className="begin-node">
          <List>
            <List.Item>
              <h4 className="begin-title">申请人</h4>
            </List.Item>
            <List.Item>
              <span className="begin-content">{this.props.name}</span>
            </List.Item>
          </List>
        </div>
        <div className="flow-line"></div>
      </div>
    )
  }
}
