let palavraSorteada; 
let letrasCorretas = []; 
let letrasErradas = []; 
let tentativas = 10; 
let nickname = ""; 


function sortearPalavra() {
    const palavras = [
        "banana", "guitarra", "elefante", "computador", "javascript",
        "oceano", "cachorro", "livro", "montanha", "foguete",
        "planeta", "floresta", "carro", "bicicleta", "sorvete",
        "bolacha", "tesouro", "caverna", "pintura", "canguru",
        "gigante", "escola", "cidade", "musica", "felicidade",
        "coracao", "janela", "brasil", "amigo", "estrela"
    ];
    const indice = Math.floor(Math.random() * palavras.length);
    return palavras[indice];
}


function inicializarJogo() {
    palavraSorteada = sortearPalavra();
    letrasCorretas = [];
    letrasErradas = [];
    tentativas = 10;

    atualizarPalavraOculta();
    atualizarTentativas();
    atualizarLetrasErradas();
}


function atualizarPalavraOculta() {
    const palavraOculta = palavraSorteada.split("").map(letra =>
        letrasCorretas.includes(letra) ? letra : "_"
    ).join(" ");
    document.getElementById("palavra-oculta").textContent = palavraOculta;
}


function atualizarTentativas() {
    document.getElementById("tentativas").textContent = tentativas;
}


function atualizarLetrasErradas() {
    document.getElementById("letras-erradas").textContent = letrasErradas.join(", ");
}


document.getElementById("iniciar-jogo").addEventListener("click", () => {
    const inputNickname = document.getElementById("nickname");
    nickname = inputNickname.value.trim();

    if (nickname) {
        localStorage.setItem("nickname", nickname); 
        document.getElementById("login-container").classList.add("hidden");
        document.getElementById("jogo-container").classList.remove("hidden");
        document.getElementById("nome-jogador").textContent = `Jogador: ${nickname}`;
        inicializarJogo();
    } else {
        alert("Por favor, insira seu nome ou nickname!");
    }
});


document.getElementById("enviar").addEventListener("click", () => {
    const inputLetra = document.getElementById("entrada-letra");
    const letra = inputLetra.value.toLowerCase();

    if (letra && letra.length === 1) {
        processarLetra(letra);
        inputLetra.value = ""; 
    } else {
        alert("Por favor, digite apenas uma letra!");
    }
});


function processarLetra(letra) {
    if (letrasCorretas.includes(letra) || letrasErradas.includes(letra)) {
        alert("Você já escolheu essa letra!");
        return;
    }

    if (palavraSorteada.includes(letra)) {
        letrasCorretas.push(letra);
        atualizarPalavraOculta();

        if (!document.getElementById("palavra-oculta").textContent.includes("_")) {
            mostrarMensagemVitoria();
        }
    } else {
        letrasErradas.push(letra);
        tentativas--;
        atualizarLetrasErradas();
        atualizarTentativas();

        if (tentativas === 0) {
            alert(`Você perdeu! A palavra era: ${palavraSorteada}`);
            inicializarJogo();
        }
    }
}


function mostrarMensagemVitoria() {
    const modalVitoria = document.getElementById("modal-vitoria");
    const nomeSalvo = localStorage.getItem("nickname"); 
    modalVitoria.querySelector("h2").textContent = `Parabéns, ${nomeSalvo}! Você venceu!`;
    modalVitoria.classList.remove("hidden");
}


document.getElementById("jogar-novamente").addEventListener("click", () => {
    const modalVitoria = document.getElementById("modal-vitoria");
    modalVitoria.classList.add("hidden");
    inicializarJogo();
});


document.addEventListener("DOMContentLoaded", () => {
    
});
