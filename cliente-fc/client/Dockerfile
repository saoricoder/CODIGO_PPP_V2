# Etapa de construcción
FROM node:18-alpine as build

# Especifica dónde vivirá nuestra aplicación en el contenedor
WORKDIR /app

# Copia los archivos de package.json primero
# Esto permitirá a Docker cachear estos pasos si no cambian, acelerando las construcciones
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código de la aplicación
COPY . .

# Construye la aplicación React
RUN npm run build

# Etapa de producción
FROM nginx:alpine

# Copia los archivos construidos desde la etapa de construcción
COPY --from=build /app/build /usr/share/nginx/html

# Elimina la configuración predeterminada de Nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copia tu configuración personalizada de Nginx
COPY nginx/nginx.conf /etc/nginx/conf.d/

# Expone el puerto 3005
EXPOSE 3005

# Comando para ejecutar Nginx
CMD ["nginx", "-g", "daemon off;"]