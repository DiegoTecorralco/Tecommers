import React from 'react';
import { Link } from 'react-router-dom';

interface Service {
  id: number;
  name: string;
  description: string;
  image: string;
}

const ServicesPage: React.FC = () => {
  const services: Service[] = [
    {
      id: 1,
      name: 'Mis pedidos',
      description: 'Rastrea y gestiona tus compras',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBY9snUA78gFbD8l4HutO2ozBKDxtYOrPUocAW_PM1o3hT7kCLWyJUK27v-IbJkT8xIKutX-OcZWOcy_3buM33ye2sbst_KBbecKVwJGlLYwFp0EA2OujLotEnXG3FkMnZJxZqeJy6Urw62hH07QW1EnBj5Sf5WYHOWCBrwXJofCvJkX9tlx_Idrj_--7vUc6dhwjCZEZHBuG7Yfr0bg2Au9jLgRt351_uI4oF0U81G5atNbUyBOpqTwwQjbArJLqloVNrsEGvtbUE'
    },
    {
      id: 2,
      name: 'Devoluciones',
      description: 'Procesar devoluciones fácilmente',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB_TdfjCO8YTNj7_hR-ykw27inAridVB1Zuafz1coCRv0SRtVDeKWEtrAUsQ1d0kGgV9jXUJnS8TeML3tOO5Yq5TgKJbcpNrjm1qAxKlNG4WgJTpv4UDFu-FCixFf7GtK8z3_xoNiGvguY--r12OPaCptbnxHU9cKpGe3d1c5WeszMTNO1nK4jjPavAEr9RqjAwCQ-1CF9EcCHyk3OOOGBciqFAHCsJ0d4gH1g6X43fQNBBbjfqM-ICRhgOHhBnTbTq2N7FVoHu5GA'
    },
    {
      id: 3,
      name: 'Soporte',
      description: 'Asistencia técnica disponible',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAgbY2fJPeyUKY60w89XhY8X7RY1LaRIfCOm_HcSLbxSBECn-u71Cs8_sfoW2mZ2SPtIi-I62n_EqHxx7mm4J54uNvyt3QwTGLMcdgZlXlXw2MkfA_vPrLrMupgO3jvwKtB93fuFP2J5UZx1WiKglIMRB03OY4Lu4e5du6mE7qHYDEyLXxJnrF5dlVlFij6bwoCxavPctovvh3nD1RNUqML150jVruycEw8hMrVfE6MYG8LOHmYAGWICXNIBl6bkeZ7gRy--s6l314'
    },
    {
      id: 4,
      name: 'Beneficios premium',
      description: 'Ver tus beneficios exclusivos',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAbywBMqk8bZrS-qda2YSBA3rpfg-HcLyUF2m6XTy6KPnM2HtHgghA6blor_zo1olVXTiKkUNVYvwkQ_cEk9ZWseefLyKIF0siTPgeI1PjgdOoCUGOhsWr7hx_58EcKtBF0HPqo4m2lvuWYZAy7TDuNK6NoGn2vyOKJiQZqnXu2HrbtpjyQUo4KetAnqD7_p7xGNg2LR0dcPBEQIBxG-zgh0pqHfFsbqUnLeJpBGEfyn1G1p6UoOwZ9zNj-q4aG-z_SEBn7jfiTqHo'
    },
    {
      id: 5,
      name: 'Reportar',
      description: 'Seguridad y reportes de fraude',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDoqgUfNnusz2taNr3M6zBIB4DcwqM8ZjaFKfUtjch25JpNyAteE8je9WhQOibhMDQWECG9dROG1Q4OnFyi8l1p56zylT_NRwcVBZ3YeQjeffpW2ovk0ga-GQqpAhiR8JOykkNJGiSmmPtoMA1vX1m6ZQ1xE8gocnDwrTTPxo8o2pRGf8TqlOOjZNhlelvdnED64bhsudG_TJkWBqrt-PTparV6Lu1Tm5HtZNSwko2fDzzirX64_N-Au6A0m-QBoHdjaHnx4_KV6wY'
    },
    {
      id: 6,
      name: 'Contáctanos',
      description: 'Canales de soporte directo',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAF2ylAh8VXx8zqRC-UH6yK6Y8c-R7qtb5hBUlcFdGndh4aC6e_lS7FjMielQcSgNFb5OiMPwDtpqTltM5y7dtjz1UOJcEocp-gR2Ho-kpTmo_dARYcUfAsP8e-JlYRr4YJd4gqOH0DQFgRILy_Xp_XVB7Kbk_QKdsA3lrsK0T0TPpOwaIg5XMhKT0VeL8HzCL-Vvn6e7WgtaqR_yDWc4t6GNvyXbeDvYDL4UjsBzcVJXTihqHESkNlEMuWAsUa1abNkhBOX0LPsn8'
    },
    {
      id: 7,
      name: 'Tu cuenta',
      description: 'Perfil y configuración',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD9hIDoxMr7zQnNSPYhbdHrn59LU95KTkFKR5mcX-UIkQIYIeRjGtXOlfqvLRErI7nlIoDxCIhKIWSD6uykh0C9twPNe5HcjdKMJkUjMsXkb3U9dWinbps5wIu0CfsKcXO8QrqXN6ZWnzHQh_9pw_3zGkhUSxEwFzidOUwR1SsB-OEs-03eHVk_lBo1cQp4ma-zo4JsplPjLHKoA5pX62eyqB6_GrvUtYwiu6jGkvVx2olQAdvzZ61fJHcaLuFwLhLrFL3VaMMfrgg'
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
            <Link to="/" className="text-slate-600 font-medium hover:text-[#ec1313] transition-colors no-underline text-sm py-2">
              Home
            </Link>
            <Link to="/categories" className="text-slate-600 font-medium hover:text-[#ec1313] transition-colors no-underline text-sm py-2">
              Categorías
            </Link>
            <Link to="/offers" className="text-slate-600 font-medium hover:text-[#ec1313] transition-colors no-underline text-sm py-2">
              Ofertas
            </Link>
            <Link to="/services" className="text-[#cf2e2e] font-bold hover:text-[#ec1313] transition-colors no-underline text-sm py-2 relative after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:w-full after:h-[3px] after:bg-[#ec1313]">
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
      <main className="flex-1 max-w-7xl mx-auto px-4 md:px-8 py-12 w-full">
        {/* Título */}
        <div className="text-center mb-16">
          <h1 className="text-[#ec1313] text-5xl md:text-6xl font-extrabold mb-4">
            Nuestros servicios
          </h1>
        </div>

        {/* Grid de servicios */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-[#f2f2f2] p-8 rounded-2xl flex flex-col items-center text-center hover:shadow-lg transition-shadow cursor-pointer group"
            >
              <div className="w-full aspect-[4/3] bg-gray-300 rounded-xl mb-6 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-xl font-bold text-[#1a1a1a] mb-2">
                {service.name}
              </h3>
              <p className="text-sm font-semibold text-[#ec1313]">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        {/* Sección de información */}
        <div className="max-w-4xl mx-auto my-24 text-center">
          <h2 className="text-3xl font-bold text-[#1a1a1a] mb-8">
            Algunas de las cosas que puedes hacer aquí
          </h2>
          <p className="text-slate-500 leading-relaxed text-lg">
            Nuestra plataforma de servicios está diseñada para brindarte autonomía y seguridad en cada paso de tu experiencia de compra. Desde el seguimiento en tiempo real hasta la gestión de reembolsos, estamos comprometidos con tu satisfacción total y soporte 24/7.
          </p>
        </div>
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="bg-white border-t border-slate-100 py-10 mt-auto">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-slate-400">
            © 2024 Tecommers. Todos los derechos reservados.
          </p>
          <div className="flex gap-8 text-sm text-slate-400">
            <Link to="/terms" className="text-slate-400 hover:text-[#ec1313] transition-colors no-underline">
              Términos y condiciones
            </Link>
            <Link to="/privacy" className="text-slate-400 hover:text-[#ec1313] transition-colors no-underline">
              Política de privacidad
            </Link>
            <Link to="/cookies" className="text-slate-400 hover:text-[#ec1313] transition-colors no-underline">
              Cookies
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ServicesPage;