// script.js - Логика для PIN-UP 10Y Merch Intelligence Report

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
//    - image: путь к превью-изображению, например "assets/images/previews/psg-dior.jpg" или URL "https://example.com/image.jpg"
// 3. Опциональные поля:
//    - links: массив ссылок на источники, например ["hypebeast.com", "about.nike.com"]
// 4. После добавления нового объекта в merchData, карточка автоматически появится в Explorer.
// 5. Для редактирования измените значения в объекте.
// 6. Убедитесь, что id уникален и соответствует формату REF-XXX.
// 7. Изображения превью хранятся в папке assets/images/previews/. Добавляйте JPG/PNG файлы туда и указывайте относительный путь.
// 8. Дополнительные фото-референсы кладите в папку assets/references/ с правильными названиями файлов (например, psg-dior-varsity-jacket.jpg).

const insightsData = [
    { title: "Tonal Embroidery", desc: "Скрытая роскошь. Логотипы вышиваются нитками в тон ткани. Тренд 'Quiet Luxury'." },
    { title: "Stadium Scarf Revival", desc: "Жаккардовые шарфы вышли за пределы стадионов в стритвир (как у Acne Studios)." },
    { title: "Numbered Editions", desc: "Металлические или тканевые бирки с серийными номерами (e.g. 045/100) повышают ценность." },
    { title: "Bespoke Packaging", desc: "Коробка как часть продукта. Использование магнитных замков, ложементов." },
    { title: "NFC / Phygital", desc: "Вшитые NFC чипы, ведущие на секретные лендинги или AR-фильтры." },
    { title: "Heavyweight Cotton", desc: "Отказ от тонких тканей. Худи >400g/m2, футболки >220g/m2 для премиум-ощущения." }
];

const mechanicsIdeas = [
    { idea: "Создать юбилейный Crest (Герб)", action: "Смешать лого PIN-UP и Redcore в геральдический символ", tech: "Woven patch, Chenille", why: "Отсылает к футбольной культуре (Sevilla FC), выглядит дороже обычного лого." },
    { idea: "Серийные VIP-наборы", action: "Выпустить 100 металлических кейсов для топ-партнеров", tech: "Лазерная гравировка номеров", why: "Создает FOMO и высокую воспринимаемую ценность подарка." },
    { idea: "Скрытое послание (Hidden Message)", action: "Разместить манифест компании на внутренней стороне куртки/сумки", tech: "Трансферная печать внутри", why: "Усиливает эмоциональную связь владельца с брендом." },
    { idea: "Drop-механика для сотрудников", action: "Вместо раздачи мерча, сделать внутренний 'раффл' (лотерею) на лимитированные айтемы", tech: "Digital platform + physical token", why: "Геймификация повышает желанность вещи." },
    { idea: "Co-branded Jersey", action: "Сделать third kit в цветах Redcore (черный/красный) с патчами спонсорских клубов", tech: "Сублимация + Flock принты", why: "Идеальный мост между брендом и спортивной аудиторией." }
];

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
        vibe: "linear-gradient(135deg, #1a202c 50%, #2d3748 50%)", image: "assets/images/previews/PSG-x-Walk-in-Paris-Teddy-Jacket.png",
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
        vibe: "linear-gradient(45deg, #2b6cb0, #2c5282)", image: "assets/images/previews/Aime-Leon-Dore-x-New-Balance-Nylon-Windbreaker-Black.jpg",
        links: ["stockx.com", "hypebeast.com", "www.aimeleondore.com"]
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
        vibe: "linear-gradient(to bottom, #171923, #000000)", image: "assets/images/previews/Castore x Red Bull Racing Veste Softshell .png",
        links: ["paddock212.com"]
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
        vibe: "linear-gradient(135deg, #e2e8f0, #edf2f7)", image: "assets/images/previews/REF-004 gifting Stripe Executive Welcome Kit (2023).png"
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
        vibe: "linear-gradient(to right, #000000 40%, #d69e2e 40%, #d69e2e 60%, #000000 60%)", image: "assets/images/previews/VFC_20Scarf_202-1_20Front.png"
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
        vibe: "radial-gradient(circle, #a0aec0, #4a5568)", image: "assets/images/previews/KITH x BMW Metal Pin _ Emblem (2020).png"
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
        vibe: "linear-gradient(45deg, #ff0080, #7928ca)", image: "assets/images/previews/100 Thieves Drop Box (2023).png"
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
        vibe: "repeating-linear-gradient(45deg, #276749, #276749 10px, #22543d 10px, #22543d 20px)", image: "assets/images/previews/Arsenal FC x Maharishi Pre-match Jersey (2023) .png"
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
        vibe: "linear-gradient(45deg, #ff0000, #000000)", image: "https://via.placeholder.com/100x100?text=Travis+Scott+x+SP5DER",
        links: ["stockx.com"]
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
        vibe: "linear-gradient(to right, #ffffff 33%, #000000 33%, #000000 66%, #ff0000 66%)", image: "https://via.placeholder.com/100x100?text=Palace+x+McDonald",
        links: ["palacemcdonalds.com"]
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
        vibe: "linear-gradient(135deg, #000000, #ffffff)", image: "https://via.placeholder.com/100x100?text=Adidas+x+Gucci",
        links: ["guccistories.com"]
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
        vibe: "linear-gradient(45deg, #ff0000, #000000)", image: "https://via.placeholder.com/100x100?text=Puma+x+Red+Bull",
        links: ["puma-motorsport.com"]
    },
    {
        id: "REF-013",
        brand: "Mandarin Oriental x Sporty & Rich",
        year: "2026",
        category: "apparel",
        item: "Oversize Hoodie",
        idea: "Wellness-эстетика и «Old Money». Очень чистый дизайн, пастельные тона (но в вашем случае — глубокий красный), вышитые гербы и загородный стиль.",
        design: "Embroidered crests, heavyweight cotton",
        tech: "Embroidery, heavyweight fabric",
        packaging: "Luxury set",
        price: "premium",
        relevance: "Юбилейный мерч, который люди захотят носить в повседневной жизни. Выглядит как одежда из элитного закрытого клуба.",
        takeaways: ["Вышивка: только вышитые логотипы (никакой пленки или краски).", "Oversize крой: тяжелый хлопок (Heavyweight cotton), который держит форму.", "Набор: создание «комплекта выходного дня» (худи + шорты + высокая белая носка с лого)."],
        tags: ["wellness", "old money", "elite"],
        vibe: "linear-gradient(to bottom, #ffcccc, #cc0000)", image: "https://via.placeholder.com/100x100?text=Mandarin+Oriental+x+Sporty",
        links: ["mediacentre.com"]
    },
    {
        id: "REF-014",
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
        vibe: "linear-gradient(45deg, #000000, #ff0000)", image: "https://via.placeholder.com/100x100?text=Louis+Vuitton+x+LoL",
        links: ["metalmagazine.com"]
    }
];

