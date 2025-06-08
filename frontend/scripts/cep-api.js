/*
[CR 8]. Recursos de HTML semântico e Javascript.
Uso de tags semânticas, Javascript, eventos e formulários.
Para atender ao critério, o site deve utilizar:
- TAGS SEMÂNTICAS: <main>, <header>, <article>, <section>, <nav>, <hgroup>, <figure>, <aside>, <footer>;
- Javascript (funções, Date, strings, Array, DOM);
- Eventos (click, submit, focus, keydown/keyup e input);
- Formulários: Enviar por e-mail os dados com https://formsubmit.co/
*/
/*
[CR 9]. Integração com API.
No formulário, integrar com o preenchimento com a API de CEP dos Correios.
Para atender ao critério, quando o usuário preencher o formulário, obrigatoriamente solicitar o CEP e
preencher dados de endereço utilizando a API ViaCEP - Webservice CEP e IBGE gratuito.
*/
/*Fontes:
https://github.com/Odisseu93/buscador-de-cep/blob/main/index.html
https://github.com/eucesar/JavaScript-consuming-and-handling-data-from-an-API
https://github.com/0Duarte/Estudo-FetchAPI-com-Via-Cep
*/

/* API ViaCEP */
document.addEventListener("DOMContentLoaded", () => {
    const cepInput = document.getElementById("cep");
    const streetInput = document.getElementById("street");
    const stateInput = document.getElementById("state");
    const cityInput = document.getElementById("city");
    const neighborhoodInput = document.getElementById("neighborhood");

    // Validação e consulta do CEP
    cepInput.addEventListener("blur", async function () {
        const cep = cepInput.value.replace(/\D/g, "");

        if (cep.length !== 8) {
            alert("CEP inválido. O CEP deve conter 8 dígitos.");
            resetAddressFields();
            return;
        }

        try {
            // Consulta a API ViaCEP: aula
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            if (!response.ok) throw new Error("Erro ao consultar a API ViaCEP");

            const data = await response.json();
            if (data.erro) {
                alert("CEP não encontrado.");
                resetAddressFields();
                return;
            }

            // Preenche os campos do formulário com os dados da API
            streetInput.value = data.logradouro || "";
            neighborhoodInput.value = data.bairro || "";
            cityInput.value = data.localidade || "";
            stateInput.value = data.uf || "";

        } catch (error) {
            console.error("Erro ao buscar o CEP:", error);
            alert("Erro ao consultar o CEP. Tente novamente.");
            resetAddressFields();
        }
    });

    // Função para limpar campos do endereço
    function resetAddressFields() {
        streetInput.value = "";
        neighborhoodInput.value = "";
        cityInput.value = "";
        stateInput.value = "";
    }
});


