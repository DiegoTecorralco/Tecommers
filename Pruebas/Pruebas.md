# Documento: Página Estática a Dinámica

### 1. ¿Qué es el DOM?

El **DOM (Document Object Model)** es una representación en forma de árbol de objetos de un documento HTML. Cuando el navegador carga una página web, crea este modelo estructurado donde cada etiqueta HTML se convierte en un **objeto** o **nodo**. JavaScript puede interactuar con estos nodos para cambiar el contenido, el estilo y la estructura de la página de forma dinámica.

---

### 2. ¿Cómo representa el navegador un documento HTML?

El proceso es el siguiente:

1.  **Recibe el HTML:** El navegador descarga el archivo HTML.
2.  **Construye el DOM (Parseo):** Lee el HTML línea por línea y construye el árbol del DOM, creando un nodo por cada etiqueta encontrada.
3.  **Construye el CSSOM (CSS Object Model):** Descarga y procesa los archivos CSS para crear otro árbol con la información de estilos.
4.  **Crea el Árbol de Render (Render Tree):** Combina el DOM y el CSSOM, incluyendo solo los elementos visibles en pantalla.
5.  **Pintado (Painting):** El navegador pinta los píxeles en la pantalla basándose en el árbol de render.

En resumen, el navegador transforma el texto plano de HTML en una estructura de objetos (el DOM) que puede ser estilizada y manipulada.

---

### 3. Diferencia entre `getElementById()`, `querySelector()` y `querySelectorAll()`

Estos son métodos que JavaScript proporciona para seleccionar elementos del DOM:

| Método | ¿Qué selecciona? |
| :--- | :--- |
| **`getElementById()`** | Un **único** elemento que tenga el `id` especificado. Es el método más rápido y específico. |
| **`querySelector()`** | El **primer** elemento que coincida con un selector CSS (clase, ID, etiqueta, etc.). |
| **`querySelectorAll()`** | Una **lista estática (NodeList)** de **todos** los elementos que coincidan con un selector CSS. |

---

### 4. ¿Qué es un evento en JavaScript?

Un **evento** es una acción o suceso que ocurre en el navegador, ya sea por parte del usuario o por el propio sistema. Ejemplos de eventos son: hacer clic en un botón, mover el ratón, escribir en un campo de texto, cargar la página, enviar un formulario, etc.

JavaScript puede "escuchar" estos eventos y ejecutar una función (llamada "event handler" o "listener") en respuesta.

---

## Arbol DOM

