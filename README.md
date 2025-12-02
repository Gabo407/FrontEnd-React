# DataFixComp - Aplicación Full Stack

Sistema de catálogo de productos con autenticación JWT, React frontend, y microservicios Spring Boot.

## 🚀 Inicio Rápido

### Desarrollo Local (sin Docker)

#### Requisitos
- Node.js 18+
- Java 17+
- MySQL 8.0
- Maven 3.8+

#### Backend - Microservicio Usuarios (Puerto 8081)

```bash
cd microservicioUsuario
mvn clean spring-boot:run
```

#### Backend - Microservicio Productos (Puerto 8082)

```bash
cd microservicioProducto
mvn clean spring-boot:run
```

#### Frontend (Puerto 5173)

```bash
npm install
npm run dev
```

Accede a http://localhost:5173

### Producción en EC2 (con Docker)

#### 1. Compilar y Empaquetar

```powershell
# Desde Windows
.\build-for-ec2.ps1
```

#### 2. Enviar a EC2

```powershell
# Desde Windows
.\ec2-deployment\send-to-ec2.ps1 -EC2_IP 35.173.153.224 -KeyFile "C:\ruta\a\tu\clave.pem"
```

#### 3. O Despliegue Manual

```bash
# En EC2
cd /opt/datafixcomp
docker compose up -d --build

# Verificar
docker compose ps
docker compose logs -f
```

## 📋 Estructura del Proyecto

```
datafixcomp/
├── microservicioUsuario/              # API Usuarios (JWT, Autenticación)
│   ├── src/main/java/
│   ├── src/main/resources/
│   ├── pom.xml
│   ├── dockerfile
│   └── docker-compose.yml
│
├── microservicioProducto/             # API Productos (Catálogo)
│   ├── src/main/java/
│   ├── src/main/resources/
│   ├── pom.xml
│   ├── dockerfile
│   └── docker-compose.yml
│
├── src/                               # React Frontend (Vite)
│   ├── components/
│   ├── pages/
│   ├── context/
│   ├── services/
│   └── utils/
│
├── docker-compose.yml                 # Orquestación completa
├── .env.production                    # Variables de entorno producción
├── vite.config.js                     # Configuración Vite
├── package.json
├── build-for-ec2.ps1                  # Script de compilación
└── DEPLOYMENT_GUIDE.md                # Guía detallada de despliegue
```

## 🔧 Configuración

### Variables de Entorno

#### Frontend (`.env.production`)
```env
VITE_USUARIO_API=http://35.173.153.224:8081/api/v1/usuarios
VITE_PRODUCTO_API=http://35.173.153.224:8082/api/v1/productos
```

Para HTTPS (después de configurar ALB/CloudFront):
```env
VITE_USUARIO_API=https://api.yourdomain.com/api/v1/usuarios
VITE_PRODUCTO_API=https://api.yourdomain.com/api/v1/productos
```

#### Backend (`application.properties`)

**microservicioUsuario/src/main/resources/application.properties**
```properties
spring.datasource.url=jdbc:mysql://107.22.93.84:3306/datafixcomp_usuarios
spring.datasource.username=admin
spring.datasource.password=adminpass
server.port=8081
```

**microservicioProducto/src/main/resources/application.properties**
```properties
spring.datasource.url=jdbc:mysql://107.22.93.84:3306/datafixcomp_productos
spring.datasource.username=admin
spring.datasource.password=adminpass
server.port=8082
```

## 🛠️ Endpoints API

### Usuarios (`/api/v1/usuarios`)
- `POST /registro` - Registrar nuevo usuario
- `POST /login` - Iniciar sesión (retorna HttpOnly cookie)
- `POST /logout` - Cerrar sesión
- `GET /me` - Obtener usuario autenticado
- `GET /{id}` - Obtener usuario por ID
- `PUT /{id}` - Actualizar usuario
- `DELETE /{id}` - Eliminar usuario

### Productos (`/api/v1/productos`)
- `GET /activos` - Listar productos activos
- `GET /activos/categoria/{categoria}` - Productos por categoría (RAM, SSD, GPU)
- `GET /{id}` - Obtener producto por ID
- `POST` - Crear producto (admin)
- `PUT /{id}` - Actualizar producto (admin)
- `DELETE /{id}` - Eliminar producto (admin)

