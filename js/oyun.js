// DEBUG - JavaScript çalışıyor mu?
console.log('🔧 JavaScript yüklendi!');

// KESİN PROTOCOL TESPİTİ
function detectProtocol() {
    const protocol = window.location.protocol;
    console.log('🌐 Protocol:', protocol);
    
    if (protocol === 'file:') {
        document.documentElement.classList.add('file-protocol');
        console.log('✅ File protocol class eklendi');
    } else {
        document.documentElement.classList.add('http-protocol');
        console.log('✅ HTTP protocol class eklendi');
    }
}

// Hemen çalıştır
detectProtocol();

document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ DOM yüklendi');

    // Elementleri seç
    const gokyuzuBolumu = document.getElementById('gokyuzu');
    const yagmurAlani = document.getElementById('yagmur-alani');
    const ucak = document.querySelector('.ucak');
    const asagiOk = document.querySelector('.asagi-ok');
    const paralaksElementler = document.querySelectorAll('.paralaks-hareket');
    
    let yagmurAktif = false;
    let yagmurInterval;
    let ucakYonu = 'soldansaga';
    let ucakInterval;

    // AŞAĞI OK
    if (asagiOk) {
        asagiOk.addEventListener('click', function() {
            window.scrollTo({
                top: window.innerHeight,
                behavior: 'smooth'
            });
        });
    }

    // UÇAK FONKSİYONLARI
    function ucakHareketBaslat() {
        if (!ucak) return;
        
        ucak.classList.remove('hareketli');
        ucak.style.opacity = '0';
        
        setTimeout(() => {
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
        }, 1000);
    }

    function ucakHareketDongusu() {
        if (!ucak) return;
        
        ucak.style.left = '-200px';
        ucak.style.transform = 'translateY(0px) rotate(2deg)';
        ucak.style.opacity = '1';
        ucakYonu = 'sagdansola';
        
        ucakHareketBaslat();
        
        ucakInterval = setInterval(() => {
            ucakHareketBaslat();
        }, 15000);
    }

    // PARALAKS EFEKTİ
    window.addEventListener('scroll', function() {
        const kaydirmaMiktari = window.scrollY;
        
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

    // BÜYÜME PARALAKSI
    const dogaSection = document.getElementById('doga');
    let currentProgress = 0;
    let targetProgress = 0;
    
    function smoothGrowth() {
        currentProgress += (targetProgress - currentProgress) * 0.1;
        
        const scale = 0.3 + currentProgress * 0.7;
        const plants = document.querySelectorAll('.agac, .cicek, .ot');
        
        plants.forEach(plant => {
            plant.style.transform = `scaleY(${scale})`;
        });
        
        const catiSection = document.getElementById('cati');
        if (catiSection) {
            const catiScale = 0.9 + currentProgress * 0.2;
            catiSection.style.transform = `scaleY(${catiScale})`;
        }
        
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
                    (scrollY - (dogaTop - windowHeight * 0.5)) / (dogaHeight * 0.8), 
                    1
                );
            } else {
                targetProgress = 0;
            }
        }
    }

    // ÇATI PARALAKS
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

    // BARAJ ANİMASYONLARI
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

    // SU DEĞİRMENİ ANİMASYONU
    window.addEventListener('scroll', function() {
        const kaydirma = window.scrollY;
        const degirmenSection = document.getElementById('degirmen');
        
        if (degirmenSection) {
            const rect = degirmenSection.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            
            if (rect.top <= viewportHeight * 0.7 && rect.bottom >= 0) {
                const ilerleme = Math.min(Math.max((viewportHeight * 0.7 - rect.top) / (viewportHeight * 0.7), 0), 1);
                
                const cark = document.querySelector('.degirmen-cark');
                if (cark) {
                    const donmeHizi = 3 - (ilerleme * 2);
                    cark.style.animation = `donme ${donmeHizi}s linear infinite`;
                }
            } else {
                const cark = document.querySelector('.degirmen-cark');
                if (cark) {
                    cark.style.animation = 'none';
                }
            }
        }
    });

    // DENİZ ANİMASYONLARI
    let sonScrollY = window.scrollY;

    window.addEventListener('scroll', function() {
        const kaydirma = window.scrollY;
        const denizSection = document.getElementById('deniz');

        if (denizSection) {
            const rect = denizSection.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            
            if (rect.top <= viewportHeight && rect.bottom >= 0) {
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
    });

    // ROKET BUTONU
    function initRoketSistemi() {
        const roketBtn = document.getElementById('roket-btn');
        if (!roketBtn) return;
        
        window.addEventListener('scroll', function() {
            const sayfaYuksekligi = document.documentElement.scrollHeight;
            const gorunenAlan = window.innerHeight;
            const mevcutScroll = window.scrollY;
            
            const sayfaSonu = sayfaYuksekligi - gorunenAlan;
            const altKisim = sayfaSonu * 0.8;
            const sayfaBasi = mevcutScroll < 100;
            
            if (sayfaBasi) {
                roketBtn.classList.add('gizli');
            } else if (mevcutScroll >= altKisim) {
                roketBtn.classList.remove('gizli');
                roketBtn.classList.remove('ucus');
            } else {
                roketBtn.classList.add('gizli');
            }
        });
        
        roketBtn.addEventListener('click', function() {
            roketBtn.classList.add('ucus');
            
            setTimeout(() => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }, 2500);
            
            setTimeout(() => {
                roketBtn.classList.add('gizli');
                roketBtn.classList.remove('ucus');
            }, 4000);
        });
    }

    // TÜM SİSTEMLERİ BAŞLAT
    function initAllSystems() {
        console.log('🚀 Sistemler başlatılıyor...');
        
        ucakHareketDongusu();
        smoothGrowth();
        window.addEventListener('scroll', updateTargetProgress);
        initRoketSistemi();
        
        console.log('✅ Tüm sistemler çalışıyor');
    }

    // BAŞLAT
    initAllSystems();
});