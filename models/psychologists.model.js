module.exports = (sequelize, DataTypes) => {
    const Psychologist = sequelize.define('psychologist', {
        username_psychologist: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
            validate: { notNull: { msg: 'USERNAME!' } }
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { notNull: { msg: 'NAME!' } }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { message: 'EMAIL!' } 
            }
        },
        degree: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { message: 'DEGREE!' } 
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { message: 'PASSWORD!' } 
            }
        },
        gender: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            validate: {
                notNull: { message: 'GENDER!' } 
            }
        },
        image: {
            type: DataTypes.STRING
        },
        birth_date: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                notNull: { message: 'BOD!' } 
            }
        },
        
    },
    {
        timestamps: false
    })
    return Psychologist;
};