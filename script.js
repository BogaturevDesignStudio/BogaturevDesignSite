
  const targetWords = ["Designer", "Дизайнер"];
  const scrollTextElements = document.querySelectorAll('.scroll-text');

  scrollTextElements.forEach(el => {
    let html = el.innerHTML;

    targetWords.forEach(word => {
      const regex = new RegExp(word, 'g');
      const colored = word.split('').map((char, i) =>
        `<span class="colored-letter-${i % 8}">${char}</span>`
      ).join('');
      html = html.replace(regex, colored);
    });

    el.innerHTML = html;
  });


  window.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector(".main-header");
    const headerHeight = header.offsetHeight;
    document.body.style.paddingTop = headerHeight + "px";
  });


// Функция для отслеживания прокрутки и добавления/удаления класса "visible"
window.addEventListener('scroll', function() {
  const projects = document.querySelectorAll('.project');

  projects.forEach(project => {
    const rect = project.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {  // Проверка, что элемент виден
      project.classList.add('visible');
    } else {
      project.classList.remove('visible');
    }
  });
});
// Получаем все кнопки для открытия модальных окон
const modalBtns = document.querySelectorAll('.project');
// Для каждого проекта
modalBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const projectId = btn.getAttribute('data-project');
    const modal = document.getElementById(`${projectId}-modal`);
    modal.style.display = "block";  // Показываем модальное окно
  });
});

// Получаем все кнопки закрытия
const closeBtns = document.querySelectorAll('.close-btn');

// Для каждой кнопки закрытия
closeBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const modal = btn.closest('.modal');
    modal.style.display = "none";  // Скрываем модальное окно
  });
});
const allModals = document.querySelectorAll('.modal');
const navButtons = document.querySelectorAll('.modal-arrow');

