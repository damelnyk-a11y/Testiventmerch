// data.js - Data layer for PIN-UP 10Y Merch Intelligence Report

// --- DATA LAYER (Simulating the output of the requested research) ---
// Данные для инсайтов, идей и референсов мерча

// ИНСТРУКЦИЯ ПО ДОБАВЛЕНИЮ И РЕДАКТИРОВАНИЮ КАРТОЧЕК:
// 1. merchData - массив объектов, каждый объект представляет одну карточку.
// 2. Обязательные поля:
//    - id: уникальный идентификатор, например "REF-009"
//    - brand: название бренда/коллаборации, например "PSG x Dior"
//    - year: год выпуска, строка, например "2023"
//    - category: категория ("apparel", "accessories", "packaging", "gifting")
//    - item: название товара, например "Varsity Jacket"
//    - idea: краткое описание идеи
//    - design: описание дизайна
//    - tech: техника производства
//    - packaging: описание упаковки
//    - price: уровень цены ("budget", "mid", "premium", "luxury")
//    - relevance: почему это релевантно для PIN-UP/Redcore
//    - takeaways: массив строк с ключевыми выводами
//    - tags: массив тегов для фильтрации
//    - vibe: CSS градиент для фона, например "linear-gradient(135deg, #1a202c 50%, #2d3748 50%)"
//    - imageFolder: путь к папке карточки, например "assets/images/references/REF-009"
//    - gallery: массив локальных изображений для модалки; первое изображение используется как превью карточки
// 3. Опциональные поля:
//    - links: массив ссылок на источники, например ["hypebeast.com", "about.nike.com"]
// 4. После добавления нового объекта в merchData, карточка автоматически появится в Explorer.
// 5. Для редактирования измените значения в объекте.
// 6. Убедитесь, что id уникален и соответствует формату REF-XXX.
// 7. Для каждой карточки создавайте папку assets/images/references/REF-XXX/.
// 8. Используйте helper createRefMedia("REF-XXX", ["cover.jpg", "detail-1", "detail-2"]).
//    Можно указывать имя без расширения, тогда UI попробует: jpg/jpeg/png/webp/gif/avif.
// 9. Первый файл в массиве - превью на карточке; в модалке показываются все файлы по порядку.
// 10. Если gallery пустой, UI использует auto-manifest: assets/images/references/manifest.json.

const insightsData = [
    { title: "Tonal Embroidery", desc: "Скрытая роскошь. Логотипы вышиваются нитками в тон ткани. Тренд 'Quiet Luxury'.", hashtag: "tonalembroidery" },
    { title: "Stadium Scarf Revival", desc: "Жаккардовые шарфы вышли за пределы стадионов в стритвир (как у Acne Studios).", hashtag: "stadiumscarf" },
    { title: "Numbered Editions", desc: "Металлические или тканевые бирки с серийными номерами (e.g. 045/100) повышают ценность.", hashtag: "limitededition" },
    { title: "Bespoke Packaging", desc: "Коробка как часть продукта. Использование магнитных замков, ложементов.", hashtag: "packagingdesign" },
    { title: "NFC / Phygital", desc: "Вшитые NFC чипы, ведущие на секретные лендинги или AR-фильтры.", hashtag: "phygital" },
    { title: "Heavyweight Cotton", desc: "Отказ от тонких тканей. Худи >400g/m2, футболки >220g/m2 для премиум-ощущения.", hashtag: "heavyweighthoodie" }
];

const mechanicsIdeas = [
    { idea: "Создать юбилейный Crest (Герб)", action: "Смешать лого PIN-UP и Redcore в геральдический символ", tech: "Woven patch, Chenille", why: "Отсылает к футбольной культуре (Sevilla FC), выглядит дороже обычного лого." },
    { idea: "Серийные VIP-наборы", action: "Выпустить 100 металлических кейсов для топ-партнеров", tech: "Лазерная гравировка номеров", why: "Создает FOMO и высокую воспринимаемую ценность подарка." },
    { idea: "Скрытое послание (Hidden Message)", action: "Разместить манифест компании на внутренней стороне куртки/сумки", tech: "Трансферная печать внутри", why: "Усиливает эмоциональную связь владельца с брендом." },
    { idea: "Drop-механика для сотрудников", action: "Вместо раздачи мерча, сделать внутренний 'раффл' (лотерею) на лимитированные айтемы", tech: "Digital platform + physical token", why: "Геймификация повышает желанность вещи." },
    { idea: "Co-branded Jersey", action: "Сделать third kit в цветах Redcore (черный/красный) с патчами спонсорских клубов", tech: "Сублимация + Flock принты", why: "Идеальный мост между брендом и спортивной аудиторией." }
];

