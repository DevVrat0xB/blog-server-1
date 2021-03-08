const dotenv = require('dotenv').config();
const { Keystone } = require('@keystonejs/keystone')
const { GraphQLApp } = require('@keystonejs/app-graphql')
const { AdminUIApp } = require('@keystonejs/app-admin-ui')
const { MongooseAdapter: Adapter } = require('@keystonejs/adapter-mongoose');
const PROJECT_NAME = 'blog-server-1';

const adapterConfig = { 
  //mongoUri: 'mongodb://localhost/blog-server-1' 
  mongoUri: process.env.MONGO_URI,
}

const PostSchema = require('./lists/Post')
const UserSchema = require('./lists/User')
//console.log('postSchema : '+JSON.stringify(PostSchema.fields));
//console.log('userSchema : '+JSON.stringify(UserSchema.fields));
/**
 * You've got a new KeystoneJS Project! Things you might want to do next:
 * - Add adapter config options (See: https://keystonejs.com/keystonejs/adapter-mongoose/)
 * - Select configure access control and authentication (See: https://keystonejs.com/api/access-control)
 */

const keystone = new Keystone({
  adapter: new Adapter(adapterConfig),
  cookieSecret: process.env.COOKIE_SECRET
});

keystone.createList('Post', PostSchema)
keystone.createList('User', { fields: UserSchema.fields})

module.exports = {
  keystone,
  apps: [new GraphQLApp(), new AdminUIApp({ name: PROJECT_NAME, enableDefaultRoute: true })],
};
