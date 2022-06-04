import { KeystoneContext } from '@keystone-next/types';
import { CartItemCreateInput } from '.././.keystone/schema-types';
import { CartItem } from '../schemas/CartItem';
import { Session } from '../types';

async function addToCart(
    root: any,
    { productId }: { productId: string },
    context: KeystoneContext
): Promise<CartItemCreateInput> {
    
    // Query user to chceck if they are signed in
    const sesh = context.session as Session;
    if(!sesh.itemId) {
        throw new Error('You must be logged in to do that');
    }

    // Query logged in user's cart
    const allCartItems = await context.lists.CartItem.findMany({
        where: { user: { id: sesh.itemId }, product: { id: productId } },
        resolveFields: 'id, quantity'
    });
    const [existingCartItem] = allCartItems;
    if(existingCartItem) {
        console.log(`There are already ${existingCartItem.quantity}, increase by 1!`);

         // Increase by 1 if item exists
        return await context.lists.CartItem.updateOne({
            id: existingCartItem.id,
            data: { quantity: existingCartItem.quantity + 1 },
            resolveFields: false
        });        
    }

    // If not, create a new cart item
    return await context.lists.CartItem.createOne({
        data: {
            product: { connect: { id: productId }},
            user: { connect: { id: sesh.itemId }},
        },
        resolveFields: false
    }) 
    
}



export default addToCart;