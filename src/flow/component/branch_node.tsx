import React, { Component } from 'react'

export default class BranchNode extends Component<any,any> {
  constructor(props:any){
    super(props)
    this.state = {

    }
  }
  render() {
    return (
      <div className="flow-block">
        <div className="branch-block">
          <div className="branch-block-top-line"></div>
          {
            this.state.list.map((obj)=>{

            })
          }
        </div>
        <div className="flow-line"></div>
      </div>
    )
  }
}
