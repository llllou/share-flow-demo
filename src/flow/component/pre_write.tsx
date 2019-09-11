import React, { Component } from 'react'
import { List, Input, Icon, message, Button } from 'antd';
import { Node } from '../../App';
interface STATE{
  name: string,
  personList: any[],
  type: string
}
interface PreWriteRule{
  updatePerson: Function,
  onRemove: Function,
  onConfirm: Function,
  data: Object
}
const {Item} = List
export default class PreWrite extends Component<PreWriteRule,STATE> {
  constructor(props:PreWriteRule){
    super(props)
    this.state = {
      name: "",
      personList: [],
      type: "$pre_write"
    }
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
  render() {
    return (
      <div className="flow-block">
        <div className="pre-write-node">
          <Icon type="close-circle" className="node-close" style={{color: "red"}} onClick={e=>this.props.onRemove()}></Icon>
          <List>
            <List.Item>
              <Input addonBefore="节点名称" placeholder="未命名节点" value={this.state.name} onChange={this.changeName.bind(this)}></Input>
            </List.Item>
            <List.Item>
              <h4>负责人</h4>
              <Icon type="plus-square" style={{color: "yellow"}} onClick={e=>this.handlerAddPerson.bind(this)}></Icon>
            </List.Item>
            <List.Item className="node-footer">
              <Button type="ghost" onClick={e=>this.props.onRemove()}>取消</Button>
              <Button type="primary" onClick={e=>this.props.onConfirm()}>确定</Button>
            </List.Item>
          </List>
        </div>
        <div className="flow-line"></div>
      </div>
    )
  }
}