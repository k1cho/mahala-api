module.exports = {
    firstUppercase: (string) => {
        const name = string.toLowerCase()
        return name.charAt(0).toUpperCase() + name.slice(1)
    },

    lowerCase: (string) => {
        return string.toLowerCase()
    }
}