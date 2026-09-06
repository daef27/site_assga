(function () {
    const fallbackLogo = 'src/imagens/Assga_foto.jpg';

    function getConfig() {
        try {
            const config = JSON.parse(localStorage.getItem('assga_config') || '{}');
            // Garantir que a logo oficial seja estritamente Assga_foto.jpg
            if (config.logoImg && config.logoImg !== fallbackLogo) {
                config.logoImg = fallbackLogo;
                config.faviconImg = fallbackLogo;
                try {
                    localStorage.setItem('assga_config', JSON.stringify(config));
                } catch(e) {}
            }
            return config;
        } catch (error) {
            return {};
        }
    }

    function applyBrand() {
        const config = getConfig();
        const logo = fallbackLogo; // Sempre usar a oficial Assga_foto.jpg
        const favicon = (config.faviconImg && typeof config.faviconImg === 'string' && config.faviconImg.trim().length > 0)
            ? config.faviconImg
            : fallbackLogo;

        document.querySelectorAll('img').forEach(function (image) {
            if (image.dataset.brandLogo === 'true' || image.id === 'logoImgHeader' || image.closest('.logo-area, .header-logo, .login-box, .admin-auth-box, .carteira-header .logo')) {
                image.src = logo;
            }
        });

        document.querySelectorAll('link[rel~="icon"], link[rel="shortcut icon"]').forEach(function (link) {
            link.href = favicon;
        });
    }

    async function loadGlobalBrand() {
        try {
            const response = await fetch('/api/data?collection=config');
            if (!response.ok) return;
            const config = await response.json();
            if (config && typeof config === 'object' && Object.keys(config).length > 0) {
                localStorage.setItem('assga_config', JSON.stringify(config));
                applyBrand();
            }
        } catch (error) {
            // A configuração local continua sendo usada como fallback.
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () {
            applyBrand();
            loadGlobalBrand();
        });
    } else {
        applyBrand();
        loadGlobalBrand();
    }
})();
