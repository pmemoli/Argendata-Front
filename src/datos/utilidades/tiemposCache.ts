interface tiemposCache {
    [dato: string]: number,
}

// Tiempo en ms
const msEnMinuto: number = 60 * 1000;
const msEnHora: number = 1000 * 60 * 60;
const msEnMes: number = msEnHora * 24 * 30;

export const tiemposCache: tiemposCache = {
    "dolar": msEnMinuto * 10,
    "crimen": msEnMes * 3,
    "emision": msEnMes * 0.25,
    "empleo": msEnMes * 0.25,
    "gasto": msEnMes * 0.25,
    "inflacion": msEnMes * 0.25,
    "merval": msEnHora * 0.5,
    "riesgo": msEnHora * 0.5,
    "pobreza": msEnMes * 3,
}
