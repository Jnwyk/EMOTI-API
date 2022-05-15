module.exports = (sequelize, DataTypes) => {
    const LinkTutPsych = sequelize.define('linkTutorPsychologist', {       
    },
    {
        timestamps: false
    })
    return LinkTutPsych;
};