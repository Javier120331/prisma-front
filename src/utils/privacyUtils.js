/**
 * Utility para trabajar con datos sensibles
 * Especialmente pensado para proteger información de menores de edad
 */

/**
 * Obtener iniciales del nombre y apellido
 * @param {string} fullName - Nombre completo (ej: "Juan López García")
 * @returns {string} - Iniciales (ej: "JL")
 */
export const getInitials = (fullName) => {
  if (!fullName) return 'U';
  
  const parts = fullName.trim().split(' ');
  
  if (parts.length >= 2) {
    // Tomar primer carácter del primer y segundo palabra
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  
  // Si solo hay una palabra, tomar dos primeros caracteres
  return fullName.substring(0, 2).toUpperCase();
};

/**
 * Generar color consistente basado en el nombre (hash simple)
 * @param {string} name - Nombre para generar color
 * @returns {string} - Color en formato hex
 */
export const getColorFromName = (name) => {
  const colors = [
    '#5c6236', // primary - verde
    '#6e5e00', // secondary - marrón
    '#00695c', // teal
    '#c2185b', // pink
    '#1976d2', // blue
    '#f57c00', // orange
    '#7b1fa2', // purple
    '#455a64', // blue-grey
  ];
  
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  const index = Math.abs(hash) % colors.length;
  return colors[index];
};

/**
 * Enmascarar nombre para visualización con privacidad
 * Muestra primera letra + asteriscos: "A***** P*****"
 * @param {string} fullName - Nombre completo
 * @returns {string} - Nombre enmascarado
 */
export const maskName = (fullName) => {
  if (!fullName) return 'P*****';
  
  const parts = fullName.trim().split(' ');
  
  return parts.map(part => {
    if (part.length <= 1) return part;
    return part[0] + '*'.repeat(part.length - 1);
  }).join(' ');
};

/**
 * Anonimizar nombre para visualización
 * Muestra: Nombre enmascarado (ej: "A***** P*****")
 * @param {string} fullName - Nombre completo
 * @param {string} nivel - Nivel educativo
 * @returns {object} - { initials, nivel, display, masked }
 */
export const anonymizeName = (fullName, nivel = 'No especificado') => {
  const initials = getInitials(fullName);
  const masked = maskName(fullName);
  
  return {
    initials,
    nivel,
    masked,
    display: masked,
    color: getColorFromName(fullName),
  };
};

/**
 * Crear avatar con iniciales
 * @param {string} name - Nombre completo
 * @returns {object} - { initials, color, style }
 */
export const createInitialAvatar = (name) => {
  const initials = getInitials(name);
  const color = getColorFromName(name);
  
  return {
    initials,
    color,
    style: {
      backgroundColor: color,
    },
  };
};
