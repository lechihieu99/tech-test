import React, { useState, useEffect } from "react";
import { Avatar, Button, Card, InputNumber, Space, Input, Flex, Row, Col } from 'antd';

import { Modal, Image } from 'antd';
import axios from "axios";
const { Meta } = Card;

const CardComponent = ({ item, setCart, cart }) => {
    const [show, setShowModal] = useState(false)
    const [quantity, setQuantity] = useState(1)

    const [confirmLoading, setConfirmLoading] = useState(false);

    const [error, setError] = useState()
    const handleOk = async () => {
        setConfirmLoading(true);
        setTimeout(() => {
            setConfirmLoading(false);
        }, 2000);

        const firstName = document.getElementById('first')?.value

        const lastName = document.getElementById('last')?.value
        const country = document.getElementById('country')?.value
        const postcode = document.getElementById('postcode')?.value
        const city = document.getElementById('city')?.value
        const detail = document.getElementById('detail')?.value

        if (firstName && lastName && country && postcode && city && detail) {
            const response = await axios.post('http://localhost:3119/api/create-order', {
                totalAmount: cart?.price.amount * quantity,
                consumer: {
                    givenNames: firstName,
                    surname: lastName
                },
                shipping: {
                    countryCode: country,
                    name: firstName + ' ' + lastName,
                    postcode: postcode,
                    suburb: city,
                    line1: detail
                },
                shippingAmount: {
                    amount: '3.00'
                },
                taxAmount: {
                    amount: '9.8'
                },
                item: item
            })

            window.location.href = response.data.checkoutUrl
        }
        else {
            setError('Please write all required input')
            setTimeout(() => {
                setError()
            }, 3000)
        }
    };
    const handleCancel = () => {
        setShowModal(false)
    };
    const onChange = (value) => {
        setQuantity(value)
    };

    const handleShowModal = (item) => {
        setShowModal(true)
        setCart(item)
    }
    return (
        <>
            <Card
                style={{
                    width: 250,
                    boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)'
                }}
                cover={
                    <img
                        alt="example"
                        src={item.image}
                    />
                }
            >
                <Meta
                    title={item.name}
                    description={`${item.price.currency} ${item.price.amount}`}
                    style={{ marginBottom: 12 }}
                />
                <Space>
                    <InputNumber min={1} max={100} defaultValue={1} onChange={onChange} />
                    <Button type="primary" shape="round" onClick={() => handleShowModal(item)}>
                        Order
                    </Button>
                </Space>
            </Card>
            <Modal
                title={cart?.name}
                open={show}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                width={window.innerWidth * 0.5}
            >
                <Space direction='vertical'>
                    <Space>
                        <Image
                            width={130}
                            src={cart?.image}
                        />
                        <Space direction='vertical' style={{ paddingLeft: 12 }} >
                            <span>{cart?.name}</span>

                            <span>{`${cart?.price.amount} ${cart?.price.currency}`}</span>
                            <Row gutter={[24, 24]}>
                                <Col className="gutter-row" span={12}>
                                    <span>Quantity: {quantity}</span>
                                </Col>
                                <Col className="gutter-row" span={12}>
                                    <span>Shipping fee: 3.00</span>
                                </Col>
                                <Col className="gutter-row" span={12}>
                                    <span>Tax: 9.8</span>
                                </Col>
                                <Col className="gutter-row" span={12}>
                                    <span style={{ fontSize: 16, fontWeight: 'bold' }}>Total fee to be paid: {cart?.price.amount * quantity + 3 + 9.8}</span>
                                </Col>
                            </Row>



                        </Space>
                    </Space>
                    <Space direction='vertical'>
                        <span>Please provide information (<span style={{ color: 'red' }}>*</span> is required)</span>
                        {error && (
                            <span style={{ color: 'red', fontWeight: 'bold' }}>{error}</span>
                        )}
                        <Flex wrap="wrap">
                            <span>First name <span style={{ color: 'red' }}>*</span></span>
                            <Input id="first" placeholder="First name" />
                            <span>Last name <span style={{ color: 'red' }}>*</span></span>
                            <Input id="last" placeholder="Last name" />
                            <span>Country code <span style={{ color: 'red' }}>*</span></span>
                            <Input id="country" placeholder="Country code (Example: VI, FR, US,...)" />
                            <span>Postcode <span style={{ color: 'red' }}>*</span></span>
                            <Input id="postcode" placeholder="Postcode" />
                            <span>City <span style={{ color: 'red' }}>*</span></span>
                            <Input id="city" placeholder="City" />
                            <span>Address detail <span style={{ color: 'red' }}>*</span></span>
                            <Input id="detail" placeholder="Address detail" />
                        </Flex>
                    </Space>
                </Space>
            </Modal>
        </>
    )
}

export default CardComponent