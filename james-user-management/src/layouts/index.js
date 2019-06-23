/*
 * @Description: 添加导航 
 * @Author: james.zhang 
 * @Date: 2019-06-22 19:22:22 
 * @Last Modified by: james.zhang
 * @Last Modified time: 2019-06-23 10:24:04
 */

import React from 'react';
import {Layout, Menu} from 'antd';
import Link from 'umi/link';
const { Header, Content } = Layout;
export default function (props){
return (
    <Layout>
        <Header
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["/"]}
            style={{ lineHeight: '64px' }}
        >
            <Menu.Item key="/">
                <Link to="/">首页</Link> 
            </Menu.Item>
            <Menu.Item key="/users">
                <Link to="/users">用户管理</Link>
            </Menu.Item>
        </Header>
        <Content>{props.children}</Content>
    </Layout>
)
}
