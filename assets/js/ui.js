// ui.js - UI слой для PIN-UP 10Y Merch Intelligence Report

// --- UI LOGIC ---

async function loadReferenceMediaManifest() {
    if (typeof window === 'undefined') {
        return;
    }

    window.referenceMediaManifest = {};

    try {
        const response = await fetch('assets/images/references/manifest.json', { cache: 'no-store' });
        if (!response.ok) {
            return;
        }

        const manifest = await response.json();
        if (manifest && typeof manifest === 'object' && !Array.isArray(manifest)) {
            window.referenceMediaManifest = manifest;
        }
    } catch (_err) {
        // Silent fallback: cards still work with explicit gallery arrays.
    }
}

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

    window.scrollTo({ top: 0, behavior: 'smooth' });

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
            <a href="${getInstagramTagUrl(insight.hashtag)}" target="_blank" rel="noopener noreferrer" class="block bg-white p-5 rounded-xl border border-brand-gray shadow-sm hover:shadow-md transition-shadow">
                <div class="w-8 h-8 bg-brand-light rounded-full flex items-center justify-center mb-3 text-brand-red font-bold text-sm">#</div>
                <h4 class="font-bold mb-2">${insight.title}</h4>
                <p class="text-sm text-brand-muted leading-relaxed">${insight.desc}</p>
                <p class="text-xs text-brand-red mt-3 uppercase tracking-wide">#${insight.hashtag}</p>
            </a>
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
    initCharts(calculateSourceBalance());
}

