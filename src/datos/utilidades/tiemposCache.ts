interface tiemposCache {
    [dato: string]: number,
}

// Tiempo en ms
const msEnHora = 3600000;
const msEnMes = msEnHora * 24 * 30;

export const tiemposCache: tiemposCache = {
    "dolar": msEnHora * 1,
    "cortes": msEnHora * 1,
    "crimen": msEnMes * 3,
    "emision": msEnMes * 1,
    "empleo": msEnMes * 3,
    "gasto": msEnMes * 2,
    "inflacion": msEnMes * 0.5,
    "merval": msEnHora * 2,
    "riesgo": msEnHora * 2,
}