## 🔐 Autenticación

- **JWT Token**: Generado por el backend en `/api/v1/usuarios/login`
- **HttpOnly Cookie**: Almacenado automáticamente en navegador (`authToken`)
- **CORS**: Configurado para permitir credenciales y cookies
- **SameSite**: `None; Secure` en producción (requiere HTTPS)

## 🐳 Docker Compose

Servicio completo con MySQL, Usuarios, Productos y networking:

```bash
# Iniciar
docker compose up -d

# Ver logs
docker compose logs -f usuarios_service
docker compose logs -f productos_service

# Parar
docker compose down
```

## 📊 Base de Datos

### Usuarios (`datafixcomp_usuarios`)
- **Tabla**: `usuarios`
  - `id_usuario` (PK)
  - `email` (UNIQUE)
  - `nombre`, `apellido`
  - `rol` (CLIENTE, ADMIN)
  - `estado` (activo/inactivo)

### Productos (`datafixcomp_productos`)
- **Tabla**: `productos`
  - `id_producto` (PK)
  - `codigo` (UNIQUE)
  - `nombre`, `descripcion_corta`, `descripcion_larga`
  - `precio`, `stock`
  - `categoria` (RAM, SSD, GPU)
  - `imagen` (URL)
  - `estado` (activo/inactivo)

## 🧪 Testing

### Verificar Backend
```bash
# Usuarios
curl http://localhost:8081/api/v1/usuarios

# Productos
curl http://localhost:8082/api/v1/productos/activos

# Productos por categoría
curl http://localhost:8082/api/v1/productos/activos/categoria/ram
```

### Verificar CORS
```bash
curl -H "Origin: http://localhost:5173" \
     -H "Access-Control-Request-Method: POST" \
     -v http://localhost:8081/api/v1/usuarios/login
```

## 🚨 Troubleshooting

### Error: "Connection refused"
- Verificar que MySQL esté corriendo
- Verificar ports en use: `netstat -ano | findstr ":8081"`
- Revisar `application.properties` URLs

### Error: "CORS policy"
- Verificar que frontend origin esté en `allowedOriginPatterns`
- Confirmar `allowCredentials(true)` está activo
- Headers correctos: `Access-Control-Allow-Credentials: true`

### Error: "SameSite cookie rejected"
- Requiere HTTPS en producción
- Para dev: usar HTTP o configurar `SameSite=Lax`
- Verificar `APP_COOKIE_SECURE` environment variable

### Base de datos vacía
- Revisar `DataInitializer.java` se ejecutó al iniciar
- O cargar SQL: `mysql -u admin -p < schema.sql`

## 📦 Build & Deployment

### Build Local
```bash
# Frontend
npm run build           # genera dist/

# Backend
cd microservicioUsuario && mvn clean package
cd microservicioProducto && mvn clean package
```

### Upload a S3
```bash
aws s3 sync dist/ s3://s3-gabo-app-react --delete --acl public-read
```

### CloudFront Invalidation
```bash
aws cloudfront create-invalidation \
  --distribution-id E1234ABCD \
  --paths "/*"
```

## 📚 Documentación Adicional

- **DEPLOYMENT_GUIDE.md** - Guía detallada de despliegue en EC2
- **Swagger/OpenAPI** - Documentación interactiva en `/swagger-ui.html`
- **JWT** - Ver `JwtTokenProvider.java` para detalles de tokens

## 🔄 Tecnologías

### Backend
- Spring Boot 3.4.5
- Spring Security + JWT (0.12.3)
- JPA/Hibernate
- MySQL 8.0

### Frontend
- React 18
- Vite
- Bootstrap 5
- Axios
- React Router

### DevOps
- Docker & Docker Compose
- AWS EC2 & S3
- AWS CloudFront (opcional)

## 📝 Licencia

Proyecto privado - DataFixComp 2025

## 👥 Contacto

Para preguntas o issues, contactar al equipo de desarrollo.

---

**Última actualización**: 2025-12-02  
**Versión**: 1.0.0