body
├── header.header
│   └── div.header-container
│       ├── div.logo-container
│       │   ├── svg.logo-svg
│       │   └── span.logo-text
│       ├── nav.nav
│       │   ├── Link (Home)
│       │   ├── Link (Categorías)
│       │   ├── Link (Ofertas)
│       │   ├── Link (Servicios)
│       │   └── Link (Nosotros)
│       └── div.icon-container
│           ├── button.icon-button (tema)
│           ├── Link.icon-button (carrito)
│           │   └── span.cart-badge (condicional)
│           ├── Link.icon-button (perfil)
│           └── div.hamburger-menu
│               └── button.hamburger-button
│                   ├── span.hamburger-line
│                   ├── span.hamburger-line
│                   └── span.hamburger-line
│
├── MODALES (condicionales)
│   ├── div.showSuccessModal (modal éxito reseña)
│   ├── div.showDeleteModal (modal confirmar eliminar)
│   └── div.showDeleteSuccessModal (modal éxito eliminación)
│
├── div.side-menu-overlay
│
├── div.side-menu
│   ├── div.side-menu-header
│   │   ├── div.side-menu-user
│   │   │   ├── div.side-menu-avatar
│   │   │   └── div.side-menu-user-info
│   │   │       ├── h3
│   │   │       └── p
│   │   └── button.side-menu-close
│   │
│   ├── div.side-menu-search
│   │   └── div.side-menu-search-box
│   │       ├── span.material-symbols-outlined
│   │       └── input.side-menu-search-input
│   │
│   ├── div.side-menu-nav
│   │   ├── div.side-menu-section
│   │   │   ├── h4.side-menu-section-title
│   │   │   └── ul.side-menu-links
│   │   │       ├── li → Link (Home)
│   │   │       ├── li → Link (Categorías)
│   │   │       ├── li → Link (Ofertas)
│   │   │       ├── li → Link (Servicios)
│   │   │       └── li → Link (Nosotros)
│   │   │
│   │   └── div.side-menu-section
│   │       ├── h4.side-menu-section-title
│   │       └── div.side-menu-category-grid
│   │           ├── Link (Electrodomésticos)
│   │           ├── Link (Muebles y Hogar)
│   │           ├── Link (Tecnología)
│   │           └── Link (Herramientas)
│   │
│   └── div.side-menu-footer
│       └── div.side-menu-footer-links
│           ├── Link (Centro de Ayuda)
│           ├── Link (Iniciar Sesión)
│           └── Link (Registrarse)
│
├── section.hero
│   ├── div.hero-banner
│   ├── div.hero-overlay
│   └── div.hero-content (PADRE PRINCIPAL)
│       ├── h1.hero-title (MODIFICADO dinámicamente)
│       │   ├── [texto parte1],
│       │   ├── br.hero-break
│       │   └── span.hero-highlight [texto parte2]
│       │
│       ├── p.hero-subtitle (MODIFICADO con textContent)
│       │
│       ├── div.search-container
│       │   └── div.search-box
│       │       ├── div.search-icon
│       │       │   └── span.material-symbols-outlined
│       │       ├── input.search-input
│       │       └── button.search-button
│       │
│       ├── NUEVO: div.flex.gap-4.mt-8 (contiene botones)
│       │   ├── button (Cambiar Título)
│       │   │   └── span.material-symbols-outlined
│       │   └── button (Mostrar/Ocultar Sección Extra)
│       │       └── span.material-symbols-outlined
│       │
│       └── NUEVO: div#extra-info-section (visible/oculto)
│           ├── h3
│           ├── p
│           └── div.mt-4.flex.gap-4
│               ├── span (etiqueta -20%)
│               ├── span (etiqueta Envío gratis)
│               └── span (etiqueta Nuevo)
│
├── main.main
│   ├── div.section-header
│   │   ├── div
│   │   │   ├── p.section-subtitle
│   │   │   └── h2.section-title
│   │   └── Link.section-link
│   │       └── span.material-symbols-outlined
│   │
│   ├── div.categories-grid
│   │   ├── Link.category-card (Tecnología)
│   │   │   ├── div.category-image-container
│   │   │   │   ├── img.category-image
│   │   │   │   └── div.category-overlay
│   │   │   ├── h3.category-title
│   │   │   └── p.category-description
│   │   │
│   │   ├── Link.category-card (Electrodomésticos)
│   │   ├── Link.category-card (Muebles y Hogar)
│   │   └── Link.category-card (Herramientas)
│   │
│   └── section.reviews-section
│       ├── div.text-center
│       │   ├── h2
│       │   │   └── span
│       │   └── p
│       │
│       ├── div#reviews-container (contenedor dinámico)
│       │
│       └── div.max-w-2xl (formulario reseñas)
│           ├── h3
│           │   └── span
│           │
│           └── form#review-form
│               ├── div (nombre)
│               │   ├── label
│               │   ├── input#reviewer-name
│               │   └── div#error-reviewer-name.error-message
│               │       └── span
│               │
│               ├── div (categoría)
│               │   ├── label
│               │   ├── select#review-product
│               │   │   ├── option (vacío)
│               │   │   ├── option (Tecnología)
│               │   │   ├── option (Electrodomésticos)
│               │   │   ├── option (Muebles y Hogar)
│               │   │   └── option (Herramientas)
│               │   └── div#error-review-product.error-message
│               │       └── span
│               │
│               ├── div (nombre producto)
│               │   ├── label
│               │   ├── input#review-product-name
│               │   └── div#error-review-product-name.error-message
│               │       └── span
│               │
│               ├── div (calificación)
│               │   ├── label
│               │   ├── div#rating-stars
│               │   │   ├── button.rating-star (★)
│               │   │   ├── button.rating-star (★)
│               │   │   ├── button.rating-star (★)
│               │   │   ├── button.rating-star (★)
│               │   │   └── button.rating-star (★)
│               │   ├── input#review-rating-value
│               │   └── div#error-rating.error-message
│               │       └── span
│               │
│               ├── div (comentario)
│               │   ├── div.flex
│               │   │   ├── label
│               │   │   └── span#character-count
│               │   ├── textarea#review-comment
│               │   └── div#error-review-comment.error-message
│               │       └── span
│               │
│               └── div.flex.gap-4 (botones formulario)
│                   ├── button#submitReviewBtn
│                   │   └── span
│                   └── button#resetReviewBtn
│                       └── span
│
└── footer.footer
    ├── div.footer-content
    │   ├── div.footer-section
    │   │   ├── div.footer-logo
    │   │   │   ├── div.footer-logo-symbol
    │   │   │   │   ├── div.t-main
    │   │   │   │   └── div.logo-bars
    │   │   │   │       ├── div.bar-black
    │   │   │   │       └── div.bar-red
    │   │   │   └── span.footer-logo-text
    │   │   └── p.footer-description
    │   │
    │   ├── div.footer-section
    │   │   ├── h4.footer-heading
    │   │   └── ul.footer-links
    │   │       ├── li → Link (Sobre Nosotros)
    │   │       └── li → Link (Nuestros Servicios)
    │   │
    │   └── div.footer-section
    │       ├── h4.footer-heading
    │       └── ul.footer-links
    │           ├── li → Link (Tecnología)
    │           ├── li → Link (Electrodomésticos)
    │           ├── li → Link (Muebles y Hogar)
    │           └── li → Link (Herramientas)
    │
    └── div.footer-bottom
        └── p.copyright


