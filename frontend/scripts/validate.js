/*
[CR 8]. Recursos de HTML semântico e Javascript.
Uso de tags semânticas, Javascript, eventos e formulários.
Para atender ao critério, o site deve utilizar:
- TAGS SEMÂNTICAS: <main>, <header>, <article>, <section>, <nav>, <hgroup>, <figure>, <aside>, <footer>;
- Javascript (funções, Date, strings, Array, DOM);
- Eventos (click, submit, focus, keydown/keyup e input);
- Formulários: Enviar por e-mail os dados com https://formsubmit.co/
*/
// Função para validar o formulário
function validateForm(event) {
    event.preventDefault(); // Impede o envio do formulário se houver erro

    // Obter os valores dos campos
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Variáveis de validação
    let isValid = true;

    // Validação de name
    const nameError = document.getElementById('nameError');
    if (name.length < 3 || name.length > 25) {
        nameError.style.display = 'block';
        isValid = false;
    } else {
        nameError.style.display = 'none';
    }

    // Validação de Email
    const emailError = document.getElementById('emailError');
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
        emailError.style.display = 'block';
        isValid = false;
    } else {
        emailError.style.display = 'none';
    }

    // Validação de Senha
    const passwordError = document.getElementById('passwordError');
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
    if (!passwordRegex.test(password)) {
        passwordError.style.display = 'block';
        isValid = false;
    } else {
        passwordError.style.display = 'none';
    }

    // Validação de Confirmar Senha
    const confirmPasswordError = document.getElementById('confirmPasswordError');
    if (password !== confirmPassword) {
        confirmPasswordError.style.display = 'block';
        isValid = false;
    } else {
        confirmPasswordError.style.display = 'none';
    }

    // Se todas as validações forem bem-sucedidas, enviar o formulário
    if (isValid) {
        document.getElementById('signupForm').submit(); // Enviar o formulário
        alert('Formulário enviado com sucesso!');
        return true;
    } else {
        return false;
    }
}


