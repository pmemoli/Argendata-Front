interface tiemposCache {
    [dato: string]: number,
}

// Tiempo en ms
const msEnMinuto: number = 60 * 1000;
const msEnHora: number = msEnMinuto * 60;
const msEnDia: number = msEnHora * 24;
const msEnMes: number = msEnDia * 30;

export const tiemposCache: tiemposCache = {
    "dolar": msEnMinuto * 10,
    "crimen": msEnMes * 1,
    "emision": msEnDia * 1,
    "empleo": msEnDia * 1,
    "gasto": msEnDia * 1,
    "inflacion": msEnDia * 1,
    "merval": msEnMinuto * 10,
    "riesgo": msEnMinuto * 10,
    "pobreza": msEnMes * 3,
    "ingresos": msEnDia * 1,
    "distribucion": msEnDia * 1
}
