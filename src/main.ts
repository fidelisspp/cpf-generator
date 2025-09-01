import './style.css'

const cpfBase: number[] = []; /* array vazio para a sequencia aleatoria */
const pesoDivUm: number[]= [10, 9, 8, 7, 6, 5, 4, 3, 2];
const pesoDivDois: number[] = [11, 10, 9, 8, 7, 6, 5, 4, 3, 2];
let divUm = 0;
let divDois = 0;

/* inserindo a sequencia aleatoria no array cpfBase */
function calculateFirstDigit(): number{
    cpfBase.length = 0;

    for(let i = 0; i < 9; i++) {
    cpfBase.push(Math.floor(Math.random() * 10));
}

    let cpfParcial: number[] = cpfBase.map((valor: number, index: number) => valor * pesoDivUm[index]);
    
    const soma = cpfParcial.reduce((acc: number, valorAtual: number) => {
        return acc + valorAtual;
    }, 0);

    const resto = (soma * 10) % 11;

    if(resto === 10 || resto === 11){
        divUm = 0;
    } else {
        divUm = resto;
    }

    cpfBase.push(divUm);
    return divUm;
};

function calculateSecondDigit(): number{
    let cpfParcial: number[] = cpfBase.map((valor: number, index: number) => valor * pesoDivDois[index]);
    
    const soma = cpfParcial.reduce((acc: number, valorAtual: number) => {
        return acc + valorAtual;
    }, 0);

    const resto = (soma * 10) % 11;

    if(resto === 10 || resto === 11){
        divDois = 0
    } else {
        divDois = resto;
    }

    cpfBase.push(divDois);
    return divDois;
};

function formatCpf(cpfBase: number[]): string {
    const bloco1 = cpfBase.slice(0, 3).join("");
    const bloco2 = cpfBase.slice(3, 6).join("");
    const bloco3 = cpfBase.slice(6, 9).join("");
    const verificadores = cpfBase.slice(9, 11).join("");
    

    const cpfFinal = `${bloco1}.${bloco2}.${bloco3}-${verificadores}`;
    return cpfFinal;
}


const generateBtn = document.querySelector<HTMLButtonElement>('#generate-btn');

function handleGenerateAndDisplayCpf(){
    console.log("Botão clicado! A função começou.");

    calculateFirstDigit();
    calculateSecondDigit();
    
    let cpfFormatado = formatCpf(cpfBase);

    const cpfNumberSpan = document.querySelector<HTMLSpanElement>('#cpf-number');
    
    if(cpfNumberSpan){
        cpfNumberSpan.textContent = cpfFormatado;
    }
}

if(generateBtn){
    generateBtn.addEventListener('click', handleGenerateAndDisplayCpf);
} else {
    // Espião 3: Se o botão não for encontrado, saberemos.
    console.error("ERRO: Botão de gerar CPF não encontrado na página.");
}
