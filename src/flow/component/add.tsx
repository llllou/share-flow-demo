import React, { Component } from 'react'
import {Icon, Menu, Dropdown} from 'antd';
import PropTypes from 'prop-types';
import _ from 'lodash'
interface PropTypes{
  onClick: Function
}
export default class AddIcon extends Component<PropTypes,any> {
  id: string;
  constructor(props:any){
    super(props)
    this.id = _.uniqueId()
  }
  render() {
    const menu = (
      <Menu>
        <Menu.Item onClick={e=>{this.props.onClick("check")}}>插入审批节点</Menu.Item>
        <Menu.Item onClick={e=>this.props.onClick("write")}>插入填写节点</Menu.Item>
        <Menu.Item onClick={e=>this.props.onClick("branch")}>插入分支</Menu.Item>
      </Menu>
    )
    return (
      <div className="flow-block">
          <Dropdown overlay={menu} className="add-node">
            <Icon type="plus" style={{color: "#fff",fontSize: "20px", fontWeight: "bold"}}></Icon>  
          </Dropdown>
        <div className="flow-line"></div>
      </div>
    )
  }
}
