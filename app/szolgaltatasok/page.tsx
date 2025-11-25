import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  Building2,
  Home,
  Factory,
  Wrench,
  CheckCircle2,
  FileText,
  Users,
  Shield,
  Zap,
  TrendingUp,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Szolgáltatások - Salarkitek Kft.',
  description:
    'Teljes körű építőipari generálkivitelezés: családi házak építése, ipari épületek, kereskedelmi ingatlanok, felújítások és korszerűsítések.',
};

export default function ServicesPage() {
  const services = [
    {
      icon: Building2,
      image: '/galeria/sagod_to_utca/Image01.webp',
      title: 'Teljes Körű Generálkivitelezés',
      description:
        'A tervezéstől a kulcsrakész átadásig visszük végig a folyamatot hatósági ügyintézéstől a teljes körű kivitelezésig, hogy Önnek csak költöznie kelljen.',
      features: [
        'Tervezési koordináció',
        'Hatósági ügyintézés',
        'Szakipari munkák koordinálása',
        'Minőség-ellenőrzés',
        'Határidő menedzsment',
        'Garanciális szolgáltatás',
      ],
    },
    {
      icon: Home,
      image: '/galeria/erzsebethegy/Image12.webp',
      title: 'Családi Házak Építése',
      description: 'Családi házak építése kiviteli tervek alapján folyamatos tanácsadással, szakágakkal egyeztetve. Gyors, precíz kivitelezés otthonának megteremtéséhez.',
      features: [
        'Modern és hagyományos technológiák',
        'Energiahatékony megoldások',
        'Egyedi tervezés lehetősége',
        'Típusterv adaptáció',
        'Beköltözhető állapot garancia',
        'Kulcsrakész átadás',
      ],
    },
    {
      icon: Factory,
      image: '/galeria/ruhagyar/Image01.webp',
      title: 'Ipari & Kereskedelmi Épületek',
      description: 'Üzleti épületek kivitelezése kiviteli tervek alapján jól felszerelt gépparkunkkal többféle technikai megoldásokat ötvözve a jelenlegi kihívásoknak megfelelve. ',
      features: [
        'Ipari csarnokok',
        'Raktárak és logisztikai központok',
        'Kereskedelmi ingatlanok',
        'Irodaépületek',
        'Nagy volumenű projektek kezelése',
        'Határidő betartás garancia',
      ],
    },
    {
      icon: Wrench,
      image: '/galeria/salarkitek/Image04.webp',
      title: 'Felújítás & Korszerűsítés',
      description: 'Régi épületek új életre keltése modern megoldásokkal',
      features: [
        'Teljes körű felújítás',
        'Energetikai korszerűsítés',
        'Homlokzat felújítás',
        'Tetőfelújítás',
        'Belsőépítészeti átalakítások',
        'Műemlékvédelmi felújítások',
      ],
    },
  ];

  return (
    <div>
      <section className="relative bg-gradient-to-br from-steel-blue to-dark-accent text-white py-20 overflow-hidden -mt-36 pt-36">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold mb-6">
              Szolgáltatásaink
            </h1>
            <p className="text-xl sm:text-2xl text-white/90">
              Teljes körű generálkivitelezési megoldások minden igényre
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-20">
            {services.map((service, index) => (
              <div
                key={index}
                className={`flex flex-col ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                } gap-12 items-center`}
              >
                <div className="flex-1">
                  <div className="w-20 h-20 bg-construction-orange rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                    <service.icon className="w-10 h-10 text-white" />
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-display font-bold text-steel-blue mb-4">
                    {service.title}
                  </h2>
                  <p className="text-lg text-concrete-gray mb-8 leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="grid sm:grid-cols-2 gap-4">
                    {service.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-start gap-3"
                      >
                        <CheckCircle2 className="w-6 h-6 text-construction-orange flex-shrink-0 mt-0.5" />
                        <span className="text-concrete-gray">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex-1">
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-construction-orange text-white px-4 py-2 rounded-lg font-semibold text-sm shadow-lg">
                      Professzionális
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-steel-blue mb-4">
              Miért Válasszon Minket?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Shield,
                title: 'Garantált Minőség',
                description:
                  'Minden projektünk a legmagasabb minőségi követelményeknek felel meg',
              },
              {
                icon: Users,
                title: 'Tapasztalt Csapat',
                description:
                  '50+ szakember több évtizedes építőipari tapasztalattal',
              },
              {
                icon: Zap,
                title: 'Gyors Megvalósítás',
                description:
                  'Hatékony folyamatok és modern technológiák alkalmazása',
              },
              {
                icon: FileText,
                title: 'Átlátható Árazás',
                description:
                  'Fix árajánlat, nincs rejtett költség, teljes átláthatóság',
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-2 border border-gray-100"
              >
                <div className="w-16 h-16 bg-construction-orange/10 rounded-xl flex items-center justify-center mb-6">
                  <item.icon className="w-8 h-8 text-construction-orange" />
                </div>
                <h3 className="text-xl font-display font-bold text-steel-blue mb-3">
                  {item.title}
                </h3>
                <p className="text-concrete-gray leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-steel-blue to-dark-accent text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-6">
            Egyedi igénye van? Beszéljük meg!
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Minden projekt egyedi. Vegye fel velünk a kapcsolatot, és
            beszéljük meg elképzeléseit!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/kapcsolat"
              className="inline-flex items-center justify-center bg-construction-orange hover:bg-construction-orange/90 text-white px-10 py-5 rounded-lg font-semibold text-lg transition-all hover:scale-105 hover:shadow-xl"
            >
              Ajánlatot Kérek
            </Link>
            <a
              href="tel:+36303966037"
              className="inline-flex items-center justify-center border-2 border-white/30 hover:border-white hover:bg-white/10 text-white px-10 py-5 rounded-lg font-semibold text-lg transition-all"
            >
              Hívjon Most: 06-30/396-6037
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
