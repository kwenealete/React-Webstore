import { PAGINATION_QUERY } from "../components/Pagination";

export default function paginationField() {
    return {
        keyArgs: false, //imforms apollo we will handle everything
        read(existing = [], { args, cache }) {
            const { skip, first } = args;

            // Read the nuber of items on the page from the cache
            const data = cache.readQuery({ query: PAGINATION_QUERY });
            const count = data?._allProductsMeta?.count;
            const page = skip / first + 1;
            const pages = Math.ceil(count / first);
            
            // Check for existing items
            const items = existing.slice(skip, skip + first).filter((x) => x);

            // If there are items and not enough to satisfy our request, and we're on last page
            // Then just send it
            if (items.length && items.length !== first && page === pages) {
                return items;
            }
            if (items.length !== first) {
                // No items found, so we need to check the network
                return false;
            }

            // If there are items, we'll just return from the cache and forget going to the network
            if (items.length) {
                // console.log(`There are ${items.length} items in the cache! Sending them to apollo`);
                return items;
            }

            return false; // Fallback to network
        },
        merge(existing, incoming, { args }) {
            const { skip, first } = args;
            // It runs when apollo clients comes back with our products from the network
            // console.log(`merging items from the network ${incoming.length}`);
            const merged = existing ? existing.slice(0) : [];
            for (let i = skip; i < skip + incoming.length; ++i) {
                merged[i] = incoming[i - skip];
            }

            // We finally return the merged items from the cache
            return merged;
            
        }
    };
}