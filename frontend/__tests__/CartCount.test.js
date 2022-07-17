import { render } from '@testing-library/react';
import wait from 'waait';
import CartCount from '../components/CartCount';

describe('<CartCount/>', () => {
    it('Renders', () => {
        render(<CartCount count={10} />);
    });

    it('Matches snapshot', () => {
        const { container } = render(<CartCount count={11} />);
        expect(container).toMatchSnapshot();
    });

    it('updats via props', async() => {
        const { container, rerender, debug } = render(<CartCount count={11}/>);
        expect(container.textContent).toBe('11');
        expect(container).toHaveTextContent('11');

        rerender(<CartCount count="15"/>);
        expect(container.textContent).toBe('1511');
        await wait(400);
        expect(container.textContent).toBe('15');
        expect(container).toMatchSnapshot();

    });
});