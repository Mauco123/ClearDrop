# 🚚 ClearDrop - Escrow de Entrega Descentralizado con zkSync + Scaffold-ETH

## 🧩 Problema

En muchos servicios de delivery o paquetería actuales, los compradores enfrentan riesgos como:

- Estafas o entregas que nunca se concretan.
- Estados indefinidos como “en proceso” sin resolución.
- Cancelaciones con altas comisiones o retención de dinero.

Esto genera desconfianza en los servicios.

---

## ✅ Solución Propuesta: **Entrega Segura con Web3**

Creamos una **dApp de custodia de pagos (escrow)** que garantiza la liberación del dinero **solo cuando se verifica la entrega** del producto o servicio. 

Usamos:

- **zkSync**: Blockchain escalable y de bajo costo (Ethereum Layer 2).
- **Scaffold-ETH 2**: Herramienta para desarrollo rápido de contratos inteligentes y su frontend.
- **Oráculo de entrega**: Foto, código QR o firma del comprador como prueba de recepción.

---

## 🔐 ¿Cómo Funciona?


[Comprador] ---> [Contrato Escrow (zkSync)] ---> [Entrega Confirmada] ---> [Pago liberado al Repartidor]
                                         |
                                         +--> [Foto IPFS / Firma / Código QR]



## Flujo paso a paso:
El comprador deposita ETH en el contrato inteligente.

El contrato guarda el pago en custodia (escrow).

El repartidor marca el pedido como entregado:

Sube una foto con timestamp (almacenada en IPFS),

O escanea un código QR generado por la dApp,

O firma con su wallet.

El comprador confirma la recepción:

Con una firma desde su wallet,

O subiendo su propia evidencia.

El contrato valida ambas partes y libera el pago.

Si no se confirma en cierto tiempo, el comprador puede cancelar y se le reembolsa el dinero.

## ⚙️ Arquitectura Técnica

[Comprador]          [Repartidor]            [Vendedor/Servicio]
     |                     |                        |
     |  UI (dApp React)    |                        |
     | <--------------- Frontend (Tailwind + v0.dev)
     |                     |                        |
     |                     |   Scaffold-ETH (hooks, wagmi)
     |                     |         ↓
     |                     |   zkSync Era (L2 Ethereum)
     |                     |         ↓
     |                     |   EscrowDelivery.sol (Smart Contract)


## 🛠️ Tecnologías Utilizadas
# 1. zkSync Era
Blockchain de Capa 2 sobre Ethereum.

Comisiones muy bajas y transacciones rápidas.

Soporte para Solidity (misma sintaxis que Ethereum).

# 2. Scaffold-ETH 2
Kit de desarrollo fullstack Web3.

Incluye herramientas como:

useContractRead, useContractWrite para leer/escribir en el contrato.

Integración de wallets con wagmi.

Frontend con React + Tailwind.

# 3. Oráculo de Entrega
Verificación de entrega mediante:

Foto (almacenada en IPFS).

Código QR escaneado por el comprador.

Firma del comprador usando su wallet.

## 📦 Funcionalidades del Contrato EscrowDelivery.sol
depositarFondos(): El comprador envía ETH.

confirmarEntrega(): El repartidor notifica la entrega.

confirmarRecepcion(): El comprador valida que recibió.

liberarFondos(): El contrato transfiere el ETH al repartidor.

cancelarPedido(): Se activa si no se verifica la entrega dentro del tiempo definido.

## 🖼️ UI (Diseño Visual)
El diseño de la interfaz está hecho en v0.dev, enfocado en claridad y experiencia de usuario:

## 🔗 Ver prototipo: UI en v0.dev

Incluye secciones como:

"Depositar Fondos"

"Subir Foto de Entrega"

"Confirmar Recepción"

"Liberar o Reembolsar"

## 🚀 Deploy & Test
Clona este repo y configura tu ambiente local con Scaffold-ETH 2.

Despliega el contrato en zkSync Era.

Conecta tu wallet y empieza a testear con usuarios simulados.

## 💬 ¿Por qué es útil?
Evita estafas en entregas.

Custodia descentralizada y automática del dinero.

Baja comisión gracias a zkSync.

Transparencia y confianza para ambos lados (comprador y repartidor).






## 🔮 Actualizaciones Futuras

ClearDrop es una solución enfocada en ofrecer un servicio de escrow descentralizado y transparente. Si bien actualmente está desplegado en Arbitrum Sepolia, consideramos estas posibles mejoras e integraciones tecnológicas para el futuro:

### 🌀 Mantle
- **Objetivo**: Reducir costos de gas y facilitar pagos en stablecoins.
- **Aplicación futura**: Migración o compatibilidad para ejecutar el contrato inteligente en Mantle Testnet/Mainnet como parte de una versión DeFi.

### 🧠 EigenLayer
- **Objetivo**: Aumentar la confianza en la validación de entregas.
- **Aplicación futura**: Integración con AVSs (Servicios Verificables Autónomos) para verificar entregas mediante oráculos descentralizados o sistemas de reputación validados por terceros.

### 🧬 ZKSync
- **Objetivo**: Privacidad y eficiencia en transacciones.
- **Aplicación futura**: Implementación de pagos y validaciones privadas usando ZK-Rollups, preservando la identidad de compradores y reparti
