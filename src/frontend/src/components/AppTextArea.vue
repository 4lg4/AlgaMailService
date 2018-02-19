<template>
    <textarea class="AppTextArea form-control" @keyup="change">{{val}}</textarea>
</template>


<script>
    export default {
        name: 'AppTextArea',
        props: {
            title: 'Button',
            val: ''
        },
        data() {
            return {
            }
        },
        methods: {
            change(e){
                this.$emit('change',e.target.value);
            },
        }
    }
</script>

<style scoped>
    /*@import '../../css/root.css';*/

    .AppTextArea {
        min-height: 150px;
    }
</style>