## Nodos 

- **h1.hero-title**: Título principal modificado dinámicamente
- **p.hero-subtitle**: Subtítulo modificado con textContent
- **div.hero-content**: Padre que contiene todos los elementos
- **div.botones**: Nuevo contenedor con botones de control
- **div#extra-info-section**: Nueva sección ocultable
- **button (Cambiar Título)**: Botón que ejecuta changeMainTitle()
- **button (Mostrar/Ocultar)**: Botón que ejecuta toggleExtraSection()

## Antes y Después

**ANTES (estructura original):**
```html
<section class="hero">
  <div class="hero-content">
    <h1 class="hero-title">Todo lo que necesitas, <br><span>en un solo lugar</span></h1>
    <p class="hero-subtitle">Descubre nuestra selección exclusiva de productos con envíos a todo el país.</p>
    <div class="search-container">...</div>
  </div>
</section>
```

**DESPUÉS (estructura modificada):**
```html
<section class="hero">
  <div class="hero-content">  <!-- MISMO PADRE -->
    <h1 class="hero-title" style="color: #2563eb;">Las mejores ofertas están aquí, <br><span>en un solo lugar</span></h1>  <!-- MODIFICADO: texto y color -->
    <p class="hero-subtitle">¡Nuevo título: Las mejores ofertas están aquí!</p>  <!-- MODIFICADO: texto con JS -->
    <div class="search-container">...</div>  <!-- IGUAL -->
    
    <!-- NUEVOS HIJOS AGREGADOS -->
    <div class="flex gap-4 mt-8">
      <button class="px-6 py-3 bg-blue-600 ...">  <!-- NUEVO: botón 1 -->
        <span>edit</span>
        Cambiar Título
      </button>
      <button class="px-6 py-3 bg-purple-600 ...">  <!-- NUEVO: botón 2 -->
        <span>visibility</span>
        Mostrar Sección Extra
      </button>
    </div>
    
    <div id="extra-info-section" class="hidden">  <!-- NUEVO: sección ocultable -->
      <h3>Información Adicional</h3>
      <p>Aprovecha nuestras ofertas especiales...</p>
      <div class="mt-4 flex gap-4">
        <span class="bg-red-600">-20%</span>
        <span class="bg-blue-600">Envío gratis</span>
        <span class="bg-green-600">Nuevo</span>
      </div>
    </div>
  </div>
</section>
```

