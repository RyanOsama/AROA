import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const realBrands = [
  {
    name: 'ديور (Dior)',
    description: 'دار أزياء فرنسية عريقة تعتبر من أرقى دور الأزياء والعطور في العالم.',
    logoUrl: 'https://images.unsplash.com/photo-1608688463953-b24cd51de9b4?w=200&q=80',
    products: [
      {
        name: 'سوفاج (Sauvage)',
        description: 'عطر رجالي قوي وجذاب يجمع بين الانتعاش والحدة البرية.',
        price: 650,
        originalPrice: 750,
        topNotes: 'البرغموت، الفلفل',
        heartNotes: 'الخزامى، إبرة الراعي، فلفل سيتشوان',
        baseNotes: 'الأمبروكسان، خشب الأرز',
        gender: 'رجالي',
        size: '100 مل',
        imageUrl: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=600&q=80'
      },
      {
        name: 'جادور (J\'adore)',
        description: 'عطر نسائي أسطوري يجسد الأنوثة المطلقة بأزهار استثنائية.',
        price: 720,
        originalPrice: 800,
        topNotes: 'اليلانج يلانج، الخوخ، البطيخ',
        heartNotes: 'الورد الدمشقي، الياسمين',
        baseNotes: 'الفانيليا، المسك، خشب الأرز',
        gender: 'نسائي',
        size: '100 مل',
        imageUrl: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=600&q=80'
      }
    ]
  },
  {
    name: 'شانيل (Chanel)',
    description: 'علامة تجارية فرنسية فاخرة تعكس الأناقة الكلاسيكية والتميز.',
    logoUrl: 'https://images.unsplash.com/photo-1590736969955-71cc94801759?w=200&q=80',
    products: [
      {
        name: 'بلو دي شانيل (Bleu de Chanel)',
        description: 'عطر رجالي خشبي عطري، يمثل الرجل الذي يرفض القواعد ويختار مصيره.',
        price: 680,
        originalPrice: null,
        topNotes: 'الليمون، الجريب فروت، الفلفل الوردي',
        heartNotes: 'الزنجبيل، جوزة الطيب، الياسمين',
        baseNotes: 'البخور، خشب الأرز، خشب الصندل',
        gender: 'رجالي',
        size: '100 مل',
        imageUrl: 'https://images.unsplash.com/photo-1523293115678-d2906198d3b4?w=600&q=80'
      },
      {
        name: 'كوكو مدموزيل (Coco Mademoiselle)',
        description: 'عطر شرقي حيوي وجذاب يعبر عن المرأة الحرة والجريئة.',
        price: 750,
        originalPrice: 850,
        topNotes: 'البرتقال، الماندرين، زهر البرتقال',
        heartNotes: 'الورد التركي، الياسمين، الميموزا',
        baseNotes: 'الباتشولي، المسك الأبيض، الفانيليا',
        gender: 'نسائي',
        size: '100 مل',
        imageUrl: 'https://images.unsplash.com/photo-1595532542520-50d440dbce84?w=600&q=80'
      }
    ]
  },
  {
    name: 'توم فورد (Tom Ford)',
    description: 'عطور أمريكية حصرية تتميز بالفخامة والتفرد بمكونات نادرة.',
    logoUrl: 'https://images.unsplash.com/photo-1616949755610-8c9bac08f9f8?w=200&q=80',
    products: [
      {
        name: 'عود وود (Oud Wood)',
        description: 'عطر خشبي فاخر يستخدم أحد أندر وأغلى المكونات في العالم.',
        price: 1250,
        originalPrice: 1400,
        topNotes: 'خشب الورد، الهيل، الفلفل الصيني',
        heartNotes: 'العود، خشب الصندل، نجيل الهند',
        baseNotes: 'فول التونكا، الفانيليا، العنبر',
        gender: 'للجنسين',
        size: '100 مل',
        imageUrl: 'https://images.unsplash.com/photo-1605615715831-299d2551bf32?w=600&q=80'
      },
      {
        name: 'بلاك أوركيد (Black Orchid)',
        description: 'عطر غامض وساحر برائحة الأوركيد الأسود والتوابل.',
        price: 850,
        originalPrice: 950,
        topNotes: 'الكمأة، الياسمين، الكشمش الأسود',
        heartNotes: 'الأوركيد الأسود، التوابل، اللوتس',
        baseNotes: 'الشوكولاتة المكسيكية، الباتشولي، الفانيليا',
        gender: 'للجنسين',
        size: '100 مل',
        imageUrl: 'https://images.unsplash.com/photo-1557170332-a4b3f114ea02?w=600&q=80'
      }
    ]
  },
  {
    name: 'كريد (Creed)',
    description: 'دار عطور بريطانية/فرنسية تاريخية تأسست عام 1760، عطور الملوك والمشاهير.',
    logoUrl: 'https://images.unsplash.com/photo-1629198688000-71f23e745b6e?w=200&q=80',
    products: [
      {
        name: 'أفينتوس (Aventus)',
        description: 'عطر القوة والنجاح، الأكثر مبيعاً في تاريخ العلامة التجارية.',
        price: 1450,
        originalPrice: 1600,
        topNotes: 'الأناناس، البرغموت، الكشمش الأسود، التفاح',
        heartNotes: 'خشب البتولا، الباتشولي، الورد المغربي، الياسمين',
        baseNotes: 'المسك، طحلب السنديان، الفانيليا، الآمبرغريس',
        gender: 'رجالي',
        size: '100 مل',
        imageUrl: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=600&q=80'
      },
      {
        name: 'سيلفر ماونتن ووتر (Silver Mountain Water)',
        description: 'عطر منعش مستوحى من هواء جبال الألب السويسرية النقية.',
        price: 1300,
        originalPrice: null,
        topNotes: 'البرغموت، الماندرين',
        heartNotes: 'الشاي الأخضر، الكشمش الأسود',
        baseNotes: 'الجلابانوم، المسك، خشب الصندل، البيتيتغرين',
        gender: 'للجنسين',
        size: '100 مل',
        imageUrl: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600&q=80'
      }
    ]
  },
  {
    name: 'ايف سان لوران (YSL)',
    description: 'علامة فرنسية تدمج بين الأناقة الباريسية والجرأة المعاصرة.',
    logoUrl: 'https://images.unsplash.com/photo-1587515152843-078ce016ed25?w=200&q=80',
    products: [
      {
        name: 'واي (Y EDP)',
        description: 'عطر رجالي عصري يعبر عن الشغف وتحقيق الأحلام.',
        price: 580,
        originalPrice: 650,
        topNotes: 'التفاح، الزنجبيل، البرغموت',
        heartNotes: 'المريمية، توت العرعر، إبرة الراعي',
        baseNotes: 'أخشاب العنبر، فول التونكا، خشب الأرز، نجيل الهند',
        gender: 'رجالي',
        size: '100 مل',
        imageUrl: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&q=80'
      },
      {
        name: 'بلاك أوبيوم (Black Opium)',
        description: 'عطر نسائي ساحر ومثير بنكهة القهوة السوداء والفانيليا.',
        price: 640,
        originalPrice: null,
        topNotes: 'الفلفل الوردي، زهر البرتقال، الكمثرى',
        heartNotes: 'القهوة، الياسمين، اللوز المر',
        baseNotes: 'الفانيليا، الباتشولي، خشب الأرز',
        gender: 'نسائي',
        size: '100 مل',
        imageUrl: 'https://images.unsplash.com/photo-1601009117621-0a63af0edc55?w=600&q=80'
      }
    ]
  }
];

async function main() {
  console.log("Deleting old data...");
  // Clear existing data
  await prisma.product.deleteMany({});
  await prisma.brand.deleteMany({});

  console.log("Inserting new famous real brands and perfumes...");
  
  for (const brandData of realBrands) {
    const { products, ...brandInfo } = brandData;
    
    // Create Brand
    const brand = await prisma.brand.create({
      data: brandInfo
    });

    console.log(`Created Brand: ${brand.name}`);

    // Create Products for this brand
    for (const productData of products) {
      await prisma.product.create({
        data: {
          ...productData,
          brandId: brand.id,
          sku: `${brand.name.substring(0, 3).toUpperCase()}-${Math.floor(Math.random() * 10000)}`
        }
      });
      console.log(` - Added Product: ${productData.name}`);
    }
  }

  console.log("Database seeded successfully with real perfumes!");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
