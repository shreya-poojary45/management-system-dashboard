export interface Course {
  id: number;
  title: string;
  description: string;
  icon: string;
  level: 'مبتدئ' | 'متوسط' | 'متقدم';
  category: 'web' | 'app' | 'backend' | 'ai';
  duration: string;
  lessons: number;
  rating: number;
  students: number;
}

export interface QuizQuestion {
  q: string;
  options: string[];
  correct: number;
}

export interface Quiz {
  title: string;
  questions: QuizQuestion[];
}

export interface QuizResult {
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  userAnswers: (number | null)[];
  date: string;
}

export interface Message {
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
}

export interface User {
  username: string;
  email: string;
  joined: string;
}

export const coursesData: Course[] = [
  // Web Development Courses
  {
    id: 1,
    title: "HTML5 & CSS3 من الصفر",
    description: "تعلم أساسيات بناء صفحات الويب باستخدام HTML5 و CSS3 الحديثة",
    icon: "fab fa-html5",
    level: "مبتدئ",
    category: "web",
    duration: "10 ساعات",
    lessons: 15,
    rating: 4.9,
    students: 4500
  },
  {
    id: 2,
    title: "JavaScript المتقدم",
    description: "احترف JavaScript من المفاهيم الأساسية إلى البرمجة المتقدمة",
    icon: "fab fa-js",
    level: "متوسط",
    category: "web",
    duration: "20 ساعة",
    lessons: 25,
    rating: 4.8,
    students: 3800
  },
  {
    id: 3,
    title: "React.js الشامل",
    description: "بناء تطبيقات ويب تفاعلية باستخدام React.js و Hooks",
    icon: "fab fa-react",
    level: "متقدم",
    category: "web",
    duration: "25 ساعة",
    lessons: 30,
    rating: 4.9,
    students: 3200
  },
  // App Development Courses
  {
    id: 4,
    title: "Flutter للمبتدئين",
    description: "تعلم بناء تطبيقات الموبايل باستخدام Flutter و Dart",
    icon: "fas fa-mobile-alt",
    level: "مبتدئ",
    category: "app",
    duration: "18 ساعة",
    lessons: 22,
    rating: 4.7,
    students: 2800
  },
  {
    id: 5,
    title: "React Native المتقدم",
    description: "بناء تطبيقات أصلية لأندرويد وiOS باستخدام React Native",
    icon: "fab fa-react",
    level: "متقدم",
    category: "app",
    duration: "22 ساعة",
    lessons: 28,
    rating: 4.8,
    students: 2500
  },
  {
    id: 6,
    title: "Kotlin لأندرويد",
    description: "تطوير تطبيقات أندرويد احترافية باستخدام Kotlin",
    icon: "fab fa-android",
    level: "متوسط",
    category: "app",
    duration: "20 ساعة",
    lessons: 24,
    rating: 4.6,
    students: 2200
  },
  // Backend Development Courses
  {
    id: 7,
    title: "Node.js و Express",
    description: "بناء APIs قوية باستخدام Node.js و Express.js",
    icon: "fab fa-node-js",
    level: "متوسط",
    category: "backend",
    duration: "16 ساعة",
    lessons: 20,
    rating: 4.8,
    students: 3100
  },
  {
    id: 8,
    title: "Python Django",
    description: "تطوير تطبيقات ويب كاملة باستخدام Python و Django",
    icon: "fab fa-python",
    level: "متقدم",
    category: "backend",
    duration: "24 ساعة",
    lessons: 30,
    rating: 4.9,
    students: 2900
  },
  {
    id: 9,
    title: "قواعد البيانات SQL",
    description: "إتقان قواعد البيانات العلائقية و MySQL و PostgreSQL",
    icon: "fas fa-database",
    level: "مبتدئ",
    category: "backend",
    duration: "12 ساعة",
    lessons: 15,
    rating: 4.7,
    students: 4200
  },
  // AI Courses
  {
    id: 10,
    title: "تعلم الآلة للمبتدئين",
    description: "أساسيات تعلم الآلة والذكاء الاصطناعي",
    icon: "fas fa-brain",
    level: "مبتدئ",
    category: "ai",
    duration: "15 ساعة",
    lessons: 18,
    rating: 4.9,
    students: 5000
  },
  {
    id: 11,
    title: "التعلم العميق Deep Learning",
    description: "الشبكات العصبية والتعلم العميق باستخدام TensorFlow",
    icon: "fas fa-robot",
    level: "متقدم",
    category: "ai",
    duration: "28 ساعة",
    lessons: 35,
    rating: 4.8,
    students: 2800
  },
  {
    id: 12,
    title: "معالجة اللغة الطبيعية NLP",
    description: "تحليل النصوص وبناء روبوتات المحادثة",
    icon: "fas fa-comments",
    level: "متقدم",
    category: "ai",
    duration: "20 ساعة",
    lessons: 25,
    rating: 4.7,
    students: 2100
  },
];

