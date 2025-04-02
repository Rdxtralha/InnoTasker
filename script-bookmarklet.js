javascript:(async function() {
    // Criar uma mensagem no estilo "popup" na tela
    const messageDiv = document.createElement('div');
    messageDiv.style.position = 'fixed';
    messageDiv.style.top = '10px';
    messageDiv.style.left = '10px';
    messageDiv.style.padding = '10px 20px';
    messageDiv.style.backgroundColor = '#000';
    messageDiv.style.color = '#fff';
    messageDiv.style.borderRadius = '5px';
    messageDiv.style.fontSize = '14px';
    messageDiv.style.zIndex = '9999';
    messageDiv.innerText = 'Desenvolvido por Rdzin';
    
    // Adiciona o div na tela
    document.body.appendChild(messageDiv);

    // Remove o div após 5 segundos
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);

    const API_KEY = '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';  // Substitua pela sua chave da API de IA
    const API_URL = 'https://api.openai.com/v1/completions';  // Para OpenAI (GPT-3 ou GPT-4)

    async function gerarRespostaDaIA(pergunta) {
        try {
            const resposta = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${API_KEY}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: "gpt-4",  // Ou use "gpt-3" dependendo da sua API
                    prompt: pergunta,
                    max_tokens: 150,
                    temperature: 0.7,
                }),
            });
            const data = await resposta.json();
            return data.choices[0].text.trim();
        } catch (error) {
            console.error("Erro ao gerar resposta pela IA:", error);
            return "Desculpe, não consegui gerar uma resposta no momento.";
        }
    }

    async function responderQuestaoAutomaticamente() {
        let perguntaElement = document.querySelector(".pergunta");  // Ajuste conforme necessário
        let alternativas = document.querySelectorAll("input[type='radio'], label");

        if (perguntaElement && alternativas.length > 0) {
            let pergunta = perguntaElement.innerText.trim();
            console.log(`Pergunta detectada: ${pergunta}`);

            // Enviar a pergunta para a IA e obter a resposta
            let respostaDaIA = await gerarRespostaDaIA(pergunta);
            console.log(`Resposta da IA: ${respostaDaIA}`);

            // Tenta selecionar a alternativa correta com base na resposta da IA
            alternativas.forEach((alt) => {
                if (alt.innerText.includes(respostaDaIA)) {
                    alt.click();
                    console.log(`✅ Resposta selecionada: ${respostaDaIA}`);
                }
            });
        } else {
            console.log("❌ Não foi possível detectar a pergunta ou alternativas.");
        }
    }

    function avancarParaProxima() {
        let botaoProximo = document.querySelector("button:contains('Próximo')");  // Ajuste conforme necessário
        if (botaoProximo) {
            botaoProximo.click();
            console.log("🔹 Avançando para a próxima questão...");
        } else {
            console.log("❌ Não foi possível encontrar o botão 'Próximo'.");
        }
    }

    // Executa a função de responder e avançar para a próxima questão
    await responderQuestaoAutomaticamente();
    avancarParaProxima();
})();
