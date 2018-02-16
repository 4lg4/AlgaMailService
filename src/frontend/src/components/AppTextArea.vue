<template>
    <textarea class="form-control"></textarea>
</template>


<script>
    export default {
        name: 'AppTextArea',
        props: {
            title: 'Button'
        },
        data() {
            return {
            }
        },
        methods: {
            click(){
                this.$emit('click');
            }
        },
        mounted(){
//            console.log(this.props);
        }
    }
</script>

<style scoped>
    /*@import '../../css/root.css';*/

    .AppTextArea {

    }
</style>
