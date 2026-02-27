/**
 * reviewsManager.ts - Sistema de gestión dinámica de reseñas
 * 
 * Este módulo maneja toda la lógica para crear, mostrar y eliminar reseñas de productos
 * utilizando manipulación directa del DOM. Demuestra conceptos fundamentales como:
 * - Creación dinámica de elementos con createElement()
 * - Inserción en el DOM con appendChild() e insertAdjacentHTML()
 * - Eliminación de elementos con remove()
 * - Manejo de eventos en elementos dinámicos
 * - Persistencia de datos con localStorage
 * - Validaciones en tiempo real similares al sistema de registro
 */

// Definición de tipos para TypeScript - Interfaz que define la estructura de una reseña
export interface Review {
  id: string;              // Identificador único (timestamp + random)
  userName: string;        // Nombre del usuario que escribe la reseña
  productName: string;     // Nombre del producto reseñado
  productCategory: string; // Categoría del producto (para filtrar)
  rating: number;          // Calificación de 1 a 5 estrellas
  comment: string;         // Texto de la reseña
  date: string;            // Fecha en formato ISO (YYYY-MM-DD)
  likes: number;           // Número de "me gusta" (para interacción)
}

// Interfaz para el sistema de calificación con estrellas
interface RatingSystem {
  stars: NodeListOf<Element> | null;     // Colección de elementos estrella
  ratingInput: HTMLInputElement | null;   // Input oculto que guarda el valor
  currentRating: number;                   // Calificación actual seleccionada
}

// Interfaz para el estado de validación
interface ValidationState {
  isValid: boolean;
  message: string;
}

export class ReviewsManager {
  // Propiedades privadas de la clase
  private container: HTMLElement | null;           // Contenedor donde se muestran las reseñas
  private form: HTMLFormElement | null;             // Formulario para agregar nuevas reseñas
  private ratingSystem: RatingSystem;                // Sistema de calificación con estrellas
  private storageKey: string;                        // Clave para localStorage
  private isSubmitting: boolean;                      // Estado de envío del formulario
  private submitBtn: HTMLElement | null;              // Botón de envío
  private resetBtn: HTMLElement | null;               // Botón de reset
  private firstErrorField: string | null;              // Primer campo con error para scroll
  private validationTimeouts: Map<string, NodeJS.Timeout>; // Timeouts para validación debounce
  private characterCount: HTMLElement | null;          // Contador de caracteres del comentario

  /**
   * Constructor - Inicializa el gestor de reseñas
   * @param containerId - ID del elemento contenedor de reseñas
   * @param formId - ID del formulario de reseñas
   * @param storageKey - Clave para guardar en localStorage
   */
  constructor(containerId: string, formId: string, storageKey: string = 'tecommers-reviews') {
    // Obtener referencias a los elementos del DOM
    this.container = document.getElementById(containerId);
    this.form = document.getElementById(formId) as HTMLFormElement;
    this.storageKey = storageKey;
    
    // Inicializar propiedades de validación
    this.isSubmitting = false;
    this.firstErrorField = null;
    this.validationTimeouts = new Map();
    
    // Obtener botones
    this.submitBtn = document.getElementById('submitReviewBtn');
    this.resetBtn = document.getElementById('resetReviewBtn');
    this.characterCount = document.getElementById('character-count');
    
    // Inicializar el sistema de calificación
    this.ratingSystem = {
      stars: null,
      ratingInput: null,
      currentRating: 0
    };

    // Inicializar solo si encontramos el contenedor
    if (this.container) {
      this.init();
    } else {
      console.error(`No se encontró el contenedor con ID: ${containerId}`);
    }
  }

  /**
   * Inicialización principal
   * Configura todos los event listeners y carga las reseñas guardadas
   */
  private init(): void {
    console.log('🎯 Inicializando sistema de reseñas...');
    
    // Inicializar el sistema de calificación con estrellas
    this.initRatingSystem();
    
    // Configurar validaciones en tiempo real
    this.setupRealTimeValidation();
    
    // Configurar el evento de envío del formulario
    this.setupFormSubmit();
    
    // Configurar botón de reset
    this.setupResetButton();
    
    // Cargar reseñas existentes (desde localStorage o datos de ejemplo)
    this.loadReviews();
  }

