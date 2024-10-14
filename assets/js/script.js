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
*  FLY DOG
*/

const dog = document.querySelector('[data-dog]');

// Tốc độ xoay và tốc độ di chuyển ngang
let rotationSpeed = 0.2;
let horizontalSpeed = 0.5; // Tốc độ di chuyển sang phải
let direction = 1; // Hướng di chuyển (1 là sang phải, -1 là sang trái)
let screenWidth = window.innerWidth;

window.addEventListener('scroll', function () {
    // Lấy giá trị vị trí cuộn hiện tại
    let currentScrollPosition = window.scrollY;

    // Tính góc xoay dựa trên vị trí cuộn hiện tại
    let rotationAngle_dog = currentScrollPosition * rotationSpeed; // Tính toán góc xoay trực tiếp theo vị trí cuộn
    rotationAngle_dog = rotationAngle_dog % 360; // Giới hạn góc xoay trong khoảng 0 - 360 độ

    // Tính toán vị trí di chuyển ngang
    let translateX = currentScrollPosition * horizontalSpeed * direction;

    // Nếu ảnh chạm vào rìa màn hình, đảo ngược hướng
    if (translateX > screenWidth - dog.clientWidth || translateX < 0) {
        direction *= -1; // Đảo hướng khi chạm rìa
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

        targetSection.scrollIntoView({ behavior: 'smooth' });
    });
});

/* BACK TO TOP */

const backTop = document.querySelector("[data-back-top]");

backTop.addEventListener("scroll", function () {
    if (window.scrollY >= 160) {
        backTop.classList.add('active')
    } else {
        backTop.classList.remove('active')
    }
});

backTop.addEventListener('click', (e) => {
    e.preventDefault();
    smoothScrollTo(0, 1350);
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

/* end back top*/