export const quizzesData: Record<number, Quiz> = {
  1: {
    title: "اختبار HTML5 & CSS3",
    questions: [
      { q: "ما هو العنصر الصحيح لإنشاء رابط في HTML؟", options: ["<link>", "<a>", "<href>", "<url>"], correct: 1 },
      { q: "أي خاصية CSS تُستخدم لتغيير لون الخلفية؟", options: ["color", "bgcolor", "background-color", "background"], correct: 2 },
      { q: "ما هو العنصر الدلالي للتنقل في HTML5؟", options: ["<navigation>", "<nav>", "<menu>", "<header>"], correct: 1 },
      { q: "أي من التالي يُستخدم لإنشاء قائمة مرتبة في HTML؟", options: ["<ul>", "<li>", "<ol>", "<dl>"], correct: 2 },
      { q: "ما هي القيمة الافتراضية لخاصية position في CSS؟", options: ["relative", "absolute", "static", "fixed"], correct: 2 },
    ]
  },
  2: {
    title: "اختبار JavaScript",
    questions: [
      { q: "أي من التالي يُعلن عن متغير في JavaScript؟", options: ["var", "let", "const", "جميع ما سبق"], correct: 3 },
      { q: "ما هي نتيجة typeof []؟", options: ["array", "object", "list", "undefined"], correct: 1 },
      { q: "أي دالة تُستخدم لتحويل JSON إلى كائن JavaScript؟", options: ["JSON.parse()", "JSON.stringify()", "JSON.convert()", "JSON.toObject()"], correct: 0 },
      { q: "ما هي القيمة التي تُرجعها null == undefined؟", options: ["true", "false", "null", "undefined"], correct: 0 },
      { q: "أي من التالي يُنشئ Promise في JavaScript؟", options: ["new Promise()", "Promise.create()", "async Promise()", "Promise.new()"], correct: 0 },
    ]
  },
  3: {
    title: "اختبار React.js",
    questions: [
      { q: "ما هو Hook المستخدم لإدارة الحالة في المكونات الوظيفية؟", options: ["useEffect", "useState", "useContext", "useReducer"], correct: 1 },
      { q: "ما هو JSX؟", options: ["مكتبة JavaScript", "امتداد لغوي لـ JavaScript", "إطار عمل", "قاعدة بيانات"], correct: 1 },
      { q: "أي Hook يُستخدم للتعامل مع الآثار الجانبية؟", options: ["useState", "useEffect", "useMemo", "useRef"], correct: 1 },
      { q: "ما هي الطريقة الصحيحة لتمرير البيانات من المكون الأب إلى الابن؟", options: ["state", "props", "context", "redux"], correct: 1 },
      { q: "ما هو Virtual DOM؟", options: ["نسخة من DOM الحقيقي في الذاكرة", "DOM المتصفح", "قاعدة بيانات", "مكتبة CSS"], correct: 0 },
    ]
  },
  4: {
    title: "اختبار Flutter",
    questions: [
      { q: "ما هي لغة البرمجة المستخدمة في Flutter؟", options: ["Java", "Kotlin", "Dart", "Swift"], correct: 2 },
      { q: "ما هو Widget الأساسي للنصوص في Flutter؟", options: ["Label", "Text", "TextView", "String"], correct: 1 },
      { q: "أي Widget يُستخدم لترتيب العناصر عموديًا؟", options: ["Row", "Column", "Stack", "Container"], correct: 1 },
      { q: "ما هو الفرق بين StatelessWidget و StatefulWidget؟", options: ["لا فرق بينهما", "StatefulWidget يمكنه تغيير حالته", "StatelessWidget أسرع دائمًا", "StatefulWidget للويب فقط"], correct: 1 },
      { q: "أي أداة تُستخدم لإدارة الحالة في Flutter؟", options: ["setState فقط", "Provider", "كلاهما صحيح", "لا توجد إدارة حالة"], correct: 2 },
    ]
  },
  5: {
    title: "اختبار React Native",
    questions: [
      { q: "أي مكون يُستخدم لعرض قائمة طويلة في React Native؟", options: ["ScrollView", "FlatList", "ListView", "RecyclerView"], correct: 1 },
      { q: "ما هو المكون الأساسي للنصوص في React Native؟", options: ["<p>", "<Text>", "<span>", "<Label>"], correct: 1 },
      { q: "أي من التالي صحيح عن React Native؟", options: ["يستخدم WebView فقط", "ينتج تطبيقات أصلية", "يعمل على iOS فقط", "يتطلب Java"], correct: 1 },
      { q: "ما هو Bridge في React Native؟", options: ["مكتبة CSS", "جسر بين JavaScript والكود الأصلي", "أداة اختبار", "محرر أكواد"], correct: 1 },
      { q: "أي ملف يُستخدم لتكوين مشروع React Native؟", options: ["config.js", "package.json", "app.json", "settings.json"], correct: 2 },
    ]
  },
  6: {
    title: "اختبار Kotlin",
    questions: [
      { q: "ما هي الكلمة المفتاحية لإنشاء متغير غير قابل للتغيير في Kotlin؟", options: ["var", "val", "const", "final"], correct: 1 },
    ]
  },
  7: {
    title: "اختبار Node.js",
    questions: [
      { q: "ما هو مدير الحزم الافتراضي لـ Node.js؟", options: ["yarn", "npm", "bower", "pip"], correct: 1 },
    ]
  },
  8: {
    title: "اختبار Django",
    questions: [
      { q: "ما هو نمط التصميم الذي يتبعه Django؟", options: ["MVC", "MVP", "MVT", "MVVM"], correct: 2 },
    ]
  },
  9: {
    title: "اختبار SQL",
    questions: [
      { q: "أي أمر SQL يُستخدم لاسترجاع البيانات؟", options: ["GET", "SELECT", "FETCH", "RETRIEVE"], correct: 1 },
    ]
  },
  10: {
    title: "اختبار تعلم الآلة",
    questions: [
      { q: "ما هو التعلم الخاضع للإشراف؟", options: ["تعلم بدون بيانات", "تعلم مع بيانات موسومة", "تعلم ذاتي", "لا شيء مما سبق"], correct: 1 },
    ]
  },
  11: {
    title: "اختبار التعلم العميق",
    questions: [
      { q: "ما هي الشبكة العصبية الأكثر استخداماً لتصنيف الصور؟", options: ["RNN", "CNN", "GAN", "Transformer"], correct: 1 },
    ]
  },
  12: {
    title: "اختبار NLP",
    questions: [
      { q: "ما هو Tokenization؟", options: ["تشفير النص", "تقسيم النص إلى وحدات", "ترجمة النص", "ضغط النص"], correct: 1 },
    ]
  },
};
