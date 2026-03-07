"use client"

import { useState } from "react"
import { PayPalScriptProvider } from "@paypal/react-paypal-js"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter } from "@/components/ui/sheet"
import { ShoppingCart, Plus, Trash2, Store } from "lucide-react"
import { PRODUCTS } from "@/lib/products"
import PayPalButton from "@/components/PayPalButton"
import Link from "next/link"

const PAYPAL_CLIENT_ID = "test"; 

export default function Faqe2() {
  const [cart, setCart] = useState<any[]>([]);

  const addToCart = (product: any) => setCart([...cart, product]);
  const removeFromCart = (index: number) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const totalPrice = cart.reduce((acc, item) => acc + item.price, 0);

  // KETU FILTROJME PRODUKTET: Shfaqim produktet nga pozicioni 4 deri ne 8
  const pageProducts = PRODUCTS.slice(4, 8);

  return (
    <PayPalScriptProvider options={{ clientId: PAYPAL_CLIENT_ID }}>
      <main className="min-h-screen bg-slate-50 text-slate-900 p-6 md:p-12 font-sans">
        
        {/* HEADER */}
        <div className="max-w-6xl mx-auto flex justify-between items-center mb-12 border-b pb-6 text-black">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <Store className="w-8 h-8 text-blue-600" />
              <h1 className="text-3xl font-black tracking-tighter">ALBANIA<span className="text-blue-600">SHOP</span></h1>
            </div>
            <nav className="hidden md:flex gap-6 italic font-bold text-black">
              <Link href="/" className="text-slate-500 hover:text-blue-600 transition-colors">Ballina</Link>
              <Link href="/rreth-nesh" className="text-slate-500 hover:text-blue-600 transition-colors">Rreth Nesh</Link>
            </nav>
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="relative border-2 border-slate-200 text-black">
                <ShoppingCart className="w-5 h-5 mr-2" />
                Shporta {cart.length > 0 && <Badge className="ml-2 bg-blue-600">{cart.length}</Badge>}
              </Button>
            </SheetTrigger>
            <SheetContent className="bg-white w-full sm:w-[450px] flex flex-col text-black">
              <SheetHeader>
                <SheetTitle className="text-2xl font-bold border-b pb-4">Shporta e Faqes 2</SheetTitle>
              </SheetHeader>
              <div className="flex-1 overflow-y-auto py-6 space-y-4">
                {cart.length === 0 ? (
                  <p className="text-center text-slate-500 mt-10 italic">Shporta është bosh.</p>
                ) : (
                  cart.map((item, index) => (
                    <div key={index} className="flex items-center justify-between bg-slate-50 p-3 rounded-lg border">
                      <div className="flex items-center gap-3">
                        <img src={item.image} className="w-10 h-10 rounded object-cover" alt="" />
                        <div>
                          <p className="font-bold text-sm">{item.name}</p>
                          <p className="text-blue-600 font-bold text-xs">${item.price}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => removeFromCart(index)}>
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </div>
                  ))
                )}
              </div>
              <SheetFooter className="border-t pt-6">
                <div className="w-full space-y-4">
                  <div className="flex justify-between text-xl font-black mb-4">
                    <span>TOTALI:</span>
                    <span className="text-blue-600">${totalPrice}</span>
                  </div>
                  {cart.length > 0 && <PayPalButton amount={totalPrice} />}
                </div>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>

        {/* PRODUKTET GRID */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {pageProducts.map((product) => (
            <Card key={product.id} className="group overflow-hidden border-2 border-transparent hover:border-blue-600 transition-all shadow-md bg-white flex flex-col">
              <Link href={`/product/${product.id}`} className="cursor-pointer">
                <div className="aspect-square overflow-hidden relative">
                  <img src={product.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={product.name} />
                  <Badge className="absolute top-3 left-3 bg-white/90 text-slate-900">{product.category}</Badge>
                </div>
              </Link>
              <CardHeader className="p-4 text-black">
                <CardTitle className="text-lg font-bold truncate">{product.name}</CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-2">
                <div className="text-2xl font-black text-blue-600">${product.price}</div>
              </CardContent>
              <CardFooter className="p-4 mt-auto gap-2">
                <Button onClick={() => addToCart(product)} className="flex-1 bg-slate-900 hover:bg-blue-600 text-white font-bold">
                  <Plus className="w-4 h-4 mr-2" /> SHPORTË
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* NAVIGIMI - KETU BUTONI 2 ESHTE JESHIL/BLU */}
        <div className="max-w-6xl mx-auto flex justify-center items-center gap-2 mt-12 pb-12">
          <Link href="/">
            <Button variant="outline" className="text-black hover:border-blue-600">1</Button>
          </Link>
          <Button variant="outline" className="bg-blue-600 text-white border-blue-600">2</Button>
          <Link href="/faqe3">
            <Button variant="outline" className="text-black hover:border-blue-600">3</Button>
          </Link>
        </div>

      </main>
    </PayPalScriptProvider>
  )
}