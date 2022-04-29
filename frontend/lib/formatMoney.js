export default function formatMoney(amount = 0) {
    const options = {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
    };

    //check for clean dollar amounts
    if(amount % 100 === 0) {
        options.minimumFractionDigits = 0;
    }

    const formatter = Intl.NumberFormat('en-us', options);

    return formatter.format(amount / 100);
}