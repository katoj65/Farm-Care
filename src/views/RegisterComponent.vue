<template>
<div>
<form @submit.prevent="submit" v-if="status==false">
<div style="color:red;">
{{ error }}
</div>
<div>
<ion-input label="First name" label-placement="floating" fill="solid" placeholder="Enter first name" v-model="form.firstname"></ion-input>
</div>
<div>
<ion-input label="Last name" label-placement="floating" fill="solid" placeholder="Enter last name" v-model="form.lastname"></ion-input>
</div>

<div>

<ion-select aria-label="fruit" placeholder="--Select gender--" v-model="form.gender">
<ion-select-option value="male">Male</ion-select-option>
<ion-select-option value="female">Female</ion-select-option>
</ion-select>

</div>

<div>
<ion-input type="number" label="Telephone number" label-placement="floating" fill="solid" placeholder="Enter telephone number" v-model="form.tel"></ion-input>
</div>
<div>
<ion-input label="Email Address" label-placement="floating" fill="solid" placeholder="Enter email address" v-model="form.email"></ion-input>
</div>

<div>
<ion-input type="password" label="Password" label-placement="floating" fill="solid" placeholder="Enter password" v-model="form.pass"></ion-input>
</div>

<div>
<ion-button color="success" expand="block" type="submit">Register</ion-button>
</div>
</form>
<success-message v-else :message="'Registered Successfully. Verification link has been sent to your email.'"/>
</div>
</template>

<script>
import { logoIonic } from 'ionicons/icons';
import {IonInput,IonButton,IonSelect, IonSelectOption } from '@ionic/vue';
import database from '@/models/database';
import SuccessMessage from '@/shared/SuccessMessage.vue';
export default{
components:{IonInput,IonButton,IonSelect, IonSelectOption,
SuccessMessage
},
props:{
screen:{}
},
setup() {
return { logoIonic };
},
data(){return{
status:false,
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
},
emailRedirectTo:'https://docs.google.com/document/d/1OxkLSLd00LnaYSJ63eFtC7QGYL4MdRsotAOltwfZPUA/edit?usp=sharing'
}
}
).then(response=>{
console.log(response);
this.status=true;
}).catch(error=>{this.error='Check your internet connection please.'});
}else{
this.error='Fill in all fields.';
}
}

}




}
</script>
