import { useState } from 'react';

export const useHomeInteractions = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [heroTitle, setHeroTitle] = useState("Todo lo que necesitas,");
  const [showExtraInfo, setShowExtraInfo] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [sectionBgColor, setSectionBgColor] = useState("#ffffff");
  const [dynamicItems, setDynamicItems] = useState([
    { id: 1, text: "Producto de ejemplo 1", category: "Electrónica" },
    { id: 2, text: "Producto de ejemplo 2", category: "Moda" },
    { id: 3, text: "Producto de ejemplo 3", category: "Hogar" }
  ]);
  const [newItemText, setNewItemText] = useState("");
  const [newItemCategory, setNewItemCategory] = useState("General");

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = !isMenuOpen ? 'hidden' : 'unset';
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = 'unset';
  };

  const changeHeroTitle = () => {
    const titles = [
      "Todo lo que necesitas,",
      "Descubre las mejores ofertas,",
      "Encuentra tu estilo,",
      "Tecnología al alcance,",
      "Hogar inteligente,"
    ];
    setHeroTitle(titles[Math.floor(Math.random() * titles.length)]);
  };

  const toggleExtraInfo = () => setShowExtraInfo(!showExtraInfo);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.body.style.backgroundColor = !isDarkMode ? "#1a1a1a" : "#ffffff";
    document.body.style.color = !isDarkMode ? "#ffffff" : "#1a1a1a";
  };

  const changeSectionColor = (color: string) => setSectionBgColor(color);

  const addDynamicItem = () => {
    if (newItemText.trim() === "") {
      alert("Por favor, ingresa un nombre para el producto");
      return;
    }
    setDynamicItems([...dynamicItems, {
      id: Date.now(),
      text: newItemText,
      category: newItemCategory
    }]);
    setNewItemText("");
  };

  const removeDynamicItem = (id: number) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este producto?")) {
      setDynamicItems(dynamicItems.filter(item => item.id !== id));
    }
  };

  return {
    // Menu
    isMenuOpen,
    toggleMenu,
    closeMenu,
    
    // Hero
    heroTitle,
    showExtraInfo,
    changeHeroTitle,
    toggleExtraInfo,
    
    // Theme
    isDarkMode,
    sectionBgColor,
    toggleDarkMode,
    changeSectionColor,
    
    // Dynamic Items
    dynamicItems,
    newItemText,
    newItemCategory,
    setNewItemText,
    setNewItemCategory,
    addDynamicItem,
    removeDynamicItem
  };
};