const IMAGE_EXTENSION_FALLBACKS = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'avif'];

function createRefMedia(refId, fileNames = []) {
    const imageFolder = `assets/images/references/${refId}`;
    const gallery = fileNames
        .map(fileName => String(fileName || '').trim())
        .filter(Boolean)
        .map(fileName => `${imageFolder}/${fileName}`);
    return { imageFolder, gallery };
}

function getImageCandidates(imagePath) {
    const normalizedPath = String(imagePath || '').trim();
    if (!normalizedPath) return [];

    const hasExtension = /\.[a-z0-9]+$/i.test(normalizedPath);
    if (hasExtension) {
        return [normalizedPath];
    }

    return IMAGE_EXTENSION_FALLBACKS.map(ext => `${normalizedPath}.${ext}`);
}

function getManifestGalleryByItem(item) {
    if (!item || !item.id || !item.imageFolder) {
        return [];
    }

    const manifest = (typeof window !== 'undefined' && window.referenceMediaManifest)
        ? window.referenceMediaManifest
        : {};

    const files = Array.isArray(manifest[item.id]) ? manifest[item.id] : [];
    if (!files.length) {
        return [];
    }

    const sortedFiles = [...files].sort((a, b) => {
        const aIsCover = /^cover\./i.test(a);
        const bIsCover = /^cover\./i.test(b);
        if (aIsCover && !bIsCover) return -1;
        if (!aIsCover && bIsCover) return 1;
        return a.localeCompare(b);
    });

    return sortedFiles.map(fileName => `${item.imageFolder}/${fileName}`);
}

