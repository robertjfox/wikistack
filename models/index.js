const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack', {
    logging: false
});

const Page = db.define('page', {
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    slug: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    content: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    status: {
      type: Sequelize.ENUM('open', 'closed')
    }
  });

Page.beforeValidate((pageInstance) => {
    const generateSlug = (title) => {
        return title.replace(/\s+/g, '_').replace(/\W/g, '');
      }
    pageInstance.slug = generateSlug(pageInstance.title)
})
  
const User = db.define('user', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
}
});
  
  module.exports = { db, Page, User };

// const connector = async () => {
//     await db.sync()
//     console.log("helllo synced")

//     const NewPage = await Page.create({
//         title: "test",
//         slug: "strongIsland",
//         content: "blaaaargh",
//         status: "open"
//     })
// }

// connector()

