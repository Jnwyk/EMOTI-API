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


db.question.belongsTo(db.psychologist, { foreignKey: 'username_psychologist'});
db.question.belongsTo(db.tutor, { foreignKey: 'username_tutor'});
// db.tutor.hasMany(db.question, {onDelete: 'CASCADE'})
// db.psychologist.hasMany(db.question, {onDelete: 'CASCADE'})


db.child = require('./children.model.js')(sequelize, DataTypes);
db.emotion = require('./emotions.model.js')(sequelize, DataTypes);
db.emotion_stats = require('./emotion_stats.model.js')(sequelize, DataTypes);

db.child.belongsToMany(db.emotion, { through: db.emotion_stats });
db.emotion.belongsToMany(db.child, { through: db.emotion_stats });

db.game_question = require('./game_question.model')(sequelize, DataTypes);
db.link_child_psychologist = require('./link_tutor_psychologist.model')(sequelize, DataTypes);

db.emotion.belongsToMany(db.game, { through: db.game_question });
db.game.belongsToMany(db.emotion, { through: db.game_question });

db.psychologist.belongsToMany(db.tutor, { through: db.link_child_psychologist });
db.tutor.belongsToMany(db.psychologist, { through: db.link_child_psychologist });



(async () => {
    try {
        await sequelize.sync();
        console.log('DB is successfully synchronized')
    } catch (error) {
        console.log(error)
    }
})();

module.exports = db;