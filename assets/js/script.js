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

const dog = document.querySelector('[data-cat-meme]');

// Tốc độ xoay và tốc độ di chuyển ngang
let rotationSpeed = 0.2;
let horizontalSpeed = 0.5; // Tốc độ di chuyển sang phải
let direction = 1; // Hướng di chuyển (1 là sang phải, -1 là sang trái)
let screenWidth = window.innerWidth;

window.addEventListener('scroll', function () {
    // Lấy giá trị vị trí cuộn hiện tại
    let currentScrollPosition = window.scrollY * 2;

    // Tính góc xoay dựa trên vị trí cuộn hiện tại
    let rotationAngle_dog = currentScrollPosition * rotationSpeed; // Tính toán góc xoay trực tiếp theo vị trí cuộn
    rotationAngle_dog = rotationAngle_dog % 360; // Giới hạn góc xoay trong khoảng 0 - 360 độ

    // Tính toán vị trí di chuyển ngang
    let translateX = currentScrollPosition * horizontalSpeed * direction;

    // Nếu ảnh chạm vào rìa màn hình, đảo ngược hướng
    if (translateX > screenWidth - dog.clientWidth) {
        translateX = screenWidth - dog.clientWidth; // Đặt lại translateX ở mép phải
        direction *= -1; // Đảo hướng khi chạm rìa
    } else if (translateX < 0) {
        translateX = 0; // Đặt lại translateX ở mép trái
        direction = 1; // Đảo hướng sang phải
    }

    // Di chuyển theo chiều dọc và chiều ngang
    let translateY = currentScrollPosition;

    // Áp dụng cả xoay và di chuyển cho ảnh
    dog.style.transform = `translate(${translateX}px, ${translateY}px) rotate(-${rotationAngle_dog}deg)`;
});

// Cập nhật lại kích thước màn hình khi thay đổi kích thước cửa sổ
window.addEventListener('resize', function () {
    screenWidth = window.innerWidth;
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
            const targetY = targetSection.getBoundingClientRect().top + window.scrollY; // Tính toán vị trí Y
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





/* Phase of map_social */

const phases = document.querySelectorAll('.phase');
var windowHeight = window.innerHeight;

window.addEventListener('resize', function () {
    windowHeight = window.innerHeight;
});

let ticking = false;

function checkVisibility() {

    phases.forEach(phase => {
        const rect = phase.getBoundingClientRect();
        const phaseTop = rect.top;
        const phaseBottom = rect.bottom;

        if (phaseTop < 0 || (phaseTop < windowHeight && phaseBottom >= windowHeight)) {
            phase.classList.add('visible');
        } else if (phaseTop >= windowHeight) {
            phase.classList.remove('visible');
        }
    });
}

// Tối ưu cuộn với requestAnimationFrame
function onScroll() {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            checkVisibility();
            ticking = false;
        });
        ticking = true;
    }
}

window.addEventListener('scroll', onScroll);

checkVisibility();

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










