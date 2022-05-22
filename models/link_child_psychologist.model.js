module.exports = (sequelize, DataTypes) => {
    const LinkChildPsych = sequelize.define('linkChildPsychologist', {       
    },
    {
        timestamps: false
    })
    return LinkChildPsych;
};