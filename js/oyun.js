document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ Script yüklendi');

    // Elementleri seç
    const gokyuzuBolumu = document.getElementById('gokyuzu');
    const yagmurAlani = document.getElementById('yagmur-alani');
    const ucak = document.querySelector('.ucak');
    const asagiOk = document.querySelector('.asagi-ok');
    const paralaksElementler = document.querySelectorAll('.paralaks-hareket');
    
    let yagmurAktif = false;
    let yagmurInterval;
    
    // UÇAK DEĞİŞKENLERİ - TEK BİR YERDE TANIMLA
    let ucakYonu = 'soldansaga';
    let ucakInterval;

    // AŞAĞI OK TIKLANINCA
    if (asagiOk) {
        asagiOk.addEventListener('click', function() {
            window.scrollTo({
                top: window.innerHeight,
                behavior: 'smooth'
            });
        });
    }

    // UÇAK FONKSİYONLARI - DÜZENLİ
    function ucakHareketBaslat() {
        if (!ucak) return;
        
        // Önceki animasyonu temizle
        ucak.classList.remove('hareketli');
        ucak.style.opacity = '0';
        
        setTimeout(() => {
            // Yönü değiştir
            if (ucakYonu === 'soldansaga') {
                ucak.style.left = '-200px';
                ucak.style.transform = 'translateY(0px) rotate(2deg)';
                ucakYonu = 'sagdansola';
            } else {
                ucak.style.left = 'calc(100% + 200px)';
                ucak.style.transform = 'translateY(-8px) rotate(184deg)';
                ucakYonu = 'soldansaga';
            }
            
            ucak.classList.add('hareketli');
            ucak.style.opacity = '1';
            
            console.log(`✈️ Uçak ${ucakYonu === 'soldansaga' ? 'sağdan sola' : 'soldan sağa'} uçuyor`);
        }, 1000);
    }

    function ucakHareketDongusu() {
        // İlk uçuşu 3 saniye sonra başlat
        setTimeout(() => {
            ucakHareketBaslat();
        }, 3000);
        
        // Her 15 saniyede bir tekrarla
        ucakInterval = setInterval(() => {
            ucakHareketBaslat();
        }, 15000);
    }

    // PARALAKS EFEKTİ
    window.addEventListener('scroll', function() {
        const kaydirmaMiktari = window.scrollY;
        
        // Paralaks efekti
        paralaksElementler.forEach((element) => {
            let hiz = 0.3;
            
            if (element.classList.contains('gokyuzu-arkaplan')) {
                hiz = 0.5;
            } else if (element.classList.contains('bulut1')) {
                hiz = 0.2;
            } else if (element.classList.contains('bulut2')) {
                hiz = 0.4;
            } else if (element.classList.contains('bulut3')) {
                hiz = 0.6;
            }
            
            const yeniPozisyon = kaydirmaMiktari * hiz;
            element.style.transform = `translateY(${yeniPozisyon}px)`;
        });

        // Yağmur animasyonu
        if (kaydirmaMiktari > 50 && !yagmurAktif) {
            yagmurAktif = true;
            baslatYagmur();
        }
    });

    // YAĞMUR FONKSİYONU
    function baslatYagmur() {
        if (yagmurInterval) return;
        
        yagmurInterval = setInterval(() => {
            createRainDrop();
        }, 120);
    }

    function createRainDrop() {
        if (!yagmurAlani) return;
        
        const damla = document.createElement('div');
        damla.classList.add('yagmur-damlasi');
        damla.style.left = Math.random() * 100 + 'vw';
        damla.style.animationDuration = (Math.random() * 1 + 1.2) + 's';
        
        yagmurAlani.appendChild(damla);
        
        setTimeout(() => {
            if (damla.parentNode) {
                damla.remove();
            }
        }, 3000);
    }

    // BÜYÜME PARALAKSI - TEK BİR YERDE
    const dogaSection = document.getElementById('doga');
    let currentProgress = 0;
    let targetProgress = 0;
    
    function smoothGrowth() {
        // Yumuşak geçiş
        currentProgress += (targetProgress - currentProgress) * 0.1;
        
        const scale = 0.3 + currentProgress * 0.7;
        
        // Tüm bitkileri güncelle
        const plants = document.querySelectorAll('.agac, .cicek, .ot');
        plants.forEach(plant => {
            plant.style.transform = `scaleY(${scale})`;
        });
        
        // Çimeni güncelle
        const catiSection = document.getElementById('cati');
        if (catiSection) {
            const catiScale = 0.9 + currentProgress * 0.2;
            catiSection.style.transform = `scaleY(${catiScale})`;
        }
        
        // Devam et
        requestAnimationFrame(smoothGrowth);
    }
    
    function updateTargetProgress() {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        
        if (dogaSection) {
            const dogaTop = dogaSection.offsetTop;
            const dogaHeight = dogaSection.offsetHeight;
            
            if (scrollY > dogaTop - windowHeight * 0.5) {
                targetProgress = Math.min(
                    (scrollY - (dogaTop - windowHeight * 0.5)) / 
                    (dogaHeight * 0.8), 
                    1
                );
            } else {
                targetProgress = 0;
            }
        }
    }

    // TÜM SİSTEMLERİ BAŞLAT
    function initAllSystems() {
        console.log('🚀 Tüm sistemler başlatılıyor...');
        
        // Uçak döngüsünü başlat
        ucakHareketDongusu();
        
        // Büyüme paralaksını başlat
        smoothGrowth();
        window.addEventListener('scroll', updateTargetProgress);
        window.addEventListener('wheel', updateTargetProgress);
        updateTargetProgress();
        
        // ESC ile yağmuru durdur
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && yagmurInterval) {
                clearInterval(yagmurInterval);
                yagmurAktif = false;
                yagmurInterval = null;
                console.log('🛑 Yağmur durduruldu');
            }
        });
    }

    // SAYFA YÜKLENDİĞİNDE HER ŞEYİ BAŞLAT

    
    initAllSystems();
});


    // Çatı için özel paralaks - daha yavaş hareket
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const catiSection = document.getElementById('cati');
        
        if (catiSection) {
            const catiBg = catiSection.querySelector('.bg-cati');
            const rect = catiSection.getBoundingClientRect();
            
            if (rect.top <= window.innerHeight && rect.bottom >= 0) {
                const speed = 0.3;
                if (catiBg) {
                    catiBg.style.transform = `translateY(${scrolled * speed}px)`;
                }
            }
        }
    });
