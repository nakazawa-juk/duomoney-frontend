import { createApp } from 'vue';
import App from './App.vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { router } from './router';
import clickOutsideDirective from './directives/clickOutside';

const app = createApp(App);

app.directive('click-outside', clickOutsideDirective);

app.use(router);
app.mount('#app');
