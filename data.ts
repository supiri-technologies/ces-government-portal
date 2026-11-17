
import { County, Ministry, Service, Document } from './types';

export const MINISTRIES: Ministry[] = [
  { name: "Ministry of Cabinet Affairs", description: "Coordinates government policies and inter-ministerial activities.", link: "#" },
  { name: "Ministry of Housing, Lands and Public Utilities", description: "Manages land administration, urban planning, and public utilities.", link: "#" },
  { name: "Ministry of Health", description: "Oversees public health services, hospitals, and medical regulations.", link: "#" },
  { name: "Ministry of General Education and Instruction", description: "Responsible for primary and secondary education standards.", link: "#" },
  { name: "Ministry of Local Government and Law Enforcement", description: "Oversees county administration and local law enforcement.", link: "#" },
  { name: "Ministry of Peace Building", description: "Promotes conflict resolution and community cohesion.", link: "#" },
  { name: "Ministry of Parliamentary and Legal Affairs", description: "Liaises with the State Assembly and handles legal matters.", link: "#" },
  { name: "Ministry of Information and Communication", description: "Manages public information, media relations, and ICT.", link: "#" },
  { name: "Ministry of Culture, Youth and Sports", description: "Promotes cultural heritage, youth empowerment, and sports.", link: "#" },
  { name: "Ministry of Finance, Planning and Investment", description: "Manages state finances, economic planning, and investment promotion.", link: "#" },
  { name: "Ministry of Trade and Industry", description: "Regulates commerce, trade, and industrial development.", link: "#" },
  { name: "Ministry of Agriculture, Environment and Forestry", description: "Promotes farming, environmental protection, and forestry management.", link: "#" },
  { name: "Ministry of Animal Resources, Fisheries and Tourism", description: "Oversees livestock, fisheries, and tourism development.", link: "#" },
  { name: "Ministry of Cooperatives and Rural Development", description: "Supports cooperative societies and rural development projects.", link: "#" },
  { name: "Ministry of Roads and Bridges", description: "Develops and maintains state road infrastructure.", link: "#" },
  { name: "Ministry of Labour, Public Service and Human Resource Development", description: "Manages public service workforce and labor regulations.", link: "#" },
  { name: "Ministry of Gender, Child and Social Welfare", description: "Advocates for gender equality, child protection, and social welfare.", link: "#" }
];

