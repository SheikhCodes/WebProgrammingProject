const { connect } = require('mongoose');
const { MONGO_URI } = process.env

connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connected successfully');
}
).catch(err => {
    console.log(err);
}
);