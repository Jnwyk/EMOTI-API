module.exports = (sequelize, DataTypes) => {
    const LinkChildTut = sequelize.define('linkChildTutor', {       
    },
    {
        timestamps: false
    })
    return LinkChildTut;
};