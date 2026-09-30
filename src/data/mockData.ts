import {
  ClassLevel,
  SubjectMeta,
  Teacher,
  Course,
  StudyMaterial,
  Quiz,
  PurchaseOrder,
  UserProfile,
  Review
} from '../types';

export const SUBJECTS_LIST: SubjectMeta[] = [
  {
    id: 'mathematics',
    name: 'Mathematics',
    hindiName: 'गणित',
    iconName: 'Calculator',
    accentColor: 'from-blue-600 to-cyan-500',
    tagline: 'Concept clarity, step-by-step proofs & board exam numerical mastery.',
    description: 'Master Algebra, Geometry, Trigonometry, Calculus & Statistics with zero memorization.',
    popularTopics: ['Real Numbers', 'Quadratic Equations', 'Trigonometry', 'Calculus', 'Surface Areas & Volumes']
  },
  {
    id: 'science',
    name: 'Science (Physics, Chem, Bio)',
    hindiName: 'विज्ञान',
    iconName: 'Atom',
    accentColor: 'from-emerald-600 to-teal-400',
    tagline: 'Visual experiments, diagrams, reactions & conceptual foundations.',
    description: 'Physics numericals, Chemistry chemical equations & Biology diagrammatic explanations.',
    popularTopics: ['Light & Reflection', 'Chemical Reactions', 'Electricity', 'Life Processes', 'Optics']
  },
  {
    id: 'english',
    name: 'English Language & Literature',
    hindiName: 'अंग्रेज़ी',
    iconName: 'BookOpen',
    accentColor: 'from-indigo-600 to-purple-500',
    tagline: 'Grammar rules, writing skills, reading comprehension & literature analysis.',
    description: 'Scoring techniques for reading passages, creative writing formats, and chapter analysis.',
    popularTopics: ['Tenses & Modals', 'Letter & Report Writing', 'Poetry Analysis', 'Unseen Comprehension']
  },
  {
    id: 'social-science',
    name: 'Social Science (SST)',
    hindiName: 'सामाजिक विज्ञान',
    iconName: 'Globe',
    accentColor: 'from-amber-600 to-orange-400',
    tagline: 'History timelines, Geography maps, Civics & Economics case studies.',
    description: 'Memory maps, timeline charts, and point-wise answer frameworks for full marks.',
    popularTopics: ['Rise of Nationalism', 'Resource Planning', 'Federalism', 'Money and Credit', 'Map Skills']
  },
  {
    id: 'hindi',
    name: 'Hindi (हिंदी साहित्य एवं व्याकरण)',
    hindiName: 'हिंदी',
    iconName: 'PenTool',
    accentColor: 'from-rose-600 to-pink-500',
    tagline: 'Sparsh, Sanchayan, Kshitij, Kritika, vyakaran & patra-lekhan.',
    description: 'Comprehensive chapter summaries, sandhi, samas, muhavare, and formal writing.',
    popularTopics: ['वाक्य रूपांतरण', 'समास व मुहावरे', 'अनुच्छेद लेखन', 'पत्र व विज्ञापन']
  },
  {
    id: 'computer-science',
    name: 'Computer Science & AI',
    hindiName: 'कंप्यूटर विज्ञान',
    iconName: 'Laptop',
    accentColor: 'from-cyan-600 to-blue-500',
    tagline: 'CBSE school curriculum Python, SQL, Boolean Algebra & Cyber Ethics.',
    description: 'School board syllabus coding, data structures, relational database queries & practicals.',
    popularTopics: ['Python Basics & Loops', 'SQL Queries', 'Boolean Logic', 'Computer Networks']
  }
];

export const CLASSES_DATA: {
  level: ClassLevel;
  name: string;
  badge: string;
  targetBoard: string;
  description: string;
  subjectCount: number;
  highlight: string;
}[] = [
  {
    level: 6,
    name: 'Class 6',
    badge: 'Middle School Foundation',
    targetBoard: 'CBSE & State Boards',
    description: 'Build robust foundational concepts in Mathematics and Science with engaging visual methods.',
    subjectCount: 5,
    highlight: 'Foundation Builder'
  },
  {
    level: 7,
    name: 'Class 7',
    badge: 'Intermediate Mastery',
    targetBoard: 'CBSE & State Boards',
    description: 'Strengthen algebraic thinking, scientific curiosity, and English grammar frameworks.',
    subjectCount: 5,
    highlight: 'Concept Deepening'
  },
  {
    level: 8,
    name: 'Class 8',
    badge: 'Pre-High School Gateway',
    targetBoard: 'CBSE & State Boards',
    description: 'Critical transition year: rational numbers, mensuration, cell structure, and Olympiad foundations.',
    subjectCount: 6,
    highlight: 'Olympiad & School Prep'
  },
  {
    level: 9,
    name: 'Class 9',
    badge: 'High School Core',
    targetBoard: 'CBSE / ICSE / State',
    description: 'Master Class 9 syllabus which forms 60% of the foundation for Class 10 & competitive exams.',
    subjectCount: 6,
    highlight: 'Board Foundation'
  },
  {
    level: 10,
    name: 'Class 10',
    badge: 'Board Exam Special',
    targetBoard: 'CBSE & State Board Exams',
    description: 'Complete 100/100 Board Strategy with NCERT Exemplar, 10-Year PYQs, Sample Papers & Live Doubts.',
    subjectCount: 6,
    highlight: 'Board 95%+ Target'
  },
  {
    level: 11,
    name: 'Class 11',
    badge: 'Senior Secondary Core',
    targetBoard: 'CBSE / State Boards',
    description: 'In-depth conceptual mastery for Physics, Chemistry, Mathematics, Biology, English & CS.',
    subjectCount: 6,
    highlight: 'Senior Secondary'
  },
  {
    level: 12,
    name: 'Class 12',
    badge: 'Final Board & CUET Prep',
    targetBoard: 'CBSE & State Board Exams',
    description: 'Ultimate Class 12 Board scoring blueprint: Chapter-wise Derivations, Numericals, PYQs & Mocks.',
    subjectCount: 6,
    highlight: 'Board Toppers Batch'
  }
];

