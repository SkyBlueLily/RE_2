$(document).ready(function () {  
    const menuItems = document.querySelectorAll(".menu_category");
    const pages = document.querySelectorAll(".each_page");
    const logo = document.querySelector(".head .top_area .logo");
    const body = document.body; // 전체 화면 스크롤을 제어하기 위해 사용
    const video = document.querySelector(".ph_7video");

    document.querySelector('.main_page').classList.add('active');
    window.scrollTo(0, 0);

    //video 초기 설정
    if (video) {
        video.volume = 0.2; // 볼륨을 20%로 설정 (0.0 ~ 1.0 범위)
    }

    menuItems.forEach((item, index) => {
        item.addEventListener("click", function() {   
            menuItems.forEach(menu => menu.classList.remove('active'));
            item.classList.add('active');

            openPage(index + 1);
        });
    });

    logo.addEventListener("click", function() {
        menuItems.forEach(menu => menu.classList.remove('active'));

        openPage(0);
    });

    function openPage(index) {
        pages.forEach((page, i) => {
            if (i === index) {
                page.classList.add("active");
                page.style.display = "flex"; // 활성화
            } else {
                page.classList.remove("active");
                page.style.display = "none"; // 비활성화
            }
        });
    
        // 🌟 페이지 이동 즉시 스크롤 초기화
        window.scrollTo({ top:0, left:0, behavior: "instant"});
        document.querySelector(".pages").scrollTop = 0;
        pages[index].scrollTop = 0;
    }

    if (video) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    video.play(); // 🎬 화면에 보이면 재생
                } else {
                    video.pause(); // ⏸ 화면에서 사라지면 정지
                }
            });
        }, { threshold: 0.5 }); // 비디오가 50% 이상 화면에 나타날 때 트리거

        observer.observe(video); // 비디오 감지 시작
    }

    // mobile
    const offcanvasMenuItems = document.querySelectorAll("#offcanvasExample ul li button");
    const offcanvasElement = document.querySelector("#offcanvasExample");
    const bootstrapOffcanvas = new bootstrap.Offcanvas(offcanvasElement);

    offcanvasMenuItems.forEach((item, index) => {
        item.addEventListener("click", function() {
            // 페이지 전환
            openPage(index + 1);
            // offcanvas 닫기
            bootstrapOffcanvas.hide();
        });
    });
});