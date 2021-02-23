<template>
  <div class="wrapper">
    <Card id="card">
      <div slot="title">
        <Row>
          <Col span="4">
            <Avatar size="large" :src="userData.pic"/>
          </Col>
          <Col span="20">
            <p id="userName">{{ userData.name }}</p><br>
            <p id="userEmail">{{ userData.email }}</p>
          </Col>
        </Row>
      </div>
      <div>
        <Row>
          <Col span="12" class="centerAlign">
            <Button type="text" long @click="sync">Sync</Button>
          </Col>
          <Col span="12" class="centerAlign">
            <Button type="text" long @click="startLogOutProcess">Log Out</Button>
          </Col>
        </Row>
      </div>
    </Card>
  </div>
</template>

<script>
export default {
  mounted() {
    window.setInterval(() => {
      this.sync();
    }, 60 * 1000);

    this.sync();
  },
  methods: {
    sync() {
      this.$store.dispatch('saveEventList', this.$store.getters.getAccessToken);
    },
    startLogOutProcess() {
      this.$store.commit('unsetCurrentEvent');
      this.$store.commit('clearCalendar');
      this.$store.commit('logOutUser');
    },
  },
  computed: {
    userData() {
      return this.$store.getters.userData;
    },
  },
};
</script>

<style scoped>
.wrapper {
  padding: 15px;
  height: 150px;
  color: #495060;
}

.centerAlign {
  text-align: center;
}

div.ivu-card-body {
  padding: 0px;
}
</style>