export const TEACHERS_LIST: Teacher[] = [
  {
    id: 't1',
    name: 'Er. Anand Sharma',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    qualification: 'M.Tech, B.Tech (IIT Roorkee Alum) | 12+ Yrs Experience',
    bio: 'Renowned Mathematics educator with over a decade of guiding thousands of Class 9 to 12 students to 100/100 in Board examinations.',
    experienceYears: 12,
    rating: 4.95,
    subjectSpeciality: 'Mathematics & Advanced Calculus'
  },
  {
    id: 't2',
    name: 'Dr. Priya Verma',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
    qualification: 'Ph.D. in Physics, M.Sc. Gold Medalist | 9+ Yrs Experience',
    bio: 'Specialist in simplifying complex Physics numericals, ray optics, and mechanics using crystal-clear diagrams and practical real-life examples.',
    experienceYears: 9,
    rating: 4.92,
    subjectSpeciality: 'Science & Senior Physics'
  },
  {
    id: 't3',
    name: 'Prof. Rajesh K. Nair',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    qualification: 'M.A. English & Comparative Literature | CBSE Resource Mentor',
    bio: 'Empowers students with impeccable English writing formats, vocabulary retention, and precise literature answer drafting techniques.',
    experienceYears: 11,
    rating: 4.88,
    subjectSpeciality: 'English Language & Creative Writing'
  },
  {
    id: 't4',
    name: 'Meenakshi Sundaram',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80',
    qualification: 'M.Sc. Chemistry (Delhi University), B.Ed. | 8+ Yrs Experience',
    bio: 'Chemistry expert known for reaction mechanisms, balanced chemical equations, and periodic table visual memory techniques.',
    experienceYears: 8,
    rating: 4.9,
    subjectSpeciality: 'Chemistry & General Science'
  },
  {
    id: 't5',
    name: 'Alok Nath Pandey',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    qualification: 'M.A. Hindi & Sanskrit (BHU), NET Qualified | 14+ Yrs Experience',
    bio: 'Dedicated Hindi literature mentor helping students ace board grammar, essay composition, and poetry interpretation effortlessly.',
    experienceYears: 14,
    rating: 4.96,
    subjectSpeciality: 'Hindi Literature & Vyakaran'
  }
];

