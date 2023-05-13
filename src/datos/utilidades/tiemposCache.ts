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
    "crimen": msEnMes * 1,
    "emision": msEnDia * 1,
    "empleo": msEnDia * 1,
    "gasto": msEnDia * 1,
    "inflacion": msEnDia * 0,
    "merval": msEnHora * 0.5,
    "riesgo": msEnHora * 0.5,
    "pobreza": msEnMes * 3,
    "ingresos": msEnDia * 1,
    "distribucion": msEnDia * 1
}
