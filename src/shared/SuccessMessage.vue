<template>
<ion-card color="success" >
<ion-card-header>
<ion-card-title style="text-align:center;">Successful</ion-card-title>
<ion-card-subtitle style="text-align:center">
    <ion-icon :icon="checkmarkCircle" style="font-size:50px;"></ion-icon>
</ion-card-subtitle>
</ion-card-header>
<ion-card-content style="text-align:center;">{{ message }} </ion-card-content>
</ion-card>
</template>

<script>
  import { checkmarkCircle } from 'ionicons/icons';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonIcon } from '@ionic/vue';
export default {
components:{
IonCard,
IonCardContent,
IonCardHeader,
IonCardSubtitle,
IonCardTitle,
IonIcon
},
props:{
message:{}
},
setup() {
return { checkmarkCircle };
},

}
</script>