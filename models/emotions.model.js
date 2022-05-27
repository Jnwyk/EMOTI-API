module.exports = (sequelize, DataTypes) => {
    const Emotion = sequelize.define('emotion', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { notNull: { msg: 'EMOTION_NAME!' } }
        },
        image: {
            type: DataTypes.STRING,
        }
    },
    {
        timestamps: false
    })
    return Emotion;
};