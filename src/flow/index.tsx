import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class FlowContainer extends Component {
  static propTypes = {
    prop: PropTypes
  }
  constructor(props:any){
    super(props)
    this.state = new LinkArray()
  }
  render() {
    return (
      <div className="share-flow__container">
        
      </div>
    )
  }
}
class Node{
  dom: Element | null
  constructor(prop:string){
    if(prop){
      this.dom = document.querySelector(prop)
    }
    else{
      this.dom = null
    }
  }
}
class LinkArray {
  length: number
  private _list: any[]
  private _getFirst(){
    return this._list[0]
  }
  private _getLast(){
    return this._list[this.length-1]
  }
  constructor(){
    this.length = 0
    this._list = []
  }
  append(node:Node){
    this._list.push(node)
    return this
  }
  [Symbol.iterator](){
    
  }
  remove(index:number){

  }
}