/* ==========================================================================
   100 RECEITAS NATURAIS PARA A MELHOR IDADE - VANILLA JS ENGINE
   Funcionalidades de Alta Conversão em Português do Brasil
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initCountdownTimer();
  initFaqAccordion();
  initSocialProofToasts();
  initCheckoutModal();
  initLegalModals();
  initScrollReveal();
});

/* --------------------------------------------------------------------------
   1. Contagem Regressiva em Tempo Real (Timer de Urgência)
   -------------------------------------------------------------------------- */
function initCountdownTimer() {
  const timerElements = document.querySelectorAll('.timer-display');
  if (!timerElements.length) return;

  let totalSeconds = 14 * 60 + 59; // 14 minutos e 59 segundos

  const timerInterval = setInterval(() => {
    if (totalSeconds <= 0) {
      totalSeconds = 14 * 60 + 59; // Reinicia suavemente para manter a conversão
    } else {
      totalSeconds--;
    }

    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');

    timerElements.forEach(el => {
      el.textContent = `${formattedMinutes}:${formattedSeconds}`;
    });
  }, 1000);
}

/* --------------------------------------------------------------------------
   2. Accordion das Perguntas Frequentes (FAQ)
   -------------------------------------------------------------------------- */
function initFaqAccordion() {
  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const item = question.parentElement;
      const answer = item.querySelector('.faq-answer');
      const isActive = item.classList.contains('active');

      // Fecha outros itens abertos
      document.querySelectorAll('.faq-item.active').forEach(openItem => {
        if (openItem !== item) {
          openItem.classList.remove('active');
          openItem.querySelector('.faq-answer').style.maxHeight = null;
        }
      });

      // Alterna estado atual
      if (isActive) {
        item.classList.remove('active');
        answer.style.maxHeight = null;
      } else {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });
}

/* --------------------------------------------------------------------------
   3. Notificações Flutuantes de Vendas em Tempo Real (Social Proof)
   -------------------------------------------------------------------------- */
function initSocialProofToasts() {
  const buyers = [
    { name: 'Maria de Fátima', city: 'São Paulo - SP', time: 'há 2 minutos' },
    { name: 'Seu Raimundo', city: 'Belo Horizonte - MG', time: 'há 1 minuto' },
    { name: 'Francisca Silva', city: 'Curitiba - PR', time: 'há 4 minutos' },
    { name: 'João Roberto', city: 'Porto Alegre - RS', time: 'há 3 minutos' },
    { name: 'Dona Helena', city: 'Salvador - BA', time: 'há 5 minutos' },
    { name: 'Antonio Carlos', city: 'Campinas - SP', time: 'há 1 minuto' },
    { name: 'Tereza Cristina', city: 'Goiânia - GO', time: 'há 2 minutos' },
  ];

  const toastContainer = document.createElement('div');
  toastContainer.className = 'social-proof-toast';
  document.body.appendChild(toastContainer);

  let currentBuyerIndex = 0;

  function showToast() {
    const buyer = buyers[currentBuyerIndex];
    toastContainer.innerHTML = `
      <div class="toast-avatar">${buyer.name.charAt(0)}</div>
      <div class="toast-content">
        <h5>${buyer.name} (${buyer.city})</h5>
        <p>Acabou de adquirir o <strong>eBook + 4 Bônus</strong>!</p>
        <span class="toast-time">✓ Compra verificada ${buyer.time}</span>
      </div>
    `;

    toastContainer.classList.add('show');

    setTimeout(() => {
      toastContainer.classList.remove('show');
    }, 4500);

    currentBuyerIndex = (currentBuyerIndex + 1) % buyers.length;
  }

  // Primeira exibição após 4 segundos, depois a cada 12 segundos
  setTimeout(() => {
    showToast();
    setInterval(showToast, 12000);
  }, 4000);
}

/* --------------------------------------------------------------------------
   4. Modal de Checkout de Alta Conversão
   -------------------------------------------------------------------------- */
