# ABOG.AI – Plataforma Legal con Stripe + OpenAI

Proyecto completo de landing + app de inteligencia legal.

## ✅ ¿Qué incluye este ZIP?

- Landing page profesional (abogai)
- App funcional con login, suscripciones y chat legal con IA
- Integración con Stripe (3 planes reales)
- Integración con OpenAI (con tu prompt legal)
- Cancelación de suscripción vía portal de Stripe
- Panel de usuario según plan
- Archivo `.env.local` con claves ya configuradas

---

## 🚀 Cómo desplegar en Vercel

1. Ve a [https://vercel.com](https://vercel.com) e inicia sesión
2. Haz clic en **“Import Project”**
3. Selecciona **“Import from Git”** (o crea nuevo si es ZIP local)
4. Sube el contenido de este ZIP
5. En Settings > Environment Variables, verifica que estén estas variables:
   - `OPENAI_API_KEY`
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - `STRIPE_SECRET_KEY`
   - `STRIPE_PRODUCT_BASIC`
   - `STRIPE_PRODUCT_PRO`
   - `STRIPE_PRODUCT_ENTERPRISE`

(Ya están en `.env.local` si lo ejecutas en local)

6. Haz Deploy
7. ¡Tu empresa está online y lista para cobrar!

---

## ⚠️ Notas

- Este proyecto usa Next.js 13+ con App Router
- Puedes editar los textos, imágenes o planes desde `/app` y `/public`
- El sistema está limitado por suscripción: cada plan tiene su lógica aplicada
- Si deseas agregar webhooks u otros planes, puedes ampliar desde `/app/api`

---

¡Gracias por usar ABOG.AI! ⚖️