import React from 'react';

export default function WarthogWallet() {
  return (
    <main style={{ backgroundColor: '#000', color: '#fff', height: '100vh', padding: '20px', fontFamily: 'sans-serif' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h2 style={{ color: '#aaa', fontSize: '16px' }}>Warthog Wallet</h2>
        <h1 style={{ fontSize: '42px', margin: '10px 0' }}>$0.00</h1>
        <span style={{ backgroundColor: '#222', padding: '5px 15px', borderRadius: '20px', fontSize: '12px', color: '#0f0' }}>
          +0.00% (24h)
        </span>
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '40px' }}>
        <button style={btnStyle}>Dërgo</button>
        <button style={btnStyle}>Merr</button>
        <button style={btnStyle}>Këmbe</button>
      </div>

      {/* Assets List */}
      <div>
        <h3 style={{ fontSize: '18px', marginBottom: '20px' }}>Monedhat e tua</h3>
        <div style={assetRow}>
          <div style={iconCircle}>W</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 'bold' }}>Warthog</div>
            <div style={{ color: '#666', fontSize: '12px' }}>WART</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div>0 WART</div>
            <div style={{ color: '#666', fontSize: '12px' }}>$0.00</div>
          </div>
        </div>
      </div>
    </main>
  );
}

const btnStyle = {
  backgroundColor: '#333',
  color: '#fff',
  border: 'none',
  padding: '15px 25px',
  borderRadius: '15px',
  fontWeight: 'bold' as const,
  cursor: 'pointer'
};

const assetRow = {
  display: 'flex',
  alignItems: 'center',
  padding: '15px',
  backgroundColor: '#111',
  borderRadius: '15px',
  gap: '15px'
};

const iconCircle = {
  width: '40px',
  height: '40px',
  backgroundColor: '#f3ba2f',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: 'bold' as const,
  color: '#000'
};