export const COURSES_DATA: Course[] = [
  {
    id: 'c10-math-complete',
    slug: 'class-10-mathematics-complete-mastery',
    title: 'Class 10 CBSE Complete Mathematics 100/100 Board Mastery Course (2025-26)',
    classLevel: 10,
    subjectId: 'mathematics',
    subjectName: 'Mathematics',
    courseType: 'complete',
    teacher: TEACHERS_LIST[0],
    shortDescription: 'Complete NCERT line-by-line explanation, Exemplar numericals, step-by-step proofs, 10-year PYQs & chapter test series for Class 10 Board exam.',
    fullDescription: 'Designed specifically for Class 10 students targeting 95%+ in their Mathematics Board exam. Covers all 14 chapters from Real Numbers to Probability with interactive concept breakdowns, formula sheets, homework problem sets, and weekly doubt solving support on WhatsApp.',
    outcomes: [
      'Master all 14 Class 10 CBSE/State Board Mathematics chapters thoroughly',
      'Solve tricky NCERT Exemplar & previous 10-year board questions with ease',
      'Learn step-by-step board answer presentation techniques to avoid step-marks deduction',
      'Ace chapter-wise MCQ tests and full-length 80-mark mock board exam papers',
      'Get 24/7 WhatsApp Doubt Clearance from expert teacher team'
    ],
    requirements: [
      'Basic knowledge of Class 9 arithmetic and algebra',
      'A notebook, pen, and NCERT Class 10 Mathematics textbook',
      'Enthusiasm to practice daily for 45 minutes'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&auto=format&fit=crop&q=80',
    originalPrice: 2499,
    discountedPrice: 999,
    durationHours: 65,
    chaptersCount: 14,
    lessonsCount: 88,
    rating: 4.96,
    reviewCount: 428,
    studentCount: 3840,
    isPublished: true,
    isFeatured: true,
    badge: 'Bestseller ⭐ Class 10',
    createdAt: '2025-01-10',
    language: 'Hinglish (Hindi + English concept explanation)',
    modules: [
      {
        id: 'c10-m1',
        chapterNumber: 1,
        title: 'Chapter 1: Real Numbers',
        description: 'Fundamental Theorem of Arithmetic, proving irrationality of √2, √3, √5, decimal expansions, and board exam word problems.',
        lessons: [
          {
            id: 'c10-m1-l1',
            title: '1.1 Introduction to Real Numbers & Fundamental Theorem of Arithmetic',
            durationMinutes: 38,
            isFreePreview: true,
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            summary: 'Comprehensive review of prime factorizations, unique factor theorem, and LCM-HCF relationships.'
          },
          {
            id: 'c10-m1-l2',
            title: '1.2 Proving Irrationality (Proof by Contradiction - High Yield Board Question)',
            durationMinutes: 42,
            isFreePreview: true,
            summary: 'Standard 3-mark board question format: step-by-step proof for √2, √3, and 5 - 2√3.'
          },
          {
            id: 'c10-m1-l3',
            title: '1.3 LCM and HCF Word Problems & Exemplar Numericals',
            durationMinutes: 45,
            isFreePreview: false,
            summary: 'Real-world application problems involving traffic lights, circular tracks, and stacking books.'
          },
          {
            id: 'c10-m1-l4',
            title: '1.4 Chapter 1 MCQ Test & 10-Year PYQ Discussion',
            durationMinutes: 35,
            isFreePreview: false,
            quizId: 'q-c10-m1'
          }
        ]
      },
      {
        id: 'c10-m2',
        chapterNumber: 2,
        title: 'Chapter 2: Polynomials',
        description: 'Geometrical meaning of zeroes, relationship between zeroes and coefficients of quadratic polynomials.',
        lessons: [
          {
            id: 'c10-m2-l1',
            title: '2.1 Geometrical Meaning of Zeroes of a Polynomial',
            durationMinutes: 32,
            isFreePreview: false
          },
          {
            id: 'c10-m2-l2',
            title: '2.2 Relationship between Zeroes and Coefficients (Quadratic & Cubic)',
            durationMinutes: 48,
            isFreePreview: false
          },
          {
            id: 'c10-m2-l3',
            title: '2.3 Finding Quadratic Polynomial when Sum & Product of Zeroes are given',
            durationMinutes: 36,
            isFreePreview: false
          },
          {
            id: 'c10-m2-l4',
            title: '2.4 Hot & High-Order Thinking (HOTS) Questions for Polynomials',
            durationMinutes: 40,
            isFreePreview: false
          }
        ]
      },
      {
        id: 'c10-m3',
        chapterNumber: 3,
        title: 'Chapter 3: Pair of Linear Equations in Two Variables',
        description: 'Graphical method, Substitution, Elimination, and real-life speed-distance & age word problems.',
        lessons: [
          {
            id: 'c10-m3-l1',
            title: '3.1 Consistency & Graphical Representation of Linear Equations',
            durationMinutes: 44,
            isFreePreview: false
          },
          {
            id: 'c10-m3-l2',
            title: '3.2 Algebraic Methods: Substitution & Elimination Shortcuts',
            durationMinutes: 52,
            isFreePreview: false
          },
          {
            id: 'c10-m3-l3',
            title: '3.3 Upstream-Downstream, Time-Work & Fraction Word Problems',
            durationMinutes: 58,
            isFreePreview: false
          }
        ]
      },
      {
        id: 'c10-m4',
        chapterNumber: 4,
        title: 'Chapter 4: Quadratic Equations',
        description: 'Standard form, factorization, quadratic formula, nature of roots, and discriminant analysis.',
        lessons: [
          {
            id: 'c10-m4-l1',
            title: '4.1 Standard Form & Solving by Factorization Method',
            durationMinutes: 40,
            isFreePreview: false
          },
          {
            id: 'c10-m4-l2',
            title: '4.2 Quadratic Formula (Sridharacharya Rule) & Discriminant Analysis',
            durationMinutes: 46,
            isFreePreview: false
          },
          {
            id: 'c10-m4-l3',
            title: '4.3 Nature of Roots & Real-Life Scenario Problems',
            durationMinutes: 50,
            isFreePreview: false
          }
        ]
      },
      {
        id: 'c10-m8',
        chapterNumber: 8,
        title: 'Chapter 8: Introduction to Trigonometry',
        description: 'Trigonometric ratios, values of specific angles, trigonometric identities (sin²θ + cos²θ = 1) and proof questions.',
        lessons: [
          {
            id: 'c10-m8-l1',
            title: '8.1 Trigonometric Ratios of Acute Angles (Sine, Cosine, Tangent)',
            durationMinutes: 45,
            isFreePreview: false
          },
          {
            id: 'c10-m8-l2',
            title: '8.2 Trigonometric Table Memory Trick (0°, 30°, 45°, 60°, 90°)',
            durationMinutes: 35,
            isFreePreview: false
          },
          {
            id: 'c10-m8-l3',
            title: '8.3 Top 10 Most Repeated Trigonometric Identity Proofs in Board Exams',
            durationMinutes: 62,
            isFreePreview: false
          }
        ]
      }
    ]
  },
  {
    id: 'c10-science-complete',
    slug: 'class-10-science-complete-course',
    title: 'Class 10 Science (Physics + Chemistry + Biology) Board Exam Booster',
    classLevel: 10,
    subjectId: 'science',
    subjectName: 'Science',
    courseType: 'complete',
    teacher: TEACHERS_LIST[1],
    shortDescription: 'All 13 chapters covered in depth with ray diagram blueprints, chemical reaction balancing, biology labelled diagrams & formula sheets.',
    fullDescription: 'Comprehensive Class 10 Science course designed to build clear conceptual roots and train students on writing flawless structured answers. Includes complete NCERT solutions, practical experiment demonstrations, assertion-reason practice, and case-based question mastery.',
    outcomes: [
      'Master Physics ray diagrams, lens/mirror numericals and circuit diagrams',
      'Understand all Chemistry reaction types, acid-base indicators and carbon compounds',
      'Draw and label all essential Biology diagrams (Nephron, Heart, Brain, Flower)',
      'Solve 100+ Assertion-Reason and Case-Based questions for Board exam 2026'
    ],
    requirements: [
      'Basic science knowledge of Class 9',
      'Class 10 NCERT Science textbook and diagram notebook'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&auto=format&fit=crop&q=80',
    originalPrice: 2299,
    discountedPrice: 899,
    durationHours: 58,
    chaptersCount: 13,
    lessonsCount: 76,
    rating: 4.93,
    reviewCount: 312,
    studentCount: 2950,
    isPublished: true,
    isFeatured: true,
    badge: 'Popular ⭐ All 3 Sciences',
    createdAt: '2025-01-12',
    language: 'Hinglish',
    modules: [
      {
        id: 'c10-sci-m1',
        chapterNumber: 1,
        title: 'Chapter 1: Chemical Reactions and Equations',
        description: 'Balancing chemical equations, combination, decomposition, displacement, double displacement, redox, and corrosion.',
        lessons: [
          {
            id: 'c10-sci-l1',
            title: '1.1 Physical vs Chemical Changes & Characteristics of Reactions',
            durationMinutes: 35,
            isFreePreview: true
          },
          {
            id: 'c10-sci-l2',
            title: '1.2 Master Balancing Any Chemical Equation in 30 Seconds',
            durationMinutes: 40,
            isFreePreview: true
          },
          {
            id: 'c10-sci-l3',
            title: '1.3 Types of Reactions with Color Changes & PPT Formations',
            durationMinutes: 48,
            isFreePreview: false
          }
        ]
      },
      {
        id: 'c10-sci-m9',
        chapterNumber: 9,
        title: 'Chapter 9: Light - Reflection and Refraction',
        description: 'Spherical mirrors, ray diagrams, mirror formula, magnification, refractive index, lens formula, and power of lens.',
        lessons: [
          {
            id: 'c10-sci-l9-1',
            title: '9.1 Reflection by Spherical Mirrors (Concave & Convex Ray Diagrams)',
            durationMinutes: 52,
            isFreePreview: false
          },
          {
            id: 'c10-sci-l9-2',
            title: '9.2 Sign Convention Rules & 100% Accurate Mirror Formula Numericals',
            durationMinutes: 45,
            isFreePreview: false
          }
        ]
      }
    ]
  },
  {
    id: 'c9-math-foundation',
    slug: 'class-9-mathematics-foundation',
    title: 'Class 9 Mathematics Foundation & High School Bridge Course',
    classLevel: 9,
    subjectId: 'mathematics',
    subjectName: 'Mathematics',
    courseType: 'complete',
    teacher: TEACHERS_LIST[0],
    shortDescription: 'Build supreme confidence in Number Systems, Polynomials, Coordinate Geometry, Lines & Angles, Triangles, and Circles.',
    fullDescription: 'Class 9 is the turning point for every school student. This course bridges middle school arithmetic with senior high-school proofs and algebra, ensuring you enter Class 10 with a massive competitive edge.',
    outcomes: [
      'Master Number Systems, Surds, Indices, and Rationalization',
      'Understand algebraic identities: (a+b)³, a³+b³+c³-3abc with proofs',
      'Solve geometry proofs in Lines & Angles, Congruent Triangles and Quadrilaterals'
    ],
    requirements: ['Class 8 mathematics fundamentals'],
    thumbnail: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&auto=format&fit=crop&q=80',
    originalPrice: 1999,
    discountedPrice: 799,
    durationHours: 50,
    chaptersCount: 12,
    lessonsCount: 68,
    rating: 4.89,
    reviewCount: 210,
    studentCount: 1820,
    isPublished: true,
    isFeatured: true,
    badge: 'Crucial Foundation',
    createdAt: '2025-01-15',
    language: 'Hinglish',
    modules: [
      {
        id: 'c9-m1',
        chapterNumber: 1,
        title: 'Chapter 1: Number Systems',
        description: 'Rational, irrational numbers, locating irrational numbers on number line, real numbers operations, laws of exponents.',
        lessons: [
          {
            id: 'c9-m1-l1',
            title: '1.1 Rational & Irrational Numbers on Number Line',
            durationMinutes: 36,
            isFreePreview: true
          },
          {
            id: 'c9-m1-l2',
            title: '1.2 Rationalizing the Denominator (Standard & Complex Forms)',
            durationMinutes: 44,
            isFreePreview: false
          }
        ]
      }
    ]
  },
  {
    id: 'c12-math-calculus',
    slug: 'class-12-mathematics-calculus-vectors',
    title: 'Class 12 Mathematics: Calculus, Vectors & 3D Geometry Score Booster',
    classLevel: 12,
    subjectId: 'mathematics',
    subjectName: 'Mathematics',
    courseType: 'exam-prep',
    teacher: TEACHERS_LIST[0],
    shortDescription: 'Comprehensive Board Exam mastery of Continuity & Differentiability, Integrals, Differential Equations, Vectors & 3D Geometry.',
    fullDescription: 'Targeting 100/100 in Class 12 CBSE Board Mathematics. Special focus on 4-mark and 6-mark integration properties, max-min word problems, and shortest distance between skew lines.',
    outcomes: [
      'Solve indefinite and definite integration with substitution, by-parts, and properties',
      'Master Application of Derivatives (Max-Min, Rate of Change) with board steps',
      'Conquer 3D Geometry shortest distance, vector dot/cross products, and matrices'
    ],
    requirements: ['Class 11 basic calculus and algebra'],
    thumbnail: 'https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=800&auto=format&fit=crop&q=80',
    originalPrice: 2999,
    discountedPrice: 1299,
    durationHours: 72,
    chaptersCount: 13,
    lessonsCount: 94,
    rating: 4.97,
    reviewCount: 512,
    studentCount: 4100,
    isPublished: true,
    isFeatured: true,
    badge: 'Class 12 Flagship 🔥',
    createdAt: '2025-01-08',
    language: 'Hinglish',
    modules: [
      {
        id: 'c12-m5',
        chapterNumber: 5,
        title: 'Chapter 5: Continuity and Differentiability',
        description: 'Continuity at a point, derivative of inverse trigonometric functions, logarithmic differentiation, and parametric forms.',
        lessons: [
          {
            id: 'c12-m5-l1',
            title: '5.1 Continuity Conditions & Solving for Unknown Constant k',
            durationMinutes: 45,
            isFreePreview: true
          },
          {
            id: 'c12-m5-l2',
            title: '5.2 Chain Rule & Logarithmic Differentiation of Variable^Variable',
            durationMinutes: 50,
            isFreePreview: false
          }
        ]
      }
    ]
  },
  {
    id: 'c10-sst-mastery',
    slug: 'class-10-social-science-board-mastery',
    title: 'Class 10 Social Science (History, Geo, Civics, Eco) 95+ Board Course',
    classLevel: 10,
    subjectId: 'social-science',
    subjectName: 'Social Science',
    courseType: 'complete',
    teacher: TEACHERS_LIST[2],
    shortDescription: 'Memory maps, chronological timelines, map-pointing workbooks, and high-scoring point-wise answer templates for Class 10 SST.',
    fullDescription: 'Stop rote-learning thick SST books! Learn through visual flowcharts, historical narrative storytelling, geographic maps, and structured 5-mark answer formulas.',
    outcomes: [
      'Remember complex History dates and timelines with visual memory hooks',
      'Master 100% accurate Map Work for Geography and History (full marks guaranteed)',
      'Write structured point-wise answers with bold keywords for maximum board marks'
    ],
    requirements: ['Class 10 NCERT Social Science textbooks'],
    thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80',
    originalPrice: 1999,
    discountedPrice: 699,
    durationHours: 42,
    chaptersCount: 18,
    lessonsCount: 62,
    rating: 4.87,
    reviewCount: 198,
    studentCount: 1640,
    isPublished: true,
    isFeatured: false,
    badge: 'High Scoring',
    createdAt: '2025-01-20',
    language: 'Hinglish',
    modules: [
      {
        id: 'c10-sst-m1',
        chapterNumber: 1,
        title: 'History: The Rise of Nationalism in Europe',
        description: 'Frédéric Sorrieu print, French Revolution, Napoleon Code 1804, Unification of Germany & Italy.',
        lessons: [
          {
            id: 'c10-sst-l1',
            title: '1.1 The French Revolution & The Idea of the Nation',
            durationMinutes: 38,
            isFreePreview: true
          }
        ]
      }
    ]
  },
  {
    id: 'c8-math-science-combo',
    slug: 'class-8-math-science-foundation-combo',
    title: 'Class 8 Mathematics & Science Foundation Combo Pack',
    classLevel: 8,
    subjectId: 'mathematics',
    subjectName: 'Mathematics',
    courseType: 'study-package',
    teacher: TEACHERS_LIST[0],
    shortDescription: 'Complete school syllabus coverage for Class 8 Math & Science with interactive quizzes and Olympiad foundation lessons.',
    fullDescription: 'Build unbeatable logic and analytical thinking early. Covers Linear Equations, Mensuration, Exponents, Cell Biology, Microorganisms, Force and Pressure.',
    outcomes: [
      'Master all Class 8 Mathematics & Science topics with ease',
      'Ace school unit tests, half-yearly and final annual examinations',
      'Prepare for Junior Mathematics Olympiad (JMO) and Science talent searches'
    ],
    requirements: ['Class 7 completed with eagerness to learn'],
    thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80',
    originalPrice: 1999,
    discountedPrice: 699,
    durationHours: 48,
    chaptersCount: 22,
    lessonsCount: 70,
    rating: 4.91,
    reviewCount: 145,
    studentCount: 1250,
    isPublished: true,
    isFeatured: false,
    badge: '2-in-1 Combo Pack',
    createdAt: '2025-01-22',
    language: 'Hinglish',
    modules: [
      {
        id: 'c8-m1',
        chapterNumber: 1,
        title: 'Chapter 1: Rational Numbers & Properties',
        description: 'Closure, commutativity, associativity, distributive law, and representation on number line.',
        lessons: [
          {
            id: 'c8-m1-l1',
            title: '1.1 Rational Numbers Properties Made Super Simple',
            durationMinutes: 32,
            isFreePreview: true
          }
        ]
      }
    ]
  },
  {
    id: 'c10-hindi-grammar',
    slug: 'class-10-hindi-sparsh-vyakaran',
    title: 'Class 10 Hindi Course A & B: Complete Grammar, Sparsh & Sanchayan',
    classLevel: 10,
    subjectId: 'hindi',
    subjectName: 'Hindi',
    courseType: 'crash',
    teacher: TEACHERS_LIST[4],
    shortDescription: 'All vyakaran concepts (vakya bhed, samas, pad-parichay, muhavare) + complete prose/poetry explanation and board sample essays.',
    fullDescription: 'Hindi is the easiest subject to pull your overall board aggregate percentage to 98%+. Master all 16 marks of grammar rules with shortcut formulas and learn writing formats.',
    outcomes: [
      'Score full 16/16 in Class 10 Hindi Board Vyakaran section',
      'Write pristine formal letters, advertisements, and paragraph essays',
      'Understand every poem and story line-by-line with prashnottar'
    ],
    requirements: ['Class 10 Hindi textbook (Course A or B)'],
    thumbnail: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=800&auto=format&fit=crop&q=80',
    originalPrice: 1299,
    discountedPrice: 499,
    durationHours: 28,
    chaptersCount: 10,
    lessonsCount: 40,
    rating: 4.94,
    reviewCount: 165,
    studentCount: 1420,
    isPublished: true,
    isFeatured: false,
    badge: 'Percentage Booster',
    createdAt: '2025-01-25',
    language: 'Hindi',
    modules: [
      {
        id: 'c10-hin-m1',
        chapterNumber: 1,
        title: 'व्याकरण: रचना के आधार पर वाक्य रूपांतरण',
        description: 'सरल, संयुक्त एवं मिश्र वाक्य की पहचान एवं सटीक रूपांतरण नियम।',
        lessons: [
          {
            id: 'c10-hin-l1',
            title: '1.1 वाक्य के भेद एवं पहचानने के 3 अचूक नियम',
            durationMinutes: 30,
            isFreePreview: true
          }
        ]
      }
    ]
  },
  {
    id: 'c11-cs-python',
    slug: 'class-11-computer-science-python',
    title: 'Class 11 Computer Science with Python (CBSE Syllabus)',
    classLevel: 11,
    subjectId: 'computer-science',
    subjectName: 'Computer Science',
    courseType: 'complete',
    teacher: TEACHERS_LIST[0],
    shortDescription: 'Computer systems, Python fundamentals, conditionals, loops, strings, lists, tuples, dictionaries & Cyber Safety.',
    fullDescription: 'Pure school board curriculum Python programming! Structured from ground zero for beginners with code walkthroughs, error debugging exercises, and school practical lab assignments.',
    outcomes: [
      'Write and debug Python programs for school theory and practical exams',
      'Understand List comprehension, Dictionary manipulation, and nested loops',
      'Ace Boolean Algebra, Logic Gates, and Cyber Safety questions'
    ],
    requirements: ['A computer/laptop with Python IDLE or online Python compiler'],
    thumbnail: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&auto=format&fit=crop&q=80',
    originalPrice: 1899,
    discountedPrice: 749,
    durationHours: 36,
    chaptersCount: 8,
    lessonsCount: 48,
    rating: 4.88,
    reviewCount: 92,
    studentCount: 860,
    isPublished: true,
    isFeatured: false,
    badge: 'School Practical Ready',
    createdAt: '2025-01-28',
    language: 'Hinglish',
    modules: [
      {
        id: 'c11-cs-m1',
        chapterNumber: 1,
        title: 'Chapter 1: Computer Systems & Python Basics',
        description: 'Architecture of a computer, memory types, Python tokens, variables, and keywords.',
        lessons: [
          {
            id: 'c11-cs-l1',
            title: '1.1 Python Setup & First Interactive Program',
            durationMinutes: 28,
            isFreePreview: true
          }
        ]
      }
    ]
  }
];

export const STUDY_MATERIALS_DATA: StudyMaterial[] = [
  {
    id: 'sm-c10-math-formulas',
    title: 'Class 10 Mathematics All Formulas & Theorem Cheat Sheet (PDF)',
    classLevel: 10,
    subjectId: 'mathematics',
    subjectName: 'Mathematics',
    category: 'notes',
    price: 0,
    isFree: true,
    pageCount: 18,
    fileSizeBytes: '3.4 MB',
    previewUrl: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=600&auto=format&fit=crop&q=80',
    author: 'Er. Anand Sharma',
    downloadsCount: 14200,
    rating: 4.98,
    updatedAt: '2025-02-01'
  },
  {
    id: 'sm-c10-science-pyq',
    title: 'Class 10 Science 10-Year Board Chapter-wise Solved PYQs (2015-2025)',
    classLevel: 10,
    subjectId: 'science',
    subjectName: 'Science',
    category: 'pyq',
    price: 199,
    isFree: false,
    pageCount: 145,
    fileSizeBytes: '18.2 MB',
    previewUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&auto=format&fit=crop&q=80',
    author: 'Dr. Priya Verma',
    downloadsCount: 6850,
    rating: 4.94,
    updatedAt: '2025-01-28'
  },
  {
    id: 'sm-c10-math-sample-papers',
    title: 'Class 10 Mathematics Standard & Basic: 5 Solved Mock Board Papers',
    classLevel: 10,
    subjectId: 'mathematics',
    subjectName: 'Mathematics',
    category: 'sample-paper',
    price: 149,
    isFree: false,
    pageCount: 64,
    fileSizeBytes: '9.8 MB',
    previewUrl: 'https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=600&auto=format&fit=crop&q=80',
    author: 'Er. Anand Sharma',
    downloadsCount: 5200,
    rating: 4.92,
    updatedAt: '2025-01-30'
  },
  {
    id: 'sm-c9-science-notes',
    title: 'Class 9 Science Handwritten Concept Notes with Colored Diagrams',
    classLevel: 9,
    subjectId: 'science',
    subjectName: 'Science',
    category: 'notes',
    price: 0,
    isFree: true,
    pageCount: 88,
    fileSizeBytes: '14.5 MB',
    previewUrl: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?w=600&auto=format&fit=crop&q=80',
    author: 'Dr. Priya Verma',
    downloadsCount: 9340,
    rating: 4.96,
    updatedAt: '2025-01-15'
  },
  {
    id: 'sm-c12-calculus-questions',
    title: 'Class 12 Calculus Top 100 Guaranteed Board Questions with Step Solutions',
    classLevel: 12,
    subjectId: 'mathematics',
    subjectName: 'Mathematics',
    category: 'important-questions',
    price: 249,
    isFree: false,
    pageCount: 110,
    fileSizeBytes: '12.6 MB',
    previewUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&auto=format&fit=crop&q=80',
    author: 'Er. Anand Sharma',
    downloadsCount: 4120,
    rating: 4.95,
    updatedAt: '2025-02-05'
  },
  {
    id: 'sm-c10-sst-maps',
    title: 'Class 10 Social Science Complete Map Pointing Workbook & Guide',
    classLevel: 10,
    subjectId: 'social-science',
    subjectName: 'Social Science',
    category: 'practice-sheet',
    price: 0,
    isFree: true,
    pageCount: 24,
    fileSizeBytes: '6.1 MB',
    previewUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop&q=80',
    author: 'Prof. Rajesh K. Nair',
    downloadsCount: 7800,
    rating: 4.91,
    updatedAt: '2025-01-20'
  }
];

export const QUIZZES_DATA: Quiz[] = [
  {
    id: 'q-c10-m1',
    title: 'Class 10 Real Numbers & Polynomials Board High-Yield MCQ Test',
    classLevel: 10,
    subjectId: 'mathematics',
    subjectName: 'Mathematics',
    chapterTitle: 'Real Numbers & Polynomials',
    durationMinutes: 15,
    totalMarks: 20,
    passingPercentage: 70,
    attemptsCount: 8420,
    isBoardMock: true,
    questions: [
      {
        id: 'q1',
        question: 'If two positive integers a and b are written as a = x³y² and b = xy³, where x, y are prime numbers, then HCF(a, b) is:',
        options: ['xy', 'xy²', 'x³y³', 'x²y²'],
        correctOptionIndex: 1,
        explanation: 'HCF of two numbers is the product of the smallest power of each common prime factor involved. For x, min power is x¹; for y, min power is y². Hence HCF = xy².',
        hint: 'Take the lowest powers of common prime factors x and y.',
        marks: 4
      },
      {
        id: 'q2',
        question: 'If one zero of the quadratic polynomial x² + 3x + k is 2, then the value of k is:',
        options: ['10', '-10', '-7', '-2'],
        correctOptionIndex: 1,
        explanation: 'Since 2 is a zero, P(2) = 0. So (2)² + 3(2) + k = 0 => 4 + 6 + k = 0 => 10 + k = 0 => k = -10.',
        hint: 'Substitute x = 2 in the polynomial and equate to zero.',
        marks: 4
      },
      {
        id: 'q3',
        question: 'The total number of zeroes of a polynomial P(x) is equal to the number of points where the graph of y = P(x) intersects the:',
        options: ['y-axis', 'x-axis', 'origin only', 'both axes equally'],
        correctOptionIndex: 1,
        explanation: 'The zeroes of y = P(x) correspond to the x-coordinates of the points where the curve crosses or touches the x-axis (since y = 0 along the x-axis).',
        hint: 'Zeroes of P(x) occur when the output y equals zero.',
        marks: 4
      },
      {
        id: 'q4',
        question: 'If the sum of zeroes of a quadratic polynomial is -5 and their product is 6, the polynomial is given by:',
        options: ['x² - 5x + 6', 'x² + 5x + 6', 'x² - 5x - 6', 'x² + 5x - 6'],
        correctOptionIndex: 1,
        explanation: 'Standard quadratic polynomial formula is k[x² - (Sum of zeroes)x + (Product of zeroes)]. Here: x² - (-5)x + 6 = x² + 5x + 6.',
        hint: 'Use the formula P(x) = x² - (α+β)x + αβ.',
        marks: 4
      },
      {
        id: 'q5',
        question: 'If LCM(32, 48) = 96, then HCF(32, 48) is equal to:',
        options: ['12', '16', '24', '8'],
        correctOptionIndex: 1,
        explanation: 'LCM(a,b) × HCF(a,b) = a × b. Therefore, 96 × HCF = 32 × 48 = 1536 => HCF = 1536 / 96 = 16.',
        hint: 'Use product of two numbers = LCM × HCF.',
        marks: 4
      }
    ]
  },
  {
    id: 'q-c10-sci-light',
    title: 'Class 10 Science: Light Reflection & Refraction MCQ Mastery',
    classLevel: 10,
    subjectId: 'science',
    subjectName: 'Science',
    chapterTitle: 'Light - Reflection and Refraction',
    durationMinutes: 12,
    totalMarks: 16,
    passingPercentage: 75,
    attemptsCount: 6150,
    isBoardMock: false,
    questions: [
      {
        id: 'sci-q1',
        question: 'Where should an object be placed in front of a concave mirror to get a real, inverted image of the same size as the object?',
        options: ['At the principal focus', 'At the centre of curvature (C)', 'Between focus and pole', 'Beyond centre of curvature'],
        correctOptionIndex: 1,
        explanation: 'When an object is placed at the centre of curvature (C) of a concave mirror, the reflected rays converge at C, producing a real, inverted image of magnification m = -1.',
        hint: 'Think where magnification m = -1 occurs.',
        marks: 4
      },
      {
        id: 'sci-q2',
        question: 'The unit of power of a lens is:',
        options: ['Meter', 'Dioptre', 'Centimeter', 'Lumen'],
        correctOptionIndex: 1,
        explanation: 'Power of a lens P = 1/f (f in meters). The SI unit of lens power is Dioptre (D), where 1 D = 1 m⁻¹.',
        hint: 'Symbol is D, reciprocal of focal length in meters.',
        marks: 4
      },
      {
        id: 'sci-q3',
        question: 'A ray of light traveling from a rarer medium to a denser medium will:',
        options: ['Bend away from the normal', 'Bend towards the normal', 'Travel undeviated', 'Reflect completely back'],
        correctOptionIndex: 1,
        explanation: 'As light enters an optically denser medium, its speed decreases, causing the ray to bend towards the normal.',
        hint: 'Speed slows down in denser medium.',
        marks: 4
      },
      {
        id: 'sci-q4',
        question: 'Magnification produced by a rear-view mirror fitted in vehicles is always:',
        options: ['Less than 1', 'More than 1', 'Equal to 1', 'Can be more or less depending on position'],
        correctOptionIndex: 0,
        explanation: 'Convex mirrors are used as rear-view mirrors because they always form a virtual, erect, and diminished (smaller) image, providing a wider field of view (m < 1).',
        hint: 'Rear-view mirrors are convex mirrors showing wide view with small images.',
        marks: 4
      }
    ]
  }
];

export const DEMO_REVIEWS: Review[] = [
  {
    id: 'r1',
    courseId: 'c10-math-complete',
    studentName: 'Aarav Sharma (Parent: Mr. R. Sharma)',
    classLevel: 10,
    rating: 5,
    comment: 'Anand Sir’s method of explaining proofs made Mathematics my son’s favorite subject. He scored 98/100 in his pre-board exams! The WhatsApp doubt assistance is unmatched.',
    date: 'February 12, 2025',
    isVerifiedStudent: true
  },
  {
    id: 'r2',
    courseId: 'c10-math-complete',
    studentName: 'Ananya Deshmukh',
    classLevel: 10,
    rating: 5,
    comment: 'The chapter-wise MCQ tests and 10-year PYQ video discussions gave me complete board exam readiness. Real Numbers and Trigonometry are now super easy for me.',
    date: 'January 28, 2025',
    isVerifiedStudent: true
  },
  {
    id: 'r3',
    courseId: 'c10-science-complete',
    studentName: 'Rohan Gupta',
    classLevel: 10,
    rating: 5,
    comment: 'Priya Ma’am’s Physics ray diagrams and Chemistry balancing tricks are legendary! The handwritten formula sheets saved me hours before examinations.',
    date: 'February 04, 2025',
    isVerifiedStudent: true
  },
  {
    id: 'r4',
    courseId: 'c12-math-calculus',
    studentName: 'Kavya Pillai',
    classLevel: 12,
    rating: 5,
    comment: 'Calculus in Class 12 was terrifying until I joined Medha Maths. Integration properties are explained with such crystal-clear intuition.',
    date: 'January 19, 2025',
    isVerifiedStudent: true
  }
];

export const FAQ_ITEMS = [
  {
    question: 'Which classes are available on Medha Maths?',
    answer: 'We provide structured online courses and study materials for school students from Class 6 to Class 12 across CBSE, ICSE, and major State Boards in India.'
  },
  {
    question: 'Which subjects are taught on the platform?',
    answer: 'Our core curriculum includes Mathematics, Science (Physics, Chemistry, Biology), English Language & Literature, Social Science (History, Geography, Civics, Economics), Hindi, and Computer Science / AI.'
  },
  {
    question: 'How do I purchase a course on Medha Maths?',
    answer: 'Simply click "Buy Now" on any course card or course details page. You can review the course summary, apply discount coupon codes (e.g. MEDHA100), and pay securely through Razorpay using UPI (GPay, PhonePe, Paytm), Credit/Debit Cards, or Net Banking.'
  },
  {
    question: 'How will I access my course after payment?',
    answer: 'Access is instantaneous! Immediately upon successful payment, the course is automatically unlocked in your Student Dashboard (/dashboard) with lifetime or full-academic year validity, including all video lectures, notes, and quizzes.'
  },
  {
    question: 'Can I study from mobile, tablet, and laptop?',
    answer: 'Yes! The Medha Maths platform is 100% responsive and optimized for smartphones, tablets, laptops, and desktops. You can learn anywhere, anytime with clean playback.'
  },
  {
    question: 'Which payment methods are supported via Razorpay?',
    answer: 'All major Indian payment methods are supported: UPI (Google Pay, PhonePe, Paytm, BHIM, CRED), Debit/Credit cards (Visa, Mastercard, RuPay), Net Banking from 50+ Indian banks, and digital wallets.'
  },
  {
    question: 'How long will I have course access?',
    answer: 'You receive full access for the entire academic session until your final board/annual school examinations are completed.'
  },
  {
    question: 'How can I clear my doubts during studies?',
    answer: 'Every course enrolled student gets access to our dedicated Teacher WhatsApp Doubt Support line where subject mentors resolve student questions within hours.'
  },
  {
    question: 'What is the refund policy?',
    answer: 'We offer a transparent 7-day satisfaction window. If you are not satisfied with the course quality within 7 days of purchase, you can contact our WhatsApp support team for assistance.'
  }
];

export const DEMO_ORDERS: PurchaseOrder[] = [
  {
    id: 'ORD-98421',
    studentId: 'usr-1',
    studentName: 'Aarav Sharma',
    studentEmail: 'aarav.sharma@gmail.com',
    studentPhone: '+91 98765 43210',
    courseId: 'c10-math-complete',
    courseTitle: 'Class 10 CBSE Complete Mathematics 100/100 Board Mastery Course (2025-26)',
    amount: 999,
    originalAmount: 2499,
    discountAmount: 1500,
    paymentId: 'pay_Rzp98214a1',
    orderStatus: 'paid',
    paymentMethod: 'upi',
    date: '2025-02-18 14:32'
  },
  {
    id: 'ORD-98420',
    studentId: 'usr-2',
    studentName: 'Ananya Deshmukh',
    studentEmail: 'ananya.desh@gmail.com',
    studentPhone: '+91 91234 56780',
    courseId: 'c10-science-complete',
    courseTitle: 'Class 10 Science Board Exam Booster',
    amount: 899,
    originalAmount: 2299,
    discountAmount: 1400,
    paymentId: 'pay_Rzp77231b2',
    orderStatus: 'paid',
    paymentMethod: 'upi',
    date: '2025-02-17 11:15'
  },
  {
    id: 'ORD-98419',
    studentId: 'usr-3',
    studentName: 'Kavya Pillai',
    studentEmail: 'kavya.p@outlook.com',
    studentPhone: '+91 99887 76655',
    courseId: 'c12-math-calculus',
    courseTitle: 'Class 12 Mathematics: Calculus, Vectors & 3D Geometry Score Booster',
    amount: 1299,
    originalAmount: 2999,
    discountAmount: 1700,
    paymentId: 'pay_Rzp55110c3',
    orderStatus: 'paid',
    paymentMethod: 'card',
    date: '2025-02-16 18:45'
  },
  {
    id: 'ORD-98418',
    studentId: 'usr-4',
    studentName: 'Rohan Gupta',
    studentEmail: 'rohan.g@yahoo.com',
    studentPhone: '+91 98450 12345',
    courseId: 'c9-math-foundation',
    courseTitle: 'Class 9 Mathematics Foundation & High School Bridge Course',
    amount: 799,
    originalAmount: 1999,
    discountAmount: 1200,
    paymentId: 'pay_Rzp33991d4',
    orderStatus: 'paid',
    paymentMethod: 'netbanking',
    date: '2025-02-15 09:20'
  }
];

export const INITIAL_USER_PROFILE: UserProfile = {
  id: 'usr-student-demo',
  fullName: 'Arjun Kumar',
  email: 'arjun.student@medhamaths.in',
  phone: '+91 98765 00112',
  classLevel: 10,
  avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&auto=format&fit=crop&q=80',
  joinedDate: 'January 2025',
  role: 'student',
  enrolledCourseIds: ['c10-math-complete'],
  completedLessonIds: ['c10-m1-l1', 'c10-m1-l2'],
  purchasedMaterialIds: ['sm-c10-math-formulas'],
  quizAttempts: [
    {
      id: 'att-1',
      quizId: 'q-c10-m1',
      quizTitle: 'Class 10 Real Numbers & Polynomials Board High-Yield MCQ Test',
      score: 16,
      totalMarks: 20,
      percentage: 80,
      timeSpentSeconds: 480,
      date: '2025-02-14',
      answers: { q1: 1, q2: 1, q3: 1, q4: 1, q5: 0 },
      isPassed: true
    }
  ]
};
