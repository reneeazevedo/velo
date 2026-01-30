export function generateOrderCode() {
    const prefixo = "VLO";
    const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const alfanumerico = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    const letraAleatoria = letras.charAt(
        Math.floor(Math.random() * letras.length)
    );

    let sufixo = "";
    for (let i = 0; i < 5; i++) {
        sufixo += alfanumerico.charAt(
            Math.floor(Math.random() * alfanumerico.length)
        );
    }

    return `${prefixo}-${letraAleatoria}${sufixo}`;
}