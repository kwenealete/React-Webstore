import { useCombobox, resetIdCounter } from 'downshift';
import { SearchStyles, DropDown, DropDownItem } from './styles/DropDown';
import gql from 'graphql-tag';
import { useLazyQuery } from '@apollo/client';
import debounce from 'lodash.debounce';
import { useRouter } from 'next/router';

const SEARCH_PRODUCT_QUERY = gql`
    query SEARCH_PRODUCT_QUERY($searchTerm: String!) {
        searchTerms: allProducts(
            where: {
                OR: [
                    { name_contains_i: $searchTerm }
                    { description_contains_i: $searchTerm }
                ]
            }
        )   {
            id
            name
            photo {
                image {
                    publicUrlTransformed
                }
            }
        }
    }
`;

export default function Search() {
    const router = useRouter();
    const [findItems, { loading, data, error }] = useLazyQuery(
        SEARCH_PRODUCT_QUERY,
        {
            fetchPolicy: 'no-cache',
        }
    );
    const items = data?.searchTerms || [];
    const findItemsButChill = debounce(findItems, 350);
    resetIdCounter();
    const {
        isOpen,
        inputValue,
        getMenuProps,
        getInputProps,
        getComboboxProps,
        getItemProps,
        highlightedIndex,
    } = useCombobox({
        items,
        onInputValueChange() {
            findItemsButChill({
                variables: {
                    searchTerm: inputValue
                }
            });            
        },
        onSelectedItemChange({ selectedItem }) {
            router.push({
                pathname: `/product/${selectedItem.id}`
            });            
        },
        itemToString: (item) => item?.name || '',
    });
    return (
        <SearchStyles>
            <div {...getComboboxProps()}>
                <input
                    {...getInputProps({
                        type: 'search',
                        placeholder: 'search for an item',
                        id: 'search',
                        className:loading ? 'loading' : '',
                    })}
                />
            </div>
            <DropDown {...getMenuProps()}>
                {isOpen && items.map((item, index) => (
                    <DropDownItem {...getItemProps({ item })} key={item.id} highlighted={index === highlightedIndex}>
                        <img
                            src={item.photo.image.publicUrlTransformed}
                            alt={item.name}
                            width='50'
                        />
                        {item.name}
                    </DropDownItem>
                ))}
                {isOpen && !items.length && !loading && (
                    <DropDownItem>
                        Sorry, no items found for {inputValue}
                    </DropDownItem>
                )}
            </DropDown>
        </SearchStyles>
    );
}
