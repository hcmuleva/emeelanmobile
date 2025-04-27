import Logo from "./extensions/logo1.png"
const config = {
  auth: {
    logo: Logo,
  },
  menu: {
    logo: Logo,
  },
  head: {
    favicon: Logo,
  },
  tutorials: false,
  notifications: { releases: false },
  translations:{
    en:{
      "app.components.LeftMenu.navbrand.title": "Emeelan",
      "Auth.form.button.login.strapi": "Log in",
      "Auth.form.register.subtitle": "Credentials are only used to authenticate in Strapi. All saved data will be stored in your database.",
      "Auth.form.welcome.subtitle": "Log in to your Strapi account",
      "Auth.form.welcome.title": "Welcome to Strapi!",
      "Settings.application.ee.admin-seats.add-seats": "{isHostedOnStrapiCloud, select, true {Add seats} other {Contact sales}}",
      "Settings.application.strapi-version": "Strapi version",
      "Settings.application.strapiVersion": "Strapi version",
      "Settings.permissions.users.listview.header.subtitle": "All the users who have access to the Strapi admin panel",
      "admin.pages.MarketPlacePage.offline.subtitle": "You need to be connected to the Internet to access Strapi Market.",
      "admin.pages.MarketPlacePage.plugin.tooltip.madeByStrapi": "Made by Strapi",
      "admin.pages.MarketPlacePage.plugin.tooltip.verified": "Plugin verified by Strapi",
      "admin.pages.MarketPlacePage.plugin.version": "Update your Strapi version: \"{strapiAppVersion}\" to: \"{versionRange}\"",
      "admin.pages.MarketPlacePage.plugin.version.null": "Unable to verify compatibility with your Strapi version: \"{strapiAppVersion}\"",
      "admin.pages.MarketPlacePage.subtitle": "Get more out of Strapi",
      "admin.pages.MarketPlacePage.tab-group.label": "Plugins and Providers for Strapi",
      "app.components.BlockLink.blog.content": "Read the latest news about Strapi and the ecosystem.",
      "app.components.BlockLink.tutorial.content": "Follow step-by-step instructions to use and customize Strapi.",
      "app.components.BlockLink.cloud": "Strapi Cloud",
      "app.components.MarketplaceBanner.image.alt": "A Strapi rocket logo",
      "components.AutoReloadBlocker.description": "Run Strapi with one of the following commands:",
      "global.plugins.sentry.description": "Send Strapi error events to Sentry.",
      "notification.version.update.message": "A new version of Strapi is available!",

    }
  }


};

const bootstrap = (app) => {
  console.log(app)
};

export default {
  config,
  bootstrap
};