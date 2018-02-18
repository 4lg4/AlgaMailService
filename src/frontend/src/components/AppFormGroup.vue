<template>
    <div class="AppFormGroup form-group">
        <label><strong>{{theTitle}}</strong></label>
        <slot></slot>
    </div>
</template>


<script>
    export default {
        name: 'AppFormGroup',
        props: {
            theTitle: ''
        }
    }
</script>

<style scoped>
    .AppFormGroup {

    }
</style>
