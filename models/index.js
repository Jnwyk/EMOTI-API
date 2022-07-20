const dbConfig = require('../config/db.config.js');
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect
    ,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

(async () => {
    try {
        await sequelize.authenticate;
        console.log('Connection has been established successfully.');
    } catch (err) {
        console.error('Unable to connect to the database:', err);
    }
})();

const db = {};
db.sequelize = sequelize;


db.question = require('./questions.model.js')(sequelize, DataTypes);
db.psychologist = require('./psychologists.model.js')(sequelize, DataTypes);
db.tutor = require('./tutors.model.js')(sequelize, DataTypes);
db.game = require('./games.model.js')(sequelize, DataTypes);
db.child = require('./children.model.js')(sequelize, DataTypes);
db.emotion = require('./emotions.model.js')(sequelize, DataTypes);
db.emotion_stats = require('./emotion_stats.model.js')(sequelize, DataTypes);
db.game_question = require('./game_question.model')(sequelize, DataTypes);

db.question.belongsTo(db.psychologist, { foreignKey: 'username_psychologist'});
db.question.belongsTo(db.tutor, { foreignKey: 'username_tutor'});

db.child.belongsToMany(db.emotion, { through: db.emotion_stats });
db.emotion.belongsToMany(db.child, { through: db.emotion_stats });

db.child.belongsTo(db.tutor, { foreignKey: 'leading_tutor' });

db.emotion.belongsToMany(db.game, { through: db.game_question });
db.game.belongsToMany(db.emotion, { through: db.game_question });

(async () => {
    try {
        await sequelize.sync({ alter: true });
        console.log('DB is successfully synchronized')
    } catch (error) {
        console.log(error)
    }
})();

module.exports = db;