**Resumen:** El padre (`hero-content`) es el mismo, se **agregaron dos nuevos hijos**: un contenedor con dos botones y una sección ocultable con ofertas. Además se **modificó el texto** de título y subtítulo usando useState y manipulación directa del DOM.
### En Resumen

1.  **DOM:** El árbol de objetos de la página.
2.  **Renderizado:** El proceso del navegador para convertir HTML en ese árbol y pintarlo.
3.  **Selectores:** Las herramientas de JavaScript para encontrar partes específicas de ese árbol.
4.  **Eventos:** Las acciones que ocurren en el navegador y a las que tu código puede reaccionar.


## Pruebas 
### Cambios para titulo 
**1- titulo original** 
![titulo original](image.png)

**2- Cambio para el titulo en azul** 
![titulo azul](image-1.png)

**3- Cambio para el titulo en naranja** 
![titulo naranja](image-2.png)

**4- Cambio para el titulo en morado** 
![titulo en morado](image-3.png)

**5- Cambio para el titulo en verde** 
![titulo en verde](image-4.png)

### Mostrar Contenido Extra
**1- mostrando el contenido extra**
![contenido extra](image-5.png)


### Agregar, eliminar cards

**1- Agregando Cards** 
![formulario](image-7.png)
![card agregada](image-8.png)

**2- Eliminando las cards**
![eliminando cards](image-6.png)
![card eliminada](image-9.png)

### Modo Claro Modo obscuro

**1- Modo Claro**
![modo claro](image-10.png)

**2- Modo obscuro**
![modo obscuro](image-11.png)

## Preguntas de Reflexión

### ¿Qué diferencia hay entre un sitio estático y uno dinámico desde la perspectiva del usuario?

Un sitio estático requiere recargar la página para mostrar cualquier cambio, lo que resulta en una experiencia entrecortada y lenta. Cada clic implica esperar a que el servidor responda con una nueva página completa.

Un sitio dinámico actualiza el contenido instantáneamente sin recargas visibles. El usuario puede cambiar el tema, filtrar productos o recibir notificaciones en tiempo real, disfrutando de una experiencia fluida similar a una aplicación de escritorio.

### ¿Cómo mejora la manipulación del DOM la experiencia del usuario?

La manipulación del DOM permite que la interfaz reaccione inmediatamente a las acciones del usuario. Los cambios de tema son instantáneos, los filtros muestran resultados mientras se escribe, y las notificaciones aparecen sin interrumpir la navegación. Todo esto crea una experiencia más ágil, intuitiva y satisfactoria.

### ¿Qué dificultades encontraste al manipular el DOM y cómo las superaste?

La principal dificultad fue lograr que todas las páginas respondieran consistentemente al cambio de tema, ya que cada una tenía sus propios estilos fijos. La solución fue crear un sistema centralizado con variables CSS y un contexto global para compartir el estado del tema.

Otro desafío fue identificar y reemplazar cientos de colores fijos en los componentes por variables dinámicas, un proceso minucioso pero necesario. También fue complicado lograr transiciones suaves entre modos, lo que se resolvió aplicando transiciones CSS globales.

La persistencia del tema entre sesiones se solucionó combinando localStorage con la detección de preferencias del sistema, asegurando una experiencia personalizada desde el primer momento.