module.exports = hbs => {
    hbs.registerHelper('formatDate', (date) => {
        return date.toISOString().split('T')[0];
    })
}