navButtons.forEach(button => {
  button.addEventListener('click', () => {
    const currentModal = button.closest('.modal');
    const direction = button.dataset.direction;
    const modals = Array.from(allModals);
    const currentIndex = modals.indexOf(currentModal);

    let nextIndex;
    if (direction === 'next') {
      nextIndex = (currentIndex + 1) % modals.length;
    } else {
      nextIndex = (currentIndex - 1 + modals.length) % modals.length;
    }

    currentModal.style.display = 'none';
    modals[nextIndex].style.display = 'block';
  });
});
// ✅ Закрытие модального окна по клавише ESC
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal').forEach(modal => {
      if (modal.style.display === 'block') {
        modal.style.display = 'none';
      }
    });
  }
});
/*скрипт кнопки смотреть работы*/
const toggleBtn = document.getElementById("toggle-projects-btn");
  const projectsSection = document.getElementById("projects");
  let isVisible = false;

  toggleBtn.addEventListener("click", () => {
    isVisible = !isVisible;
    projectsSection.classList.toggle("show", isVisible);
    toggleBtn.textContent = isVisible ? "Скрыть работы" : "Смотреть работы";
    
    if (isVisible) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
  /* скрипт кнопки "Обо мне" */
const toggleAboutBtn = document.getElementById("toggle-about-btn");
const aboutSection = document.getElementById("about");
const scrollTextSection = document.getElementById("scroll-text-section"); // ⬅ добавим ссылку на блок
let isAboutVisible = false;

toggleAboutBtn.addEventListener("click", () => {
  isAboutVisible = !isAboutVisible;
  aboutSection.classList.toggle("show", isAboutVisible);
  toggleAboutBtn.textContent = isAboutVisible ? "Скрыть обо мне" : "Обо мне";
  
  if (isAboutVisible) {
    aboutSection.scrollIntoView({ behavior: 'smooth' });
  }
});
 const toggleSkillsBtn = document.getElementById("toggle-skills-btn");
const skillsSection = document.getElementById("skillsSection");
let isSkillsVisible = false;

toggleSkillsBtn.addEventListener("click", () => {
  isSkillsVisible = !isSkillsVisible;

skillsSection.classList.toggle("show", isSkillsVisible);
  toggleSkillsBtn.textContent = isSkillsVisible ? "Скрыть навыки" : "Мои навыки";

  if (isSkillsVisible) {
    skillsSection.scrollIntoView({ behavior: "smooth" });
  }
});
/*джава скрипт*/
    const container = document.getElementById('skillsContainer');
    const section = document.getElementById('skillsSection');

    section.addEventListener('mousemove', (e) => {
      const rect = section.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const scrollAmount = (x / rect.width - 0.5) * 2; // от -1 до 1
      const maxTranslateX = (container.scrollWidth - rect.width);
      const translateX = -maxTranslateX * (scrollAmount * 0.5 + 0.5); // от 0 до -max

      container.style.transform = `translateX(${translateX}px)`;
    });

const skillsWrap = document.getElementById("skillsContainer");
const skillsSectionMobile = document.getElementById("skillsSection");

if ("ontouchstart" in window) {
  const skills = [...skillsWrap.querySelectorAll(".skill")];
  // 📱 Адаптивный радиус под разные размеры экранов
  function getRadius() {
  if (window.innerWidth <= 320) return 180;   // очень маленькие телефоны
  if (window.innerWidth <= 480) return 255;   // обычные телефоны
  if (window.innerWidth <= 768) return 300;   // большие телефоны / маленькие планшеты
  if (window.innerWidth <= 1024) return 430;  // планшеты
  return 340;                                 // ноутбуки и мониторы
}

  let radius = getRadius(); // ← первый вызов
  const speed = 0.1; // чувствительность
  const friction = 0.94; // замедление
  const snapSpeed = 0.08; // скорость прилипания

  let rotationY = 0;
  let velocity = 0;
  let isDragging = false;

  // 3D-настройки
  skillsSectionMobile.style.perspective = "1000px";
  skillsWrap.style.transformStyle = "preserve-3d";
  skillsWrap.style.transformOrigin = "center center";
  skillsWrap.style.position = "relative";

  // Расставляем карточки по кругу
  const step = 360 / skills.length;
  skills.forEach((skill, i) => {
  const angle = step * i;

  // 💡 базовые значения центра
  let left = "35%";
  let top = "20%";

  // 📱 корректировка центра на маленьких экранах
  if (window.innerWidth <= 320) {
    left = "20%"; // сдвигаем чуть правее
    top = "5%";  // можно чуть ниже, если нужно
  } else if (window.innerWidth <= 375) {
    left = "20%"; // для стандартных телефонов
    top = "8%";
  }
  else if (window.innerWidth <= 480) {
    left = "21%"; // для стандартных телефонов
    top = "10%";
  }else if (window.innerWidth <= 768) {
    left = "32%"; // для стандартных телефонов
    top = "15%";
  }else if (window.innerWidth <= 1024) {
    left = "32%"; // для стандартных телефонов
    top = "19%";
  }

  skill.style.position = "absolute";
  skill.style.left = left;
  skill.style.top = top;
  skill.style.transform = `
    rotateY(${angle}deg)
    translateZ(${radius}px)
  `;
});


  // Анимация вращения
  function animate() {
    if (!isDragging) {
      rotationY += velocity;
      velocity *= friction;

      // Прилипание к ближайшей карточке
      if (Math.abs(velocity) < 0.001) {
        const snapAngle = Math.round(rotationY / step) * step;
        rotationY += (snapAngle - rotationY) * snapSpeed;
      }
    }

    // Обновляем позицию карточек
    skills.forEach((skill, i) => {
      const angle = step * i + rotationY;
      skill.style.transform = `
        rotateY(${angle}deg)
        translateZ(${radius}px)
      `;
    });

    requestAnimationFrame(animate);
  }

  animate();

  // Управление свайпом (разрешаем вертикальный скролл, запрещаем табы)
  let startX = 0;
  let startY = 0;
  let lastX = 0;
  let isVerticalScroll = false;
  let moved = false; // флаг — было ли движение
  const swipeThreshold = 10; // минимальное смещение по X, чтобы считать это свайпом

  skillsSectionMobile.addEventListener("touchstart", (e) => {
    isDragging = true;
    moved = false;
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    lastX = startX;
    isVerticalScroll = false;
  }, { passive: true });

  skillsSectionMobile.addEventListener("touchmove", (e) => {
    if (!isDragging) return;

    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    const deltaX = currentX - lastX;
    const deltaY = currentY - startY;

    // Проверяем направление свайпа
    if (Math.abs(deltaY) > Math.abs(deltaX)) {
      isVerticalScroll = true;
      return; // вертикальный свайп — разрешаем прокрутку страницы
    }

    // Проверяем, что движение по X достаточно велико, иначе считаем это табом
    if (Math.abs(currentX - startX) < swipeThreshold) {
      return; // короткое касание — ничего не делаем
    }

    // Горизонтальный свайп — вращаем
    e.preventDefault(); // блокируем только горизонтальный свайп
    moved = true;
    lastX = currentX;
    velocity = deltaX * speed * 2;
    rotationY += velocity;
  }, { passive: false });

  skillsSectionMobile.addEventListener("touchend", (e) => {
    // Если не было движения — значит это таб → ничего не делаем
    if (!moved) {
      e.preventDefault();
      e.stopPropagation();
    }
    isDragging = false;
    moved = false;
  });

  // Блокируем двойное нажатие (масштаб)
  let lastTapTime = 0;
  skillsSectionMobile.addEventListener(
    "touchend",
    (e) => {
      const currentTime = new Date().getTime();
      const tapLength = currentTime - lastTapTime;

      if (tapLength < 400 && tapLength > 0) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }

      lastTapTime = currentTime;
    },
    { passive: false }
  );
} // ✅ закрывающая скобка if



/*Перевод*/
  document.addEventListener('DOMContentLoaded', () => {
   
  const translations = {
    ru: {
      aboutShow: "Обо мне",
  aboutHide: "Скрыть обо мне",
  skillsShow:"Мои навыки",
  my_skills:"Мои навыки",
  opisanye1:"Разработка дизайна металлической банки Jumbo 115 (4,2 л) для промышленного применения.Проект включал создание концепции оформления в соответствии с фирменным стилем заказчика, подбор цветовой палитры, разработку графики и шрифтовых решений. Дизайн адаптирован под технологию печати по металлу с учётом цветопередачи и точности совмещения слоёв. Итоговый макет оптимизирован для массового производства и обеспечивает узнаваемость бренда на рынке",
  opisanye2:"Допечатная подготовка, или препресс, — это комплекс технологических процессов, необходимых для подготовки макета к печати. Она включает в себя редактуру, верстку, цветоделение, создание цветопробы, вывод печатных форм (в офсетной печати) и другие операции. Цель допечатной подготовки – преобразовать дизайн-макет в вид, соответствующий требованиям конкретного печатного оборудования и технологии печати.",
  opisanye3:"<br>✅ Полностью кастомная верстка, без шаблонов<br>✅ Модальные окна для проектов<br>✅ Языковая адаптация (i18n / мультиязычность)<br>✅ Кастомные hover-эффекты и анимации<br>✅ Респонсивность (адаптивность для мобилок/планшетов)<br>✅ Уникальный дизайн (не взятый из шаблона)",
  opisanye4:"Создание фирменного стиля бренда — комплексная разработка визуальной айдентики, которая помогает компании выделиться на рынке и выстроить узнаваемый образ. Включает создание логотипа, подбор цветовой палитры, шрифтов, графических элементов и правил их использования. Каждый проект создаётся с учётом ценностей бренда, целевой аудитории и особенностей ниши, чтобы визуальная идентичность не только выглядела современно, но и работала на развитие бизнеса.",
  opisanye5:"Коммерческий дизайн — это визуальный инструмент продаж. Я разрабатываю макеты, которые привлекают внимание, формируют доверие и мотивируют клиента сделать выбор в вашу пользу. Красиво, современно и с прицелом на максимальную эффективность.",
  opisanye6:"Motion-дизайн — это магия движения, которая оживляет идеи. Я превращаю статичные изображения в динамичные истории, которые захватывают внимание и вызывают эмоции. Каждая анимация создаётся так, чтобы усиливать восприятие бренда и оставаться в памяти.",
  opisanye7:"Редизайн — это новое дыхание для вашего бренда. Я бережно сохраняю узнаваемые элементы, добавляя свежие решения, современные визуальные приёмы и удобство восприятия. В итоге бренд выглядит актуально и конкурентно.",
  opisanye8:"Дизайн для маркетинга — визуальные решения, которые привлекают внимание, вызывают эмоции и стимулируют продажи.",
  opisanye9:"Иллюстрации и инфографика — разработка наглядных и эстетичных визуальных материалов, которые помогают доносить сложную информацию простыми и понятными образами. Создаю графику, которая повышает вовлечённость аудитории и усиливает восприятие бренда.",
  packaging_design: "Дизайн упаковки",
  prepressTitle: "Предпечатная подготовка",  /* ✅ Новый перевод */
  Fullstackdevelopment:"Создаю и разрабатываю сайты",
  developfolio:"Современные сайты под ключ",
  BrandIdentity:"Брендинг",
  EcommerceDesign:"Дизайн для электронной коммерции",
  Ecommercfolio:"Дизайн для маркетплейсов",
  MotionGraphics:"Моушн-графика",
  Motionfolio:"Анимация и Моушн-дизайн",
  Redesign:"Концептуальные проекты редизайн",
  Reimaginingfolio:"Переосмысление старого дизайна",
  DesignforMarketing:"Дизайн для маркетинга",
  Marketingfolio:"Баннеры, рекламные креативы, презентации, e-mail рассылки",
  Illustration:"Иллюстрация и инфографика.",
  Illustrationfolio:"Ручная или векторная иллюстрация, инфографика для презентаций и соцсетей",
  portfoliopackaging:"Дизайн упаковки, который выделяет продукт и делает его заметным на полке",
  prepressfolio:"Профессиональная подготовка макетов к печати с учётом всех технических требований",
  Brandfolio:"Брендинг",
  skillsHide: "Скрыть навыки",
  skills: "Фотошоп",
  skillsI: "Иллюстратор",
  skillsD: "Разработка",
  skillsMD: "Моушн-дизайн",
  skillsC: "Креатив",
      show: "Смотреть работы",
      hide: "Скрыть работы",
      language: "Язык",
      about: "Обо мне",
      contactMe: "Связаться со мной",
      watchProjects: "Смотреть работы",
      mySkills: "Мои навыки",
      selectStyle: "Подобрать стиль",
      neomorphism: "Неоморфизм",
      minimalism:"Минимализм",
      glassmorphism:"Глассморфизм",
      cyberpunk:"Киберпанк",
      animation:"Анимация",
      brutalism:"Брутализм",
      select_sector:"Выберите сектор",
      spin_button:"Крутить",
      reset_spin:"Сбросить вращение",
      designStudio: "Дизайн студия",
      services: "Спектр услуг",
      service1: "Графический дизайн",
      service2: "Веб-дизайн",
      service3: "Дизайн упаковки",
      service4: "Прототипирование",
      service5: "Брендинг",
      myProjects: "Мои проекты",
      contactTitle: "Связаться со мной",
      contactText : "Свяжись со мной любым удобным способом — письмом, звонком или сообщением. Обещаю ответить лично в течение 24 часов.",
      contactButton: "Написать письмо",
      footer: "&copy; 2025 Женя Богатырёв"
    },
    en: {
       aboutShow: "About Me",
  aboutHide: "Hide About Me",
  skillsShow:"My Skills",
  my_skills:"My Skills",
  opisanye1:"Design development of the Jumbo 115 (4.2 L) metal can for industrial use.The project included creating a design concept in line with the client’s corporate identity, selecting a color palette, and developing graphic and typographic solutions. The design was adapted to metal printing technology, taking into account color accuracy and layer registration. The final layout was optimized for mass production and ensures strong brand recognition in the market.",
  opisanye2:"Prepress is a set of technological processes required to prepare a layout for printing. It includes editing, typesetting, color separation, proof creation, plate making (in offset printing), and other operations. The goal of prepress is to transform the design layout into a form that meets the requirements of specific printing equipment and printing technology.",
  opisanye3:"<br>✅ Fully custom layout, no templates<br>✅ Modal windows for projects<br>✅ Language adaptation (i18n / multilingual support)<br>✅ Custom hover effects and animations<br>✅ Responsiveness (mobile/tablet friendly)<br>✅ Unique design (not taken from a template)",
  opisanye4:"Brand identity design is a comprehensive development of visual identity that helps a company stand out in the market and build a recognizable image. It includes creating a logo, selecting a color palette, typography, graphic elements, and usage guidelines. Each project is created with the brand’s values, target audience, and industry specifics in mind, ensuring that the visual identity not only looks modern but also supports business growth.",
  opisanye5:"Commercial design is a visual sales tool. I create layouts that capture attention, build trust, and motivate the client to choose your product or service. Stylish, modern, and focused on maximum efficiency.",
  opisanye6:"Motion design is the magic of movement that brings ideas to life. I transform static images into dynamic stories that capture attention and evoke emotions. Each animation is crafted to enhance brand perception and remain memorable.",
  opisanye7:"Redesign is a new breath of life for your brand. I carefully preserve recognizable elements while adding fresh solutions, modern visual techniques, and improved usability. As a result, the brand looks relevant and competitive.",
  opisanye8:"Marketing design is about visual solutions that attract attention, evoke emotions, and drive sales.",
  opisanye9:"Illustrations and infographics are the creation of clear and aesthetic visual materials that help convey complex information in simple and understandable ways. I design graphics that increase audience engagement and strengthen brand perception.",
  packaging_design: "Packaging Design",
   prepressTitle: "Pre-press preparation",
   Fullstackdevelopment:"Full-stack development",
   developfolio:"Modern websites delivered turnkey",
   BrandIdentity:"Brand Identity",
   EcommerceDesign:"E-commerce Design",
   Ecommercfolio:"Marketplace design",
   MotionGraphics:"Motion Graphics",
   Motionfolio:"Animation & Motion Design",
   Redesign:"Conceptual Projects / Redesign",
   Reimaginingfolio:"Reimagining the old design",
   DesignforMarketing:"Marketing Design",
   Marketingfolio:"Banners, ad creatives, presentations, email campaigns",
   Illustration:"Illustration & Infographics",
   Illustrationfolio:"Hand-drawn or vector illustration, infographics for presentations and social media",
   portfoliopackaging:"Packaging design that captures attention and highlights the value of the product",
   prepressfolio:"Professional preparation of layouts for printing with all technical requirements in mind",
   Brandfolio:"Branding",
  skillsHide: "Hide Skills",
  skills: "Photoshop",
  skillsI: "Illustrator",
  skillsD: "Development",
  skillsMD: "Motion-Design",
  skillsC: "Creativity",
      show: "View Projects",
      hide: "Hide Projects",
      language: "Language",
      about: "About Me",
      contactMe: "Contact Me",
      watchProjects: "See Projects",
      mySkills: "My Skills",
      selectStyle: "Choose style",
      neomorphism: "Neomorphism",
      minimalism:"Minimalism",
      glassmorphism:"Glassmorphism",
      cyberpunk:"Cyberpunk",
      animation:"Animation",
      brutalism:"Brutalism",
      select_sector:"Select a sector",
      spin_button:"Spin",
      reset_spin:"Reset Spin",
      designStudio: "Design Studio",
      services: "Services",
      service1: "Graphic Design",
      service2: "Web Design",
      service3: "Packaging Design",
      service4: "Prototyping",
      service5: "Branding",
      myProjects: "My Projects",
      contactTitle: "Contact Me",
      contactText : "Contact me in any convenient way — by email, call, or message. I promise to respond personally within 24 hours.",
      contactButton: "Send Email",
      footer: "&copy; 2025 Zhenya Bogatyrev"
    },
    uk: {
      aboutShow: "Про мене",
  aboutHide: "Приховати про мене",
  skillsShow:"Мої навички",
  my_skills:"Мої навички",
  opisanye1:"Розробка дизайну металевої банки Jumbo 115 (4,2 л) для промислового використання.Проєкт включав створення концепції оформлення відповідно до фірмового стилю замовника, підбір кольорової палітри, розробку графіки та шрифтових рішень. Дизайн адаптований під технологію друку по металу з урахуванням передачі кольорів та точності суміщення шарів. Кінцевий макет оптимізований для масового виробництва та забезпечує впізнаваність бренду на ринку.",
  opisanye2:"Допечатна підготовка, або препрес, — це комплекс технологічних процесів, необхідних для підготовки макета до друку. Вона включає редактуру, верстку, кольороподіл, створення кольоропроби, вивід друкарських форм (в офсетному друці) та інші операції. Мета допечатної підготовки – перетворити дизайн-макет у вигляд, що відповідає вимогам конкретного друкарського обладнання та технології друку.",
  opisanye3:"<br>✅ Повністю кастомна верстка, без шаблонів<br>✅ Модальні вікна для проєктів<br>✅ Мовна адаптація (i18n / багатомовність)<br>✅ Кастомні hover-ефекти та анімації<br>✅ Респонсивність (адаптивність для мобільних/планшетів)<br>✅ Унікальний дизайн (не взятий із шаблону)",
  opisanye4:"Створення фірмового стилю бренду — комплексна розробка візуальної айдентики, яка допомагає компанії вирізнитися на ринку та сформувати впізнаваний образ. Включає створення логотипа, підбір кольорової палітри, шрифтів, графічних елементів і правил їх використання. Кожен проєкт створюється з урахуванням цінностей бренду, цільової аудиторії та особливостей ніші, щоб візуальна ідентичність не лише виглядала сучасно, але й працювала на розвиток бізнесу.",
  opisanye5:"Комерційний дизайн — це візуальний інструмент продажів. Я розробляю макети, які привертають увагу, формують довіру та мотивують клієнта зробити вибір на вашу користь. Гарно, сучасно та з акцентом на максимальну ефективність.",
  opisanye6:"Motion-дизайн — це магія руху, яка оживляє ідеї. Я перетворюю статичні зображення на динамічні історії, що привертають увагу та викликають емоції. Кожна анімація створюється так, щоб посилювати сприйняття бренду та залишатися в пам’яті.",
  opisanye7:"Редизайн — це нове дихання для вашого бренду. Я дбайливо зберігаю впізнавані елементи, додаючи свіжі рішення, сучасні візуальні прийоми та зручність сприйняття. У результаті бренд виглядає актуально та конкурентно.",
  opisanye8:"Дизайн для маркетингу — це візуальні рішення, які привертають увагу, викликають емоції та стимулюють продажі.",
  opisanye9:"Ілюстрації та інфографіка — розробка наочних і естетичних візуальних матеріалів, які допомагають доносити складну інформацію простими та зрозумілими образами. Створюю графіку, що підвищує залученість аудиторії та посилює сприйняття бренду.",
  packaging_design: "Дизайн упаковки",
  prepressTitle: "Додрукарська підготовка",
  Fullstackdevelopment:"Створюю та розробляю сайти",
  developfolio:"Сучасні сайти під ключ",
  BrandIdentity:"Фірмовий стиль бренду.",
  EcommerceDesign:"Дизайн інтернет-магазинів.",
  Ecommercfolio:"Дизайн для маркетплейсів",
  MotionGraphics:"Моушн-графіка",
  Motionfolio:"Рухома графіка та анімація",
  Redesign:"Проєкти з переосмислення дизайну",
  Reimaginingfolio:"Переосмислення старого дизайну",
  DesignforMarketing:"Дизайн рекламних матеріалів",
  Marketingfolio:"Банери, рекламні креативи, презентації, e-mail розсилки",
  Illustration:"Ілюстрація та інфографіка",
  Illustrationfolio:"Ручна або векторна ілюстрація, інфографіка для презентацій і соцмереж",
  portfoliopackaging:"Дизайн упаковки, що привертає увагу та підкреслює цінність продукту",
  prepressfolio:"Професійна підготовка макетів до друку з урахуванням усіх технічних вимог",
  Brandfolio:"Брендинг",
  skillsHide: "Приховати навички",
  skills: "Фотошоп",
  skillsI: "Ілюстратор",
  skillsD: "Розробка",
  skillsMD: "Моушн-дизайн",
  skillsC: "Креатив",
      show: "Переглянути роботи",
      hide: "Сховати роботи",
      language: "Мова",
      about: "Про мене",
      contactMe: "Зв'язатися зі мною",
      watchProjects: "Переглянути роботи",
      mySkills: "Мої навички",
      selectStyle:"Підібрати стиль",
      neomorphism: "Неоморфізм",
      minimalism: "Мінімалізм",
      glassmorphism:"Глассморфізм",
      cyberpunk:"Кіберпанк",
      animation:"Анімація",
      brutalism:"Бруталізм",
      select_sector:"Виберіть сектор",
      spin_button:"Крутити",
      reset_spin:"Скинути обертання",
      designStudio: "Дизайн студія",
      services: "Послуги",
      service1: "Графічний дизайн",
      service2: "Веб-дизайн",
      service3: "Дизайн упаковки",
      service4: "Прототипування",
      service5: "Брендинг",
      myProjects: "Мої проєкти",
      contactTitle: "Зв'язатися зі мною",
      contactText : "Зв’яжіться зі мною будь-яким зручним способом — листом, дзвінком або повідомленням. Обіцяю відповісти особисто протягом 24 годин.",
      contactButton: "Написати листа",
      footer: "&copy; 2025 Женя Богатирьов"
    }
  };

  const toggleBtn = document.getElementById("toggle-projects-btn");
  const projectsSection = document.getElementById("projects");
  let isVisible = false;
  let lang = localStorage.getItem('lang') || 'ru';

  function setLanguage(newLang) {
    lang = newLang;
    localStorage.setItem('lang', lang);

    // Обновляем все элементы с data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      if (translations[lang] && translations[lang][key]) {
        el.innerHTML = translations[lang][key];
      }
    });

    // Обновляем кнопку просмотра проектов
    const btnKey = isVisible ? 'hide' : 'show';
    toggleBtn.innerHTML = translations[lang][btnKey];

    const btnKeyAbout = isAboutVisible ? 'aboutHide' : 'aboutShow';
     toggleAboutBtn.innerHTML = translations[lang][btnKeyAbout];

    const btnKeySkills = isSkillsVisible ? 'skillsHide' : 'skillsShow';
    toggleSkillsBtn.innerHTML = translations[lang][btnKeySkills];
  }

  toggleBtn.addEventListener("click", () => {
    isVisible = !isVisible;
    projectsSection.style.display = isVisible ? "block" : "none";

    // Обновляем текст кнопки с текущим языком
    const btnKey = isVisible ? 'hide' : 'show';
    toggleBtn.innerHTML = translations[lang][btnKey];
if (isVisible) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
    // Кнопка "Обо мне"
const toggleAboutBtn = document.getElementById("toggle-about-btn");
const aboutSection = document.getElementById("about");
let isAboutVisible = false;

toggleAboutBtn.addEventListener("click", () => {
  isAboutVisible = !isAboutVisible;
  aboutSection.style.display = isAboutVisible ? "block" : "none";

  const btnKey = isAboutVisible ? "aboutHide" : "aboutShow";
  toggleAboutBtn.innerHTML = translations[lang][btnKey];

  if (isAboutVisible) {
    aboutSection.scrollIntoView({ behavior: "smooth" });
  }
});

toggleSkillsBtn.addEventListener("click", () => {
  isSkillsVisible = !isSkillsVisible;
  skillsSection.style.display = isSkillsVisible ? "block" : "none";

  const btnKey = isSkillsVisible ? "skillsHide" : "skillsShow";
  toggleSkillsBtn.innerHTML = translations[lang][btnKey];

  if (isSkillsVisible) {
    skillsSection.scrollIntoView({ behavior: "smooth" });
  }
});

  document.querySelectorAll('[data-lang]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      setLanguage(e.target.dataset.lang);
    });
  });

  // Инициализация страницы с нужным языком
  setLanguage(lang);
});
toggleSkillsBtn.addEventListener("click", () => {
  isSkillsVisible = !isSkillsVisible;
  console.log('Skills visible:', isSkillsVisible);
  skillsSection.classList.toggle("show", isSkillsVisible);
  toggleSkillsBtn.textContent = isSkillsVisible ? "Скрыть навыки" : "Мои навыки";
  if (isSkillsVisible) {
    skillsSection.scrollIntoView({ behavior: "smooth" });
  }
});
//фоновая анимация//
  
  const blobs = document.querySelectorAll('.blob'); 

  blobs.forEach(blob => {
    function animateBlob() {
      const x = (Math.random() - 0.5) * window.innerWidth;
      const y = (Math.random() - 0.5) * window.innerHeight;
      const scale = 1 + Math.random() * 0.5;
      blob.animate(
        [
          { transform: 'translate(0, 0) scale(1)' },
          { transform: `translate(${x}px, ${y}px) scale(${scale})` }
        ],
        {
          duration: 5000 + Math.random() * 2000,
          direction: 'alternate',
          iterations: Infinity,
          easing: 'ease-in-out'
        }
      );
    }
    animateBlob();
  });
