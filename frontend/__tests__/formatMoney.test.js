import formatMoney from '../lib/formatMoney';

describe('format Money function', () => {
    it('Works with fractional dollars',  () => {
        expect(formatMoney(1)).toEqual('$0.01');
        expect(formatMoney(10)).toEqual('$0.10');
        expect(formatMoney(50)).toEqual('$0.50');
        expect(formatMoney(100)).toEqual('$1');
        
    });

    it('leaves off cents when its whole dolars', () => {
        expect(formatMoney(1000)).toEqual('$10');
        expect(formatMoney(100)).toEqual('$1');
    });

    it('works with whole and fractional dollars', () => {
        expect(formatMoney(140)).toEqual('$1.40');
        expect(formatMoney(3013)).toEqual('$30.13');
        expect(formatMoney(110)).toEqual('$1.10');
        expect(formatMoney(101)).toEqual('$1.01');
        expect(formatMoney(4647384748392938)).toEqual('$46,473,847,483,929.38');
    });
});