import React from 'react'
import { Layout as AntdLayout} from 'antd';
import { HomeOutlined, MenuOutlined, MessageOutlined, SettingOutlined } from '@ant-design/icons';
import "../../index.css"

const Navigation = () => {
  return (
    <AntdLayout.Header>
        <div style={{color: "white", display: "flex"}} className='content'>
            <div style={{display : "flex"}}>
                <h2>EMEELAN</h2>
                <div style={{display: 'flex', gap: 40, marginLeft: "400px"}}>
                    <p><HomeOutlined />Home</p>
                    <p><MenuOutlined />Menu</p>
                    <p><SettingOutlined />Settings</p>
                    <p><MessageOutlined />Chats</p>
                </div>
            </div>
        </div>
    </AntdLayout.Header>
  )
}

export default Navigation;