//начало ветрячка !!! //
(function () {
  /*// ручка для открытия
  let isDragging = false;
  let startX = 0;
  let currentX = 0;

  puller.addEventListener("mousedown", (e) => {
    isDragging = true;
    startX = e.clientX;
    puller.style.cursor = "grabbing";
  });

  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    currentX = e.clientX - startX;

    if (currentX > 100) {
      container.style.display = "block";
      isDragging = false;
      puller.style.cursor = "grab";
    }
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
    puller.style.cursor = "grab";
  });
*/
  // Спиннер
  const circle = document.getElementById('mySpinWidget-circle');
  const sectors = circle.querySelectorAll('.sector');
  // Назначаем каждой надписи в секторе обратный угол, чтобы оставалась горизонтальной
sectors.forEach((sector, index) => {
  const sectorAngle = 360 / sectors.length;
  let rotation = sectorAngle * index;
  const label = sector.querySelector('.sector-label');
  if (label) {
    // Если сектор "перевёрнут", дополнительно разворачиваем текст на 180°
    if (rotation > 90 && rotation < 270) {
      rotation += 180;
    }
    label.style.setProperty('--sector-rotation', `${rotation}deg`);
  }
});

  const centerLabel = document.getElementById('mySpinWidget-centerLabel');
  const spinBtn = document.getElementById('mySpinWidget-spinBtn');
  const resetBtn = document.getElementById('mySpinWidget-resetBtn');
  const overlay = document.getElementById('mySpinWidget-color-overlay');

  let startAngle = 0, currentAngle = 0, velocity = 0, lastMoveTime = 0, lastAngle = 0;
  let animationFrameId, isSpinning = false, isDraggingCircle = false;

  function getAngle(e) {
    const rect = circle.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    return Math.atan2(dy, dx) * (180 / Math.PI);
  }

  circle.addEventListener('mousedown', e => {
    if (isSpinning) return;
    isDraggingCircle = true;
    startAngle = getAngle(e) - currentAngle;
    lastMoveTime = Date.now();
    lastAngle = getAngle(e);
    circle.style.cursor = 'grabbing';
    cancelAnimationFrame(animationFrameId);
  });

  window.addEventListener('mousemove', e => {
    if (!isDraggingCircle) return;
    const angle = getAngle(e);
    currentAngle = angle - startAngle;
    circle.style.transform = `rotate(${currentAngle}deg)`;
    const now = Date.now();
    velocity = (angle - lastAngle) / (now - lastMoveTime) * 16;
    lastMoveTime = now;
    lastAngle = angle;
  });

  window.addEventListener('mouseup', () => {
    if (!isDraggingCircle) return;
    isDraggingCircle = false;
    circle.style.cursor = 'grab';
    applyInertia();
  });

  function applyInertia() {
    velocity *= 0.95;
    if (Math.abs(velocity) < 0.01) return;
    currentAngle += velocity;
    circle.style.transform = `rotate(${currentAngle}deg)`;
    // Компенсация поворота текста в лепестках (сектор-label)
sectors.forEach((sector, index) => {
  const label = sector.querySelector('.sector-label');
  if (label) {
  }
});

    animationFrameId = requestAnimationFrame(applyInertia);
  }

  function resetRotation() {
    if (isSpinning) return;
    currentAngle = 0;
    velocity = 0;
    circle.style.transform = 'rotate(0deg)';
    sectors.forEach(s => s.classList.remove('active'));
    centerLabel.textContent = 'Выберите сектор';
  }
const sectorLinksByText = { 
  "Неоморфизм": "https://en.wikipedia.org/wiki/Neomorphism",
  "Минимализм": "https://ru.wikipedia.org/wiki/%D0%9C%D0%B8%D0%BD%D0%B8%D0%BC%D0%B0%D0%BB%D0%B8%D0%B7%D0%BC_(%D0%B4%D0%B8%D0%B7%D0%B0%D0%B9%D0%BD)",
  "Глассморфизм": "https://www.uprock.ru/education/glassmorfizm",
  "Киберпанк": "https://ru.wikipedia.org/wiki/%D0%9A%D0%B8%D0%B1%D0%B5%D1%80%D0%BF%D0%B0%D0%BD%D0%BA",
  "Брутализм": "https://ru.wikipedia.org/wiki/%D0%91%D1%80%D1%83%D1%82%D0%B0%D0%BB%D0%B8%D0%B7%D0%BC",
  "Анимация": "https://ru.wikipedia.org/wiki/%D0%90%D0%BD%D0%B8%D0%BC%D0%B0%D1%86%D0%B8%D0%BE%D0%BD%D0%BD%D1%8B%D0%B9_%D0%B4%D0%B8%D0%B7%D0%B0%D0%B9%D0%BD",
};

  

  function spinWheel() {
  if (isSpinning) return;
  isSpinning = true;
  spinBtn.disabled = true;
  resetBtn.disabled = true;

// Убираем надпись при начале вращения
  centerLabel.textContent = '';
  // Сброс предыдущего угла, чтобы не копился
  currentAngle = 0;
  circle.style.transform = 'rotate(0deg)';

  // Расчёт вращения
  const sectorAngle = 360 / sectors.length;
  const randomSector = Math.floor(Math.random() * sectors.length);
  const minSpins = 3; // минимум 3 оборота (1080 градусов)
  const extraSpins = Math.floor(Math.random() * 3); // до 2 доп. оборотов
  const totalRotation = 360 * (minSpins + extraSpins) + Math.random() * 360;
  const targetSectorAngle = (360 - (randomSector * sectorAngle) - sectorAngle / 2);
  const targetAngle = totalRotation + targetSectorAngle;

  const duration = 4000;
  const start = performance.now();
  const initialAngle = 0;

  let lastSpread = 0;

  function animate(time) {
    const t = (time - start) / duration;
    if (t >= 1) {
      currentAngle = targetAngle;
      circle.style.transform = `rotate(${currentAngle}deg)`;
      // Компенсация поворота текста
sectors.forEach((sector) => {
  const label = sector.querySelector('.sector-label');
  if (label) {
  }
});

      sectors.forEach(s => s.classList.remove('active'));
      sectors[randomSector].classList.add('active');
     centerLabel.innerHTML = `<span style="display:inline-block; transform: rotate(${-currentAngle % 360}deg);">${sectors[randomSector].textContent.trim()}</span>`;
// Удалим старые обработчики на всех секторах

// Повторно получим sectors (т.к. DOM изменился)
const updatedSectors = circle.querySelectorAll('.sector');
const activeSector = updatedSectors[randomSector];

// Добавляем клик на выбранный сектор
// Получаем текст активного сектора
const labelEl = activeSector.querySelector('.sector-label');
const selectedText = labelEl ? labelEl.textContent.trim() : '';
const selectedLink = sectorLinksByText[selectedText];

// Проверяем: если есть ссылка — навешиваем переход
if (selectedLink) {
  activeSector.addEventListener('click', () => {
    window.location.href = selectedLink;
  });
}


      spinBtn.disabled = false;
      resetBtn.disabled = false;
      isSpinning = false;
      return;
    }

   // 🌀 Более мягкая ease-out (медленнее и глаже)
    const easeOut = 1 - Math.pow(1 - t, 2.5); // вместо t³
    currentAngle = initialAngle + easeOut * (targetAngle - initialAngle);
    circle.style.transform = `rotate(${currentAngle}deg)`;

    // Цветовой эффект
    if (time - lastSpread > 300) {
      addColorSpread(getRandomBrightColor());
      lastSpread = time;
    }

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
}

  function addColorSpread(color) {
    const spread = document.createElement('div');
    spread.className = 'color-spread';
    spread.style.backgroundColor = color;
    const rect = circle.getBoundingClientRect();
    spread.style.left = `${rect.left + rect.width / 2}px`;
    spread.style.top = `${rect.top + rect.height / 2}px`;
    spread.style.transform = 'translate(-50%, -50%)';
    overlay.appendChild(spread);
    setTimeout(() => overlay.removeChild(spread), 3000);
  }

  function getRandomBrightColor() {
    const hue = Math.floor(Math.random() * 360);
    return `hsl(${hue}, 100%, 60%)`;
  }

  spinBtn.addEventListener('click', spinWheel);
  resetBtn.addEventListener('click', resetRotation);

})();

// Закрытие
document.getElementById('closeSpinModal').addEventListener('click', () => {
  document.getElementById('spinModalOverlay').style.display = 'none';
   document.body.style.overflow = ''; // ✅ Возврат прокрутки
   document.documentElement.style.overflow = '';
   

});
// Закрытие по клавише Esc
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const modal = document.getElementById('spinModalOverlay');
    if (modal.style.display === 'flex') {
      modal.style.display = 'none';
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
  }
});
// Скрипт для передвигания кнопки (мышь + тач)
const dragBtn = document.getElementById('dragToUnlock');
let isDragging = false;
let startX, currentX;

