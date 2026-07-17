import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const brandsData = [
      {
        name: 'شانيل (Chanel)',
        perfumes: [
          { name: 'بلو دي شانيل (Bleu de Chanel)', gender: 'رجالي', perfumeType: 'Eau de Parfum', size: '100 مل', topNotes: 'ليمون، جريب فروت، نعناع', heartNotes: 'زنجبيل، جوزة الطيب، ياسمين', baseNotes: 'بخور، أخشاب الأرز، باتشولي', description: 'عطر خشبي عطري يجسد الاستقلالية والحرية للرجل العصري.', price: 650, originalPrice: 750, originCountry: 'فرنسا' },
          { name: 'كوكو مادوموزيل (Coco Mademoiselle)', gender: 'نسائي', perfumeType: 'Eau de Parfum', size: '100 مل', topNotes: 'برتقال، يوسفي، برغموت', heartNotes: 'ياسمين، ورد تركي، ميموزا', baseNotes: 'باتشولي، فانيليا، مسك أبيض', description: 'عطر شرقي زهري يعكس جرأة وحيوية المرأة الشابة المستقلة.', price: 720, originalPrice: 800, originCountry: 'فرنسا' },
          { name: 'شانيل نمبر 5 (Chanel No. 5)', gender: 'نسائي', perfumeType: 'Eau de Parfum', size: '100 مل', topNotes: 'ألدهيدات، يلانغ يلانغ، نيرولي', heartNotes: 'ياسمين، زنبق الوادي، ورد', baseNotes: 'خشب الصندل، فانيليا، فيتيفير', description: 'أيقونة العطور العالمية، عطر أسطوري يعبر عن الأنوثة الخالصة.', price: 750, originalPrice: null, originCountry: 'فرنسا' },
          { name: 'ألور هوم سبورت (Allure Homme Sport)', gender: 'رجالي', perfumeType: 'Eau de Toilette', size: '100 مل', topNotes: 'برتقال، روائح بحرية، ألدهيدات', heartNotes: 'فلفل، نيرولي، خشب الأرز', baseNotes: 'تونكا، مسك، عنبر', description: 'عطر حيوي ومنعش مصمم للرجل الديناميكي المحب للحركة.', price: 580, originalPrice: 650, originCountry: 'فرنسا' },
          { name: 'شانس أو تاندر (Chance Eau Tendre)', gender: 'نسائي', perfumeType: 'Eau de Toilette', size: '100 مل', topNotes: 'سفرجل، جريب فروت', heartNotes: 'ياسمين، هياسينث', baseNotes: 'مسك أبيض، إيريس، فيرجينيا سيدار', description: 'عطر زهري فاكهي رقيق ينبض بالرومانسية والنعومة.', price: 620, originalPrice: null, originCountry: 'فرنسا' },
          { name: 'سيكومور (Sycomore)', gender: 'للجنسين', perfumeType: 'Eau de Parfum', size: '75 مل', topNotes: 'فيتيفير، فلفل وردي', heartNotes: 'خشب الأرز، بنفسج', baseNotes: 'تبغ، صندل، ألدهيدات', description: 'عطر خشبي فاخر وحصري، يمنح شعوراً بالدفء والفخامة.', price: 1200, originalPrice: 1350, originCountry: 'فرنسا' },
        ]
      },
      {
        name: 'ديور (Dior)',
        perfumes: [
          { name: 'ديور سوفاج (Dior Sauvage)', gender: 'رجالي', perfumeType: 'Eau de Parfum', size: '100 مل', topNotes: 'برغموت كالابريا، فلفل', heartNotes: 'فلفل سيتشوان، لافندر، باتشولي', baseNotes: 'أمبروكسان، خشب الأرز، فانيليا', description: 'العطر الرجالي الأكثر مبيعاً، يدمج بين الانتعاش والغموض.', price: 630, originalPrice: null, originCountry: 'فرنسا' },
          { name: 'ميس ديور (Miss Dior)', gender: 'نسائي', perfumeType: 'Eau de Parfum', size: '100 مل', topNotes: 'ليمون، يوسفي، فلفل وردي', heartNotes: 'ورد دمشقي، وردة مايو، ياسمين', baseNotes: 'خشب الورد، باتشولي', description: 'باقة زهرية ساحرة تعبر عن الحب والأنوثة العصرية.', price: 680, originalPrice: 750, originCountry: 'فرنسا' },
          { name: 'جادور ديور (J\'adore)', gender: 'نسائي', perfumeType: 'Eau de Parfum', size: '100 مل', topNotes: 'كمثرى، شمام، خوخ', heartNotes: 'ياسمين، زنبق الوادي، مسك الروم', baseNotes: 'فانيليا، عنبر، توت أسود', description: 'عطر زهري كلاسيكي يعتبر رمزاً للفخامة والذهب الخالص.', price: 710, originalPrice: null, originCountry: 'فرنسا' },
          { name: 'ديور هوم انتنس (Dior Homme Intense)', gender: 'رجالي', perfumeType: 'Eau de Parfum', size: '100 مل', topNotes: 'لافندر', heartNotes: 'سوسن (إيريس)، أمبريت، كمثرى', baseNotes: 'فيتيفير، خشب الأرز', description: 'عطر خشبي بودري فاخر، مثالي للمناسبات الرسمية والسهرات.', price: 650, originalPrice: null, originCountry: 'فرنسا' },
          { name: 'غريس ديور (Gris Dior)', gender: 'للجنسين', perfumeType: 'Eau de Parfum', size: '125 مل', topNotes: 'برغموت', heartNotes: 'ورد، ياسمين', baseNotes: 'باتشولي، طحلب البلوط، خشب الصندل', description: 'عطر شيبر فاخر يعكس لون ديور الرمادي الأيقوني بأناقة.', price: 1300, originalPrice: null, originCountry: 'فرنسا' },
          { name: 'فهرنهايت (Fahrenheit)', gender: 'رجالي', perfumeType: 'Eau de Toilette', size: '100 مل', topNotes: 'جوزة الطيب، خزامى، يوسفي', heartNotes: 'زهر القرنفل، خشب الصندل، ياسمين', baseNotes: 'جلد، مسك، عنبر، فيتيفير', description: 'عطر كلاسيكي جريء وفريد يتميز بنوتات الجلود الدافئة.', price: 550, originalPrice: 620, originCountry: 'فرنسا' },
        ]
      },
      {
        name: 'توم فورد (Tom Ford)',
        perfumes: [
          { name: 'عود وود (Oud Wood)', gender: 'للجنسين', perfumeType: 'Eau de Parfum', size: '50 مل', topNotes: 'هيل، فلفل صيني، خشب الورد', heartNotes: 'خشب العود، صندل، فيتيفير', baseNotes: 'فانيليا، تونكا، عنبر', description: 'من أرقى عطور العود، يدمج الأخشاب النادرة برقي لا مثيل له.', price: 1100, originalPrice: null, originCountry: 'الولايات المتحدة' },
          { name: 'بلاك أوركيد (Black Orchid)', gender: 'نسائي', perfumeType: 'Eau de Parfum', size: '100 مل', topNotes: 'ترافل، جاردينيا، كشمش أسود', heartNotes: 'أوركيد أسود، توابل، زهرة اللوتس', baseNotes: 'شوكولاتة داكنة، باتشولي، فانيليا', description: 'عطر شرقي زهري فاخر ومظلم، يترك انطباعاً لا يُنسى.', price: 780, originalPrice: 850, originCountry: 'الولايات المتحدة' },
          { name: 'توباكو فانيليا (Tobacco Vanille)', gender: 'للجنسين', perfumeType: 'Eau de Parfum', size: '50 مل', topNotes: 'أوراق التبغ، توابل', heartNotes: 'فانيليا، كاكاو، تونكا، زهر التبغ', baseNotes: 'فواكه مجففة، أخشاب', description: 'عطر شرقي حار ودافئ، مستوحى من أندية الجنتلمان الإنجليزية.', price: 1150, originalPrice: null, originCountry: 'الولايات المتحدة' },
          { name: 'أومبري ليذر (Ombré Leather)', gender: 'للجنسين', perfumeType: 'Eau de Parfum', size: '100 مل', topNotes: 'هيل', heartNotes: 'ياسمين سامباك، جلد', baseNotes: 'باتشولي، عنبر، طحلب', description: 'رائحة جلود نقية وعميقة تأخذك في رحلة إلى الصحراء الغربية.', price: 820, originalPrice: 900, originCountry: 'الولايات المتحدة' },
          { name: 'نوار اكستريم (Noir Extreme)', gender: 'رجالي', perfumeType: 'Eau de Parfum', size: '100 مل', topNotes: 'هيل، جوزة الطيب، يوسفي', heartNotes: 'كولفي (حلوى هندية)، ورد، ياسمين', baseNotes: 'فانيليا، عنبر، خشب الصندل', description: 'عطر شرقي خشبي ساحر مصمم للرجل الذي يتجاوز الحدود.', price: 750, originalPrice: null, originCountry: 'الولايات المتحدة' },
          { name: 'لوست شيري (Lost Cherry)', gender: 'للجنسين', perfumeType: 'Eau de Parfum', size: '50 مل', topNotes: 'كرز حامض، لوز مر', heartNotes: 'كرز، ورد تركي، ياسمين فل', baseNotes: 'تونكا، فانيليا، بلسم بيرو، صندل', description: 'عطر جريء ومغري يجمع بين حلاوة الكرز ودفء اللوز.', price: 1400, originalPrice: 1550, originCountry: 'الولايات المتحدة' },
        ]
      },
      {
        name: 'كريد (Creed)',
        perfumes: [
          { name: 'كريد أفينتوس (Creed Aventus)', gender: 'رجالي', perfumeType: 'Eau de Parfum', size: '100 مل', topNotes: 'أناناس، تفاح، برغموت', heartNotes: 'بتولا، باتشولي، ياسمين مغربي', baseNotes: 'مسك، طحلب السنديان، فانيليا', description: 'عطر القوة والنجاح، الأكثر شهرة وتميزاً في عالم العطور النيش.', price: 1450, originalPrice: 1600, originCountry: 'فرنسا' },
          { name: 'سيلفر ماونتن (Silver Mountain Water)', gender: 'للجنسين', perfumeType: 'Eau de Parfum', size: '100 مل', topNotes: 'برغموت، يوسفي', heartNotes: 'شاي أخضر، كشمش أسود', baseNotes: 'مسك، جالبانوم، خشب الصندل', description: 'عطر منعش ونقي مستوحى من برودة ونقاء جبال الألب السويسرية.', price: 1250, originalPrice: null, originCountry: 'فرنسا' },
          { name: 'جرين ايريش تويد (Green Irish Tweed)', gender: 'رجالي', perfumeType: 'Eau de Parfum', size: '100 مل', topNotes: 'لويزة ليمونية، سوسن', heartNotes: 'أوراق البنفسج', baseNotes: 'عنبر الحوت، خشب الصندل', description: 'عطر كلاسيكي منعش يشعرك بالمشي في ريف أيرلندا الأخضر.', price: 1300, originalPrice: null, originCountry: 'فرنسا' },
          { name: 'أفينتوس للنساء (Aventus For Her)', gender: 'نسائي', perfumeType: 'Eau de Parfum', size: '75 مل', topNotes: 'تفاح أخضر، برغموت، باتشولي', heartNotes: 'ورد، خشب الصندل، مسك', baseNotes: 'خوخ، كشمش أسود، يلانغ يلانغ', description: 'النسخة الأنثوية الجريئة من أفينتوس، تعكس قوة وجمال المرأة.', price: 1350, originalPrice: null, originCountry: 'فرنسا' },
          { name: 'ميليزيم امبريال (Millésime Impérial)', gender: 'للجنسين', perfumeType: 'Eau de Parfum', size: '100 مل', topNotes: 'فواكه، ملح البحر', heartNotes: 'ليمون سيسيلي، سوسن، برتقال', baseNotes: 'مسك، أخشاب، روائح بحرية', description: 'عطر صيفي راقي ومنعش، يجسد فخامة القصور الملكية الشاطئية.', price: 1250, originalPrice: null, originCountry: 'فرنسا' },
          { name: 'رويال عود (Royal Oud)', gender: 'للجنسين', perfumeType: 'Eau de Parfum', size: '100 مل', topNotes: 'ليمون، فلفل وردي، برغموت', heartNotes: 'خشب الأرز، جالبانوم، أنجليكا', baseNotes: 'عود، خشب الصندل، مسك', description: 'عطر عود ناعم وأنيق صُمم ليناسب الذوق الملكي الرفيع.', price: 1550, originalPrice: null, originCountry: 'فرنسا' },
        ]
      },
      {
        name: 'إيف سان لوران (YSL)',
        perfumes: [
          { name: 'واي اودو بارفيوم (Y Eau de Parfum)', gender: 'رجالي', perfumeType: 'Eau de Parfum', size: '100 مل', topNotes: 'تفاح، زنجبيل، برغموت', heartNotes: 'مريمية، توت العرعر، إبرة الراعي', baseNotes: 'خشب الأرز، تونكا، عنبر', description: 'عطر منعش وحار قليلاً، مثالي للرجل الطموح والمثابر.', price: 580, originalPrice: 650, originCountry: 'فرنسا' },
          { name: 'ليبر (Libre)', gender: 'نسائي', perfumeType: 'Eau de Parfum', size: '90 مل', topNotes: 'خزامى (لافندر)، يوسفي', heartNotes: 'زهر البرتقال، ياسمين، خزامى', baseNotes: 'فانيليا مدغشقر، مسك، خشب الأرز', description: 'عطر الحرية، يدمج بين اللافندر الفرنسي وزهر البرتقال المغربي.', price: 650, originalPrice: null, originCountry: 'فرنسا' },
          { name: 'بلاك اوبيوم (Black Opium)', gender: 'نسائي', perfumeType: 'Eau de Parfum', size: '90 مل', topNotes: 'كمثرى، فلفل وردي', heartNotes: 'قهوة، ياسمين، لوز مر', baseNotes: 'فانيليا، باتشولي، خشب الكشمير', description: 'عطر شرقي فانيلي جذاب، يرتكز على جرعة قوية ومغرية من القهوة.', price: 680, originalPrice: null, originCountry: 'فرنسا' },
          { name: 'لا نوي دي لوم (La Nuit de L\'Homme)', gender: 'رجالي', perfumeType: 'Eau de Toilette', size: '100 مل', topNotes: 'هيل', heartNotes: 'لافندر، خشب الأرز، برغموت', baseNotes: 'فيتيفير، كراوية', description: 'عطر ليلي ساحر ومغري جداً، يعتمد على دفء الهيل واللافندر.', price: 550, originalPrice: 600, originCountry: 'فرنسا' },
          { name: 'توكسيدو (Tuxedo)', gender: 'للجنسين', perfumeType: 'Eau de Parfum', size: '125 مل', topNotes: 'أوراق البنفسج، كزبرة', heartNotes: 'ورد، زنبق الوادي', baseNotes: 'باتشولي، عنبر الحوت، فانيليا', description: 'عطر حصري وراقي جداً يجسد أناقة بدلة التوكسيدو الكلاسيكية.', price: 1150, originalPrice: 1250, originCountry: 'فرنسا' },
          { name: 'لوم (L\'Homme)', gender: 'رجالي', perfumeType: 'Eau de Toilette', size: '100 مل', topNotes: 'زنجبيل، برغموت، ليمون', heartNotes: 'توابل، أوراق البنفسج', baseNotes: 'تونكا، خشب الأرز، فيتيفير', description: 'عطر كلاسيكي ناعم وأنيق، مناسب جداً للعمل والاستخدام اليومي.', price: 520, originalPrice: null, originCountry: 'فرنسا' },
        ]
      },
      {
        name: 'أمواج (Amouage)',
        perfumes: [
          { name: 'انترلود الرجالي (Interlude Man)', gender: 'رجالي', perfumeType: 'Eau de Parfum', size: '100 مل', topNotes: 'أوريجانو، فلفل، برغموت', heartNotes: 'بخور، أوبوبوناكس، عنبر، قريضة', baseNotes: 'جلد، خشب العود، صندل، باتشولي', description: 'يُعرف بـ "الوحش الأزرق"، عطر بخوري شرقي معقد ذو ثبات أسطوري.', price: 1350, originalPrice: 1500, originCountry: 'عمان' },
          { name: 'رفلكشن الرجالي (Reflection Man)', gender: 'رجالي', perfumeType: 'Eau de Parfum', size: '100 مل', topNotes: 'إكليل الجبل، فلفل أحمر، ماي روز', heartNotes: 'نيرولي، ياسمين، يلانغ يلانغ', baseNotes: 'خشب الصندل، فيتيفير، أرز، باتشولي', description: 'عطر خشبي زهري نقي ومشرق، يعتبر من أسهل وأجمل عطور أمواج.', price: 1350, originalPrice: null, originCountry: 'عمان' },
          { name: 'ايبيك النسائي (Epic Woman)', gender: 'نسائي', perfumeType: 'Eau de Parfum', size: '100 مل', topNotes: 'كمون، قرفة، دفلى', heartNotes: 'ورد دمشقي، شاي، إبرة الراعي', baseNotes: 'عود، بخور، عنبر، فانيليا، مسك', description: 'عطر شرقي زهري ملحمي، مستوحى من رحلات طريق الحرير القديم.', price: 1400, originalPrice: null, originCountry: 'عمان' },
          { name: 'جوبيليشن 25 (Jubilation XXV)', gender: 'رجالي', perfumeType: 'Eau de Parfum', size: '100 مل', topNotes: 'بلاك بيري، بخور، برتقال، كزبرة', heartNotes: 'عسل، قرفة، أوركيد، قرنفل', baseNotes: 'عود، عنبر الحوت، باتشولي، أرز', description: 'عطر ملكي احتفالي معقد وغني، يدمج بين الفواكه والأخشاب والبخور.', price: 1450, originalPrice: 1600, originCountry: 'عمان' },
          { name: 'هونر النسائي (Honour Woman)', gender: 'نسائي', perfumeType: 'Eau de Parfum', size: '100 مل', topNotes: 'راوند، كزبرة، فلفل', heartNotes: 'جاردينيا، مسك الروم، ياسمين', baseNotes: 'عنبر، بخور، جلد، فيتيفير', description: 'عطر زهور بيضاء نقي وكريمي، مستوحى من قصة الحب التراجيدية.', price: 1400, originalPrice: null, originCountry: 'عمان' },
          { name: 'جايدنس (Guidance)', gender: 'للجنسين', perfumeType: 'Eau de Parfum', size: '100 مل', topNotes: 'كمثرى، لبان، بندق', heartNotes: 'أوسمانثوس، ورد، زعفران، ياسمين', baseNotes: 'صندل، فانيليا، عنبر، لادانوم', description: 'التحفة الأحدث من أمواج، عطر فاكهي خشبي سحري ذو انتشار لا يصدق.', price: 1650, originalPrice: 1800, originCountry: 'عمان' },
        ]
      }
    ];

    let count = 0;

    for (const brandData of brandsData) {
      const brand = await prisma.brand.create({
        data: { name: brandData.name }
      });

      for (const productData of brandData.perfumes) {
        await prisma.product.create({
          data: {
            brandId: brand.id,
            name: productData.name,
            gender: productData.gender,
            perfumeType: productData.perfumeType,
            size: productData.size,
            topNotes: productData.topNotes,
            heartNotes: productData.heartNotes,
            baseNotes: productData.baseNotes,
            description: productData.description,
            price: productData.price,
            originalPrice: productData.originalPrice,
            originCountry: productData.originCountry,
            isAvailable: true,
          }
        });
        count++;
      }
    }

    return NextResponse.json({ success: true, message: `Seeded ${brandsData.length} brands and ${count} products successfully.` });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
