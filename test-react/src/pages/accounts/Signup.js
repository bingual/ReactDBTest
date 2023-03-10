import React, { useState } from 'react';
import Axios from 'axios';
import { SmileOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, notification } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

export default function Signup() {
    const navigate = useNavigate();

    const handleFinish = (values) => {
        async function fn() {
            const { username, password } = values;
            const params = {
                username,
                password,
            };

            try {
                const response = await Axios.post(
                    'http://localhost:8080/accounts/signup',
                    params,
                    { withCredentials: true },
                );
                alert('회원가입 성공. 로그인 페이지로 이동합니다.');
                navigate('/accounts/login');
            } catch (err) {
                console.log(err);
            }
        }
        fn();
    };

    const handleLoginPage = () => {
        notification.open({
            message: '로그인 페이지로 이동합니다.',
            icon: <SmileOutlined style={{ color: '#108ee9' }} />,
        });
        navigate('/accounts/login');
    };

    return (
        <div>
            <Form {...layout} onFinish={handleFinish}>
                <Card title={'회원가입'}>
                    <Form.Item
                        label="아이디"
                        name={'username'}
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="패스워드"
                        name={'password'}
                        rules={[{ required: true }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            회원가입
                        </Button>
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <p>
                            계정이 있습니까?{' '}
                            <Button onClick={handleLoginPage}>
                                로그인 하기
                            </Button>
                        </p>
                    </Form.Item>
                </Card>
            </Form>
        </div>
    );
}
const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 16 },
};

const tailLayout = {
    wrapperCol: { offset: 5, span: 16 },
};
