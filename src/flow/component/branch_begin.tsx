import React, { Component } from 'react'
import {DataNode} from "../index"
import {Icon} from "antd"
import _ from "lodash"
export default class BranchStart extends Component<{list: DataNode[],onAdd: ()=>void}> {
    private id: string
    constructor(props:{list:DataNode[],onAdd: ()=>void}){
        super(props)
        this.id = _.uniqueId()
    }
    render() {
        return (
            <div className="flow-block">
                <div className="branch-start-block">
                    <Icon type="plus-square" theme="filled" className="new-branch-icon" onClick={this.props.onAdd}></Icon>  
                    {
                        this.props.list.map((a,index)=>{
                            return <div key={this.id+'_'+index} className="branch-start-line"></div>
                        })
                    }
                </div>
            </div>
        )
    }
}
