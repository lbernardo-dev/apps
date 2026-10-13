export type ProductGuide = {
  id: string;
  title: string;
  title_en: string;
  summary: string;
  summary_en: string;
  steps: string[];
  steps_en: string[];
};

export type ProductUsageNote = {
  id: string;
  title: string;
  title_en: string;
  body: string;
  body_en: string;
};

export const upledgerGuides: ProductGuide[] = [
  {
    id: "first-ledger",
    title: "Empieza tu libro financiero",
    title_en: "Start your financial ledger",
    summary: "Crea una base sencilla antes de añadir automatizaciones.",
    summary_en: "Create a simple foundation before adding automation.",
    steps: [
      "Crea una cuenta por cada lugar donde guardas o debes dinero.",
      "Añade el saldo inicial y la fecha a la que corresponde.",
      "Registra ingresos y gastos con su fecha, cuenta y categoría.",
      "Revisa el resumen y corrige cualquier saldo que no coincida."
    ],
    steps_en: [
      "Create an account for each place where you keep or owe money.",
      "Add its opening balance and the date it represents.",
      "Record income and expenses with their date, account, and category.",
      "Review the summary and correct any balance that does not match."
    ]
  },
  {
    id: "capture-review",
    title: "Captura y aprueba un movimiento",
    title_en: "Capture and approve a transaction",
    summary: "Usa una captura rápida sin perder el control de lo que entra en el libro.",
    summary_en: "Capture something quickly while keeping control of what enters your ledger.",
    steps: [
      "Abre Capturar y dicta, escribe o comparte la información disponible.",
      "Comprueba importe, fecha, cuenta, tipo y categoría sugeridos.",
      "Edita cualquier dato incorrecto o incompleto.",
      "Aprueba el borrador para incorporarlo al libro."
    ],
    steps_en: [
      "Open Capture and dictate, type, or share the information you have.",
      "Check the suggested amount, date, account, type, and category.",
      "Edit anything that is incorrect or missing.",
      "Approve the draft to add it to your ledger."
    ]
  },
  {
    id: "receipt-capture",
    title: "Registra un recibo",
    title_en: "Record a receipt",
    summary: "La lectura de texto acelera la entrada, pero siempre requiere revisión.",
    summary_en: "Text recognition speeds up entry, but always needs your review.",
    steps: [
      "Inicia una captura desde la cámara, una imagen o un archivo compatible.",
      "Espera a que la app proponga los datos que puede reconocer.",
      "Compara cada campo propuesto con el recibo original.",
      "Completa los campos faltantes y aprueba el movimiento."
    ],
    steps_en: [
      "Start a capture from the camera, an image, or a supported file.",
      "Wait for the app to suggest the details it can recognize.",
      "Compare every suggested field with the original receipt.",
      "Fill in anything missing and approve the transaction."
    ]
  },
  {
    id: "budgets-bills",
    title: "Organiza presupuestos y pagos recurrentes",
    title_en: "Organize budgets and recurring bills",
    summary: "Separa límites mensuales de los compromisos que se repiten.",
    summary_en: "Keep monthly spending limits separate from repeating commitments.",
    steps: [
      "Revisa o crea las categorías que reflejan tus gastos reales.",
      "Define un presupuesto por periodo y categoría.",
      "Añade los pagos recurrentes con frecuencia, importe y próxima fecha.",
      "Vuelve al plan para comprobar el impacto previsto."
    ],
    steps_en: [
      "Review or create categories that reflect your real spending.",
      "Set a budget by period and category.",
      "Add recurring bills with their frequency, amount, and next date.",
      "Return to the plan to review their expected impact."
    ]
  },
  {
    id: "forecast",
    title: "Interpreta una previsión",
    title_en: "Read a forecast",
    summary: "Una previsión depende de los datos y supuestos que introduzcas.",
    summary_en: "A forecast depends on the records and assumptions you enter.",
    steps: [
      "Comprueba que los saldos iniciales y movimientos recientes estén al día.",
      "Revisa ingresos, gastos y compromisos recurrentes incluidos.",
      "Cambia un supuesto para comparar escenarios posibles.",
      "Usa el resultado como orientación y vuelve a validar los datos."
    ],
    steps_en: [
      "Make sure opening balances and recent transactions are up to date.",
      "Review the included income, spending, and recurring commitments.",
      "Change an assumption to compare possible scenarios.",
      "Treat the result as guidance and verify the underlying records."
    ]
  },
  {
    id: "icloud",
    title: "Activa la sincronización privada",
    title_en: "Enable private sync",
    summary: "La sincronización de iCloud es opcional y depende de tu cuenta y ajustes de Apple.",
    summary_en: "iCloud sync is optional and depends on your Apple account and settings.",
    steps: [
      "Inicia sesión en iCloud en el dispositivo y activa iCloud Drive.",
      "Comprueba que UpLedger tiene permiso para usar iCloud.",
      "Activa la sincronización en los ajustes de UpLedger.",
      "Deja la app conectada hasta que finalice la primera sincronización."
    ],
    steps_en: [
      "Sign in to iCloud on your device and enable iCloud Drive.",
      "Check that UpLedger is allowed to use iCloud.",
      "Turn on sync in UpLedger settings.",
      "Keep the app connected until its first sync finishes."
    ]
  },
  {
    id: "export",
    title: "Exporta una copia de tus datos",
    title_en: "Export a copy of your data",
    summary: "Conserva una copia legible para archivo o análisis externo.",
    summary_en: "Keep a readable copy for your records or external analysis.",
    steps: [
      "Abre Ajustes y entra en la opción de exportación.",
      "Elige el formato disponible y el alcance de los datos.",
      "Guarda o comparte el archivo desde la hoja de compartir de Apple.",
      "Comprueba que el archivo se abrió y quedó guardado donde querías."
    ],
    steps_en: [
      "Open Settings and choose the export option.",
      "Select an available format and the data range.",
      "Save or share the file using Apple's share sheet.",
      "Check that the file opened and was saved where you intended."
    ]
  },
  {
    id: "subscription",
    title: "Gestiona, restaura o cancela Pro",
    title_en: "Manage, restore, or cancel Pro",
    summary: "Las compras se gestionan con el Apple ID usado para suscribirte.",
    summary_en: "Purchases are managed by the Apple ID used to subscribe.",
    steps: [
      "Consulta el plan y el precio que muestra la hoja de compra de Apple.",
      "Para restaurar, usa Restaurar compras desde la pantalla de suscripción.",
      "Para cancelar o cambiar el plan, abre Ajustes de iOS > tu nombre > Suscripciones.",
      "Eliminar la app no cancela una suscripción activa."
    ],
    steps_en: [
      "Review the plan and price shown on Apple's purchase sheet.",
      "To restore, use Restore Purchases on the subscription screen.",
      "To cancel or change a plan, open iOS Settings > your name > Subscriptions.",
      "Deleting the app does not cancel an active subscription."
    ]
  }
];

