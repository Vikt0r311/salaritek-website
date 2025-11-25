import Link from 'next/link';
import { Home, Wrench, Phone, Building2 } from 'lucide-react';

export const metadata = {
  title: '404 - Az oldal nem található | Salarkitek Kft.',
  robots: 'noindex, follow',
};

export default function NotFound() {
  return (
    <div className="pt-20">
      <section className="flex items-center justify-center py-20">
        <div className="text-center max-w-2xl mx-auto px-4">
          <h1 className="text-9xl font-display font-black text-construction-orange mb-4">
            404
          </h1>

          <div className="mb-8 flex justify-center">
            <div className="relative">
              <Wrench className="w-48 h-48 text-gray-300" />
              <Building2 className="w-24 h-24 text-construction-orange/50 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
            </div>
          </div>

          <h2 className="text-3xl font-display font-bold text-steel-blue mb-4">
            Úgy tűnik, ez az oldal még építés alatt van...
          </h2>

          <p className="text-lg text-concrete-gray mb-8">
            A keresett oldal nem található. Lehet, hogy elírta a címet, vagy az
            oldal átköltözött.
          </p>

          <div className="flex flex-wrap gap-4 justify-center mb-12">
            <Link
              href="/"
              className="inline-flex items-center justify-center bg-construction-orange hover:bg-construction-orange/90 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all hover:scale-105 hover:shadow-xl gap-2"
            >
              <Home className="w-5 h-5" />
              Vissza a Főoldalra
            </Link>
            <Link
              href="/szolgaltatasok"
              className="inline-flex items-center justify-center border-2 border-steel-blue hover:bg-steel-blue hover:text-white text-steel-blue px-8 py-4 rounded-lg font-semibold text-lg transition-all gap-2"
            >
              <Building2 className="w-5 h-5" />
              Szolgáltatásaink
            </Link>
            <Link
              href="/kapcsolat"
              className="inline-flex items-center justify-center border-2 border-steel-blue hover:bg-steel-blue hover:text-white text-steel-blue px-8 py-4 rounded-lg font-semibold text-lg transition-all gap-2"
            >
              <Phone className="w-5 h-5" />
              Kapcsolat
            </Link>
          </div>

          <div className="text-sm text-concrete-gray bg-gray-50 rounded-lg p-6 border border-gray-100">
            <p className="mb-2 font-semibold">Segítségre van szüksége?</p>
            <p>
              <a
                href="tel:+36303966037"
                className="text-construction-orange hover:text-construction-orange/80 font-semibold transition-colors"
              >
                Hívjon minket: 06-30/396-6037
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
