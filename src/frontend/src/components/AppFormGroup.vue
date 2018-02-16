<template>
    <div class="form-group">
        <label>{{theTitle}}</label>
        <slot></slot>
        <!--<input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">-->
        <!--<small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>-->
    </div>
</template>


<script>
    export default {
        name: 'AppFormGroup',
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
    .AppFormGroup {

    }
</style>
