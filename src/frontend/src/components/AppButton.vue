<template>
    <button class="AppButton btn btn-lg"
            :class="{
                'btn-success': (type === 'success'),
                'btn-primary': (!type),
                'btn-danger': (type === 'danger')
            }"
            @click="click">
        {{ theTitle }}
    </button>
</template>


<script>
    export default {
        name: 'AppButton',
        props: {
            type: '',
            theTitle: ''
        },
        methods: {
            click(){
                this.$emit('click');
            }
        }
    }
</script>

<style scoped>
    .AppButton {

    }
</style>
