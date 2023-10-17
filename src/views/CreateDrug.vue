<template>
<ion-page>
<ion-header>
<ion-toolbar>
<ion-buttons slot="start">
<ion-button fill="clear" @click="$router.push('/drugs')">
<ion-icon slot="start" :icon="arrowBack"></ion-icon>
</ion-button>
</ion-buttons>
<ion-title size="medium" style="color:#1C6033;margin-right:100px;">Add drug record</ion-title>
</ion-toolbar>
</ion-header>
<ion-content :fullscreen="true" >





<form @submit.prevent="submit" v-if="status==false" style="padding:40px;">
<div style="color:red;" v-if="error!=null">
{{ error }}
</div>
<div>
<ion-label>Name of medicine/ drug:</ion-label>
<ion-input  fill="outline" placeholder="Enter name" v-model="form.name" class="input"></ion-input>
</div>
<div>
<ion-label>Description:</ion-label>
<ion-input fill="outline" placeholder="Enter description" v-model="form.description" class="input"></ion-input>
</div>


<div>
    <ion-label>Quantity:</ion-label>
<ion-input type="number"  fill="outline" placeholder="Enter quantity" v-model="form.qtty" class="input"></ion-input>
</div>

<div>
<ion-label>Manufacture date:</ion-label>
<ion-input type="date"  fill="outline" placeholder="Enter manufacture date" v-model="form.man_date" class="input"></ion-input>
</div>

<div>
<ion-label>Expiry date:</ion-label>
<ion-input type="date"  fill="outline" placeholder="Enter expiry date" v-model="form.exp_date" class="input"></ion-input>
</div>







<div style="margin-top:20px;">
<ion-button color="success" expand="block" type="submit">Save</ion-button>
</div>
</form>


<success-message :message="message" v-else>
<ion-button @click="$router.push('/drugs');status=false;">OK</ion-button>
</success-message>


</ion-content>
</ion-page>
</template>

<script>
import database from '@/models/database';
import SuccessMessage from '@/shared/SuccessMessage.vue';
import {
IonAvatar,
IonButton, IonButtons,
IonContent,
IonHeader,
IonIcon,
IonInput,
IonItem, IonLabel, IonList,
IonNote,
IonPage,
IonSelect, IonSelectOption,
IonSpinner,
IonTitle,
IonToolbar,
IonDatetime

} from '@ionic/vue';
import { arrowBack } from 'ionicons/icons';
export default{
components:{
IonPage, IonHeader, IonToolbar, IonTitle, IonContent,IonAvatar, IonItem, IonLabel, IonList, IonIcon,IonNote,IonSpinner,
IonButton, IonButtons,IonInput,IonSelect, IonSelectOption,
SuccessMessage,IonDatetime
},
data(){return{
message:null,
error:null,
status:false,
is_loading:false,
form:{
name:'',
description:'',
exp_date:'',
man_date:'',
qtty:'',
user_id:this.$store.state.id,
}

}},


methods:{
submit(){
if(this.form.name!=''&&
this.form.qtty!='' &&
this.form.description!='' &&
this.form.man_date!='' &&
this.form.exp_date!=''){

this.error=null;
const data=database();
data.from('drug').insert({

name:this.form.name,
quantity:this.form.qtty,
user_id:this.form.user_id,
description:this.form.description,
manufacture_date:this.form.man_date,
expiry_date:this.form.exp_date

}).then(res=>{
console.log(res);
if(res.status==201){
this.status=true;
this.message='Drug record has been added.';
}else{
this.error=res.error;
}

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
