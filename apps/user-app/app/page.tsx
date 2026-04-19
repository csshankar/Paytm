import { getSessionSafely } from "./lib/session";
import { redirect } from 'next/navigation';
import Link from "next/link";

export default async function Page() {
  const session = await getSessionSafely();
  if (session?.user) {
    redirect('/dashboard');
  }

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans selection:bg-purple-100 selection:text-purple-900">
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
            <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <div className="bg-[#6a51a6] p-1.5 rounded-lg shadow-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="white" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                        </svg>
                    </div>
                    <span className="text-2xl font-black text-[#6a51a6] tracking-tighter">Nexis<span className="text-slate-400 font-bold">Pay</span></span>
                </div>
                <div className="hidden md:flex items-center space-x-8 text-sm font-bold text-slate-600">
                    <a href="#features" className="hover:text-[#6a51a6] transition-colors">Features</a>
                    <a href="#stats" className="hover:text-[#6a51a6] transition-colors">Impact</a>
                    <a href="#how-it-works" className="hover:text-[#6a51a6] transition-colors">How it Works</a>
                </div>
                <div className="flex items-center space-x-4">
                    <Link href="/auth/signin">
                        <button className="text-sm font-bold text-slate-600 hover:text-slate-900 px-4 py-2 transition-colors">Login</button>
                    </Link>
                    <Link href="/auth/signup">
                        <button className="bg-[#6a51a6] text-white hover:bg-[#543b8c] font-bold px-6 py-2.5 rounded-full text-sm shadow-lg shadow-purple-100 transition-all hover:scale-105 active:scale-95">
                            Get Started
                        </button>
                    </Link>
                </div>
            </div>
        </nav>

        <main className="flex-grow pt-20">
            {/* Hero Section */}
            <section className="relative overflow-hidden pt-20 pb-32 lg:pt-32 lg:pb-48">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 overflow-hidden">
                    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[60%] bg-purple-100/50 rounded-full blur-[120px]"></div>
                    <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[60%] bg-blue-50/50 rounded-full blur-[120px]"></div>
                </div>

                <div className="max-w-7xl mx-auto px-6 text-center lg:text-left grid lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <div className="inline-flex items-center space-x-2 bg-purple-50 px-4 py-2 rounded-full mb-8 border border-purple-100">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                            </span>
                            <span className="text-xs font-bold text-purple-700 uppercase tracking-widest">New: P2P Instant Transfers</span>
                        </div>
                        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 mb-8">
                            <h1 className="text-6xl lg:text-7xl font-black text-slate-900 leading-[1.1] tracking-tight">
                                Payments made <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6a51a6] to-[#8b6fc9]">lightning fast.</span>
                            </h1>
                            <div className="relative hidden xl:flex items-center -space-x-4 pt-4">
                                <div className="w-16 h-16 rounded-2xl overflow-hidden border-4 border-white shadow-xl rotate-[-12deg] hover:rotate-0 transition-transform duration-500">
                                    <img src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=200&auto=format&fit=crop" alt="Payment" className="w-full h-full object-cover" />
                                </div>
                                <div className="w-16 h-16 rounded-2xl overflow-hidden border-4 border-white shadow-xl translate-y-4 rotate-[8deg] hover:rotate-0 transition-transform duration-500 z-10">
                                    <img src="https://images.unsplash.com/photo-1556742044-3c52d6e88c62?q=80&w=200&auto=format&fit=crop" alt="Checkout" className="w-full h-full object-cover" />
                                </div>
                                <div className="absolute -right-8 -top-2">
                                    <div className="w-8 h-8 bg-yellow-400 rounded-full animate-bounce flex items-center justify-center shadow-lg">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="white" className="w-5 h-5">
                                            <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p className="text-xl text-slate-500 mb-12 max-w-xl leading-relaxed font-medium">
                            The smartest way to send money, pay bills, and manage your wallet. Secure, seamless, and built for the modern era.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <Link href="/auth/signup">
                                <button className="bg-[#6a51a6] hover:bg-[#543b8c] text-white font-black py-5 px-10 rounded-2xl text-lg transition-all shadow-2xl shadow-purple-200 hover:scale-105 active:scale-95 flex items-center justify-center space-x-2">
                                    <span>Join 10M+ Users</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                    </svg>
                                </button>
                            </Link>
                            <button className="bg-white border-2 border-slate-100 hover:border-slate-200 text-slate-600 font-bold py-5 px-10 rounded-2xl text-lg transition-all hover:bg-slate-50">
                                View Demo
                            </button>
                        </div>
                    </div>
                    <div className="relative hidden lg:block">
                        <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 to-transparent rounded-[3rem] blur-3xl -z-10"></div>
                        <div className="bg-white p-4 rounded-[3rem] shadow-2xl border border-slate-100 rotate-2 hover:rotate-0 transition-transform duration-700">
                             <div className="bg-slate-50 rounded-[2.2rem] h-[600px] overflow-hidden relative">
                                <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-white to-transparent z-10"></div>
                                <div className="p-8 space-y-6 pt-12">
                                    <div className="h-40 bg-gradient-to-br from-[#6a51a6] to-[#4b3b7a] rounded-3xl shadow-lg"></div>
                                    <div className="grid grid-cols-4 gap-4">
                                        {[1,2,3,4].map(i => <div key={i} className="aspect-square bg-white rounded-2xl shadow-sm border border-slate-100"></div>)}
                                    </div>
                                    <div className="space-y-4">
                                        <div className="h-20 bg-white rounded-2xl shadow-sm border border-slate-100"></div>
                                        <div className="h-20 bg-white rounded-2xl shadow-sm border border-slate-100"></div>
                                    </div>
                                </div>
                             </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Trust Section */}
            <section className="py-12 border-y border-slate-100 bg-slate-50/50">
                <div className="max-w-7xl mx-auto px-6">
                    <p className="text-center text-xs font-bold text-slate-400 uppercase tracking-[0.3em] mb-8">Trusted by India's leading banks</p>
                    <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                        {['HDFC BANK', 'AXIS BANK', 'ICICI Bank', 'SBI', 'KOTAK'].map(bank => (
                            <span key={bank} className="text-xl md:text-2xl font-black text-slate-800 tracking-tighter italic">{bank}</span>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section id="stats" className="py-24">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
                        {[
                            { label: "Active Users", value: "10M+" },
                            { label: "Processed", value: "₹500Cr+" },
                            { label: "App Rating", value: "4.8/5" },
                            { label: "Uptime", value: "99.9%" }
                        ].map((stat, i) => (
                            <div key={i}>
                                <div className="text-4xl md:text-5xl font-black text-[#6a51a6] mb-2">{stat.value}</div>
                                <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-32 bg-slate-50 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">Everything you need for your finances.</h2>
                        <p className="text-xl text-slate-500 font-medium leading-relaxed">Powerful features designed to give you complete control over your money, anytime, anywhere.</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { title: "Instant Wallet", desc: "Top up your wallet and pay anyone in seconds. Fast, secure, and always reliable.", icon: "W" },
                            { title: "Secure UPI", desc: "Link your bank accounts and make direct payments with bank-grade security.", icon: "U" },
                            { title: "Smart Passbook", desc: "Keep track of every single transaction with our intelligent, categorized history.", icon: "P" }
                        ].map((f, i) => (
                            <div key={i} className="bg-white p-10 rounded-[2.5rem] shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 group hover:-translate-y-2">
                                <div className="w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center text-[#6a51a6] font-black text-2xl mb-8 group-hover:bg-[#6a51a6] group-hover:text-white transition-colors">
                                    {f.icon}
                                </div>
                                <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">{f.title}</h3>
                                <p className="text-slate-500 leading-relaxed font-medium">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 px-6">
                <div className="max-w-7xl mx-auto bg-[#6a51a6] rounded-[3rem] p-12 lg:p-24 text-center relative overflow-hidden shadow-2xl shadow-purple-300">
                    <div className="absolute top-0 right-0 w-[50%] h-full bg-white/5 skew-x-12 translate-x-1/2"></div>
                    <div className="relative z-10">
                        <h2 className="text-4xl lg:text-6xl font-black text-white mb-8 tracking-tight">Ready to turbocharge <br /> your payments?</h2>
                        <p className="text-purple-100 text-xl mb-12 max-w-2xl mx-auto font-medium opacity-80">Join millions of users who have already switched to the fastest way to pay in India.</p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/auth/signup">
                                <button className="bg-white text-[#6a51a6] hover:bg-purple-50 font-black py-5 px-12 rounded-2xl text-lg transition-all shadow-xl hover:scale-105 active:scale-95">
                                    Create Free Account
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-slate-100 py-20">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
                <div className="md:col-span-1">
                    <div className="flex items-center space-x-2 mb-6">
                        <div className="bg-[#6a51a6] p-1.5 rounded-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="white" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                            </svg>
                        </div>
                        <span className="text-xl font-black text-[#6a51a6] tracking-tighter">Nexis<span className="text-slate-400 font-bold">Pay</span></span>
                    </div>
                    <p className="text-slate-400 text-sm font-medium leading-relaxed">Making payments simple, fast, and secure for everyone, everywhere.</p>
                </div>
                {[
                    { title: "Product", links: ["Features", "Security", "Business", "Pricing"] },
                    { title: "Company", links: ["About Us", "Careers", "Blog", "News"] },
                    { title: "Legal", links: ["Privacy Policy", "Terms of Service", "Cookie Policy"] }
                ].map((col, i) => (
                    <div key={i}>
                        <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-6">{col.title}</h4>
                        <ul className="space-y-4">
                            {col.links.map(link => (
                                <li key={link}><a href="#" className="text-slate-500 hover:text-[#6a51a6] text-sm font-medium transition-colors">{link}</a></li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
            <div className="max-w-7xl mx-auto px-6 pt-20 mt-20 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-6">
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">© 2026 Nexis Pay. All rights reserved.</p>
                <div className="flex space-x-6">
                    {['Twitter', 'GitHub', 'LinkedIn'].map(social => (
                        <a key={social} href="#" className="text-slate-400 hover:text-[#6a51a6] transition-colors">
                            <span className="text-xs font-bold uppercase tracking-widest">{social}</span>
                        </a>
                    ))}
                </div>
            </div>
        </footer>
    </div>
  );
}