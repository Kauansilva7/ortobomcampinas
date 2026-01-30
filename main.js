// Modern Ortobom Scripts

document.addEventListener('DOMContentLoaded', () => {

    // 1. Mobile Menu Logic
    const menuToggle = document.getElementById('menuToggle');
    const closeMenu = document.getElementById('closeMenu');
    const mobileMenu = document.getElementById('mobileMenu');
    const body = document.body;

    const toggleMenu = (active) => {
        mobileMenu.classList.toggle('active', active);
        body.style.overflow = active ? 'hidden' : '';
    };

    menuToggle?.addEventListener('click', () => toggleMenu(true));
    closeMenu?.addEventListener('click', () => toggleMenu(false));

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (mobileMenu?.classList.contains('active') && !mobileMenu.contains(e.target) && !menuToggle.contains(e.target)) {
            toggleMenu(false);
        }
    });

    // 2. Announcement Bar Carousel
    const promoItems = document.querySelectorAll('#promo-carousel span');
    let currentPromo = 0;

    if (promoItems.length > 1) {
        setInterval(() => {
            promoItems[currentPromo].style.display = 'none';
            currentPromo = (currentPromo + 1) % promoItems.length;
            promoItems[currentPromo].style.display = 'flex';
        }, 4000);
    }

    // 3. Scroll Header Effect
    const header = document.querySelector('.sticky-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 4. Reveal Animation on Scroll (Intersection Observer)
    const revealElements = document.querySelectorAll('.animate-reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
        revealObserver.observe(el);
    });

    // Add visible class styling
    const style = document.createElement('style');
    style.innerHTML = `
        .animate-reveal.visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // 5. Product Details Overlay Logic
    const productCards = document.querySelectorAll('.product-card');
    const productOverlay = document.getElementById('productOverlay');
    const closeOverlay = document.getElementById('closeOverlay');
    const qtyMinus = document.getElementById('qtyMinus');
    const qtyPlus = document.getElementById('qtyPlus');
    const qtyVal = document.getElementById('qtyVal');
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    const sizeOpts = document.querySelectorAll('.size-opt');

    const productsInfo = {
        'bellona': {
            title: 'Colchão Bellona',
            meta: 'King (31 x 203 x 193)',
            priceOld: 'R$ 8.798,00',
            priceNow: 'R$ 4.299,00',
            saving: 'Economize R$ 4.499,00',
            installments: 'ou até 21x de R$ 254,87 com juros',
            description: 'Descubra o requinte e a sofisticação do colchão Bellona da Ortobom! Este colchão clássico com molas superpocket oferece o equilíbrio perfeito entre suporte e luxo.',
            gallery: [
                'imagens/COLCHÃO BELLONA/COLCHAO-BELLONA-KING.jpg',
                'imagens/COLCHÃO BELLONA/COLCHAO-BELLONA-KING--3-.jpg',
                'imagens/COLCHÃO BELLONA/COLCHAO-BELLONA-KING--4-.jpg',
                'imagens/COLCHÃO BELLONA/COLCHAO-BELLONA-KING--8-.jpg',
                'imagens/COLCHÃO BELLONA/COLCHAO-BELLONA-KING--9-.jpg',
                'imagens/COLCHÃO BELLONA/Design-sem-nome--6-.png',
                'imagens/COLCHÃO BELLONA/Design-sem-nome--5-.png',
                'imagens/COLCHÃO BELLONA/Camada-7.jpg',
                'imagens/COLCHÃO BELLONA/Camada-6.jpg',
                'imagens/COLCHÃO BELLONA/BOELLONA-3.jpg'
            ],
            specs: {
                'Nível de Conforto': 'Firme',
                'Tipo de Colchão': 'Mola Superpocket (Ensacadas)',
                'Tecido': 'Malha Belga e Linho',
                'Peso Suportado': 'Até 150kg por pessoa',
                'Diferencial': 'Tratamento Antimicrobiano'
            },
            warranty: {
                'Garantia Ortobom': '90 dias',
                'Garantia de Molas': '5 anos',
                'Garantia da Espuma': '3 anos'
            },
            story: [
                {
                    img: 'https://cdn.ortobom.com.br/file/45556c2e-25b7-40b5-b5d8-5bc58cf2eabb/base_Bellona_detalhe.png',
                    text: 'Descubra o requinte e a sofisticação do colchão Bellona da Ortobom! Projetado para oferecer o máximo em suporte, é ideal para quem busca noites de descanso reparadoras com nobreza e sofisticação.'
                },
                {
                    img: 'https://cdn.ortobom.com.br/file/763b0870-9025-4385-a83b-4d0fafa44c02/bellona_1.png',
                    text: 'Um verdadeiro símbolo de luxo. Revestido com materiais de alta qualidade e tratamentos antimicrobianos, garantindo uma superfície livre de alérgenos para um sono mais saudável.',
                    reverse: true
                },
                {
                    img: 'https://cdn.ortobom.com.br/file/34f382b8-b43e-4218-afac-7ebe632842a7/bellona_camadas.jpg',
                    text: 'Combina espuma viscoelástica (Nasa) que alivia pontos de pressão com molas pocket ensacadas individualmente para suporte adaptativo e redução de transferência de movimento.'
                }
            ],
            discount: '51% OFF',
            isBlackFriday: true
        },
        'absolut-hybrid': {
            title: 'Colchão Absolut Hybrid',
            meta: 'Casal (31 x 188 x 138)',
            priceOld: 'R$ 4.499,00',
            priceNow: 'R$ 3.099,00',
            saving: 'Economize R$ 1.400,00',
            installments: 'ou até 21x de R$ 183,73 com juros',
            description: 'A exclusividade da Tecnologia Dupla Conforto: escolha entre um lado macio ou mais firme, adaptando-se perfeitamente ao seu descanso e necessidades.',
            gallery: [
                'imagens/COLCHÃO ABSOLUT HYBRID CASAL/6040703657_ABSOLUT_1000X1000_1.jpg',
                'imagens/COLCHÃO ABSOLUT HYBRID CASAL/6040703657_ABSOLUT_1000X1000_3.jpg',
                'imagens/COLCHÃO ABSOLUT HYBRID CASAL/6040703657_ABSOLUT_1000X1000_4.jpg'
            ],
            specs: {
                'Nível de Conforto': 'Híbrido (Dual Comfort)',
                'Estilo': 'Clássico/Tradicional',
                'Tipo de Colchão': 'Mola Nanolastic',
                'Tipo de Espuma': 'Viscoelástica D33 + AG80',
                'Medidas': '31 x 138 x 188 cm'
            },
            warranty: {
                'Garantia Ortobom': '90 dias',
                'Garantia de Molas': '5 anos',
                'Garantia da Espuma': '3 anos'
            },
            story: [
                {
                    img: 'imagens/COLCHÃO ABSOLUT HYBRID CASAL/6040703657_ABSOLUT_1000X1000_1.jpg',
                    text: 'Cada pessoa tem seu jeito de descansar. O Absolut Hybrid compreende você com a Tecnologia Dupla Conforto, oferecendo um lado macio e outro firme para sua livre escolha.'
                },
                {
                    img: 'imagens/COLCHÃO ABSOLUT HYBRID CASAL/6040703657_ABSOLUT_1000X1000_3.jpg',
                    text: 'Acolhedor desde o primeiro toque. Revestido com malha suave de alta gramatura e acabamento em matelassê, ideal para quem valoriza elegância e durabilidade.',
                    reverse: true
                },
                {
                    img: 'imagens/COLCHÃO ABSOLUT HYBRID CASAL/6040703657_ABSOLUT_1000X1000_4.jpg',
                    text: 'Tecnologia de ponta: combina Viscoelástica D33, molas Nanolastic de resistência progressiva e espuma sustentável AG80 para estabilidade e alinhamento da coluna.'
                }
            ],
            discount: '31% OFF',
            isBlackFriday: false
        },
        'pro-saude-superpocket': {
            title: 'Colchão Pró Saúde Superpocket',
            meta: 'Queen (25 x 198 x 158)',
            priceOld: 'R$ 2.800,00',
            priceNow: 'R$ 1.799,00',
            saving: 'Economize R$ 1.001,00',
            installments: 'ou até 21x de R$ 106,66 com juros',
            description: 'O Colchão Pró Saúde Superpocket da Ortobom é a escolha ideal para quem busca saúde e conforto. Equipado com molas ensacadas individualmente que garantem o suporte ideal sem interferir no sono do parceiro.',
            gallery: [
                'imagens/COLCHÃO PRÓ SAÚDE/ProSaudeSuperpocket.jpg.jpg',
                'imagens/COLCHÃO PRÓ SAÚDE/ProSaudeSuperpocket2.jpg.jpg',
                'imagens/COLCHÃO PRÓ SAÚDE/ProSaudeSuperpocket3.jpg.jpg',
                'imagens/COLCHÃO PRÓ SAÚDE/ProSaudeSuperpocket4.jpg.jpg',
                'imagens/COLCHÃO PRÓ SAÚDE/ProSaudeSuperpocket5.jpg.jpg',
                'imagens/COLCHÃO PRÓ SAÚDE/ProSaudeSuperpocket6.jpg.jpg',
                'imagens/COLCHÃO PRÓ SAÚDE/ProSaudeSuperpocket7.jpg.jpg',
                'imagens/COLCHÃO PRÓ SAÚDE/ProSaudeSuperpocket8.jpg.jpg'
            ],
            specs: {
                'Nível de Conforto': 'Firme',
                'Tipo de Colchão': 'Mola Superpocket (Ensacadas)',
                'Tecido': 'Malha de Alta Qualidade',
                'Peso Suportado': 'Até 120kg por pessoa',
                'Tratamento': 'Antigordura, Antiácaro e Antifungo'
            },
            warranty: {
                'Garantia Ortobom': '90 dias',
                'Garantia de Molas': '3 anos',
                'Garantia da Espuma': '1 ano'
            },
            story: [
                {
                    img: 'imagens/COLCHÃO PRÓ SAÚDE/ProSaudeSuperpocket2.jpg.jpg',
                    text: 'O Pró Saúde Superpocket combina a tecnologia das molas ensacadas com camadas de espuma de alta performance, proporcionando uma sustentação uniforme e correta para a coluna.'
                },
                {
                    img: 'imagens/COLCHÃO PRÓ SAÚDE/ProSaudeSuperpocket4.jpg.jpg',
                    text: 'Seu revestimento em malha proporciona um toque suave e fresco, ideal para noites tranquilas. O tratamento completo contra agentes alérgenos garante um sono muito mais saudável.',
                    reverse: true
                },
                {
                    img: 'imagens/COLCHÃO PRÓ SAÚDE/ProSaudeSuperpocket6.jpg.jpg',
                    text: 'Durabilidade e resistência: projetado com materiais de primeira linha para manter o suporte e o conforto por muito mais tempo, sendo um excelente custo-benefício.'
                }
            ],
            discount: '35% OFF',
            isBlackFriday: false
        },
        'orion': {
            title: 'Colchão Orion',
            meta: 'King (35 x 203 x 193)',
            priceOld: 'R$ 12.300,00',
            priceNow: 'R$ 5.499,00',
            saving: 'Economize R$ 6.801,00',
            installments: 'ou até 21x de R$ 326,02 com juros',
            description: 'O ápice do luxo e da tecnologia Ortobom. O colchão Orion combina materiais nobres com suporte adaptativo para uma experiência de sono verdadeiramente transcendental.',
            gallery: [
                'imagens/ORION KING/6040703586-1.jpg',
                'imagens/ORION KING/6040703586-2.jpg',
                'imagens/ORION KING/6040703586-3.jpg',
                'imagens/ORION KING/6040703586-4.jpg',
                'imagens/ORION KING/6040703586-5.jpg',
                'imagens/ORION KING/6040703586-6.jpg',
                'imagens/ORION KING/6040703586-7.jpg',
                'imagens/ORION KING/6040703586-8.jpg'
            ],
            specs: {
                'Nível de Conforto': 'Médio a Macio',
                'Tipo de Colchão': 'Mola Superpocket + Espuma Viscoelástica',
                'Tecido': 'Malha Nobre com Fios de Ouro',
                'Altura': '35 cm',
                'Diferencial': 'Tecnologia de Termorregulação Ativa'
            },
            warranty: {
                'Garantia Ortobom': '90 dias',
                'Garantia de Molas': '5 anos',
                'Garantia da Espuma': '3 anos'
            },
            story: [
                {
                    img: 'imagens/ORION KING/1.png',
                    text: 'O Orion não é apenas um colchão, é uma obra de arte da engenharia do sono. Cada detalhe foi pensado para proporcionar o máximo em conforto e luxo.'
                },
                {
                    img: 'imagens/ORION KING/2.png',
                    text: 'Com tecnologia de termorregulação e materiais que se adaptam milimetricamente ao seu corpo, o Orion garante noites de sono ininterruptas e revigorantes.',
                    reverse: true
                }
            ],
            discount: '55% OFF',
            isBlackFriday: true
        },
        'ouro-spring': {
            title: 'Colchão Ouro Spring',
            meta: 'King (31 x 203 x 193)',
            priceOld: 'R$ 5.689,00',
            priceNow: 'R$ 3.749,00',
            saving: 'Economize R$ 1.940,00',
            installments: 'ou até 21x de R$ 222,27 com juros',
            description: 'O Colchão Ouro Spring da Ortobom oferece o equilíbrio perfeito entre resistência e suavidade. Com molas que se moldam ao corpo, ele proporciona um suporte excepcional para a coluna e noites de sono reparadoras.',
            gallery: [
                'imagens/OURO SPRING/COLCHAO-OURO-SPRING-KING--6-.jpg',
                'imagens/OURO SPRING/COLCHAO-OURO-SPRING-KING--9-.jpg',
                'imagens/OURO SPRING/COLCHAO-OURO-SPRING-KING--10-.jpg',
                'imagens/OURO SPRING/COLCHAO-OURO-SPRING-KING--2-.jpg',
                'imagens/OURO SPRING/COLCHAO-OURO-SPRING-KING--3-.jpg',
                'imagens/OURO SPRING/Ortobom0181-1.jpg',
                'imagens/OURO SPRING/Ortobom0227-1.jpg',
                'imagens/OURO SPRING/BEDROOM---CONTEMPORARY-US-1---TEMPLATE-ANGLED-VIEW-STUDIOTEMPLATE-45J7-COPY-29.jpg'
            ],
            specs: {
                'Nível de Conforto': 'Firme',
                'Tipo de Colchão': 'Mola Nanolastic de Resistência Progressiva',
                'Tecido': 'Jacquard Italiano com Bordado Matelassê',
                'Altura': '31 cm',
                'Peso Suportado': 'Até 120kg por pessoa'
            },
            warranty: {
                'Garantia Ortobom': '90 dias',
                'Garantia de Molas': '3 anos',
                'Garantia da Espuma': '1 ano'
            },
            story: [
                {
                    img: 'imagens/OURO SPRING/Ortobom0181-1.jpg',
                    text: 'O Ouro Spring traz a tradição da Ortobom com materiais de alta durabilidade. Seu molejo Nanolastic garante estabilidade e conforto constante ao longo dos anos.'
                },
                {
                    img: 'imagens/OURO SPRING/COLCHAO-OURO-SPRING-KING--3-.jpg',
                    text: 'Acabamento impecável em Jacquard, oferecendo um toque clássico e elegante ao seu quarto, além de uma superfície de descanso fresca e ventilada.',
                    reverse: true
                }
            ],
            discount: '34% OFF',
            isBlackFriday: false
        },
        'liberty': {
            title: 'Colchão Liberty',
            meta: 'Casal (31 x 188 x 138)',
            priceOld: 'R$ 4.550,00',
            priceNow: 'R$ 2.499,00',
            saving: 'Economize R$ 2.051,00',
            installments: 'ou até 21x de R$ 148,16 com juros',
            description: 'O Colchão Liberty Ortobom é sinônimo de liberdade e conforto. Com molejo de alta tecnologia e camadas de espuma que proporcionam um descanso revigorante, ele é a escolha perfeita para quem busca qualidade de vida.',
            gallery: [
                'imagens/LIBERTY CASAL/liberty site.jpg',
                'imagens/LIBERTY CASAL/COLCHAO-LIBERTY-CASAL--7-.jpg',
                'imagens/LIBERTY CASAL/COLCHAO-LIBERTY-CASAL--6-.jpg',
                'imagens/LIBERTY CASAL/COLCHAO-LIBERTY-CASAL.jpg',
                'imagens/LIBERTY CASAL/LIBERTY-1.jpg',
                'imagens/LIBERTY CASAL/LIBERTY-2.jpg',
                'imagens/LIBERTY CASAL/LIBERTY-3.jpg'
            ],
            specs: {
                'Nível de Conforto': 'Macio com Firmeza',
                'Tipo de Colchão': 'Molas Ensacadas Individualmente',
                'Tecido': 'Malha de Alta Densidade',
                'Altura': '31 cm',
                'Tratamentos': 'Antiácaro, Antifungo e Antialérgico'
            },
            warranty: {
                'Garantia Ortobom': '90 dias',
                'Garantia de Molas': '5 anos',
                'Garantia da Espuma': '3 anos'
            },
            story: [
                {
                    img: 'imagens/LIBERTY CASAL/LIBERTY-1.jpg',
                    text: 'O Liberty foi projetado para quem não abre mão de uma noite tranquila. Suas molas ensacadas minimizam a percepção de movimento, ideal para casais.'
                },
                {
                    img: 'imagens/LIBERTY CASAL/LIBERTY-2.jpg',
                    text: 'Com um design moderno e acabamento premium, ele eleva a estética do seu quarto enquanto cuida da sua saúde postural durante o sono.',
                    reverse: true
                }
            ],
            discount: '45% OFF',
            isBlackFriday: true
        },
        'orthopur': {
            title: 'Colchão Orthopur',
            meta: 'Casal (32 x 188 x 138)',
            priceOld: 'R$ 8.990,00',
            priceNow: 'R$ 4.499,00',
            saving: 'Economize R$ 4.491,00',
            installments: 'ou até 21x de R$ 266,73 com juros',
            description: 'O colchão Orthopur é a tradução literal de conforto e tecnologia. Desenvolvido com espuma viscoelástica de alta densidade, ele molda-se perfeitamente aos contornos do corpo, aliviando os pontos de pressão and garantindo um sono profundamente reparador.',
            gallery: [
                'imagens/ORTOPHUR CASAL/6040703650_ORTHOPUR_1000X1000.jpg',
                'imagens/ORTOPHUR CASAL/6040703650_ORTHOPUR_1000X1000_2.jpg',
                'imagens/ORTOPHUR CASAL/6040703650_ORTHOPUR_1000X1000_3.jpg',
                'imagens/ORTOPHUR CASAL/1000x1000_3.jpg',
                'imagens/ORTOPHUR CASAL/6040703650_F (1).png',
                'imagens/ORTOPHUR CASAL/6040703650_P (2).png',
                'imagens/ORTOPHUR CASAL/detalhe orthopur 3 (1).png'
            ],
            specs: {
                'Nível de Conforto': 'Macio',
                'Tipo de Colchão': 'Espuma Viscoelástica (Nasa) de Alta Densidade',
                'Tecido': 'Malha com Fios de Algodão e Viscose de Bambu',
                'Altura': '32 cm',
                'Peso Suportado': 'Até 150kg por pessoa'
            },
            warranty: {
                'Garantia Ortobom': '90 dias',
                'Garantia de Molas': 'N/A (Espuma)',
                'Garantia da Espuma': '5 anos'
            },
            story: [
                {
                    img: 'imagens/ORTOPHUR CASAL/6040703650_F (1).png',
                    text: 'A tecnologia viscoelástica avançada do Orthopur foi originalmente desenvolvida pela NASA para absorver a pressão exercida pelo peso do corpo, proporcionando uma sensação de leveza e relaxamento absoluto.'
                },
                {
                    img: 'imagens/ORTOPHUR CASAL/detalhe orthopur 3 (1).png',
                    text: 'Cada camada é pensada para o máximo desempenho. Seu tecido em malha de alta gramatura com viscose de bambu mantém a temperatura agradável, enquanto o design elegante transforma o ambiente do seu quarto.',
                    reverse: true
                }
            ],
            discount: '50% OFF',
            isBlackFriday: true
        },
        'sommier-bau': {
            title: 'Base Sommier Baú Fashion Nobuck',
            meta: 'Queen (39 x 198 x 158)',
            priceOld: 'R$ 3.999,00',
            priceNow: 'R$ 1.999,00',
            saving: 'Economize R$ 2.000,00',
            installments: 'ou até 21x de R$ 118,52 com juros',
            description: 'O Sommier Baú Fashion Nobuck é a combinação perfeita de elegância e funcionalidade. Oferece um amplo espaço interno para armazenamento com abertura fácil e acabamento em nobuck premium.',
            gallery: [
                'imagens/BAU SOMMIER QUEEN/preto.jpg',
                'imagens/BAU SOMMIER QUEEN/cinza.jpg',
                'imagens/BAU SOMMIER QUEEN/marrom.jpg',
                'imagens/BAU SOMMIER QUEEN/creme.jpg',
                'imagens/BAU SOMMIER QUEEN/BASE-SOMMIER-BAU-FASHION-NOBUCK-BLACK-QUEEN--2-.jpg',
                'https://cdn.ortobom.com.br/file/a7ef9eac-ca07-4ee1-9e86-0691906ed816/BASE-SOMMIER-BAU-FASHION-NOBUCK-BLACK-QUEEN--6-.jpg',
                'https://cdn.ortobom.com.br/file/f321018e-5b2d-430f-ac06-6b7911035138/BASE-SOMMIER-BAU-FASHION-NOBUCK-BLACK-QUEEN--7-.jpg'
            ],
            specs: {
                'Tipo': 'Base Sommier Baú',
                'Revestimento': 'Nobuck Fashion',
                'Altura': '39 cm',
                'Medidas': '158 x 198 cm (Queen)',
                'Diferencial': 'Pistões a gás para abertura suave'
            },
            warranty: {
                'Garantia Ortobom': '90 dias',
                'Garantia da Estrutura': '1 ano'
            },
            story: [
                {
                    img: 'https://cdn.ortobom.br/file/a7ef9eac-ca07-4ee1-9e86-0691906ed816/BASE-SOMMIER-BAU-FASHION-NOBUCK-BLACK-QUEEN--6-.jpg',
                    text: 'Otimize seu espaço com inteligência. O baú oferece um compartimento amplo e fácil de acessar, ideal para guardar enxovais e objetos volumosos.'
                },
                {
                    img: 'https://cdn.ortobom.br/file/f321018e-5b2d-430f-ac06-6b7911035138/BASE-SOMMIER-BAU-FASHION-NOBUCK-BLACK-QUEEN--7-.jpg',
                    text: 'Acabamento impecável em nobuck, proporcionando um toque aveludado e uma estética moderna que valoriza o seu dormitório.',
                    reverse: true
                },
                {
                    img: 'https://cdn.ortobom.br/file/289a157b-c09f-4343-afd9-ab0faa1032cd/BASE-SOMMIER-BAU-FASHION-NOBUCK-BLACK-QUEEN--5-.jpg',
                    text: 'Estrutura robusta produzida com madeira de reflorestamento, garantindo alta durabilidade e suporte ideal para seu colchão Ortobom.'
                },
                {
                    img: 'https://cdn.ortobom.br/file/19e20c61-623a-48b0-a245-68646bf37dc6/BASE-SOMMIER-BAU-FASHION-NOBUCK-BLACK-QUEEN--4-.jpg',
                    text: 'Abertura assistida por pistões a gás que garantem leveza e segurança no manuseio diário, otimizando o uso do compartimento interno.',
                    reverse: true
                }
            ],
            discount: '50% OFF',
            isBlackFriday: true,
            colors: [
                {
                    name: 'Preto',
                    thumb: 'imagens/BAU SOMMIER QUEEN/preto.jpg',
                    mainImg: 'imagens/BAU SOMMIER QUEEN/preto.jpg',
                    gallery: [
                        'imagens/BAU SOMMIER QUEEN/preto.jpg',
                        'imagens/BAU SOMMIER QUEEN/BASE-SOMMIER-BAU-FASHION-NOBUCK-BLACK-QUEEN--2-.jpg',
                        'https://cdn.ortobom.com.br/file/a7ef9eac-ca07-4ee1-9e86-0691906ed816/BASE-SOMMIER-BAU-FASHION-NOBUCK-BLACK-QUEEN--6-.jpg',
                        'https://cdn.ortobom.com.br/file/f321018e-5b2d-430f-ac06-6b7911035138/BASE-SOMMIER-BAU-FASHION-NOBUCK-BLACK-QUEEN--7-.jpg'
                    ]
                },
                {
                    name: 'Cinza',
                    thumb: 'imagens/BAU SOMMIER QUEEN/cinza.jpg',
                    mainImg: 'imagens/BAU SOMMIER QUEEN/cinza.jpg',
                    gallery: [
                        'imagens/BAU SOMMIER QUEEN/cinza.jpg',
                        'https://cdn.ortobom.com.br/file/25e1afb2-d07e-4849-9c0f-d7bac8062add/BASE-SOMMIER-BAU-FASHION-NOBUCK-GRAY-CASAL--6-.jpg'
                    ]
                },
                {
                    name: 'Marrom',
                    thumb: 'imagens/BAU SOMMIER QUEEN/marrom.jpg',
                    mainImg: 'imagens/BAU SOMMIER QUEEN/marrom.jpg',
                    gallery: [
                        'imagens/BAU SOMMIER QUEEN/marrom.jpg',
                        'https://cdn.ortobom.com.br/file/97557c44-0cf6-464b-9cec-b9c4435681f0/BASE-SOMMIER-BAU-FASHION-NOBUCK-BROWN-QUEEN--4-.jpg'
                    ]
                },
                {
                    name: 'Creme',
                    thumb: 'imagens/BAU SOMMIER QUEEN/creme.jpg',
                    mainImg: 'imagens/BAU SOMMIER QUEEN/creme.jpg',
                    gallery: [
                        'imagens/BAU SOMMIER QUEEN/creme.jpg',
                        'https://cdn.ortobom.com.br/file/dac012af-33bc-4a9a-9a88-2a6651f5075a/BASE-SOMMIER-BAU-FASHION-NOBUCK-CREAM-QUEEN--5-.jpg'
                    ]
                }
            ]
        }
    };

    function updateThumbNav() {
        const thumbTrack = document.getElementById('thumbTrack');
        const thumbPrev = document.getElementById('thumbPrev');
        const thumbNext = document.getElementById('thumbNext');
        if (!thumbTrack || !thumbPrev || !thumbNext) return;

        const maxScroll = thumbTrack.scrollWidth - thumbTrack.clientWidth;
        // Using a small tolerance (2px) to account for fractional pixels
        thumbPrev.classList.toggle('disabled', thumbTrack.scrollLeft <= 2);
        thumbNext.classList.toggle('disabled', thumbTrack.scrollLeft >= maxScroll - 2);
    }

    function updateOverlayContent(productId) {
        const data = productsInfo[productId];
        if (!data) return;

        // Update Text Fields
        document.querySelector('.overlay-title').textContent = data.title;
        document.querySelector('.details-info h1').textContent = data.title;
        document.querySelector('.pdp-meta').textContent = `Marca: Ortobom | Modelo: ${data.title}`;
        document.querySelector('.pdp-description').textContent = data.description;
        document.querySelector('.pdp-pricing .price-old').textContent = data.priceOld;
        document.querySelector('.pdp-pricing .price-now').innerHTML = `${data.priceNow} <span>à vista no PIX</span>`;
        document.querySelector('.pdp-pricing .save-badge').textContent = data.saving;
        document.querySelector('.installments').textContent = data.installments;

        // Update Badges
        const flashBadge = document.querySelector('.details-info .badge-premium-flash');
        const blackBadge = document.querySelector('.details-info .badge-black-friday');
        if (flashBadge) {
            flashBadge.innerHTML = `<i class="fas fa-bolt"></i> ${data.discount || '50% OFF'}`;
        }
        if (blackBadge) {
            blackBadge.style.display = data.isBlackFriday === false ? 'none' : 'flex';
        }

        // Update Gallery
        const mainImage = document.getElementById('pdpMainImage');
        const thumbTrack = document.getElementById('thumbTrack');

        if (mainImage) mainImage.src = data.gallery[0];

        if (thumbTrack) {
            thumbTrack.innerHTML = data.gallery.map((src, index) => `
                <img src="${src}" class="${index === 0 ? 'active' : ''}" onclick="changePdpImage(this.src)">
            `).join('');

            thumbTrack.scrollLeft = 0;
            // Delay update to allow layout rendering
            setTimeout(updateThumbNav, 50);
        }

        // Update Colors
        const colorSelection = document.querySelector('.color-selection');
        if (data.colors) {
            colorSelection.classList.add('active');
            const colorGrid = colorSelection.querySelector('.color-grid');
            const colorLabel = colorSelection.querySelector('.selected-color-name');

            colorLabel.textContent = data.colors[0].name;

            colorGrid.innerHTML = data.colors.map((color, index) => `
                <div class="color-opt ${index === 0 ? 'active' : ''}" 
                     data-color-name="${color.name}"
                     onclick="changePdpColor('${productId}', ${index}, this)">
                    <img src="${color.thumb}" alt="${color.name}">
                </div>
            `).join('');
        } else {
            colorSelection.classList.remove('active');
        }

        // Update Specs
        const specsGrid = document.getElementById('specsGrid');
        if (specsGrid) {
            specsGrid.innerHTML = Object.entries(data.specs).map(([key, val]) => `
                <div class="spec-row"><span>${key}</span> <strong>${val}</strong></div>
            `).join('');
        }

        // Update Warranty
        const warrantyGrid = document.getElementById('warrantyGrid');
        if (warrantyGrid) {
            warrantyGrid.innerHTML = Object.entries(data.warranty).map(([key, val]) => `
                <div class="spec-row"><span>${key}</span> <strong>${val}</strong></div>
            `).join('');
        }

        // Update Story
        const storyTitle = document.getElementById('storyTitle');
        const storyContent = document.getElementById('storyContent');
        if (storyTitle) storyTitle.textContent = `Conheça ${data.title}`;
        if (storyContent) {
            storyContent.innerHTML = data.story.map(row => `
                <div class="bio-row ${row.reverse ? 'reverse' : ''}">
                    <div class="bio-image">
                        <img src="${row.img}" alt="${data.title}">
                    </div>
                    <div class="bio-text">
                        <p>${row.text}</p>
                    </div>
                </div>
            `).join('');
        }
    }

    // Open Overlay
    productCards.forEach(card => {
        card.addEventListener('click', (e) => {
            if (!e.target.closest('.btn-buy')) {
                const productId = card.getAttribute('data-product-id');
                updateOverlayContent(productId);
                productOverlay.classList.add('active');
                body.style.overflow = 'hidden';
            }
        });
    });

    // Close Overlay
    closeOverlay?.addEventListener('click', () => {
        productOverlay.classList.remove('active');
        body.style.overflow = '';
    });

    // Close on backdrop click
    productOverlay?.addEventListener('click', (e) => {
        if (e.target === productOverlay) {
            productOverlay.classList.remove('active');
            body.style.overflow = '';
        }
    });

    // Quantity Logic
    qtyMinus?.addEventListener('click', () => {
        let val = parseInt(qtyVal.textContent);
        if (val > 1) qtyVal.textContent = val - 1;
    });

    qtyPlus?.addEventListener('click', () => {
        let val = parseInt(qtyVal.textContent);
        qtyVal.textContent = val + 1;
    });

    // Accordion Logic
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            item.classList.toggle('active');
        });
    });

    // Size Selection Logic
    sizeOpts.forEach(opt => {
        opt.addEventListener('click', () => {
            sizeOpts.forEach(s => s.classList.remove('active'));
            opt.classList.add('active');
            const price = opt.querySelector('.price').textContent;
            const pdpPrice = document.querySelector('.price-now');
            if (pdpPrice) {
                pdpPrice.innerHTML = `${price} <span>à vista no PIX</span>`;
            }
        });
    });

    // 6. Action Buttons Interactivity (Share/Favorite)
    const btnShare = document.getElementById('btnOverlayShare');
    const btnFavorite = document.getElementById('btnOverlayFavorite');

    btnFavorite?.addEventListener('click', () => {
        const isFavorite = btnFavorite.classList.toggle('active');
        const icon = btnFavorite.querySelector('i');
        if (isFavorite) {
            icon.classList.remove('far');
            icon.classList.add('fas');
        } else {
            icon.classList.remove('fas');
            icon.classList.add('far');
        }
    });

    btnShare?.addEventListener('click', () => {
        btnShare.classList.add('active');
        const dummyUrl = window.location.href;
        navigator.clipboard.writeText(dummyUrl).then(() => {
            const originalIcon = btnShare.innerHTML;
            btnShare.innerHTML = '<i class="fas fa-check"></i>';
            setTimeout(() => {
                btnShare.classList.remove('active');
                btnShare.innerHTML = originalIcon;
            }, 2000);
        });
    });

    // 7. Thumbnail Carousel Navigation
    const thumbTrack = document.getElementById('thumbTrack');
    const thumbPrev = document.getElementById('thumbPrev');
    const thumbNext = document.getElementById('thumbNext');

    if (thumbTrack && thumbPrev && thumbNext) {
        const scrollAmount = 150;

        thumbNext.addEventListener('click', () => {
            thumbTrack.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            setTimeout(updateThumbNav, 400); // Check after transition
        });

        thumbPrev.addEventListener('click', () => {
            thumbTrack.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            setTimeout(updateThumbNav, 400); // Check after transition
        });

        thumbTrack.addEventListener('scroll', updateThumbNav, { passive: true });
    }
    // Image Gallery Logic
    window.changePdpImage = (src) => {
        const mainImage = document.getElementById('pdpMainImage');
        const thumbnails = document.querySelectorAll('.image-thumbs img');

        if (mainImage) {
            mainImage.style.opacity = '0';
            setTimeout(() => {
                mainImage.src = src;
                mainImage.style.opacity = '1';
            }, 150);
        }

        thumbnails.forEach(thumb => {
            if (thumb.src === src) {
                thumb.classList.add('active');
            } else {
                thumb.classList.remove('active');
            }
        });
    };

    window.changePdpColor = (productId, colorIndex, element) => {
        const data = productsInfo[productId];
        const color = data.colors[colorIndex];

        // Update label
        const colorLabel = document.querySelector('.selected-color-name');
        if (colorLabel) colorLabel.textContent = color.name;

        // Update active state
        document.querySelectorAll('.color-opt').forEach(opt => opt.classList.remove('active'));
        element.classList.add('active');

        // Update main image and gallery
        const mainImage = document.getElementById('pdpMainImage');
        const thumbTrack = document.getElementById('thumbTrack');

        if (mainImage) {
            mainImage.style.opacity = '0';
            setTimeout(() => {
                mainImage.src = color.mainImg;
                mainImage.style.opacity = '1';
            }, 150);
        }

        if (thumbTrack) {
            thumbTrack.innerHTML = color.gallery.map((src, index) => `
                <img src="${src}" class="${index === 0 ? 'active' : ''}" onclick="changePdpImage(this.src)">
            `).join('');
            thumbTrack.scrollLeft = 0;
            setTimeout(updateThumbNav, 50);
        }
    };
});
