import { ListAccessArgs } from './types';
import { permissionsList } from './schemas/fields';

// It returns a yes or no value depending on the users session

export function isSignedIn({ session }: ListAccessArgs) {
    return !!session;
}

const generatedPemissions = Object.fromEntries(permissionsList.map(
    permission => [
        permission, function({ session }: ListAccessArgs) {
            return !!session?.data.role?.[permission];
        },
    ]
));

// Permissions checklist to determine if someone meets the condition
export const permissions = {
    ...generatedPemissions,
    // You can add yours if you want.
};

// Rule based functions
// rules can return a boolean Y or N or filter limiting product they can CRUD.

export const rules = {
    canManageProducts({ session }: ListAccessArgs) {
        if(!isSignedIn({ session })) {
            return false;
        }
        // Do they have permission of canManageProducts
        if (permissions.canManageProducts({ session })) {
            return true;
        }
        // Otherwise, do they own the item?
        return { user: { id: session.itemId } };
    } ,
    canOrder({ session }: ListAccessArgs) {
        if(!isSignedIn({ session })) {
            return false;
        }
        // Do they have permission of canManageProducts
        if (permissions.canManageCart({ session })) {
            return true;
        }
        // Otherwise, do they own the item?
        return { user: { id: session.itemId } };
    } ,
    canManageOrderItems({ session }: ListAccessArgs) {
        if(!isSignedIn({ session })) {
            return false;
        }
        // Do they have permission of canManageProducts
        if (permissions.canManageCart({ session })) {
            return true;
        }
        // Otherwise, do they own the item?
        return { order: { user: { id: session.itemId } } };
    } ,
    canReadProducts({ session }: ListAccessArgs) {
        if(!isSignedIn({ session })) {
            return false;
        }
        if(permissions.canManageProducts({ session })) {
            return true;
        }
        // They should only see available products based on the field
        return { status: 'AVAILABLE' };
    },
    canManageUsers({ session }: ListAccessArgs) {
        if(!isSignedIn({ session })) {
            return false;
        }
        
        if (permissions.canManageUsers({ session })) {
            return true;
        }
        // Otherwise, updating themselves is the only possibility?
        return { id: session.itemId };
    } ,
};

