import Link from 'next/link';
import { Mail, Phone, MapPin, Facebook } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-steel-blue text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logó + Leírás */}
          <div>
            <Link href="/" className="flex items-center gap-3 group mb-4">
              <img
                src="/logo.png"
                alt="Salarkitek logo"
                className="h-24 max-h-28 w-auto object-contain group-hover:scale-105 transition-transform"
              />
            </Link>
            <p className="text-white/80 text-sm leading-relaxed max-w-xs">
              Építőipari generálkivitelezés felsőfokon – megbízhatóság, minőség, professzionalizmus.
            </p>
          </div>

          {/* Gyors linkek */}
          <div>
            <h3 className="text-base font-display font-semibold mb-4">Gyors Linkek</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/szolgaltatasok" className="text-white/80 hover:text-construction-orange transition-colors">Szolgáltatások</Link></li>
              <li><Link href="/galeria" className="text-white/80 hover:text-construction-orange transition-colors">Galéria</Link></li>
              <li><Link href="/rolunk" className="text-white/80 hover:text-construction-orange transition-colors">Rólunk</Link></li>
              <li><Link href="/kapcsolat" className="text-white/80 hover:text-construction-orange transition-colors">Kapcsolat</Link></li>
            </ul>
          </div>

          {/* Kapcsolat */}
          <div>
            <h3 className="text-base font-display font-semibold mb-4">Kapcsolat</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="mailto:info@salarkitek.hu" className="flex items-center gap-3 text-white/80 hover:text-construction-orange transition-colors">
                  <Mail className="w-5 h-5" /> info@salarkitek.hu
                </a>
              </li>
              <li>
                <a href="tel:+36303966037" className="flex items-center gap-3 text-white/80 hover:text-construction-orange transition-colors">
                  <Phone className="w-5 h-5" /> 06-30/396-6037
                </a>
              </li>
              <li className="flex items-start gap-3 text-white/80">
                <MapPin className="w-5 h-5 mt-1" /> Magyarország
              </li>
              <li>
                <a href="#" className="inline-flex items-center gap-2 text-white/80 hover:text-construction-orange transition-colors">
                  <Facebook className="w-5 h-5" /> Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Alsó sáv */}
        <div className="mt-10 pt-6 border-t border-white/10 text-center text-white/60 text-xs">
          <p>© 2025 Salarkitek Kft. Minden jog fenntartva.</p>
        </div>
      </div>
    </footer>
  );
}