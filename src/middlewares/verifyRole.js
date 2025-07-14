/**
 * Función para verificar el rol del usuario
 * @param {String} requiredRole Rol del usuario
 * @returns Ejecuta la siguiente función si el rol tiene acceso autorizado
 */
const verifyRole = (requiredRole) => {
    return (req, res, next) => {
        if (!req.role) {
            return res.status(404).json({
                msg: 'Información de usuario no disponible.'
            });
        }
        if (req.role !== requiredRole) {
            return res.status(403).json({
                msg: 'Acceso no autorizado para este rol.'
            });
        }
        next();
    };
};

module.exports = {
    verifyRole
};