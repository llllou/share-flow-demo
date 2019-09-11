import React, { Component } from 'react'
import SwitchNode from "./switch_node"
import BranchBegin from "./branch_begin"
import BranchEnd from "./branch_end"
import AddNode from './add'
import PreCheck from './pre_check'
import PreWrite from './pre_write'
import CheckNode from './check_node'
import BeginNode from "./begin_node"
import WriteNode from "./write_node"
import { Icon } from "antd"
import { DataNode, MulitiNode } from "../index"
import _ from "lodash"
import { isArray } from 'util';
interface PROP {
  onRemove: () => void,
  list?: DataNode[]
}
export default class BranchNode extends Component<PROP, any> {
  id: string
  constructor(props: any) {
    super(props)
    this.id = _.uniqueId()
    let switch1 = new DataNode("switch"),
      switch2 = new DataNode("switch"),
      add1 = new DataNode("add", null, switch1, {}),
      add2 = new DataNode("add", null, switch2, {});
    switch1.to = add1;
    switch2.to = add2
    if (this.props.list) {
      // 传入了节点列表,产生分支
      this.state = {
        list: this.props.list.map((obj: DataNode | DataNode[]) => {
          let s = new DataNode("switch"),
            a = new DataNode("add")
          // 每一个只有一个节点
          if (obj instanceof DataNode) {
            s.to = obj;
            a.from = obj;
            obj.from = s;
            obj.to = a;
            return [s, obj, a]
          }
          else if (isArray(obj)) {
            // 传入了复数节点
            s.to = obj[0]
            a.from = obj[obj.length - 1]
            obj[0].from = s
            obj[obj.length - 1].from = a
            return [s, ...obj, a]
          }
        })
      }
    }
    else {
      // 没有节点列表,初始化两个分支
      this.state = {
        list: [
          [switch1, add1],
          [switch2, add2]
        ]
      }
    }
    this.removeNode = this.removeNode.bind(this)
    this.addNode = this.addNode.bind(this)
    this.confirmNode = this.confirmNode.bind(this)
    this.showNode = this.showNode.bind(this)
    this.changeBranch = this.changeBranch.bind(this)
    this.removeNode = this.removeNode.bind(this)
    this.insertNode = this.insertNode.bind(this)
    this.updatePerson = this.updatePerson.bind(this)
    // this.updateBranch = this.updateBranch.bind(this)
  }
  insertNode(node: DataNode, value: any) {
    let type = "",
      list = this.state.list;
    let cacheFrom = node.from
    if (value === "check") {
      type = "pre-check";
      let obj = new DataNode(type, null, null, {}),
        add = new DataNode('add', obj, node.from, {})
      // 修改链表各节点的to和from
      obj.to = node
      obj.from = add
      if (cacheFrom) {
        cacheFrom.to = add
      }
      for (let i of list) {
        for(let m=0;m<i.length;m++){
          if (i[m] === node) {
            i.splice(m, 0, add, obj)
            this.setState({ list: list })
            return 
          }
        }
      }
    }
    else if (value === "write") {
      type = "pre-write";
      let obj = new DataNode(type, null, null, {}),
        add = new DataNode('add', obj, node.from, {})
      // 修改链表各节点的to和from
      obj.to = node
      obj.from = add
      if (cacheFrom) {
        cacheFrom.to = add
      }
      for (let i of list) {
        for(let m=0;m<i.length;m++){
          if (i[m] === node) {
            i.splice(m, 0, add, obj)
            this.setState({ list: list })
            return 
          }
        }
      }
    }
    else {
      type = "branch"
      let add = new DataNode('add', null, node.from, {})
      let obj = new MulitiNode(type, node, add, null);
      add.to = obj
      if (cacheFrom) {
        cacheFrom.to = add
      }
      for (let i of list) {
        for(let m=0;m<i.length;m++){
          if (i[m] === node) {
            i.splice(m, 0, add, obj)
            this.setState({ list: list })
            return 
          }
        }
      }
    }
  }
  removeNode(node: DataNode) {
    let list = this.state.list;
    for (let i of list) {
      for(let m=0;m<i.length;m++){
        if (i[m] === node) {
          i.splice(m, 1)
        }
      }
    }
    if(list.length===1){
      this.props.onRemove()
    }
    else{
      this.setState({ list })
    }
  }
  /**
   * 添加新的分支节点
   * 
   * @returns {void}
   */
  addNode() {
    let list = this.state.list
    let switch1 = new DataNode("switch"),
      add1 = new DataNode("add", null, switch1, {});
    switch1.to = add1;
    list = list.concat([switch1, add1])
    this.setState({ list })
  }
  confirmNode(node: DataNode) {
    let list = this.state.list
    if (node.type === "pre-check") {
      node.type = "check"
    }
    else if (node.type === "pre-write") {
      node.type = "write"
    }
    this.setState({ list: list })
  }
  showNode(node: DataNode) {

  }
  changeBranch(list: []) {

  }
  updatePerson() {

  }
  render() {
    const width = this.state.list.length*300+(30*(this.state.list.length-1))+"px"
    return (
      <div className="flow-block">
        <div className="branch-block" style={{width: width}}>
          <BranchBegin list={this.state.list} onAdd={this.addNode} />
          <div className="branch-block__inner">
            {
              this.state.list.map((obj: [],index: number) => {
                return (
                  <div className="flow-container" key={this.id+'_'+index}>
                  {obj.map((sec:DataNode)=>{
                    switch (sec.type) {
                      case "begin":
                        return <BeginNode data={sec.data} name={sec.data.name} key={sec.id} />;
                      case "add":
                        return <AddNode onClick={(v: any) => this.insertNode(sec, v)} key={sec.id}></AddNode>
                      case "end":
                        return (<div className="flow-block" key="end-one">
                          <div className="end-icon">
                            <span>结束</span>
                          </div>
                        </div>);
                      case "switch":
                        return <SwitchNode key={sec.id} onRemove={() => this.removeNode(sec)}></SwitchNode>
                      case "pre-check":
                        return <PreCheck data={sec.data} key={sec.id} onConfirm={this.confirmNode.bind(this, sec)} onRemove={this.removeNode.bind(this, sec)} updatePerson={(v: any) => this.updatePerson.bind(this, sec, v)}></PreCheck>;
                      case "pre-write":
                        return <PreWrite data={sec.data} key={sec.id} onConfirm={this.confirmNode.bind(this, sec)} onRemove={this.removeNode.bind(this, sec)} updatePerson={(v: any) => this.updatePerson.bind(this, sec, v)}></PreWrite>;
                      case "check":
                        return <CheckNode key={sec.id} onShow={this.showNode.bind(this, sec)} data={sec.data} onRemove={this.removeNode.bind(this, sec)}></CheckNode>;
                      case "write":
                        return <WriteNode key={sec.id} onShow={this.showNode.bind(this, sec)} data={sec.data} onRemove={this.removeNode.bind(this, sec)}></WriteNode>
                      case "branch":
                        return <BranchNode key={sec.id} onRemove={()=> this.removeNode(sec)} list={sec.data}></BranchNode>
                    }
                  })}
                  </div>
                )
              })
            }
          </div>
          <BranchEnd list={this.state.list}></BranchEnd>
        </div>
        <div className="flow-line"></div>
      </div>
    )
  }
}
