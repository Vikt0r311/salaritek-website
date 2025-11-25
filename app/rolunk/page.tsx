import { Metadata } from 'next';
import Link from 'next/link';
import {
  Shield,
  Award,
  Handshake,
  Users,
  TrendingUp,
  CheckCircle2,
  Target,
  Heart,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Rólunk - Salarkitek Kft.',
  description:
    'Megbízható építőipari generálkivitelező cég stabil háttérrel. Ismerd meg történetünket, értékeinket és csapatunkat.',
};

export default function AboutPage() {
  return (
    <div>
      {/* HERO */}
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
              Bemutatkozás
            </h1>
            <p className="text-xl sm:text-2xl text-white/90">
              Építőipari kiválóság stabil alapokon
            </p>
          </div>
        </div>
      </section>

      {/* --- SALARKITEK TÖRTÉNETE – ÁTÍRVA --- */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-steel-blue mb-6">
              A Salarkitek Kft. Története
            </h2>
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-concrete-gray leading-relaxed mb-6">
              Cégünk építőipari generálkivitelezéssel foglalkozik. Értékrendünkben kiemelt
              helyen áll a határidők betartása, a minőségi munka iránti elkötelezettség,
              a rugalmas és hatékony munkavégzés, valamint a munkáink eredményességének
              kulcsa az alvállalkozókkal kialakított jó és gördülékeny munkafolyamat
              és munkakapcsolat.
            </p>

            <p className="text-lg text-concrete-gray leading-relaxed mb-6">
              Kollégáink szakmai felkészültsége, a stabil alvállalkozói háttér, valamint a
              tulajdonunkban lévő széles géppark lehetővé teszi, hogy minden alkalommal a
              szerződésben rögzített határidőre gyors, színvonalas munkát tudjunk végezni.
              A megalakulás óta nyereségesen működünk, dinamikusan fejlődünk.
            </p>

            <p className="text-lg text-concrete-gray leading-relaxed mb-6">
              A műszaki vezetés a tulajdonosok személyes jelenlétükkel és közreműködésükkel
              történik. A négy tulajdonos közül az egyik, az építőipar területén szerzett
              15 éves múlttal rendelkezik, teljes körű szakmai és vállalkozói tapasztalattal,
              amelyet a mindennapi munka során kamatoztat.
            </p>

            <p className="text-lg text-concrete-gray leading-relaxed">
              Szerszám- és gépparkunkat folyamatosan fejlesztjük, és a lehető legmegfelelőbb
              technológiákat követjük. Eddigi eredményeinket olyan igényesen kivitelezett,
              műszaki szempontból színvonalas munkák átadásának köszönhetjük, amelyek
              meghatározták pozíciónkat az építőiparon belül.
            </p>
          </div>
        </div>
      </section>

      {/* --- MIÉRT MI SZEKCIÓ (meghagyva) --- */}
      <section className="py-20 bg-steel-blue text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-display font-bold mb-6">
              Miért Mi?
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: TrendingUp, title: '15+ év tapasztalat az építőiparban' },
              { icon: CheckCircle2, title: 'Pontos határidő és költségvetés betartás' },
              { icon: Shield, title: 'Minőségbiztosítás minden projekt során' },
              { icon: Handshake, title: 'Folyamatos ügyféltámogatás és garancia' },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-colors text-center"
              >
                <item.icon className="w-12 h-12 text-construction-orange mx-auto mb-4" />
                <p className="text-lg font-semibold">{item.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-construction-orange to-construction-orange/80 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-6">
            Építsünk Együtt!
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Készen állunk, hogy partnerként segítsük projektje megvalósítását
          </p>
          <Link
            href="/kapcsolat"
            className="inline-flex items-center justify-center bg-white hover:bg-gray-100 text-construction-orange px-10 py-5 rounded-lg font-semibold text-lg transition-all hover:scale-105 hover:shadow-xl"
          >
            Vegyük Fel a Kapcsolatot
          </Link>
        </div>
      </section>
    </div>
  );
}