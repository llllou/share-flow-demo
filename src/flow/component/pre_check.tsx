import React, { Component } from 'react'
import { List, Input, Icon, message, Button } from 'antd';
import { Node } from '../../App';
interface STATE{
  name: string,
  personList: any[],
  type: string
}
interface PreCheckRule{
  updatePerson: Function,
  onRemove: Function,
  onConfirm: Function,
  data: Object
}
const {Item} = List
export default class PreCheck extends Component<PreCheckRule,STATE> {
  constructor(props:PreCheckRule){
    super(props)
    this.state = {
      name: "",
      personList: [],
      type: "pre_check"
    }
    this.closeHandler = this.closeHandler.bind(this)
    this.handlerAddPerson = this.handlerAddPerson.bind(this)
    this.changeName = this.changeName.bind(this)
  }
  handlerAddPerson(){
    message.info("添加了一个人员")
    this.props.updatePerson(this.state.personList)
  }
  changeName(v:any){
    this.setState({name: v})
  }
  closeHandler(){
    this.props.onRemove()
  }
  render() {
    return (
      <div className="flow-block">
        <div className="pre-check-node">
          <Icon type="close-circle" className="node-close" style={{color: "red"}} onClick={this.closeHandler}></Icon>
          <List>
            <List.Item>
              <Input addonBefore="节点名称" placeholder="未命名节点" value={this.state.name} onChange={this.changeName}></Input>
            </List.Item>
            <List.Item>
              <h4>负责人</h4>
              <Icon type="plus-square" style={{color: "yellow"}} onClick={this.handlerAddPerson}></Icon>
            </List.Item>
            <List.Item className="node-footer">
              <Button type="ghost" onClick={this.closeHandler}>取消</Button>
              <Button type="primary" onClick={e=>this.props.onConfirm()}>确定</Button>
            </List.Item>
          </List>
        </div>
        <div className="flow-line"></div>
      </div>
    )
  }
}