function initCheckoutModal() {
  const modal = document.getElementById('checkout-modal');
  const openBtns = document.querySelectorAll('.js-open-checkout');
  const closeBtn = modal ? modal.querySelector('.modal-close') : null;

  if (!modal) return;

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  // Alternar abas de pagamento (PIX, Cartão, Boleto)
  const tabBtns = modal.querySelectorAll('.tab-btn');
  const tabContents = modal.querySelectorAll('.tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      const targetId = btn.getAttribute('data-tab');
      const targetContent = modal.querySelector(`#${targetId}`);
      if (targetContent) {
        targetContent.classList.add('active');
      }
    });
  });

  // Copiar código PIX
  const copyPixBtn = modal.querySelector('.js-copy-pix');
  if (copyPixBtn) {
    copyPixBtn.addEventListener('click', () => {
      const codeElement = modal.querySelector('.js-pix-code');
      if (codeElement) {
        navigator.clipboard.writeText(codeElement.textContent.trim()).then(() => {
          copyPixBtn.textContent = '✓ Código PIX Copiado!';
          copyPixBtn.style.backgroundColor = '#16a34a';
          setTimeout(() => {
            copyPixBtn.textContent = 'Copiar Código PIX (Copia e Cola)';
            copyPixBtn.style.backgroundColor = '';
          }, 3000);
        });
      }
    });
  }

  // Simulação de Finalização de Compra
  const checkoutForms = modal.querySelectorAll('form');
  checkoutForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const modalBody = modal.querySelector('.modal-body');
      modalBody.innerHTML = `
        <div style="text-align: center; padding: 2rem 1rem;">
          <div style="width: 70px; height: 70px; background-color: #d8f3dc; color: #16a34a; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2.5rem; margin: 0 auto 1.5rem auto;">✓</div>
          <h3 style="color: #1b4332; font-size: 1.75rem; margin-bottom: 0.75rem;">Pedido Confirmado com Sucesso!</h3>
          <p style="font-size: 1.05rem; color: #4a5568; margin-bottom: 1.5rem;">
            Enviamos o link de acesso imediato ao seu eBook <strong>100 Receitas Naturais para a Melhor Idade</strong> e os <strong>4 Bônus Exclusivos</strong> para o seu e-mail cadastrado.
          </p>
          <div style="background-color: #f0f7f4; border: 1px solid #e6dcce; padding: 1.25rem; border-radius: 12px; margin-bottom: 2rem; text-align: left;">
            <p style="font-size: 0.95rem; color: #1c2826; margin-bottom: 0.5rem;"><strong>Resumo da Compra:</strong></p>
            <p style="font-size: 0.9rem; color: #4a5568;">• eBook + 4 Bônus Especiais</p>
            <p style="font-size: 0.9rem; color: #4a5568;">• Garantia Incondicional de 7 Dias</p>
            <p style="font-size: 1.1rem; color: #1b4332; font-weight: 700; margin-top: 0.5rem;">Total: R$ 29,90</p>
          </div>
          <button class="btn-cta" onclick="location.reload()" style="font-size: 1.1rem; padding: 1rem 1.5rem;">Voltar à Página Principal</button>
        </div>
      `;
    });
  });
}

/* --------------------------------------------------------------------------
   5. Modais para Termos de Uso, Política de Privacidade e Contato
   -------------------------------------------------------------------------- */
function initLegalModals() {
  const legalModal = document.getElementById('legal-modal');
  if (!legalModal) return;

  const titleEl = legalModal.querySelector('.js-legal-title');
  const bodyEl = legalModal.querySelector('.js-legal-body');
  const closeBtn = legalModal.querySelector('.modal-close');

  const legalTexts = {
    privacy: {
      title: 'Política de Privacidade',
      content: `
        <p>A sua privacidade é extremamente importante para nós. É política do <strong>100 Receitas Naturais para a Melhor Idade</strong> respeitar a sua privacidade em relação a qualquer informação que possamos coletar no site.</p>
        <p>Solicitamos informações pessoais apenas quando realmente precisamos delas para lhe fornecer nosso material digital. Fazemo-lo por meios justos e legais, com o seu conhecimento e consentimento.</p>
        <p>Não compartilhamos informações de identificação pessoal publicamente ou com terceiros, exceto quando exigido por lei. Nosso site utiliza sistemas de criptografia de ponta a ponta para garantir total segurança no processamento dos seus dados.</p>
      `
    },
    terms: {
      title: 'Termos de Uso',
      content: `
        <p>Ao acessar o site do <strong>100 Receitas Naturais para a Melhor Idade</strong>, você concorda em cumprir estes termos de serviço, todas as leis e regulamentos aplicáveis.</p>
        <p>O eBook e os bônus fornecidos são para uso estritamente pessoal e intransferível. É proibida a cópia, redistribuição, venda ou reprodução comercial não autorizada do material sob pena das sanções previstas na lei de direitos autorais.</p>
        <p>Este produto tem caráter informativo e educativo focado na promoção de hábitos alimentares saudáveis e não substitui o diagnóstico, tratamento ou acompanhamento de profissionais de saúde habilitados.</p>
      `
    },
    contact: {
      title: 'Fale Conosco',
      content: `
        <p>Nossa equipe de suporte está à sua disposição de segunda a sexta-feira, das 09:00 às 18:00.</p>
        <div style="background-color: #f0f7f4; padding: 1.25rem; border-radius: 12px; margin-top: 1rem; border: 1px solid #e6dcce;">
          <p><strong>E-mail de Suporte:</strong> suporte@receitasmelhoridade.com.br</p>
          <p style="margin-top: 0.5rem;"><strong>Atendimento WhatsApp:</strong> (11) 99876-5432</p>
          <p style="margin-top: 0.5rem;"><strong>Prazo Médio de Resposta:</strong> Até 24 horas úteis.</p>
        </div>
      `
    }
  };

  const links = document.querySelectorAll('.js-open-legal');
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const type = link.getAttribute('data-type');
      if (legalTexts[type]) {
        titleEl.textContent = legalTexts[type].title;
        bodyEl.innerHTML = legalTexts[type].content;
        legalModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      legalModal.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  legalModal.addEventListener('click', (e) => {
    if (e.target === legalModal) {
      legalModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}

/* --------------------------------------------------------------------------
   6. Animações de Revelação no Scroll (Scroll Reveal)
   -------------------------------------------------------------------------- */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, {
    threshold: 0.15
  });

  reveals.forEach(el => observer.observe(el));
}
