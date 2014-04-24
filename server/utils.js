module.exports = {
    ts: function timestamp () {
        return '[' + new Date().toJSON().replace('T',' ').replace(/.{5}$/,'') + '] ';
    },
    rnd: function () {
        return Math.round(Math.random()*10000);
    }
};