// --- UI LOGIC ---

// Navigation
function switchTab(tabId) {
    // Update buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('tab-active');
        btn.classList.add('text-brand-muted');
    });
    document.getElementById(`nav-${tabId}`).classList.add('tab-active');
    document.getElementById(`nav-${tabId}`).classList.remove('text-brand-muted');

    // Update sections
    document.getElementById('sec-dashboard').classList.add('hide');
    document.getElementById('sec-explorer').classList.add('hide');
    document.getElementById('sec-strategy').classList.add('hide');

    document.getElementById(`sec-${tabId}`).classList.remove('hide');

    // Trigger chart resize if navigating to dashboard (fixes Canvas issue)
    if(tabId === 'dashboard') {
        window.dispatchEvent(new Event('resize'));
    }
}

// Initialize Dashboard Content
function initDashboard() {
    // Populate Insights
    const insightsContainer = document.getElementById('insights-grid');
    insightsData.forEach(insight => {
        insightsContainer.innerHTML += `
            <div class="bg-white p-5 rounded-xl border border-brand-gray shadow-sm hover:shadow-md transition-shadow">
                <div class="w-8 h-8 bg-brand-light rounded-full flex items-center justify-center mb-3 text-brand-red font-bold text-sm">#</div>
                <h4 class="font-bold mb-2">${insight.title}</h4>
                <p class="text-sm text-brand-muted leading-relaxed">${insight.desc}</p>
            </div>
        `;
    });

    // Populate Strategy Ideas
    const ideasContainer = document.getElementById('ideas-list');
    mechanicsIdeas.forEach((idea, index) => {
        ideasContainer.innerHTML += `
            <li class="p-4 hover:bg-brand-light transition-colors">
                <div class="flex items-start">
                    <span class="text-brand-red font-mono font-bold mr-4 mt-1">${String(index + 1).padStart(2, '0')}</span>
                    <div>
                        <h4 class="font-bold text-lg">${idea.idea}</h4>
                        <p class="text-sm text-brand-dark mt-1"><b>Что сделать:</b> ${idea.action}</p>
                        <p class="text-sm text-brand-muted mt-1"><b>Техника:</b> ${idea.tech}</p>
                        <p class="text-sm text-brand-muted mt-1 italic"><b>Зачем:</b> ${idea.why}</p>
                    </div>
                </div>
            </li>
        `;
    });

    // Initialize Charts
    initCharts();
}

