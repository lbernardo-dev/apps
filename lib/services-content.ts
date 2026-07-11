export type ServiceDetail = {
  id: string;
  slug_es: string;
  slug_en: string;
  title: string;
  title_en: string;
  heroTitle: string;
  heroTitle_en: string;
  heroSub: string;
  heroSub_en: string;
  problemsTitle: string;
  problemsTitle_en: string;
  problems: string[];
  problems_en: string[];
  audienceTitle: string;
  audienceTitle_en: string;
  audience: string;
  audience_en: string;
  servicesTitle: string;
  servicesTitle_en: string;
  servicesList: string[];
  servicesList_en: string[];
  processTitle: string;
  processTitle_en: string;
  processList: { title: string; body: string }[];
  processList_en: { title: string; body: string }[];
  techTitle: string;
  techTitle_en: string;
  techList: string[];
  deliverablesTitle: string;
  deliverablesTitle_en: string;
  deliverablesList: string[];
  deliverablesList_en: string[];
  faqTitle: string;
  faqTitle_en: string;
  faqList: { q: string; a: string }[];
  faqList_en: { q: string; a: string }[];
  ctaTitle: string;
  ctaTitle_en: string;
  ctaSub: string;
  ctaSub_en: string;
  ctaButton: string;
  ctaButton_en: string;
};

