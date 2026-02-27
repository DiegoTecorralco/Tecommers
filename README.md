# Tecommers
Aquí está la aplicacion de web-info-design pero ya ordenada y migrada de HTML y CSS puro a React
#  Tecommers - De HTML/CSS a React

<div align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React"/>
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite"/>
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3"/>
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript"/>
  <br/>
  <img src="https://img.shields.io/badge/Estado-En%20desarrollo-yellow?style=for-the-badge" alt="Estado del proyecto"/>
  <img src="https://img.shields.io/badge/Versión-1.0.0-blue?style=for-the-badge" alt="Versión"/>
</div>

## 📋 Tabla de Contenidos
- [¿Qué es Tecommers?](#-qué-es-tecommers)
- [Lo que hemos logrado](#-lo-que-hemos-logrado)
- [Tecnologías que usamos](#-tecnologías-que-usamos)
- [Estructura del proyecto](#-estructura-del-proyecto)
- [Componentes creados](#-componentes-que-hemos-construido)
- [Cómo correr el proyecto](#-cómo-correr-el-proyecto)
- [Lo que viene después](#-lo-que-viene-después)
- [Cómo contribuir](#-cómo-contribuir)

---

## 🤔 ¿Qué es Tecommers?

**Tecommers** nació como un proyecto llamado "web-info-design" hecho con HTML y CSS puro. Pero como todo en la web, decidimos evolucionarlo y traerlo al presente migrándolo completamente a **React**.

Imagínate esto: teníamos un montón de archivos HTML, hojas de estilo CSS enormes y todo estaba revuelto. Era difícil de mantener y actualizar. Ahora, con React, hemos organizado todo en componentes pequeños, reutilizables y fáciles de entender.

### ¿Por qué React?
- **Componentes**: Cada parte de la página es un componente independiente
- **Reutilizable**: El mismo código sirve en múltiples lugares
- **Mantenible**: Es más fácil encontrar y arreglar cosas
- **Moderno**: Estamos usando las mejores prácticas del 2024

---

## Lo que hemos logrado

### Migración completa de HTML/CSS a React
Tomamos todo el código antiguo y lo transformamos a componentes de React. Ya no hay archivos HTML enormes, ahora todo está organizado en piezas pequeñas y lógicas.

### Componentización de la interfaz
Dividimos la interfaz en componentes como:
- **Header.jsx**: El menú de navegación que se repite en todas las páginas
- **Hero.jsx**: La sección principal de bienvenida
- **Footer.jsx**: El pie de página con toda la información de contacto
- **Cards.jsx**: Componente reutilizable para mostrar productos/servicios
- Y muchos más...

### Sistema de rutas implementado
Ahora la navegación entre páginas es suave y rápida. Usamos React Router para que cambiar de página no recargue todo el sitio, solo lo que necesita cambiar.

### Diseño responsive en todos los componentes 
Cada componente se ve bien en:
- 📱 Teléfonos móviles
- 📟 Tablets
- 💻 Laptops
- 🖥️ Pantallas grandes

### Código legacy ordenado y documentado 
Todo el código está comentado y organizado. Si alguien nuevo llega al proyecto, puede entender rápidamente qué hace cada cosa.

### Performance optimizada con Vite 
Usamos Vite como herramienta de build, lo que significa:
- ⚡ El servidor de desarrollo inicia en milisegundos
- 🔥 Los cambios se ven al instante (Hot Module Replacement)
- 📦 El build de producción es súper optimizado

---

## 💻 Tecnologías que usamos

### React 18
Es el corazón de nuestra aplicación. Con React creamos componentes reutilizables que manejan su propio estado y lógica. Usamos:
- **Hooks** como useState y useEffect para manejar la lógica
- **Props** para pasar información entre componentes
- **Componentes funcionales** (más modernos y fáciles de entender)

### Vite
Nuestro constructor y servidor de desarrollo. ¿Por qué Vite?
- Es extremadamente rápido
- Configuración mínima necesaria
- Optimizaciones automáticas para producción

### CSS3 Puro
Decidimos no usar frameworks de CSS para mantener el control total. Pero eso no significa que sea CSS aburrido:
- **Flexbox y Grid** para layouts modernos
- **Variables CSS** para temas consistentes
- **Media queries** para responsive design
- **Animaciones** suaves y profesionales

### JavaScript Moderno
Usamos las características más nuevas de JavaScript:
- **Arrow functions**
- **Destructuring**
- **Template literals**
- **Spread operator**
- **Modules (import/export)**
