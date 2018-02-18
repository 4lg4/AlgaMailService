<template>
    <div class="AppCard card">
        <div class="card-header">
            <h4>{{theTitle}}</h4>
        </div>
        <div class="card-body">
            <slot name="body"></slot>
        </div>
        <div class="card-footer text-right">
            <slot name="footer"></slot>
        </div>
    </div>
</template>


<script>
    export default {
        name: 'AppCard',
        props: {
            theTitle: ''
        },
        data() {
            return {
            }
        },
        methods: {
            click(){
                this.$emit('click');
            }
        }
    }
</script>

<style scoped>
    .AppCard {

    }

</style>
