import React from 'react';
import Axios from 'axios';
import { SmileOutlined } from '@ant-design/icons';
import { Form, Input, Card, Button, notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from 'store';
import { setSession } from 'store';

export default function Login() {
    const { dispatch } = useAppContext();
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
                    'http://localhost:8080/accounts/login',
                    params,
                    { withCredentials: true },
                );
                const { data } = response;
                dispatch(setSession(data));
                navigate('/');
            } catch (error) {
                console.error(error);
            }
        }
        fn();
    };

    const handleSignupPage = () => {
        notification.open({
            message: '회원가입 페이지로 이동합니다.',
            icon: <SmileOutlined style={{ color: '#108ee9' }} />,
        });
        navigate('/accounts/signup');
    };
    return (
        <div>
            <Form {...layout} onFinish={handleFinish}>
                <Card title={'로그인'}>
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
                            로그인
                        </Button>
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <p>
                            계정이 없습니까?{' '}
                            <Button onClick={handleSignupPage}>
                                회원가입 하기
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