// ====== 🖱️ Управление мышью ======
dragBtn.addEventListener('mousedown', (e) => {
  isDragging = true;
  startX = e.clientX;
  dragBtn.style.cursor = 'grabbing';
});

document.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  moveButton(e.clientX);
});

document.addEventListener('mouseup', () => {
  if (!isDragging) return;
  isDragging = false;
  resetButton();
});

// ====== 📱 Управление пальцем ======
dragBtn.addEventListener('touchstart', (e) => {
  isDragging = true;
  startX = e.touches[0].clientX;
});

document.addEventListener('touchmove', (e) => {
  if (!isDragging) return;
  moveButton(e.touches[0].clientX);
});

document.addEventListener('touchend', () => {
  if (!isDragging) return;
  isDragging = false;
  resetButton();
});

// ====== Основная функция движения ======
function moveButton(currentClientX) {
  currentX = currentClientX - startX;
  const maxRight = 400; // зона конца

  // Ограничение движения
  if (currentX < 0) currentX = 0;
  if (currentX > maxRight) currentX = maxRight;

  dragBtn.style.left = `${currentX}px`;

  // Проверка достижения конца
  if (currentX >= maxRight - 10) {
    openSpinModal();
    resetButton();
  }
}
function moveButton(currentClientX) {
  currentX = currentClientX - startX;
  
  // 🔹 адаптивная длина движения
  const maxRight = window.innerWidth <= 480 ? 200 : 400; 

  if (currentX < 0) currentX = 0;
  if (currentX > maxRight) currentX = maxRight;

  dragBtn.style.left = `${currentX}px`;

  if (currentX >= maxRight - 10) {
    openSpinModal();
    resetButton();
  }
}
// ====== Сброс положения ======
function resetButton() {
  dragBtn.style.left = '0px';
  dragBtn.style.cursor = 'grab';
}

