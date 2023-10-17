<template>
<ion-page>
<ion-content :fullscreen="true" class="ion-padding">
<div style="text-align:center;margin-top:50px;">
<ion-icon :icon="logoIonic" size="large"></ion-icon>
</div>
<h1 style="text-align:center;">FARM CARE</h1>
<h6 style="text-align:center;">Create ne account</h6>


<ion-card style="border:solid thin green; margin-top:50px;">
<ion-card-header>
<ion-card-subtitle v-if="error!=null" style="color:red;">{{ error }} </ion-card-subtitle>
</ion-card-header>

<ion-card-content style="padding:30px;">


<form @submit.prevent="submit">
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
<ion-input type="number" label="Telephone number" label-placement="floating" fill="outline" placeholder="Enter telephone number" v-model="form.tel"></ion-input>
</div>
<div>
<ion-input label="Email Address" label-placement="floating" fill="outline" placeholder="Enter email address" v-model="form.email"></ion-input>
</div>

<div>
<ion-input type="password" label="Password" label-placement="floating" fill="outline" placeholder="Enter password" v-model="form.pass"></ion-input>
</div>

<div>
<ion-button color="success" expand="block" type="submit">Register</ion-button>
</div>
</form>
</ion-card-content>
</ion-card>





</ion-content>
</ion-page>
</template>
<script>
import { logoIonic } from 'ionicons/icons';
import { IonPage, IonContent,IonIcon,IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle,IonInput,IonButton,IonSelect, IonSelectOption } from '@ionic/vue';
import database from '@/models/database';
export default{
components:{
IonPage, IonContent,IonIcon,IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle,IonInput,IonButton,IonSelect, IonSelectOption
},
setup() {
return { logoIonic };
},
data(){return{
error:null,
form:{
firstname:'',
lastname:'',
gender:'',
tel:'',
email:'',
pass:'',

}


}},
methods:{
submit(){
if(this.form.firstname!='' && this.form.lastname!='' && this.form.gender && this.form.tel!='' && this.form.email!='' && this.form.pass!=''){
this.error=null;
const data=database();
data.auth.signUp(
{
email:this.form.email,
password: this.form.pass,
options: {
data: {
firstname:this.form.firstname,
lastname:this.form.lastname,
gender:this.form.gender,
tel:this.form.tel,
role:'admin',
}
}
}
).then(response=>{

}).catch(error=>{this.error='Check your internet connection please.'});

}else{
this.error='Fill in all fields.';
}
}



}




}
</script>
