-- Kinsera catalog space: bilingual product, FAQ, and public legal documents.
-- The curated TypeScript fallback keeps GitHub Pages buildable without Supabase;
-- this migration makes the same content editable from the existing admin space.
do $migration$
declare
  product_id uuid;
begin
  alter table public.app_legal_pages
    drop constraint if exists app_legal_pages_kind_check;

  alter table public.app_legal_pages
    add constraint app_legal_pages_kind_check
    check (kind in ('privacy', 'terms', 'subscriptions', 'support', 'safety'));

  insert into public.apps (
    slug, name, tagline, tagline_en, short_description, short_description_en,
    long_description, long_description_en, problem, problem_en, benefits,
    benefits_en, features, features_en, audience, audience_en, status,
    featured, category, platform, support_email, icon_url, cover_image_url,
    screenshots, primary_cta_label, primary_cta_label_en, primary_cta_url,
    secondary_cta_label, secondary_cta_label_en, secondary_cta_url,
    color_primary, color_secondary, seo_title, seo_description,
    pricing, free_features, free_features_en, pro_features, pro_features_en,
    updated_at
  ) values (
    'kinsera',
    'Kinsera: Kids Safety',
    'Límites digitales claros, privados y familiares.',
    'Clear, private, family-first digital limits.',
    'Configura límites de apps, categorías y sitios web con temporizadores, horarios, pausas e informes agregados que funcionan en el propio dispositivo.',
    'Set app, category, and website limits with timers, schedules, pauses, and aggregate reports that work on the device itself.',
    'Kinsera convierte Apple Screen Time en una experiencia familiar clara: la persona responsable configura la protección, el dispositivo la aplica localmente y la persona protegida puede entender qué ocurre y cuándo termina.',
    'Kinsera turns Apple Screen Time into a clear family experience: a responsible adult configures protection, the device enforces it locally, and the protected person can understand what is happening and when it ends.',
    'Los límites digitales suelen estar dispersos entre ajustes del sistema, reglas difíciles de explicar y herramientas que dependen de una cuenta o de un servidor.',
    'Digital limits are often scattered across system settings, hard-to-explain rules, and tools that depend on an account or server.',
    ARRAY[
      'Control local: La protección se aplica en el propio dispositivo, incluso sin conexión.',
      'Límites configurables: Selecciona apps, categorías y webs, y combina horarios, temporizadores y pausas.',
      'Transparencia familiar: El dispositivo protegido muestra el límite activo y las acciones disponibles.',
      'Privacidad por diseño: No enviamos nombres, dominios, mensajes, ubicación ni historial detallado a un servidor.'
    ],
    ARRAY[
      'Local control: Protection is enforced on the device, even without a connection.',
      'Configurable limits: Select apps, categories, and websites, then combine schedules, timers, and pauses.',
      'Family transparency: The protected device shows the active limit and available actions.',
      'Privacy by design: We do not send names, domains, messages, location, or detailed history to a server.'
    ],
    ARRAY[
      'Selector de Apple: Elige apps, categorías y sitios web mediante FamilyActivityPicker.',
      'Temporizadores y horarios: Aplica límites de corta duración y rutinas repetibles por días.',
      'Pausa y solicitudes: Pausa la protección con autorización y conserva las solicitudes de tiempo de forma local.',
      'Bloqueo explicable: El escudo informa por qué el contenido no está disponible y qué puede hacer la familia.',
      'Actividad agregada: Consulta totales de uso sin mostrar nombres de apps, dominios o mensajes en diagnósticos.',
      'Widget y Atajos: Consulta el estado y ejecuta acciones locales desde superficies del sistema cuando estén configuradas.',
      'Preparada para roles: La base local separa la vista responsable de la vista protegida; el control entre dispositivos requiere conexión y autorización futura.'
    ],
    ARRAY[
      'Apple picker: Choose apps, categories, and websites through FamilyActivityPicker.',
      'Timers and schedules: Apply short limits and repeatable day-based routines.',
      'Pause and requests: Pause protection with authorization and keep time requests locally.',
      'Explainable shield: The shield explains why content is unavailable and what the family can do.',
      'Aggregate activity: See usage totals without exposing app names, domains, or messages in diagnostics.',
      'Widget and Shortcuts: Check status and run local actions from system surfaces when configured.',
      'Role-ready foundation: The local base separates responsible and protected views; cross-device control requires future connectivity and authorization.'
    ],
    'Familias y tutores que quieren límites digitales comprensibles y privados en iPhone y iPad.',
    'Families and guardians who want understandable, private digital limits on iPhone and iPad.',
    'coming_soon', true, 'Estilo de vida', ARRAY['iOS', 'iPadOS'],
    'romerodev.app@gmail.com', 'assets/images/kinsera/kinsera-icon.svg',
    'assets/images/kinsera/kinsera-control-plane.svg', ARRAY['control-plane'],
    'Ver soporte y lanzamiento', 'View support and launch', '/es/casos/kinsera/soporte/',
    'Privacidad', 'Privacy', '/es/casos/kinsera/privacidad/',
    '#12243d', '#5eead4',
    'Kinsera: control parental local y privado | RomeroDev',
    'Configura límites de apps, categorías y sitios web con temporizadores, horarios y protección local para iPhone y iPad.',
    '[{"name":"Mensual","name_en":"Monthly","price":"Precio en App Store","cadence":"/mes","cadence_en":"/month","description":"Apple mostrará el precio, impuestos y condiciones finales antes de confirmar.","description_en":"Apple shows the final price, taxes, and terms before confirmation.","isIndicative":true},{"name":"Anual","name_en":"Annual","price":"Precio en App Store","cadence":"/año","cadence_en":"/year","description":"La disponibilidad y elegibilidad dependen del territorio y de Apple.","description_en":"Availability and eligibility depend on territory and Apple.","featured":true,"badge":"Mejor valor","badge_en":"Best value","isIndicative":true}]'::jsonb,
    ARRAY['Protección local', 'Selector de apps, categorías y webs', 'Temporizadores y pausas', 'Estado transparente'],
    ARRAY['Local protection', 'App, category, and website picker', 'Timers and pauses', 'Transparent status'],
    ARRAY['Rutinas ampliadas', 'Informes agregados', 'Solicitudes de tiempo', 'Herramientas Premium disponibles en la versión publicada'],
    ARRAY['Extended routines', 'Aggregate reports', 'Time requests', 'Premium tools available in the released version'],
    now()
  )
  on conflict (slug) do update set
    name = excluded.name, tagline = excluded.tagline, tagline_en = excluded.tagline_en,
    short_description = excluded.short_description, short_description_en = excluded.short_description_en,
    long_description = excluded.long_description, long_description_en = excluded.long_description_en,
    problem = excluded.problem, problem_en = excluded.problem_en, benefits = excluded.benefits,
    benefits_en = excluded.benefits_en, features = excluded.features, features_en = excluded.features_en,
    audience = excluded.audience, audience_en = excluded.audience_en, status = excluded.status,
    featured = excluded.featured, category = excluded.category, platform = excluded.platform,
    support_email = excluded.support_email, icon_url = excluded.icon_url, cover_image_url = excluded.cover_image_url,
    screenshots = excluded.screenshots, primary_cta_label = excluded.primary_cta_label,
    primary_cta_label_en = excluded.primary_cta_label_en, primary_cta_url = excluded.primary_cta_url,
    secondary_cta_label = excluded.secondary_cta_label, secondary_cta_label_en = excluded.secondary_cta_label_en,
    secondary_cta_url = excluded.secondary_cta_url, color_primary = excluded.color_primary,
    color_secondary = excluded.color_secondary, seo_title = excluded.seo_title,
    seo_description = excluded.seo_description, pricing = excluded.pricing,
    free_features = excluded.free_features, free_features_en = excluded.free_features_en,
    pro_features = excluded.pro_features, pro_features_en = excluded.pro_features_en,
    updated_at = now()
  returning id into product_id;

  delete from public.app_faqs where app_id = product_id;
  insert into public.app_faqs (app_id, question, question_en, answer, answer_en, sort_order) values
    (product_id, '¿Kinsera funciona sin conexión?', 'Does Kinsera work offline?', 'Sí. La autorización, los bloqueos, temporizadores, horarios, pausas y el estado local funcionan en el propio dispositivo. Apple puede exigir permisos o Family Sharing para determinados escenarios.', 'Yes. Authorization, shields, timers, schedules, pauses, and local status work on the device itself. Apple may require permissions or Family Sharing for specific scenarios.', 0),
    (product_id, '¿Qué puedo controlar?', 'What can I control?', 'Puedes elegir apps, categorías y sitios web mediante el selector de Apple y aplicar límites temporales o rutinas. La disponibilidad concreta depende de las APIs y permisos de Apple.', 'You can choose apps, categories, and websites through Apple''s picker and apply time limits or routines. Exact availability depends on Apple''s APIs and permissions.', 1),
    (product_id, '¿Kinsera lee mensajes o mi ubicación?', 'Does Kinsera read messages or location?', 'No. Esas funciones no forman parte del producto. La app no lee conversaciones, no captura pantallas y no rastrea ubicación.', 'No. Those features are not part of the product. The app does not read conversations, capture screens, or track location.', 2),
    (product_id, '¿Puede un adulto controlar otro dispositivo?', 'Can an adult control another device?', 'La versión actual está implementada para control local en el mismo dispositivo. La base contempla roles, pero el control entre dispositivos requiere una versión futura con conexión, autorización y un modelo de compartición revisado.', 'The current version is implemented for local control on the same device. The foundation anticipates roles, but cross-device control requires a future version with connectivity, authorization, and a reviewed sharing model.', 3),
    (product_id, '¿Cómo elimino mis datos?', 'How do I delete my data?', 'Desactiva o borra la protección desde Kinsera y desinstala la app para eliminar sus datos locales. Revisa también los ajustes de Screen Time de Apple; no existe una cuenta o copia remota que solicitar borrar en esta versión.', 'Disable or clear protection in Kinsera and uninstall the app to remove its local data. Also review Apple''s Screen Time settings; this version has no account or remote copy to request deletion from.', 4);

  delete from public.app_legal_pages where app_id = product_id;
  insert into public.app_legal_pages (app_id, kind, title, title_en, body, body_en, updated_at) values
    (product_id, 'privacy', 'Política de privacidad de Kinsera', 'Kinsera Privacy Policy',
      $privacy$Esta política explica qué información trata Kinsera para ofrecer controles familiares en iPhone y iPad, qué permanece en el dispositivo y qué opciones tienes.
## 1. Responsable y contacto
Responsable: Lester Romero Bernardo (RomeroDev), Valencia, España. Contacto: romerodev.app@gmail.com.
## 2. Datos que trata Kinsera
Kinsera guarda localmente configuración, horarios, temporizadores, pausas, recuentos agregados, preferencias, solicitudes de tiempo y estado técnico de compras. Las selecciones y tokens de Family Controls permanecen en el dispositivo o App Group local.
## 3. Lo que no recopilamos ni enviamos
No enviamos nombres de menores, nombres de apps, bundle IDs, dominios, tokens de Screen Time, mensajes, fotos, ubicación, historial de navegación, historial detallado de actividad ni contenido de políticas. Esta versión no tiene cuenta, backend remoto, publicidad ni seguimiento entre apps o sitios.$privacy$,
      $privacyen$This policy explains what Kinsera processes to provide family controls on iPhone and iPad and what stays on the device.
## 1. Controller and contact
Controller: Lester Romero Bernardo (RomeroDev), Valencia, Spain. Contact: romerodev.app@gmail.com.
## 2. Data Kinsera processes
Kinsera stores protection settings, schedules, timers, pauses, aggregate counts, preferences, time requests, and technical purchase state locally. Family Controls selections and tokens remain on the device or local App Group.
## 3. What we do not collect or send
We do not send child names, app names, bundle IDs, domains, Screen Time tokens, messages, photos, location, browsing history, detailed activity history, or policy contents. This version has no account, remote backend, advertising, or cross-app and cross-site tracking.$privacyen$, now()),
    (product_id, 'terms', 'Términos de uso de Kinsera', 'Kinsera Terms of Use',
      $terms$Estos términos regulan el uso internacional de Kinsera. Al descargar o utilizar la app aceptas estos términos, la Política de privacidad y las reglas del App Store.
## 1. Servicio
Kinsera configura límites locales de apps, categorías y sitios web, bloqueos, temporizadores, horarios, pausas, solicitudes y actividad agregada. La administración remota no forma parte de la versión actual.
## 2. Autoridad y transparencia
Solo debes cambiar políticas si tienes autoridad. Explica los límites a la persona protegida y respeta la edad, seguridad y necesidades de la familia.
## 3. Apple Screen Time
La app depende de Family Controls, Managed Settings, Device Activity, permisos, Family Sharing cuando proceda y versiones compatibles de iOS o iPadOS.
## 4. Uso responsable
No utilices Kinsera para vigilancia secreta, acoso, acceso no autorizado o datos de terceros sin autorización. La app no sustituye el criterio familiar ni garantiza que no se acceda a contenido por otros medios.
## 5. Compras y contacto
Las funciones Premium se ofrecen mediante Apple In-App Purchase. Apple gestiona pagos, renovaciones y reembolsos. Soporte: romerodev.app@gmail.com.$terms$,
      $termsen$These terms govern international use of Kinsera. By downloading or using the app, you accept these terms, the Privacy Policy, and App Store rules.
## 1. Service
Kinsera configures local limits for apps, categories, and websites, shields, timers, schedules, pauses, requests, and aggregate activity. Remote administration is not part of the current version.
## 2. Authority and transparency
Change policies only when authorized. Explain limits to the protected person and respect the family's age, safety, and needs.
## 3. Apple Screen Time
The app depends on Family Controls, Managed Settings, Device Activity, permissions, Family Sharing where applicable, and compatible iOS or iPadOS versions.
## 4. Responsible use
Do not use Kinsera for secret surveillance, harassment, unauthorized access, or third-party data without authorization. The app does not replace family judgment or guarantee that content cannot be accessed by other means.
## 5. Purchases and contact
Premium features use Apple In-App Purchase. Apple handles payments, renewals, and refunds. Support: romerodev.app@gmail.com.$termsen$, now()),
    (product_id, 'subscriptions', 'Condiciones de suscripción de Kinsera Plus', 'Kinsera Plus Subscription Terms',
      $subs$Estas condiciones complementan los Términos de uso y la Política de privacidad de Kinsera. Apple muestra la información contractual final antes de confirmar.
## 1. Compra y prueba
Apple procesa el pago y muestra precio, moneda, impuestos, duración y ofertas. Los precios de esta web son orientativos.
## 2. Renovación automática
La suscripción se renueva automáticamente salvo cancelación al menos 24 horas antes del final del periodo. Apple puede cobrar dentro de las 24 horas anteriores.
## 3. Gestionar, cancelar y restaurar
Gestiona o cancela desde Ajustes > tu nombre > Suscripciones. Eliminar Kinsera no cancela. Usa Restaurar compras con el mismo Apple Account.
## 4. Reembolsos y fin del acceso
Apple gestiona reembolsos en reportaproblem.apple.com. Al finalizar el periodo pagado se desactivan las funciones Plus; la configuración local no se borra automáticamente. Soporte: romerodev.app@gmail.com.$subs$,
      $subsen$These terms complement Kinsera''s Terms of Use and Privacy Policy. Apple displays the final contractual information before confirmation.
## 1. Purchase and trial
Apple processes payment and shows price, currency, taxes, duration, and offers. Website prices are indicative.
## 2. Automatic renewal
The subscription renews automatically unless canceled at least 24 hours before the current period ends. Apple may charge within the 24 hours before renewal.
## 3. Manage, cancel, and restore
Manage or cancel in Settings > your name > Subscriptions. Deleting Kinsera does not cancel it. Use Restore Purchases with the same Apple Account.
## 4. Refunds and end of access
Apple handles refunds at reportaproblem.apple.com. When the paid period ends, Plus features are disabled and local configuration is not automatically erased. Support: romerodev.app@gmail.com.$subsen$, now()),
    (product_id, 'safety', 'Compromiso de seguridad familiar de Kinsera', 'Kinsera Family Safety Statement',
      $safety$Kinsera ayuda a una persona responsable a configurar límites digitales claros y verificables.
## Transparencia
La persona protegida puede ver el límite, su temporizador y la acción disponible. Kinsera no lee conversaciones, no captura pantallas, no obtiene ubicación ni construye un historial secreto.
## Control local
Bloqueos, horarios, temporizadores, pausas y estados principales funcionan sin cuenta ni servidor. Las funciones entre dispositivos requieren una versión futura con conexión segura y rol autorizado.
## Uso responsable
No uses Kinsera para controlar a una persona adulta sin consentimiento. Ajusta los límites y revísalos periódicamente. Seguridad y soporte: romerodev.app@gmail.com.$safety$,
      $safetyen$Kinsera helps a responsible adult configure clear, reviewable digital limits.
## Transparency
The protected person can see the limit, its timer, and the available action. Kinsera does not read conversations, capture screens, obtain location, or build a secret history.
## Local control
Blocking, schedules, timers, pauses, and core status work without an account or server. Cross-device features require a future version with a secure connection and authorized role.
## Responsible use
Do not use Kinsera to control another adult without consent. Adjust and review limits regularly. Safety and support: romerodev.app@gmail.com.$safetyen$, now());
end
$migration$;
