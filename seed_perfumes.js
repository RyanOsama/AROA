const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding brands and products...');

  // 1. Create Brands
  const brandsData = [
    {
      name: 'ديور (Dior)',
      description: 'دار أزياء وعطور فرنسية فاخرة تأسست عام 1946 وتشتهر بأرقى الابتكارات العطرية.',
      logoUrl: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&q=80',
    },
    {
      name: 'شانيل (Chanel)',
      description: 'أيقونة الفخامة الباريسية وواحدة من أشهر العلامات التجارية العالمية في عالم العطور.',
      logoUrl: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=400&q=80',
    },
    {
      name: 'توم فورد (Tom Ford)',
      description: 'علامة أمريكية رائدة تتميز بالعطور الجريئة والخلطات الشرقية والغربية الفاخرة.',
      logoUrl: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=400&q=80',
    },
    {
      name: 'كريد (Creed)',
      description: 'دار عطور ملكية عريقة تأسست في لندن عام 1760 وتقدم عطوراً نادرة وحصرية.',
      logoUrl: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400&q=80',
    },
    {
      name: 'أمواج (Amouage)',
      description: 'دار عطور دولية فاخرة نشأت في سلطنة عُمان تشتهر بأندر أنواع اللبان والمر والروائح الشرقية.',
      logoUrl: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400&q=80',
    },
  ];

  const brandMap = {};
  for (const b of brandsData) {
    const createdBrand = await prisma.brand.upsert({
      where: { name: b.name },
      update: b,
      create: b,
    });
    brandMap[b.name] = createdBrand.id;
  }

  // 2. Create 10 Luxury Perfumes
  const products = [
    {
      name: 'سوفاج إليكسير (Sauvage Elixir)',
      description: 'عطر مركز وفائق القوة يمزج بين انتعاش الحمضيات وجرأة التوابل الحارة وقاعدة خشبية آسرة تجسد الرجولة المطلقة.',
      price: 680,
      originalPrice: 750,
      imageUrl: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=800&q=80',
      galleryUrls: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=800&q=80,https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&q=80',
      isAvailable: true,
      isPackage: false,
      topNotes: 'القرفة، جوزة الطيب، الهيل، الجريب فروت',
      heartNotes: 'اللافندر الفرنسي الفاخر',
      baseNotes: 'خشب الصندل، العنبر، نجيل الهند، الباتشولي',
      originCountry: 'فرنسا',
      gender: 'رجالي',
      size: '100 مل',
      perfumeType: 'Parfum',
      sku: 'DIOR-SV-001',
      brandId: brandMap['ديور (Dior)'],
    },
    {
      name: 'ميس ديور بلومينغ بوكيه (Miss Dior Blooming Bouquet)',
      description: 'باقة زهرية رقيقة تعكس بهجة الربيع مع لمسات ناعمة من الفاوانيا والورد والمسك الأبيض الخفيف.',
      price: 520,
      originalPrice: 590,
      imageUrl: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=800&q=80',
      galleryUrls: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=800&q=80',
      isAvailable: true,
      isPackage: false,
      topNotes: 'المندرين الصقلي، البازلاء الحلوة',
      heartNotes: 'الفاوانيا الوردية، الورد الدمشقي',
      baseNotes: 'المسك الأبيض الناعم',
      originCountry: 'فرنسا',
      gender: 'نسائي',
      size: '100 مل',
      perfumeType: 'Eau de Toilette',
      sku: 'DIOR-MD-002',
      brandId: brandMap['ديور (Dior)'],
    },
    {
      name: 'بلو دي شانيل بارفيوم (Bleu de Chanel Parfum)',
      description: 'تعبير نقي عن العزم والأناقة الخالدة بتركيبة خشبية أروماتيكية تفيض بالجاذبية والغموض.',
      price: 690,
      originalPrice: 760,
      imageUrl: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800&q=80',
      galleryUrls: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800&q=80',
      isAvailable: true,
      isPackage: false,
      topNotes: 'قشر الليمون، البرغموت، النعناع، الشيح',
      heartNotes: 'الخزامى، إبرة الراعي، الملاحظات الخضراء، الأناناس',
      baseNotes: 'خشب الصندل الكاليدوني، خشب الأرز، خشب العنبر، التونكا',
      originCountry: 'فرنسا',
      gender: 'رجالي',
      size: '100 مل',
      perfumeType: 'Parfum',
      sku: 'CHANEL-BDC-003',
      brandId: brandMap['شانيل (Chanel)'],
    },
    {
      name: 'كوكو مادموزيل إنتنس (Coco Mademoiselle Intense)',
      description: 'جوهر المرأة الحرة والجريئة بنفحات شرقية خشبية عميقة معززة بجرعة مضاعفة من الباتشولي والفانيليا.',
      price: 660,
      originalPrice: 720,
      imageUrl: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800&q=80',
      galleryUrls: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800&q=80',
      isAvailable: true,
      isPackage: false,
      topNotes: 'البرتقال الصقلي، البرغموت الكالابري، الليمون',
      heartNotes: 'الورد، الياسمين، نفحات الفواكه الاستوائية',
      baseNotes: 'الباتشولي الإندونيسي، حبوب التونكا، الفانيليا مدغشقر، المسك الأبيض',
      originCountry: 'فرنسا',
      gender: 'نسائي',
      size: '100 مل',
      perfumeType: 'Eau de Parfum',
      sku: 'CHANEL-CM-004',
      brandId: brandMap['شانيل (Chanel)'],
    },
    {
      name: 'توباكو فانيلا (Tobacco Vanille)',
      description: 'عطر كلاسيكي دافئ وفخم مستوحى من أندية السادة الإنجليزية القديمة برائحة التبغ العطري والتوابل الحلوة.',
      price: 1150,
      originalPrice: 1300,
      imageUrl: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?w=800&q=80',
      galleryUrls: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?w=800&q=80',
      isAvailable: true,
      isPackage: false,
      topNotes: 'أوراق التبغ، نفحات التوابل العطرية',
      heartNotes: 'حبوب التونكا، زهر التبغ، الفانيليا، الكاكاو',
      baseNotes: 'الفواكه المجففة، النوتات الخشبية الدافئة',
      originCountry: 'الولايات المتحدة',
      gender: 'للجنسين',
      size: '100 مل',
      perfumeType: 'Eau de Parfum',
      sku: 'TF-TV-005',
      brandId: brandMap['توم فورد (Tom Ford)'],
    },
    {
      name: 'عود وود (Oud Wood)',
      description: 'أحد أكثر العطور تميزاً وفخامة يجمع بين خشب العود النادر وخشب الورد الصيني والهيل بلمسة دخانية ساحرة.',
      price: 1200,
      originalPrice: 1350,
      imageUrl: 'https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=800&q=80',
      galleryUrls: 'https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=800&q=80',
      isAvailable: true,
      isPackage: false,
      topNotes: 'خشب الورد، الحبهان، الفلفل الصيني',
      heartNotes: 'العود، خشب الصندل، نجيل الهند',
      baseNotes: 'حبوب التونكا، الفانيليا، الكهرمان العنبري',
      originCountry: 'الولايات المتحدة',
      gender: 'للجنسين',
      size: '100 مل',
      perfumeType: 'Eau de Parfum',
      sku: 'TF-OW-006',
      brandId: brandMap['توم فورد (Tom Ford)'],
    },
    {
      name: 'أفنتوس (Aventus)',
      description: 'العطر الأسطوري الذي يحتفل بالقوة والنجاح والرؤية المستقبلية بمزيج منعش وفاكهي خشبي لا يقاوم.',
      price: 1350,
      originalPrice: 1480,
      imageUrl: 'https://images.unsplash.com/photo-1615397349754-cfa2066a298e?w=800&q=80',
      galleryUrls: 'https://images.unsplash.com/photo-1615397349754-cfa2066a298e?w=800&q=80',
      isAvailable: true,
      isPackage: false,
      topNotes: 'الأناناس، البرغموت، الكشمش الأسود، التفاح الفرنسي',
      heartNotes: 'أخشاب البتولا، الباتشولي، الياسمين المغربي، الورد',
      baseNotes: 'المسك، طحلب البلوط، الآمبرغريس، الفانيليا',
      originCountry: 'فرنسا',
      gender: 'رجالي',
      size: '100 مل',
      perfumeType: 'Eau de Parfum',
      sku: 'CR-AV-007',
      brandId: brandMap['كريد (Creed)'],
    },
    {
      name: 'سيلفر ماونتن ووتر (Silver Mountain Water)',
      description: 'مستوحى من نقاء ووضوح ينابيع جبال الألب السويسرية المتدفقة برائحة الشاي الأخضر والكشمش الأسود المنعش.',
      price: 1100,
      originalPrice: 1220,
      imageUrl: 'https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?w=800&q=80',
      galleryUrls: 'https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?w=800&q=80',
      isAvailable: true,
      isPackage: false,
      topNotes: 'البرغموت، اليوسفي',
      heartNotes: 'الشاي الأخضر، براعم الكشمش الأسود',
      baseNotes: 'المسك، خشب الصندل، أوراق البرتقال المر، الجلبانوم',
      originCountry: 'فرنسا',
      gender: 'للجنسين',
      size: '100 مل',
      perfumeType: 'Eau de Parfum',
      sku: 'CR-SMW-008',
      brandId: brandMap['كريد (Creed)'],
    },
    {
      name: 'إنترلود مان (Interlude Man - The Blue Beast)',
      description: 'يُلقب بـ "الوحش الأزرق" لقوته الاستثنائية وثباته الخارق، مزيج دخاني بلسمي من أجود أنواع اللبان العماني والعود.',
      price: 1280,
      originalPrice: 1400,
      imageUrl: 'https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?w=800&q=80',
      galleryUrls: 'https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?w=800&q=80',
      isAvailable: true,
      isPackage: false,
      topNotes: 'الزعتر، الفلفل الإفرنجي، البرغموت',
      heartNotes: 'اللبان العُماني النقي، العنبر، الأوبوبوناكس، القستوس',
      baseNotes: 'الجلود الفاخرة، العود، الباتشولي، خشب الصندل',
      originCountry: 'سلطنة عمان',
      gender: 'رجالي',
      size: '100 مل',
      perfumeType: 'Eau de Parfum',
      sku: 'AM-IM-009',
      brandId: brandMap['أمواج (Amouage)'],
    },
    {
      name: 'رفلكشن مان (Reflection Man)',
      description: 'عطر زهري خشبي أنيق يفيض بالرقي والهدوء مع زهر البرتقال والياسمين وقاعدة خشبية ناعمة تدوم طويلاً.',
      price: 1220,
      originalPrice: 1350,
      imageUrl: 'https://images.unsplash.com/photo-1543857778-c4a1a3e0b2eb?w=800&q=80',
      galleryUrls: 'https://images.unsplash.com/photo-1543857778-c4a1a3e0b2eb?w=800&q=80',
      isAvailable: true,
      isPackage: false,
      topNotes: 'إكليل الجبل، الفلفل الأحمر الحلو، أوراق البرتقال المر',
      heartNotes: 'السوسن، زهر البرتقال (النيرولي)، الياسمين، الإيلنغ',
      baseNotes: 'خشب الصندل، خشب الأرز، الباتشولي، نجيل الهند',
      originCountry: 'سلطنة عمان',
      gender: 'رجالي',
      size: '100 مل',
      perfumeType: 'Eau de Parfum',
      sku: 'AM-RM-010',
      brandId: brandMap['أمواج (Amouage)'],
    },
  ];

  for (const p of products) {
    await prisma.product.create({
      data: p,
    });
  }

  console.log('Successfully seeded 5 brands and 10 luxury perfumes!');
}

main()
  .catch((e) => {
    console.error('Error seeding data:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
