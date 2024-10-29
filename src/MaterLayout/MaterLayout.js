import React from 'react';
import Header from '../component/Header';
import Footer from '../component/footer';

const MasterLayout = ({ children }) => {
    return (
        <div>
            <Header />
            <div style={{ display: 'flex' }}>
                <main style={{ flex: 1, padding: '20px' }}>
                    {children}
                </main>
            </div>
            <Footer />
        </div>
    );
}

export default MasterLayout;