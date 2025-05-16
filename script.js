import { createClient } from '@supabase/supabase-js';

// Defina a URL e a chave pública do seu projeto Supabase
const supabaseUrl = 'https://zqhrhkxqpschhgfwhhld.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpxaHJoa3hxcHNjaGhnZndoaGxkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE0NDE2MDYsImV4cCI6MjA0NzAxNzYwNn0.NcosVHKClyXFOzNCa923DNbeeTDZ3FcZeNi5O4vIMe4';
const supabase = createClient(supabaseUrl, supabaseKey);

// Adicione o evento de submit para o formulário de login
document.getElementById('login-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Tente fazer login com email e senha
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    // Exiba a mensagem de erro ou sucesso
    const messageElement = document.getElementById('message');
    if (error) {
        messageElement.textContent = 'Erro: ' + error.message;
    } else {
        messageElement.textContent = 'Login bem-sucedido!';
    }
});
