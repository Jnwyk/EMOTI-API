module.exports = (sequelize, DataTypes) => {
    const Game = sequelize.define('game', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { notNull: { msg: 'NAME!' } }
        },
        image: {
            type: DataTypes.STRING,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { message: 'DESCRIPTION!' } 
            }
        }
    },
    {
        timestamps: false
    })
    return Game;
};