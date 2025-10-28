const Database = require('better-sqlite3');
const path = require('path');

try {
  const dbPath = path.join(__dirname, '..', 'site-settings.db');
  const db = new Database(dbPath);

  console.log('📦 إنشاء جدول الأسئلة الشائعة...');

  // Create FAQ table
  db.exec(`
    CREATE TABLE IF NOT EXISTS faq (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      question TEXT NOT NULL,
      answer TEXT NOT NULL,
      displayOrder INTEGER NOT NULL DEFAULT 0,
      isActive INTEGER NOT NULL DEFAULT 1,
      createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
      updatedAt TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Check if table has data
  const count = db.prepare('SELECT COUNT(*) as count FROM faq').get();
  
  if (count.count === 0) {
    console.log('📝 إضافة البيانات الافتراضية...');
    
    // Insert default FAQ items
    const defaultFAQs = [
      {
        question: 'ما هي المنصة وكيف تعمل؟',
        answer: 'منصتنا هي حلقة الوصل بينك وبين أفضل شركات التصميم والبناء في المملكة. نوفر لك دليلاً شاملاً للشركات المعتمدة مع إمكانية المقارنة والتواصل المباشر، بالإضافة إلى كاش باك 2% عند إتمام التعاقد.',
        displayOrder: 1
      },
      {
        question: 'كيف أحصل على الكاش باك؟',
        answer: 'عند إتمام التعاقد مع إحدى الشركات المعتمدة عبر منصتنا، ستحصل تلقائياً على كاش باك بنسبة 2% من قيمة العقد. يتم تحويل المبلغ إلى حسابك خلال 7 أيام عمل من تأكيد العقد.',
        displayOrder: 2
      },
      {
        question: 'هل الخدمة مجانية للمستخدمين؟',
        answer: 'نعم، استخدام المنصة مجاني بالكامل للمستخدمين. يمكنك تصفح الشركات، المقارنة بينها، والتواصل معها دون أي رسوم. بل نقدم لك كاش باك عند إتمام التعاقد!',
        displayOrder: 3
      },
      {
        question: 'كيف يتم اختيار الشركات المعتمدة؟',
        answer: 'نتبع معايير صارمة في اختيار الشركات المعتمدة، تشمل: التراخيص الرسمية، سجل الأعمال السابقة، تقييمات العملاء، والالتزام بمعايير الجودة. نراجع كل شركة بدقة قبل قبولها في المنصة.',
        displayOrder: 4
      },
      {
        question: 'ما هي الخدمات المتوفرة؟',
        answer: 'نوفر مجموعة شاملة من الخدمات تشمل: التصميم المعماري، التصميم الداخلي، الإشراف على التنفيذ، المقاولات العامة، التشطيبات، وأعمال الديكور. كل ذلك من خلال شركات معتمدة ومتخصصة.',
        displayOrder: 5
      },
      {
        question: 'هل يمكنني تقييم الشركات؟',
        answer: 'نعم، نشجع جميع عملائنا على تقييم تجربتهم مع الشركات بعد انتهاء المشروع. التقييمات تساعد المستخدمين الآخرين في اتخاذ قرارات مدروسة وتحفز الشركات على تقديم أفضل خدمة.',
        displayOrder: 6
      }
    ];

    const insertStmt = db.prepare(`
      INSERT INTO faq (question, answer, displayOrder)
      VALUES (?, ?, ?)
    `);

    for (const faq of defaultFAQs) {
      insertStmt.run(faq.question, faq.answer, faq.displayOrder);
    }

    console.log(`✅ تم إضافة ${defaultFAQs.length} سؤال افتراضي!`);
  } else {
    console.log('ℹ️  الجدول يحتوي بالفعل على بيانات');
  }

  console.log('✅ تم إنشاء جدول faq بنجاح!');
  
  db.close();
  process.exit(0);
} catch (error) {
  console.error('❌ حدث خطأ:', error.message);
  process.exit(1);
}
