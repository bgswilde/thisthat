const User = require('./User');
const Question = require('./Question');
const Choice = require('./Choice');

// create associations 
User.hasMany(Question, {
    foreignKey: 'user_id'
});

Question.hasMany(User, {
    foreignKey: 'question_id'
})

// DOUBlE CHECK THE FOREIGN KEY AND MAKE SURE THEY THE RIGHT ONES 
User.belongsToMany(Question, {
    through: Choice,
    as: 'choice_selected',
    foreignKey: 'user_id'
});
// DOUBlE CHECK THE FOREIGN KEY AND MAKE SURE THEY THE RIGHT ONES 
Question.belongsToMany(User, {
    through: Choice,
    as:'choice_selected',
    foreignKey: 'question_id'
});

Choice.belongsTo(User, {
    foreignKey: 'user_id'
});

Choice.belongsTo(Question, {
    foreignKey: 'question_id'
});



module.exports = { User, Question, Choice }; 