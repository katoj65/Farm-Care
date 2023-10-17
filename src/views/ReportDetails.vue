<template>
<ion-page>
<ion-header>
<ion-toolbar>
<ion-buttons slot="start">
<ion-button fill="clear" @click="$router.push('/health/report')">
<ion-icon slot="start" :icon="arrowBack"></ion-icon>
</ion-button>
</ion-buttons>

<ion-buttons slot="end">
<ion-button fill="clear" @click="show=true">
+ Comment
</ion-button>
</ion-buttons>
<ion-title size="medium" style="color:#1C6033;margin-right:100px;"></ion-title>
</ion-toolbar>
</ion-header>
<ion-content :fullscreen="true" >
<div v-if="is_loading==false">

<div v-if="report!=null">
<ion-card style="box-shadow:none;margin:0;padding:0;border-radius:0;">
<ion-card-header>
<ion-card-title style="text-transform:capitalize;">
{{ report.title }}
</ion-card-title>
<ion-card-subtitle style="color:green;">
{{ report.created_at.substring(0,10) }}
</ion-card-subtitle>
</ion-card-header>
<ion-card-content>
<p>
{{ report.description }}
</p>
<p style="color:black;margin-top:10px;text-transform:capitalize;">
<ion-icon :icon="person"></ion-icon>
{{ report.users.firstname }} . {{ report.users.tel }} . {{ report.users.role }}
</p>
</ion-card-content>
</ion-card>



<div v-if="is_loading2=true">
<div v-if="comments.length>0">
<ion-card style=" margin:0;box-shadow:none;padding:10px;border-radius:0;" v-for="(c,key) in comments" :key="key">
<ion-card-content style="border-bottom:solid thin #F4F6F6;padding:0;">
<div>
<h4 style="fon-weight:bold;color:black;font-size:15px;text-transform:capitalize;">{{ c.title }} </h4>
<p>
{{ c.comment }}
</p>
<div>
<div style="color:green;font-size:13px;">{{ c.created_at.substring(0,10).split('-').reverse().join('/') }}</div>
<div>
<vet-recommendation-button :id="c.id"/>
</div>
<div v-if="c.report_comment.length>0">
<div style="font-weight:bold;margin-bottom:5px;font-size:13px;"></div>
<p v-for="(cr,key) in c.report_comment" :key="key" style="background:#F4F6F6;padding:10px;">
<ion-icon :icon="chatboxEllipsesOutline"></ion-icon><strong> Venterinary advise. </strong>
{{ cr.comment}}
<div style="color:green;">{{ cr.created_at.substring(0,10).split('-').reverse().join('/') }} </div>
</p>

</div>
</div>
</div>
</ion-card-content>
</ion-card>
</div>
</div>
<div v-else>
<loader-component/>
</div>
</div>
<div style="text-align:center;padding:20px;" v-else>
 Report details cannot be found.
</div>
</div>
<div v-else style="padding:20px; text-align:center;">
<loader-component />
</div>
</ion-content>

<div style="" v-if="status!=null">
<success-message :message="''">
</success-message>
</div>












<!-------form----------->
<div style="height:80%;border-radius:10px 10px 0 0;border:solid thin silver;position:fixed;bottom:0;background:white;width:100%;
box-shadow: 10px 10px 10px 10px;" v-if="show==true">
<div style="padding:15px;">
<span style="font-weight:bold;">Add report comment</span>
<span style="float:right;">
<ion-button size="small" fill="clear" @click="show=false">
Cancel
</ion-button>
</span>
</div>
<div style="padding:10px;">
<form @submit.prevent="submit" style="padding:10px;">
<div v-if="error!=null" style="color:red;padding-bottom:10px;text-align:center;">{{ error }} </div>
<div>
<ion-label>Title:</ion-label>
<ion-input placeholder="Enter title" v-model="form.title" class="input" style="border:solid thin silver;"></ion-input>
</div>
<div>
<ion-label>Comment:</ion-label>
<ion-textarea placeholder="Enter comment" v-model="form.comment" class="input" style="border:solid thin silver;"></ion-textarea>
</div>
<div style="margin:10px;">
<ion-button size="medium"  fill="outline" type="submit" style="width:100%">
Save
</ion-button>
</div>
</form>
</div>
</div>
</ion-page>
</template>
<script>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonAvatar, IonItem, IonLabel, IonList, IonIcon, IonNote, IonSpinner,
IonButton, IonButtons,IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonThumbnail,IonInput, IonTextarea } from '@ionic/vue';
import { arrowBack, person,chatboxEllipsesOutline } from 'ionicons/icons';
import database from '@/models/database';
import SuccessMessage from '@/shared/SuccessMessage.vue';
import LoaderComponent from '@/components/LoaderComponent.vue';
import VetRecommendationButton from '@/components/VetRecommendationButton.vue';


export default{
components:{
IonPage, IonHeader, IonToolbar, IonTitle, IonContent,IonAvatar, IonItem, IonLabel, IonList, IonIcon,IonNote,IonSpinner,
IonButton, IonButtons,IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle,LoaderComponent,IonThumbnail,IonInput,IonTextarea,
SuccessMessage,VetRecommendationButton


},
data(){return{
is_loading2:false,
comments:[],
error:null,
status:null,
show:false,
is_loading:false,
report:null,
form:{
title:'',
comment:'',
rid:this.$route.params.id,
}

}},


methods:{
async get_report(){
this.is_loading=true;
const data=database();
await data.from('report').select('id,created_at,title,description, users(firstname,tel,role)').match({id:this.$route.params.id}).then(response=>{
// console.log(response);
this.is_loading=false;
if(response.status==200){
response.data.forEach(el=>{
this.report=el;
});

//get comments
this.is_loading2=true;
data.from('report_content').select(
'id,title,comment,report_id,created_at,report_comment(comment,created_at)'

).match({report_id:this.$route.params.id})
.order('id',{ascending:false})
.then(re=>{
this.is_loading2=false;
if(re.status==200){
this.comments=re.data;
}else{
this.comments=[];
}

}).catch(err=>{console.log(err)});
//

}else{
this.report=null;
}

}).catch(error=>{console.log(error)});
},

submit(){
if(this.form.title!='' && this.form.comment!=''){
this.error=null;
const data=database();
data.from('report_content').insert({report_id:this.form.rid,title:this.form.title,comment:this.form.comment}).select()
.then(response=>{
if(response.status==201){
console.log(response);
this.show=false;
this.form={};
response.data.forEach(el=>{
});

}
}).catch(error=>{console.log(error)});

}else{
this.error='Fill in all fields';
}



}




},
mounted(){
this.get_report();
},

setup() {
return { arrowBack, person,chatboxEllipsesOutline };
}


}





</script>
