import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue';
import RegisterPage from '../views/RegisterPage.vue';
import CreateUser from '../views/CreateUser.vue';
import UserProfile from '../views/UserProfile.vue';
import AnimalPage from '../views/AnimalPage.vue';
import CreateAnimal from '../views/CreateAnimal.vue';
import AnimalProfile from '../views/AnimalProfile.vue';
import HealthReports from '../views/HealthReports.vue';
import CreateReport from '../views/CreateReport.vue';
import ReportDetails from '../views/ReportDetails.vue';
import DrugsPage from '../views/DrugsPage.vue';
import CreateDrug from '../views/CreateDrug.vue';
import SettingsPage from '../views/SettingsPage.vue';
import FeedPage from '../views/FeedPage.vue';
import CreateFeeding from '../views/CreateFeeding.vue';
import MessagePage from '../views/MessagePage.vue';
import SearchPage from '../views/SearchPage.vue';

const routes: Array<RouteRecordRaw> = [
{
path: '/',
redirect: '/tabs/tab1'
},
{
path: '/tabs/',
component: TabsPage,
children: [
{
path: '',
redirect: '/tabs/tab1'
},
{
path: 'tab1',
component: () => import('@/views/Tab1Page.vue')
},
{
path: 'tab2',
component: () => import('@/views/Tab2Page.vue')
},
{
path: 'tab3',
component: () => import('@/views/Tab3Page.vue')
}
]
},
{
path:'/register',
component:RegisterPage,
name:'register',
},
{
path:'/user/create',
component:CreateUser,
name:'create-user',
},
{
path:'/user/profile/:id',
component:UserProfile,
name:'user-profile',
},
{
path:'/animal',
component:AnimalPage,
name:'animals',
},
{
path:'/animal/create',
component:CreateAnimal,
name:'create-animal'
},
{
path:'/animal/profile/:id',
component: AnimalProfile,
name:'animal-profile',
},
{
path:'/health/report',
component:HealthReports,
name:'health-report'
},
{
path:'/report/create',
component:CreateReport,
name:'create-report'
},
{
path:'/report/details/:id',
component:ReportDetails,
name:'report-details'
},
{
path:'/drugs',
component:DrugsPage,
name:'drugs',
},
{
path:'/drug/create',
component:CreateDrug,
name:'create drug',
},
{
path:'/settings',
component:SettingsPage,
name:'settings',
},
{
path:'/feed',
component:FeedPage,
name:'feeding'
},
{
path:'/feeding/create',
component:CreateFeeding,
name:'create-feeding',
},
{
  path:'/message',
  component:MessagePage,
  name:'message page',
},
{
path:'/search',
component:SearchPage,
name:'search'
}


]

const router = createRouter({
history: createWebHistory(import.meta.env.BASE_URL),
routes
})

export default router