// Chart.js Implementations
function initCharts(sourceBalanceData) {
    const isMobile = window.matchMedia('(max-width: 767px)').matches;

    // Radar Chart - Source Balance
    const ctxRadar = document.getElementById('sourceRadarChart').getContext('2d');
    new Chart(ctxRadar, {
        type: 'radar',
        data: {
            labels: ['Football/Sport', 'Streetwear Collabs', 'Corporate Premium', 'Anniversary Drops', 'VIP Gifting', 'Packaging Info'],
            datasets: [{
                label: 'Исследованные референсы (%)',
                data: sourceBalanceData,
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
                        font: { size: isMobile ? 10 : 11, family: 'Inter' },
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
                    position: isMobile ? 'bottom' : 'right',
                    labels: {
                        font: { family: 'Inter', size: isMobile ? 11 : 12 },
                        color: '#4A5568',
                        usePointStyle: true,
                        padding: isMobile ? 12 : 20,
                        boxWidth: isMobile ? 10 : 12
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

function getImageCandidatesAttr(imagePath) {
    return getImageCandidates(imagePath).join('||');
}

function normalizeLinkHref(link) {
    const normalizedLink = String(link || '').trim();
    if (!normalizedLink) {
        return '';
    }

    if (/^https?:\/\//i.test(normalizedLink)) {
        return normalizedLink;
    }

    return `https://${normalizedLink}`;
}

function formatLinkLabel(link) {
    const href = normalizeLinkHref(link);
    if (!href) {
        return '';
    }

    try {
        const url = new URL(href);
        const host = url.hostname.replace(/^www\./i, '');
        const decodedPath = decodeURIComponent(url.pathname || '').replace(/\/+$/, '');
        const compactPath = decodedPath.replace(/\/+/g, '/');

        if (!compactPath || compactPath === '/') {
            return host;
        }

        const combined = `${host}${compactPath}`;
        return combined.length > 56 ? `${combined.slice(0, 53)}...` : combined;
    } catch (_error) {
        return href.length > 56 ? `${href.slice(0, 53)}...` : href;
    }
}

function getPrimaryImageSrc(imagePath) {
    const candidates = getImageCandidates(imagePath);
    return candidates[0] || '';
}

function applyAdaptiveCrop(imageElement) {
    if (!imageElement) {
        return;
    }

    const cardMediaContainer = imageElement.closest('.card-media');
    if (cardMediaContainer) {
        cardMediaContainer.classList.remove('card-media-neutralized');
    }

    imageElement.classList.add('media-crop-balanced');
    imageElement.classList.remove('media-crop-tall', 'media-crop-wide');
    imageElement.classList.remove('media-no-upscale');

    const width = imageElement.naturalWidth || 0;
    const height = imageElement.naturalHeight || 0;
    if (!width || !height) {
        return;
    }

    const container = imageElement.parentElement;
    const containerWidth = container ? container.clientWidth : 0;
    const containerHeight = container ? container.clientHeight : 0;

    // Do not upscale visibly small sources; keep empty space inside fixed cell instead.
    if (
        containerWidth > 0 &&
        containerHeight > 0 &&
        (width < containerWidth * 0.92 || height < containerHeight * 0.92)
    ) {
        imageElement.classList.add('media-no-upscale');
        if (cardMediaContainer) {
            cardMediaContainer.classList.add('card-media-neutralized');
        }
        return;
    }

    const ratio = width / height;
    if (ratio < 0.82) {
        imageElement.classList.add('media-crop-tall');
    } else if (ratio > 1.95) {
        imageElement.classList.add('media-crop-wide');
    }
}

function handleImageFallback(imageElement) {
    const candidates = (imageElement.dataset.candidates || '').split('||').filter(Boolean);
    if (!candidates.length) {
        return;
    }

    const nextIndex = Number(imageElement.dataset.candidateIndex || '0') + 1;
    if (nextIndex < candidates.length) {
        imageElement.dataset.candidateIndex = String(nextIndex);
        imageElement.src = candidates[nextIndex];
        return;
    }

    imageElement.onerror = null;
    imageElement.classList.add('hide');
    const fallback = imageElement.parentElement?.querySelector('.image-fallback');
    if (fallback) {
        fallback.classList.remove('hide');
    }
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

        const previewPath = getItemPreview(item);

        const cardHTML = `
            <div class="card bg-white rounded-xl border border-brand-gray overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer flex flex-col h-full" onclick="openModal('${item.id}')">
                <div class="p-2 pb-0">
                    <div class="vibe-block card-media" style="--card-vibe: ${item.vibe};">
                        ${previewPath ? `<img src="${getPrimaryImageSrc(previewPath)}" alt="${item.brand}" class="card-media-image" loading="lazy" data-candidates="${getImageCandidatesAttr(previewPath)}" data-candidate-index="0" onload="applyAdaptiveCrop(this)" onerror="handleImageFallback(this)"><span class="image-fallback hide text-sm uppercase tracking-wider font-mono text-white/80">No photo</span>` : '<span class="text-sm uppercase tracking-wider font-mono text-white/80">No photo</span>'}
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
    const activeButton = (typeof event !== 'undefined' && event && event.target) ? event.target : null;

    // Update button styles
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('bg-brand-dark', 'text-white');
        btn.classList.add('bg-white', 'text-brand-dark');
    });
    if (activeButton) {
        activeButton.classList.remove('bg-white', 'text-brand-dark');
        activeButton.classList.add('bg-brand-dark', 'text-white');
    }

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
    const gallery = getItemGallery(item);

    currentModalGallery = gallery;
    currentModalIndex = 0;

    // Build modal HTML
    content.innerHTML = `
        <div class="modal-gallery-main" style="background: ${item.vibe}; border-top-left-radius: 1rem; border-top-right-radius: 1rem;">
            ${gallery.length > 0 ? `
                <img id="modal-main-image" src="${getPrimaryImageSrc(gallery[0])}" alt="${item.brand}" class="modal-gallery-image" loading="eager" data-candidates="${getImageCandidatesAttr(gallery[0])}" data-candidate-index="0" onload="applyAdaptiveCrop(this)" onerror="handleImageFallback(this)">
                <div class="image-fallback hide text-white/80 text-sm uppercase tracking-wider font-mono">No photo in folder</div>
                <button type="button" class="modal-nav-btn modal-nav-prev" onclick="changeModalImage(-1)" aria-label="Предыдущее фото">&#10094;</button>
                <button type="button" class="modal-nav-btn modal-nav-next" onclick="changeModalImage(1)" aria-label="Следующее фото">&#10095;</button>
            ` : '<div class="text-white/80 text-sm uppercase tracking-wider font-mono">No photo in folder</div>'}
        </div>
        ${gallery.length > 0 ? `
            <div class="thumb-strip">
                ${gallery.map((img, idx) => `
                    <button type="button" class="thumb-btn ${idx === 0 ? 'thumb-active' : ''}" onclick="setModalImage(${idx})" aria-label="Фото ${idx + 1}">
                        <img src="${getPrimaryImageSrc(img)}" alt="${item.brand} ${idx + 1}" class="w-full h-full" loading="lazy" data-candidates="${getImageCandidatesAttr(img)}" data-candidate-index="0" onload="applyAdaptiveCrop(this)" onerror="handleImageFallback(this)">
                    </button>
                `).join('')}
            </div>
        ` : ''}
        <div class="p-5 sm:p-8">
            <div class="flex items-center gap-3 mb-2">
                <span class="text-sm font-mono bg-brand-light px-2 py-1 rounded text-brand-muted">${item.id}</span>
                <span class="text-sm text-brand-muted uppercase tracking-wider">${item.category}</span>
            </div>
            <h2 class="text-2xl sm:text-3xl font-bold mb-1 pr-8">${item.brand}</h2>
            <h3 class="text-lg sm:text-xl text-brand-red mb-6">${item.item} (${item.year})</h3>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-8">
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

            ${Array.isArray(item.links) && item.links.length > 0 ? `
            <div class="bg-gray-50 p-5 rounded-lg border border-brand-gray mt-4">
                <h4 class="font-bold text-brand-dark mb-2 flex items-center gap-2">
                    <span class="text-brand-red">🔗</span> Ссылки
                </h4>
                <ul class="list-disc pl-5 text-sm space-y-1">
                    ${item.links.map(link => `<li><a href="${normalizeLinkHref(link)}" target="_blank" rel="noopener noreferrer" class="text-brand-red hover:underline">${formatLinkLabel(link)}</a></li>`).join('')}
                </ul>
            </div>
            ` : ''}
        </div>
    `;

    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function setModalImage(index) {
    if (!currentModalGallery.length) return;
    const safeIndex = ((index % currentModalGallery.length) + currentModalGallery.length) % currentModalGallery.length;
    currentModalIndex = safeIndex;

    const mainImage = document.getElementById('modal-main-image');
    if (mainImage) {
        const currentImagePath = currentModalGallery[currentModalIndex];
        const candidates = getImageCandidates(currentImagePath);
        mainImage.classList.remove('hide');
        mainImage.dataset.candidates = candidates.join('||');
        mainImage.dataset.candidateIndex = '0';
        mainImage.src = candidates[0] || '';

        const fallback = mainImage.parentElement?.querySelector('.image-fallback');
        if (fallback) {
            fallback.classList.add('hide');
        }
    }

    document.querySelectorAll('.thumb-btn').forEach((btn, idx) => {
        btn.classList.toggle('thumb-active', idx === currentModalIndex);
    });
}

function changeModalImage(direction) {
    setModalImage(currentModalIndex + direction);
}

function closeModal() {
    document.getElementById('item-modal').classList.add('hide');
    document.body.style.overflow = 'auto';
    currentModalGallery = [];
    currentModalIndex = 0;
}

// Initialization on load
window.addEventListener('DOMContentLoaded', async () => {
    await loadReferenceMediaManifest();
    initDashboard();
    renderMerchGrid(merchData);
});
