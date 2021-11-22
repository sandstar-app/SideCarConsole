import React, {useEffect} from 'react';
import './App.css';
import {Button, Col, Form, Input, Popconfirm, Row, Space, Tag} from "antd";
import axios from "axios";
import TextArea from "antd/lib/input/TextArea";

const App = () => {
    const [isADBEnabled, setAdbEnabled] = React.useState(false)
    const [isStatusBarHide, setStatusBarHide] = React.useState(false)
    const [customCommand, setCustomCommand] = React.useState("")
    const [customCommandResult, setCustomCommandResult] = React.useState("")

    useEffect(() => {
        axios.get("/api/adb").then(res => {
            setAdbEnabled(res.data.data.isEnabled)
        })
        axios.get("/api/statusBar").then(res => {
            setStatusBarHide(res.data.data.hide)
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
            <Form.Item label="状态栏隐藏状态">
                {isStatusBarHide ?
                    <Tag color={"error"}>隐藏中</Tag>
                    : <Tag color={"success"}>未隐藏</Tag>}
            </Form.Item>
            <Form.Item label="状态栏开关">
                <Popconfirm title={isStatusBarHide ? "显示状态栏" : "隐藏状态栏"}
                            onConfirm={() => {
                                axios.post("/api/statusBar", null, {
                                    params: {
                                        hide: !isStatusBarHide
                                    }
                                }).then(res => {
                                    setStatusBarHide(res.data.data.hide)
                                })
                            }}>
                    <Button type="primary">{isStatusBarHide ? "点击显示状态栏" : "点击隐藏状态栏"}</Button>
                </Popconfirm>
            </Form.Item>
            <Form.Item label="远程重启">
                <Popconfirm title="确定要重启吗？" onConfirm={() => axios.post("/api/reboot")}>
                    < Button type="primary">点击重启平板</Button>
                </Popconfirm>
            </Form.Item>
            <Form.Item label="执行自定义命令">
                <Input.Group compact>
                    <Input value={customCommand} onChange={e => setCustomCommand(e.target.value)}/>
                    <Popconfirm title="确认执行" onConfirm={() => {
                        axios.post("/api/exeCommand", {
                            command: customCommand
                        }).then(res => {
                            setCustomCommandResult(res.data.data)
                        })
                    }}>
                        <Button>点击执行命令</Button>
                    </Popconfirm>
                </Input.Group>
            </Form.Item>
            <Form.Item label={"自定义命令输出"}>
                <Col span={16}>
                    <Input.Group compact>
                        <Button onClick={() => setCustomCommandResult("")}> Clear </Button>
                        <TextArea value={customCommandResult} disabled/>
                    </Input.Group>
                </Col>

            </Form.Item>
        </Form>
    );
}

export default App;
