// Esta función se utiliza al realizar busquedas para ignorar caracteres especiales y mayusculas
export const normalizeText = (text: string): string => {
    return text
      .normalize("NFD")                   // separa los caracteres base de los acentos
      .replace(/[\u0300-\u036f]/g, "")    // elimina los signos diacríticos
      .toLowerCase();                    // convierte todo a minúsculas
};