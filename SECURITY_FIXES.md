# 🛡️ Informe de Seguridad

## He corregido las putas vulnerabilidades

He resuleto todas las pt*as vulnerabilidades de seguridad en nuestro proyecto. Despues de corregir todas las actualizaciones el `npm audit` ahora muestra **0 vulnerabilidades**.

## Lo que he corregido

Al principio teníamos:
- 20 vulnerabilidades (2 bajas, 7 moderadas, 10 altas y 1 critical)


## Problemas que resolvemos corrigiendio esto

1. **@babel/runtime** - tenia expresiones regulares que no estaban optimizadas y no eran eficientes
2. **path-to-regexp** - podia causar problemas de denegacion de el servicio
3. **esbuild** - permitia solicitudes que no queriamos al servidor en desarrollo
4. **semver** - esto es vulnerable a ataques por expresiones regulares qque estanmal optimizadas

## como lo he solucinado

1. actualizamos dependencias importantes:
   - Next.js a la versión 14.2.0
   - Cambiamos react-lottie por lottie-react (más moderno y seguro)
   - Actualizamos uuid a la versión 10.0.0
   - Actualizamos vercel a la versión 43.3.0

2. Usamos la tecnica de los overrides en package.json para forzar versiones seguras en dependencias que dan problemas:
   ```json
   "overrides": {
     "esbuild": "^0.25.5",
     "path-to-regexp": "^6.2.2",
     "undici": "^5.28.5"
   }
   ```

3. Esta que hemos hecho nos permite:
   - Solucionar vulnerabilidades sin romper compatibilidad
   - Mantener las versiones más recientes de los paquetes principales
   - Evitar hacer downgrade de herramientas importantes(Esto significa que no bajamos las versiones de las herramientas que usamos en el proyecto,frameworks,librerias o entornos de trabajo como node o react)


1. **Mantén el proyecto actualizado**: De vez en cuando ejecuta estos comandos:
   ```bash
   npm audit             # Para verificar vulnerabilidades
   npm update            # Para actualizar dependencias compatibles
   npm outdated          # Para ver qué paquetes tienen nuevas versiones
   ```

2. **Revisa periódicamente**: Las dependencias se acyualizan constantemente, por lo que es una buena práctica revisar la seguridad cada cierto tiempo.La seguridad es un proceso continuo, no un destino final. Mantén siempre un ojo en tus dependencias y no dudes en actualizar cuando sea necesario.

---

_Última actualización: 23 de junio de 2025_
