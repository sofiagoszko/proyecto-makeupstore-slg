# Sofia's Makeup Store

E-commerce de maquillaje desarrollado con **React + Vite** como proyecto final del curso de React de **Codo a Codo**.

La tienda permite navegar productos por categoría, agregarlos a un carrito y, para el usuario administrador, gestionar el catálogo mediante un CRUD conectado a una API REST (MockAPI).

🔗 Demo: https://sofiasmakeupstore.netlify.app/

## Funcionalidades

- **Home** con carrusel, beneficios destacados y acceso rápido a las categorías.
- **Catálogo de productos** con filtro por categoría (Rostro, Ojos, Labios) y paginación.
- **Carrito de compras** persistido en `localStorage`: sumar/restar unidades, total y simulación de pago.
- **Login** simulado con validaciones (Formik + Yup). El carrito sólo está disponible para usuarios logueados.
- **Portal de administración** (sólo admin): alta, edición y baja de productos con validación de formularios y confirmaciones con SweetAlert2.
- **Formulario de contacto** con validaciones.
- Página **404** para rutas inexistentes.
- Diseño **responsive** con React Bootstrap.

## Tecnologías

- [React 19](https://react.dev/) + [Vite](https://vite.dev/)
- [React Router](https://reactrouter.com/) para la navegación
- [React Bootstrap](https://react-bootstrap.github.io/) / Bootstrap 5
- [Formik](https://formik.org/) + [Yup](https://github.com/jquense/yup) para formularios y validaciones
- [SweetAlert2](https://sweetalert2.github.io/) para alertas
- [Font Awesome](https://fontawesome.com/) para íconos
- [MockAPI](https://mockapi.io/) como backend de productos
- Context API (`CarritoContext`) y un hook propio (`usePagination`)

## Instalación y uso

Requisitos: Node.js 18 o superior.

```bash
# 1. Clonar el repositorio
git clone https://github.com/sofiagoszko/proyecto-makeupstore-slg.git
cd proyecto-makeupstore-slg

# 2. Instalar dependencias
npm install

# 3. Crear el archivo de variables de entorno
cp .env.example .env
```

Completar `.env` con la URL base de la API:

```env
VITE_BASE_URL=https://<tu-id>.mockapi.io/api/v1
```

La API debe exponer el recurso `/productos` con esta estructura:

```json
{
  "id": "1",
  "name": "Labial mate",
  "avatar": "https://url-de-la-imagen.jpg",
  "stock": 10,
  "categoria": "labios",
  "precio": 15000
}
```

`categoria` puede ser `rostro`, `ojos` o `labios`.

```bash
# 4. Levantar el entorno de desarrollo
npm run dev
```

### Scripts disponibles

| Comando           | Descripción                                 |
| ----------------- | ------------------------------------------- |
| `npm run dev`     | Servidor de desarrollo                      |
| `npm run build`   | Build de producción en `dist/`              |
| `npm run preview` | Sirve localmente el build de producción     |
| `npm run lint`    | Analiza el código con ESLint                |

## Usuarios de prueba

El login es **simulado** (no hay autenticación real, el estado se guarda en `localStorage`):

| Rol           | Usuario      | Contraseña   |
| ------------- | ------------ | ------------ |
| Administrador | `admin`      | `123`        |
| Cliente       | cualquier otro | cualquiera |

## Rutas

| Ruta                     | Página                                   |
| ------------------------ | ---------------------------------------- |
| `/`                      | Home                                     |
| `/productos`             | Todos los productos                      |
| `/productos/:categoria`  | Productos filtrados por categoría        |
| `/carrito`               | Carrito (requiere login)                 |
| `/login`                 | Inicio de sesión                         |
| `/admin`                 | Portal de administración (requiere admin)|
| `/contacto`              | Formulario de contacto                   |
| `*`                      | Página no encontrada                     |

## Estructura del proyecto

```
src/
├── assets/         # Imágenes (.webp)
├── components/     # Componentes reutilizables (Header, Navegation, Footer, CardProducto, Paginación, etc.)
├── context/        # CarritoContext: estado global del carrito
├── hooks/          # usePagination: hook de paginación
├── pages/          # Home, Productos, Carrito, Login, Admin, Contacto, NotFound
├── styles/         # Estilos globales y variables CSS
├── App.jsx         # Definición de rutas
└── main.jsx        # Punto de entrada
```

## Deploy

El proyecto incluye `public/_redirects` para que React Router funcione en **Netlify** al recargar cualquier ruta. Recordá configurar la variable `VITE_BASE_URL` en las variables de entorno del sitio.


