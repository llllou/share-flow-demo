import React, { Component } from 'react'
import _ from 'lodash'
import WriteNode from './component/write_node'
import AddNode from './component/add'
import PreCheck from './component/pre_check'
import PreWrite from './component/pre_write'
import CheckNode from './component/check_node'
import BeginNode from "./component/begin_node"
import BranchNode from './component/branch_node';
import './scss/index.scss';
interface STATE {
  data: DataNode[]
}
export class DataNode {
  to: DataNode | null;
  from: DataNode | null;
  data: any;
  id: string;
  type: string
  constructor(type: string, to: DataNode | null = null, from: DataNode | null = null, data: any = {}) {
    this.to = to;
    this.from = from
    this.data = data
    this.id = _.uniqueId()
    this.type = type
  }
}
export class MulitiNode extends DataNode {
  data: DataNode[] | null 
  constructor(type: string = "branch", to: DataNode, from: DataNode, data: DataNode[]|null) {
    super(type, to, from, data)
    this.data = data
  }
}
export default class FlowContainer extends Component<any, { data: DataNode[] }>{
  state: { data: DataNode[]; }
  constructor(props: any) {
    super(props)
    let begin = new DataNode("begin"),
      add = new DataNode("add"),
      end = new DataNode("end");
    // 初始化链表
    begin.to = add;
    add.from = begin;
    add.to = end;
    end.from = add;
    begin.data = { name: '虚拟申请人', deptId: "72359348df", deptName: "办公室" }
    this.state = {
      data: [begin, add, end]
    }
    this.insertNode = this.insertNode.bind(this)
  }
  insertNode(node: DataNode, value: any) {
    let type = "",
      list = this.state.data;
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
      for (let i = 0; i < list.length; i++) {
        if (list[i] === node) {
          list.splice(i, 0, add, obj)
          console.log(list)
          break
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
      for (let i = 0; i < list.length; i++) {
        if (list[i] === node) {
          list.splice(i, 0, add, obj)
          console.log(list)
          break
        }
      }
    }
    else {
      type = "branch"
      let add = new DataNode('add',null,node.from,{})
      let obj = new MulitiNode(type,node,add,null);
      add.to = obj
      if(cacheFrom){
        cacheFrom.to = add
      }
      for(let i=0;i<list.length;i++){
        if(list[i]===node){
          list.splice(i,0,add,obj)
          console.log(list)
          break
        }
      }
    }

    this.setState({ data: list })
  }
  updatePerson(node: DataNode, value: string) {

  }
  removeNode(node: DataNode) {
    console.log(node)
    let list = this.state.data
    for (let i = 0; i < list.length; i++) {
      if (list[i] === node) {
        list[i - 2].to = list[i + 1]
        list[i + 1].from = list[i - 2]
        list.splice(i - 1, 2)
        this.setState({
          data: list
        })
        break
      }
    }
  }
  confirmNode(node: DataNode) {
    let list = this.state.data
    if (node.type === "pre-check") {
      node.type = "check"
    }
    else if (node.type === "pre-write") {
      node.type = "write"
    }
    this.setState({ data: list })
  }
  showNode(node: DataNode) {

  }
  render() {
    return (
      <div className="share-flow__container">
        {this.state.data.map(obj => {
          switch (obj.type) {
            case "begin":
              return <BeginNode data={obj.data} name={obj.data.name} key={obj.id} />;
            case "add":
              return <AddNode onClick={(v: any) => this.insertNode(obj, v)} key={obj.id}></AddNode>
            case "end":
              return (<div className="flow-block" key="end-one">
                <div className="end-icon">
                  <span>结束</span>
                </div>
              </div>);
            case "pre-check":
              return <PreCheck data={obj.data} key={obj.id} onConfirm={this.confirmNode.bind(this, obj)} onRemove={this.removeNode.bind(this, obj)} updatePerson={(v: any) => this.updatePerson.bind(this, obj, v)}></PreCheck>;
            case "pre-write":
              return <PreWrite data={obj.data} key={obj.id} onConfirm={this.confirmNode.bind(this, obj)} onRemove={this.removeNode.bind(this, obj)} updatePerson={(v: any) => this.updatePerson.bind(this, obj, v)}></PreWrite>;
            case "check":
              return <CheckNode key={obj.id} onShow={this.showNode.bind(this, obj)} data={obj.data} onRemove={this.removeNode.bind(this, obj)}></CheckNode>;
            case "write":
              return <WriteNode key={obj.id} onShow={this.showNode.bind(this, obj)} data={obj.data} onRemove={this.removeNode.bind(this, obj)}></WriteNode>
            case "branch":
              return <BranchNode key={obj.id} onRemove={()=>this.removeNode(obj)} list={obj.data}></BranchNode>
          }
        })}
      </div>
    )
  }
}