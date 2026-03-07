"use client"

import { useParams } from "next/navigation"
import { PRODUCTS } from "@/lib/products"
import { PayPalScriptProvider } from "@paypal/react-paypal-js"
import PayPalButton from "@/components/PayPalButton"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowLeft, ShieldCheck, Truck, Store } from "lucide-react"

export default function ProductDetailPage() {
  const params = useParams()
  
  // RREGULLIMI KRYESOR: Krahasojmë ID-të si String (tekst), jo si Numra
  const product = PRODUCTS.find((p) => p.id === params.id)

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-6">
        <h1 className="text-3xl font-black text-red-500 mb-4">Produkti nuk u gjet!</h1>
        <Link href="/">
          <Button variant="outline">Kthehu te Ballina</Button>
        </Link>
      </div>
    )
  }

  return (
    // Këtu mund të vendosësh PAYPAL_CLIENT_ID-në tënde reale më vonë
    <PayPalScriptProvider options={{ clientId: "test" }}>
      <main className="min-h-screen bg-slate-50 text-slate-900 p-6 md:p-12">
        <div className="max-w-6xl mx-auto space-y-8">
          
          {/* TOP NAV */}
          <div className="flex justify-between items-center border-b pb-6">
            <Link href="/" className="flex items-center gap-2">
              <Store className="w-8 h-8 text-blue-600" />
              <h1 className="text-3xl font-black tracking-tighter">ALBANIA<span className="text-blue-600">SHOP</span></h1>
            </Link>
            <Link href="/">
              <Button variant="outline" className="gap-2 border-slate-200 text-black">
                <ArrowLeft className="w-4 h-4" /> Kthehu te Dyqani
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white p-8 rounded-3xl shadow-sm border">
            {/* IMAGE SECTION */}
            <div className="rounded-2xl overflow-hidden border bg-slate-50 flex items-center justify-center">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-auto max-h-[500px] object-contain hover:scale-105 transition-transform duration-500" 
              />
            </div>

            {/* INFO SECTION */}
            <div className="space-y-6 flex flex-col">
              <div>
                <Badge className="bg-blue-600 px-3 py-1 text-sm mb-4">{product.category}</Badge>
                <h2 className="text-4xl font-black text-slate-900 tracking-tight leading-tight">{product.name}</h2>
              </div>
              
              <div className="text-4xl font-black text-blue-600">${product.price}</div>
              
              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                <h3 className="font-bold text-slate-400 text-xs uppercase mb-2 tracking-widest">Përshkrimi i Produktit</h3>
                <p className="text-slate-700 leading-relaxed text-lg">{product.description}</p>
              </div>

              <div className="space-y-4 pt-6 border-t mt-auto text-black">
                <p className="font-bold text-sm flex items-center gap-2">
                   Paguaj në mënyrë të sigurt me PayPal:
                </p>
                {/* Butoni i PayPal i kalon shumën saktë */}
                <PayPalButton amount={product.price} />
              </div>

              <div className="grid grid-cols-2 gap-4 pt-6">
                <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase bg-slate-50 p-2 rounded-lg border border-slate-100">
                  <ShieldCheck className="w-5 h-5 text-green-500" /> Garanci 1 Vit
                </div>
                <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase bg-slate-50 p-2 rounded-lg border border-slate-100">
                  <Truck className="w-5 h-5 text-blue-500" /> Dërgesë Falas
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </PayPalScriptProvider>
  )
}