; // BURASI KAPATILMIŞTI - DÜZELTİLDİ


// 4. KISIM: BARAJ ANİMASYONLARI
window.addEventListener('scroll', function() {
    const kaydirma = window.scrollY;
    const barajSection = document.getElementById('baraj');
    
    if (barajSection) {
        const rect = barajSection.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        
        if (rect.top <= viewportHeight * 0.8 && rect.bottom >= 0) {
            const ilerleme = Math.min(Math.max((viewportHeight * 0.8 - rect.top) / (viewportHeight * 0.8), 0), 1);
            
        
            
            const lambalar = document.querySelectorAll('.lamba');
            if (ilerleme > 0.6) {
                lambalar.forEach(lamba => lamba.classList.add('yanik'));
            } else {
                lambalar.forEach(lamba => lamba.classList.remove('yanik'));
            }
            
           
        }
    }
});

// 4.5 KISIM: SU DEĞİRMENİ ANİMASYONU
window.addEventListener('scroll', function() {
    const kaydirma = window.scrollY;
    const degirmenSection = document.getElementById('degirmen');
    
    if (degirmenSection) {
        const rect = degirmenSection.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        
        if (rect.top <= viewportHeight * 0.7 && rect.bottom >= 0) {
            const ilerleme = Math.min(Math.max((viewportHeight * 0.7 - rect.top) / (viewportHeight * 0.7), 0), 1);
            
            const cark = document.querySelector('.degirmen-cark');
            if (cark && ilerleme > 0.4) {
                cark.classList.add('donuyor');
                cark.style.animationDuration = `${3 - (ilerleme * 2)}s`;
            }
            
        }
    }
});

// 5. KISIM: DENİZ ANİMASYONLARI
let sonScrollY = window.scrollY;

window.addEventListener('scroll', function() {
    const kaydirma = window.scrollY;
    const denizSection = document.getElementById('deniz');
    const gemi = document.querySelector('.gemi-container');

    if (denizSection) {
        const rect = denizSection.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        
        if (rect.top <= viewportHeight && rect.bottom >= 0) {
            const gunes = document.querySelector('.gunes');
            if (gunes) {
                if (kaydirma > sonScrollY) {
                    gunes.classList.add('doguyor');
                    gunes.classList.remove('batiyor');
                } else {
                    gunes.classList.add('batiyor');
                    gunes.classList.remove('doguyor');
                }
            }
            
            const gemi = document.querySelector('.gemi-container');
            if (gemi && rect.top <= viewportHeight * 0.5) {
                gemi.classList.add('hareketli');
            }


            
            const dalgalar = document.querySelectorAll('.dalga');
            const scrollHizi = Math.abs(kaydirma - sonScrollY);
            const dalgaHizi = Math.min(scrollHizi * 0.1, 2);
            
            dalgalar.forEach((dalga, index) => {
                dalga.style.animationDuration = `${3 + index - dalgaHizi}s`;
            });
        }
    }
    
    sonScrollY = kaydirma;
}); // DALGA PARALAKS VE INTERAKTİVITE
function initDalgaSistemi() {
    const dalgalar = document.querySelectorAll('.dalga');
    
    // Scroll paralaks efekti
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const denizSection = document.getElementById('deniz');
        
        if (denizSection) {
            const rect = denizSection.getBoundingClientRect();
            
            if (rect.top <= window.innerHeight && rect.bottom >= 0) {
                // Her dalga için farklı hız
                dalgalar.forEach((dalga, index) => {
                    const hiz = 0.3 + (index * 0.1);
                    const yMove = scrolled * hiz;
                    dalga.style.transform = `translateX(${dalga.style.transform.includes('translateX') ? dalga.style.transform.split('translateX(')[1].split(')')[0] : '0px'}) translateY(${yMove}px)`;
                });
            }
        }
    });
    
    // Fare hareketi ile dalga etkileşimi
    document.addEventListener('mousemove', function(e) {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        dalgalar.forEach((dalga, index) => {
            const moveX = (mouseX - 0.5) * 20 * (index + 1);
            const moveY = (mouseY - 0.5) * 10 * (index + 1);
            
            dalga.style.transform = `translateX(${moveX}px) translateY(${moveY}px)`;
        });
    });
}



// SAYFA YÜKLENDİĞİNDE ÇALIŞTIR
document.addEventListener('DOMContentLoaded', function() {
    initDalgaSistemi();
});

