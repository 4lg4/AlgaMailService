<template>
    <div class="AppInput">
        <div class="input-group input-group-lg">
            <div class="input-group-prepend">
                <span class="input-group-text"><strong>@</strong></span>
            </div>
            <input
                @keyup="change"
                type="text" class="form-control"
                placeholder="" aria-label="">

            <!--<slot name="append" class="input-group-append"></slot>-->
        </div>

        <div v-if="error" class="alert alert-danger m-0" role="alert">
            <div v-for="e,k in error">
                <small>{{e.message}}</small>
            </div>
        </div>
    </div>
</template>


<script>
    export default {
        name: 'AppInput',
        props: {
            title: 'Button',
            value: '',
            id: '',
            error: {}
        },
        methods: {
            change(e){
                this.$emit('change',e.target.value, this.id);
            }
        }
    }
</script>

<style scoped>
    .AppInput {

    }

    .alert {
        border-top: none;
        border-top-left-radius: 0;
        border-top-right-radius: 0;

        /*width: 80%;*/
        /*margin: auto;*/
    }

    .display {
        display: none;
    }
</style>
