/**
 * Dev/Mock Auth Service
 * Servicio de autenticación para desarrollo sin backend
 * SOLO USAR EN DESARROLLO - REMOVER ANTES DE PRODUCCIÓN
 */

const DEMO_USERS = [
  {
    id: '1',
    email: 'docente@prisma.cl',
    password: 'demo123',
    nombre: 'Docente Demo',
    rut: '12.345.678-9',
    institucion: 'Colegio P.R.I.S.M.A.',
    especialidad: 'Educación Especial',
  },
  {
    id: '2',
    email: 'profesor@escuela.cl',
    password: 'demo123',
    nombre: 'Carlos Profesor',
    rut: '15.678.901-2',
    institucion: 'Instituto Educativo',
    especialidad: 'Matemáticas',
  },
];

/**
 * Mock login - Aceptar cualquier email/password o credenciales de prueba
 */
const mockLogin = async (email, password) => {
  // Simular delay de red
  await new Promise(resolve => setTimeout(resolve, 800));

  // Buscar usuario en lista de prueba
  const user = DEMO_USERS.find(u => u.email === email && u.password === password);

  if (user) {
    // Credenciales correctas
    return {
      user: {
        id: user.id,
        email: user.email,
        nombre: user.nombre,
        rut: user.rut,
        institucion: user.institucion,
        especialidad: user.especialidad,
      },
      tokens: {
        access_token: `mock_jwt_${Date.now()}`,
        refresh_token: `mock_refresh_${Date.now()}`,
      },
    };
  } else if (email && password && password.length >= 6) {
    // Cualquier combinación válida (email no vacío, password >= 6 caracteres)
    // Crear usuario dinámico
    return {
      user: {
        id: Math.random().toString(36).substr(2, 9),
        email: email,
        nombre: email.split('@')[0].toUpperCase(),
        rut: '00.000.000-0',
        institucion: 'Mi Institución',
        especialidad: 'No especificada',
      },
      tokens: {
        access_token: `mock_jwt_${Date.now()}`,
        refresh_token: `mock_refresh_${Date.now()}`,
      },
    };
  } else {
    throw new Error('Correo o contraseña inválidos. Intenta con demo@prisma.cl / demo123');
  }
};

/**
 * Mock register
 */
const mockRegister = async (email, password, nombre, rut) => {
  await new Promise(resolve => setTimeout(resolve, 800));

  if (!email || !password || password.length < 6 || !nombre) {
    throw new Error('Todos los campos son requeridos. La contraseña debe tener mínimo 6 caracteres');
  }

  return {
    user: {
      id: Math.random().toString(36).substr(2, 9),
      email,
      nombre,
      rut: rut || '00.000.000-0',
      institucion: 'Nueva Institución',
      especialidad: 'No especificada',
    },
    tokens: {
      access_token: `mock_jwt_${Date.now()}`,
      refresh_token: `mock_refresh_${Date.now()}`,
    },
  };
};

export default {
  mockLogin,
  mockRegister,
  DEMO_USERS,
};
