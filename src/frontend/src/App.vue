<template>
    <div id="app">
        <img src="./assets/logo.png">

        <div class="row">
            <div class="col-sm-12 col-md-6">
                <AppFormGroup theTitle="To:">
                    <AppMultiple ref="AppMultipleTo"></AppMultiple>
                </AppFormGroup>
            </div>
            <div class="col-sm-12 col-md-6">
                <AppFormGroup theTitle="CC:">
                    <AppMultiple ref="AppMultipleCC"></AppMultiple>
                </AppFormGroup>
            </div>
        </div>

        <hr>
        <div class="row">
            <div class="col-sm-12 col-md-6">
                <AppFormGroup theTitle="Text body">
                    <AppTextArea></AppTextArea>
                </AppFormGroup>
            </div>
            <div class="col-sm-12 col-md-6">
                <AppFormGroup theTitle="Html body">
                    <AppTextArea></AppTextArea>
                </AppFormGroup>
            </div>
        </div>

        <hr>
        <div class="row">
            <div class="col-sm-12">
                <AppButton theTitle="Submit" type="success" ></AppButton>
            </div>
        </div>

    </div>
</template>

<script>
    import bootstrap from 'bootstrap/dist/css/bootstrap.min.css'
    import AppButton from './components/AppButton.vue'
    import AppInput from './components/AppInput.vue'
    import AppTextArea from './components/AppTextArea.vue'
    import AppMultiple from './components/AppMultiple.vue'
    import AppFormGroup from './components/AppFormGroup.vue'

    export default {
        name: 'app',
        components: {
            AppButton,
            AppTextArea,
            AppInput,
            AppMultiple,
            AppFormGroup
        },
        data() {
            return {
            }
        },
        mounted(){
//            this.$refs.AppMultipleTo.add();
//            this.addCC();
        },
        methods: {
//            addTo(){
//                this.to.push({
//                    id: new Date().getTime(),
//                    email: defaults.emailTo
//                });
//            },
//            changeTo(val){
//                console.log('changeTo', val);
//            },
//            removeTo(id){
////                console.log(id);
////                console.log(this.to);
//                this.to.filter((c)=>{
//                    console.log(id, c.id, (c.id !== id));
////                    (c.id !== id)
//                });
////                this.to = this.to.map((c)=>{ if(c.id !== id){ return c; } });
//            },
//
//            addCC(){
//                this.cc.push({
//                    id: new Date().getTime(),
//                    email: defaults.emailCC
//                });
//            },
//            changeCC(){
//                this.to.push({
//                    id: new Date().getTime(),
//                    email: defaults.emailTo
//                });
//            },
//            removeCC(id){
//                this.cc = this.cc.filter((c)=>(c.id !== id));
//            }
        },
        update(){
            console.log(this.to);
            console.log(this.cc);
        }
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
