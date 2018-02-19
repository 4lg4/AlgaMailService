<template>
    <div class="AppAlert alert alert-danger">
        <h4 class="alert-heading">
            {{theTitle}}

            <button type="button" class="close" @click="closeButton" v-if="close">
                <span>&times;</span>
            </button>
        </h4>
        <hr>
        <slot></slot>
    </div>
</template>


<script>
    export default {
        name: 'AppAlert',
        props: {
            theTitle: '',
            close: false
        },
        methods: {
            closeButton(){
                this.$emit('close');
            },
        }
    }
</script>

<style scoped>
    .AppAlert {
    }
</style>
