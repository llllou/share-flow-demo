import React from 'react';
import logo from './logo.svg';
import './App.css';
import "antd/dist/antd.css"
import {Tabs} from "antd"
import FlowContainer from './flow/index'
const {TabPane} = Tabs
const App: React.FC = () => {
  return (
    <div className="App" >
      <Tabs defaultActiveKey="2">
        <TabPane tab="表单设计" key="1">
          表单设计
        </TabPane>
        <TabPane tab="流程引擎" key="2">
          <FlowContainer></FlowContainer> 
        </TabPane>
      </Tabs>
    </div>
  );
}
export interface Node{
  from: Node|null,
  to: Node|null,
  data?: Object[],
  el: Element|null|undefined,
  type: string|undefined
}
export default App;