export const servicesData: ServiceDetail[] = [
  {
    id: "ios-development",
    slug_es: "desarrollo-ios",
    slug_en: "ios-development",
    title: "Desarrollo iOS Nativo",
    title_en: "Native iOS Development",
    heroTitle: "Aplicaciones iOS nativas y de alto rendimiento en Swift y SwiftUI",
    heroTitle_en: "High-Performance Native iOS Apps in Swift & SwiftUI",
    heroSub: "Diseño, desarrollo y publicación de aplicaciones móviles premium. Integración con el ecosistema Apple, estabilidad garantizada y arquitectura pensada para la escalabilidad.",
    heroSub_en: "Design, development, and release of premium mobile applications. Apple ecosystem integration, guaranteed stability, and architecture built for scalability.",
    problemsTitle: "¿Qué problemas resolvemos?",
    problemsTitle_en: "What Problems Do We Solve?",
    problems: [
      "Aplicaciones lentas o inestables con mala valoración de los usuarios.",
      "Deuda técnica por código Legacy desordenado difícil de mantener.",
      "Falta de integración con funciones modernas de iOS (Widgets, watchOS, Live Activities).",
      "Rechazos recurrentes durante el proceso de revisión de Apple en App Store Connect."
    ],
    problems_en: [
      "Slow or unstable apps with poor user ratings.",
      "Technical debt from messy legacy code that is hard to maintain.",
      "Lack of integration with modern iOS features (Widgets, watchOS, Live Activities).",
      "Recurring rejections during Apple's review process in App Store Connect."
    ],
    audienceTitle: "¿Para quién es esto?",
    audienceTitle_en: "Who Is This For?",
    audience: "Empresas y fundadores que buscan lanzar un producto iOS premium sin comprometer el rendimiento, la privacidad ni la experiencia nativa de Apple.",
    audience_en: "Companies and founders looking to launch a premium iOS product without compromising performance, privacy, or Apple's native experience.",
    servicesTitle: "Servicios Incluidos",
    servicesTitle_en: "Services Included",
    servicesList: [
      "Desarrollo de apps nativas para iPhone, iPad y Apple Watch.",
      "Desarrollo de Widgets, Live Activities e integraciones con Siri.",
      "Adopción y modernización de código a SwiftUI, SwiftData y Swift Concurrency.",
      "Sincronización segura de datos con iCloud (CloudKit) y bases de datos locales.",
      "Monetización integrada mediante StoreKit y pasarelas de pago.",
      "Publicación completa y optimización ASO en App Store Connect."
    ],
    servicesList_en: [
      "Native app development for iPhone, iPad, and Apple Watch.",
      "Widgets, Live Activities, and Siri integrations.",
      "Code modernisations to SwiftUI, SwiftData, and Swift Concurrency.",
      "Secure data sync with iCloud (CloudKit) and local databases.",
      "In-app purchases and billing integrations via StoreKit.",
      "Full App Store Connect publishing and initial ASO support."
    ],
    processTitle: "Nuestro Proceso de Trabajo",
    processTitle_en: "Our Working Process",
    processList: [
      { title: "Definición y Alcance", body: "Acotamos los requerimientos y definimos los criterios de aceptación técnicos y visuales." },
      { title: "Arquitectura y UX", body: "Diseñamos la estructura de datos, flujo de pantallas y mockups de alta fidelidad." },
      { title: "Desarrollo Iterativo", body: "Construimos el código con Swift y SwiftUI estructurado en fases funcionales." },
      { title: "QA y Publicación", body: "Validamos en simuladores y dispositivos físicos antes de subir y publicar la app en Apple." }
    ],
    processList_en: [
      { title: "Definition & Scope", body: "We define requirements and technical/visual acceptance criteria." },
      { title: "Architecture & UX", body: "We design the data models, user flow, and high-fidelity mockups." },
      { title: "Iterative Build", body: "We write clean Swift and SwiftUI code structured into functional milestones." },
      { title: "QA & Release", body: "We validate on simulators and physical devices before submitting and releasing the app." }
    ],
    techTitle: "Tecnologías Clave",
    techTitle_en: "Key Technologies",
    techList: ["Swift", "SwiftUI", "SwiftData", "Core Data", "CloudKit", "watchOS", "StoreKit", "HealthKit", "RevenueCat"],
    deliverablesTitle: "Qué Entregamos",
    deliverablesTitle_en: "What We Deliver",
    deliverablesList: [
      "Código fuente limpio y documentado en repositorio privado.",
      "Configuración lista de App Store Connect para distribución.",
      "Información técnica estructurada sobre la arquitectura implementada.",
      "Términos legales y políticas de privacidad alineadas con el cumplimiento de Apple."
    ],
    deliverablesList_en: [
      "Clean, documented source code in a private repository.",
      "Configured App Store Connect project ready for distribution.",
      "Structured technical documentation on the architecture.",
      "Privacy policy and terms templates aligned with Apple's compliance."
    ],
    faqTitle: "Preguntas Frecuentes",
    faqTitle_en: "Frequently Asked Questions",
    faqList: [
      { q: "¿Ayudas con la cuenta de desarrollador de Apple?", a: "Sí, te guío en el registro del Apple Developer Program y configuro los certificados y accesos de tu equipo." },
      { q: "¿Ofreces soporte después del lanzamiento?", a: "Sí, ofrezco planes de mantenimiento para resolver incidencias y actualizar la app a las nuevas versiones de iOS." }
    ],
    faqList_en: [
      { q: "Do you help with Apple Developer accounts?", a: "Yes, I guide you through registering for the Apple Developer Program and configure certificates and permissions." },
      { q: "Do you offer post-launch support?", a: "Yes, monthly maintenance plans are available to resolve bugs and keep the app updated for new iOS versions." }
    ],
    ctaTitle: "¿Listo para construir tu aplicación iOS?",
    ctaTitle_en: "Ready to Build Your iOS App?",
    ctaSub: "Hablemos de tus requerimientos y planifiquemos un plan de desarrollo viable.",
    ctaSub_en: "Let's discuss your requirements and plan a viable development roadmap.",
    ctaButton: "Solicitar evaluación técnica",
    ctaButton_en: "Request technical assessment"
  },
  {
    id: "salesforce-consulting",
    slug_es: "consultoria-salesforce",
    slug_en: "salesforce-consulting",
    title: "Consultoría Salesforce",
    title_en: "Salesforce Consulting",
    heroTitle: "Optimización, desarrollo y gobernanza técnica en Salesforce CRM",
    heroTitle_en: "Optimisation, Development, and Governance in Salesforce CRM",
    heroSub: "Auditoría de implementaciones existentes, automatización avanzada de procesos con Apex y Flows, e integración con sistemas externos (SAP, APIs) reduciendo la deuda técnica.",
    heroSub_en: "Audit existing configurations, design advanced process automations with Apex and Flows, and integrate Salesforce with external platforms (SAP, APIs) while reducing debt.",
    problemsTitle: "¿Qué problemas resolvemos?",
    problemsTitle_en: "What Problems Do We Solve?",
    problems: [
      "Procesos CRM lentos, desactualizados o con errores frecuentes de automatización.",
      "Complejidad excesiva debido a la acumulación de desarrollos sin gobierno.",
      "Dificultades para conectar Salesforce con sistemas ERP como SAP o bases de datos externas.",
      "Falta de visibilidad y control sobre los despliegues y lanzamientos de nuevas funciones."
    ],
    problems_en: [
      "Slow, outdated CRM processes or frequent automation errors.",
      "Excessive complexity due to custom code and flows built without proper governance.",
      "Difficulties connecting Salesforce with ERP systems like SAP or external databases.",
      "Lack of visibility and control over deployments and release management."
    ],
    audienceTitle: "¿Para quién es esto?",
    audienceTitle_en: "Who Is This For?",
    audience: "Empresas y administradores de TI que necesitan optimizar su CRM para aumentar la eficiencia del negocio, resolver bugs complejos e integrar Salesforce de forma robusta.",
    audience_en: "Companies and IT managers who need to optimize their CRM to increase operational efficiency, resolve complex bugs, and integrate Salesforce securely.",
    servicesTitle: "Servicios Incluidos",
    servicesTitle_en: "Services Included",
    servicesList: [
      "Consultoría técnica avanzada y arquitectura de datos en Salesforce.",
      "Desarrollo personalizado mediante componentes Lightning Web Components (LWC) y Apex.",
      "Automatización de procesos complejos mediante flujos declarativos (Flows).",
      "Integración de Salesforce con ERPs (SAP, Microsoft Dynamics) y APIs REST/SOAP.",
      "Gobernanza, optimización de rendimiento y limpieza de deuda técnica.",
      "Gestión de lanzamientos y pipelines de despliegue mediante CI/CD."
    ],
    servicesList_en: [
      "Advanced technical consulting and data architecture in Salesforce.",
      "Custom development using Lightning Web Components (LWC) and Apex.",
      "Complex process automation using declarative Flows.",
      "Integration of Salesforce with ERPs (SAP, Microsoft Dynamics) and REST/SOAP APIs.",
      "Governance, performance optimization, and technical debt clean-up.",
      "Release management and deployment pipelines using CI/CD."
    ],
    processTitle: "Nuestro Proceso de Trabajo",
    processTitle_en: "Our Working Process",
    processList: [
      { title: "Auditoría Técnica", body: "Revisamos tu configuración actual, automatizaciones y límites de plataforma." },
      { title: "Diseño y Arquitectura", body: "Proponemos soluciones optimizadas reutilizando estándares y reduciendo código a medida." },
      { title: "Desarrollo y Pruebas", body: "Codificamos automatizaciones y LWCs siguiendo las directrices de seguridad de Salesforce." },
      { title: "Despliegue Controlado", body: "Lanzamos las mejoras mediante sandboxes con pruebas de aceptación antes de producción." }
    ],
    processList_en: [
      { title: "Technical Audit", body: "We review your current config, automations, and platform limits." },
      { title: "Design & Architecture", body: "We propose optimized solutions reusing standards and reducing custom code." },
      { title: "Build & Test", body: "We write Apex and LWCs following Salesforce's strict security guidelines." },
      { title: "Controlled Release", body: "We deploy improvements via sandboxes with acceptance testing before going live." }
    ],
    techTitle: "Plataforma y Tecnologías",
    techTitle_en: "Platform and Tech",
    techList: ["Salesforce CRM", "Apex", "Lightning Web Components", "Salesforce Flows", "MuleSoft", "REST/SOAP APIs", "Copado / Git CI/CD", "Sales & Service Cloud"],
    deliverablesTitle: "Qué Entregamos",
    deliverablesTitle_en: "What We Deliver",
    deliverablesList: [
      "Código Apex y componentes LWC documentados y optimizados.",
      "Diagramas de flujo de automatizaciones y modelo de datos CRM.",
      "Informe detallado de auditoría técnica con recomendaciones de mejora.",
      "Soporte y gobernanza de release management."
    ],
    deliverablesList_en: [
      "Optimized and documented Apex code and LWC components.",
      "Flow diagrams of automations and CRM data models.",
      "Detailed technical audit report with prioritized recommendations.",
      "Release management support and governance guidelines."
    ],
    faqTitle: "Preguntas Frecuentes",
    faqTitle_en: "Frequently Asked Questions",
    faqList: [
      { q: "¿Trabajas con implementaciones existentes?", a: "Sí. Gran parte de mi trabajo consiste en auditar, limpiar y optimizar entornos Salesforce que han acumulado deuda técnica o problemas de rendimiento." },
      { q: "¿Qué certificaciones tienes?", a: "Cuento con 9 certificaciones oficiales de Salesforce, incluyendo JavaScript Developer I, Platform Developer I, Platform App Builder y Administrator." }
    ],
    faqList_en: [
      { q: "Do you work with existing implementations?", a: "Yes. Much of my work involves auditing, cleaning up, and optimizing Salesforce environments that have accumulated technical debt or performance issues." },
      { q: "What certifications do you hold?", a: "I hold 9 official Salesforce certifications, including JavaScript Developer I, Platform Developer I, Platform App Builder, and Administrator." }
    ],
    ctaTitle: "¿Tu Salesforce necesita optimización?",
    ctaTitle_en: "Does Your Salesforce Need Optimisation?",
    ctaSub: "Analicemos tu entorno actual y detectemos puntos de fricción técnicos y de rendimiento.",
    ctaSub_en: "Let's analyze your current setup and identify technical and performance bottlenecks.",
    ctaButton: "Solicitar evaluación técnica",
    ctaButton_en: "Request technical assessment"
  },
  {
    id: "app-audits",
    slug_es: "auditoria-de-apps",
    slug_en: "app-audits",
    title: "Auditoría de Aplicaciones",
    title_en: "App Audits & Modernisation",
    heroTitle: "Auditoría técnica de aplicaciones móviles para optimizar rendimiento y UX",
    heroTitle_en: "Technical App Audits to Optimize Performance & UX",
    heroSub: "Identificación de cuellos de botella en rendimiento, optimización de interfaces SwiftUI, detección de fugas de memoria, auditoría de accesibilidad WCAG y eliminación de deuda técnica.",
    heroSub_en: "Identify performance bottlenecks, optimize SwiftUI layouts, detect memory leaks, audit WCAG accessibility compliance, and eliminate structural technical debt.",
    problemsTitle: "¿Qué problemas resolvemos?",
    problemsTitle_en: "What Problems Do We Solve?",
    problems: [
      "Aplicaciones lentas, con congelamiento de interfaz o alto consumo de batería.",
      "Problemas recurrentes de accesibilidad que excluyen a usuarios potenciales.",
      "Código desorganizado que ralentiza los tiempos de desarrollo de nuevas funcionalidades.",
      "Falta de fluidez en transiciones y animaciones que degradan la percepción de calidad."
    ],
    problems_en: [
      "Slow apps, UI freezes, or high battery consumption.",
      "Recurrent accessibility issues that exclude potential users.",
      "Disorganized codebase that slows down the development of new features.",
      "Lack of smooth transitions and animations that degrade the perception of product quality."
    ],
    audienceTitle: "¿Para quién es esto?",
    audienceTitle_en: "Who Is This For?",
    audience: "Propietarios de producto y equipos de desarrollo que quieren validar la calidad técnica de su app antes de escalarla o resolver problemas complejos de rendimiento.",
    audience_en: "Product owners and development teams wanting to validate the technical quality of their app before scaling, or solve complex performance bugs.",
    servicesTitle: "Servicios Incluidos",
    servicesTitle_en: "Services Included",
    servicesList: [
      "Análisis de rendimiento, hilos y optimización de renderizado en SwiftUI.",
      "Detección y resolución de fugas de memoria y bloqueos del hilo principal.",
      "Auditoría integral de accesibilidad (WCAG 2.2 AA) y compatibilidad con VoiceOver.",
      "Revisión de arquitectura de software, patrones de diseño y modularización.",
      "Auditoría de seguridad en almacenamiento local y transmisión de datos.",
      "Optimización de tiempos de compilación y dependencias."
    ],
    servicesList_en: [
      "Performance, threading, and rendering optimization in SwiftUI.",
      "Detection and resolution of memory leaks and main thread blocks.",
      "Accessibility audit (WCAG 2.2 AA) and VoiceOver compatibility.",
      "Software architecture, design patterns, and modularization review.",
      "Security audit of local storage and data transmission.",
      "Build times and dependency optimization."
    ],
    processTitle: "Nuestro Proceso de Trabajo",
    processTitle_en: "Our Working Process",
    processList: [
      { title: "Perfilado e Instrumentos", body: "Usamos Xcode Instruments para medir consumos, fugas y renderizados en dispositivos reales." },
      { title: "Inspección de Código", body: "Revisamos la arquitectura del repositorio y detectamos acoplamientos innecesarios." },
      { title: "Informe de Hallazgos", body: "Entregamos un reporte priorizado con problemas críticos, serios y mejoras recomendadas." },
      { title: "Implementación / Soporte", body: "Te ayudamos a aplicar los cambios sugeridos o los implementamos directamente." }
    ],
    processList_en: [
      { title: "Profiling & Instruments", body: "We use Xcode Instruments to measure battery usage, leaks, and rendering on physical devices." },
      { title: "Code Inspection", body: "We review the repository architecture and locate tight coupling and debt." },
      { title: "Findings Report", body: "We deliver a prioritized report classifying findings into critical, serious, and minor improvements." },
      { title: "Fix Implementation", body: "We help your team implement the suggestions or fix them directly." }
    ],
    techTitle: "Herramientas de Auditoría",
    techTitle_en: "Audit Tools",
    techList: ["Xcode Instruments", "Leaks & Allocations", "Time Profiler", "SwiftUI Rendering Profiler", "Accessibility Inspector", "Static Analyzer", "Terminal Scripts"],
    deliverablesTitle: "Qué Entregamos",
    deliverablesTitle_en: "What We Deliver",
    deliverablesList: [
      "Informe estructurado de auditoría en PDF/Markdown.",
      "Lista accionable de tareas ordenadas por prioridad de impacto técnico.",
      "Ejemplos prácticos y sugerencias de código para resolver cada punto crítico.",
      "Acceso directo a las trazas y perfiles generados durante el proceso."
    ],
    deliverablesList_en: [
      "Structured audit report in PDF/Markdown.",
      "Actionable task list sorted by technical impact.",
      "Code snippets showing how to fix each identified critical issue.",
      "Full access to traces and profile files gathered during testing."
    ],
    faqTitle: "Preguntas Frecuentes",
    faqTitle_en: "Frequently Asked Questions",
    faqList: [
      { q: "¿Cuánto suele tardar una auditoría técnica?", a: "Dependiendo del tamaño de la aplicación, una auditoría estándar toma entre 1 y 2 semanas." },
      { q: "¿Necesitas acceso completo al código fuente?", a: "Sí. Para una auditoría técnica completa necesitamos revisar el repositorio. Trabajamos bajo estricto acuerdo de confidencialidad (NDA)." }
    ],
    faqList_en: [
      { q: "How long does a technical audit take?", a: "Depending on the app's scope, a standard audit takes between 1 and 2 weeks." },
      { q: "Do you need full access to the source code?", a: "Yes. For a thorough technical audit we must inspect the repository. We always work under non-disclosure agreements (NDAs)." }
    ],
    ctaTitle: "¿Tiene tu aplicación cuellos de botella?",
    ctaTitle_en: "Is Your App Underperforming?",
    ctaSub: "Identifiquemos por qué tu aplicación no rinde como debería y mejoremos su fluidez.",
    ctaSub_en: "Let's identify why your app is slow or lagging and improve its smoothness.",
    ctaButton: "Quiero auditar un producto",
    ctaButton_en: "I need a product audit"
  },
  {
    id: "product-design",
    slug_es: "diseno-de-producto",
    slug_en: "product-design",
    title: "Diseño de Producto",
    title_en: "Product Design",
    heroTitle: "Diseño de producto digital centrado en la usabilidad y la conversión",
    heroTitle_en: "Digital Product Design Centered on Usability & Conversion",
    heroSub: "Desde la fase de descubrimiento hasta la definición de flujos funcionales, wireframes interactivos y sistemas de diseño alineados con las pautas de Apple y la web moderna.",
    heroSub_en: "From discovery phase to functional flows, interactive wireframes, and design systems aligned with Apple's guidelines and modern web patterns.",
    problemsTitle: "¿Qué problemas resolvemos?",
    problemsTitle_en: "What Problems Do We Solve?",
    problems: [
      "Interfaces de usuario confusas con altas tasas de abandono en el registro o flujo principal.",
      "Falta de consistencia visual que daña la percepción de credibilidad de la marca.",
      "Dificultades para definir qué características priorizar en el MVP de tu aplicación.",
      "Diseños estáticos difíciles de trasladar al desarrollo técnico real sin retrasos."
    ],
    problems_en: [
      "Confusing user interfaces with high drop-off rates in signup or main flows.",
      "Lack of visual consistency that damages brand credibility perception.",
      "Difficulties defining which features to prioritize for your product's MVP.",
      "Static designs that are hard to translate to code without delays or layout breakages."
    ],
    audienceTitle: "¿Para quién es esto?",
    audienceTitle_en: "Who Is This For?",
    audience: "Fundadores y equipos técnicos que buscan diseñar un producto intuitivo, consistente y con un flujo comercial óptimo antes de escribir código.",
    audience_en: "Founders and technical teams looking to design an intuitive, consistent product with an optimized user journey before writing code.",
    servicesTitle: "Servicios Incluidos",
    servicesTitle_en: "Services Included",
    servicesList: [
      "Investigación de usuarios, análisis de competencia y discovery de producto.",
      "Diseño de arquitectura de información, flujos de navegación y sitemaps.",
      "Creación de wireframes interactivos y prototipos funcionales de alta fidelidad.",
      "Diseño de interfaz visual (UI) adaptada a móviles (iOS/Android) y web.",
      "Creación e implementación de Sistemas de Diseño (Figma component libraries).",
      "Pruebas de usabilidad iniciales y optimización de conversión (CRO)."
    ],
    servicesList_en: [
      "User research, competitor analysis, and product discovery.",
      "Information architecture, navigation flows, and sitemaps design.",
      "Interactive wireframes and high-fidelity clickable prototypes.",
      "Visual User Interface (UI) design tailored for mobile (iOS) and web.",
      "Design Systems creation and scaling (Figma component libraries).",
      "Usability testing and Conversion Rate Optimisation (CRO) audit."
    ],
    processTitle: "Nuestro Proceso de Trabajo",
    processTitle_en: "Our Working Process",
    processList: [
      { title: "Investigación y Contexto", body: "Estudiamos la necesidad del usuario, objetivos de negocio y el ecosistema competitivo." },
      { title: "Esquemas y Flujos", body: "Definimos la arquitectura y las rutas clave en wireframes rápidos para validar usabilidad." },
      { title: "UI de Alta Fidelidad", body: "Aplicamos estilos, paletas tipográficas, microinteracciones y estados visuales premium." },
      { title: "Sistema y Entrega", body: "Documentamos componentes y layouts listos para que los desarrolladores los construyan sin dudas." }
    ],
    processList_en: [
      { title: "Research & Context", body: "We study user needs, business goals, and the competitive landscape." },
      { title: "Wireframes & Flows", body: "We map out the architecture and core paths in wireframes to validate usability." },
      { title: "High-Fidelity UI", body: "We apply visual styles, typography, micro-interactions, and premium visual states." },
      { title: "System & Handoff", body: "We document components and layouts so developers can code them without ambiguity." }
    ],
    techTitle: "Herramientas de Diseño",
    techTitle_en: "Design Stack",
    techList: ["Figma", "FigJam", "Adobe Creative Suite", "Apple Human Interface Guidelines", "Web Content Accessibility Guidelines (WCAG)"],
    deliverablesTitle: "Qué Entregamos",
    deliverablesTitle_en: "What We Deliver",
    deliverablesList: [
      "Archivo de Figma organizado con flujos, mockups UI y variantes de componentes.",
      "Prototipo interactivo enlazado listo para demostraciones o pruebas con usuarios.",
      "Sistema de diseño documentado con tokens (colores, fuentes, espaciados).",
      "Mapa visual de arquitectura de información del producto."
    ],
    deliverablesList_en: [
      "Organized Figma file with flows, UI mockups, and component variants.",
      "Linked interactive prototype ready for demos or user testing.",
      "Documented design system with tokens (colors, typography, spacing).",
      "Visual map of the product's information architecture."
    ],
    faqTitle: "Preguntas Frecuentes",
    faqTitle_en: "Frequently Asked Questions",
    faqList: [
      { q: "¿Trabajas con pautas de diseño específicas?", a: "Sí, me especializo en las Human Interface Guidelines (HIG) de Apple para aplicaciones nativas y en estándares modernos de usabilidad y accesibilidad para la web." },
      { q: "¿Haces el traspaso técnico a los desarrolladores?", a: "Sí, preparo la entrega en Figma estructurando componentes y especificando restricciones de diseño para facilitar el desarrollo." }
    ],
    faqList_en: [
      { q: "Do you design according to specific guidelines?", a: "Yes, I specialize in Apple's Human Interface Guidelines (HIG) for native apps and modern usability and accessibility standards for the web." },
      { q: "Do you handle the developer handoff?", a: "Yes, I structure Figma deliverables with clean layouts, components, and responsive constraints to make development straightforward." }
    ],
    ctaTitle: "¿Tienes una idea que necesita diseño?",
    ctaTitle_en: "Have an Idea That Needs Design?",
    ctaSub: "Planifiquemos una sesión para estructurar las funcionalidades de tu producto.",
    ctaSub_en: "Let's schedule a session to outline your product features and user flows.",
    ctaButton: "Hablar sobre mi proyecto",
    ctaButton_en: "Discuss my project"
  },
  {
    id: "integrations-and-automation",
    slug_es: "integraciones-y-automatizacion",
    slug_en: "integrations-and-automation",
    title: "Integraciones y Automatización",
    title_en: "Integrations & Automation",
    heroTitle: "Conectividad robusta entre sistemas empresariales, APIs y automatización",
    heroTitle_en: "Robust Connectivity Between Enterprise Systems, APIs, and Automation",
    heroSub: "Integración segura de Salesforce con sistemas ERP (SAP), desarrollo de middleware y APIs RESTful, y automatización de flujos de negocio optimizando observabilidad y seguridad.",
    heroSub_en: "Secure Salesforce connectivity with ERP systems (SAP), development of middleware and RESTful APIs, and process automation with optimized observability and security.",
    problemsTitle: "¿Qué problemas resolvemos?",
    problemsTitle_en: "What Problems Do We Solve?",
    problems: [
      "Información duplicada o silos de datos entre tu CRM y sistemas administrativos ERP.",
      "Procesos manuales ineficientes propensos a errores en la gestión de clientes o facturas.",
      "Falta de trazabilidad y observabilidad sobre fallos en integraciones en tiempo real.",
      "Riesgos de seguridad en la transmisión y autenticación de datos entre plataformas."
    ],
    problems_en: [
      "Duplicated data or information silos between CRM and administrative ERP systems.",
      "Inefficient manual processes prone to errors in invoice or customer management.",
      "Lack of observability and tracing when real-time integrations fail.",
      "Security risks in data transmission and authentication between platforms."
    ],
    audienceTitle: "¿Para quién es esto?",
    audienceTitle_en: "Who Is This For?",
    audience: "Empresas en crecimiento que necesitan conectar sus herramientas corporativas de forma segura para eliminar cuellos de botella y automatizar flujos repetitivos.",
    audience_en: "Growing organizations that need to connect their business tools securely to eliminate manual tasks and automate repetitive workflows.",
    servicesTitle: "Servicios Incluidos",
    servicesTitle_en: "Services Included",
    servicesList: [
      "Integraciones nativas y personalizadas en Salesforce con sistemas ERP (SAP, Oracle).",
      "Desarrollo y optimización de APIs REST, SOAP y webhooks.",
      "Implementación de middleware y flujos de integración de datos en tiempo real.",
      "Automatización de procesos de negocio (aprovisionamientos, facturación, sincronización).",
      "Configuración de alertas, observabilidad y trazabilidad de errores en integraciones.",
      "Optimización de esquemas de autenticación segura (OAuth 2.0, API Keys)."
    ],
    servicesList_en: [
      "Native and custom Salesforce integrations with ERP systems (SAP, Oracle).",
      "REST, SOAP API, and webhook development and tuning.",
      "Middleware configuration and real-time data sync flows.",
      "Business process automation (invoicing, customer provisioning, syncs).",
      "Alert systems, observability, and error tracing setup.",
      "Secure authentication schemes optimization (OAuth 2.0, API Keys)."
    ],
    processTitle: "Nuestro Proceso de Trabajo",
    processTitle_en: "Our Working Process",
    processList: [
      { title: "Mapeo y Requisitos", body: "Identificamos los sistemas implicados, esquemas de datos y frecuencias de sincronización." },
      { title: "Modelado e Intercambio", body: "Diseñamos la estructura de los payloads y definimos las reglas de negocio y seguridad." },
      { title: "Desarrollo y Conectividad", body: "Construimos la lógica de integración, manejo de errores y reintentos automáticos." },
      { title: "Validación y Monitoreo", body: "Ejecutamos pruebas de volumen y configuramos logs para asegurar la trazabilidad operativa." }
    ],
    processList_en: [
      { title: "Mapping & Scope", body: "We identify the target systems, data schemas, and sync intervals." },
      { title: "Payload & Security Design", body: "We map out the payloads, endpoints, and security rules." },
      { title: "Connectivity & Coding", body: "We write the integration logic, error handlers, and retry policies." },
      { title: "Testing & Monitoring", body: "We run stress tests and configure log tools to ensure operational traceability." }
    ],
    techTitle: "Tecnologías y Plataformas",
    techTitle_en: "Integration Stack",
    techList: ["APIs REST/SOAP", "Salesforce Apex Integrations", "SAP Connector", "MuleSoft", "Node.js / Python", "SQL / Supabase", "OAuth 2.0 / SAML", "JSON / XML"],
    deliverablesTitle: "Qué Entregamos",
    deliverablesTitle_en: "What We Deliver",
    deliverablesList: [
      "Código e integraciones documentadas con diagramas de conectividad.",
      "Mapeos de datos y especificaciones de APIs (Swagger/OpenAPI).",
      "Panel o sistema de alertas ante fallos y logs estructurados.",
      "Script o configuración de pruebas de integración."
    ],
    deliverablesList_en: [
      "Documented code and integrations with connectivity diagrams.",
      "Data mappings and API specifications (Swagger/OpenAPI).",
      "Dashboard or alert systems for fails and structured logs.",
      "Scripts or configuration for integration testing."
    ],
    faqTitle: "Preguntas Frecuentes",
    faqTitle_en: "Frequently Asked Questions",
    faqList: [
      { q: "¿Cómo garantizan que no se pierdan datos si falla la red?", a: "Implementamos colas de reintentos, observabilidad sobre el estado de la comunicación y mecanismos de control de errores para recuperar la consistencia de los datos." },
      { q: "¿Trabajas con SAP?", a: "Sí, tengo experiencia integrando flujos de Salesforce CRM con SAP ERP para unificar procesos de cuentas, pedidos y facturas." }
    ],
    faqList_en: [
      { q: "How do you prevent data loss during network failures?", a: "We design queue retry mechanisms, track status logs, and configure error boundary handlers to guarantee data recovery and consistency." },
      { q: "Do you work with SAP integrations?", a: "Yes, I have hands-on experience connecting Salesforce CRM workflows with SAP ERP to unify accounts, orders, and invoices." }
    ],
    ctaTitle: "¿Necesitas unificar tus sistemas?",
    ctaTitle_en: "Need to Connect Your Enterprise Systems?",
    ctaSub: "Conectemos tus bases de datos, CRM y ERPs para eliminar las tareas manuales.",
    ctaSub_en: "Let's connect your databases, CRM, and ERPs to eliminate manual work.",
    ctaButton: "Quiero plantear una integración",
    ctaButton_en: "Discuss integration project"
  },
  {
    id: "swiftui-development",
    slug_es: "desarrollo-swiftui",
    slug_en: "swiftui-development",
    title: "Desarrollo SwiftUI",
    title_en: "SwiftUI Development",
    heroTitle: "Interfaces nativas fluidas y componentes modernos en SwiftUI",
    heroTitle_en: "Fluid Native UIs and Modern Components in SwiftUI",
    heroSub: "Aprovechamos el framework declarativo de Apple para construir layouts reactivos, animaciones interactivas y widgets con un código limpio y mantenible.",
    heroSub_en: "We leverage Apple's declarative framework to build reactive layouts, interactive animations, and widgets with clean, maintainable code.",
    problemsTitle: "¿Qué problemas resolvemos?",
    problemsTitle_en: "What Problems Do We Solve?",
    problems: [
      "Vistas complejas con problemas de rendimiento o parpadeos de interfaz.",
      "Falta de adopción de las últimas APIs de SwiftUI recomendadas por Apple.",
      "Layouts que se rompen en diferentes tamaños de pantalla y orientaciones.",
      "Dificultades al migrar código legacy UIKit a vistas SwiftUI reactivas."
    ],
    problems_en: [
      "Complex views with performance issues or interface stuttering.",
      "Lack of adoption of the latest SwiftUI APIs recommended by Apple.",
      "Layouts that break across different screen sizes and orientations.",
      "Difficulties when migrating legacy UIKit code to reactive SwiftUI views."
    ],
    audienceTitle: "¿Para quién es esto?",
    audienceTitle_en: "Who Is This For?",
    audience: "Equipos y fundadores de startups que buscan una interfaz moderna, limpia y de alto rendimiento que aproveche al máximo el hardware de Apple.",
    audience_en: "Startups and teams looking for a modern, clean, and high-performance user interface that gets the most out of Apple hardware.",
    servicesTitle: "Servicios Incluidos",
    servicesTitle_en: "Services Included",
    servicesList: [
      "Diseño e implementación de vistas e interfaces de usuario en SwiftUI.",
      "Desarrollo de animaciones fluidas y transiciones interactivas.",
      "Integración de widgets de pantalla de inicio e interactivos.",
      "Migración progresiva y segura de layouts UIKit a SwiftUI.",
      "Optimización de estado de vistas mediante @Observable y Swift Concurrency.",
      "Pruebas de interfaz y accesibilidad con SwiftUI Preview e Inspector."
    ],
    servicesList_en: [
      "Design and implementation of custom user interfaces in SwiftUI.",
      "Fluid animations and interactive transition development.",
      "Integration of home screen and interactive widgets.",
      "Progressive and safe migration from UIKit to SwiftUI.",
      "View state optimization using @Observable and Swift Concurrency.",
      "Interface and accessibility testing with SwiftUI Previews and Inspector."
    ],
    processTitle: "Nuestro Proceso de Trabajo",
    processTitle_en: "Our Working Process",
    processList: [
      { title: "Discovery de UI", body: "Revisamos los mockups y definimos la jerarquía de vistas de la aplicación." },
      { title: "Arquitectura de Estado", body: "Diseñamos el flujo de datos unidireccional y la gestión de estados." },
      { title: "Desarrollo SwiftUI", body: "Construimos componentes modulares, limpios y completamente reutilizables." },
      { title: "QA visual", body: "Probamos en múltiples dispositivos para asegurar un comportamiento responsive perfecto." }
    ],
    processList_en: [
      { title: "UI Discovery", body: "We inspect layout mockups and map the app's view hierarchy." },
      { title: "State Architecture", body: "We design the unidirectional data flow and state management." },
      { title: "SwiftUI Coding", body: "We build modular, clean, and fully reusable view components." },
      { title: "Visual QA", body: "We test on multiple devices to ensure a perfect responsive layout." }
    ],
    techTitle: "Frameworks y Herramientas",
    techTitle_en: "Frameworks and Tools",
    techList: ["SwiftUI", "Swift Concurrency", "Apple HIG", "SwiftData", "Xcode Previews", "SF Symbols", "UIKit Integration"],
    deliverablesTitle: "Qué Entregamos",
    deliverablesTitle_en: "What We Deliver",
    deliverablesList: [
      "Librería de componentes SwiftUI modulares y documentados.",
      "Vistas e interfaces interactivas conectadas a la lógica de negocio.",
      "Plan de pruebas visuales y de accesibilidad implementado."
    ],
    deliverablesList_en: [
      "Documented library of modular SwiftUI components.",
      "Interactive views and UI connected to business logic.",
      "Implemented accessibility and visual testing plan."
    ],
    faqTitle: "Preguntas Frecuentes",
    faqTitle_en: "Frequently Asked Questions",
    faqList: [
      { q: "¿Es compatible SwiftUI con versiones anteriores de iOS?", a: "Sí, aunque recomendamos apuntar a iOS 16 o superior para aprovechar las mejoras de rendimiento y APIs maduras del framework." },
      { q: "¿Se puede mezclar con UIKit existente?", a: "Totalmente. Utilizamos UIViewRepresentable y UIHostingController para integrar componentes sin problemas." }
    ],
    faqList_en: [
      { q: "Is SwiftUI backward compatible with older iOS versions?", a: "Yes, though we recommend targeting iOS 16+ to leverage major performance gains and mature APIs." },
      { q: "Can we mix it with existing UIKit code?", a: "Absolutely. We use UIViewRepresentable and UIHostingController to bridge both frameworks seamlessly." }
    ],
    ctaTitle: "¿Quieres optimizar la interfaz de tu app?",
    ctaTitle_en: "Want to Optimize Your App's UI?",
    ctaSub: "Planifiquemos el desarrollo visual de tu aplicación móvil con SwiftUI.",
    ctaSub_en: "Let's plan the visual development of your mobile application using SwiftUI.",
    ctaButton: "Solicitar evaluación visual",
    ctaButton_en: "Request visual assessment"
  },
  {
    id: "salesforce-development",
    slug_es: "desarrollo-salesforce",
    slug_en: "salesforce-development",
    title: "Desarrollo Salesforce",
    title_en: "Salesforce Development",
    heroTitle: "Código Apex, componentes LWC y automatización a medida",
    heroTitle_en: "Apex Code, LWC Components, and Custom Automation",
    heroSub: "Desarrollamos soluciones personalizadas sobre la plataforma Salesforce para automatizar procesos operativos y mejorar la experiencia de tus usuarios.",
    heroSub_en: "We develop customized solutions on the Salesforce platform to automate workflows and enhance your user experience.",
    problemsTitle: "¿Qué problemas resolvemos?",
    problemsTitle_en: "What Problems Do We Solve?",
    problems: [
      "Límites de la plataforma alcanzados por malas prácticas de programación Apex.",
      "Falta de interfaces personalizadas e interactivas para tus agentes comerciales.",
      "Automatizaciones complejas que no pueden resolverse únicamente de forma declarativa.",
      "Dificultades al desplegar cambios de código entre diferentes sandboxes."
    ],
    problems_en: [
      "Platform limits hit due to poor Apex coding practices.",
      "Lack of customized and interactive user interfaces for your sales reps.",
      "Complex automations that cannot be resolved declaratively alone.",
      "Difficulties deploying code changes between different sandbox environments."
    ],
    audienceTitle: "¿Para quién es esto?",
    audienceTitle_en: "Who Is This For?",
    audience: "Administradores de TI y directores de operaciones que necesitan un desarrollo robusto y eficiente en Salesforce sin poner en riesgo la estabilidad del CRM.",
    audience_en: "IT managers and operations directors who need robust, high-performance development in Salesforce without compromising CRM stability.",
    servicesTitle: "Servicios Incluidos",
    servicesTitle_en: "Services Included",
    servicesList: [
      "Desarrollo de triggers Apex y clases controladoras optimizadas.",
      "Creación de interfaces Lightning Web Components (LWC) a medida.",
      "Implementación de lógica de negocio compleja mediante Apex Asíncrono.",
      "Creación de servicios web REST/SOAP personalizados en Salesforce.",
      "Adopción y migración de Aura Components heredados a LWC.",
      "Despliegues automatizados mediante repositorios de Git y CI/CD."
    ],
    servicesList_en: [
      "Development of optimized Apex triggers and controller classes.",
      "Creation of custom Lightning Web Components (LWC).",
      "Implementation of complex business logic using Asynchronous Apex.",
      "Custom REST/SOAP web services creation within Salesforce.",
      "Migration of legacy Aura Components to modern LWC.",
      "Automated deployments via Git repositories and CI/CD."
    ],
    processTitle: "Nuestro Proceso de Trabajo",
    processTitle_en: "Our Working Process",
    processList: [
      { title: "Análisis de Requisitos", body: "Definimos la lógica y los casos de uso operativos detalladamente." },
      { title: "Desarrollo Limpio", body: "Codificamos Apex y LWCs siguiendo patrones de diseño eficientes." },
      { title: "Pruebas de Cobertura", body: "Escribimos tests unitarios robustos superando el 75% requerido por Salesforce." },
      { title: "Pase a Producción", body: "Coordinamos el despliegue con control de versiones y DevOps." }
    ],
    processList_en: [
      { title: "Requirements Analysis", body: "We map operational logic and outline detailed use cases." },
      { title: "Clean Development", body: "We write Apex and LWCs following platform-efficient design patterns." },
      { title: "Coverage Testing", body: "We write robust unit tests exceeding the 75% coverage platform limit." },
      { title: "Go-Live Deployment", body: "We coordinate the release using version control and DevOps practices." }
    ],
    techTitle: "Plataforma y APIs",
    techTitle_en: "Platform and APIs",
    techList: ["Apex", "Lightning Web Components", "Aura", "Visualforce", "SOQL / SOSL", "Salesforce DX", "CI/CD Git", "REST/SOAP"],
    deliverablesTitle: "Qué Entregamos",
    deliverablesTitle_en: "What We Deliver",
    deliverablesList: [
      "Código fuente Apex y componentes LWC desplegados en tu sandbox.",
      "Pruebas unitarias completas y reportes de cobertura de código.",
      "Documentación técnica de la solución y las integraciones desarrolladas."
    ],
    deliverablesList_en: [
      "Apex code and LWC components deployed to your sandbox environment.",
      "Complete unit tests and code coverage reports.",
      "Technical specifications of the built solution and APIs."
    ],
    faqTitle: "Preguntas Frecuentes",
    faqTitle_en: "Frequently Asked Questions",
    faqList: [
      { q: "¿Escribes pruebas de cobertura de Apex?", a: "Sí, todos mis desarrollos Apex incluyen al menos un 85%-90% de cobertura mediante pruebas unitarias asertivas." },
      { q: "¿Trabajas con Salesforce DX?", a: "Sí, utilizo SFDX y control de versiones mediante Git para todos los proyectos de desarrollo." }
    ],
    faqList_en: [
      { q: "Do you write Apex coverage tests?", a: "Yes, all my Apex code comes with at least 85%-90% coverage using assertive unit tests." },
      { q: "Do you work with Salesforce DX?", a: "Yes, I use SFDX CLI and Git version control for all development projects." }
    ],
    ctaTitle: "¿Necesitas desarrollar una funcionalidad en Salesforce?",
    ctaTitle_en: "Need to Build a Feature in Salesforce?",
    ctaSub: "Hablemos de tus necesidades y diseñemos la solución a medida más eficiente.",
    ctaSub_en: "Let's discuss your requirements and design the most efficient custom solution.",
    ctaButton: "Solicitar propuesta técnica",
    ctaButton_en: "Request technical proposal"
  },
  {
    id: "salesforce-debt",
    slug_es: "deuda-tecnica-salesforce",
    slug_en: "salesforce-debt",
    title: "Auditoría de Deuda Técnica Salesforce",
    title_en: "Salesforce Technical Debt Auditing",
    heroTitle: "Saneamiento, optimización y reducción de deuda en tu CRM",
    heroTitle_en: "Clean-up, Optimization, and Technical Debt Reduction in Salesforce",
    heroSub: "Audito y reorganizo orgs complejas de Salesforce. Eliminamos automatizaciones redundantes, optimizamos triggers lentos y devolvemos la agilidad operativa a tu CRM.",
    heroSub_en: "We audit and refactor complex Salesforce orgs. Eliminate redundant automations, optimize slow triggers, and restore operational speed to your CRM.",
    problemsTitle: "¿Qué problemas resolvemos?",
    problemsTitle_en: "What Problems Do We Solve?",
    problems: [
      "Org de Salesforce lenta con bloqueos frecuentes de registros (Record Locks).",
      "Múltiples triggers Apex y flujos declarativos interfiriendo en un mismo objeto.",
      "Límites de almacenamiento, licencias o límites diarios de API al borde del colapso.",
      "Miedo a desplegar nuevas características por riesgo a romper automatizaciones ocultas."
    ],
    problems_en: [
      "Slow Salesforce org with frequent record lock issues.",
      "Multiple Apex triggers and declarative flows interfering on the same object.",
      "Data limits, licenses, or daily API limits close to collapse.",
      "Fear of deploying new features due to risks of breaking hidden automations."
    ],
    audienceTitle: "¿Para quién es esto?",
    audienceTitle_en: "Who Is This For?",
    audience: "Empresas con implementaciones de Salesforce de varios años que han acumulado personalizaciones complejas y necesitan recuperar el control de su CRM.",
    audience_en: "Organizations with multi-year Salesforce setups that have accumulated heavy customizations and need to regain control of their CRM.",
    servicesTitle: "Servicios Incluidos",
    servicesTitle_en: "Services Included",
    servicesList: [
      "Auditoría del estado general y arquitectura de datos de la org de Salesforce.",
      "Consolidación de múltiples triggers Apex en un único framework de trigger.",
      "Optimización y fusión de flujos (Flows) redundantes u obsoletos.",
      "Detección y eliminación de campos, objetos y código Apex sin uso.",
      "Revisión y actualización de versiones de API heredadas en componentes.",
      "Informe estructurado de deuda técnica y plan de remediación priorizado."
    ],
    servicesList_en: [
      "Sitemaps, objects, and overall data architecture audit of your Salesforce org.",
      "Consolidation of multiple Apex triggers into a single trigger framework.",
      "Optimization and fusion of redundant or legacy declarative Flows.",
      "Detection and deletion of unused custom fields, objects, and Apex code.",
      "Review and upgrade of legacy API versions in code components.",
      "Structured technical debt report and prioritized remediation roadmap."
    ],
    processTitle: "Nuestro Proceso de Trabajo",
    processTitle_en: "Our Working Process",
    processList: [
      { title: "Acceso y Análisis", body: "Revisamos los metadatos y ejecutamos herramientas de análisis estático en la org." },
      { title: "Evaluación de Triggers y Flows", body: "Mapeamos el orden de ejecución para identificar interferencias y bloqueos." },
      { title: "Informe y Priorización", body: "Clasificamos la deuda técnica según su impacto en el rendimiento y mantenimiento." },
      { title: "Refactorización Guiada", body: "Limpiamos y consolidamos la org de forma segura y por fases incrementales." }
    ],
    processList_en: [
      { title: "Access & Analysis", body: "We review metadata and run static analysis tools across the org." },
      { title: "Trigger & Flow Mapping", body: "We map the execution order to identify bottlenecks and locking." },
      { title: "Report & Prioritize", body: "We classify technical debt by operational impact and maintenance cost." },
      { title: "Safe Refactoring", body: "We clean up and consolidate the org securely in incremental phases." }
    ],
    techTitle: "Herramientas de Saneamiento",
    techTitle_en: "Clean-up Tools",
    techList: ["Salesforce Optimizer", "PMD Static Analyzer", "Apex Trigger Frameworks", "Flow Orchestrator", "VS Code SFDX", "Event Monitoring Logs"],
    deliverablesTitle: "Qué Entregamos",
    deliverablesTitle_en: "What We Deliver",
    deliverablesList: [
      "Informe detallado de auditoría de deuda técnica de tu org.",
      "Diagrama del orden de ejecución actual y optimizado de tus objetos principales.",
      "Repositorio limpio con la lógica Apex consolidada y flujos optimizados.",
      "Lista accionable para la limpieza a largo plazo de campos y metadatos."
    ],
    deliverablesList_en: [
      "Detailed technical debt audit report of your Salesforce org.",
      "Execution order diagrams of key objects (current vs optimized).",
      "Cleaned codebase with consolidated Apex triggers and optimized Flows.",
      "Actionable guidelines for long-term field and metadata cleaning."
    ],
    faqTitle: "Preguntas Frecuentes",
    faqTitle_en: "Frequently Asked Questions",
    faqList: [
      { q: "¿Puede una org muy personalizada volver al estándar?", a: "Sí, mediante un análisis cuidadoso y progresivo de las reglas de negocio, podemos migrar código a flujos declarativos estándar (Flows)." },
      { q: "¿Cuánto tarda una auditoría completa?", a: "Una auditoría completa y la entrega del reporte suelen tomar entre 1 y 2 semanas." }
    ],
    faqList_en: [
      { q: "Can a heavily customized org return to Salesforce standards?", a: "Yes, by carefully mapping business rules, we can deprecate code in favor of standard Flows." },
      { q: "How long does a technical audit take?", a: "A complete audit and detailed roadmap delivery takes between 1 and 2 weeks." }
    ],
    ctaTitle: "¿Tu Salesforce está lento o lleno de deuda?",
    ctaTitle_en: "Is Your Salesforce Lagging or Burdened with Debt?",
    ctaSub: "Obtén un diagnóstico preciso y recupera la velocidad y agilidad de tu CRM.",
    ctaSub_en: "Get a precise diagnostic and restore your CRM speed and flexibility.",
    ctaButton: "Solicitar auditoría de deuda",
    ctaButton_en: "Request debt audit"
  }
];
