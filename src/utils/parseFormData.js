
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
            console.log(typeof data.ingredients, data.ingredients);
        }
        if (typeof data.category === 'string') {
            data.category = JSON.parse(data.category);
            console.log(typeof data.category, data.category);
        }
        if (typeof data.intolerance === 'string') {
            data.intolerance = JSON.parse(data.intolerance);
            console.log(typeof data.intolerance, data.intolerance);
        }
    } catch (error) {
        throw new Error('Error al parsear la data.')
    }
    return data;
}

module.exports = { parseFormData }