export const upledgerUsageNotes: ProductUsageNote[] = [
  {
    id: "no-bank-connection",
    title: "No hay conexión bancaria automática",
    title_en: "There is no automatic bank connection",
    body: "UpLedger no se conecta a bancos ni pide credenciales bancarias. Los movimientos se registran manualmente o mediante las herramientas de captura disponibles.",
    body_en: "UpLedger does not connect to banks or ask for bank credentials. Transactions are entered manually or with the available capture tools."
  },
  {
    id: "review-capture",
    title: "Revisa siempre las capturas",
    title_en: "Always review captures",
    body: "El dictado, OCR y las sugerencias automáticas pueden equivocarse. Una captura queda como borrador hasta que revisas y apruebas sus datos.",
    body_en: "Dictation, OCR, and automatic suggestions can be wrong. A capture remains a draft until you review and approve its details."
  },
  {
    id: "forecast-limits",
    title: "Las previsiones no son asesoramiento financiero",
    title_en: "Forecasts are not financial advice",
    body: "Las previsiones son estimaciones basadas en los datos y supuestos introducidos. No garantizan resultados y no sustituyen el asesoramiento financiero profesional.",
    body_en: "Forecasts are estimates based on the records and assumptions you provide. They do not guarantee outcomes or replace professional financial advice."
  },
  {
    id: "local-data",
    title: "Protege tus datos locales",
    title_en: "Protect your local data",
    body: "Sin sincronización activa, los datos permanecen en el dispositivo. Desinstalar la app o perder el dispositivo puede eliminar la única copia; activa iCloud o exporta una copia si necesitas respaldo.",
    body_en: "Without sync, data stays on the device. Uninstalling the app or losing the device may remove the only copy; enable iCloud or export a copy if you need a backup."
  },
  {
    id: "free-limits",
    title: "Límites del plan gratuito",
    title_en: "Free plan limits",
    body: "El plan gratuito incluye 1 cuenta, hasta 2 reglas de clasificación, hasta 2 movimientos recurrentes y 1 miembro del hogar. La oferta y los límites vigentes aparecen en la app.",
    body_en: "The free plan includes 1 account, up to 2 classification rules, up to 2 recurring transactions, and 1 household member. The app shows the current offer and limits."
  },
  {
    id: "icloud-requirements",
    title: "Qué necesitas para usar iCloud",
    title_en: "What you need for iCloud",
    body: "La sincronización es opcional y requiere iniciar sesión en iCloud, tener iCloud Drive disponible y permitir el acceso de UpLedger. La disponibilidad depende de Apple y de tu espacio de iCloud.",
    body_en: "Sync is optional and requires an iCloud sign-in, available iCloud Drive, and permission for UpLedger. Availability depends on Apple and your iCloud storage."
  },
  {
    id: "optional-ai",
    title: "La IA es opcional",
    title_en: "AI is optional",
    body: "Las funciones de asistencia dependen de la configuración elegida. Los modelos locales no se descargan automáticamente; usar un proveedor externo requiere configurarlo y autorizar el envío del texto necesario.",
    body_en: "Assistant features depend on your configuration. Local models are not downloaded automatically; using an external provider requires setup and consent to send the necessary text."
  },
  {
    id: "diagnostics",
    title: "Diagnósticos con control",
    title_en: "Diagnostics are under your control",
    body: "Los diagnósticos y el uso son opcionales. Cuando se activan, se comparten datos técnicos agregados y fallos, no movimientos, saldos, comercios ni textos financieros.",
    body_en: "Diagnostics and usage sharing are optional. When enabled, aggregated technical events and crashes are shared, not transactions, balances, merchants, or financial text."
  },
  {
    id: "compatibility",
    title: "Compatibilidad",
    title_en: "Compatibility",
    body: "UpLedger requiere iOS o iPadOS 26 o posterior. Las funciones de Apple Watch y otras superficies de Apple requieren dispositivos y versiones de sistema compatibles.",
    body_en: "UpLedger requires iOS or iPadOS 26 or later. Apple Watch and other Apple surfaces require compatible devices and operating-system versions."
  },
  {
    id: "pricing",
    title: "Precio y disponibilidad",
    title_en: "Price and availability",
    body: "Los precios, pruebas, promociones, impuestos y condiciones de renovación cambian según territorio y cuenta. La hoja de compra de Apple muestra los términos aplicables antes de confirmar.",
    body_en: "Prices, trials, promotions, taxes, and renewal terms vary by territory and account. Apple's purchase sheet shows the applicable terms before confirmation."
  }
];
