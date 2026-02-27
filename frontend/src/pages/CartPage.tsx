import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from './CartContext';
import { useTheme } from '../pages/ThemeContext';
import './CartPage.css';

const CartPage: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [shippingMethod, setShippingMethod] = useState('standard');
  
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    toggleSelectItem, 
    toggleSelectAll,
    selectedItems,
    subtotal,
    discount
  } = useCart();
  const { theme, toggleTheme } = useTheme();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = 'unset';
  };

  const shipping = subtotal > 500 ? 0 : 99.99;
  const total = subtotal - discount + shipping;

  const categories = [
    { id: 'electrodomesticos', name: 'Electrodomésticos', icon: 'devices' },
    { id: 'muebles-hogar', name: 'Muebles y Hogar', icon: 'chair' },
    { id: 'tecnologia', name: 'Tecnología', icon: 'computer' },
    { id: 'herramientas', name: 'Herramientas', icon: 'build' }
  ];

  return (
    <div style={{ backgroundColor: 'var(--bg-primary)' }}>
      <header className="header">
        <div className="header-container">
          <div className="logo-container">
            <svg className="logo-svg" viewBox="0 0 160 120">
              <path d="M10 20H80L65 50H45L30 110H10L25 50H10V20Z" fill="#cf2e2e" />
              <path d="M50 55H78L75 73H47L50 55Z" fill="black" />
              <path d="M43 85H71L68 103H40L43 85Z" fill="#cf2e2e" />
            </svg>
            <span className="logo-text">TECOMMERS</span>
          </div>

          <nav className="nav">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/categories" className="nav-link">Categorías</Link>
            <Link to="/offers" className="nav-link">Ofertas</Link>
            <Link to="/services" className="nav-link">Servicios</Link>
            <Link to="/about" className="nav-link">Nosotros</Link>
          </nav>

          <div className="icon-container">
            <button onClick={toggleTheme} className="icon-button" aria-label="Cambiar tema">
              <span className="material-symbols-outlined">
                {theme === 'light' ? 'dark_mode' : 'light_mode'}
              </span>
            </button>
            <Link to="/cart" className="icon-button active" aria-label="Carrito de compras">
              <span className="material-symbols-outlined">shopping_cart</span>
              {cartItems.length > 0 && (
                <span className="cart-badge">{cartItems.length}</span>
              )}
            </Link>
            <Link to="/register" className="icon-button" aria-label="Perfil de usuario">
              <span className="material-symbols-outlined">person</span>
            </Link>
            <div className="hamburger-menu">
              <button 
                className={`hamburger-button ${isMenuOpen ? 'active' : ''}`} 
                onClick={toggleMenu}
                aria-label="Menú"
              >
                <span className="hamburger-line"></span>
                <span className="hamburger-line"></span>
                <span className="hamburger-line"></span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className={`side-menu-overlay ${isMenuOpen ? 'open' : ''}`} onClick={closeMenu}></div>
      <div className={`side-menu ${isMenuOpen ? 'open' : ''}`}>
        <div className="side-menu-header">
          <div className="side-menu-user">
            <div className="side-menu-avatar">
              <span className="material-symbols-outlined">account_circle</span>
            </div>
            <div className="side-menu-user-info">
              <h3>Invitado</h3>
              <p>Inicia sesión para más opciones</p>
            </div>
          </div>
          <button className="side-menu-close" onClick={closeMenu}>
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="side-menu-search">
          <div className="side-menu-search-box">
            <span className="material-symbols-outlined">search</span>
            <input 
              type="text" 
              className="side-menu-search-input" 
              placeholder="Buscar productos..." 
            />
          </div>
        </div>

        <div className="side-menu-nav">
          <div className="side-menu-section">
            <h4 className="side-menu-section-title">Menú Principal</h4>
            <ul className="side-menu-links">
              <li>
                <Link to="/" className="side-menu-link" onClick={closeMenu}>
                  <span className="material-symbols-outlined">home</span>Home
                </Link>
              </li>
              <li>
                <Link to="/categories" className="side-menu-link" onClick={closeMenu}>
                  <span className="material-symbols-outlined">category</span>Categorías
                </Link>
              </li>
              <li>
                <Link to="/offers" className="side-menu-link" onClick={closeMenu}>
                  <span className="material-symbols-outlined">local_offer</span>Ofertas
                </Link>
              </li>
              <li>
                <Link to="/services" className="side-menu-link" onClick={closeMenu}>
                  <span className="material-symbols-outlined">build</span>Servicios
                </Link>
              </li>
              <li>
                <Link to="/about" className="side-menu-link" onClick={closeMenu}>
                  <span className="material-symbols-outlined">info</span>Nosotros
                </Link>
              </li>
            </ul>
          </div>

          <div className="side-menu-section">
            <h4 className="side-menu-section-title">Categorías Populares</h4>
            <div className="side-menu-category-grid">
              {categories.map((cat) => (
                <Link 
                  key={cat.id} 
                  to={`/categories/${cat.id}`} 
                  className="side-menu-category-item" 
                  onClick={closeMenu}
                >
                  <div className="category-icon">
                    <span className="material-symbols-outlined">{cat.icon}</span>
                  </div>
                  <span className="category-name">{cat.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="side-menu-footer">
          <div className="side-menu-footer-links">
            <Link to="/help" className="side-menu-footer-link" onClick={closeMenu}>
              <span className="material-symbols-outlined">help</span>
              Centro de Ayuda
            </Link>
            <Link to="/login" className="side-menu-footer-link" onClick={closeMenu}>
              <span className="material-symbols-outlined">login</span>
              Iniciar Sesión
            </Link>
            <Link to="/register" className="side-menu-footer-link" onClick={closeMenu}>
              <span className="material-symbols-outlined">app_registration</span>
              Registrarse
            </Link>
          </div>
        </div>
      </div>

      <div className="breadcrumb">
        <div className="breadcrumb-container">
          <Link to="/" className="breadcrumb-link">Inicio</Link>
          <span className="breadcrumb-separator">{'>'}</span>
          <span className="breadcrumb-current">Carrito de compras</span>
        </div>
      </div>

      <main className="cart-main">
        <div className="cart-container">
          <h1 className="cart-title">Carrito de compras</h1>
          
          <div className="cart-content">
            <div className="cart-items-section">
              {cartItems.length > 0 && (
                <div className="cart-header">
                  <label className="select-all">
                    <input 
                      type="checkbox" 
                      checked={cartItems.length > 0 && cartItems.every(item => item.selected)}
                      onChange={toggleSelectAll}
                    />
                    <span>Seleccionar todos ({cartItems.length} productos)</span>
                  </label>
                  <button 
                    className="remove-selected" 
                    onClick={() => {
                      const selectedIds = cartItems.filter(item => item.selected).map(item => item.id);
                      selectedIds.forEach(id => removeFromCart(id));
                    }}
                  >
                    Eliminar seleccionados
                  </button>
                </div>
              )}

              {cartItems.length > 0 ? (
                cartItems.map(item => (
                  <div key={item.id} className="cart-item">
                    <div className="cart-item-checkbox">
                      <input 
                        type="checkbox" 
                        checked={item.selected}
                        onChange={() => toggleSelectItem(item.id)}
                      />
                    </div>
                    
                    <div className="cart-item-image">
                      <img src={item.image} alt={item.name} />
                    </div>
                    
                    <div className="cart-item-details">
                      <Link to={`/product/${item.id}`} className="cart-item-name">
                        {item.name}
                      </Link>
                      <div className="cart-item-seller">
                        Vendido por <span>{item.seller}</span>
                      </div>
                      <div className="cart-item-shipping">
                        <span className="shipping-badge">Envío gratis</span>
                      </div>
                      <div className="cart-item-stock">
                        {item.stock > 0 ? `Stock disponible (${item.stock} unidades)` : 'Sin stock'}
                      </div>
                      
                      <div className="cart-item-actions">
                        <div className="quantity-selector">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="quantity-btn"
                            disabled={item.quantity <= 1}
                          >
                            -
                          </button>
                          <span className="quantity-value">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="quantity-btn"
                            disabled={item.quantity >= item.stock}
                          >
                            +
                          </button>
                        </div>
                        
                        <button 
                          className="remove-item"
                          onClick={() => removeFromCart(item.id)}
                        >
                          Eliminar
                        </button>
                        
                        <button className="save-for-later">
                          Guardar para después
                        </button>
                      </div>
                    </div>
                    
                    <div className="cart-item-prices">
                      <div className="current-price">${item.price.toFixed(2)}</div>
                      {item.originalPrice > item.price && (
                        <>
                          <div className="original-price">${item.originalPrice.toFixed(2)}</div>
                          <div className="discount-badge">
                            -{Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}%
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="empty-cart">
                  <span className="material-symbols-outlined">shopping_cart</span>
                  <h3>Tu carrito está vacío</h3>
                  <p>¿No sabés qué comprar? ¡Miles de productos te esperan!</p>
                  <Link to="/categories" className="continue-shopping-btn">
                    Comprar ahora
                  </Link>
                </div>
              )}
            </div>

            <div className="cart-summary">
              <h2 className="summary-title">Resumen de compra</h2>
              
              <div className="summary-details">
                <div className="summary-row">
                  <span>Productos ({selectedItems.length})</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                
                {discount > 0 && (
                  <div className="summary-row discount">
                    <span>Descuento</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
                
                <div className="summary-row">
                  <span>Envío</span>
                  <span className={shipping === 0 ? 'shipping-free' : ''}>
                    {shipping === 0 ? 'Gratis' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>

                <div className="coupon-section">
                  <input 
                    type="text" 
                    placeholder="Cupón de descuento"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="coupon-input"
                  />
                  <button 
                    className={`coupon-button ${couponApplied ? 'applied' : ''}`}
                    onClick={() => setCouponApplied(!couponApplied)}
                  >
                    {couponApplied ? 'Aplicado' : 'Aplicar'}
                  </button>
                </div>

                <div className="shipping-options">
                  <h3>Método de envío</h3>
                  <label className="shipping-option">
                    <input 
                      type="radio" 
                      name="shipping" 
                      value="standard"
                      checked={shippingMethod === 'standard'}
                      onChange={(e) => setShippingMethod(e.target.value)}
                    />
                    <div className="shipping-option-content">
                      <span className="shipping-name">Estándar (3-5 días hábiles)</span>
                      <span className="shipping-price">$99.99</span>
                    </div>
                  </label>
                  <label className="shipping-option">
                    <input 
                      type="radio" 
                      name="shipping" 
                      value="express"
                      checked={shippingMethod === 'express'}
                      onChange={(e) => setShippingMethod(e.target.value)}
                    />
                    <div className="shipping-option-content">
                      <span className="shipping-name">Express (1-2 días hábiles)</span>
                      <span className="shipping-price">$199.99</span>
                    </div>
                  </label>
                </div>
              </div>

              <div className="summary-total">
                <span>Total</span>
                <span className="total-amount">${total.toFixed(2)}</span>
              </div>

              <button className="checkout-button" disabled={selectedItems.length === 0}>
                Continuar compra
              </button>

              <div className="secure-payment">
                <span className="material-symbols-outlined">lock</span>
                <span>Compra 100% segura</span>
              </div>

              <div className="accepted-payments">
                <p>Medios de pago:</p>
                <div className="payment-icons">
                  <span>Visa</span>
                  <span>Mastercard</span>
                  <span>Amex</span>
                  <span>Mercado Pago</span>
                </div>
              </div>
            </div>
          </div>

          <div className="recommended-section">
            <h2 className="recommended-title">Basado en tu carrito</h2>
            <div className="recommended-grid">
              <div className="recommended-card">
                <img src="https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Producto" />
                <h3>Smartwatch Deportivo</h3>
                <div className="recommended-price">$189.99</div>
                <button className="add-to-cart-btn">Agregar</button>
              </div>
              <div className="recommended-card">
                <img src="https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Producto" />
                <h3>Tablet 10" 64GB</h3>
                <div className="recommended-price">$299.99</div>
                <button className="add-to-cart-btn">Agregar</button>
              </div>
              <div className="recommended-card">
                <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Producto" />
                <h3>Reloj Inteligente</h3>
                <div className="recommended-price">$149.99</div>
                <button className="add-to-cart-btn">Agregar</button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <div className="footer-logo-symbol">
                <div className="t-main"></div>
                <div className="logo-bars">
                  <div className="bar-black"></div>
                  <div className="bar-red"></div>
                </div>
              </div>
              <span className="footer-logo-text">TECOMMERS</span>
            </div>
            <p className="footer-description">
              Tu aliado estratégico en compras online. Calidad, rapidez y confianza en cada uno de
              tus pedidos.
            </p>
          </div>
          
          <div className="footer-section">
            <h4 className="footer-heading">Empresa</h4>
            <ul className="footer-links">
              <li><Link to="/about" className="footer-link">Sobre Nosotros</Link></li>
              <li><Link to="/services" className="footer-link">Nuestros Servicios</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">Categorias</h4>
            <ul className="footer-links">
              <li><Link to="/categories/tecnologia" className="footer-link">Tecnología</Link></li>
              <li><Link to="/categories/electrodomesticos" className="footer-link">Electrodomésticos</Link></li>
              <li><Link to="/categories/muebles-hogar" className="footer-link">Muebles y Hogar</Link></li>
              <li><Link to="/categories/herramientas" className="footer-link">Herramientas</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p className="copyright">© 2026 Tecommers. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default CartPage;