// Simulated Masterlist Data (Representative sample instead of 150 for UI performance/demo)
// Пример данных референсов (в реальности 150+ записей)
const merchData = [
    {
        id: "REF-001",
        brand: "PSG x Dior",
        year: "2023",
        category: "apparel",
        item: "Varsity Jacket",
        idea: "Соединение футбольного наследия с высокой модой через классические силуэты.",
        design: "Navy синий, патчи из шенилла, монограмма.",
        tech: "Chenille patches, премиальная шерсть/кожа.",
        packaging: "Кофр, деревянная вешалка.",
        price: "luxury",
        relevance: "Идеальный референс для создания 'Главной' вещи коллекции. Можно адаптировать формат куртки с гербом, созданным к 10-летию.",
        takeaways: ["Использование шенилла для лого", "Комбинация двух фактур (матовая шерсть + кожа)", "Тональные пуговицы-кнопки"],
        tags: ["sport collab", "heritage", "premium"],
        vibe: "linear-gradient(135deg, #1a202c 50%, #2d3748 50%)",
        ...createRefMedia("REF-001", ["cover.png"]),
        links: ["about.nike.com", "hypebeast.com", "www.wonderlandmagazine.com"]
    },
    {
        id: "REF-002",
        brand: "Aimé Leon Dore x New Balance",
        year: "2024",
        category: "apparel",
        item: "Nylon Windbreaker",
        idea: "Ретро-спорт эстетика 90-х в современном крое.",
        design: "Color-blocking, минималистичный вышитый логотип на груди.",
        tech: "Water-resistant nylon, mesh lining, вышивка.",
        packaging: "Зип-пакет из матового пластика с брендированием.",
        price: "mid",
        relevance: "Отличный вариант для массового/сотруднического мерча. Выглядит стильно, практично.",
        takeaways: ["Матовый нейлон вместо глянца", "Микро-логотип вместо билборда на груди", "Скрытые карманы"],
        tags: ["streetwear", "retro", "functional"],
        vibe: "linear-gradient(45deg, #2b6cb0, #2c5282)",
        ...createRefMedia("REF-002", ["cover.jpg"]),
        links: ["https://hypebeast.com/2026/2/aime-leon-dore-ss26-collection-spring-summer-2026-release-info"]
    },
    {
        id: "REF-003",
        brand: "Red Bull Racing x Castore",
        year: "2024",
        category: "apparel",
        item: "Paddock Hoodie",
        idea: "Технологичный крой для активной работы.",
        design: "Тотальный черный, эргономичные швы, прорезиненные молнии.",
        tech: "Scuba fabric (неопрен-лайк), heat-sealed zips.",
        packaging: "Стандарт",
        price: "mid",
        relevance: "Направление 'Techwear' для сотрудников IT-отделов Redcore.",
        takeaways: ["Плотная ткань без начеса внутри", "Водонепроницаемые молнии", "Магнитный замок на капюшоне"],
        tags: ["f1", "techwear", "monochrome"],
        vibe: "linear-gradient(to bottom, #171923, #000000)",
        ...createRefMedia("REF-003", ["cover.png"]),
        links: ["https://castore.com/collections/oracle-red-bull-racing"]
    },
    {
        id: "REF-004",
        brand: "Stripe",
        year: "2023",
        category: "gifting",
        item: "Executive Welcome Kit",
        idea: "Утилитарный премиум для финтех-элиты.",
        design: "Алюминий, матовая бумага, debossed логотипы.",
        tech: "Лазерная гравировка, софт-тач покрытия.",
        packaging: "Магнитная коробка из переплетного картона, ложемент из EVA-пены.",
        price: "premium",
        relevance: "Референс для упаковки VIP-подарков партнерам PIN-UP.",
        takeaways: ["Отказ от пластика в пользу металла и картона", "Кастомный ложемент", "Карточка с приветствием от фаундеров"],
        tags: ["corporate", "packaging", "quiet luxury"],
        vibe: "linear-gradient(135deg, #e2e8f0, #edf2f7)",
        ...createRefMedia("REF-004", ["cover.png"])
    },
    {
        id: "REF-005",
        brand: "Venezia FC",
        year: "2022",
        category: "accessories",
        item: "Third Kit / Scarf",
        idea: "Футбольный клуб как модный бренд. Золото на черном.",
        design: "Геометричный паттерн, золотая нить.",
        tech: "Jacquard knit (жаккардовая вязка).",
        packaging: "Бумажный конверт.",
        price: "budget",
        relevance: "Идеально для коллаборации с Sevilla FC или для фанатского дропа. Шарф - дешевый в производстве, но визуально сильный элемент.",
        takeaways: ["Использование металлизированной нити (Lurex)", "Двусторонний дизайн", "Толстая бахрома"],
        tags: ["football", "stadium core", "pattern"],
        vibe: "linear-gradient(to right, #000000 40%, #d69e2e 40%, #d69e2e 60%, #000000 60%)",
        ...createRefMedia("REF-005", ["cover.png"]),
        links: ["https://shop.veneziafc.it/"]
    },
     {
        id: "REF-006",
        brand: "KITH x BMW",
        year: "2020",
        category: "accessories",
        item: "Metal Pin / Emblem",
        idea: "Замена оригинального автомобильного лого на коллаборационный.",
        design: "Сохранение формы, изменение типографики.",
        tech: "Enamel (эмаль), металлическое литье.",
        packaging: "Бархатный мешочек.",
        price: "budget",
        relevance: "Создание юбилейного металлического значка 10Y, который можно крепить на любую одежду или рюкзак. Дешево, но премиально.",
        takeaways: ["Тяжелый металл", "Детальная проработка эмали", "Крепление на баттерфляй-клатч"],
        tags: ["streetwear", "hardware", "collectible"],
        vibe: "radial-gradient(circle, #a0aec0, #4a5568)",
        ...createRefMedia("REF-006", ["cover.png"]),
        links: ["https://kith.com/blogs/discover/kith-for-bmw-2022-lookbook"]
    },
    {
        id: "REF-007",
        brand: "100 Thieves",
        year: "2023",
        category: "packaging",
        item: "Drop Box",
        idea: "Упаковка, которую не хочется выбрасывать.",
        design: "Голографические элементы, нестандартная форма открытия (слайдер).",
        tech: "UV-лакирование, тиснение фольгой.",
        packaging: "Самодостаточный объект.",
        price: "mid",
        relevance: "Для отправки special edition дропов инфлюенсерам.",
        takeaways: ["Голографические наклейки-пломбы", "Инструкция по уходу как арт-объект", "QR-код на скрытый плейлист"],
        tags: ["esports", "unboxing", "hype"],
        vibe: "linear-gradient(45deg, #ff0080, #7928ca)",
        ...createRefMedia("REF-007", ["cover.png"]),
        links: ["https://100thieves.com/collections"]
    },
    {
        id: "REF-008",
        brand: "Arsenal FC x Maharishi",
        year: "2023",
        category: "apparel",
        item: "Pre-match Jersey",
        idea: "Интеграция стритвир-паттернов (камуфляж) в спортивную форму.",
        design: "Кастомный камуфляж с интегрированными силуэтами пушек (символ клуба).",
        tech: "All-over sublimation print.",
        packaging: "Пластиковый зип с логотипами.",
        price: "mid",
        relevance: "Идея для создания уникального паттерна PIN-UP (например, из элементов логотипа) для печати на джерси.",
        takeaways: ["Кастомный паттерн вместо логотипа на груди", "Темные, приглушенные цвета для спорта", "Силиконовые бейджи вместо вышивки"],
        tags: ["football", "collab", "pattern"],
        vibe: "repeating-linear-gradient(45deg, #276749, #276749 10px, #22543d 10px, #22543d 20px)",
        ...createRefMedia("REF-008", ["cover.png"]),
        links: ["https://www.maharishistore.com/blogs/archive/maharishi-adidas-arsenal"]
    },
    {
        id: "REF-009",
        brand: "Travis Scott x SP5DER",
        year: "2024",
        category: "apparel",
        item: "Hoodie",
        idea: "Агрессивный Y2K-стайл: объемные 3D-принты (puff print), графика в виде паутины и «грязные» градиенты. Использование винтажных шрифтов в стиле рок-мерча 90-х.",
        design: "Puff print, acid wash, chaotic details",
        tech: "Puff print, acid wash dyeing",
        packaging: "Standard",
        price: "mid",
        relevance: "Идеально для привлечения молодой аудитории и стримеров. Это формат «дропа», который создает искусственный дефицит и хайп.",
        takeaways: ["Puff Print: использование выпуклой печати для логотипа «10 Years».", "Сложная окраска: технология Acid Wash (эффект выстиранной ткани) в темно-красных или серых тонах.", "Хаотичная верстка: мелкие детали (звезды, значки), разбросанные по рукавам и капюшону."],
        tags: ["y2k", "streetwear", "hype"],
        vibe: "linear-gradient(45deg, #ff0000, #000000)",
        ...createRefMedia("REF-009", ["cover.jpg", "OIP-3847572524.jpg", "OIP-635692317.jpg"]),
        links: ["https://stockx.com/en-gb/sp5der-x-travis-scott-cactus-jack-airbrush-t-shirt-"]
    },
    {
        id: "REF-010",
        brand: "Palace x McDonald's",
        year: "2023",
        category: "apparel",
        item: "T-Shirt",
        idea: "«Ироничный корпоратив». Сочетание классического, узнаваемого во всем мире логотипа с эстетикой британского скейт-бренда. Лаконичность, белый/черный/красный цвета.",
        design: "Co-branded logo, text prints",
        tech: "Screen print",
        packaging: "Standard",
        price: "mid",
        relevance: "Показывает, как сделать корпоративный красный цвет «вкусным» и модным, а не скучным.",
        takeaways: ["Co-branding: игра с логотипом (например, вписать элементы казино или цифру «10» в привычные формы).", "Текстовые принты: использование на футболках забавных «внутренних» фактов о компании в виде мелкого текста.", "Аксессуары: скейт-деки или лайфстайл-предметы (пепельницы, стаканы) с двойным брендингом."],
        tags: ["ironic", "corporate", "skate"],
        vibe: "linear-gradient(to right, #ffffff 33%, #000000 33%, #000000 66%, #ff0000 66%)",
        ...createRefMedia("REF-010", ["cover.jpg", "OIP-1648819382.jpg", "OIP-1824809790.jpg", "OIP-517313183.jpg"]),
        links: ["https://www.vanityteen.com/savoring-street-style-the-palace-x-mcdonalds-collaboration-unveiled/"]
    },
    {
        id: "REF-011",
        brand: "Adidas x Gucci",
        year: "2022/23",
        category: "apparel",
        item: "Bomber Jacket",
        idea: "Ретро-роскошь 70-х. Сочетание спортивных силуэтов (три полоски) с люксовыми материалами (бархат, шелк) и монограммами.",
        design: "Monogram pattern, velvet materials",
        tech: "Velvet fabric, embroidery",
        packaging: "Luxury box",
        price: "luxury",
        relevance: "Вариант для VIP-мерча или подарков топ-менеджменту/партнерам. Подчеркивает статус и 10-летнюю историю.",
        takeaways: ["Монограмма: создать паттерн из паттерна Pin-up и использовать его на подкладке бомберов или на сумках.", "Материалы: использовать велюр или плотный джерси вместо обычного хлопка.", "Контрастные детали: манжеты и воротники другого цвета (например, золотой на красном)."],
        tags: ["luxury", "retro", "status"],
        vibe: "linear-gradient(135deg, #000000, #ffffff)",
        ...createRefMedia("REF-011", []),
        links: ["https://news.adidas.com/originals/showcasing-adidas-x-gucci/s/6f1599ec-2c0f-4dc8-8061-d846211f5be4", "https://fashionista.com/2022/05/adidas-gucci-collaboration-lookbook-products-prices"]
    },
    {
        id: "REF-012",
        brand: "Puma x Red Bull Racing (SDS Line)",
        year: "2024",
        category: "apparel",
        item: "Hoodie",
        idea: "Технологичный «Motorsport» дизайн. Четкие линии, динамичные блоки цветов (Color-blocking) и использование технических шрифтов, напоминающих приборную панель.",
        design: "Color-blocking, technical patches",
        tech: "Reflective elements, patches",
        packaging: "Standard",
        price: "mid",
        relevance: "Связь с драйвом, скоростью и риском. Эстетика команды, которая всегда побеждает.",
        takeaways: ["Color-blocking: разделение худи на асимметричные цветовые зоны (красный/черный/белый).", "Технические патчи: использование нашивок (patches) вместо обычной печати.", "Функциональность: добавление рефлективных (светоотражающих) элементов."],
        tags: ["motorsport", "tech", "speed"],
        vibe: "linear-gradient(45deg, #ff0000, #000000)",
        ...createRefMedia("REF-012", ["cover.jpg", "M0V3R24WA1-1221606209.jpg", "OIP-2429799333.jpg"]),
        links: []
    },
    {
        id: "REF-013",
        brand: "Louis Vuitton x League of Legends",
        year: "2024",
        category: "apparel",
        item: "Scuba Jacket",
        idea: "Цифровой футуризм. Использование материалов типа неопрена, камуфляжа «pixel» и серебристых элементов.",
        design: "Pixel camo, metallic details",
        tech: "Scuba fabric, digital gradients",
        packaging: "Standard",
        price: "luxury",
        relevance: "Прямая отсылка к IT-сфере, геймингу и технологичности вашего продукта.",
        takeaways: ["Ткани: использование Scuba-ткани или технологичного нейлона.", "Градиенты: переход из черного в ярко-красный через «цифровой» шум.", "Кибер-детали: фурнитура (молнии, карабины) необычных форм или ярких цветов."],
        tags: ["futurism", "gaming", "tech"],
        vibe: "linear-gradient(45deg, #000000, #ff0000)",
        ...createRefMedia("REF-013", []),
        links: ["https://www.lofficielbaltic.com/lv/mode/louis-vuitton-x-league-of-legends"]
    },
    {
        id: "REF-014",
        brand: "Alpinestars x Balenciaga",
        year: "Summer 2024",
        category: "apparel",
        item: "Moto Armor Jacket",
        idea: "Extreme Moto-Luxury: гоночная экипировка и эстетика высокой моды в массивном силуэте с эффектом брони.",
        design: "Oversized shoulders, layered racing patches, armored silhouette.",
        tech: "Leather paneling, embroidered chevrons, structured inserts.",
        packaging: "Premium garment bag",
        price: "luxury",
        relevance: "Идеально для ультра-лимитированного амбассадорского дропа: визуально дорого, дерзко и технологично.",
        takeaways: ["Многослойные патчи и шевроны в хаотичном расположении.", "Акцент на плечи и жесткая оверсайз-форма.", "Динамичная спортивная типографика для ключевого брендинга."],
        tags: ["motorsport", "luxury", "patches"],
        vibe: "linear-gradient(135deg, #0b0b0b 55%, #c53030 55%)",
        ...createRefMedia("REF-014", []),
        links: ["https://eu.alpinestarsrsrv.com/pages/alpinestars-x-balenciaga-summer-24", "https://www.balenciaga.com/en-us/alpinestars%C2%AE-helmet-black-850584T02231737.html"]
    },
    {
        id: "REF-015",
        brand: "Pull&Bear x NFL",
        year: "2024",
        category: "apparel",
        item: "Varsity Bomber",
        idea: "Американский varsity-стиль с крупной типографикой команд, номерными нашивками и университетским вайбом.",
        design: "Large team typography, contrast sleeves, collegiate graphics.",
        tech: "Chenille embroidery, cracked screen print, rib knit trim.",
        packaging: "Standard",
        price: "mid",
        relevance: "Отличный формат массового корпоративного мерча: понятный визуальный код и универсальная носибельность.",
        takeaways: ["Объемные буквы PU или 10 в технике chenille.", "Контраст корпуса и рукавов в духе классического varsity.", "Винтажный cracked-print для эффекта старой формы."],
        tags: ["football", "varsity", "heritage"],
        vibe: "linear-gradient(to right, #2d3748 50%, #c53030 50%)",
        ...createRefMedia("REF-015", []),
        links: ["https://vergemagazine.co.uk/pullbear-launches-nfl-fashion-collection-ahead-of-super-bowl-lx/", "https://www.pullandbear.com/kz/%D0%B4%D0%BB%D1%8F-%D0%BC%D1%83%D0%B6%D1%87%D0%B8%D0%BD/%D0%BE%D0%B4%D0%B5%D0%B6%D0%B4%D0%B0/nfl-n7164"]
    },
    {
        id: "REF-016",
        brand: "BetBoom Shop",
        year: "2024",
        category: "gifting",
        item: "Ambassador Capsule",
        idea: "Lifestyle-интеграция через амбассадоров: бренд уходит на второй план, а стиль коллекции становится главным.",
        design: "Minimal logo placement, capsule silhouettes, creator-led styling.",
        tech: "Premium French Terry, woven side labels, garment wash.",
        packaging: "Branded set box",
        price: "premium",
        relevance: "Показывает, как делать мерч, который хочется носить вне офиса, усиливая связь с комьюнити и медийными лицами.",
        takeaways: ["Скрытый брендинг через маленькие ярлыки и метки.", "Премиальный футер без начеса для повседневной носки.", "Капсульный релиз: худи + штаны + аксессуар единым сетом."],
        tags: ["community", "gifting", "streetwear"],
        vibe: "linear-gradient(135deg, #1a202c, #2d3748)",
        ...createRefMedia("REF-016", []),
        links: ["https://shop.fcdynamo.ru/en/product/jerseys_95_x_betboom_100461/"]
    },
    {
        id: "REF-017",
        brand: "Stussy x Barcelona (Custom/Bootleg)",
        year: "2024",
        category: "apparel",
        item: "Relaxed Football Jersey",
        idea: "Streetwear meets Football: джерси-силуэт с расслабленной посадкой и уличной айдентикой вместо чисто спортивной.",
        design: "Vertical stripes, relaxed fit, crest reinterpretation.",
        tech: "Sublimation print, ribbed V-neck collar, woven badge.",
        packaging: "Standard",
        price: "mid",
        relevance: "Сильный референс для летнего юбилейного дропа в эстетике blokecore и спортивного азарта.",
        takeaways: ["Полосатый паттерн в фирменных цветах бренда.", "Кастомный герб в формате футбольной эмблемы.", "V-образный воротник с контрастными трикотажными полосами."],
        tags: ["football", "streetwear", "collab"],
        vibe: "linear-gradient(to right, #1a365d 35%, #b83280 35%, #b83280 65%, #1a365d 65%)",
        ...createRefMedia("REF-017", []),
        links: ["https://www.footyheadlines.com/2025/12/nikefc-barcelona-26-27-retro-jersey.html"]
    },
    {
        id: "REF-018",
        brand: "Adidas x 424 x Arsenal",
        year: "2024",
        category: "apparel",
        item: "Coach Jacket",
        idea: "Formal meets Sport: строгий черный базис с редкими красными акцентами и балансом между клубной формой и casual tailoring.",
        design: "Black-on-black textures, minimal red accents, clean coach silhouette.",
        tech: "Matte/gloss fabric contrast, tonal branding, snap buttons.",
        packaging: "Premium black sleeve",
        price: "premium",
        relevance: "Идея для black-tie мерча и эксклюзивных подарков: сдержанно, статусно, но в фирменной красно-черной драматике.",
        takeaways: ["Black on Black: игра матовых и глянцевых фактур.", "Один точечный красный акцент как фирменный код.", "Формат coach jacket вместо привычного худи."],
        tags: ["football", "formal", "status"],
        vibe: "linear-gradient(135deg, #050505 70%, #c53030 70%)",
        ...createRefMedia("REF-018", []),
        links: ["https://thedropdate.com/releases/adidas-x-arsenal-x-424-collection-gv9716-gw7545", "https://www.arsenal.com/news/adidas-x-424-x-arsenal-limited-collection"]
    }
];