// ====== Открытие модального окна ======
function openSpinModal() {
  const modal = document.getElementById('spinModalOverlay');
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
  document.documentElement.style.overflow = 'hidden';
}

// ====== Отмена по ESC ======
document.addEventListener("keyup", (e) => {
  if (e.key === "Escape") {
    isDragging = false;
    dragBtn.style.left = "0px";
    dragBtn.style.cursor = "grab";
    dragBtn.style.backgroundColor = "#333";

    const spinner = document.getElementById("spinner");
    if (spinner) spinner.style.display = "none";

    const overlay = document.getElementById("overlay");
    if (overlay) overlay.style.display = "none";
  }
});

// Берём только картинки из модального окна
document.querySelectorAll('.modal-images img').forEach(img => {
  img.addEventListener('click', function () {
    if (!document.fullscreenElement) {
      // Открываем картинку на весь экран
      if (this.requestFullscreen) {
        this.requestFullscreen();
      } else if (this.webkitRequestFullscreen) { // Safari
        this.webkitRequestFullscreen();
      } else if (this.msRequestFullscreen) { // IE/Edge
        this.msRequestFullscreen();
      }
    } else {
      // Выходим из полноэкранного режима
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  });
});
// настройка кнопки языка на мобилках
document.addEventListener('DOMContentLoaded', () => {
  const langSelect = document.querySelector('.lang-select');
  if (!langSelect) return;

  const langOptions = langSelect.querySelector('.lang-select-options');

  // Определение тач-устройства (более надёжно чем только ontouchstart)
  const isTouch = (('ontouchstart' in window) || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0);

  // Функции открытия/закрытия
  function openLang() {
    langSelect.classList.add('open');
    langSelect.setAttribute('aria-expanded', 'true');
  }
  function closeLang() {
    langSelect.classList.remove('open');
    langSelect.setAttribute('aria-expanded', 'false');
  }
  function toggleLang() {
    if (langSelect.classList.contains('open')) closeLang(); else openLang();
  }

  // На тач-устройствах — используем клик
  if (isTouch) {
    langSelect.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleLang();
    });

    // Закрываем, если кликнули вне
    document.addEventListener('click', (e) => {
      if (!langSelect.contains(e.target)) {
        closeLang();
      }
    });

    // Клавиатурная поддержка: Enter/Space открывает меню
    langSelect.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
        e.preventDefault();
        toggleLang();
      } else if (e.key === 'Escape' || e.key === 'Esc') {
        closeLang();
        langSelect.focus();
      }
    });

    // Если пользователь нажал куда-то в опциях — закрыть меню (и можно тут обрабатывать выбор)
    langOptions.addEventListener('click', (e) => {
      const link = e.target.closest('a');
      if (link) {
        // здесь можно обработать смену языка, если нужно:
        // const selected = link.dataset.lang;
        // doLanguageSwitch(selected);
        // После выбора — закрыть меню
        closeLang();
      }
    });
  } else {
    // На ПК — обновим aria-expanded при hover (чтобы состояние соответствовало)
    langSelect.addEventListener('mouseenter', () => {
      langSelect.setAttribute('aria-expanded', 'true');
    });
    langSelect.addEventListener('mouseleave', () => {
      langSelect.setAttribute('aria-expanded', 'false');
    });
  }
});