module.exports = (sequelize, DataTypes) => {
    const GameQuestion = sequelize.define('gameQuestion', {  
        right: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            validate: { notNull: { msg: 'IS ANSWER RIGHT?!' } }
        }     
    },
    {
        timestamps: false
    })
    return GameQuestion;
};