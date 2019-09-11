import React, { Component } from 'react'
import { Icon, List } from 'antd';
import _ from "lodash"
interface PROP {
  name?: string,
  data: [],
  onRemove: Function,
  onShow: Function,
}
interface STATE{
  type: string,
  id: string
}

export default class WriteNode extends Component<PROP, STATE> {
  constructor(props:PROP) {
    super(props)
    this.state = {
      type: '$write-node',
      id: _.uniqueId()
    }
  }
  render() {
    return (
      <div className="flow-block">
        <div className="write-node">
          <Icon className="node-close" type="close-circle" onClick={e=>this.props.onRemove()}></Icon>
          <div className="node-header" onClick={e=>this.props.onShow(this.props.data)}>
            {this.props.name}
            <Icon type="edit" className="edit-icon" style={{color: "#fff"}}></Icon>
          </div>
          <div className="node-content" onClick={e=>this.props.onShow(this.props.data)}>
            <List>
              {this.props.data.length>0?this.props.data.map(a=>{
                return (<List.Item>{"名字"}</List.Item>)
              }):<List.Item>暂无负责人</List.Item>}  
            </List>  
          </div>
        </div>
        <div className="flow-line"></div>
      </div>
    )
  }
}
