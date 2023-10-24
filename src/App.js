
import './App.css';
import { useEffect, useState } from 'react'
import CardComponent from './components/Card';
import { products } from './products';
import { Space } from 'antd';
function App() {

  const [cart, setCart] = useState()
  return (
    <>
      <Space style={{ width: '100%', position: 'sticky', top: 0, backgroundColor: 'gray', height: 80, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>LECHIHIEU's STORE</div>
      </Space>

      <div style={{ display: 'flex', gap: 32, width: '100%', marginTop: 30, justifyContent: 'center', alignItems: 'center' }}>
        {products.map((item) => (
          <CardComponent item={item} setCart={setCart} cart={cart} />
        ))}
      </div>

    </>
  );
}

export default App;
