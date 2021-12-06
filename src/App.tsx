import React, {useEffect} from 'react';
import './App.css';
import {Button, Col, Form, Input, Popconfirm, Row, Tag} from "antd";
import {UpCircleTwoTone, LeftCircleTwoTone, DownCircleTwoTone, RightCircleTwoTone} from "@ant-design/icons"
import axios from "axios";
import TextArea from "antd/lib/input/TextArea";

const App = () => {
    const [isADBEnabled, setAdbEnabled] = React.useState(false)
    const [isStatusBarHide, setStatusBarHide] = React.useState(false)
    const [customCommand, setCustomCommand] = React.useState("")
    const [customCommandResult, setCustomCommandResult] = React.useState("")
    const [baseUrl, setBaseUrl] = React.useState("https://tablet.ss.devwu.com:8443")
    useEffect(() => {
        axios.defaults.baseURL = baseUrl
    }, [baseUrl])
    useEffect(() => {
        axios.get("/api/adb"
        ).then(res => {
            setAdbEnabled(res.data.data)
        })
        axios.get("/api/statusBar").then(res => {
            setStatusBarHide(!res.data.data)
        })
    }, [])
    return (
        <Form
            style={{marginTop: "20px"}}
            labelCol={{span: 8}}
            autoComplete="off">
            <Form.Item label={"服务器 IP"}>
                <Input.Group compact>
                    <Input style={{width: 'calc( 100% - 200px)'}} value={baseUrl}
                           onChange={(e) => {
                               setBaseUrl(e.target.value)
                           }}/>
                    <Button type={"primary"} onClick={() => {
                        axios.defaults.baseURL = baseUrl
                    }}>Submit</Button>
                </Input.Group>
            </Form.Item>
            {/*<Form.Item label={"实时画面(仅查看)"}>*/}
            {/*    <Image src={"http://" + baseUrl + ":8080/stream.mjpeg"}/>*/}
            {/*</Form.Item>*/}
            <Form.Item label={"操作按钮"}>
                <Button onClick={() => {
                    axios.post("/api/execCommand", {
                        commandList: ["su", "-c", "input keyevent 4"]
                    }).then()
                }}>Back</Button>
                <Button onClick={() => {
                    axios.post("/api/execCommand", {
                        commandList: ["su", "-c", "input keyevent 3"]
                    }).then()
                }}>Home</Button>
                <Button onClick={() => {
                    axios.post("/api/execCommand", {
                        commandList: ["su", "-c", "input keyevent 187"]
                    }).then()
                }}>Recent Tasks</Button>
            </Form.Item>
            <Form.Item label={"模拟滑动"}>
                <Row>
                    <Button icon={<UpCircleTwoTone/>} style={{
                        width: "120px",
                        marginLeft: "120px"
                    }} onClick={() => {
                        axios.post("/api/execCommand", {
                            commandList: ["su","-c","input swipe 200 900 200 300"]
                        }).then()
                    }}>Swipe Up</Button>
                </Row>
                <Row>
                    <Button icon={<LeftCircleTwoTone/>} style={{width: "120px"}} onClick={() => {
                        axios.post("/api/execCommand", {
                            commandList: ["su","-c","input swipe 500 200 100 200"]
                        }).then()
                    }}>Swipe Left</Button>
                    <Button icon={<DownCircleTwoTone/>} style={{width: "120px"}} onClick={() => {
                        axios.post("/api/execCommand", {
                            commandList: ["su","-c","input swipe 200 300 200 800"]
                        }).then()
                    }}>Swipe Down</Button>
                    <Button icon={<RightCircleTwoTone/>} style={{width: "120px"}} onClick={() => {
                        axios.post("/api/execCommand", {
                            commandList: ["su","-c","input swipe 100 200 500 200"]
                        }).then()
                    }}>Swipe Right</Button>
                </Row>
            </Form.Item>
            <Form.Item label={"方向按键"}>
                <Row>
                    <Button icon={<UpCircleTwoTone/>} style={{
                        width: "120px",
                        marginLeft: "120px"
                    }} onClick={() => {
                        axios.post("/api/execCommand", {
                            commandList: ["su","-c","input keyevent 19"]
                        }).then()
                    }}>Dpad Up</Button>
                </Row>
                <Row>
                    <Button icon={<LeftCircleTwoTone/>} style={{width: "120px"}} onClick={() => {
                        axios.post("/api/execCommand", {
                            commandList: ["su","-c","input keyevent 21"]
                        }).then()
                    }}>Dpad Left</Button>
                    <Button icon={<DownCircleTwoTone/>} style={{width: "120px"}} onClick={() => {
                        axios.post("/api/execCommand", {
                            commandList: ["su","-c","input keyevent 20"]
                        }).then()
                    }}>Dpad Down</Button>
                    <Button icon={<RightCircleTwoTone/>} style={{width: "120px"}} onClick={() => {
                        axios.post("/api/execCommand", {
                            commandList: ["su","-c","input keyevent 22"]
                        }).then()
                    }}>Dpad Right</Button>
                </Row>
            </Form.Item>

            <Form.Item label="远程 ABD 状态">
                {isADBEnabled ?
                    <Tag color={"success"}>已开启</Tag>
                    : <Tag color={"error"}>未开启</Tag>}
            </Form.Item>
            <Form.Item label="ADB 开关">
                <Popconfirm title={isADBEnabled ? "关闭 ADB" : "开启 ADB"}
                            onConfirm={() => {
                                axios.post("/api/adb", null, {
                                    params: {
                                        enable: !isADBEnabled
                                    }
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
                                        hidden: !isStatusBarHide
                                    }
                                }).then(res => {
                                    setStatusBarHide(!res.data.data)
                                })
                            }}>
                    <Button type="primary">{isStatusBarHide ? "点击显示状态栏" : "点击隐藏状态栏"}</Button>
                </Popconfirm>
            </Form.Item>
            <Form.Item label="远程重启">
                <Popconfirm title="确定要重启吗？" onConfirm={() => axios.get("/api/reboot")}>
                    < Button type="primary">点击重启平板</Button>
                </Popconfirm>
            </Form.Item>
            <Form.Item label="执行自定义命令">
                <Input.Group compact>
                    <Input value={customCommand} onChange={e => setCustomCommand(e.target.value)}/>
                    <Popconfirm title="确认执行" onConfirm={() => {
                        axios.post("/api/execCommand", {
                            commandList: customCommand
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