export const COUNTIES: County[] = [
  {
    id: "juba",
    name: "Juba",
    color: "bg-green-500",
    bgColor: "bg-green-50",
    description: "The National Capital and the heartbeat of Central Equatoria. A bustling hub of government, commerce, and culture situated along the White Nile.",
    population: "570,834",
    capital: "Juba City",
    highlights: [
      { title: "Government Center", description: "Seat of State and National Government", iconName: "Building2" },
      { title: "Center of Learning", description: "Home to major universities and schools", iconName: "GraduationCap" },
      { title: "Multicultural Hub", description: "Diverse communities from across the nation", iconName: "Users" }
    ],
    payams: [
      { name: "Juba Town", population: "120,000", bomas: ["Hai Malakal", "Kator", "Munuki"] },
      { name: "Northern Bari", population: "85,000", bomas: ["Bilk", "Mogiri", "Terekeka Border"] },
      { name: "Rajaf", population: "95,000", bomas: ["Lologo", "Gumbo", "Rejaf East"] }
    ]
  },
  {
    id: "yei",
    name: "Yei River",
    color: "bg-emerald-500",
    bgColor: "bg-emerald-50",
    description: "Known as 'The Green Belt', Yei River County is famous for its lush landscapes, rich agriculture, and as a strategic trade gateway.",
    population: "400,000+",
    capital: "Yei",
    highlights: [
      { title: "Forest-Rich", description: "Abundant teak and natural forests", iconName: "Trees" },
      { title: "Agriculture", description: "Major producer of coffee and cassava", iconName: "Sprout" },
      { title: "Trade Gateway", description: "Strategic link to Uganda and DRC", iconName: "ArrowLeftRight" }
    ],
    payams: [
      { name: "Yei Town", population: "150,000", bomas: ["Jigomoni", "Lomuku", "Sanjasiri"] },
      { name: "Otogo", population: "60,000", bomas: ["Goja", "Undukori"] },
      { name: "Mugwo", population: "45,000", bomas: ["Payawa", "Teje"] }
    ]
  },
  {
    id: "morobo",
    name: "Morobo",
    color: "bg-orange-500",
    bgColor: "bg-orange-50",
    description: "The Breadbasket of the region, celebrated for its agricultural excellence and resilient communities at the crossroads of culture.",
    population: "150,000+",
    capital: "Morobo",
    highlights: [
      { title: "Agri-Excellence", description: "High yield farming region", iconName: "Wheat" },
      { title: "Cultural Crossroads", description: "Diverse ethnic harmony", iconName: "Users" },
      { title: "Innovation", description: "Emerging hub for local solutions", iconName: "Lightbulb" }
    ],
    payams: [
      { name: "Morobo", population: "40,000", bomas: ["Kembe", "Panyume"] },
      { name: "Gulumbi", population: "35,000", bomas: ["Rodoba", "Wudabi"] }
    ]
  },
  {
    id: "lainya",
    name: "Lainya",
    color: "bg-purple-500",
    bgColor: "bg-purple-50",
    description: "Home of the Pojulu people, rich in teak forests and agricultural heritage, offering a serene and strategic location.",
    population: "100,000+",
    capital: "Lainya",
    highlights: [
      { title: "Pojulu Heritage", description: "Center of Pojulu culture", iconName: "Landmark" },
      { title: "Teak Forests", description: "Valuable timber resources", iconName: "Trees" },
      { title: "Strategic Location", description: "Central position in the state", iconName: "MapPin" }
    ],
    payams: [
      { name: "Lainya", population: "30,000", bomas: ["Loka", "Kenyi"] },
      { name: "Kupera", population: "25,000", bomas: ["Limbe", "Wuji"] }
    ]
  },
  {
    id: "kajokeji",
    name: "Kajo-Keji",
    color: "bg-pink-500",
    bgColor: "bg-pink-50",
    description: "The Model County, home to the Kuku people. An agricultural powerhouse known for livestock wealth and border trade.",
    population: "200,000+",
    capital: "Kajo-Keji",
    highlights: [
      { title: "Kuku People", description: "Rich cultural traditions", iconName: "Users" },
      { title: "Livestock", description: "Major cattle and livestock region", iconName: "Beef" },
      { title: "Border Trade", description: "Active commerce with Uganda", iconName: "Briefcase" }
    ],
    payams: [
      { name: "Kangapo I", population: "45,000", bomas: ["Wudu", "Jale"] },
      { name: "Kangapo II", population: "40,000", bomas: ["Kiri", "Bori"] },
      { name: "Lire", population: "35,000", bomas: ["Romogi", "Kinyiba"] }
    ]
  },
  {
    id: "terekeka",
    name: "Terekeka",
    color: "bg-blue-500",
    bgColor: "bg-blue-50",
    description: "Land of the Mundari, a fishing paradise and gateway to the White Nile, known for its diverse livelihoods.",
    population: "150,000+",
    capital: "Terekeka",
    highlights: [
      { title: "Mundari Heritage", description: "Iconic cattle camps culture", iconName: "Tent" },
      { title: "Fishing Paradise", description: "Rich Nile fishing grounds", iconName: "Fish" },
      { title: "Nile Gateway", description: "Key river transport hub", iconName: "Anchor" }
    ],
    payams: [
      { name: "Terekeka", population: "40,000", bomas: ["Rijong", "Tali"] },
      { name: "Gemmeiza", population: "30,000", bomas: ["Mangalla", "Tindilo"] }
    ]
  }
];

export const SERVICES: Service[] = [
  { id: "birth-cert", name: "Birth Certificate", category: "Civil Documentation", fee: "500 SSP", iconName: "FileText", description: "Official record of birth for citizens." },
  { id: "marriage-cert", name: "Marriage Certificate", category: "Civil Documentation", fee: "1,000 SSP", iconName: "FileText", description: "Legal registration of marriage." },
  { id: "business-reg", name: "Business Registration", category: "Business Services", fee: "5,000 SSP", iconName: "Briefcase", description: "Register a new company or partnership." },
  { id: "land-reg", name: "Land Registration", category: "Land & Housing", fee: "15,000 SSP", iconName: "Home", description: "Title deed processing and registration." },
  { id: "health-ins", name: "Health Insurance", category: "Healthcare Services", fee: "Free", iconName: "Heart", description: "Apply for state health coverage." },
  { id: "school-enroll", name: "School Enrollment", category: "Education Services", fee: "Free", iconName: "GraduationCap", description: "Public school admission application." }
];

