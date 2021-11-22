import React, {useEffect} from 'react';
import './App.css';
import {Button, Form, Popconfirm, Tag} from "antd";
import axios from "axios";
import TextArea from "antd/lib/input/TextArea";

const App = () => {
    const [isADBEnabled, setAdbEnabled] = React.useState(false)
    const inputRef = React.useRef<any>(null)
    const [text, setText] = React.useState("")
    const shareProps = {
        value: text,
        ref: inputRef,
        disabled: true
    }
    useEffect(() => {
        axios.get("/api/adb").then(res => {
            setAdbEnabled(res.data.data.isEnabled)
            setText(JSON.stringify(res.data))
        })
    })
    return (
        <Form
            labelCol={{span: 8}}
            autoComplete="off">
            <Form.Item label="远程 ABD 状态">
                {isADBEnabled ?
                    <Tag color={"success"}>已开启</Tag>
                    : <Tag color={"error"}>未开启</Tag>}
            </Form.Item>
            <Form.Item label="ADB 开关">
                <Popconfirm title={isADBEnabled ? "关闭 ADB" : "开启 ADB"}
                            onConfirm={() => {
                                axios.post("/api/adb", {
                                    "isAdbOpen": !isADBEnabled
                                }).then(res => {
                                    setAdbEnabled(res.data.data.isEnabled)
                                })
                            }}>
                    <Button type="primary">{isADBEnabled ? "点击关闭 ADB" : "点击开启 ADB"}</Button>
                </Popconfirm>
            </Form.Item>
            <Form.Item label="远程重启">
                <Popconfirm title="确定要重启吗？" onConfirm={() => axios.post("/api/reboot")}>
                    < Button type="primary">点击重启平板</Button>
                </Popconfirm>
            </Form.Item>
            <Form.Item label="日志信息">
                <TextArea {...shareProps}/>
            </Form.Item>
        </Form>
    );
}

export default App;
