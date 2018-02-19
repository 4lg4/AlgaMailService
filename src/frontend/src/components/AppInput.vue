<template>
    <div class="AppInput" :class="{ error: errors && errors.length > 0 }">
        <div class="input-group input-group-lg">
            <div class="input-group-prepend">
                <span class="input-group-text">{{icon}}</span>
            </div>
            <input
                @keyup="change"
                type="text" class="form-control"
                placeholder="" aria-label="">

            <div class="input-group-append" v-if="removeButton">
                <AppButton type="danger" theTitle="-" @click="remove" class="AppInput__remove-button"></AppButton>
            </div>
        </div>

        <div v-if="errors && errors.length > 0" class="alert alert-danger m-0" role="alert">
            <div v-for="e,k in errors">
                <small>{{e.message}}</small>
            </div>
        </div>
    </div>
</template>


<script>
    import AppButton from './AppButton.vue'

    export default {
        name: 'AppInput',
        props: {
            id: '',
            errors: false,
            icon: '', // TODO: implement icon usage
            removeButton: false
        },
        data(){
            return {
                value: ''
            }
        },
        components: {
            AppButton
        },
        methods: {
            change(e){
                this.$emit('change',e.target.value, this.id);
            },
            remove(){
                this.$emit('remove', this.id);
            }
        }

    }
</script>

<style scoped>
    .AppInput {

    }

    .AppInput.error .input-group-text {
        border-bottom-left-radius: 0;
    }

    .AppInput.error .AppInput__remove-button {
        border-bottom-right-radius: 0;
    }

    .alert {
        /*border-top: none;*/
        border-top-left-radius: 0;
        border-top-right-radius: 0;
        width: 100%;
        margin-left: auto !important;
        margin-right: auto !important;
        padding-top: 0;
        padding-bottom: 2px;
        border: none;
        box-shadow: none;

        /*width: 80%;*/
        /*margin: auto;*/
    }
</style>
