<template>
  <div class="wrapper" v-if="selectedEvent">
    <EventComponent :eventData=selectedEvent big-countdown="true"></EventComponent>
  </div>
</template>

<script>
import EventComponent from './EventComponent';

export default {
  components: {
    EventComponent,
  },
  mounted() {
    window.setInterval(() => {
      this.timeNowInSec = Math.trunc(new Date().getTime() / 1000);
    }, 1000);
  },
  data() {
    return {
      timeNowInSec: Math.trunc(new Date().getTime() / 1000),
    };
  },
  computed: {
    selectedEvent() {
      // const timeInSec = (new Date(firstEventInFuture.start.dateTime)).getTime() / 1000;
      return this.$store.getters.getSelectedEvent;
    },
  },
};
</script>

<style scoped>
.wrapper {
  height: auto;
}

.block {
  padding: 15px;
  text-align: center;
}

</style>
