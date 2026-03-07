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
  const product = PRODUCTS.find((p) => p.id === Number(params.id))

  if (!product) {
    return <div className="p-20 text-center text-2xl font-bold text-red-500">Produkti nuk u gjet!</div>
  }

  return (
    <PayPalScriptProvider options={{ clientId: "test" }}>
      <main className="min-h-screen bg-slate-50 text-slate-900 p-6 md:p-12">
        <div className="max-w-6xl mx-auto space-y-8">
          
          {/* TOP NAV */}
          <div className="flex justify-between items-center border-b pb-6">
            <Link href="/" className="flex items-center gap-2">
              <Store className="w-8 h-8 text-blue-600" />
              <h1 className="text-3xl font-black tracking-tighter">Albania<span className="text-blue-600">SHOP</span></h1>
            </Link>
            <Link href="/">
              <Button variant="outline" className="gap-2">
                <ArrowLeft className="w-4 h-4" /> Kthehu te Dyqani
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white p-8 rounded-3xl shadow-sm border">
            {/* IMAGE SECTION */}
            <div className="rounded-2xl overflow-hidden border">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </div>

            {/* INFO SECTION */}
            <div className="space-y-6">
              <Badge className="bg-blue-600 px-3 py-1 text-sm">{product.category}</Badge>
              <h2 className="text-4xl font-black text-slate-900 tracking-tight">{product.name}</h2>
              <div className="text-3xl font-black text-blue-600">${product.price}</div>
              
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <h3 className="font-bold text-slate-500 text-xs uppercase mb-2 tracking-widest">Përshkrimi</h3>
                <p className="text-slate-700 leading-relaxed italic">{product.description}</p>
              </div>

              <div className="space-y-4 pt-4 border-t">
                <p className="font-bold text-sm">Paguaj në mënyrë të sigurt me PayPal:</p>
                <PayPalButton amount={product.price} />
              </div>

              <div className="flex gap-4 pt-6">
                <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase">
                  <ShieldCheck className="w-4 h-4" /> Garanci 1 Vit
                </div>
                <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase">
                  <Truck className="w-4 h-4" /> Dërgesë Falas
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </PayPalScriptProvider>
  )
}