'use client';
import React, { useState, useEffect } from 'react';
import * as bip39 from 'bip39';
import * as ed from '@noble/ed25519';
import { Buffer } from 'buffer';

// Fix për Turbopack/Next.js që të njohë Buffer në browser
if (typeof window !== 'undefined') {
  window.Buffer = window.Buffer || Buffer;
}

export default function WarthogFullWallet() {
  const [wallet, setWallet] = useState<{ address: string; mnemonic: string; privKey: string } | null>(null);
  const [balance, setBalance] = useState("0.00");
  const [step, setStep] = useState<'welcome' | 'seed' | 'main'>('welcome');
  const [loading, setLoading] = useState(false);

  // URL e një Node-i publik (shënim: sigurohu që ky node është aktiv)
  const NODE_URL = "https://node.warthog.network:3456";

  // 1. KRIJIMI I WALLET (Specifikisht për algoritmin e Warthog)
  const createWallet = async () => {
    try {
      setLoading(true);
      // Gjenero 12 fjalët
      const mnemonic = bip39.generateMnemonic();
      const seed = await bip39.mnemonicToSeed(mnemonic);
      
      // WART përdor Ed25519 (32 bytes e parë të seed-it)
      const privBytes = seed.slice(0, 32);
      const pubBytes = await ed.getPublicKey(privBytes);
      
      const address = Buffer.from(pubBytes).toString('hex');
      const privKey = Buffer.from(privBytes).toString('hex');

      setWallet({ address, mnemonic, privKey });
      setStep('seed');
    } catch (error) {
      console.error("Gabim gjatë krijimit:", error);
      alert("Dështoi krijimi i çelësave. Provo përsëri.");
    } finally {
      setLoading(false);
    }
  };

  // 2. MARRJA E BALANCËS NGA RRJETI
  const updateBalance = async () => {
    if (!wallet) return;
    try {
      const res = await fetch(`${NODE_URL}/get_balance`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address: wallet.address })
      });
      const data = await res.json();
      // Konvertimi nga qindarka (Wart-oshis) në WART të plotë
      const val = data.balance / 100_000_000;
      setBalance(val.toFixed(2));
    } catch (e) {
      console.log("Node offline ose gabim lidhjeje.");
    }
  };

  useEffect(() => {
    if (step === 'main') {
      updateBalance();
      const interval = setInterval(updateBalance, 30000); // Çdo 30 sekonda
      return () => clearInterval(interval);
    }
  }, [step]);

  // --- UI: EKRANI I MIRËSEARDHJES ---
  if (step === 'welcome') {
    return (
      <main style={containerStyle}>
        <div style={{ textAlign: 'center', marginTop: '40%' }}>
          <div style={{ fontSize: '80px', marginBottom: '10px' }}>🐗</div>
          <h1 style={{ color: '#f3ba2f', letterSpacing: '3px' }}>WARTHOG</h1>
          <p style={{ color: '#888', marginBottom: '40px' }}>Portofoli yt i sigurt PoBW</p>
          <button onClick={createWallet} style={mainBtnStyle}>
            {loading ? "DUKE GJERNERUAR..." : "KRIJO PORTOFOL TË RI"}
          </button>
        </div>
      </main>
    );
  }

  // --- UI: 12 FJALËT (BACKUP) ---
  if (step === 'seed') {
    return (
      <main style={containerStyle}>
        <h2 style={{ color: '#f3ba2f' }}>Backup Phrase</h2>
        <p style={{ color: '#ff4444', fontSize: '13px', marginBottom: '20px' }}>
          Shkruaj këto 12 fjalë në letër. Kush i ka këto, ka akses në paratë e tua!
        </p>
        <div style={seedGrid}>
          {wallet?.mnemonic.split(' ').map((w, i) => (
            <div key={i} style={wordCard}>
              <span style={{ color: '#555', marginRight: '8px' }}>{i + 1}</span> {w}
            </div>
          ))}
        </div>
        <button onClick={() => setStep('main')} style={mainBtnStyle}>I RUAJTA ME SIGURI</button>
      </main>
    );
  }

  // --- UI: WALLET KRYESOR (DASHBOARD) ---
  return (
    <main style={containerStyle}>
      <div style={headerCard}>
        <span style={{ color: '#f3ba2f', fontSize: '11px', fontWeight: 'bold' }}>ADRESA JOTE WART</span>
        <div style={addressBox}>{wallet?.address.substring(0, 12)}...{wallet?.address.slice(-12)}</div>
        <h1 style={{ fontSize: '48px', margin: '15px 0' }}>{balance} <span style={{ fontSize: '18px', color: '#f3ba2f' }}>WART</span></h1>
        <div style={{ color: '#4caf50', fontSize: '12px' }}>● Live on Mainnet</div>
      </div>

      <div style={actionRow}>
        <button style={actionBtn} onClick={() => alert("Funksioni i dërgimit do aktivizohet pas sinkronizimit të plotë.")}>DËRGO</button>
        <button style={actionBtn} onClick={() => alert(`Kjo është adresa jote e plotë:\n${wallet?.address}`)}>MERR</button>
      </div>

      <div style={listContainer}>
        <h4 style={{ color: '#444', marginBottom: '15px', fontSize: '12px', borderBottom: '1px solid #222', paddingBottom: '5px' }}>AKTIVET</h4>
        <div style={tokenRow}>
          <div style={tokenIcon}>W</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 'bold' }}>Warthog</div>
            <div style={{ fontSize: '11px', color: '#666' }}>Native PoBW</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontWeight: 'bold' }}>{balance} WART</div>
            <div style={{ fontSize: '11px', color: '#666' }}>$0.00 USD</div>
          </div>
        </div>
      </div>
    </main>
  );
}

// --- STILETT ---
const containerStyle: React.CSSProperties = { backgroundColor: '#000', color: '#fff', height: '100vh', padding: '20px', fontFamily: 'monospace' };
const mainBtnStyle = { backgroundColor: '#f3ba2f', color: '#000', border: 'none', padding: '18px', borderRadius: '14px', fontWeight: 'bold' as any, width: '100%', cursor: 'pointer', fontSize: '14px' };
const headerCard = { textAlign: 'center' as any, padding: '35px 15px', backgroundColor: '#0a0a0a', borderRadius: '24px', marginBottom: '25px', border: '1px solid #1a1a1a' };
const addressBox = { fontSize: '10px', color: '#555', marginTop: '8px', wordBreak: 'break-all' as any };
const actionRow = { display: 'flex', gap: '15px', marginBottom: '30px' };
const actionBtn = { flex: 1, padding: '16px', borderRadius: '14px', border: '1px solid #222', backgroundColor: '#111', color: '#fff', fontWeight: 'bold' as any, cursor: 'pointer', fontSize: '12px' };
const seedGrid = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', margin: '20px 0' };
const wordCard = { backgroundColor: '#0a0a0a', padding: '14px', borderRadius: '10px', border: '1px solid #1a1a1a', fontSize: '14px' };
const listContainer = { marginTop: '20px' };
const tokenRow = { display: 'flex', alignItems: 'center', gap: '15px', padding: '18px', backgroundColor: '#0a0a0a', borderRadius: '18px', border: '1px solid #1a1a1a' };
const tokenIcon = { width: '42px', height: '42px', borderRadius: '50%', backgroundColor: '#f3ba2f', color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' as any, fontSize: '18px' };