<template>
    <div class="AppAlert alert alert-danger">
        <h4 class="alert-heading">
            {{theTitle}}

            <button type="button" class="close" @click="close">
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
            theTitle: ''
        },
        methods: {
            close(){
                this.$emit('close');
            },
        }
    }
</script>

<style scoped>
    .AppAlert {
    }
</style>
