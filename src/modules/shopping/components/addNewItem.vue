<template>
    <!-- add items inputs -->
    <transition name="fade">
        <div class="add-items-inputs" v-if="show">
            <div class="button close-input-section" @click="closeDropDown">
                <p>Close ✖</p>
            </div>

            <!-- searching -->
            <div class="input-section">
                <input type="text" v-model="enteredInput" placeholder="type to search" />
                <button @click="clearInput">Clear Input</button>
            </div>
            <p>
                searching for
                <strong>{{ enteredInput === '' ? '- - - -' : `${enteredInput}` }}</strong>
            </p>
            <br />
            <div class="grocery-section">
                <div class="grocery-list">
                    <!-- grocery list -->
                    <h4>Product list</h4>
                    <!-- <p v-for="(item, index) in filteredList" :key="index">{{ item }}</p> -->
                    <div v-for="(item, index) in filteredList" :key="index">
                        <input
                            type="checkbox"
                            :id="item.name"
                            :value="item.name"
                            v-model="checkedGroceries"
                        />
                        <label :for="item.name">{{ item.name }} @ 💲{{ item.price }}</label>
                    </div>
                </div>
                <div class="griceries-selected">
                    <!-- selected groceries items -->
                    <h4>Selected Groceries</h4>
                    <div v-if="checkedGroceries.length > 0">
                        <p v-for="(item, index) in checkedGroceries" :key="index">-> {{ item }}</p>
                    </div>
                    <div v-else>
                        <p>Nothing selected</p>
                    </div>
                </div>
            </div>
            <br />
            <div class="button close-input-section center-button" @click="addToOrder">
                <p>Add to Order ➕</p>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    name: 'add-new-item',

    data() {
        return {
            enteredInput: '',
            checkedGroceries: []
        }
    },

    computed: {
        show() {
            return this.$store.getters['GET_SHOW_ADD_NEW_ITEM'];
        },

        books() {
            return this.$store.getters['GET_BOOKS'];
        },

        filteredList() {
            // var products = this.$store.getters['GET_PRODUCTS']
            // if (products.length > 0) { return this.filterFromProducts() }
            if (this.enteredInput === '') { return this.books }
            var newFilteredList = this.books.filter(item => item.name.toLowerCase().includes(this.enteredInput.toLowerCase()))
            return newFilteredList
        }
    },

    methods: {
        closeDropDown() {
            this.enteredInput = ''
            this.$store.commit('HIDE_ADD_NEW_ITEM_WINDOW')
        },

        filterFromProducts() {
            var products = this.$store.getters['GET_PRODUCTS']
            var filteredProducts = []
            this.books.forEach(product => {
                products.forEach(element => {
                    if (element.name !== product.name) {
                        filteredProducts.push(product)
                    }
                });
            })

            console.log(`filteredProducts ${filteredProducts}`);

            return filteredProducts
        },

        itemsToAdd(allProducts, selectedGroceries) {
            // var storeProducts = this.$store.getters['GET_PRODUCTS']
            var newProductsToAdd = allProducts.filter(productItem => {
                return selectedGroceries.includes(productItem.name)
            })

            return newProductsToAdd
        },

        addToOrder() {
            if (this.checkedGroceries.length !== 0) {
                var newProductsToAdd = this.itemsToAdd(this.books, this.checkedGroceries)

                console.log(newProductsToAdd);
                this.$store.dispatch('ADD_PRODUCT', { productList: newProductsToAdd })

                this.$store.commit('HIDE_ADD_NEW_ITEM_WINDOW')
                this.enteredInput = ''
                this.checkedGroceries = []
                return;
            }

            alert(`👀 Nothing is selected`);

        },

        clearInput() {
            this.enteredInput = ''
        }
    }
}
</script>

<style scoped>
label {
    margin-left: 10px;
}
.fade-enter-from {
    transform: translateY(-600px);
}

.fade-enter-active {
    transition: all 0.5s ease-in-out;
}

.fade-leave-to {
    transform: translateY(-600px);
    opacity: 1;
}

.fade-leave-active {
    transition: all 0.5s ease-in-out;
}

.add-items-inputs {
    z-index: 50;
    height: 500px;
    width: 50%;
    top: 0;
    left: 25%;
    padding: 20px;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    position: absolute;
    background-color: whitesmoke;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}

.input-section {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
}
.input-section button {
    font-size: 12px;
}

.grocery-section {
    height: 300px;
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    text-align: left;
}

.grocery-list {
    flex: 1.5;
    height: 100%;
    width: 100%;
    padding: 20px;
    background-color: white;
}

.griceries-selected {
    flex: 1;
    height: 100%;
    width: 100%;
    padding: 20px;
    background-color: #fff5fd;
}

.center-button {
    width: 100%;
    padding: 10px 0;
}
</style>