// Chart.js Implementations
function initCharts() {
    // Radar Chart - Source Balance
    const ctxRadar = document.getElementById('sourceRadarChart').getContext('2d');
    new Chart(ctxRadar, {
        type: 'radar',
        data: {
            labels: ['Football/Sport', 'Streetwear Collabs', 'Corporate Premium', 'Anniversary Drops', 'VIP Gifting', 'Packaging Info'],
            datasets: [{
                label: 'Исследованные референсы (%)',
                data: [35, 30, 15, 10, 5, 5],
                backgroundColor: 'rgba(229, 62, 62, 0.2)', // brand.red with opacity
                borderColor: '#E53E3E',
                pointBackgroundColor: '#1A202C',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: '#1A202C'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false, // CRITICAL for container constraints
            scales: {
                r: {
                    angleLines: { color: 'rgba(0, 0, 0, 0.1)' },
                    grid: { color: 'rgba(0, 0, 0, 0.1)' },
                    pointLabels: {
                        font: { size: 11, family: 'Inter' },
                        color: '#718096',
                        callback: function(value) {
                            // Wrap labels (16 char logic simulation via array split if needed, Chart.js handles reasonably well natively for radar)
                            return value;
                        }
                    },
                    ticks: { display: false } // hide internal numbers
                }
            },
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: '#1A202C',
                    titleFont: { family: 'Inter' },
                    bodyFont: { family: 'Inter' },
                    padding: 10,
                    cornerRadius: 4
                }
            }
        }
    });

    // Doughnut Chart - Category Distribution
    const ctxDoughnut = document.getElementById('categoryDoughnutChart').getContext('2d');
    new Chart(ctxDoughnut, {
        type: 'doughnut',
        data: {
            labels: ['Apparel (Худи, Куртки)', 'Accessories (Шарфы, Пины)', 'Packaging (Боксы)', 'Digital/NFC'],
            datasets: [{
                data: [50, 25, 15, 10],
                backgroundColor: [
                    '#1A202C', // Dark
                    '#718096', // Muted
                    '#E2E8F0', // Light Gray
                    '#E53E3E'  // Red Accent
                ],
                borderWidth: 2,
                borderColor: '#ffffff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false, // CRITICAL for container constraints
            cutout: '70%',
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        font: { family: 'Inter', size: 12 },
                        color: '#4A5568',
                        usePointStyle: true,
                        padding: 20
                    }
                },
                tooltip: {
                    backgroundColor: '#1A202C',
                    callbacks: {
                        label: function(context) {
                            return ' ' + context.label + ': ' + context.parsed + '% (Бюджет)';
                        }
                    }
                }
            }
        }
    });
}

// Masterlist Explorer Logic
function renderMerchGrid(data) {
    const grid = document.getElementById('merch-grid');
    grid.innerHTML = ''; // Clear

    data.forEach(item => {
        // Determine price indicator
        let priceDots = '💰';
        if(item.price === 'mid') priceDots = '💰💰';
        if(item.price === 'premium' || item.price === 'luxury') priceDots = '💰💰💰';

        const cardHTML = `
            <div class="card bg-white rounded-xl border border-brand-gray overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer flex flex-col h-full" onclick="openModal('${item.id}')">
                <div class="p-2 pb-0">
                    <!-- Abstract Representation of Item -->
                    <div class="vibe-block">
                        <img src="${item.image}" alt="${item.brand}" class="w-full h-full object-cover rounded">
                    </div>
                </div>
                <div class="p-4 flex-grow flex flex-col">
                    <div class="flex justify-between items-start mb-2">
                        <span class="text-xs font-mono bg-brand-light px-2 py-1 rounded text-brand-muted">${item.id}</span>
                        <span class="text-xs" title="Уровень бюджета">${priceDots}</span>
                    </div>
                    <h3 class="font-bold text-lg leading-tight mb-1 text-brand-dark">${item.brand}</h3>
                    <p class="text-sm text-brand-red font-medium mb-3">${item.item} (${item.year})</p>

                    <p class="text-sm text-brand-muted line-clamp-2 mb-4 flex-grow">${item.idea}</p>

                    <div class="flex flex-wrap gap-1 mt-auto">
                        ${item.tags.map(tag => `<span class="text-[10px] uppercase tracking-wider bg-gray-100 text-gray-600 px-2 py-1 rounded-sm">${tag}</span>`).join('')}
                    </div>
                </div>
            </div>
        `;
        grid.innerHTML += cardHTML;
    });
}

