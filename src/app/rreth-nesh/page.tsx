"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Store, ArrowLeft, ShieldCheck, Truck, CreditCard } from "lucide-react"

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 p-6 md:p-12 font-sans">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* HEADER NAVBAR REPLICA */}
        <div className="flex justify-between items-center border-b pb-6">
          <div className="flex items-center gap-2">
            <Store className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-black tracking-tighter">Albania<span className="text-blue-600">SHOP</span></h1>
          </div>
          <Link href="/">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="w-4 h-4" /> Kthehu te Dyqani
            </Button>
          </Link>
        </div>

        {/* CONTENT SECTION */}
        <div className="text-center space-y-4">
          <h2 className="text-5xl font-black italic text-slate-900 tracking-tighter">RRETH NESH</h2>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Ne jemi destinacioni numër një për të gjithë miner-at dhe entuziastët e rrjetit Warthog. 
            Misioni ynë është të thjeshtojmë blerjen e pajisjeve me siguri maksimale.
          </p>
        </div>

        {/* FEATURES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard 
            icon={<ShieldCheck className="w-10 h-10 text-green-500" />}
            title="Siguri 100%"
            desc="Çdo transaksion i juaji mbrohet nga enkriptimi më i lartë."
          />
          <FeatureCard 
            icon={<CreditCard className="w-10 h-10 text-blue-500" />}
            title="Pagesat PayPal"
            desc="Blerje të shpejta dhe të thjeshta me llogarinë tuaj PayPal."
          />
          <FeatureCard 
            icon={<Truck className="w-10 h-10 text-orange-500" />}
            title="Dërgesa e Shpejtë"
            desc="Pajisjet tona dërgohen në kohë rekord kudo që ndodheni."
          />
        </div>

        {/* BOTTOM CALL TO ACTION */}
        <div className="bg-blue-600 rounded-3xl p-10 text-center text-white space-y-6 shadow-2xl shadow-blue-200">
          <h3 className="text-3xl font-bold">Gati për të nisur mining?</h3>
          <p className="text-blue-100 opacity-90">Eksploroni produktet tona më të fundit dhe filloni udhëtimin tuaj sot.</p>
          <Link href="/">
            <Button className="bg-white text-blue-600 hover:bg-slate-100 font-bold px-8 h-12 text-lg rounded-full">
              Shiko Produktet
            </Button>
          </Link>
        </div>
      </div>
    </main>
  )
}

function FeatureCard({ icon, title, desc }: { icon: any, title: string, desc: string }) {
  return (
    <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-shadow text-center space-y-4">
      <div className="flex justify-center">{icon}</div>
      <h4 className="font-bold text-xl">{title}</h4>
      <p className="text-slate-500 text-sm">{desc}</p>
    </div>
  )
}