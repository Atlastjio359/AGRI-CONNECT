function addProduct(data) {
    fetch(apiEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(product => {
        // Update product list
        const productList = document.getElementById('productList');
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${product.name}</td>
            <td>${product.description}</td>
            <td>${product.category}</td>
            <td>${product.price}</td>
            <td>${product.quantity}</td>
            <td><button onclick="deleteProduct(${product.id})">Delete</button></td>
        `;
        productList.appendChild(newRow);
    })
    .catch(error => console.error('Error adding product:', error));
}

// Function to delete a product
function deleteProduct(productId) {
    fetch(${apiEndpoint}/${productId}, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            // Remove the deleted product from the list
            const productList = document.getElementById('productList');
            const rows = productList.getElementsByTagName('tr');
            for (let i = 0; i < rows.length; i++) {
                if (rows[i].cells[0].textContent === productId) {
                    productList.removeChild(rows[i]);
                    break;
                }
            }
        } else {
            console.error('Error deleting product:', response.statusText);
        }
    })
    .catch(error => console.error('Error deleting product:', error));
}

// Event listener for form submission
const productForm = document.getElementById('productForm');
productForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const category = document.getElementById('category').value;
    const price = document.getElementById('price').value;
    const quantity = document.getElementById('quantity').value;
    const image = document.getElementById('image').files[0];

    // Handle image upload (you may need to implement additional logic for image processing and storage)
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('price', price);
    formData.append('quantity', quantity);
    formData.append('image', image);

    addProduct(formData);
});

// Fetch existing products from the API (if applicable)
fetch(apiEndpoint)
.then(response => response.json())
.then(products => {
    products.forEach(product => {
        // Add each product to the product list
        addProduct(product);
    });
})
.catch(error => console.error('Error fetching products:', error));