function filterMerch(category) {
    // Update button styles
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('bg-brand-dark', 'text-white');
        btn.classList.add('bg-white', 'text-brand-dark');
    });
    event.target.classList.remove('bg-white', 'text-brand-dark');
    event.target.classList.add('bg-brand-dark', 'text-white');

    // Filter data
    if (category === 'All') {
        renderMerchGrid(merchData);
    } else {
        const filtered = merchData.filter(item => item.category === category);
        renderMerchGrid(filtered);
    }
}

// Modal Logic
function openModal(id) {
    const item = merchData.find(i => i.id === id);
    const modal = document.getElementById('item-modal');
    const content = document.getElementById('modal-content');

    // Build modal HTML
    content.innerHTML = `
        <div class="h-32 w-full flex items-center justify-center text-6xl" style="background: ${item.vibe}; border-top-left-radius: 1rem; border-top-right-radius: 1rem;">
            <img src="${item.image}" alt="${item.brand}" class="w-16 h-16 object-cover rounded">
        </div>
        <div class="p-6 sm:p-8">
            <div class="flex items-center gap-3 mb-2">
                <span class="text-sm font-mono bg-brand-light px-2 py-1 rounded text-brand-muted">${item.id}</span>
                <span class="text-sm text-brand-muted uppercase tracking-wider">${item.category}</span>
            </div>
            <h2 class="text-3xl font-bold mb-1">${item.brand}</h2>
            <h3 class="text-xl text-brand-red mb-6">${item.item} (${item.year})</h3>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                    <h4 class="font-bold text-sm uppercase tracking-wider text-brand-muted border-b border-brand-gray pb-1 mb-3">Визуальная Идея</h4>
                    <p class="text-brand-dark">${item.idea}</p>
                    <p class="text-sm mt-2 text-gray-600">${item.design}</p>
                </div>
                <div>
                    <h4 class="font-bold text-sm uppercase tracking-wider text-brand-muted border-b border-brand-gray pb-1 mb-3">Производство</h4>
                    <ul class="text-sm space-y-2">
                        <li><span class="text-gray-500">Техника:</span> ${item.tech}</li>
                        <li><span class="text-gray-500">Упаковка:</span> ${item.packaging}</li>
                        <li><span class="text-gray-500">Бюджет:</span> <span class="uppercase">${item.price}</span></li>
                    </ul>
                </div>
            </div>

            <div class="bg-brand-light p-5 rounded-lg border border-brand-gray">
                <h4 class="font-bold text-brand-dark mb-2 flex items-center gap-2">
                    <span class="text-brand-red">⚡</span> Зачем это PIN-UP / Redcore?
                </h4>
                <p class="text-sm text-brand-dark mb-4">${item.relevance}</p>
                <h5 class="font-semibold text-xs uppercase tracking-wider text-brand-muted mb-2">Что забрать (Actionable Takeaways):</h5>
                <ul class="list-disc pl-5 text-sm space-y-1">
                    ${item.takeaways.map(t => `<li>${t}</li>`).join('')}
                </ul>
            </div>

            ${item.links ? `
            <div class="bg-gray-50 p-5 rounded-lg border border-brand-gray mt-4">
                <h4 class="font-bold text-brand-dark mb-2 flex items-center gap-2">
                    <span class="text-brand-red">🔗</span> Ссылки
                </h4>
                <ul class="list-disc pl-5 text-sm space-y-1">
                    ${item.links.map(link => `<li><a href="https://${link}" target="_blank" class="text-brand-red hover:underline">${link}</a></li>`).join('')}
                </ul>
            </div>
            ` : ''}
        </div>
    `;

    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function closeModal() {
    document.getElementById('item-modal').classList.add('hide');
    document.body.style.overflow = 'auto';
}

// Initialization on load
window.addEventListener('DOMContentLoaded', () => {
    initDashboard();
    renderMerchGrid(merchData);
});