import { qlspServices } from "../services/qlsp.Services.js"
import { SanPham } from "../model/SanPham.js";
import { Validation } from "../model/validation.js";

const validation = new Validation()





document.addEventListener("click", function (e) {
    const overlay = document.getElementById("overlay");
    const formElement = document.getElementById("formPhone");
    const modal = document.querySelector(".modal.active");

    // Mở modal
    if (e.target.getAttribute("data-toggle") === "modal") {
        const targetSelector = e.target.getAttribute("data-target");
        const targetModal = document.querySelector(targetSelector);

        if (targetModal && overlay) {
            targetModal.classList.add("active");
            overlay.classList.add("active");
            document.body.classList.add("modal-active");

            if (targetSelector === "#formPhone" && formElement) {
                formElement.reset()
                formElement.removeAttribute("data-action")
                formElement.removeAttribute("data-id")
                document.getElementById('header-title').textContent = "Products Management"
                document.getElementById('btnAdd').className = 'btn-add'
                document.getElementById('btnUdate').style.display = 'none'
            }
        }
    }

    // Đóng modal
    if (e.target.getAttribute("data-dismiss") === "modal" || e.target === overlay) {
        if (modal && overlay) {
            modal.classList.remove("active");
            overlay.classList.remove("active");
            document.body.classList.remove("modal-active");

            // Reset form khi đóng modal formPhone
            if (modal.id === "formPhone" && formElement) {
                formElement.reset();
                formElement.removeAttribute("data-action");
                formElement.removeAttribute("data-id")
                validation.resetValidation()
            }
        }
    }
})





const renderTable = (arr) => {
    let htmlContent = '';
    arr.forEach((item, index) => {
        const mapType = (type) => {
            if (type === "iphone") return "Iphone";
            if (type === "samsung") return "Samsung";
            return "Other";
        }
        htmlContent += `
        <tr> 
            <td>${index + 1}</td>
            <td>${item.name}</td>
            <td>${item.price}</td>
            <td>
                <img class="mix-blend-darken" width="100vw" height="100vh" src="${item.img}" />
            </td>
            <td>${mapType(item.type)}</td>
            <td>${item.desc}</td>
            <td>
                <button 
                class="py-2 px-5 bg-green-600" 
                data-toggle="modal" 
                data-target="#formPhone" 
                onclick="editProduct('${item.id}')"
                                
                >Edit</button>

                <button class="py-2 px-5 bg-red-500" onclick="deteProduct('${item.id}')">Delete</button>
            </td>
        </tr>`;


    });

    document.getElementById('tblProductsList').innerHTML = htmlContent;
}

// Get products
const getProducts = async () => {
    try {

        const result = await qlspServices.getProductList()

        renderTable(result.data)
        console.log("result: ", result.data);
    } catch (err) {
        console.log("err: ", err);

    }


}
getProducts()


// get infor from form UI
const getFormInfo = () => {

    const elements = document.querySelectorAll('#formPhone input, #formPhone select, #formPhone textarea')

    let product = {}
    elements.forEach((element) => {

        const { id, value } = element
        product[id] = value
    })



    console.log("product: ", product);

    console.log("elements: ", elements);

    return new SanPham(product.name, product.price, product.screen, product.backCamera, product.type, product.frontCamera, product.img, product.desc)
}

// onsubmit
document.getElementById('formPhone').onsubmit = async (ev) => {
    const formElement = document.getElementById('formPhone')
    try {
        ev.preventDefault()
        // Lay sp tu form
        const product = getFormInfo()
        console.log("product: ", product);
        const action = formElement.getAttribute('data-action')

        let isValid = true

        isValid &= validation.required(product.name, "Vui lòng điền tên sản phẩm", "tbName")
        isValid &= validation.required(product.price, "Vui lòng điền giá sản phẩm", "tbPrice")
        isValid &= validation.required(product.screen, "Vui lòng điền screen", "tbScreen")
        isValid &= validation.required(product.backCamera, "Vui lòng điền back camera", "tbBackCamera")
        isValid &= validation.required(product.type, "Vui lòng chọn loại", "tbType")
        isValid &= validation.required(product.frontCamera, "Vui lòng điền front camera", "tbFrontCamera")
        isValid &= validation.required(product.img, "Vui lòng điền link sản phẩm", "tbImg")
        isValid &= validation.required(product.desc, "Vui lòng điền mô tả", "tbDesc")

        if (!isValid) return


        formElement.reset()
        if (action !== 'edit') {
            //   Goi API them moi sp
            const result = await qlspServices.addProduct(product)

        }

        if (action === 'edit') {
            const productId = formElement.getAttribute('data-id')
            await qlspServices.editProduct(productId, product)
            document.getElementById('btnClose').click()

        }

        getProducts()
    } catch (err) {

    }
}





// edit product
window.editProduct = async (productId) => {

    try {
        //goi API lay thong tin sp 
        const result = await qlspServices.getProductById(productId)
        const elements = document.querySelectorAll('#formPhone input, #formPhone select, #formPhone textarea')
        document.getElementById('header-title').textContent = "edit product"
        document.getElementById('btnAdd').className = 'hidden'
        document.getElementById('btnUdate').style.display = 'inline-block'
        document.getElementById('formPhone').setAttribute('data-action', 'edit')
        document.getElementById('formPhone').setAttribute('data-id', productId)

        elements.forEach((element) => {
            const { id } = element
            element.value = result.data[id]
        })

    } catch (err) {

    }
    console.log("productId: ", productId);
}

// Delete product

window.deteProduct = async (productId) => {
    console.log("productId: ", productId);

    try {
        await qlspServices.deleteProduct(productId)


        getProducts()

    } catch (err) {
        console.log("err: ", err);

    }
}


// ================
document.getElementById('filterType').onchange = async (e) => {
    const selectedType = e.target.value
    try {
        const result = await qlspServices.getProductList(selectedType)

        let filteredProducts;

        if (selectedType) {
            filteredProducts = result.data.filter((product) => product.type === selectedType);
        } else {
            filteredProducts = result.data;
        }
        renderTable(filteredProducts)

    } catch (err) {
        console.log("err: ", err);


    }


}