  /**
   * Inicializa el sistema de calificación con estrellas
   * Busca los elementos de estrella y configura los eventos de clic
   */
  private initRatingSystem(): void {
    // Obtener todas las estrellas y el input oculto
    this.ratingSystem.stars = document.querySelectorAll('.rating-star');
    this.ratingSystem.ratingInput = document.getElementById('review-rating-value') as HTMLInputElement;
    
    console.log(`⭐ Sistema de estrellas inicializado: ${this.ratingSystem.stars?.length} estrellas encontradas`);

    // Si hay estrellas, configurar el evento clic para cada una
    if (this.ratingSystem.stars && this.ratingSystem.stars.length > 0) {
      this.ratingSystem.stars.forEach((star, index) => {
        star.addEventListener('click', (e) => {
          e.preventDefault();
          // Obtener la calificación del atributo data-rating
          const rating = parseInt((star as HTMLElement).dataset.rating || '0');
          
          // Actualizar la calificación actual
          this.ratingSystem.currentRating = rating;
          
          // Actualizar el input oculto
          if (this.ratingSystem.ratingInput) {
            this.ratingSystem.ratingInput.value = rating.toString();
          }
          
          console.log(`⭐ Calificación seleccionada: ${rating} estrellas`);
          
          // Actualizar visualmente las estrellas
          this.updateStarsVisual(rating);
          
          // Validar calificación en tiempo real
          this.validateField('rating');
        });
      });
    }
  }

  /**
   * Configura las validaciones en tiempo real para todos los campos
   * Similar al sistema de registro con debounce y validación al perder el foco
   */
  private setupRealTimeValidation(): void {
    if (!this.form) return;

    // Definir campos a validar con sus respectivos validadores
    const inputs = [
      { id: 'reviewer-name', validator: this.validateUserName.bind(this) },
      { id: 'review-product', validator: this.validateProductCategory.bind(this) },
      { id: 'review-product-name', validator: this.validateProductName.bind(this) },
      { id: 'review-comment', validator: this.validateComment.bind(this) }
    ];

    inputs.forEach(input => {
      const element = document.getElementById(input.id) as HTMLInputElement;
      if (!element) return;

      // Validación al perder el foco (blur)
      element.addEventListener('blur', () => {
        this.validateField(input.id);
      });

      // Validación en tiempo real con debounce (300ms)
      element.addEventListener('input', (e) => {
        // Limpiar timeout anterior
        const timeout = this.validationTimeouts.get(input.id);
        if (timeout) clearTimeout(timeout);

        // Crear nuevo timeout
        const newTimeout = setTimeout(() => {
          this.validateField(input.id);
        }, 300);

        this.validationTimeouts.set(input.id, newTimeout);
      });
    });

    // Validación especial para el comentario (contador de caracteres)
    const commentInput = document.getElementById('review-comment') as HTMLTextAreaElement;
    if (commentInput) {
      commentInput.addEventListener('input', () => {
        this.updateCharacterCount(commentInput.value.length);
      });
    }
  }

  /**
   * Actualiza el contador de caracteres del comentario
   * @param length - Longitud actual del comentario
   */
  private updateCharacterCount(length: number): void {
    if (this.characterCount) {
      this.characterCount.textContent = `${length}/500`;
      
      // Cambiar color si se acerca al límite
      if (length > 450) {
        this.characterCount.classList.add('text-orange-500');
        this.characterCount.classList.remove('text-gray-400');
      } else if (length > 480) {
        this.characterCount.classList.add('text-red-500');
        this.characterCount.classList.remove('text-orange-500');
      } else {
        this.characterCount.classList.remove('text-red-500', 'text-orange-500');
        this.characterCount.classList.add('text-gray-400');
      }
    }
  }

