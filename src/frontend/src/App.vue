<template>
    <div id="app">

        <div class="App__brand container mb-3 mt-2">
            <h1 class="App__brand__title display-4">Alga Mail Service</h1>
            <!-- TODO: add assets loader -->
            <div class="App__brand__logo">
                <svg class="App__brand__logo__image" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 24 30" style="enable-background:new 0 0 24 24;" xml:space="preserve"><g><path d="M23.969,1.346c-0.006-0.017-0.008-0.032-0.015-0.048c-0.03-0.065-0.069-0.126-0.127-0.176   c-0.008-0.007-0.018-0.009-0.026-0.015c-0.005-0.004-0.006-0.01-0.011-0.013c-0.01-0.007-0.022-0.005-0.032-0.011   c-0.064-0.039-0.132-0.062-0.204-0.07c-0.014-0.001-0.027-0.006-0.041-0.006c-0.083-0.002-0.164,0.018-0.239,0.058   c-0.007,0.003-0.014,0.001-0.021,0.005l-19,11c-0.17,0.099-0.267,0.288-0.246,0.483c0.02,0.196,0.152,0.361,0.339,0.423   l5.763,1.921l1.921,5.763c0.004,0.011,0.015,0.016,0.019,0.026c0.033,0.082,0.08,0.159,0.155,0.215   c0.001,0.001,0.003,0,0.005,0.002c0.084,0.062,0.186,0.099,0.295,0.099c0.01,0,0.021,0,0.031-0.001   c0.013-0.001,0.022-0.012,0.035-0.014c0.08-0.011,0.153-0.042,0.22-0.091c0.023-0.017,0.043-0.031,0.063-0.052   c0.016-0.016,0.037-0.024,0.051-0.042l2.22-2.96l0,0l0.618-0.824l4.565,1.943c0.063,0.027,0.131,0.041,0.197,0.041   c0.004,0,0.007-0.003,0.01-0.003c0.079-0.001,0.157-0.019,0.227-0.057c0.135-0.073,0.229-0.203,0.255-0.353l3-17   c0.002-0.01-0.004-0.019-0.003-0.029C24.001,1.488,23.993,1.416,23.969,1.346z M19.586,6.129l-6.489,9.084   c-0.042,0.058-0.067,0.122-0.081,0.188c0,0.001-0.002,0.003-0.002,0.004l-0.631,3.154l-1.307-3.921L19.586,6.129z M13.426,18.44   l0.443-2.217l0.924,0.393L13.426,18.44z"/><path d="M0.857,18.149c-0.195-0.194-0.512-0.195-0.707,0.001c-0.195,0.195-0.195,0.512,0,0.707   c0.242,0.242,0.487,0.478,0.736,0.707c0.097,0.088,0.218,0.132,0.339,0.132c0.135,0,0.27-0.054,0.368-0.162   c0.187-0.203,0.174-0.52-0.029-0.707C1.325,18.608,1.09,18.381,0.857,18.149z"/><path d="M8.268,21.989l-0.225,0.004c-0.002,0-0.004,0-0.006,0c-0.405,0-0.821-0.043-1.237-0.128   c-0.268-0.053-0.535,0.118-0.591,0.39c-0.055,0.271,0.119,0.535,0.39,0.59c0.482,0.099,0.967,0.149,1.438,0.149   c0.002,0,0.005,0,0.007,0l0.261-0.005c0.275-0.01,0.491-0.242,0.481-0.518S8.594,21.971,8.268,21.989z"/><path d="M4.685,21.092c-0.429-0.222-0.869-0.49-1.31-0.797c-0.225-0.157-0.537-0.103-0.695,0.125   c-0.158,0.227-0.103,0.539,0.125,0.696c0.476,0.331,0.953,0.621,1.419,0.863c0.074,0.038,0.152,0.056,0.23,0.056   c0.181,0,0.354-0.098,0.443-0.27C5.026,21.521,4.931,21.22,4.685,21.092z"/><path d="M11.25,21.073c-0.279,0.165-0.56,0.306-0.837,0.424c-0.254,0.109-0.372,0.403-0.264,0.657   c0.081,0.189,0.266,0.303,0.46,0.303c0.065,0,0.133-0.013,0.196-0.04c0.323-0.138,0.644-0.301,0.952-0.483   c0.238-0.14,0.317-0.447,0.177-0.685C11.793,21.011,11.487,20.933,11.25,21.073z"/></g></svg>
            </div>
        </div>

        <div class="container">
            <AppCard theTitle="New Email">
                <div slot="body">

                    <AppAlert v-if="emailGetMessages.message" :type="emailGetMessages.status">{{emailGetMessages.message}}</AppAlert>

                    <div class="row">
                        <div class="col-sm-12 col-md-6">
                            <AppFormGroup theTitle="To:">
                                <AppMultiple :collection="to" @change="emailUpdateTo" @add="emailAddTo" @remove="emailRemoveTo" ref="AppMultipleTo"></AppMultiple>
                            </AppFormGroup>
                        </div>
                        <div class="col-sm-12 col-md-6">
                            <AppFormGroup theTitle="CC:">
                                <AppMultiple :collection="cc" @change="emailUpdateCc" @add="emailAddCc" @remove="emailRemoveCc" ref="AppMultipleCc"></AppMultiple>
                            </AppFormGroup>
                        </div>
                    </div>

                    <hr>
                    <div class="row">
                        <div class="col-sm-12">
                            <AppFormGroup theTitle="Subject">
                                <AppInput icon="Text" @change="emailUpdateSubject"></AppInput>
                            </AppFormGroup>
                        </div>
                    </div>

                    <hr>
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="btn-group">
                                <button type="button" class="btn btn-primary" :class="{ active: (!isHtmlEmail) }" @click="setIsHtmlEmail(false)">Text</button>
                                <button type="button" class="btn btn-primary" :class="{ active: (isHtmlEmail) }" @click="setIsHtmlEmail(true)">Html</button>
                            </div>
                        </div>

                        <div class="col-sm-12" :class="{'d-none': isHtmlEmail}">
                            <AppFormGroup>
                                <AppTextArea @change="emailUpdateText" placeholder="my pure text" :val="getEmailText"></AppTextArea>
                            </AppFormGroup>
                        </div>

                        <div class="col-sm-12" :class="{'d-none': !isHtmlEmail}">
                            <AppFormGroup>
                                <AppTextArea @change="emailUpdateHtml" placeholder="<div style='color:red;'>my html</div>" :val="getEmailHtml"></AppTextArea>
                            </AppFormGroup>
                        </div>
                    </div>
                </div>
                <div slot="footer">
                    <AppButton theTitle="Submit" type="success" @click="submit" :isDisabled="emailIsInvalid"></AppButton>
                </div>
            </AppCard>
        </div>

    </div>
