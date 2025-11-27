'use client';

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import {
  Building2,
  Home,
  Factory,
  Wrench,
  TrendingUp,
  Award,
  Clock,
  Shield,
  ChevronDown,
} from "lucide-react";

export default function HomePage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const galleryImages = [
    '/galeria/erzsebethegy/Image01.webp',
    '/galeria/erzsebethegy/Image02.webp',
    '/galeria/erzsebethegy/Image03.webp',
    '/galeria/erzsebethegy/Image10.webp',
    '/galeria/ruhagyar/Image01.webp',
    '/galeria/ruhagyar/Image05.webp',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [galleryImages.length]);

  return (
    <div>
      {/* ===== HERO SECTION ===== */}
      <section className="relative text-white overflow-hidden -mt-36 pt-36">
        <div className="absolute inset-0">
          <Image
            src="/hero.webp"
            alt="Salarkitek Építőipari Generálkivitelezés"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-20 lg:pt-16 lg:pb-28 relative">
          <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-8 lg:gap-16 items-center">
            {/* Bal oldal - szöveg */}
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 bg-construction-orange/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-construction-orange/30">
                <Award className="w-5 h-5 text-construction-orange" />
                <span className="text-sm font-semibold text-construction-orange">
                  Dinamikusan fejlődő cég.
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-6xl font-display font-extrabold leading-tight mb-6">
                Építőipari Generálkivitelezés{" "}
              </h1>

              <p className="text-lg sm:text-xl text-white/90 mb-8 leading-relaxed">
                Stabil háttér, gyors fejlődés, megbízhatóság.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link
                  href="/kapcsolat"
                  className="inline-flex items-center justify-center bg-construction-orange hover:bg-construction-orange/90 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all hover:scale-105 hover:shadow-xl"
                >
                  Ingyenes Konzultáció
                </Link>
                <Link
                  href="/galeria"
                  className="inline-flex items-center justify-center border-2 border-white/30 hover:border-white hover:bg-white/10 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all"
                >
                  Referenciáink
                </Link>
              </div>

              {/* Statisztika badge-ek - csak desktop */}
              <div className="hidden lg:grid grid-cols-3 gap-4">
                {[
                  { label: "Minőségbiztosítás", icon: Shield },
                  { label: "Kulcsrakész Kivitelezés", icon: Award },
                  { label: "Dinamikusan fejlődő cég", icon: Clock },
                ].map((badge) => (
                  <div
                    key={badge.label}
                    className="flex flex-col items-center justify-center text-center bg-white/10 backdrop-blur-md border border-white/20 rounded-lg px-3 py-4 hover:bg-white/15 transition-all"
                  >
                    <badge.icon className="w-6 h-6 text-construction-orange mb-2" />
                    <p className="text-xs font-semibold leading-tight">
                      {badge.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Jobb oldal - képgaléria */}
            <div className="w-full order-1 lg:order-2">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl max-w-md lg:max-w-none mx-auto">
                {galleryImages.map((img, index) => (
                  <div
                    key={img}
                    className={`absolute inset-0 transition-opacity duration-1000 ${
                      index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`Salarkitek projekt ${index + 1}`}
                      fill
                      className="object-cover"
                      priority={index === 0}
                    />
                  </div>
                ))}

                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
                  {galleryImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentImageIndex
                          ? 'bg-construction-orange w-8'
                          : 'bg-white/50 hover:bg-white/80'
                      }`}
                      aria-label={`Kép ${index + 1}`}
                    />
                  ))}
                </div>

                <div className="absolute top-4 right-4 bg-construction-orange/90 backdrop-blur-sm text-white px-4 py-2 rounded-lg font-semibold text-sm shadow-lg">
                  Referenciáink
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-white/50" />
        </div>
      </section>

      {/* ===== SZOLGÁLTATÁSOK ===== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-display font-bold text-steel-blue mb-4">
              Amit Nyújtunk
            </h2>
            <p className="text-xl text-concrete-gray max-w-3xl mx-auto">
              Teljes körű építőipari megoldások minden igényre
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: Building2,
                title: "Teljes Körű Generálkivitelezés",
                description:
                  "A tervezéstől a kulcsrakész átadásig visszük végig a folyamatot hatósági ügyintézéstől a teljes körű kivitelezésig, hogy Önnek csak költöznie kelljen.",
              },
              {
                icon: Home,
                title: "Családi Házak Építése",
                description:
                  "Családi házak építése kiviteli tervek alapján folyamatos tanácsadással, szakágakkal egyeztetve. Gyors, precíz kivitelezés otthonának megteremtéséhez.",
              },
              {
                icon: Factory,
                title: "Ipari-Kereskedelmi Épületek",
                description:
                  "Üzleti épületek kivitelezése kiviteli tervek alapján jól felszerelt gépparkunkkal többféle technikai megoldásokat ötvözve a jelenlegi kihívásoknak megfelelve.",
              },
              {
                icon: Wrench,
                title: "Felújítás & Korszerűsítés",
                description:
                  "Régi épületek új életre keltése modern megoldásokkal.",
              },
            ].map((s, i) => (
              <div
                key={i}
                className="group bg-gray-50 hover:bg-steel-blue rounded-2xl p-8 border border-gray-100 transition-all hover:shadow-2xl"
              >
                <div className="w-16 h-16 bg-construction-orange rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <s.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-display font-bold text-steel-blue group-hover:text-white mb-4 transition-colors">
                  {s.title}
                </h3>
                <p className="text-concrete-gray group-hover:text-white/90 transition-colors">
                  {s.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== MIÉRT A SALARKITEK ===== */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-display font-bold text-steel-blue mb-4">
              Miért a Salarkitek?
            </h2>
            <p className="text-xl text-concrete-gray max-w-3xl mx-auto">
              Három pillér, ami meghatározza munkánkat
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Building2,
                title: "Stabil Háttér",
                description:
                  "Tapasztalt szakemberek, bevált technológiák, garantált minőség.",
              },
              {
                icon: TrendingUp,
                title: "Gyors Fejlődés",
                description:
                  "Innovatív megoldások, modern eszközpark, hatékony folyamatok.",
              },
              {
                icon: Award,
                title: "Jól Felszerelt Géppark",
                description:
                  "Teljes körű generálkivitelezés, precíz munkavégzés, folyamatos támogatás.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all border border-gray-100 hover:-translate-y-2"
              >
                <div className="w-16 h-16 bg-construction-orange/10 rounded-xl flex items-center justify-center mb-6">
                  <item.icon className="w-8 h-8 text-construction-orange" />
                </div>
                <h3 className="text-2xl font-display font-bold text-steel-blue mb-4">
                  {item.title}
                </h3>
                <p className="text-concrete-gray">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA (Call To Action) ===== */}
      <section className="relative py-28 bg-gradient-to-br from-steel-blue to-dark-accent text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10" />
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold mb-6">
            Készen áll megvalósítani álmai otthonát?
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
            Lépjen kapcsolatba velünk még ma, és mi segítünk a tervezéstől a
            kulcsrakész megvalósításig!
          </p>
          <Link
            href="/kapcsolat"
            className="inline-flex items-center justify-center bg-construction-orange hover:bg-construction-orange/90 text-white px-10 py-5 rounded-lg font-semibold text-lg transition-all hover:scale-105 hover:shadow-xl"
          >
            Kapcsolatfelvétel
          </Link>
        </div>
      </section>
    </div>
  );
}