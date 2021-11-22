import React from 'react';
import './App.css';
import {Button, Form, Switch} from "antd";

const App = () => {
    const [input, setInput] = React.useState(true)

    return (
        <Form
            labelCol={{span: 8}}
            autoComplete="off">
            <Form.Item
                label="远程 ABD 状态">
                <Switch checked={input}
                        onChange={() => {
                            setInput(!input)
                        }}/>
            </Form.Item>
            <Form.Item
                label="开关">
                <Button type="primary" onClick={() => {
                    console.log("click me")
                }}>Button</Button>
            </Form.Item>
            <Form.Item
                label="日志信息">

            </Form.Item>
        </Form>
    );
}

export default App;
