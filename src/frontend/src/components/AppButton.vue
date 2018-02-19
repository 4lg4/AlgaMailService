<template>
    <button class="AppButton btn btn-lg"
            :class="{
                'btn-success': (!isDisabled && type === 'success'),
                'btn-primary': (!isDisabled && !type),
                'btn-danger': (!isDisabled && type === 'danger'),
                'btn-dark': (isDisabled)
            }"
            @click="click"
            :disabled="isDisabled"
    >
        {{ theTitle }}
    </button>
</template>


<script>
    export default {
        name: 'AppButton',
        props: {
            type: '',
            theTitle: '',
            isDisabled: false,
            size: 'lg' // TODO: implement the button size using props
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
