<template>
  <div class="wrapper">
    <LoginCardComponent v-if="!isLoggedIn"></LoginCardComponent>
    <ProfileComponent v-else></ProfileComponent>
    <CalendarListComponent v-if="isLoggedIn"></CalendarListComponent>
    <TimerComponent v-if="isLoggedIn"></TimerComponent>
  </div>
</template>

<script>
import LoginCardComponent from './LoginCardComponent';
import ProfileComponent from './ProfileComponent';
import CalendarListComponent from './CalendarListComponent';
import TimerComponent from './TimerComponent';


export default {
  components: {
    LoginCardComponent,
    ProfileComponent,
    CalendarListComponent,
    TimerComponent,
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isUserLoggedIn;
    },
  },
};
</script>

<style scoped>
.wrapper {
  height: 100%;
  overflow: hidden;
}


</style>
