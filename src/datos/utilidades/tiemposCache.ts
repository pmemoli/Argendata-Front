interface tiemposCache {
    [dato: string]: number,
}

// Tiempo en ms
const msEnMinuto: number = 60 * 1000;
const msEnHora: number = 1000 * 60 * 60;
const msEnDia: number = msEnHora * 24;
const msEnMes: number = msEnHora * 24 * 30;

export const tiemposCache: tiemposCache = {
    "dolar": msEnMinuto * 10,
    "crimen": msEnMes * 3,
    "emision": msEnDia * 7,
    "empleo": msEnDia * 7,
    "gasto": msEnDia * 7,
    "inflacion": msEnDia * 7,
    "merval": msEnHora * 0.5,
    "riesgo": msEnHora * 0.5,
    "pobreza": msEnMes * 3,
    "ingresos": msEnDia * 7,
}
