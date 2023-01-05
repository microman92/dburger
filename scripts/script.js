


const product = {
    crazy: {
        name: 'Crazy',
        price: 31000,
        img: 'img/crazy.png',
        amount: 0,
        get totalSumm() {
            return this.price * this.amount
        }
    },
    light: {
        name: 'Light',
        price: 26000,
        img: 'img/light.png',
        amount: 0,
        get totalSumm() {
            return this.price * this.amount
        }
    },
    cheeseburger: {
        name: 'CheeseBurger',
        price: 26000,
        img: 'img/cheeseBurger.png',
        amount: 0,
        get totalSumm() {
            return this.price * this.amount
        }
    },
    dburger: {
        name: 'dBurger',
        price: 26000,
        img: 'img/dBurger.png',
        amount: 0,
        get totalSumm() {
            return this.price * this.amount
        }
    },

};

const productBtns = document.querySelectorAll('.card__item_btn'),
    productMenu = document.querySelector('.basket__inner'),
    basketbtn = document.querySelector('.basket'),
    closeBasket = document.querySelector('.close'),
    MenuList = document.querySelector('.basket__list'),
    totalPriceMenu = document.querySelector('.basket__down_price'),
    productCount = document.querySelector('.basket__span');
productBtns.forEach(btn => {
    btn.addEventListener('click', function () {
        plusOrMinus(this)
    })
})


function plusOrMinus(btn) {
    let parent = btn.closest('.card'),
        parentId = parent.getAttribute('id');
    product[parentId].amount++;
    basket()
}



function basket() {
    const productArr = [];
    let totalCount = 0;
    for (const key in product) {
        const pk = product[key];
        const productCard = document.querySelector(`#${pk.name.toLowerCase()}`),
            parentIndicator = productCard.querySelector('.card__span');
        if (pk.amount) {
            productArr.push(pk)
            productCount.classList.add('active');
            totalCount += pk.amount;
            parentIndicator.classList.add('active')
            parentIndicator.innerHTML = pk.amount;
        } else {
            parentIndicator.classList.remove('active')
            parentIndicator.innerHTML = 0;
        }
        productCount.innerHTML = totalCount;

    }
    MenuList.innerHTML = '';
    for (let i = 0; i < productArr.length; i++) {
        MenuList.innerHTML += menuItemBurger(productArr[i])
    }
    totalPriceMenu.innerHTML = totalSumProduct();
}

basketbtn.addEventListener('click', function () {
    productMenu.classList.toggle('active')
})

closeBasket.addEventListener('click', function () {
    productMenu.classList.remove('active')
})

function menuItemBurger(productItem) {
    const {
        name,
        totalSumm: price,
        amount,
        img
    } = productItem;

    return `<div class="basket__list">
    <div class="basket__list_item">
        <div class="basket__list_left">
            <img src="${img}" alt="crazy">
            <div class="basket__list_desc">
                <h4 class="basket__list_desc-title">${name}</h4>
                <p class="basket__list_desc-text">${price}</p>
            </div>
        </div>
        <div class="basket__btns" id="${name.toLowerCase()}__card">
            <button class="basket__btn minus" data-symbol="-">-</button>
            <output class="basket__count">${amount}</output>
            <button class="basket__btn plus" data-symbol="+">+</button>
        </div>
    </div>
</div>`

}

function totalSumProduct() {
    let totalPrice = 0;

    for (const key in product) {
        totalPrice += product[key].totalSumm;
    }
    return totalPrice
}


window.addEventListener('click', (e) => {
    const btn = e.target;
    if (btn.classList.contains('basket__btn')) {
        const attr = btn.getAttribute('data-symbol');
        const parent = btn.closest('.basket__btns');


        if (parent) {
            const idProduct = parent.getAttribute('id').split('__')[0]
            if (attr == '-') {
                product[idProduct].amount--;

            } else if (attr == '+') {
                product[idProduct].amount++
            }
            basket()
        }
    }

})


const btnCard = document.querySelector('.basket__down'),
    printBody = document.querySelector('.print__body'),
    printFooter = document.querySelector('.print__footer');

btnCard.addEventListener('click', () => {
    printBody.innerHTML = ''
    for (const key in product) {
        const { name, totalSumm, amount } = product[key];
        if (amount) {
            printBody.innerHTML += `
            <div class="print__body_item">
            <p class="print__body_name">
                <span class="name">${name}</span>
                <span class="count">${amount}</span>
            </p>
            <p class="print__body_sum">${totalSumm}</p>
        </div> `
        }
        console.log(name, totalSumm, amount);
    }

    printFooter.innerHTML = totalSumProduct();
    window.print();
})

