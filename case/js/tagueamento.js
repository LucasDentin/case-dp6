// Preencha este arquivo com qualquer codigo que voce necessite para realizar a
// coleta, desde a biblioteca analytics.js, gtag.js ou o snippet do Google Tag 
// Manager. No ultimo caso, nao e necessario implementar a tag <noscript>.
// O ambiente dispoe da jQuery 3.5.1, entao caso deseje, podera utiliza-la
// para fazer a sua coleta.
// Caso tenha alguma duvida sobre o case, nao hesite em entrar em contato.
(function () {
    // Carregar o script gtag.js
    var gtmScript = document.createElement('script');
    gtmScript.src = "https://www.googletagmanager.com/gtag/js?id=G-LCRM6M6E62";
    gtmScript.async = true;
    document.head.appendChild(gtmScript);
    // Configuracao do gtag
    gtmScript.onload = function () {
        window.dataLayer = window.dataLayer || [];
        function gtag() {
            dataLayer.push(arguments);
        }
        window.gtag = gtag; // Disponibiliza a funcao globalmente
        gtag('js', new Date());
        gtag('config', 'G-096NHNN8Q2', { 'send_page_view': true });
        // Optei por usar jQuery ja que podemos, poderia usar o mutationObserver para o evento de view_form_sucess
        // Eventos de click
        $(document).on('click', '.menu-lista-contato', function () {
            gtag('event', 'click', {
                'page_location': window.location.href,
                'element_name': 'entre_em_contato',
                'element_group': 'menu'
            });
        });
        $(document).on('click', '.menu-lista-download', function () {
            gtag('event', 'file_download', {
                'page_location': window.location.href,
                'element_name': 'download_pdf',
                'element_group': 'menu'
            });
        });
        $(document).on('click', '.card-montadoras', function () {
            gtag('event', 'click', {
                'page_location': window.location.href,
                'element_name': $(this).data('name'),
                'element_group': 'ver_mais'
            });
        });
        // Eventos de formulario
        $('form.contato :input').not(':last').on('focus', function () {
            gtag('event', 'form_start', {
                'page_location': window.location.href, 
                'form_id': this.id, // [atributo de ID HTML do elemento DOM <form>]
                'form_name': $(this).parent().text().trim(), //[atributo de nome HTML do elemento DOM <form>]
                'form_destination': this.formAction // [URL para onde o formulario esta sendo enviado]
            });
        });
        $('form.contato').on('submit', function (event) {
            gtag('event', 'form_submit', {
                'page_location': window.location.href,
                'form_id': this.id,
                'form_destination': this.action,
                'form_name': document.querySelector('#contato').outerText, 
                'form_submit_text': $(this).find(':submit').text()
            });
        });
        var interval = setInterval(function () {
            if ($('body').hasClass('sobre') && $('body').hasClass('lightbox-open')){        
                gtag('event', 'view_form_success', {
                    'page_location': window.location.href,
                    'form_id': document.querySelector('.contato').id,
                    'form_name': document.querySelector('#contato').outerText
                });
                clearInterval(interval);
            }
        }, 100);
    };

    // Tratamento de erros
    window.addEventListener('error', function (err) {
        gtag('event', 'exception', {
            'description': err.message
        });
    });
})();