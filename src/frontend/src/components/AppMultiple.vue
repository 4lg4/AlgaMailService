<template>
    <div class="AppMultiple">
        <div v-for="item,k in collection" :key="item.id">
            <AppInput @change="change" :id="item.id" :error="item.error" class="mb-1">
                <div slot="append">
                    <AppButton type="danger" theTitle="-" @click="remove(item.id)" v-if="(collection.length > 1)"></AppButton>
                </div>
            </AppInput>
        </div>
        <AppButton theTitle="+ add new item" @click="add" class="full mt-2"></AppButton>
    </div>
</template>


<script>
    import AppButton from './AppButton.vue'
    import AppInput from './AppInput.vue'

    export default {
        name: 'AppMultiple',
        components: {
            AppButton,
            AppInput
        },
        props: {
            type: '',
            thetitle: '',
            id: '',
            isUnique: true
        },
        data() {
            return {
                collection: []
            }
        },
        created(){
            this.add();
        },
        methods: {
            add(){
                this.collection.push({
                    id: new Date().getTime(),
                    value: ''
                });
            },
            remove(id){
                this.collection = this.collection.filter((c)=>{
                    return (c.id !== id);
                });
            },
            change(value,id){
                this.collection = this.collection.map((c)=>{
                    if(c.id === id){
                        c.value = value;
                    }

                    // TODO: refactor this code by removing from here and making this component more generic
                    if(c.value && !this._isEmail(c.value.trim())) {
                        c.error = 'Invalid email address';
                    } else if((c.value && value) && c.value === value && c.id !== id){
                        c.error = 'Duplicated';
                    } else {
                        c.error = null;
                    }

                    return c;
                });
            },

            // TODO: refactor this code by removing from here and making this component more generic
            _isEmail(email){
                if(!email) {
                    return false;
                }

                return (email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/));
            },

            value(){
                return this.collection;
            }
        }
    }
</script>

<style scoped>
    .AppMultiple {

    }

    .full {
        width: 100%;
    }
</style>
