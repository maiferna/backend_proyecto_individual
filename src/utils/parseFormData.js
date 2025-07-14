
/**
 * Función para parsear los datos recibidos a FormData
 * @param {Object} body Objeto JSON
 * @param {Object} file Objeto file
 * @returns Devuelve la data en formato FormData
 */
const parseFormData = (body, file) => {
    const data = {...body};
    if (file) {
        data.image = file.filename;
    } else if (data.imageUrl) {
        data.image = data.imageUrl; // Usamos la imagen anterior
    }

    try {
        if (typeof data.ingredients === 'string') {
            data.ingredients = JSON.parse(data.ingredients);
        }
        if (typeof data.category === 'string') {
            data.category = JSON.parse(data.category);
        }
        if (typeof data.intolerance === 'string') {
            data.intolerance = JSON.parse(data.intolerance);
        }
    } catch (error) {
        throw new Error('Error al parsear la data.')
    }
    return data;
}

module.exports = { parseFormData }