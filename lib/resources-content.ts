export type ResourceArticle = {
  id: string;
  slug_es: string;
  slug_en: string;
  title: string;
  title_en: string;
  date: string;
  readTime: string;
  readTime_en: string;
  excerpt: string;
  excerpt_en: string;
  content: string; // HTML-like or markdown content
  content_en: string;
};

export const resourcesData: ResourceArticle[] = [
  {
    id: "swiftui-performance",
    slug_es: "como-detectar-problemas-rendimiento-swiftui",
    slug_en: "how-to-identify-performance-issues-in-a-swiftui-app",
    title: "Cómo detectar problemas de rendimiento en una app SwiftUI",
    title_en: "How to identify performance issues in a SwiftUI app",
    date: "2026-07-10",
    readTime: "5 min de lectura",
    readTime_en: "5 min read",
    excerpt: "Identifica bloqueos de hilo principal, renderizados innecesarios y optimiza tus listas usando Xcode Instruments.",
    excerpt_en: "Identify main thread blocks, redundant view updates, and optimize list views using Xcode Instruments.",
    content: `<h2>1. Entender el ciclo de renderizado de SwiftUI</h2>
<p>SwiftUI es declarativo, lo que significa que la vista es una función de su estado. Si el estado cambia, SwiftUI vuelve a evaluar el body de la vista. Si esta evaluación es costosa o se ejecuta con demasiada frecuencia, la interfaz perderá fluidez y la batería sufrirá.</p>

<h2>2. Instrumentar la aplicación con Xcode Instruments</h2>
<p>No adivines dónde están los problemas. Utiliza <strong>Time Profiler</strong> y <strong>SwiftUI Views Instruments</strong> para medir:</p>
<ul>
  <li><strong>Slow Frames:</strong> Renderizados de pantalla que superan el presupuesto de 8.3ms (para 120Hz/ProMotion).</li>
  <li><strong>Redundant Body Computations:</strong> Vistas cuyos bodies se evalúan a pesar de que sus datos visibles no han cambiado.</li>
  <li><strong>Main Thread Hangs:</strong> Trabajo pesado de CPU (decodificación JSON, consultas locales) ejecutándose directamente en el hilo principal.</li>
</ul>

<h2>3. Optimizar la estructura de datos</h2>
<p>Para evitar evaluaciones innecesarias, mantén las vistas pequeñas y pasa únicamente la información requerida. En lugar de pasar un objeto observable entero a cada subvista, pasa solo las propiedades específicas o divide tus modelos en porciones cohesivas usando Swift Concurrency y constructores ligeros.</p>`,
    content_en: `<h2>1. Understanding the SwiftUI Render Cycle</h2>
<p>SwiftUI is declarative: views are a function of their state. When state changes, SwiftUI re-evaluates the view's body. If body evaluation is heavy or triggered too often, the UI stutters and battery consumption spikes.</p>

<h2>2. Profiling with Xcode Instruments</h2>
<p>Don't guess where bottlenecks are. Use <strong>Time Profiler</strong> and the <strong>SwiftUI Views Instrument</strong> to track:</p>
<ul>
  <li><strong>Slow Frames:</strong> Screen updates exceeding the 8.3ms frame budget (for 120Hz/ProMotion screens).</li>
  <li><strong>Redundant Body Computations:</strong> Views whose body property is evaluated even when visible data remains unchanged.</li>
  <li><strong>Main Thread Hangs:</strong> Heavy CPU work (like JSON parsing or local database querying) running directly on the main thread.</li>
</ul>

<h2>3. Data Model Optimisation</h2>
<p>To prevent redundant renders, keep views focused and pass only required data. Instead of passing a large observable object down the entire hierarchy, slice your models or use value types for child components.</p>`
  },
  {
    id: "salesforce-audit",
    slug_es: "cuando-empresa-necesita-auditoria-salesforce",
    slug_en: "when-a-salesforce-implementation-needs-a-technical-audit",
    title: "Cuándo una empresa necesita una auditoría de Salesforce",
    title_en: "When a Salesforce implementation needs a technical audit",
    date: "2026-07-05",
    readTime: "4 min de lectura",
    readTime_en: "4 min read",
    excerpt: "Señales de que tu CRM está acumulando excesiva deuda técnica y reduciendo la productividad operativa de tu equipo.",
    excerpt_en: "Warning signs that your CRM is accumulating excessive technical debt and hurting your team's operational productivity.",
    content: `<h2>1. Pérdida de rendimiento e ineficiencias operativas</h2>
<p>Si la carga de pantallas tarda segundos, o tus comerciales experimentan errores intermitentes al guardar cuentas o contactos, es señal de que las automatizaciones de fondo están colisionando.</p>

<h2>2. Acumulación de automatizaciones cruzadas</h2>
<p>Con el paso del tiempo, es habitual que coexistan múltiples Process Builders antiguos, Apex Triggers sin gobernanza y flujos automatizados (Flows) compitiendo por los mismos objetos. Esto provoca bloqueos de registros y fallos inesperados de rendimiento.</p>

<h2>3. Alcance de límites de plataforma</h2>
<p>Salesforce aplica límites estrictos en transacciones (SOQL queries, sentencias DML, uso de CPU). Si tu equipo recibe alertas de límites alcanzados o la integración de datos con otros sistemas falla, necesitas una auditoría inmediata para simplificar procesos y refactorizar el código Apex redundante.</p>`,
    content_en: `<h2>1. Performance Drops and Operational Inefficiencies</h2>
<p>If page loading takes several seconds or users encounter random validation errors when saving records, your background automations are likely colliding.</p>

<h2>2. Accumulation of Overlapping Automations</h2>
<p>Over time, organizations accumulate legacy Process Builders, unmanaged Apex Triggers, and declarative Flows competing on the same objects. This triggers record locking issues and unpredictable errors.</p>

<h2>3. Hitting Governor Limits</h2>
<p>Salesforce strictly enforces limits (SOQL queries, CPU time, DML limits). If your team receives system limit emails or integrations fail intermittently, a technical audit is required to refactor redundant code.</p>`
  },
  {
    id: "salesforce-sap-integration",
    slug_es: "errores-habituales-integraciones-salesforce-sap",
    slug_en: "common-salesforce-and-sap-integration-failures",
    title: "Errores habituales en integraciones Salesforce y SAP",
    title_en: "Common Salesforce and SAP integration failures",
    date: "2026-06-28",
    readTime: "6 min de lectura",
    readTime_en: "6 min read",
    excerpt: "Analizamos fallos de sincronización, cuellos de botella y problemas de seguridad entre tu CRM y ERP corporativo.",
    excerpt_en: "An analysis of sync mismatches, performance bottlenecks, and security faults between your CRM and corporate ERP.",
    content: `<h2>1. Diferencias en el modelado y formato de datos</h2>
<p>SAP y Salesforce estructuran los datos de forma diferente. Intentar mapear estructuras complejas de SAP directamente al CRM sin un middleware o transformación intermedia suele resultar en fallos de importación y datos corruptos.</p>

<h2>2. Sincronización en tiempo real innecesaria</h2>
<p>Forzar llamadas síncronas para cada cambio de inventario o estado del cliente sobrecarga el ERP y degrada la experiencia de usuario en Salesforce. La mayor parte de los procesos deben gestionarse mediante arquitectura orientada a eventos asíncronos y cargas en lotes programados.</p>

<h2>3. Falta de control de errores y observabilidad</h2>
<p>Cuando una integración carece de sistema de logs estructurados o alertas automatizadas, un fallo de red puede provocar pérdidas de pedidos y facturas sin que el equipo técnico se entere. Implementar colas de reintentos e instrumentación es obligatorio.</p>`,
    content_en: `<h2>1. Data Schema and Format Mismatches</h2>
<p>SAP and Salesforce model data differently. Mapping complex ERP tables directly to Salesforce objects without transformation layers results in data corruption and import failures.</p>

<h2>2. Unnecessary Real-Time Synchronisation</h2>
<p>Enforcing synchronous calls for every stock update overburdens the ERP and slows down Salesforce saves. Most sync tasks are better handled via event-driven architectures or scheduled micro-batches.</p>

<h2>3. Lack of Logging and Alerting</h2>
<p>Without structured logs or automated notification systems, network drops can cause missing orders or billing gaps unnoticed. Setting up retry queues and error tracing is vital.</p>`
  },
  {
    id: "ios-localization",
    slug_es: "como-preparar-app-ios-multiples-idiomas",
    slug_en: "how-to-prepare-an-ios-app-for-international-localisation",
    title: "Cómo preparar una app iOS para múltiples idiomas",
    title_en: "How to prepare an iOS app for international localisation",
    date: "2026-06-15",
    readTime: "5 min de lectura",
    readTime_en: "5 min read",
    excerpt: "Planifica el soporte multilenguaje en SwiftUI con String Catalogs, traducción de metadatos y layouts adaptables.",
    excerpt_en: "Plan multi-locale support in SwiftUI using String Catalogs, metadata translations, and flexible layouts.",
    content: `<h2>1. Adoptar String Catalogs de forma nativa</h2>
<p>Abandona los antiguos archivos .strings. Los String Catalogs (.xcstrings) integrados en Xcode facilitan la visualización del estado de la traducción de todas tus cadenas de texto en un único lugar, asegurando que no queden claves vacías o sin traducir.</p>

<h2>2. Diseñar interfaces responsivas</h2>
<p>Las palabras tienen longitudes muy diferentes según el idioma (por ejemplo, el alemán suele requerir un 30% más de espacio que el inglés). Evita fijar anchos estáticos en tus contenedores de SwiftUI. Utiliza alineaciones flexibles y layouts dinámicos para evitar que los textos se corten.</p>

<h2>3. Localizar metadatos y páginas de soporte</h2>
<p>La traducción de la app es solo el primer paso. Debes traducir también el título, subtítulo, capturas de pantalla y descripción en App Store Connect, además de contar con políticas de privacidad y páginas de soporte redactadas en el idioma del usuario.</p>`,
    content_en: `<h2>1. Adopting String Catalogs natively</h2>
<p>Ditch legacy .strings files. String Catalogs (.xcstrings) integrated into Xcode provide a unified dashboard to audit your translation coverage, ensuring zero missing labels.</p>

<h2>2. Designing Adaptable UI Layouts</h2>
<p>Words vary in length across languages (e.g., German requires about 30% more space than English). Avoid hardcoding widths in SwiftUI components. Use dynamic layouts so containers grow naturally without clipping text.</p>

<h2>3. Localising App Store Metadata</h2>
<p>Translating internal strings is just half the battle. You must localize titles, subtitles, keywords, and screenshots in App Store Connect, as well as providing matching support and privacy URLs.</p>`
  },
  {
    id: "app-store-submission",
    slug_es: "que-revisar-antes-publicar-app-app-store",
    slug_en: "what-to-review-before-releasing-an-app-on-the-app-store",
    title: "Qué revisar antes de publicar una app en App Store",
    title_en: "What to review before releasing an app on the App Store",
    date: "2026-06-02",
    readTime: "5 min de lectura",
    readTime_en: "5 min read",
    excerpt: "Lista de verificación para evitar rechazos de Apple: privacidad, compras in-app, rendimiento y credenciales.",
    excerpt_en: "Pre-flight checklist to avoid Apple rejections: privacy manifests, in-app purchases, performance, and credentials.",
    content: `<h2>1. Cumplimiento de Privacidad y Manifiestos</h2>
<p>Asegúrate de que tu archivo PrivacyInfo.xcmapping detalla con precisión todas las APIs de uso restringido utilizadas por tus librerías y dependencias, además de documentar claramente el propósito del uso de datos.</p>

<h2>2. Proporcionar accesos de prueba válidos</h2>
<p>Una de las causas principales de rechazo es que los revisores de Apple no puedan probar la aplicación. Proporciona credenciales de prueba activas y sin bloqueos de doble factor en la sección de revisión de la App Store.</p>

<h2>3. Flujo robusto de restauración de compras</h2>
<p>Si utilizas compras integradas o suscripciones (StoreKit/RevenueCat), debes incluir un botón de \"Restaurar Compras\" visible y funcional en la pantalla de pago (paywall). Además, asegúrate de que los términos de suscripción legales estén accesibles.</p>`,
    content_en: `<h2>1. Privacy Manifest Compliance</h2>
<p>Ensure your PrivacyInfo.xcprivacy manifest correctly declares all required-reason APIs used by your code and third-party dependencies, listing valid usage reasons.</p>

<h2>2. Active Demo Accounts and Credentials</h2>
<p>A leading cause of rejections is Apple reviewers being unable to log in. Provide clear credentials and disable two-factor authentication (2FA) for the test account.</p>

<h2>3. Restore Purchases and Subscription Terms</h2>
<p>If selling premium features or plans (StoreKit/RevenueCat), Apple requires a visible \"Restore Purchases\" button on your paywall. You must also link terms of service and subscription details.</p>`
  }
];
