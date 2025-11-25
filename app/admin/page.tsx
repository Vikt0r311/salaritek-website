// @ts-nocheck
'use client';

import { useState, useEffect } from 'react';
import { Upload, Trash2, Lock, LogOut, Loader } from 'lucide-react';
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

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [galleries, setGalleries] = useState<Gallery[]>([]);
  const [selectedGallery, setSelectedGallery] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error'>('success');
  const [showNewSubcategoryForm, setShowNewSubcategoryForm] = useState(false);
  const [newSubcategoryTitle, setNewSubcategoryTitle] = useState('');
  const [isCreatingSubcategory, setIsCreatingSubcategory] = useState(false);
  const [isDeletingSubcategory, setIsDeletingSubcategory] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [supabase, setSupabase] = useState<any>(null);

  // Initialize Supabase
  useEffect(() => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseKey) {
      const client = createClient(supabaseUrl, supabaseKey);
      setSupabase(client);
    }
  }, []);

  // Load galleries on login
  useEffect(() => {
    if (isLoggedIn && supabase) {
      fetchGalleries();
    }
  }, [isLoggedIn, supabase]);

  const fetchGalleries = async () => {
    try {
      setIsLoading(true);
      if (!supabase) {
        throw new Error('Supabase nincs inicializálva');
      }

      const { data, error } = await supabase
        .from('galleries')
        .select('*');

      if (error) {
        throw error;
      }

      if (data && data.length > 0) {
        // Convert database format to galleries format
        const galleriesData = data.map((row: any) => row.data) as Gallery[];
        setGalleries(galleriesData);

        if (galleriesData.length > 0) {
          setSelectedGallery(galleriesData[0].id);
          if (galleriesData[0].subcategories.length > 0) {
            setSelectedSubcategory(galleriesData[0].subcategories[0].id);
          }
        }
      }
    } catch (error) {
      console.error('Error fetching galleries:', error);
      showMessage('Hiba a galéria adatok betöltésekor', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const saveGalleriesToSupabase = async (updatedGalleries: Gallery[]) => {
    if (!supabase) {
      throw new Error('Supabase nincs inicializálva');
    }

    // Update each gallery record
    const updates = updatedGalleries.map((gallery) => ({
      id: gallery.id,
      data: gallery,
    }));

    for (const update of updates) {
      const { error } = await supabase
        .from('galleries')
        .update({ data: update.data })
        .eq('id', update.id);

      if (error) {
        throw error;
      }
    }
  };

  const showMessage = (msg: string, type: 'success' | 'error') => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => setMessage(''), 3000);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD || password === 'SalamonCsaba') {
      setIsLoggedIn(true);
      setPassword('');
      showMessage('Sikeres bejelentkezés!', 'success');
    } else {
      showMessage('Hibás jelszó!', 'error');
      setPassword('');
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setUploadedFiles([...uploadedFiles, ...files]);
  };

  const removeFile = (index: number) => {
    setUploadedFiles(uploadedFiles.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (!selectedGallery || !selectedSubcategory || uploadedFiles.length === 0) {
      showMessage('Kérjük válasszon galériát és feltöltsön képeket', 'error');
      return;
    }

    if (!supabase) {
      showMessage('Supabase nincs inicializálva', 'error');
      return;
    }

    setIsUploading(true);
    try {
      const uploadedImageNames: string[] = [];

      // Upload each file to Supabase Storage
      for (const file of uploadedFiles) {
        const fileName = `${selectedSubcategory}/${Date.now()}-${file.name}`;

        const { error } = await supabase.storage
          .from('gallery-images')
          .upload(fileName, file);

        if (error) {
          throw error;
        }

        uploadedImageNames.push(fileName);
      }

      // Update galleries data
      const updatedGalleries = galleries.map((gallery) => {
        if (gallery.id === selectedGallery) {
          const subcats = gallery.subcategories.map((subcat) => {
            if (subcat.id === selectedSubcategory) {
              return {
                ...subcat,
                images: [...(subcat.images || []), ...uploadedImageNames],
              };
            }
            return subcat;
          });

          return {
            ...gallery,
            subcategories: subcats,
          };
        }
        return gallery;
      });

      // Save to Supabase
      await saveGalleriesToSupabase(updatedGalleries);

      setGalleries(updatedGalleries);
      showMessage(
        `${uploadedImageNames.length} kép sikeresen feltöltve!`,
        'success'
      );
      setUploadedFiles([]);
    } catch (error) {
      console.error('Upload error:', error);
      showMessage('Hiba történt a feltöltés során', 'error');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (imageName: string) => {
    if (!confirm('Biztosan törölni szeretné ezt a képet?')) return;

    if (!supabase) {
      showMessage('Supabase nincs inicializálva', 'error');
      return;
    }

    try {
      // Delete from storage
      const { error: deleteError } = await supabase.storage
        .from('gallery-images')
        .remove([imageName]);

      if (deleteError) {
        throw deleteError;
      }

      // Update galleries data
      const updatedGalleries = galleries.map((gallery) => {
        if (gallery.id === selectedGallery) {
          const subcats = gallery.subcategories.map((subcat) => {
            if (subcat.id === selectedSubcategory) {
              return {
                ...subcat,
                images: (subcat.images || []).filter(
                  (img) => img !== imageName
                ),
              };
            }
            return subcat;
          });

          return {
            ...gallery,
            subcategories: subcats,
          };
        }
        return gallery;
      });

      // Save to Supabase
      await saveGalleriesToSupabase(updatedGalleries);

      setGalleries(updatedGalleries);
      showMessage('Kép sikeresen törölve!', 'success');
    } catch (error) {
      console.error('Delete error:', error);
      showMessage('Hiba történt a törlés során', 'error');
    }
  };

  const handleCreateSubcategory = async () => {
    if (!newSubcategoryTitle.trim()) {
      showMessage('Kérjük írjon be egy nevet az alkategóriához', 'error');
      return;
    }

    if (!selectedGallery) {
      showMessage('Kérjük válasszon egy galéria kategóriát', 'error');
      return;
    }

    if (!supabase) {
      showMessage('Supabase nincs inicializálva', 'error');
      return;
    }

    setIsCreatingSubcategory(true);

    try {
      const slug = newSubcategoryTitle
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '_')
        .replace(/-+/g, '_');

      const newSubcategory: Subcategory = {
        id: slug,
        title: newSubcategoryTitle,
        slug: slug,
        images: [],
      };

      const updatedGalleries = galleries.map((gallery) => {
        if (gallery.id === selectedGallery) {
          return {
            ...gallery,
            subcategories: [...gallery.subcategories, newSubcategory],
          };
        }
        return gallery;
      });

      // Save to Supabase
      await saveGalleriesToSupabase(updatedGalleries);

      setGalleries(updatedGalleries);
      showMessage('Alkategória sikeresen létrehozva!', 'success');
      setNewSubcategoryTitle('');
      setShowNewSubcategoryForm(false);
      setSelectedSubcategory(slug);
    } catch (error) {
      console.error('Create subcategory error:', error);
      showMessage('Hiba történt az alkategória létrehozása során', 'error');
    } finally {
      setIsCreatingSubcategory(false);
    }
  };

  const handleDeleteSubcategory = async () => {
    if (!selectedSubcategory) {
      showMessage('Kérjük válasszon egy alkategóriát a törléshez', 'error');
      return;
    }

    if (!supabase) {
      showMessage('Supabase nincs inicializálva', 'error');
      return;
    }

    const currentGallery = galleries.find((g) => g.id === selectedGallery);
    const subcategoryToDelete = currentGallery?.subcategories.find(
      (s) => s.id === selectedSubcategory
    );

    if (
      !confirm(
        `Biztosan törölni szeretné a "${subcategoryToDelete?.title}" alkategóriát? Ez a művelet nem vonható vissza!`
      )
    ) {
      return;
    }

    setIsDeletingSubcategory(true);

    try {
      // Delete all images from storage
      if (subcategoryToDelete && subcategoryToDelete.images.length > 0) {
        const { error: deleteError } = await supabase.storage
          .from('gallery-images')
          .remove(subcategoryToDelete.images);

        if (deleteError) {
          throw deleteError;
        }
      }

      // Remove subcategory from galleries
      const updatedGalleries = galleries.map((gallery) => {
        if (gallery.id === selectedGallery) {
          return {
            ...gallery,
            subcategories: gallery.subcategories.filter(
              (s) => s.id !== selectedSubcategory
            ),
          };
        }
        return gallery;
      });

      // Save to Supabase
      await saveGalleriesToSupabase(updatedGalleries);

      setGalleries(updatedGalleries);
      showMessage('Alkategória sikeresen törölve!', 'success');

      // Select the first subcategory of the current gallery
      const updatedGallery = updatedGalleries.find(
        (g) => g.id === selectedGallery
      );
      if (updatedGallery && updatedGallery.subcategories.length > 0) {
        setSelectedSubcategory(updatedGallery.subcategories[0].id);
      } else {
        setSelectedSubcategory('');
      }
    } catch (error) {
      console.error('Delete subcategory error:', error);
      showMessage('Hiba történt az alkategória törlése során', 'error');
    } finally {
      setIsDeletingSubcategory(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-steel-blue to-dark-accent flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
          <div className="flex items-center justify-center mb-8">
            <Lock className="w-12 h-12 text-construction-orange" />
          </div>
          <h1 className="text-3xl font-bold text-center text-steel-blue mb-8">
            Admin Bejelentkezés
          </h1>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-steel-blue mb-2">
                Jelszó
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Adja meg a jelszót"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-construction-orange"
                autoFocus
              />
            </div>

            {message && (
              <div
                className={`p-4 rounded-lg text-sm font-semibold text-white ${
                  messageType === 'success' ? 'bg-green-500' : 'bg-red-500'
                }`}
              >
                {message}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-construction-orange hover:bg-construction-orange/90 text-white font-bold py-3 rounded-lg transition-all"
            >
              Bejelentkezés
            </button>
          </form>
        </div>
      </div>
    );
  }

  const currentGallery = galleries.find((g) => g.id === selectedGallery);
  const currentSubcategory = currentGallery?.subcategories.find(
    (s) => s.id === selectedSubcategory
  );

  if (!supabase) {
    return (
      <div className="min-h-screen bg-gray-100 p-4 sm:p-8 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center max-w-md">
          <Loader className="w-12 h-12 text-construction-orange animate-spin mx-auto mb-4" />
          <p className="text-gray-600 text-lg">Supabase betöltése...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-steel-blue">Admin Felület</h1>
          <button
            onClick={() => {
              setIsLoggedIn(false);
              setPassword('');
            }}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold transition-all"
          >
            <LogOut className="w-5 h-5" />
            Kijelentkezés
          </button>
        </div>

        {message && (
          <div
            className={`mb-6 p-4 rounded-lg text-white font-semibold ${
              messageType === 'success' ? 'bg-green-500' : 'bg-red-500'
            }`}
          >
            {message}
          </div>
        )}

        {isLoading ? (
          <div className="text-center py-12">
            <Loader className="w-8 h-8 text-construction-orange animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Adatok betöltése...</p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Sidebar - Selection */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
                <h2 className="text-xl font-bold text-steel-blue mb-4">
                  Galéria Választás
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-steel-blue mb-2">
                      Fő Kategória
                    </label>
                    <select
                      value={selectedGallery}
                      onChange={(e) => {
                        setSelectedGallery(e.target.value);
                        const gallery = galleries.find(
                          (g) => g.id === e.target.value
                        );
                        if (gallery && gallery.subcategories.length > 0) {
                          setSelectedSubcategory(gallery.subcategories[0].id);
                        }
                      }}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-construction-orange"
                    >
                      {galleries.map((gallery) => (
                        <option key={gallery.id} value={gallery.id}>
                          {gallery.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-steel-blue mb-2">
                      Alkategória
                    </label>
                    <select
                      value={selectedSubcategory}
                      onChange={(e) => setSelectedSubcategory(e.target.value)}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-construction-orange"
                    >
                      {currentGallery?.subcategories.map((subcategory) => (
                        <option key={subcategory.id} value={subcategory.id}>
                          {subcategory.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        setShowNewSubcategoryForm(!showNewSubcategoryForm)
                      }
                      className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition-all"
                    >
                      {showNewSubcategoryForm ? 'Mégse' : '+ Új'}
                    </button>
                    <button
                      onClick={handleDeleteSubcategory}
                      disabled={isDeletingSubcategory || !selectedSubcategory}
                      className="flex-1 bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white font-semibold py-2 rounded-lg transition-all"
                    >
                      {isDeletingSubcategory ? 'Törlés...' : '🗑️ Törlés'}
                    </button>
                  </div>

                  {showNewSubcategoryForm && (
                    <div className="bg-blue-50 p-4 rounded-lg space-y-3 border-2 border-blue-200">
                      <input
                        type="text"
                        value={newSubcategoryTitle}
                        onChange={(e) => setNewSubcategoryTitle(e.target.value)}
                        placeholder="pl. Novo Projekt"
                        className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            handleCreateSubcategory();
                          }
                        }}
                      />
                      <button
                        onClick={handleCreateSubcategory}
                        disabled={isCreatingSubcategory}
                        className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-semibold py-2 rounded-lg transition-all"
                      >
                        {isCreatingSubcategory ? 'Létrehozás...' : 'Alkategória Létrehozása'}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Content Area */}
            <div className="lg:col-span-2 space-y-8">
              {/* Upload Section */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-steel-blue mb-4 flex items-center gap-2">
                  <Upload className="w-6 h-6" />
                  Képek Feltöltése
                </h2>

                <div className="space-y-4">
                  {/* File Input */}
                  <div className="border-2 border-dashed border-construction-orange rounded-lg p-8 text-center hover:bg-orange-50 transition-colors">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="hidden"
                      id="fileInput"
                    />
                    <label htmlFor="fileInput" className="cursor-pointer block">
                      <p className="text-lg font-semibold text-steel-blue mb-2">
                        Kattintson vagy húzzon képeket ide
                      </p>
                      <p className="text-sm text-gray-600">
                        JPG, PNG, WebP formátum - max 10 MB
                      </p>
                    </label>
                  </div>

                  {/* Selected Files */}
                  {uploadedFiles.length > 0 && (
                    <div className="space-y-2">
                      <p className="font-semibold text-steel-blue">
                        Kiválasztott fájlok: {uploadedFiles.length}
                      </p>
                      <div className="space-y-2 max-h-48 overflow-y-auto">
                        {uploadedFiles.map((file, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between bg-gray-100 p-3 rounded-lg"
                          >
                            <span className="text-sm text-gray-700 truncate">
                              {file.name}
                            </span>
                            <button
                              onClick={() => removeFile(index)}
                              className="text-red-500 hover:text-red-700 transition-colors"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <button
                    onClick={handleUpload}
                    disabled={isUploading || uploadedFiles.length === 0}
                    className="w-full bg-construction-orange hover:bg-construction-orange/90 disabled:bg-gray-400 text-white font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2"
                  >
                    {isUploading ? (
                      <>
                        <Loader className="w-5 h-5 animate-spin" />
                        Feltöltés...
                      </>
                    ) : (
                      <>
                        <Upload className="w-5 h-5" />
                        Feltöltés
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Gallery Images */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-steel-blue mb-4">
                  Jelenlegi Képek ({currentSubcategory?.images.length || 0})
                </h2>

                {currentSubcategory && currentSubcategory.images.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {currentSubcategory.images.map((imageName) => (
                      <div
                        key={imageName}
                        className="relative group rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all"
                      >
                        <div className="aspect-square bg-gray-200 relative">
                          <img
                            src={
                              process.env.NEXT_PUBLIC_SUPABASE_URL
                                ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/gallery-images/${imageName}`
                                : ''
                            }
                            alt={imageName}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src =
                                '/placeholder.png';
                            }}
                          />
                        </div>

                        {/* Delete Button */}
                        <button
                          onClick={() => handleDelete(imageName)}
                          className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>

                        <p className="text-xs text-gray-600 p-2 bg-gray-100 text-center truncate">
                          {imageName.split('/').pop()}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-gray-500 py-8">
                    Nincsenek képek ebben az alkategóriában
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
