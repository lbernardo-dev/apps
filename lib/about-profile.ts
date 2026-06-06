export type AboutProfileMetric = {
  value: string;
  label: string;
};

export type AboutProfileEntry = {
  title: string;
  subtitle?: string;
  meta?: string;
  description?: string;
};

export type AboutProfile = {
  slug: string;
  full_name: string;
  headline: string;
  location: string;
  current_company: string;
  education: string;
  linkedin_url: string;
  image_url?: string;
  summary: string;
  source_note: string;
  metrics: AboutProfileMetric[];
  specialties: string[];
  experience: AboutProfileEntry[];
  certifications: AboutProfileEntry[];
  courses: AboutProfileEntry[];
  languages: AboutProfileEntry[];
  updated_at?: string;
};

export const fallbackAboutProfile: AboutProfile = {
  slug: "lester-romero-bernardo",
  full_name: "Lester Romero Bernardo",
  headline: "Salesforce Certified Professional (9x) y ScrumMaster (SMPC)",
  location: "Valencia, Valencian Community, Spain",
  current_company: "PageGroup",
  education: "Universidad de las Ciencias Informáticas",
  linkedin_url: "https://www.linkedin.com/in/lbernardo-cu",
  image_url:
    "https://media.licdn.com/dms/image/v2/D4D03AQF_OSrap5VrTQ/profile-displayphoto-scale_200_200/B4DZkJH.2OGsAY-/0/1756794712068?e=2147483647&v=beta&t=g_rvVTM2sUulaUSQSP3WMBlDJ1bjDR8pSZ6wXMvzPY8",
  summary:
    "Profesional Salesforce certificado y ScrumMaster con base en Valencia. Su perfil publico combina experiencia actual en PageGroup, formacion universitaria en ciencias informaticas y una trayectoria orientada a CRM, automatizacion, analisis de negocio, desarrollo sobre plataforma Salesforce e integraciones.",
  source_note: "Datos extraidos de la ficha publica de LinkedIn el 6 de junio de 2026.",
  metrics: [
    { value: "9x", label: "Certificaciones Salesforce" },
    { value: "500+", label: "Contactos en LinkedIn" },
    { value: "1044", label: "Seguidores publicos" },
    { value: "2", label: "Idiomas" }
  ],
  specialties: [
    "Salesforce Platform",
    "Salesforce Development",
    "Business Analysis",
    "Marketing Cloud Engagement",
    "CRM y automatizacion",
    "Scrum",
    "Mulesoft",
    "JavaScript"
  ],
  experience: [
    {
      title: "PageGroup",
      subtitle: "Experiencia actual",
      meta: "Madrid, Comunidad de Madrid, España"
    }
  ],
  certifications: [
    { title: "Salesforce Certified JavaScript Developer", subtitle: "Salesforce" },
    { title: "Salesforce Certified AI Associate", subtitle: "Salesforce", meta: "Issued Jun 2024 · Credential ID 4601361" },
    {
      title: "Salesforce Certified Marketing Cloud Engagement Foundations",
      subtitle: "Salesforce",
      meta: "Issued Jun 2024 · Credential ID 4636493"
    },
    { title: "Salesforce Certified Business Analyst", subtitle: "Salesforce", meta: "Issued Feb 2024 · Credential ID 4152592" },
    { title: "Salesforce Certified Platform Foundations", subtitle: "Salesforce", meta: "Issued May 2023 · Credential ID 3415304" },
    { title: "Salesforce Certified Platform App Builder", subtitle: "Salesforce", meta: "Issued Mar 2023 · Credential ID 3130129" },
    { title: "Salesforce Certified Platform Developer", subtitle: "Salesforce", meta: "Issued Apr 2022 · Credential ID 2261916" },
    { title: "Salesforce Certified Platform Administrator", subtitle: "Salesforce", meta: "Issued Mar 2021 · Credential ID 21988106" },
    { title: "Scrum Master", subtitle: "CertiProf", meta: "Issued Oct 2020 · Credential ID 48406214" },
    { title: "EF SET Certificate", subtitle: "EF Standard English Test (EF SET)", meta: "Issued Jul 2019" }
  ],
  courses: [
    { title: "Iniciacion al desarrollo con IA" },
    { title: "Integracion con Mulesoft", subtitle: "23001" },
    { title: "SCRUM MASTER PROFESSIONAL CERTIFICATE (SMPC)" },
    { title: "Salesforce Admin Certification Practice", subtitle: "1" }
  ],
  languages: [
    { title: "English", subtitle: "Professional working proficiency" },
    { title: "Spanish", subtitle: "Native or bilingual proficiency" }
  ]
};
