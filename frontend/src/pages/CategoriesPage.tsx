import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CategoriesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    {
      id: 'tecnologia',
      name: 'Tecnología',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA_b9J6sEIl11K9Hrx7hMdOiuIPREBl-6Gf0cNT7fvA_YZODI2pXkEa0JYnUOG_2DTCNO8SEkWQK1BPuy4qiARJS_mJm6Ne0OuzOgbLUkWeHO7y1ZC0h7lCqrLT5uEIFMyV5lR1M7lPLqI-v8Msi9W_Na-uqACCTohuuQGWxtW_ipiFYCVjDahhb_lfI1J3V95sxXD_dZr-uD8rz3dSsA0thIujD2QUq4tMZwNR01bbwkMgl3BKVL4Vbo1e6FPfhqqxQF9zIe0bZm0'
    },
    {
      id: 'herramientas',
      name: 'Herramientas',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAlIwYQRfhP4N2MUqQTs3tt7DylzSoeKdrquGKIV9LqbDbR46NzIZS61YtpPxTRvG5A9YL0dlmHvoJ8tn0NcC-sOIwqqtVpyYGQIdVBsKUFD778aiQypSlQVTd4KWnNcGHpNOxrOhuG1XYDZg_w9Gz10VgiZtw8ZRYzfzYKOt5lIcfk3T3qNKSNdfI6-Pg4Na6ydvgXvEbd0DLxX8VqnqDbjIojEHFXWhpbnEdA3ztC8LYEM4EY2VShYp4V2FLwd60iNKqj7Jlqwyk'
    },
    {
      id: 'muebles-hogar',
      name: 'Muebles y Hogar',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD_uGwPJ7yu-7degjtEJ_hee1wEU4ws-rGzALYagompAEqqd6LvEc6156QNQo2qxFoVe-DI5Q0Xulya_FZp6sCIsGgdvlupd7AdB98OoOmLvOSJo7n4hJxcTDrlVoki4VluFGgV2Hdjz1DfAoA2MfcL1QZ-f_wpp0PFs2uVoeGFYKEcojAAnz77bKFvfWcZiB0m7p9y_UzOX1ymuHIS0gKZEnAN-f2bq4df5jEGa7TdeWuKFYL4eTZSf70FDVR1xGtiCWcVNHkkG5w'
    },
    {
      id: 'electrodomesticos',
      name: 'Electrodomésticos',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuApnHj713q7OzTDzikSpKlvECMd4nkOQLR41_8-i2ME9TFhilxxIFNP4T8mhXO8uqEyE84MAq3xQEQOJOmOBWWyTqKcP5gUk9-upTUoPIRVeAcAO55jo2ij9JmdV6o0uPuf1hsGht_HPQj-b1ZIoZw3KbPWjPG284pYZSqXYqNnSececrIqdIad4cC0OJuLZz8LyeAnynq3-reoPsHLL9HkOl2LQ99GLwLOGtHOl7hBW9Q7QqsL_WikkjTn5DlNLqSbDWP9Q9F5Fno'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* ================= NAVBAR PRINCIPAL ================= */}
      <header className="bg-white border-b border-slate-100 sticky top-0 z-50 h-20 flex items-center">
        <div className="max-w-7xl w-full mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <svg className="h-10 w-auto" viewBox="0 0 160 120">
              <path d="M10 20H80L65 50H45L30 110H10L25 50H10V20Z" fill="#cf2e2e" />
              <path d="M50 55H78L75 73H47L50 55Z" fill="black" />
              <path d="M43 85H71L68 103H40L43 85Z" fill="#cf2e2e" />
            </svg>
            <span className="text-2xl font-black uppercase tracking-tight text-[#1a1a1a] -ml-3">
              TECOMMERS
            </span>
          </div>

          <nav className="flex items-center gap-10">
            <Link to="/" className="text-slate-600 font-medium hover:text-[#ec1313] transition-colors no-underline text-sm py-2 relative">
              Home
            </Link>
            <Link to="/categories" className="text-[#cf2e2e] font-bold hover:text-[#ec1313] transition-colors no-underline text-sm py-2 relative after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:w-full after:h-[3px] after:bg-[#ec1313]">
              Categorías
            </Link>
            <Link to="/offers" className="text-slate-600 font-medium hover:text-[#ec1313] transition-colors no-underline text-sm py-2">
              Ofertas
            </Link>
            <Link to="/services" className="text-slate-600 font-medium hover:text-[#ec1313] transition-colors no-underline text-sm py-2">
              Servicios
            </Link>
            <Link to="/about" className="text-slate-600 font-medium hover:text-[#ec1313] transition-colors no-underline text-sm py-2">
              Nosotros
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <button className="p-2.5 rounded-full bg-slate-100 text-gray-700 hover:text-[#ec1313] hover:bg-slate-200 transition-all w-11 h-11 flex items-center justify-center">
              <span className="material-symbols-outlined text-xl">shopping_cart</span>
            </button>
            <Link to="/register" className="p-2.5 rounded-full bg-slate-100 text-gray-700 hover:text-[#ec1313] hover:bg-slate-200 transition-all w-11 h-11 flex items-center justify-center">
              <span className="material-symbols-outlined text-xl">person</span>
            </Link>
          </div>
        </div>
      </header>

      {/* ================= CONTENIDO PRINCIPAL ================= */}
      <main className="flex-1 flex flex-col items-center w-full">
        {/* Barra de búsqueda */}
        <div className="w-full max-w-3xl px-6 mt-12">
          <div className="relative w-full">
            <div className="absolute top-1/2 left-5 -translate-y-1/2 text-gray-400 pointer-events-none">
              <span className="material-symbols-outlined">search</span>
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar productos, marcas y más..."
              className="w-full h-14 pl-14 pr-6 bg-white border-2 border-slate-100 rounded-full text-lg font-normal transition-all shadow-md focus:outline-none focus:border-[#ec1313]"
            />
          </div>
        </div>

        {/* Título */}
        <div className="mt-20 mb-16">
          <h1 className="text-[#ec1313] text-5xl md:text-7xl font-black tracking-tight text-center uppercase">
            Categorías
          </h1>
        </div>

        {/* Grid de categorías circulares */}
        <div className="w-full max-w-7xl px-6 pb-32">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/categories/${category.id}`}
                className="flex flex-col items-center cursor-pointer group"
              >
                <div className="relative w-64 h-64 mb-8">
                  {/* Borde hover */}
                  <div className="absolute inset-0 rounded-full border-4 border-transparent group-hover:border-[#ec1313] transition-all scale-105"></div>
                  
                  {/* Imagen circular */}
                  <div className="w-full h-full rounded-full overflow-hidden bg-white shadow-xl relative">
                    <div
                      className="w-full h-full bg-cover bg-center bg-no-repeat transition-transform duration-500 group-hover:scale-110"
                      style={{ backgroundImage: `url("${category.image}")` }}
                    ></div>
                  </div>
                </div>
                <p className="text-[#1a1a1a] text-3xl font-black group-hover:text-[#ec1313] transition-colors tracking-tight uppercase text-center">
                  {category.name}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="bg-white border-t border-slate-100 py-16">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
          <div className="flex flex-wrap justify-center gap-12 mb-12">
            <Link to="/privacy" className="text-slate-500 text-sm font-semibold uppercase tracking-widest hover:text-[#ec1313] transition-colors no-underline">
              Privacidad
            </Link>
            <Link to="/terms" className="text-slate-500 text-sm font-semibold uppercase tracking-widest hover:text-[#ec1313] transition-colors no-underline">
              Términos y Condiciones
            </Link>
            <Link to="/help" className="text-slate-500 text-sm font-semibold uppercase tracking-widest hover:text-[#ec1313] transition-colors no-underline">
              Centro de Ayuda
            </Link>
            <Link to="/contact" className="text-slate-500 text-sm font-semibold uppercase tracking-widest hover:text-[#ec1313] transition-colors no-underline">
              Contacto
            </Link>
          </div>
          <p className="text-slate-400 text-xs font-medium uppercase tracking-widest">
            © 2024 Tecommers — Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default CategoriesPage;  