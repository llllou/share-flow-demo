import React, { Component } from 'react'
import {DataNode} from "../index"
import _ from 'lodash'
export default class BranchEnd extends Component<{list: DataNode[],width: string}> {
    id: string
    constructor(props:{list:DataNode[],width: string}){
        super(props)
        this.id = _.uniqueId()
    }
    render() {
        return (
            <div className="flow-block">
                <div className="branch-end-block">
                    {
                        this.props.list.map((a,index)=>{
                            return <div key={this.id+"_"+index}  className="branch-end-line"></div>
                        })
                    }
                </div>
                <div className="branch-end-bottom" style={{width: this.props.width}}></div>
                <div className="flow-line"></div>
            </div>
        )
    }
}
