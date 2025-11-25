'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import 'yet-another-react-lightbox/styles.css';
import { Phone } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

interface Subcategory {
  id: string;
  title: string;
  slug: string;
  images: string[];
}

interface Gallery {
  id: string;
  title: string;
  slug: string;
  subcategories: Subcategory[];
}

interface GalleriesData {
  galleries: Gallery[];
}

export default function GalleryPage() {
  const [galleries, setGalleries] = useState<Gallery[]>([]);
  const [activeMain, setActiveMain] = useState('');
  const [activeSub, setActiveSub] = useState('');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [supabaseUrl, setSupabaseUrl] = useState('');

  // Fetch galleries from Supabase on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

        if (!supabaseUrl || !supabaseKey) {
          throw new Error('Supabase nincs konfigurálva');
        }

        setSupabaseUrl(supabaseUrl);

        // Create Supabase client
        const supabase = createClient(supabaseUrl, supabaseKey);

        // Fetch galleries from database
        const { data, error } = await supabase.from('galleries').select('*');

        if (error) {
          throw error;
        }

        if (data && data.length > 0) {
          // Convert database format to galleries format
          const galleriesData = data.map((row: any) => row.data) as Gallery[];
          setGalleries(galleriesData);

          if (galleriesData.length > 0) {
            setActiveMain(galleriesData[0].id);
            if (galleriesData[0].subcategories.length > 0) {
              setActiveSub(galleriesData[0].subcategories[0].id);
            }
          }
        }
      } catch (error) {
        console.error('Error fetching galleries:', error);
        // Fallback to empty state
        setGalleries([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const activeMainCategory = galleries.find((cat) => cat.id === activeMain);
  const hasSubgalleries = (activeMainCategory?.subcategories.length || 0) > 0;
  const activeSubGallery = activeMainCategory?.subcategories.find(
    (sub) => sub.id === activeSub
  );

  const slides =
    activeSubGallery?.images && supabaseUrl
      ? activeSubGallery.images.map((imageName) => {
          const imageUrl = `${supabaseUrl}/storage/v1/object/public/gallery-images/${imageName}`;
          return { src: imageUrl };
        })
      : [];

  return (
    <div>
      {/* Hero */}
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
              Galériánk
            </h1>
            <p className="text-xl sm:text-2xl text-white/90">
              Elkészült és folyamatban lévő projektjeink
            </p>
          </div>
        </div>
      </section>

      {/* Kategória & Galéria */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Fő kategóriák (Tabs) */}
          <div className="flex flex-wrap gap-4 justify-center mb-12">
            {galleries.map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  setActiveMain(category.id);
                  if (category.subcategories.length > 0) {
                    setActiveSub(category.subcategories[0].id);
                  } else {
                    setActiveSub('');
                  }
                  setLightboxIndex(0);
                }}
                className={`px-6 py-2 text-lg font-semibold rounded-full border transition-all ${
                  activeMain === category.id
                    ? 'bg-construction-orange text-white border-construction-orange shadow'
                    : 'bg-white text-steel-blue border-steel-blue hover:bg-steel-blue hover:text-white'
                }`}
              >
                {category.title}
              </button>
            ))}
          </div>

          {/* Alkategóriák (Buttons) */}
          {hasSubgalleries && activeMainCategory && (
            <div className="flex flex-wrap gap-4 justify-center mb-10">
              {activeMainCategory.subcategories.map((sub) => (
                <button
                  key={sub.id}
                  onClick={() => {
                    setActiveSub(sub.id);
                    setLightboxIndex(0);
                  }}
                  className={`px-5 py-2 text-base rounded-full border font-medium transition-all ${
                    activeSub === sub.id
                      ? 'bg-steel-blue text-white border-steel-blue shadow'
                      : 'bg-white text-steel-blue border-steel-blue hover:bg-steel-blue hover:text-white'
                  }`}
                >
                  {sub.title}
                </button>
              ))}
            </div>
          )}

          {/* Galéria képek vagy szöveg */}
          {!hasSubgalleries ? (
            <p className="text-center text-concrete-gray text-lg">
              Galéria feltöltés alatt...
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className="relative w-full aspect-[4/3] rounded-lg overflow-hidden shadow hover:scale-[1.02] transition-transform cursor-pointer"
                  onClick={() => {
                    setLightboxOpen(true);
                    setLightboxIndex(index);
                  }}
                >
                  <Image
                    src={slide.src}
                    alt={`${activeSubGallery?.title} ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              ))}
            </div>
          )}

          {/* Lightbox */}
          {lightboxOpen && (
            <Lightbox
              open={lightboxOpen}
              close={() => setLightboxOpen(false)}
              slides={slides}
              index={lightboxIndex}
              plugins={[Zoom]}
              on={{ view: ({ index }) => setLightboxIndex(index) }}
            />
          )}
        </div>
      </section>

      {/* Kapcsolat CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-50 rounded-2xl p-12 text-center border border-gray-100">
            <h3 className="text-2xl font-display font-bold text-steel-blue mb-4">
              Kíváncsi konkrét referenciákra?
            </h3>
            <p className="text-lg text-concrete-gray mb-8 max-w-2xl mx-auto">
              Szívesen bemutatjuk elkészült projektjeinket személyesen.
              Vegye fel velünk a kapcsolatot!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+36303966037"
                className="inline-flex items-center justify-center bg-construction-orange hover:bg-construction-orange/90 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all hover:scale-105 hover:shadow-xl"
              >
                <Phone className="w-5 h-5 mr-2" />
               06-30/396-6037
              </a>
              <Link
                href="/kapcsolat"
                className="inline-flex items-center justify-center border-2 border-steel-blue hover:bg-steel-blue hover:text-white text-steel-blue px-8 py-4 rounded-lg font-semibold text-lg transition-all"
              >
                Írjon Nekünk
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}