let currentModalGallery = [];
let currentModalIndex = 0;

function getItemGallery(item) {
    const manifestGallery = getManifestGalleryByItem(item);
    if (manifestGallery.length > 0) {
        return manifestGallery;
    }

    if (Array.isArray(item.gallery) && item.gallery.length > 0) {
        return item.gallery;
    }

    return [];
}

function getItemPreview(item) {
    const gallery = getItemGallery(item);
    return gallery[0] || '';
}

function getInstagramTagUrl(tag) {
    return `https://www.instagram.com/explore/tags/${encodeURIComponent(tag)}/`;
}

function calculateSourceBalance() {
    const buckets = {
        footballSport: new Set(['football', 'f1', 'motorsport', 'stadium core', 'sport collab']),
        streetwearCollabs: new Set(['streetwear', 'collab', 'y2k', 'skate', 'hype', 'ironic']),
        corporatePremium: new Set(['corporate', 'quiet luxury', 'luxury', 'status', 'elite', 'old money']),
        anniversaryDrops: new Set(['heritage', 'collectible', 'retro']),
        vipGifting: new Set(['gifting']),
        packagingInfo: new Set(['packaging', 'unboxing'])
    };

    const counts = {
        footballSport: 0,
        streetwearCollabs: 0,
        corporatePremium: 0,
        anniversaryDrops: 0,
        vipGifting: 0,
        packagingInfo: 0
    };

    merchData.forEach(item => {
        const itemTags = Array.isArray(item.tags) ? item.tags.map(tag => String(tag).toLowerCase()) : [];
        const category = String(item.category || '').toLowerCase();

        if (itemTags.some(tag => buckets.footballSport.has(tag))) counts.footballSport += 1;
        if (itemTags.some(tag => buckets.streetwearCollabs.has(tag))) counts.streetwearCollabs += 1;
        if (itemTags.some(tag => buckets.corporatePremium.has(tag))) counts.corporatePremium += 1;
        if (itemTags.some(tag => buckets.anniversaryDrops.has(tag))) counts.anniversaryDrops += 1;
        if (category === 'gifting' || itemTags.some(tag => buckets.vipGifting.has(tag))) counts.vipGifting += 1;
        if (category === 'packaging' || itemTags.some(tag => buckets.packagingInfo.has(tag))) counts.packagingInfo += 1;
    });

    const total = Object.values(counts).reduce((sum, value) => sum + value, 0);
    if (total === 0) {
        return [0, 0, 0, 0, 0, 0];
    }

    return [
        counts.footballSport,
        counts.streetwearCollabs,
        counts.corporatePremium,
        counts.anniversaryDrops,
        counts.vipGifting,
        counts.packagingInfo
    ].map(value => Math.round((value / total) * 100));
}

