module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],

  publicPath:
    process.env.NODE_ENV === "production"
      ? "/davidjes97.github.io/my-first-vue/"
      : "/"
}