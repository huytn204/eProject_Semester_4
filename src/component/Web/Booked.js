import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaWallet, FaTruck, FaStar } from 'react-icons/fa';
import { AiOutlineCarryOut } from "react-icons/ai";
import { MdFreeCancellation } from "react-icons/md";
import { Link } from "react-router-dom";

const BookedPage = () =>{

    const statuses = [
        { icon: <Link to={'/book'}><FaWallet /></Link> , label: 'Chờ xác nhận' },
        { icon: <Link to={'/Confirmed'}><AiOutlineCarryOut /></Link>, label: 'Đã xác nhận' },
        { icon: <Link to={'/Canceled'}><MdFreeCancellation /></Link>, label: 'Đã Hủy' },
        { icon: <Link to={'#'}><FaStar /></Link>, label: 'Đánh giá' }
    ];
    return (
      <Container className="mt-4">
      <h5>Đơn Đặt</h5>
      <Row>
          {statuses.map((status, index) => (
              <Col key={index} xs={3} className="text-center">
                  <Card className="border-0">
                      <Card.Body>
                          <div className="icon mb-2" style={{ fontSize: '45px' }}>
                              {status.icon}
                          </div>
                          <Card.Text>{status.label}</Card.Text>
                      </Card.Body>
                  </Card>
              </Col>
          ))}
      </Row>
      <div className="mt-3">
          <a href="#" className="text-muted">Xem lịch sử đặt phòng &gt;</a>
      </div>
  </Container>
    );
  };
  export default BookedPage;