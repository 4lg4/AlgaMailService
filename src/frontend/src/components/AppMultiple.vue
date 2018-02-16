<template>
    <div class="AppMultiple">
        {{collection}}
        <div v-for="item,k in collection" :key="item.id">
            <AppInput @change="change" :id="item.id" :error="item.error" class="mb-1" :key="item.id">
                <div slot="append">
                    <AppButton type="danger" theTitle="-" @click="remove(item.id)"
                               v-if="(Object.keys(collection).length > 1)"
                               class="no-left-border"></AppButton>
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
                collection: {}
            }
        },
        created(){
            this.add();
        },
        methods: {
            add(){
                const id = new Date().getTime();
                this.$set(this.collection, id, {
                    id,
                    value: ''
                });
            },

            remove(id){
                this.$delete(this.collection, id);
            },

            change(value,id){
                // TODO: refactor this code by removing from here and making this component more generic
                let error = this.collection[id].error || {};
                if(value && !this._isEmail(value.trim())) {
                    error['invalid'] = {
                        id: 'invalid',
                        type: 'danger',
                        message: 'Invalid email address'
                    };
                } else {
                    delete error['invalid'];
                }

                this.$set(this.collection, id, {
                    id,
                    value,
                    error
                });


                this.checkDuplications({
                    id,
                    value
                });
            },

            checkDuplications(data) {
                const {id,value} = data;

                for(let k in this.collection){
                    const item = this.collection[k] || {};
                    let error = item.error;
                    delete error['duplicated'];
                    if(item.id !== id) {
                        if(item.value === value) {
                            error['duplicated'] = {
                                id: 'duplicated',
                                type: 'danger',
                                message: 'Duplicated'
                            };
                        }
                    }
                }
            },

            // TODO: refactor this code by removing from here and making this component more generic
            _isEmail(email){
                if(!email) {
                    return false;
                }

                return !!(email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/));
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

    .no-left-border {
        border-left: none;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
    }
</style>
