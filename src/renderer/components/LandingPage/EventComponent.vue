<template>
  <div id="wrapper">
    <div class="eventCard">
      <Card :bordered="false">
        <p slot="title">{{ eventData.summary }}</p>
        <p slot="extra" style="background-color: white">{{ dateString }} </p>
        <div v-if="isPast">
          <strong>Already started at: {{ dateString }}</strong>
        </div>
        <div v-else>
          <div v-if="bigCountdown">
            <strong>Starts in: </strong>
            <span style="font-size: 3em"><strong>{{ hoursPlusDays }}:{{ minutes }}:{{ seconds }}</strong></span>
          </div>
          <div v-else>
            <strong>Starts in: </strong>
            <span>Days: <strong>{{ days }} </strong></span>
            <span>Time: <strong>{{ hours }}:{{ minutes }}:{{ seconds }}</strong></span>
          </div>
        </div>
        <p v-if="hangoutLink">
          Link: <a :href=hangoutLink target="_blank">{{ hangoutLink }}</a>
        <p v-else-if="location">
          Location: <a :href=location target="_blank">{{ location }}</a>
        </p>
        <p>
          {{ dump }}
        </p>
      </Card>
    </div>
  </div>
</template>

<script>
export default {
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
    dateString() {
      const date = typeof this.eventData.start.dateTime === 'undefined' ? new Date(this.eventData.start.date + 'GMT+5:30') : new Date(this.eventData.start.dateTime);
      return date.toLocaleString();
    },
    dateInSec() {
      const date = typeof this.eventData.start.dateTime === 'undefined' ? new Date(this.eventData.start.date + 'GMT+5:30') : new Date(this.eventData.start.dateTime);
      return Math.trunc(date / 1000);
    },
    seconds() {
      return ((this.dateInSec - this.timeNowInSec) % 60).toString().padStart(2, '0');
    },
    minutes() {
      return (Math.trunc((this.dateInSec - this.timeNowInSec) / 60) % 60).toString().padStart(2, '0');
    },
    hours() {
      return (Math.trunc((this.dateInSec - this.timeNowInSec) / 60 / 60) % 24).toString().padStart(2, '0');
    },
    days() {
      return Math.trunc((this.dateInSec - this.timeNowInSec) / 60 / 60 / 24);
    },
    hoursPlusDays() {
      return ((Math.trunc((this.dateInSec - this.timeNowInSec) / 60 / 60) % 24) + this.days).toString().padStart(2, '0');
    },
    dump() {
      return this.showDump ? JSON.stringify(this.eventData, null, 2) : null;
    },
    isPast() {
      return this.dateInSec - this.timeNowInSec < 0;
    },
    hangoutLink() {
      return this.eventData.hangoutLink;
    },
    location() {
      return this.eventData.location;
    },
  },
  props: ['eventData', 'bigCountdown', 'showDump'],
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Source+Sans+Pro");

.wrapper {
  height: inherit;
  vertical-align: middle;
  background: #eee;
}

.eventCard {
  color: #1c2438;
  height: inherit;
  padding: 20px;
  padding-top: 5px;
  padding-bottom: 5px;
}
</style>