  /**
   * Actualiza la apariencia de las estrellas según la calificación
   * @param rating - Calificación seleccionada (1-5)
   */
  private updateStarsVisual(rating: number): void {
    if (!this.ratingSystem.stars) return;
    
    this.ratingSystem.stars.forEach((star, index) => {
      if (index < rating) {
        star.classList.add('text-yellow-400');
        star.classList.remove('text-gray-300');
      } else {
        star.classList.remove('text-yellow-400');
        star.classList.add('text-gray-300');
      }
    });
  }

  /**
   * Valida un campo específico del formulario
   * @param fieldId - ID del campo a validar
   * @returns true si el campo es válido, false en caso contrario
   */
  private validateField(fieldId: string): boolean {
    let isValid = true;
    
    switch(fieldId) {
      case 'reviewer-name':
        isValid = this.validateUserName();
        break;
      case 'review-product':
        isValid = this.validateProductCategory();
        break;
      case 'review-product-name':
        isValid = this.validateProductName();
        break;
      case 'review-comment':
        isValid = this.validateComment();
        break;
      case 'rating':
        isValid = this.validateRating();
        break;
    }
    
    return isValid;
  }

  /**
   * Valida el nombre del usuario
   * @returns true si es válido, false en caso contrario
   */
  private validateUserName(): boolean {
    const input = document.getElementById('reviewer-name') as HTMLInputElement;
    if (!input) return false;
    
    const value = input.value.trim();
    
    if (!value) {
      this.showError('reviewer-name', 'El nombre es obligatorio');
      input.classList.remove('valid');
      return false;
    }
    
    if (value.length < 2) {
      this.showError('reviewer-name', 'El nombre debe tener al menos 2 caracteres');
      input.classList.remove('valid');
      input.classList.add('invalid');
      return false;
    }
    
    if (value.length > 50) {
      this.showError('reviewer-name', 'El nombre debe tener máximo 50 caracteres');
      input.classList.remove('valid');
      return false;
    }
    
    if (/\d/.test(value)) {
      this.showError('reviewer-name', 'El nombre no puede contener números');
      input.classList.remove('valid');
      input.classList.add('invalid');
      return false;
    }
    
    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value)) {
      this.showError('reviewer-name', 'Solo se permiten letras y espacios');
      input.classList.remove('valid');
      return false;
    }
    
    if (value.trim() !== value) {
      this.showError('reviewer-name', 'No se permiten espacios al inicio o al final');
      input.classList.remove('valid');
      input.classList.add('invalid');
      return false;
    }
    
    this.hideError('reviewer-name');
    input.classList.remove('invalid');
    input.classList.add('valid');
    return true;
  }

  /**
   * Valida la categoría del producto
   * @returns true si es válida, false en caso contrario
   */
  private validateProductCategory(): boolean {
    const select = document.getElementById('review-product') as HTMLSelectElement;
    if (!select) return false;
    
    const value = select.value;
    
    if (!value) {
      this.showError('review-product', 'Debes seleccionar una categoría');
      select.classList.remove('valid');
      return false;
    }
    
    this.hideError('review-product');
    select.classList.remove('invalid');
    select.classList.add('valid');
    return true;
  }

  /**
   * Valida el nombre del producto
   * @returns true si es válido, false en caso contrario
   */
  private validateProductName(): boolean {
    const input = document.getElementById('review-product-name') as HTMLInputElement;
    if (!input) return false;
    
    const value = input.value.trim();
    
    if (!value) {
      this.showError('review-product-name', 'El nombre del producto es obligatorio');
      input.classList.remove('valid');
      return false;
    }
    
    if (value.length < 3) {
      this.showError('review-product-name', 'El nombre del producto debe tener al menos 3 caracteres');
      input.classList.remove('valid');
      input.classList.add('invalid');
      return false;
    }
    
    if (value.length > 100) {
      this.showError('review-product-name', 'El nombre del producto debe tener máximo 100 caracteres');
      input.classList.remove('valid');
      return false;
    }
    
    this.hideError('review-product-name');
    input.classList.remove('invalid');
    input.classList.add('valid');
    return true;
  }

  /**
   * Valida el comentario de la reseña
   * @returns true si es válido, false en caso contrario
   */
  private validateComment(): boolean {
    const input = document.getElementById('review-comment') as HTMLTextAreaElement;
    if (!input) return false;
    
    const value = input.value.trim();
    
    if (!value) {
      this.showError('review-comment', 'El comentario es obligatorio');
      input.classList.remove('valid');
      return false;
    }
    
    if (value.length < 10) {
      this.showError('review-comment', 'El comentario debe tener al menos 10 caracteres');
      input.classList.remove('valid');
      input.classList.add('invalid');
      return false;
    }
    
    if (value.length > 500) {
      this.showError('review-comment', 'El comentario debe tener máximo 500 caracteres');
      input.classList.remove('valid');
      return false;
    }
    
    this.hideError('review-comment');
    input.classList.remove('invalid');
    input.classList.add('valid');
    return true;
  }

  /**
   * Valida la calificación con estrellas
   * @returns true si es válida, false en caso contrario
   */
  private validateRating(): boolean {
    if (this.ratingSystem.currentRating === 0) {
      this.showError('rating', 'Debes seleccionar una calificación');
      return false;
    }
    
    this.hideError('rating');
    return true;
  }

  /**
   * Muestra un mensaje de error para un campo
   * @param fieldId - ID del campo con error
   * @param message - Mensaje de error a mostrar
   */
  private showError(fieldId: string, message: string): void {
    const errorElement = document.getElementById(`error-${fieldId}`);
    const inputElement = document.getElementById(fieldId) as HTMLInputElement;
    
    if (errorElement) {
      errorElement.innerHTML = `
        <span class="material-symbols-outlined text-sm">error</span>
        ${message}
      `;
      errorElement.classList.remove('hidden');
      errorElement.classList.add('flex');
      
      if (inputElement) {
        inputElement.classList.add('invalid');
        inputElement.classList.remove('valid');
      }
      
      // Disparar evento para actualizar UI
      window.dispatchEvent(new CustomEvent('reviewValidationChanged'));
    }
  }

  /**
   * Oculta el mensaje de error de un campo
   * @param fieldId - ID del campo
   */
  private hideError(fieldId: string): void {
    const errorElement = document.getElementById(`error-${fieldId}`);
    const inputElement = document.getElementById(fieldId) as HTMLInputElement;
    
    if (errorElement) {
      errorElement.classList.add('hidden');
      errorElement.classList.remove('flex');
      
      if (inputElement) {
        inputElement.classList.remove('invalid');
      }
      
      // Disparar evento para actualizar UI
      window.dispatchEvent(new CustomEvent('reviewValidationChanged'));
    }
  }

  /**
   * Verifica si un campo tiene error
   * @param fieldId - ID del campo
   * @returns true si tiene error, false en caso contrario
   */
  private hasError(fieldId: string): boolean {
    const errorElement = document.getElementById(`error-${fieldId}`);
    return errorElement ? !errorElement.classList.contains('hidden') : false;
  }

  /**
   * Configura el botón de reset del formulario
   */
  private setupResetButton(): void {
    this.resetBtn?.addEventListener('click', () => {
      this.resetForm();
    });
  }

  /**
   * Resetea el formulario a su estado inicial
   */
  private resetForm(): void {
    if (this.form) {
      this.form.reset();
    }
    
    // Resetear calificación
    this.ratingSystem.currentRating = 0;
    if (this.ratingSystem.ratingInput) {
      this.ratingSystem.ratingInput.value = '0';
    }
    
    // Resetear estrellas
    if (this.ratingSystem.stars) {
      this.ratingSystem.stars.forEach(star => {
        star.classList.remove('text-yellow-400');
        star.classList.add('text-gray-300');
      });
    }
    
    // Ocultar todos los errores
    document.querySelectorAll('.error-message').forEach(el => {
      el.classList.add('hidden');
      el.classList.remove('flex');
    });
    
    // Remover clases de validación
    document.querySelectorAll('.invalid, .valid').forEach(el => {
      el.classList.remove('invalid');
      el.classList.remove('valid');
    });
    
    // Resetear contador de caracteres
    if (this.characterCount) {
      this.characterCount.textContent = '0/500';
      this.characterCount.classList.remove('text-red-500', 'text-orange-500');
      this.characterCount.classList.add('text-gray-400');
    }
    
    this.firstErrorField = null;
    
    console.log('🔄 Formulario reseteado');
  }

  /**
   * Carga las reseñas desde localStorage o usa datos de ejemplo
   */
  private loadReviews(): void {
    // Intentar obtener reseñas guardadas
    const savedReviews = localStorage.getItem(this.storageKey);
    
    if (savedReviews) {
      // Si hay reseñas guardadas, parsearlas y mostrarlas
      console.log('📦 Cargando reseñas desde localStorage...');
      const reviews: Review[] = JSON.parse(savedReviews);
      this.renderReviews(reviews);
    } else {
      // Si no hay reseñas guardadas, crear datos de ejemplo
      console.log('📝 No hay reseñas guardadas. Creando datos de ejemplo...');
      const exampleReviews = this.createExampleReviews();
      this.renderReviews(exampleReviews);
      // Guardar las reseñas de ejemplo
      localStorage.setItem(this.storageKey, JSON.stringify(exampleReviews));
    }
  }

  /**
   * Crea reseñas de ejemplo para demostración
   * @returns Array de reseñas de ejemplo
   */
  private createExampleReviews(): Review[] {
    return [
      {
        id: this.generateId('review-'),
        userName: 'Laura Sánchez',
        productName: 'Refrigerador LG Side by Side',
        productCategory: 'Electrodomésticos',
        rating: 5,
        comment: 'Excelente refrigerador, muy silencioso y con mucha capacidad. La entrega fue rápida y el instalador muy profesional. El sistema de dispensador de agua es muy práctico.',
        date: '2024-02-15',
        likes: 12
      },
      {
        id: this.generateId('review-'),
        userName: 'Roberto Méndez',
        productName: 'iPhone 17 Pro Max',
        productCategory: 'Tecnología',
        rating: 4,
        comment: 'El teléfono es increíble, la cámara es espectacular y el rendimiento es excelente. Solo le pongo 4 estrellas porque la batería podría durar un poco más con uso intensivo.',
        date: '2024-02-10',
        likes: 8
      },
      {
        id: this.generateId('review-'),
        userName: 'Carmen Ruiz',
        productName: 'Taladro Percutor Bosch',
        productCategory: 'Herramientas',
        rating: 5,
        comment: 'Herramienta profesional de primera calidad. La uso para trabajos de construcción y nunca me ha fallado. La potencia es impresionante y el diseño ergonómico ayuda mucho.',
        date: '2024-02-05',
        likes: 15
      }
    ];
  }

  /**
   * Genera un ID único para cada reseña
   * @param prefix - Prefijo para el ID
   * @returns String único con timestamp y número aleatorio
   */
  private generateId(prefix: string = ''): string {
    // Usar timestamp + número aleatorio para garantizar unicidad
    return `${prefix}${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Renderiza un array de reseñas en el contenedor
   * @param reviews - Array de reseñas a mostrar
   */
  private renderReviews(reviews: Review[]): void {
    if (!this.container) return;
    
    console.log(`🎨 Renderizando ${reviews.length} reseñas...`);
    
    // Limpiar el contenedor (eliminar reseñas anteriores)
    this.container.innerHTML = '';
    
    // Crear y agregar cada reseña al contenedor
    reviews.forEach(review => {
      const reviewElement = this.createReviewElement(review);
      this.container?.appendChild(reviewElement);
    });
  }

  /**
   * Crea un elemento HTML para una reseña individual
   * DEMOSTRACIÓN DE CREACIÓN DINÁMICA DE ELEMENTOS
   * 
   * @param review - Datos de la reseña
   * @returns Elemento div con la estructura completa de la reseña
   */
  private createReviewElement(review: Review): HTMLDivElement {
    // 1. Crear el contenedor principal
    const card = document.createElement('div');
    card.className = 'review-card bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 relative';
    card.dataset.reviewId = review.id; // Guardar ID como data-atributo

    // 2. Crear el encabezado (nombre y fecha)
    const header = document.createElement('div');
    header.className = 'flex justify-between items-start mb-4';
    
    // 2.1 Nombre del usuario
    const nameDiv = document.createElement('div');
    nameDiv.className = 'flex items-center gap-2';
    
    const avatarIcon = document.createElement('span');
    avatarIcon.className = 'material-symbols-outlined text-[#ec1313] text-xl';
    avatarIcon.textContent = 'account_circle';
    
    const nameSpan = document.createElement('span');
    nameSpan.className = 'font-bold text-[#1a1a1a] text-lg';
    nameSpan.textContent = review.userName;
    
    nameDiv.appendChild(avatarIcon);
    nameDiv.appendChild(nameSpan);
    
    // 2.2 Fecha formateada
    const dateSpan = document.createElement('span');
    dateSpan.className = 'text-xs text-gray-400 bg-gray-50 px-3 py-1 rounded-full';
    // Formatear fecha: DD de MES, YYYY
    const date = new Date(review.date);
    dateSpan.textContent = date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    header.appendChild(nameDiv);
    header.appendChild(dateSpan);

    // 3. Categoría del producto
    const categoryDiv = document.createElement('div');
    categoryDiv.className = 'inline-block bg-[#fee] text-[#ec1313] text-xs font-bold px-3 py-1 rounded-full mb-3';
    categoryDiv.textContent = review.productCategory;

    // 4. Nombre del producto
    const productDiv = document.createElement('div');
    productDiv.className = 'text-sm text-gray-700 font-medium mb-2';
    productDiv.innerHTML = `<span class="text-gray-500">Producto:</span> ${review.productName}`;

    // 5. Calificación con estrellas
    const ratingDiv = document.createElement('div');
    ratingDiv.className = 'flex gap-1 mb-3';
    for (let i = 1; i <= 5; i++) {
      const star = document.createElement('span');
      star.className = i <= review.rating ? 'text-yellow-400 text-xl' : 'text-gray-300 text-xl';
      star.textContent = '★';
      ratingDiv.appendChild(star);
    }

    // 6. Comentario
    const commentDiv = document.createElement('p');
    commentDiv.className = 'text-gray-600 text-sm leading-relaxed mb-4 border-l-2 border-[#ec1313] pl-4';
    commentDiv.textContent = review.comment;

    // 7. Barra de acciones (likes y eliminar)
    const actionsDiv = document.createElement('div');
    actionsDiv.className = 'flex items-center justify-between mt-4 pt-4 border-t border-gray-100';

    // 7.1 Botón de "Me gusta"
    const likeBtn = document.createElement('button');
    likeBtn.className = 'like-button flex items-center gap-2 text-gray-500 hover:text-[#ec1313] transition-colors group';
    likeBtn.setAttribute('data-review-id', review.id);
    
    const likeIcon = document.createElement('span');
    likeIcon.className = 'material-symbols-outlined text-xl group-hover:scale-110 transition-transform';
    likeIcon.textContent = 'favorite';
    
    const likeCount = document.createElement('span');
    likeCount.className = 'text-sm font-medium';
    likeCount.textContent = review.likes.toString();
    
    likeBtn.appendChild(likeIcon);
    likeBtn.appendChild(likeCount);
    
    // 7.2 Botón de eliminar (DEMOSTRACIÓN DE ELIMINACIÓN DINÁMICA)
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn flex items-center gap-2 text-gray-400 hover:text-[#ec1313] transition-colors';
    deleteBtn.setAttribute('data-review-id', review.id);
    
    const deleteIcon = document.createElement('span');
    deleteIcon.className = 'material-symbols-outlined text-xl';
    deleteIcon.textContent = 'delete';
    
    const deleteText = document.createElement('span');
    deleteText.className = 'text-sm';
    deleteText.textContent = 'Eliminar';
    
    deleteBtn.appendChild(deleteIcon);
    deleteBtn.appendChild(deleteText);

    // Agregar acciones al contenedor
    actionsDiv.appendChild(likeBtn);
    actionsDiv.appendChild(deleteBtn);

    // 8. Ensamblar todos los elementos en la tarjeta
    card.appendChild(header);
    card.appendChild(categoryDiv);
    card.appendChild(productDiv);
    card.appendChild(ratingDiv);
    card.appendChild(commentDiv);
    card.appendChild(actionsDiv);

    // 9. Configurar el evento de eliminación
    deleteBtn.addEventListener('click', (e) => {
      e.preventDefault();
      this.handleDeleteReview(review.id, card);
    });

    return card;
  }

  /**
   * Maneja la eliminación de una reseña
   * DEMOSTRACIÓN DE ELIMINACIÓN DINÁMICA CON CONFIRMACIÓN ESTILIZADA
   * 
   * @param reviewId - ID de la reseña a eliminar
   * @param element - Elemento DOM a eliminar
   */
  private handleDeleteReview(reviewId: string, element: HTMLElement): void {
    console.log(`🗑️ Intentando eliminar reseña con ID: ${reviewId}`);
    
    // Disparar evento para mostrar modal de confirmación en React
    const confirmEvent = new CustomEvent('showDeleteConfirmation', { 
      detail: { 
        reviewId, 
        element,
        message: '¿Estás seguro de que deseas eliminar esta reseña?'
      } 
    });
    window.dispatchEvent(confirmEvent);
  }

  /**
   * Elimina la reseña después de la confirmación
   * @param reviewId - ID de la reseña a eliminar
   * @param element - Elemento DOM a eliminar
   */
  public confirmDeleteReview(reviewId: string, element: HTMLElement): void {
    console.log(`🗑️ Eliminando reseña con ID: ${reviewId}`);
    
    // 1. Animación de salida (opcional, mejora la experiencia)
    element.style.transition = 'all 0.3s ease';
    element.style.opacity = '0';
    element.style.transform = 'translateX(20px)';
    
    // 2. Esperar a que termine la animación antes de eliminar
    setTimeout(() => {
      // 3. Eliminar del DOM
      element.remove();
      console.log(`✅ Reseña eliminada del DOM`);
      
      // 4. Actualizar localStorage
      this.updateLocalStorageAfterDelete(reviewId);
      
      // 5. Mostrar mensaje de éxito
      const successEvent = new CustomEvent('reviewDeleted', { 
        detail: { message: 'La reseña ha sido eliminada correctamente' } 
      });
      window.dispatchEvent(successEvent);
      
    }, 300);
  }

  /**
   * Actualiza el localStorage después de eliminar una reseña
   * @param reviewId - ID de la reseña eliminada
   */
  private updateLocalStorageAfterDelete(reviewId: string): void {
    // Obtener reseñas actuales
    const savedReviews = localStorage.getItem(this.storageKey);
    if (savedReviews) {
      const reviews: Review[] = JSON.parse(savedReviews);
      // Filtrar la reseña eliminada
      const updatedReviews = reviews.filter(r => r.id !== reviewId);
      // Guardar de nuevo
      localStorage.setItem(this.storageKey, JSON.stringify(updatedReviews));
      console.log(`💾 localStorage actualizado. Quedan ${updatedReviews.length} reseñas`);
    }
  }

  /**
   * Configura el evento de envío del formulario
   */
  private setupFormSubmit(): void {
    if (!this.form) return;

    this.form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      if (this.isSubmitting) return;
      
      console.log('📝 Formulario de reseña enviado');
      
      this.firstErrorField = null;
      
      // Validar todos los campos antes de enviar
      if (!this.validateForm()) {
        this.scrollToFirstError();
        return;
      }
      
      this.isSubmitting = true;
      
      // Actualizar UI del botón de envío
      if (this.submitBtn) {
        (this.submitBtn as HTMLButtonElement).disabled = true;
        this.submitBtn.innerHTML = `
          <span class="material-symbols-outlined btn-icon animate-spin">sync</span>
          Enviando...
        `;
      }
      
      // Obtener valores del formulario
      const nameInput = document.getElementById('reviewer-name') as HTMLInputElement;
      const productSelect = document.getElementById('review-product') as HTMLSelectElement;
      const productNameInput = document.getElementById('review-product-name') as HTMLInputElement;
      const commentTextarea = document.getElementById('review-comment') as HTMLTextAreaElement;

      // Crear nueva reseña
      const newReview: Review = {
        id: this.generateId('review-'),
        userName: nameInput.value.trim(),
        productName: productNameInput.value.trim(),
        productCategory: productSelect.value,
        rating: this.ratingSystem.currentRating,
        comment: commentTextarea.value.trim(),
        date: new Date().toISOString().split('T')[0], // Fecha actual en formato YYYY-MM-DD
        likes: 0 // Inicia con 0 likes
      };

      console.log('✨ Nueva reseña creada:', newReview);

      // Simular envío (como en el sistema de registro)
      await this.simulateSubmit();

      // Agregar al DOM
      if (this.container) {
        const reviewElement = this.createReviewElement(newReview);
        // Insertar al principio para mostrar las más recientes primero
        this.container.insertBefore(reviewElement, this.container.firstChild);
      }

      // Guardar en localStorage
      this.saveReviewToStorage(newReview);

      // Mostrar mensaje de éxito (SIN ALERT)
      this.showSuccessMessage();

      // Limpiar formulario
      this.resetForm();
      
      // Resetear estado de envío
      this.resetSubmitState();
    });
  }

  /**
   * Valida todos los campos del formulario
   * @returns true si todos los campos son válidos, false en caso contrario
   */
  private validateForm(): boolean {
    let isValid = true;
    
    // Orden de validación (para scroll al primer error)
    const fieldOrder = ['reviewer-name', 'review-product', 'review-product-name', 'review-comment', 'rating'];
    
    for (const fieldId of fieldOrder) {
      const fieldValid = this.validateField(fieldId);
      
      if (!fieldValid) {
        isValid = false;
        
        if (!this.firstErrorField) {
          this.firstErrorField = fieldId;
        }
      }
    }
    
    return isValid;
  }

  /**
   * Hace scroll al primer campo con error
   */
  private scrollToFirstError(): void {
    if (this.firstErrorField) {
      const errorField = document.getElementById(this.firstErrorField);
      if (errorField) {
        errorField.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        });
        errorField.focus();
      }
    }
  }

  /**
   * Simula el envío del formulario (como en el sistema de registro)
   */
  private simulateSubmit(): Promise<void> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, 1500);
    });
  }

  /**
   * Muestra mensaje de éxito después del envío
   */
  private showSuccessMessage(): void {
    // Disparar evento para mostrar modal en React
    const event = new CustomEvent('reviewSuccess', { 
      detail: { message: '¡Gracias por compartir tu opinión!' } 
    });
    window.dispatchEvent(event);
  }

  /**
   * Resetea el estado de envío del formulario
   */
  private resetSubmitState(): void {
    this.isSubmitting = false;
    
    if (this.submitBtn) {
      (this.submitBtn as HTMLButtonElement).disabled = false;
      this.submitBtn.innerHTML = `
        <span class="material-symbols-outlined btn-icon">rate_review</span>
        Publicar reseña
      `;
    }
  }

  /**
   * Guarda una nueva reseña en localStorage
   * @param review - Reseña a guardar
   */
  private saveReviewToStorage(review: Review): void {
    const savedReviews = localStorage.getItem(this.storageKey);
    let reviews: Review[] = savedReviews ? JSON.parse(savedReviews) : [];
    
    // Agregar nueva reseña al principio
    reviews.unshift(review);
    
    // Guardar
    localStorage.setItem(this.storageKey, JSON.stringify(reviews));
    console.log(`💾 Reseña guardada en localStorage. Total: ${reviews.length}`);
  }
}

// Declaración de tipos para window
declare global {
  interface Window {
    reviewsManager: ReviewsManager;
  }
}

export default ReviewsManager;