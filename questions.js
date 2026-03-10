function shuffleArray(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function pickRandom(arr, count, exclude = []) {
  const filtered = arr.filter((item) => !exclude.includes(item));
  return shuffleArray(filtered).slice(0, count);
}

function buildMCQQuestion(question, correctAnswer, pool, explanation) {
  const wrongAnswers = pickRandom(pool, 3, [correctAnswer]);
  const answers = shuffleArray([correctAnswer, ...wrongAnswers]);
  return {
    question,
    answers,
    correct: answers.indexOf(correctAnswer),
    explanation
  };
}

function makeOneWayCategory(items, questionBuilder, explanationBuilder) {
  const pool = items.map((x) => x.answer);
  return items.map((item) =>
    buildMCQQuestion(
      questionBuilder(item),
      item.answer,
      pool,
      explanationBuilder(item)
    )
  );
}

function makeTwoWayCategory(items, q1, e1, q2, e2) {
  const poolA = items.map((x) => x.answer);
  const poolB = items.map((x) => x.question);

  const forward = items.map((item) =>
    buildMCQQuestion(q1(item), item.answer, poolA, e1(item))
  );

  const reverse = items.map((item) =>
    buildMCQQuestion(q2(item), item.question, poolB, e2(item))
  );

  return [...forward, ...reverse];
}

const kuwaitFacts = [
  { question: "عاصمة دولة الكويت", answer: "مدينة الكويت" },
  { question: "العملة الرسمية في الكويت", answer: "الدينار الكويتي" },
  { question: "عدد محافظات الكويت", answer: "6" },
  { question: "أكبر جزيرة كويتية", answer: "بوبيان" },
  { question: "أشهر جزيرة مأهولة تاريخياً", answer: "فيلكا" },
  { question: "المسطح المائي الذي تطل عليه الكويت", answer: "الخليج العربي" },
  { question: "اللغة الرسمية في الكويت", answer: "العربية" },
  { question: "السلطة التشريعية في الكويت", answer: "مجلس الأمة" },
  { question: "القارة التي تقع فيها الكويت", answer: "آسيا" },
  { question: "لون الجزء شبه المنحرف في علم الكويت", answer: "الأسود" },
  { question: "عدد ألوان علم الكويت", answer: "4" },
  { question: "أكبر محافظات الكويت مساحة", answer: "الجهراء" },
  { question: "المحافظة التي تضم كثيراً من الجزر الكويتية", answer: "الجهراء" },
  { question: "المدينة التي توجد فيها الأبراج الكويتية", answer: "مدينة الكويت" },
  { question: "الجهة الحكومية المسؤولة عن التشريع والرقابة شعبياً", answer: "مجلس الأمة" },
  { question: "مطار الكويت الدولي يقع في محافظة", answer: "الفروانية" },
  { question: "من أشهر الأبراج في الكويت", answer: "الأبراج الكويتية" },
  { question: "اسم المنطقة المعروفة بالأسواق القديمة في العاصمة", answer: "سوق المباركية" },
  { question: "أكبر مصدر دخل تاريخي للكويت الحديثة", answer: "النفط" },
  { question: "الجهة الشمالية من الكويت تطل على دولة", answer: "العراق" },
  { question: "الجهة الجنوبية من الكويت تطل على دولة", answer: "السعودية" },
  { question: "رمز الاتصال الدولي للكويت يبدأ بـ", answer: "+965" },
  { question: "المجلس البلدي يهتم غالباً بشؤون", answer: "التنظيم العمراني" },
  { question: "العملة الكويتية تتكون من 1000", answer: "فلس" },
  { question: "من أشهر المعالم الساحلية في الكويت", answer: "الأبراج الكويتية" }
];

const islamFacts = [
  { question: "عدد أركان الإسلام", answer: "5" },
  { question: "عدد أركان الإيمان", answer: "6" },
  { question: "أول سورة في القرآن الكريم", answer: "الفاتحة" },
  { question: "أطول سورة في القرآن الكريم", answer: "البقرة" },
  { question: "الشهر الذي يصوم فيه المسلمون", answer: "رمضان" },
  { question: "عدد الصلوات المفروضة", answer: "5" },
  { question: "قبلة المسلمين", answer: "الكعبة" },
  { question: "خاتم الأنبياء", answer: "محمد ﷺ" },
  { question: "المدينة التي بدأ فيها الوحي", answer: "مكة" },
  { question: "ليلة نزل فيها القرآن", answer: "ليلة القدر" },
  { question: "فرض الحج على المسلم القادر كم مرة", answer: "مرة واحدة" },
  { question: "اسم الزكاة الواجبة عند الفطر", answer: "زكاة الفطر" },
  { question: "الصلاة التي تكون في منتصف النهار", answer: "الظهر" },
  { question: "الصلاة التي تكون بعد غروب الشمس مباشرة", answer: "المغرب" },
  { question: "الصلاة التي تكون قبل شروق الشمس", answer: "الفجر" },
  { question: "الركن الذي يكون بزيارة بيت الله الحرام", answer: "الحج" },
  { question: "الركن المتعلق بإخراج المال الواجب", answer: "الزكاة" },
  { question: "الركن الذي يكون بقول الشهادتين", answer: "الشهادتان" },
  { question: "اسم الكتاب المقدس في الإسلام", answer: "القرآن الكريم" },
  { question: "المدينة التي هاجر إليها النبي ﷺ", answer: "المدينة المنورة" },
  { question: "عدد أيام الأسبوع", answer: "7" },
  { question: "الصلاة التي تكون في آخر الليل", answer: "العشاء" },
  { question: "أعظم ليلة في رمضان", answer: "ليلة القدر" },
  { question: "لغة القرآن الكريم", answer: "العربية" },
  { question: "الشهر الذي يسبق رمضان", answer: "شعبان" },
  { question: "الملك الموكل بنفخ الصور", answer: "إسرافيل" },
  { question: "الملك الموكل بالوحي", answer: "جبريل" },
  { question: "اليوم الذي يجتمع فيه المسلمون لصلاة جماعة أسبوعية", answer: "الجمعة" },
  { question: "العبادة التي تكون بالإمساك عن المفطرات", answer: "الصيام" },
  { question: "الصلاة الوسطى عند كثير من العلماء", answer: "العصر" }
];

const prophetsFacts = [
  { question: "النبي الذي ابتلعه الحوت", answer: "يونس عليه السلام" },
  { question: "أبو الأنبياء", answer: "إبراهيم عليه السلام" },
  { question: "كليم الله", answer: "موسى عليه السلام" },
  { question: "النبي الذي صنع السفينة", answer: "نوح عليه السلام" },
  { question: "النبي الذي صبر على المرض", answer: "أيوب عليه السلام" },
  { question: "النبي الذي سخر الله له الريح", answer: "سليمان عليه السلام" },
  { question: "أول نبي", answer: "آدم عليه السلام" },
  { question: "النبي الذي فتن به نسوة المدينة", answer: "يوسف عليه السلام" },
  { question: "النبي الذي انشق له البحر", answer: "موسى عليه السلام" },
  { question: "النبي الذي رفعه الله إليه", answer: "عيسى عليه السلام" },
  { question: "النبي الذي كان نجاراً وصنع السفينة", answer: "نوح عليه السلام" },
  { question: "النبي الذي دعا قومه ألف سنة إلا خمسين عاماً", answer: "نوح عليه السلام" },
  { question: "النبي الذي بُشر به يحيى", answer: "زكريا عليه السلام" },
  { question: "النبي الذي أوتي ملكاً عظيماً مع الحكمة", answer: "سليمان عليه السلام" },
  { question: "النبي الذي ألقاه إخوته في الجب", answer: "يوسف عليه السلام" },
  { question: "النبي الذي ابتلاه الله بذبح ابنه في الرؤيا", answer: "إبراهيم عليه السلام" },
  { question: "النبي الذي تكلم في المهد دفاعاً عن أمه", answer: "عيسى عليه السلام" },
  { question: "النبي الذي أُرسل إلى عاد", answer: "هود عليه السلام" },
  { question: "النبي الذي أُرسل إلى ثمود", answer: "صالح عليه السلام" },
  { question: "النبي الذي كان يعمل في رعي الغنم ثم أصبح ملكاً", answer: "داود عليه السلام" },
  { question: "النبي الذي أوتي الزبور", answer: "داود عليه السلام" },
  { question: "ابن إبراهيم عليه السلام الذي رفع القواعد من البيت معه", answer: "إسماعيل عليه السلام" },
  { question: "النبي الذي لقبه الله بروح منه وكلمة منه", answer: "عيسى عليه السلام" },
  { question: "النبي الذي طلب رؤية الله", answer: "موسى عليه السلام" },
  { question: "النبي الذي خرج من بطن الحوت بعد الدعاء", answer: "يونس عليه السلام" }
];

const capitalsFacts = [
  { question: "فرنسا", answer: "باريس" },
  { question: "السعودية", answer: "الرياض" },
  { question: "مصر", answer: "القاهرة" },
  { question: "اليابان", answer: "طوكيو" },
  { question: "تركيا", answer: "أنقرة" },
  { question: "بريطانيا", answer: "لندن" },
  { question: "الإمارات", answer: "أبوظبي" },
  { question: "إيطاليا", answer: "روما" },
  { question: "ألمانيا", answer: "برلين" },
  { question: "الأردن", answer: "عمّان" },
  { question: "الكويت", answer: "مدينة الكويت" },
  { question: "العراق", answer: "بغداد" },
  { question: "سوريا", answer: "دمشق" },
  { question: "لبنان", answer: "بيروت" },
  { question: "قطر", answer: "الدوحة" },
  { question: "البحرين", answer: "المنامة" },
  { question: "عُمان", answer: "مسقط" },
  { question: "اليمن", answer: "صنعاء" },
  { question: "المغرب", answer: "الرباط" },
  { question: "الجزائر", answer: "الجزائر" },
  { question: "تونس", answer: "تونس" },
  { question: "ليبيا", answer: "طرابلس" },
  { question: "السودان", answer: "الخرطوم" },
  { question: "موريتانيا", answer: "نواكشوط" },
  { question: "الصومال", answer: "مقديشو" },
  { question: "فلسطين", answer: "القدس" },
  { question: "إسبانيا", answer: "مدريد" },
  { question: "البرتغال", answer: "لشبونة" },
  { question: "اليونان", answer: "أثينا" },
  { question: "هولندا", answer: "أمستردام" },
  { question: "بلجيكا", answer: "بروكسل" },
  { question: "سويسرا", answer: "برن" },
  { question: "النمسا", answer: "فيينا" },
  { question: "روسيا", answer: "موسكو" },
  { question: "الصين", answer: "بكين" },
  { question: "الهند", answer: "نيودلهي" },
  { question: "باكستان", answer: "إسلام آباد" },
  { question: "إندونيسيا", answer: "جاكرتا" },
  { question: "ماليزيا", answer: "كوالالمبور" },
  { question: "كوريا الجنوبية", answer: "سيول" },
  { question: "تايلند", answer: "بانكوك" },
  { question: "الفلبين", answer: "مانيلا" },
  { question: "أستراليا", answer: "كانبرا" },
  { question: "كندا", answer: "أوتاوا" },
  { question: "الولايات المتحدة", answer: "واشنطن" },
  { question: "المكسيك", answer: "مكسيكو سيتي" },
  { question: "البرازيل", answer: "برازيليا" },
  { question: "الأرجنتين", answer: "بوينس آيرس" },
  { question: "جنوب أفريقيا", answer: "بريتوريا" },
  { question: "نيجيريا", answer: "أبوجا" }
];

const geographyFacts = [
  { question: "أكبر قارة في العالم", answer: "آسيا" },
  { question: "أصغر قارة في العالم", answer: "أستراليا" },
  { question: "أكبر محيط في العالم", answer: "المحيط الهادئ" },
  { question: "أطول نهر في العالم", answer: "النيل" },
  { question: "أكبر صحراء حارة في العالم", answer: "الصحراء الكبرى" },
  { question: "القارة التي تقع فيها البرازيل", answer: "أمريكا الجنوبية" },
  { question: "القارة التي تقع فيها مصر", answer: "أفريقيا" },
  { question: "القارة المتجمدة الجنوبية", answer: "أنتاركتيكا" },
  { question: "أعلى جبل في العالم", answer: "إيفرست" },
  { question: "البحر الذي يفصل بين أفريقيا وآسيا", answer: "البحر الأحمر" },
  { question: "المحيط بين آسيا وأمريكا الشمالية", answer: "المحيط الهادئ" },
  { question: "أكبر دولة في العالم مساحة", answer: "روسيا" },
  { question: "الدولة التي يمر فيها نهر النيل ويصب في شمالها", answer: "مصر" },
  { question: "القارة التي تقع فيها فرنسا", answer: "أوروبا" },
  { question: "القارة التي تقع فيها اليابان", answer: "آسيا" },
  { question: "أكبر محيط بعد الهادئ", answer: "المحيط الأطلسي" },
  { question: "البحر المغلق بين أوروبا وأفريقيا وآسيا", answer: "البحر المتوسط" },
  { question: "الدولة المعروفة بأرض الكنغر", answer: "أستراليا" },
  { question: "النهر الذي يمر في العراق", answer: "دجلة" },
  { question: "النهر الآخر المشهور في العراق", answer: "الفرات" },
  { question: "القارة التي تقع فيها كندا", answer: "أمريكا الشمالية" },
  { question: "أطول سلسلة جبال برية في العالم", answer: "الأنديز" },
  { question: "الدولة التي تضم مكة والمدينة", answer: "السعودية" },
  { question: "البحر الذي تقع عليه الكويت", answer: "الخليج العربي" },
  { question: "أكبر جزيرة في العالم", answer: "جرينلاند" },
  { question: "الدولة التي تشتهر بأهرامات الجيزة", answer: "مصر" },
  { question: "القارة التي تقع فيها الأرجنتين", answer: "أمريكا الجنوبية" },
  { question: "القارة التي تقع فيها الجزائر", answer: "أفريقيا" },
  { question: "الدولة التي تعتبر جسراً بين أوروبا وآسيا", answer: "تركيا" },
  { question: "المحيط الواقع شرق أفريقيا وغرب أستراليا", answer: "المحيط الهندي" },
  { question: "الدولة التي تشتهر ببرج إيفل", answer: "فرنسا" },
  { question: "الدولة التي تشتهر بجبال الألب مع عدة دول أخرى", answer: "سويسرا" },
  { question: "أكبر دولة عربية مساحة", answer: "الجزائر" },
  { question: "أعمق محيط في العالم", answer: "المحيط الهادئ" },
  { question: "الممر المائي الذي يربط البحر الأحمر بالبحر المتوسط", answer: "قناة السويس" }
];

const historyFacts = [
  { question: "الحضارة التي اشتهرت بالأهرامات", answer: "المصرية" },
  { question: "الحضارة التي عرفت الكتابة المسمارية", answer: "السومرية" },
  { question: "القائد المشهور المرتبط بتحرير القدس", answer: "صلاح الدين الأيوبي" },
  { question: "المدينة التي كانت مركز الدولة الرومانية", answer: "روما" },
  { question: "القارة التي ارتبطت بها الحربان العالميتان أساساً", answer: "أوروبا" },
  { question: "من بنى سور الصين العظيم", answer: "الصينيون" },
  { question: "الحضارة التي اشتهرت بفلاسفة مثل سقراط", answer: "اليونانية" },
  { question: "الاسم التاريخي للمنطقة بين دجلة والفرات", answer: "بلاد الرافدين" },
  { question: "وسيلة حفظ المعرفة قبل الطباعة الواسعة", answer: "المخطوطات" },
  { question: "العالم الجديد كان يطلق على", answer: "أمريكا" },
  { question: "القائد المسلم الذي فتح الأندلس", answer: "طارق بن زياد" },
  { question: "الرحالة المسلم المشهور بكثرة أسفاره", answer: "ابن بطوطة" },
  { question: "الحضارة التي بنت الكولوسيوم", answer: "الرومانية" },
  { question: "المدينة التي كانت عاصمة الخلافة العباسية", answer: "بغداد" },
  { question: "الدولة التي قامت فيها الثورة الفرنسية", answer: "فرنسا" },
  { question: "الحضارة التي اشتهرت بالمعابد والبرديات", answer: "المصرية" },
  { question: "القائد الذي اشتهر بعبور جبال الألب", answer: "هانيبال" },
  { question: "الدولة التي انطلقت منها النهضة الأوروبية بقوة", answer: "إيطاليا" },
  { question: "الحضارة التي ارتبطت بمدينة أثينا", answer: "اليونانية" },
  { question: "الحضارة التي عرفت بالجنائن المعلقة", answer: "البابلية" },
  { question: "المكتشف الأوروبي المرتبط بالوصول إلى أمريكا", answer: "كريستوفر كولومبوس" },
  { question: "العاصمة التاريخية للأمويين", answer: "دمشق" },
  { question: "العاصمة التاريخية للعباسيين", answer: "بغداد" },
  { question: "من أشهر الخلفاء الراشدين بعد أبي بكر", answer: "عمر بن الخطاب" },
  { question: "المدينة التي كانت مركز حضارة الفراعنة", answer: "ممفيس" },
  { question: "اسم الحرب الطويلة بين بريطانيا وفرنسا قديماً", answer: "حرب المئة عام" },
  { question: "الشعب الذي بنى حضارة الأنكا", answer: "شعوب أمريكا الجنوبية" },
  { question: "الحضارة التي ارتبطت بمدينة سبارتا", answer: "اليونانية" },
  { question: "الكتاب الذي كتبه هيرودوت ويتعلق بالتاريخ", answer: "التواريخ" },
  { question: "المدينة التي اشتهرت بمكتبتها القديمة جداً", answer: "الإسكندرية" },
  { question: "المعركة التي هزم فيها المسلمون الفرس بقيادة سعد", answer: "القادسية" },
  { question: "المعركة التي ثبت فيها المسلمون في بداية الإسلام الكبرى", answer: "بدر" },
  { question: "المدينة التي انتهت فيها دولة الأندلس الإسلامية", answer: "غرناطة" },
  { question: "القائد المقدوني الشهير بفتوحاته الواسعة", answer: "الإسكندر الأكبر" },
  { question: "الحضارة التي عرفت بالهرم المدرج", answer: "المصرية" }
];

const scienceFacts = [
  { question: "الكوكب الأحمر", answer: "المريخ" },
  { question: "أقرب كوكب إلى الشمس", answer: "عطارد" },
  { question: "الكوكب الأكبر في المجموعة الشمسية", answer: "المشتري" },
  { question: "العنصر الذي نتنفسه", answer: "الأكسجين" },
  { question: "العنصر الأساسي في الماء إلى جانب الأكسجين", answer: "الهيدروجين" },
  { question: "العضو الذي يضخ الدم في الجسم", answer: "القلب" },
  { question: "العضو المسؤول عن التنفس", answer: "الرئتان" },
  { question: "العضو المسؤول عن التفكير", answer: "الدماغ" },
  { question: "عملية صنع النبات لغذائه", answer: "البناء الضوئي" },
  { question: "الحالة التي يكون فيها الماء صلباً", answer: "ثلج" },
  { question: "مركز الذرة", answer: "النواة" },
  { question: "الوحدة الأساسية لقياس القوة", answer: "النيوتن" },
  { question: "العالم الذي اشتهر بالجاذبية", answer: "نيوتن" },
  { question: "العالم الذي وضع النظرية النسبية", answer: "أينشتاين" },
  { question: "اسم الغاز الضروري للاحتراق", answer: "الأكسجين" },
  { question: "عدد ألوان قوس قزح", answer: "7" },
  { question: "أسرع شيء معروف في الكون", answer: "الضوء" },
  { question: "الكوكب الذي نعيش عليه", answer: "الأرض" },
  { question: "أكبر عضو في جسم الإنسان", answer: "الجلد" },
  { question: "العضو الذي ينقي الدم غالباً", answer: "الكليتان" },
  { question: "نوع الدماغ الذي يتحكم بالتوازن غالباً", answer: "المخيخ" },
  { question: "الجزء الذي نرى به", answer: "العين" },
  { question: "الجزء الذي نسمع به", answer: "الأذن" },
  { question: "العالم الذي ارتبط باكتشاف البنسلين", answer: "ألكسندر فليمنغ" },
  { question: "أداة قياس درجة الحرارة", answer: "الترمومتر" },
  { question: "الحيوان الذي يُعد من الثدييات البحرية", answer: "الحوت" },
  { question: "المادة التي تجذب الحديد", answer: "المغناطيس" },
  { question: "الوحدة الأساسية لقياس الزمن", answer: "الثانية" },
  { question: "الكوكب المعروف بحلقاته", answer: "زحل" },
  { question: "ما الذي يغلي عند 100 درجة مئوية غالباً", answer: "الماء" },
  { question: "العضو المسؤول غالباً عن هضم الطعام", answer: "المعدة" },
  { question: "النجم الذي يمد الأرض بالضوء والحرارة", answer: "الشمس" },
  { question: "الجزء الأخضر في النبات المسؤول عن البناء الضوئي", answer: "الكلوروفيل" },
  { question: "الوحدة الأساسية لبناء الكائن الحي", answer: "الخلية" },
  { question: "العظم الذي يحمي الدماغ", answer: "الجمجمة" }
];

const sportsFacts = [
  { question: "عدد لاعبي كرة القدم داخل الملعب للفريق", answer: "11" },
  { question: "المدة الأصلية لمباراة كرة القدم", answer: "90 دقيقة" },
  { question: "لون بطاقة الطرد", answer: "الحمراء" },
  { question: "عدد أشواط كرة القدم", answer: "2" },
  { question: "اللعبة التي يوجد فيها سلة", answer: "كرة السلة" },
  { question: "عدد لاعبي كرة السلة داخل الملعب للفريق", answer: "5" },
  { question: "الركلة التي تبدأ بها المباراة", answer: "ركلة البداية" },
  { question: "اللعبة التي تستخدم فيها مضرباً وكرة صفراء صغيرة", answer: "التنس" },
  { question: "الجزء الذي لا يجوز لمسه عمداً للاعب الميدان", answer: "اليد" },
  { question: "مدة شوط كرة اليد غالباً", answer: "30 دقيقة" },
  { question: "الرياضة التي فيها إرسال وشبكة ومضرب", answer: "التنس" },
  { question: "الرياضة التي فيها قفز فوق عارضة", answer: "القفز العالي" },
  { question: "الرياضة التي فيها ماء وممرات سباق", answer: "السباحة" },
  { question: "اللعبة التي تستخدم مضرباً صغيراً وطاولة", answer: "تنس الطاولة" },
  { question: "الرياضة التي فيها هدف وشباك وحارس", answer: "كرة القدم" },
  { question: "عدد لاعبي الكرة الطائرة داخل الملعب للفريق", answer: "6" },
  { question: "الأداة المستخدمة لضرب الكرة في الغولف", answer: "العصا" },
  { question: "الرياضة التي يكون فيها نزال داخل حلبة", answer: "الملاكمة" },
  { question: "الرياضة التي تعتمد على رمي الرمح", answer: "ألعاب القوى" },
  { question: "من أشهر المسابقات في الجري", answer: "100 متر" },
  { question: "الرياضة التي تشتهر ببطولة ويمبلدون", answer: "التنس" },
  { question: "عدد الحكام الرئيسيين غالباً في الساحة بكرة القدم", answer: "1" },
  { question: "إذا تجاوزت الكرة خط المرمى من المدافع غالباً يحصل المهاجم على", answer: "ركنية" },
  { question: "إذا لمس المدافع الكرة بيده في منطقته يحصل الخصم على", answer: "ركلة جزاء" },
  { question: "الرياضة التي تستخدم فيها خوذة غالباً مع دراجة", answer: "ركوب الدراجات" },
  { question: "الرياضة التي فيها حواجز وقفز سريع", answer: "110 متر حواجز" },
  { question: "الرياضة التي فيها بساط وحركات أرضية", answer: "الجمباز" },
  { question: "الرياضة التي فيها صد وإرسال وشبكة بلا مضرب", answer: "الكرة الطائرة" },
  { question: "الرياضة التي تشتهر ببطولة كأس العالم", answer: "كرة القدم" },
  { question: "عدد أشواط الكرة الطائرة في النظام الشائع للفوز", answer: "3 أشواط من 5" },
  { question: "المركز الذي يحرس المرمى", answer: "حارس المرمى" },
  { question: "الرياضة التي فيها حلبة وسيارات سرعة", answer: "سباقات السيارات" },
  { question: "الرياضة التي تعتمد على رفع الأثقال", answer: "رفع الأثقال" },
  { question: "الرياضة التي فيها مضمار وسباقات قصيرة وطويلة", answer: "ألعاب القوى" },
  { question: "الرياضة التي فيها ضربة إرسال ساحقة وشبكة ومضرب خفيف", answer: "الريشة الطائرة" }
];

const questionsData = {
  "الكويت": makeOneWayCategory(
    kuwaitFacts,
    (item) => `ما ${item.question}؟`,
    (item) => `الإجابة الصحيحة: ${item.answer}.`
  ),

  "الإسلام": makeOneWayCategory(
    islamFacts,
    (item) => `ما ${item.question}؟`,
    (item) => `الإجابة الصحيحة: ${item.answer}.`
  ),

  "الأنبياء": makeOneWayCategory(
    prophetsFacts,
    (item) => `من هو ${item.question}؟`,
    (item) => `الإجابة الصحيحة: ${item.answer}.`
  ),

  "العواصم": makeTwoWayCategory(
    capitalsFacts,
    (item) => `ما عاصمة ${item.question}؟`,
    (item) => `الإجابة الصحيحة: ${item.answer} هي عاصمة ${item.question}.`,
    (item) => `${item.answer} هي عاصمة أي دولة؟`,
    (item) => `الإجابة الصحيحة: ${item.question}.`
  ),

  "الجغرافيا": makeOneWayCategory(
    geographyFacts,
    (item) => `ما ${item.question}؟`,
    (item) => `الإجابة الصحيحة: ${item.answer}.`
  ),

  "التاريخ": makeOneWayCategory(
    historyFacts,
    (item) => `ما ${item.question}؟`,
    (item) => `الإجابة الصحيحة: ${item.answer}.`
  ),

  "العلوم": makeOneWayCategory(
    scienceFacts,
    (item) => `ما ${item.question}؟`,
    (item) => `الإجابة الصحيحة: ${item.answer}.`
  ),

  "الرياضة": makeOneWayCategory(
    sportsFacts,
    (item) => `ما ${item.question}؟`,
    (item) => `الإجابة الصحيحة: ${item.answer}.`
  )
};

function getAllQuestionsMerged() {
  return Object.keys(questionsData).flatMap((key) =>
    questionsData[key].map((q) => ({ ...q, sourceCategory: key }))
  );
}
