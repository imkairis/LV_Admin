import { Select } from '~/Components/common';

function FilterProduct() {
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted');
    };

    const optionTypeProduct = [
        { value: 'all', label: 'All' },
        { value: 'food', label: 'Food' },
        { value: 'drink', label: 'Drink' },
    ];

    const status = [
        { value: 'all', label: 'All' },
        { value: true, label: 'Not hide' },
        { value: false, label: 'Hidden' },
    ];

    return (
        <section>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Search product" />
                <Select name="type" options={optionTypeProduct} />
                <Select name="promotion" options={optionTypeProduct} />
                <Select name="status" options={status} />
            </form>
        </section>
    );
}

export default FilterProduct;