</template>

<script>
    import bootstrap from 'bootstrap/dist/css/bootstrap.min.css'

    import { mapActions, mapGetters } from 'vuex'
    import EventBus from '@/EventBus'

    import AppButton from './components/AppButton.vue'
    import AppInput from './components/AppInput.vue'
    import AppTextArea from './components/AppTextArea.vue'
    import AppMultiple from './components/AppMultiple.vue'
    import AppFormGroup from './components/AppFormGroup.vue'
    import AppCard from './components/AppCard.vue'
    import AppAlert from './components/AppAlert.vue'

    export default {
        name: 'App',
        components: {
            AppButton,
            AppTextArea,
            AppInput,
            AppMultiple,
            AppFormGroup,
            AppCard,
            AppAlert
        },
        data(){
            return {
                isHtmlEmail: false,
                globalMessages: ''
            }
        },
        computed: {
            ...mapGetters([
                'to','cc', 'getEmail', 'emailIsInvalid', 'getEmailText',
                'getEmailHtml', 'emailGetMessages'
            ])
        },
        methods: {
            ...mapActions([
                'emailAddTo', 'emailUpdateTo', 'emailRemoveTo', 'emailAddCc',
                'emailUpdateCc', 'emailRemoveCc', 'emailUpdateSubject',
                'emailUpdateText', 'emailUpdateHtml', 'emailSend'
            ]),
            setIsHtmlEmail(value){
                this.isHtmlEmail = value;
            },
            submit() {
//                const dev = { "to": "akgleal@gmail.com", "cc": "adriano@workit.rocks, paula.karolineceron@gmail.com", "bcc": "", "subject": "subject", "text": "text pure", "html": "<div>My crazy HTML</div>" }
//                this.emailSend(dev);
                this.emailSend(this.getEmail);
            }
        }

    }
</script>

<style>
    * {
        outline: none;
        box-sizing: border-box;
    }

    /* remove bootstrap outline glow */
    *:focus {
        outline: none !important;
        box-shadow: none !important;
    }

    .App__brand {
        text-align: center;
    }
    .App__brand__logo {
        display: inline-block;
    }
    .App__brand__logo__image {
        height: 60px;
    }
    .App__brand__title {
        display: inline-block;
    }
</style>
