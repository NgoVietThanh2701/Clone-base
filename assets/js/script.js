
/* DEMO WEBSITE */

setTimeout(function () {
    document.querySelector('.demo').style.display = 'none';
    document.querySelector('.header').style.display = 'flex';
    document.querySelector('.main').style.display = 'block';
    document.querySelector('.footer').style.display = 'block';

}, 2850);


/** BG_BOTTOM APPEAR */

const appear_bg = document.querySelector('[data-appear-bg]');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const viewportHeight = window.innerHeight;
    const imageHeight = appear_bg.offsetHeight;

    // Tính toán tỉ lệ ẩn dần của hình ảnh
    const scrollPercentage = Math.min(scrollY / (viewportHeight * 2), 1); // Đảm bảo tỉ lệ từ 0 đến 1

    // Dịch chuyển hình ảnh vào trong bottom dựa trên tỉ lệ cuộn
    const translateY = scrollPercentage * imageHeight;

    appear_bg.style.transform = `translateY(${translateY}px)`;
});


/*
*   IMAGE ROTATE
*/
const img_token = document.querySelector('[data-token-bg]');
let previousScrollPosition = 0; // Lưu vị trí cuộn trước đó
let rotationAngle = 0; // Lưu góc xoay của ảnh

window.addEventListener('scroll', function () {
    // Lấy giá trị vị trí cuộn hiện tại
    let currentScrollPosition = window.scrollY;

    // Kiểm tra hướng cuộn
    if (currentScrollPosition > previousScrollPosition) {
        // Cuộn xuống => xoay sang phải
        rotationAngle += 1.5; // Điều chỉnh giá trị này để thay đổi tốc độ xoay
    } else {
        // Cuộn lên => xoay sang trái
        rotationAngle -= 1.5;
    }

    // Xoay ảnh theo góc tính được
    img_token.style.transform = `rotate(${rotationAngle}deg)`;

    // Cập nhật vị trí cuộn trước đó
    previousScrollPosition = currentScrollPosition;
});


/*
*  FLY CAT MEME
*/

// Tính toán vị trí mới cho hình ảnh

const catMain = document.querySelector('.cat_main');
var direction = 1;

var paramRotate = 0.04;

window.addEventListener('scroll', () => {

    let scrollY = window.scrollY;
    let translateX = scrollY * 0.4 * direction; // Di chuyển chéo sang trái
    let translateY = scrollY; // Di chuyển xuống chậm
    let rotate = scrollY * paramRotate;

    // Lấy vị trí của catMain
    const { left, right } = catMain.getBoundingClientRect();
    const screenWidth = window.innerWidth;

    // Kiểm tra xem hình ảnh có chạm vào lề trái hoặc lề phải không

    if (right > screenWidth) {
        // Chạm vào lề phải
        console.log('Chạm vào lề phải');
        direction = -1;
        paramRotate = 0.009;
    }

    translateX = Math.max(Math.min(translateX, screenWidth + 10), 10);

    catMain.style.transform = `translate(${translateX}px, ${translateY}px) rotate(-${rotate}deg)`;
});

/* appear element */


document.addEventListener('DOMContentLoaded', function () {

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else if (entry.intersectionRatio < 0.1) {
                entry.target.classList.remove('visible');
            }
        });
    }, {
        threshold: [0.1, 0.9],
    });

    const viewbox = document.querySelectorAll('[data-transform]');
    viewbox.forEach(content => {
        observer.observe(content);
    })
});

/*
*   MOVE ELEMENT NAVBAR
*/

const navLinks = document.querySelectorAll('[data-nav-link]');

navLinks.forEach(link => {
    link.addEventListener('click', function (event) {
        event.preventDefault();
        const targetId = this.getAttribute('data-nav-link');
        const targetSection = document.getElementById(targetId);

        // targetSection.scrollIntoView({ behavior: 'smooth' });

        if (targetSection) {
            const sectionHeight = targetSection.offsetHeight;
            const viewportHeight = window.innerHeight;
            const offset = (viewportHeight - sectionHeight) / 2

            const targetY = targetSection.getBoundingClientRect().top + window.scrollY - offset; // Tính toán vị trí Y
            smoothScrollTo(targetY, 420); // Gọi hàm cuộn mượt với thời gian 1000ms
        }
    });
});