export const DOCUMENTS: Document[] = [
  // Civil Documentation
  { id: "doc-birth", title: "Birth Certificate Application", category: "Civil Documentation", size: "0.5 MB", date: "2024-10-05" },
  { id: "doc-marriage", title: "Marriage Certificate Application", category: "Civil Documentation", size: "0.6 MB", date: "2024-09-12" },
  { id: "doc-nid", title: "National ID Application Form", category: "Civil Documentation", size: "0.8 MB", date: "2025-01-20" },
  { id: "doc-death", title: "Death Certificate Form", category: "Civil Documentation", size: "0.4 MB", date: "2024-08-15" },

  // Business Services
  { id: "doc-biz-reg", title: "Business Registration Form", category: "Business Services", size: "2.4 MB", date: "2025-01-15" },
  { id: "doc-trade", title: "Trade License Application", category: "Business Services", size: "1.5 MB", date: "2025-01-08" },
  { id: "doc-tax", title: "Tax Registration Form", category: "Business Services", size: "1.2 MB", date: "2024-12-10" },

  // Healthcare Services
  { id: "doc-health-ins", title: "Health Insurance Registration Form", category: "Healthcare Services", size: "1.1 MB", date: "2024-11-05" },
  { id: "doc-med-rec", title: "Medical Records Request Form", category: "Healthcare Services", size: "0.3 MB", date: "2024-10-22" },
  { id: "doc-clinic", title: "Clinic Registration Application", category: "Healthcare Services", size: "3.5 MB", date: "2024-09-30" },

  // Education Services
  { id: "doc-school", title: "School Enrollment Form", category: "Education Services", size: "0.9 MB", date: "2025-02-01" },
  { id: "doc-scholar", title: "Scholarship Application Form", category: "Education Services", size: "1.4 MB", date: "2025-01-25" },
  { id: "doc-exam", title: "Exam Results Request Form", category: "Education Services", size: "0.2 MB", date: "2024-12-15" },

  // Land & Housing
  { id: "doc-land", title: "Land Registration Application", category: "Land & Housing", size: "1.8 MB", date: "2024-11-20" },
  { id: "doc-build", title: "Building Permit Application", category: "Land & Housing", size: "3.1 MB", date: "2024-12-01" },
  { id: "doc-prop", title: "Property Transfer Form", category: "Land & Housing", size: "2.2 MB", date: "2024-10-10" },

  // Legal Services
  { id: "doc-court", title: "Court Filing Form", category: "Legal Services", size: "1.5 MB", date: "2025-01-05" },
  { id: "doc-legal-aid", title: "Legal Aid Request Form", category: "Legal Services", size: "0.7 MB", date: "2024-11-15" },
  { id: "doc-notary", title: "Notary Services Application", category: "Legal Services", size: "0.5 MB", date: "2024-12-05" },
  
  // Public Documents
  { id: "pub-budget", title: "State Budget Reports", category: "Public Documents", size: "5.6 MB", date: "2024-06-30" },
  { id: "pub-perf", title: "Annual Performance Reports", category: "Public Documents", size: "8.2 MB", date: "2025-01-10" },
  { id: "pub-policy", title: "Policy Documents", category: "Public Documents", size: "2.1 MB", date: "2024-03-15" },
  { id: "pub-notice", title: "Public Notices", category: "Public Documents", size: "0.3 MB", date: "2025-02-01" },
  { id: "pub-gazette", title: "Official Gazettes", category: "Public Documents", size: "1.9 MB", date: "2024-12-20" },

  // Service Fees
  { id: "fee-biz", title: "Business Registration Fees", category: "Service Fees", size: "0.2 MB", date: "2024-01-01" },
  { id: "fee-land", title: "Land Fees and Charges", category: "Service Fees", size: "0.2 MB", date: "2024-01-01" },
  { id: "fee-doc", title: "Document Processing Fees", category: "Service Fees", size: "0.1 MB", date: "2024-01-01" },
  { id: "fee-lic", title: "License and Permit Fees", category: "Service Fees", size: "0.3 MB", date: "2024-01-01" },
  { id: "fee-other", title: "Other Service Charges", category: "Service Fees", size: "0.1 MB", date: "2024-01-01" },
];
