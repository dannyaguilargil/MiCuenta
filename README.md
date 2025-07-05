# 🧾 Sistema de Gestión de Cuentas de Cobro - Sector Público

Este sistema está diseñado para optimizar y digitalizar el proceso de **gestión de cuentas de cobro** en entidades del sector público. Incluye un flujo de trabajo con roles definidos, automatización del análisis de documentos mediante inteligencia artificial, y control integral del proceso desde la generación de la cuenta hasta su aprobación y pago.

---

## 🚀 Características Principales

- 📄 **Carga Inteligente de Documentos**  
  Permite subir archivos como contratos y cuentas de cobro en formatos PDF o imagen. Un módulo de inteligencia artificial extrae automáticamente información relevante como:
  - Número de contrato
  - Objeto del contrato
  - Valor total
  - Vigencia
  - Fechas clave (inicio, terminación, legalización)
  - Nombres del contratista y supervisor

- 👥 **Gestión de Roles**  
  El sistema define claramente las funciones de cada actor dentro del flujo institucional:
  - **Contratista:** Genera cuentas de cobro, adjunta soportes y realiza seguimiento.
  - **Supervisor:** Revisa, valida y aprueba las cuentas presentadas.
  - **Radicación:** Verifica requisitos y formaliza la recepción del documento.
  - **Presupuesto:** Revisa disponibilidad y hace reserva presupuestal.
  - **Tesorería:** Procesa el pago y emite constancias.

- 📊 **Dashboard de Seguimiento**  
  Muestra el estado de cada cuenta en tiempo real, alertas por vencimientos y trazabilidad completa del proceso.

- 📂 **Gestión Documental**  
  Almacena digitalmente todos los documentos relacionados con cada cuenta y contrato, con acceso restringido por rol.

---

## 🏛 Enfoque para el Sector Público

Diseñado cumpliendo estándares de control fiscal, trazabilidad, eficiencia administrativa y transparencia en la gestión contractual de las entidades del Estado. Compatible con principios de la Ley 80 de 1993 y buenas prácticas en contratación pública.

---

## 🔒 Seguridad y Control de Acceso

- Autenticación de usuarios
- Control de acceso basado en roles
- Registro de auditoría (log de acciones)

---

## 🤖 Inteligencia Artificial

La IA utiliza modelos de procesamiento de lenguaje natural (NLP) y visión por computadora (OCR) para:
- Leer texto de documentos escaneados
- Identificar estructuras contractuales comunes
- Sugerir campos automáticamente para su verificación por parte del usuario

---

## 🛠 Tecnologías Utilizadas

- **Backend:** Django 
- **Frontend:** ReactJS
- **Base de datos:** PostgreSQL
- **IA:** Modelos entrenados para contratos y documentos contables

---


## 📬 Contacto y Soporte

Para reportar errores, solicitar nuevas funcionalidades o integraciones con sistemas gubernamentales (como SIIF, SECOP o PQRSD), por favor contactar al equipo de desarrollo:

📧 dev@dannyhub.com

---

## 📄 Licencia

Este proyecto se entrega bajo licencia MIT o según los lineamientos institucionales del organismo público que lo implemente.

