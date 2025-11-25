'use client';

import { Mail, Phone, MapPin, Facebook, Send } from 'lucide-react';
import { useState } from 'react';

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData as any).toString(),
      });
      setIsSubmitted(true);
    } catch (error) {
      console.error('Form submission error:', error);
      alert('Hiba történt az üzenet küldése során. Kérjük, próbálja újra!');
    }
  };

  if (isSubmitted) {
    return (
      <div className="pt-20">
        <section className="py-32 bg-white">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="w-24 h-24 bg-construction-orange/10 rounded-full flex items-center justify-center mx-auto mb-8">
              <Send className="w-12 h-12 text-construction-orange" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-steel-blue mb-6">
              Köszönjük Üzenetét!
            </h1>
            <p className="text-xl text-concrete-gray mb-8">
              Hamarosan felvesszük Önnel a kapcsolatot.
            </p>
            <a
              href="/"
              className="inline-flex items-center justify-center bg-construction-orange hover:bg-construction-orange/90 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all hover:scale-105 hover:shadow-xl"
            >
              Vissza a Főoldalra
            </a>
          </div>
        </section>
      </div>
    );
  }

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
              Lépjen Kapcsolatba Velünk
            </h1>
            <p className="text-xl sm:text-2xl text-white/90">
              Ingyenes konzultáció és árajánlat kérés
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-display font-bold text-steel-blue mb-8">
                Salarkitek Kft.
              </h2>
              <p className="text-lg text-concrete-gray mb-8">
                Építőipari Generálkivitelezés
              </p>

              <div className="space-y-6 mb-12">
                <div>
                  <h3 className="text-xl font-display font-bold text-steel-blue mb-4">
                    Salamon Csaba
                  </h3>
                  <p className="text-concrete-gray">Ügyvezető</p>
                </div>

                <div className="space-y-4">
                  <a
                    href="mailto:info@salarkitek.hu"
                    className="flex items-center gap-4 text-concrete-gray hover:text-construction-orange transition-colors group"
                  >
                    <div className="w-12 h-12 bg-construction-orange/10 group-hover:bg-construction-orange rounded-xl flex items-center justify-center transition-colors">
                      <Mail className="w-6 h-6 text-construction-orange group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <div className="text-sm text-concrete-gray/70">Email</div>
                      <div className="font-semibold">info@salarkitek.hu</div>
                    </div>
                  </a>

                  <a
                    href="tel:+36303966037"
                    className="flex items-center gap-4 text-concrete-gray hover:text-construction-orange transition-colors group"
                  >
                    <div className="w-12 h-12 bg-construction-orange/10 group-hover:bg-construction-orange rounded-xl flex items-center justify-center transition-colors">
                      <Phone className="w-6 h-6 text-construction-orange group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <div className="text-sm text-concrete-gray/70">Telefon</div>
                      <div className="font-semibold">06-30/396-6037</div>
                    </div>
                  </a>

                  <div className="flex items-center gap-4 text-concrete-gray">
                    <div className="w-12 h-12 bg-construction-orange/10 rounded-xl flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-construction-orange" />
                    </div>
                    <div>
                      <div className="text-sm text-concrete-gray/70">Cím</div>
                      <div className="font-semibold">Magyarország</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
                <h3 className="text-xl font-display font-bold text-steel-blue mb-4">
                  Nyitvatartás
                </h3>
                <div className="space-y-2 text-concrete-gray mb-6">
                  <div className="flex justify-between">
                    <span>Hétfő - Péntek:</span>
                    <span className="font-semibold">8:00 - 17:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Szombat:</span>
                    <span className="font-semibold">Előzetes egyeztetés</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Vasárnap:</span>
                    <span className="font-semibold">Zárva</span>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-200">
                  <h4 className="text-sm font-semibold text-steel-blue mb-3">
                    Közösségi média
                  </h4>
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 text-concrete-gray hover:text-construction-orange transition-colors"
                  >
                    <Facebook className="w-5 h-5" />
                    <span>Facebook</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 lg:p-12 border border-gray-100">
              <h2 className="text-2xl font-display font-bold text-steel-blue mb-8">
                Kapcsolati Űrlap
              </h2>

              <form
                name="kapcsolat"
                method="POST"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <input type="hidden" name="form-name" value="kapcsolat" />
                <input type="hidden" name="bot-field" />

                <div>
                  <label
                    htmlFor="nev"
                    className="block text-sm font-semibold text-steel-blue mb-2"
                  >
                    Név *
                  </label>
                  <input
                    type="text"
                    id="nev"
                    name="nev"
                    required
                    placeholder="Teljes név"
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-construction-orange focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-steel-blue mb-2"
                  >
                    Email cím *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="pelda@email.hu"
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-construction-orange focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label
                    htmlFor="telefon"
                    className="block text-sm font-semibold text-steel-blue mb-2"
                  >
                    Telefonszám *
                  </label>
                  <input
                    type="tel"
                    id="telefon"
                    name="telefon"
                    required
                    placeholder="06-30/123-4567"
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-construction-orange focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label
                    htmlFor="szolgaltatas"
                    className="block text-sm font-semibold text-steel-blue mb-2"
                  >
                    Érdeklődés tárgya
                  </label>
                  <select
                    id="szolgaltatas"
                    name="szolgaltatas"
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-construction-orange focus:border-transparent transition-all"
                  >
                    <option value="">Válasszon...</option>
                    <option value="generalkivitelezes">
                      Teljes körű generálkivitelezés
                    </option>
                    <option value="csaladi-haz">Családi ház építés</option>
                    <option value="ipari">Ipari/Kereskedelmi épület</option>
                    <option value="felujitas">Felújítás & korszerűsítés</option>
                    <option value="egyeb">Egyéb</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="uzenet"
                    className="block text-sm font-semibold text-steel-blue mb-2"
                  >
                    Üzenet *
                  </label>
                  <textarea
                    id="uzenet"
                    name="uzenet"
                    rows={5}
                    required
                    placeholder="Írja le röviden igényét, projektjét..."
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-construction-orange focus:border-transparent transition-all resize-none"
                  />
                </div>

                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="adatvedelem"
                    name="adatvedelem"
                    required
                    className="mt-1 w-4 h-4 text-construction-orange border-gray-300 rounded focus:ring-construction-orange"
                  />
                  <label
                    htmlFor="adatvedelem"
                    className="text-sm text-concrete-gray"
                  >
                    Elfogadom az adatvédelmi szabályzatot és hozzájárulok
                    adataim kezeléséhez. *
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-construction-orange hover:bg-construction-orange/90 text-white font-bold py-4 px-6 rounded-lg transition-all hover:scale-105 hover:shadow-xl flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Üzenet Küldése
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
