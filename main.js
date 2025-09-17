const dlg = document.getElementById('contactDialog');
const openBtn = document.getElementById('openDialog');
const closeBtn = document.getElementById('closeDialog');
const form = document.getElementById('contactForm');
let lastActive = null;

openBtn.addEventListener('click', () => {
    lastActive = document.activeElement;
    dlg.showModal();
    dlg.querySelector('input,select,textarea,button')?.focus();
});

closeBtn.addEventListener('click', () => dlg.close('cancel'));

// УБЕРИТЕ дублирование - оставьте только один обработчик submit
form?.addEventListener('submit', (e) => {
    // 1) Сброс кастомных сообщений
    [...form.elements].forEach(el => {
        el.setCustomValidity?.('');
        el.removeAttribute('aria-invalid'); // Сброс атрибута
    });
    
    // 2) Проверка встроенных ограничений
    if (!form.checkValidity()) {
        e.preventDefault();
        
        // Подсветка всех невалидных полей
        [...form.elements].forEach(el => {
            if (el.willValidate && !el.checkValidity()) {
                el.setAttribute('aria-invalid', 'true');
                
                // Пример кастомного сообщения для email
                if (el.name === 'email' && el.validity.typeMismatch) {
                    el.setCustomValidity('Пожалуйста, введите email в формате name@example.com');
                }
            }
        });
        
        form.reportValidity();
        return;
    }
    
// Альтернативный вариант в обработчике submit (замените соответствующий раздел):
    // ... валидация ...
    // 3) Успешная «отправка»
    e.preventDefault();
    
    // Показываем alert с сообщением об успехе
    alert('✅ Ваше сообщение успешно отправлено!');
    
    dlg.close('success');
    form.reset();
    lastActive?.focus();
});

dlg.addEventListener('close', () => { 
    lastActive?.focus(); 
});