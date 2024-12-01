const toggleIcon = document.querySelector('.navbar-icon');
const navList = document.querySelector('.nav-list');

toggleIcon.addEventListener('click', () => {
    if (navList.style.display === 'none' || !navList.style.display) {
        navList.style.display = 'inline-block'; 
    } else {
        navList.style.display = 'none'; 
    }
});

    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768) {
            navList.style.display = 'flex'; 
        } else {
            navList.style.display = 'none'; 
        }
    });