/* BACK TO TOP */

const backTop = document.querySelector("[data-back-top]");

window.addEventListener("scroll", function () {
    if (window.scrollY >= 199) {
        backTop.classList.add('active')
    } else {
        backTop.classList.remove('active')
    }
});

backTop.addEventListener('click', (e) => {
    e.preventDefault();
    smoothScrollTo(0, 400);
});

// Hàm cuộn mượt
function smoothScrollTo(targetY, duration) {
    const startY = window.scrollY; // Vị trí hiện tại
    const distance = targetY - startY; // Khoảng cách cần cuộn
    const startTime = performance.now(); // Thời gian bắt đầu

    function scrollStep(currentTime) {
        const elapsed = currentTime - startTime; // Thời gian đã trôi qua
        const progress = Math.min(elapsed / duration, 1); // Tính tỷ lệ cuộn (0 đến 1)
        const ease = easeInOutCubic(progress); // Tính toán hàm easing
        window.scrollTo(0, startY + distance * ease); // Cuộn đến vị trí mới

        if (elapsed < duration) {
            requestAnimationFrame(scrollStep); // Gọi hàm tiếp theo
        }
    }

    requestAnimationFrame(scrollStep); // Bắt đầu quá trình cuộn
}

// Hàm easing
function easeInOutCubic(t) {
    return t < 0.5 ?
        4 * t * t * t :
        1 - Math.pow(-2 * t + 2, 3) / 2;
}


/* CHART BIE */

document.addEventListener("DOMContentLoaded", function () {
    const pieChart = document.querySelector('.pie-chart');
    const colors = [];
    const percents = [];

    // Lấy các giá trị từ thuộc tính data
    for (let i = 1; i <= 6; i++) {
        const color = pieChart.getAttribute(`data-color${i}`);
        const percent = pieChart.getAttribute(`data-percent${i}`);
        if (color && percent) {
            colors.push(color);
            percents.push(parseFloat(percent));
        }
    }

    // Tạo gradient từ các giá trị
    let gradient = 'conic-gradient(';
    let currentStart = 0;

    colors.forEach((color, index) => {
        const start = currentStart;
        const end = currentStart + percents[index];

        // Thêm vào chuỗi gradient
        gradient += `${color} ${start}% ${end - 1}%, rgba(255 255 255 / 0.75) ${end - 1}% ${end}%, `;

        // Cập nhật currentStart cho phần tiếp theo
        currentStart = end;
    });
    // Xóa dấu phẩy cuối
    gradient = gradient.slice(0, -2) + ')';

    pieChart.style.background = gradient;
});

/* APPEAR ELEMENT PHASE */

document.addEventListener('DOMContentLoaded', function () {

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            const data_phase = entry.target.querySelector('[data-appear]');
            const index = Array.from(entry.target.parentNode.children).indexOf(entry.target);

            if (entry.isIntersecting) {
                data_phase.style.transitionDelay = `${index * 250}ms`;
                entry.target.classList.add('visible');

            } else {
                data_phase.style.transitionDelay = `${(entries.length - index) * 200}ms`;
                entry.target.classList.remove('visible');
            }
        });
    });

    const data_box_phase = document.querySelectorAll('[data-box-appear]');
    data_box_phase.forEach(content => {
        observer.observe(content);
    })
});


/*
* click question & faq
*/

const questions = document.querySelectorAll(["[data-question]"]);

questions[0].classList.add('active');

questions.forEach(question => {
    question.addEventListener('click', () => {
        if (question.classList.contains('active')) {
            question.classList.remove('active');
        } else {
            questions.forEach(q => q.classList.remove('active'));
            question.classList.add('active');
        }
    });
});










