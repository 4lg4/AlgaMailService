<template>
    <div class="AppMultiple">
        <div v-for="item,k in collection" :key="item.id">
            <AppInput @change="change" @remove="remove"
                      class="mb-1" icon="@"
                      :id="item.id" :key="item.id"
                      :errors="item.errors"
                      :removeButton="(Object.keys(collection).length > 1)"></AppInput>
        </div>
        <div class="text-right">
            <AppButton theTitle="+ add new item" @click="add" class="mt-2 btn-sm"></AppButton>
        </div>
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
            isUnique: true,
            collection: {}
        },
        created(){
            this.add();
        },
        methods: {
            add(){
                this.$emit('add');
            },

            remove(id){
                this.$emit('remove',id);
            },

            change(value,id){
                this.$emit('change', {
                    id,
                    value
                });
            }
        }
    }
</script>

<style scoped>
    .AppMultiple {

    }
</style>
