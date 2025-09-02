import './style.css'

const multiPrimeiroDigit = [10, 9, 8, 7, 6, 5, 4, 3, 2]; /* base numerica pro calculo do verificador 1 */
const multiSegundoDigit = [11, 10, 9, 8, 7, 6, 5, 4, 3, 2];

/* gera os 9 primeiros digitos */
function generateCpfNumber(): number[] {
    return Array.from({ length: 9 }, () => Math.floor(Math.random() * 10));
}

/* calcula um digito verificador */
function calculateDigit(cpfNumeros: number[], multiplicadores: number[]): number{
    const soma = cpfNumeros
        .map((valor: number, index: number) => valor * multiplicadores[index])
        .reduce((acc: number, valorAtual: number) => {
        return acc + valorAtual;
        }, 0);

        const resto = (soma * 10) % 11;
        return resto === 10 || resto === 11 ? 0 : resto;

};

function generateCpf(): number[] {
    const base = generateCpfNumber();
    const primeiroDigito = calculateDigit(base, multiPrimeiroDigit);
    const segundoDigito = calculateDigit([...base, primeiroDigito], multiSegundoDigit);

    return [...base, primeiroDigito, segundoDigito];
}


function formatCpf(cpf: number[]): string {
    const bloco1 = cpf.slice(0, 3).join("");
    const bloco2 = cpf.slice(3, 6).join("");
    const bloco3 = cpf.slice(6, 9).join("");
    const verificadores = cpf.slice(9, 11).join("");
    

    const cpfFormatado = `${bloco1}.${bloco2}.${bloco3}-${verificadores}`;
    return cpfFormatado;
}


const generateBtn = document.querySelector<HTMLButtonElement>('#generate-btn');

function handleGenerateAndDisplayCpf() {
    const cpfCompleto = generateCpf();
    const cpfFormatado = formatCpf(cpfCompleto);

    const cpfNumberSpan = document.querySelector<HTMLSpanElement>('#cpf-number');
    if (cpfNumberSpan) cpfNumberSpan.textContent = cpfFormatado;
}

if(generateBtn){
    generateBtn.addEventListener('click', handleGenerateAndDisplayCpf);
}