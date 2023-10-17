<template>
    <ion-page>
    <ion-header>
    <ion-toolbar>
    <ion-buttons slot="start">
    <ion-button fill="clear" @click="$router.push('/tabs/tab3')">
    <ion-icon slot="start" :icon="arrowBack"></ion-icon>
    </ion-button>
    </ion-buttons>
    <ion-title size="medium" style="color:#1C6033;margin-right:100px;">Add new user</ion-title>
    </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" >





    <form @submit.prevent="submit" v-if="status==false" style="padding:40px;">
    <div style="color:red;">
    {{ error }}
    </div>
    <div>
    <ion-input label="First name" label-placement="floating" fill="outline" placeholder="Enter first name" v-model="form.firstname"></ion-input>
    </div>
    <div>
    <ion-input label="Last name" label-placement="floating" fill="outline" placeholder="Enter last name" v-model="form.lastname"></ion-input>
    </div>

    <div>

    <ion-select aria-label="fruit" placeholder="--Select gender--" v-model="form.gender">
    <ion-select-option value="male">Male</ion-select-option>
    <ion-select-option value="female">Female</ion-select-option>
    </ion-select>

    </div>

    <div>

    <ion-select aria-label="fruit" placeholder="--Select role--" v-model="form.role">
    <ion-select-option value="owner">Farm owner</ion-select-option>
    <ion-select-option value="extension">Extension worker</ion-select-option>
    <ion-select-option value="vet">Veterinary doctor</ion-select-option>
    <!-- <ion-select-option value="">Extension wworker</ion-select-option> -->
    </ion-select>

    </div>

    <div>
    <ion-input type="number" label="Telephone number" label-placement="floating" fill="outline" placeholder="Enter telephone number" v-model="form.tel"></ion-input>
    </div>
    <div>
    <ion-input label="Email Address" label-placement="floating" fill="outline" placeholder="Enter email address" v-model="form.email"></ion-input>
    </div>

    <div style="margin-top:20px;margin-bottom:20px;">
    Password is the telephone number
    </div>

    <div>
    <ion-button color="success" expand="block" type="submit">Create account</ion-button>
    </div>
    </form>


<success-message :message="message" v-else>
<ion-button @click="$router.push('/tabs/tab3');status=false;">OK</ion-button>
</success-message>


    </ion-content>
    </ion-page>
    </template>

    <script>
    import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonAvatar, IonItem, IonLabel, IonList, IonIcon, IonNote, IonSpinner,
    IonButton, IonButtons,IonInput,IonSelect, IonSelectOption } from '@ionic/vue';
    import { arrowBack } from 'ionicons/icons';
    import database from '@/models/database';
import SuccessMessage from '@/shared/SuccessMessage.vue';
    export default{
    components:{
    IonPage, IonHeader, IonToolbar, IonTitle, IonContent,IonAvatar, IonItem, IonLabel, IonList, IonIcon,IonNote,IonSpinner,
    IonButton, IonButtons,IonInput,IonSelect, IonSelectOption,
    SuccessMessage
    },
    data(){return{
    message:null,
    error:null,
    status:false,
    is_loading:false,
    form:{
    firstname:'',
    lastname:'',
    gender:'',
    email:'',
    pass:'',
    role:''
    }

    }},


    methods:{
    submit(){
    if(this.form.firstname!='' && this.form.lastname!='' && this.form.gender && this.form.tel!='' && this.form.email!='' && this.form.role!=''){
    this.error=null;
    const data=database();
    data.from('users').insert({firstname:this.form.firstname,
    lastname:this.form.lastname,
    gender:this.form.gender,
    tel:this.form.tel,
    email:this.form.email,
    role:this.form.role
    }).then(res=>{
    this.status=true;
    this.message='User has been added.';
    }).catch(errors=>{console.log(errors);});

    }else{
    this.error='Fill in all fields.';
    }
    }

    },

    setup() {
    return { arrowBack};
    }


    }





    </script>
