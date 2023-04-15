interface tiemposCache {
    [dato: string]: number,
}

// Tiempo en ms
const msEnHora = 3600000;
const msEnMes = msEnHora * 24 * 30;

export const tiemposCache: tiemposCache = {
    "dolar": msEnHora * 0.5,
    "cortes": msEnHora * 0.5,
    "crimen": msEnMes * 3,
    "emision": msEnMes * 1,
    "empleo": msEnMes * 3,
    "gasto": msEnMes * 2,
    "inflacion": msEnMes * 0.5,
    "merval": msEnHora * 0.5,
    "riesgo": msEnHora * 0.5,
    "pobreza": msEnMes * 3,
}
