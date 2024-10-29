import React from 'react';
import './footer.scss';
import { AiOutlineFacebook, AiOutlineInstagram, AiOutlineTwitter,AiOutlineLinkedin } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const Footer = () =>{
    return (
    <footer className='footer'>
        <div className='container'>
            <div className='row'>
                <div className='col-lg-3 col-md-6 col-sm-6 col-xs-12'>
                    <div className='footer_about'>
                        <h1 className='footer_about_logo'><b>MODERN</b></h1><br/>
                        <span>BEST HOTEL</span>
                        
                        <p>Địa Chỉ: số 8 Tôn Thất Thuyết</p>
                        <p>phone: 0977-232-223</p>
                        <p>Email: admin@gmai.com</p>
                        
                    </div>
                </div>
                <div className='col-lg-6 col-md-6 col-sm-6 col-xs-12'>
                    <div className='footer_widget'>
                        <h6>Cửa Hàng</h6>
                        <div className='box'>
                            <p>
                                <Link to={''}>Liên Hệ</Link>
                            </p>
                            <p>
                            <Link to={''}>Thông Tin Cửa Hàng</Link>
                            </p>
                            <p>
                            <Link to={''}>Sản Phẩm Liên Quan</Link>
                            </p>
                        </div>
                        <div className='box'>
                            <p>
                                <Link to={''}>Thông Tin Tài Khoản</Link>
                            </p>
                            <p>
                                <Link to={''}>Giỏ Hàng</Link>
                            </p>
                            <p>
                                <Link to={''}>Danh Sách Ưa Thích</Link>
                            </p>
                        </div>
                    </div>
                </div>
                <div className='col-lg-3 col-md-12 col-sm-12 col-xs-12'>
                    <div className='footer_widget'>
                        <h6>Khuyến Mại $ Ưu Đãi</h6>
                        <p>Đăng Kí Nhận Thông Tin Tại Đây</p>
                        <form action='#'>
                            <div className='group'>
                                <input type='text' placeholder='Nhập Email' />
                                <button type='submit' className='button-submit'>Đăng Kí</button>
                            </div>
                            <div className='footer_widget_social'>
                                <div>
                                    <AiOutlineFacebook />
                                </div>
                                <div>
                                    <AiOutlineInstagram />
                                </div>
                                <div>
                                    <AiOutlineLinkedin/>    
                                </div>
                                <div>
                                    <AiOutlineTwitter/>    
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                
            </div>
        </div>
    </footer>
    );
    
}
export default Footer;