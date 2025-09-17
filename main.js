// Основные элементы
const dlg = document.getElementById('contactDialog');
const openBtn = document.getElementById('openDialog');
const closeBtn = document.getElementById('closeDialog');
const form = document.getElementById('contactForm');
let lastActive = null;

// Открытие модалки
openBtn.addEventListener('click', () => {
    lastActive = document.activeElement;
    dlg.showModal();
    dlg.querySelector('input, select, textarea, button')?.focus();
});

// Закрытие модалки
closeBtn.addEventListener('click', () => dlg.close('cancel'));

// Обработка отправки формы
form?.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Сброс предыдущих ошибок
    resetValidation();
    
    // Проверка валидности
    if (!validateForm()) {
        highlightErrors();
        return;
    }
    
    // Успешная отправка
    handleSuccess();
});

// Функция сброса валидации
function resetValidation() {
    const elements = [...form.elements];
    elements.forEach(el => {
        el.setCustomValidity?.('');
        el.removeAttribute('aria-invalid');
    });
}

// Функция валидации формы
function validateForm() {
    let isValid = true;
    const elements = [...form.elements];
    
    elements.forEach(el => {
        if (el.willValidate && !el.checkValidity()) {
            isValid = false;
            
            // Кастомные сообщения
            if (el.name === 'email' && el.validity.typeMismatch) {
                el.setCustomValidity('Пожалуйста, введите email в формате name@example.com');
            } else if (el.name === 'phone' && el.validity.patternMismatch) {
                el.setCustomValidity('Формат: +7 (900) 000-00-00');
            }
        }
    });
    
    return isValid;
}

// Подсветка ошибок
function highlightErrors() {
    const elements = [...form.elements];
    elements.forEach(el => {
        if (el.willValidate && !el.checkValidity()) {
            el.setAttribute('aria-invalid', 'true');
        }
    });
    
    // Показать первую ошибку
    const firstInvalid = form.querySelector('[aria-invalid="true"]');
    if (firstInvalid) {
        firstInvalid.focus();
    }
    
    form.reportValidity();
}

// Обработка успешной отправки
function handleSuccess() {
    alert('✅ Ваше сообщение успешно отправлено!');
    dlg.close('success');
    form.reset();
    lastActive?.focus();
}

// Закрытие по клику вне модалки
dlg.addEventListener('click', (e) => {
    if (e.target === dlg) {
        dlg.close('cancel');
    }
});

// Возврат фокуса после закрытия
dlg.addEventListener('close', () => {
    lastActive?.focus();
});

// Плавный скролл для якорных ссылок
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Обработка :target для секций
window.addEventListener('hashchange', () => {
    const target = document.querySelector(':target');
    if (target) {
        target.classList.add('target-highlight');
        setTimeout(() => {
            target.classList.remove('target-highlight');
        }, 2000);
    }
});