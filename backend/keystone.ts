import 'dotenv/config';
import {createAuth} from '@keystone-next/auth';
import { config, createSchema } from '@keystone-next/keystone/schema';
import { User } from './schemas/User';
import { extendGraphqlSchema } from './mutations/index';
import { Product } from './schemas/Product';
import { ProductImage } from './schemas/ProductImage';
import { CartItem } from './schemas/CartItem';
import { OrderItem } from './schemas/OrderItem';
import { Order } from './schemas/Order';
import { Role } from './schemas/Role';
import { withItemData, statelessSessions } from '@keystone-next/keystone/session';
import { insertSeedData } from './seed-data';
import { sendPasswordResetEmail } from './lib/mail';
import { permissionsList } from './schemas/fields';


const databaseURL = process.env.DATABASE_URL || 'mongodb://localhost/keystone-techworld-tutorial';

const sessionConfig = {
    maxAge: 60 * 60 * 24 * 360, // Length of time one stays signed in
    secret: process.env.COOKIE_SECRET,
};

const { withAuth } = createAuth({
    listKey: 'User',
    identityField: 'email',
    secretField: 'password',
    initFirstItem: {
        fields: [ 'name', 'email', 'password' ],
        //Adding initial roles to be done 
    },
    passwordResetLink: {
        async sendToken(args) {
            
            // send the email
            await sendPasswordResetEmail(args.token, args.identity);
            
        },
    },
});

export default withAuth(config({
    //@ts-ignore
    server: {
        cors: {
            origin: [process.env.FRONTEND_URL],
            credentials: true,
        },
    },
    db: {
        adapter: 'mongoose',
        url: databaseURL,

        //seeding data
        async onConnect(keystone) {
            console.log('Connected to the database!');
            if(process.argv.includes('--seed-data'))
            await insertSeedData(keystone);
            
        },
    },
    lists: createSchema({
        // Schema items
        User,
        Product,
        ProductImage,
        CartItem,
        OrderItem,
        Order,
        Role
    }),
    extendGraphqlSchema,
    ui: {
        isAccessAllowed: ({ session }) => {
            // console.log(session);
            return !!session?.data;
            
        },
    },
    //Adding session values
    session: withItemData(statelessSessions(sessionConfig),{
        User: `id name email role { ${permissionsList.join(' ')} }`
    })
}));